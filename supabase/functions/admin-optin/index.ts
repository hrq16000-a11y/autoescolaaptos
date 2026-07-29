// Edge function protegida por token: /functions/v1/admin-optin
// Painel do Programa de Ofertas Exclusivas (marketing_optin).
// Ações GET:
//  - ?action=list&limit=500&status=&campaign_source=&sync_status=&from=&to=&q=
//  - ?action=metrics&from=&to=
//  - ?action=history&optin_id=&telefone=&limit=50
//  - ?action=test_sheets
// Ações POST:
//  - ?action=retry_sync   body: { ids?, telefones?, from?, to?, only_errors?, limit? }
//  - ?action=backfill     body: { limit? }
// Auth: header `x-admin-token` = ADMIN_LEADS_TOKEN.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_TOKEN = Deno.env.get("ADMIN_LEADS_TOKEN");
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
const SHEET_ID = Deno.env.get("OFERTAS_SHEET_ID");
const SHEET_TAB = Deno.env.get("OFERTAS_SHEET_TAB") || "Optins";

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

type OptinRow = {
  id: string;
  created_at: string;
  telefone: string;
  status: string;
  campaign_source: string | null;
  ultimo_template_enviado: string | null;
  origem_url: string | null;
  ip: string | null;
  user_agent: string | null;
  data_aceite: string | null;
  sheet_attempts?: number | null;
};

async function appendBatchToSheet(rows: OptinRow[]): Promise<{ ok: boolean; error?: string; updatedRange?: string; status?: number }> {
  if (!rows.length) return { ok: true };
  if (!SHEET_ID || !LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
    return { ok: false, error: "missing_sheet_config" };
  }
  const values = rows.map((row) => [
    row.created_at, row.id, row.telefone, row.status,
    row.campaign_source ?? "", row.ultimo_template_enviado ?? "",
    row.origem_url ?? "", row.ip ?? "", row.user_agent ?? "",
    row.data_aceite ?? row.created_at,
  ]);
  try {
    const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_ID}/values/${SHEET_TAB}!A:J:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ values }),
    });
    if (!resp.ok) {
      const txt = await resp.text();
      return { ok: false, status: resp.status, error: `[${resp.status}] ${txt.slice(0, 400)}` };
    }
    const j = await resp.json().catch(() => ({}));
    return { ok: true, updatedRange: j?.updates?.updatedRange, status: resp.status };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

async function markSyncBatch(rows: OptinRow[], res: { ok: boolean; error?: string; updatedRange?: string; status?: number }) {
  if (!rows.length) return;
  const now = new Date().toISOString();
  const ids = rows.map((r) => r.id);
  const { data: current } = await admin
    .from("marketing_optin")
    .select("id, sheet_attempts")
    .in("id", ids);
  const attemptsMap = new Map<string, number>();
  (current ?? []).forEach((r) => attemptsMap.set(r.id, (r.sheet_attempts ?? 0) + 1));

  for (const r of rows) {
    const patch: Record<string, unknown> = {
      sheet_last_attempt_at: now,
      sheet_attempts: attemptsMap.get(r.id) ?? 1,
      sheet_sync_status: res.ok ? "ok" : "error",
      sheet_synced_at: res.ok ? now : null,
      sheet_sync_error: res.ok ? null : (res.error ?? "unknown"),
    };
    if (res.ok && res.updatedRange) patch.sheet_updated_range = res.updatedRange;
    await admin.from("marketing_optin").update(patch).eq("id", r.id);
    await admin.from("marketing_optin_sync_attempts").insert({
      optin_id: r.id,
      telefone: r.telefone,
      ok: res.ok,
      http_status: res.status ?? null,
      error: res.ok ? null : (res.error ?? "unknown"),
      updated_range: res.updatedRange ?? null,
      source: "admin",
    });
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (!ADMIN_TOKEN) return json({ error: "not_configured" }, 500);
  const token = req.headers.get("x-admin-token") || "";
  if (token !== ADMIN_TOKEN) return json({ error: "unauthorized" }, 401);

  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "list";

  // ---- POST actions ----
  if (req.method === "POST") {
    let body: Record<string, unknown> = {};
    try { body = await req.json(); } catch { /* ignore */ }

    if (action === "update_config") {
      const patch: Record<string, unknown> = { updated_at: new Date().toISOString() };
      if (body.alert_queue_threshold !== undefined) {
        const n = Number(body.alert_queue_threshold);
        if (!Number.isFinite(n) || n < 1 || n > 100000) {
          return json({ error: "invalid_threshold" }, 400);
        }
        patch.alert_queue_threshold = Math.floor(n);
      }
      if (typeof body.email_enabled === "boolean") patch.email_enabled = body.email_enabled;
      if (typeof body.slack_enabled === "boolean") patch.slack_enabled = body.slack_enabled;

      const { data: before } = await admin
        .from("alert_config")
        .select("alert_queue_threshold, email_enabled, slack_enabled")
        .eq("id", 1)
        .maybeSingle();

      const { data, error } = await admin
        .from("alert_config")
        .update(patch)
        .eq("id", 1)
        .select()
        .maybeSingle();
      if (error) return json({ error: "update_failed", message: error.message }, 500);

      const changedFields: string[] = [];
      const oldVals: Record<string, unknown> = {};
      const newVals: Record<string, unknown> = {};
      for (const k of ["alert_queue_threshold", "email_enabled", "slack_enabled"] as const) {
        if (patch[k] !== undefined && before && (before as Record<string, unknown>)[k] !== patch[k]) {
          changedFields.push(k);
          oldVals[k] = (before as Record<string, unknown>)[k];
          newVals[k] = patch[k];
        }
      }
      if (changedFields.length) {
        await admin.from("alert_config_audit_log").insert({
          actor: (body.actor as string) || req.headers.get("x-admin-actor") || "admin",
          source: "admin_panel",
          ip: req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip"),
          user_agent: req.headers.get("user-agent"),
          old_values: oldVals,
          new_values: newVals,
          changed_fields: changedFields,
        });
      }
      return json({ ok: true, config: data, changed_fields: changedFields });
    }

    if (action === "batch_reprocess") {
      const from = body.from as string | undefined;
      const to = body.to as string | undefined;
      const statuses = Array.isArray(body.statuses) && (body.statuses as string[]).length
        ? (body.statuses as string[])
        : ["error", "pending"];
      const dryRun = body.dry_run !== false;
      const limit = Math.min(Number(body.limit ?? 500), 2000);

      let query = admin
        .from("marketing_optin")
        .select("id, created_at, telefone, status, campaign_source, ultimo_template_enviado, origem_url, ip, user_agent, data_aceite, sheet_attempts, sheet_sync_status")
        .in("sheet_sync_status", statuses)
        .order("created_at", { ascending: true })
        .limit(limit);
      if (from) query = query.gte("created_at", from);
      if (to) query = query.lte("created_at", to);

      const { data, error } = await query;
      if (error) return json({ error: "query_failed", message: error.message }, 500);
      const rows = (data ?? []) as (OptinRow & { sheet_sync_status?: string })[];

      if (dryRun) {
        const byStatus: Record<string, number> = {};
        for (const r of rows) {
          const s = r.sheet_sync_status || "pending";
          byStatus[s] = (byStatus[s] || 0) + 1;
        }
        return json({
          ok: true, dry_run: true, would_process: rows.length,
          by_status: byStatus, from, to, statuses, limit,
        });
      }

      let succeeded = 0, failed = 0;
      let lastError: string | undefined;
      for (const r of rows) {
        const res = await appendBatchToSheet([r]);
        await markSyncBatch([r], res);
        if (res.ok) succeeded += 1;
        else { failed += 1; lastError = res.error; }
      }
      return json({ ok: failed === 0, dry_run: false, processed: rows.length, succeeded, failed, error: lastError });
    }

    if (action === "retry_sync" || action === "backfill") {
      const limit = Math.min(Number(body.limit ?? url.searchParams.get("limit") ?? 200), 500);
      let query = admin
        .from("marketing_optin")
        .select("id, created_at, telefone, status, campaign_source, ultimo_template_enviado, origem_url, ip, user_agent, data_aceite, sheet_attempts, sheet_sync_status")
        .order("created_at", { ascending: true })
        .limit(limit);

      const ids = Array.isArray(body.ids) ? (body.ids as string[]) : null;
      const telefones = Array.isArray(body.telefones)
        ? (body.telefones as string[]).map((t) => String(t).replace(/\D/g, "")).filter(Boolean)
        : null;
      const from = body.from as string | undefined;
      const to = body.to as string | undefined;
      const onlyErrors = body.only_errors !== false;

      if (action === "backfill") {
        query = query.neq("sheet_sync_status", "ok");
      } else if (ids && ids.length) {
        query = query.in("id", ids);
      } else if (telefones && telefones.length) {
        query = query.in("telefone", telefones);
      } else {
        if (onlyErrors) query = query.neq("sheet_sync_status", "ok");
        if (from) query = query.gte("created_at", from);
        if (to) query = query.lte("created_at", to);
      }

      const { data, error } = await query;
      if (error) return json({ error: "query_failed", message: error.message }, 500);
      const rows = (data ?? []) as OptinRow[];
      if (!rows.length) return json({ ok: true, processed: 0, succeeded: 0, failed: 0, message: "Nada a reprocessar." });

      let succeeded = 0;
      let failed = 0;
      let lastError: string | undefined;
      for (const r of rows) {
        const res = await appendBatchToSheet([r]);
        await markSyncBatch([r], res);
        if (res.ok) succeeded += 1;
        else { failed += 1; lastError = res.error; }
      }
      return json({ ok: failed === 0, processed: rows.length, succeeded, failed, error: lastError });
    }

    return json({ error: "unknown_action" }, 400);
  }

  if (req.method !== "GET") return json({ error: "method_not_allowed" }, 405);

  // ---- GET: test_sheets ----
  if (action === "test_sheets") {
    if (!SHEET_ID || !LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
      return json({ ok: false, error: "missing_sheet_config" }, 500);
    }
    const testUrl = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_ID}?fields=properties.title,sheets.properties.title`;
    const r = await fetch(testUrl, {
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
      },
    });
    const bodyText = await r.text();
    let parsed: unknown = null;
    try { parsed = JSON.parse(bodyText); } catch { /* noop */ }
    return json({
      ok: r.ok, status: r.status, sheet_id: SHEET_ID, tab: SHEET_TAB, body: parsed ?? bodyText.slice(0, 500),
    }, r.ok ? 200 : 502);
  }

  // ---- GET: config ----
  if (action === "get_config") {
    const { data, error } = await admin
      .from("alert_config")
      .select("alert_queue_threshold, email_enabled, slack_enabled, updated_at")
      .eq("id", 1)
      .maybeSingle();
    if (error) return json({ error: "query_failed", message: error.message }, 500);
    return json({ config: data ?? { alert_queue_threshold: 25, email_enabled: true, slack_enabled: true } });
  }

  // ---- GET: history / history_csv ----
  if (action === "history" || action === "history_csv") {
    const optinId = url.searchParams.get("optin_id");
    const telefone = url.searchParams.get("telefone");
    const source = url.searchParams.get("source");
    const from = url.searchParams.get("from");
    const to = url.searchParams.get("to");
    const okOnly = url.searchParams.get("ok");
    const lim = Math.min(Number(url.searchParams.get("limit") ?? (action === "history_csv" ? 5000 : 100)), 20000);
    let q = admin.from("marketing_optin_sync_attempts")
      .select("id, optin_id, telefone, attempted_at, ok, http_status, error, updated_range, source")
      .order("attempted_at", { ascending: false })
      .limit(lim);
    if (optinId) q = q.eq("optin_id", optinId);
    if (telefone) q = q.eq("telefone", String(telefone).replace(/\D/g, ""));
    if (source) q = q.eq("source", source);
    if (from) q = q.gte("attempted_at", from);
    if (to) q = q.lte("attempted_at", to);
    if (okOnly === "true") q = q.eq("ok", true);
    if (okOnly === "false") q = q.eq("ok", false);
    const { data, error } = await q;
    if (error) return json({ error: "query_failed", message: error.message }, 500);

    if (action === "history_csv") {
      const headers = ["attempted_at","optin_id","telefone","source","ok","http_status","updated_range","error"];
      const esc = (v: unknown) => `"${(v === null || v === undefined ? "" : String(v)).replace(/"/g, '""')}"`;
      const csv = [
        headers.join(","),
        ...(data ?? []).map((r) => headers.map((h) => esc((r as Record<string, unknown>)[h])).join(",")),
      ].join("\n");
      return new Response("\ufeff" + csv, {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "text/csv;charset=utf-8",
          "Content-Disposition": `attachment; filename="sync_attempts_${new Date().toISOString().slice(0,10)}.csv"`,
        },
      });
    }

    return json({ attempts: data ?? [] });
  }

  const status = url.searchParams.get("status");
  const campaign = url.searchParams.get("campaign_source");
  const syncStatus = url.searchParams.get("sync_status");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const q = url.searchParams.get("q");

  if (action === "metrics") {
    let query = admin
      .from("marketing_optin")
      .select("status, campaign_source, ultimo_template_enviado, quantidade_campanhas, created_at, data_aceite, sheet_sync_status")
      .limit(20000);
    if (from) query = query.gte("created_at", from);
    if (to) query = query.lte("created_at", to);
    if (status) query = query.eq("status", status);
    if (campaign) query = query.eq("campaign_source", campaign);
    if (syncStatus) query = query.eq("sheet_sync_status", syncStatus);

    const { data, error } = await query;
    if (error) return json({ error: "query_failed", message: error.message }, 500);

    const rows = data ?? [];
    const total = rows.length;
    const byStatus: Record<string, number> = {};
    const byCampaign: Record<string, { optins: number; retorno: number; taxa: number }> = {};
    const byTemplate: Record<string, number> = {};
    const byDay: Record<string, number> = {};
    const bySync: Record<string, number> = { ok: 0, pending: 0, error: 0 };

    for (const r of rows) {
      const st = r.status || "indefinido";
      byStatus[st] = (byStatus[st] || 0) + 1;
      const c = r.campaign_source || "(sem campanha)";
      if (!byCampaign[c]) byCampaign[c] = { optins: 0, retorno: 0, taxa: 0 };
      byCampaign[c].optins += 1;
      if ((r.quantidade_campanhas ?? 0) > 0) byCampaign[c].retorno += 1;
      if (r.ultimo_template_enviado) byTemplate[r.ultimo_template_enviado] = (byTemplate[r.ultimo_template_enviado] || 0) + 1;
      const day = new Date(r.created_at as string).toISOString().slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;
      const s = (r.sheet_sync_status as string) || "pending";
      bySync[s] = (bySync[s] || 0) + 1;
    }
    for (const c of Object.keys(byCampaign)) {
      const row = byCampaign[c];
      row.taxa = row.optins ? row.retorno / row.optins : 0;
    }
    return json({ total, byStatus, byCampaign, byTemplate, byDay, bySync });
  }

  // list
  const limit = Math.min(parseInt(url.searchParams.get("limit") || "500"), 2000);
  let query = admin
    .from("marketing_optin")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (status) query = query.eq("status", status);
  if (campaign) query = query.eq("campaign_source", campaign);
  if (syncStatus) query = query.eq("sheet_sync_status", syncStatus);
  if (from) query = query.gte("created_at", from);
  if (to) query = query.lte("created_at", to);
  if (q) query = query.ilike("telefone", `%${q.replace(/\D/g, "")}%`);

  const { data, error } = await query;
  if (error) return json({ error: "query_failed", message: error.message }, 500);
  return json({ optins: data ?? [] });
});
