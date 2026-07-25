// Cron/worker para reprocessar automaticamente opt-ins em pending/error.
// Chamável manualmente (GET) ou por pg_cron via net.http_post.
// Sem auth externa (verify_jwt = false). Idempotente e seguro para rodar em loop.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { sendAlert, shouldFire } from "../_shared/alerts.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
const SHEET_ID = Deno.env.get("OFERTAS_SHEET_ID");
const SHEET_TAB = Deno.env.get("OFERTAS_SHEET_TAB") || "Optins";
const MAX_ATTEMPTS = 6;

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type Row = {
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
  sheet_attempts: number | null;
};

async function appendOne(row: Row): Promise<{ ok: boolean; error?: string; updatedRange?: string; status?: number }> {
  if (!SHEET_ID || !LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
    return { ok: false, error: "missing_sheet_config" };
  }
  const values = [[
    row.created_at, row.id, row.telefone, row.status,
    row.campaign_source ?? "", row.ultimo_template_enviado ?? "",
    row.origem_url ?? "", row.ip ?? "", row.user_agent ?? "",
    row.data_aceite ?? row.created_at,
  ]];
  const url = `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_ID}/values/${SHEET_TAB}!A:J:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  try {
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

async function logAttempt(row: Row, res: { ok: boolean; error?: string; updatedRange?: string; status?: number }) {
  const now = new Date().toISOString();
  const patch: Record<string, unknown> = {
    sheet_last_attempt_at: now,
    sheet_attempts: (row.sheet_attempts ?? 0) + 1,
    sheet_sync_status: res.ok ? "ok" : "error",
    sheet_synced_at: res.ok ? now : null,
    sheet_sync_error: res.ok ? null : (res.error ?? "unknown"),
  };
  if (res.ok && res.updatedRange) patch.sheet_updated_range = res.updatedRange;
  await admin.from("marketing_optin").update(patch).eq("id", row.id);
  await admin.from("marketing_optin_sync_attempts").insert({
    optin_id: row.id,
    telefone: row.telefone,
    ok: res.ok,
    http_status: res.status ?? null,
    error: res.ok ? null : (res.error ?? "unknown"),
    updated_range: res.updatedRange ?? null,
    source: "worker",
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 100), 500);
  const testOnly = url.searchParams.get("test") === "1";

  // ---- test connection ----
  if (testOnly) {
    if (!SHEET_ID || !LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
      return new Response(JSON.stringify({ ok: false, error: "missing_sheet_config" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
    return new Response(JSON.stringify({
      ok: r.ok, status: r.status, sheet_id: SHEET_ID, tab: SHEET_TAB, body: parsed ?? bodyText.slice(0, 500),
    }), {
      status: r.ok ? 200 : 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // ---- process pending/error rows ----
  const { data, error } = await admin
    .from("marketing_optin")
    .select("id, created_at, telefone, status, campaign_source, ultimo_template_enviado, origem_url, ip, user_agent, data_aceite, sheet_attempts")
    .neq("sheet_sync_status", "ok")
    .lt("sheet_attempts", MAX_ATTEMPTS)
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const rows = (data ?? []) as Row[];
  if (!rows.length) {
    return new Response(JSON.stringify({ ok: true, processed: 0, message: "Nada pendente." }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let succeeded = 0;
  let failed = 0;
  let lastError: string | undefined;

  // Faz um-a-um para capturar updatedRange individual
  for (const r of rows) {
    const res = await appendOne(r);
    await logAttempt(r, res);
    if (res.ok) succeeded += 1;
    else { failed += 1; lastError = res.error; }
  }

  // Alertas
  try {
    const errorRate = rows.length ? failed / rows.length : 0;
    if (failed >= 3 && errorRate >= 0.5 && shouldFire("worker_error_rate")) {
      await sendAlert({
        title: "Worker de sincronização com alta taxa de erro",
        message: `${failed} de ${rows.length} falharam neste ciclo (${(errorRate*100).toFixed(0)}%). Último erro: ${lastError ?? "n/a"}`,
        severity: "critical",
        meta: { failed, processed: rows.length, lastError },
      });
    }
    const { count: pendingCount } = await admin
      .from("marketing_optin")
      .select("id", { count: "exact", head: true })
      .neq("sheet_sync_status", "ok");
    const threshold = Number(Deno.env.get("ALERT_QUEUE_THRESHOLD") ?? 25);
    if ((pendingCount ?? 0) >= threshold && shouldFire("worker_queue_high")) {
      await sendAlert({
        title: "Fila de sincronização acima do limite",
        message: `Há ${pendingCount} opt-ins pendentes/erro (limite: ${threshold}).`,
        severity: "warning",
        meta: { pendingCount, threshold },
      });
    }
  } catch (e) {
    console.warn("alert_check_failed", e);
  }

  return new Response(JSON.stringify({
    ok: failed === 0, processed: rows.length, succeeded, failed, error: lastError,
  }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
