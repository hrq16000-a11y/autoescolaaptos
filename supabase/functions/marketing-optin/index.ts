// Edge function: /functions/v1/marketing-optin
// Registra opt-in de campanhas promocionais (Programa de Ofertas Exclusivas).
// Independente de leads/matrículas.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { sendAlert, shouldFire } from "../_shared/alerts.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
const SHEET_ID = Deno.env.get("OFERTAS_SHEET_ID");
const SHEET_TAB = Deno.env.get("OFERTAS_SHEET_TAB") || "Optins";

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

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
};

export async function appendOptinToSheet(row: OptinRow): Promise<{ ok: boolean; error?: string; updatedRange?: string; status?: number }> {
  if (!SHEET_ID || !LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
    return { ok: false, error: "missing_sheet_config" };
  }
  const values = [[
    row.created_at,
    row.id,
    row.telefone,
    row.status,
    row.campaign_source ?? "",
    row.ultimo_template_enviado ?? "",
    row.origem_url ?? "",
    row.ip ?? "",
    row.user_agent ?? "",
    row.data_aceite ?? row.created_at,
  ]];
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
    const updatedRange = j?.updates?.updatedRange as string | undefined;
    return { ok: true, updatedRange, status: resp.status };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

async function markSync(row: OptinRow, res: { ok: boolean; error?: string; updatedRange?: string; status?: number }, source = "realtime") {
  const now = new Date().toISOString();
  const { data: current } = await admin
    .from("marketing_optin")
    .select("sheet_attempts")
    .eq("id", row.id)
    .maybeSingle();
  const attempts = (current?.sheet_attempts ?? 0) + 1;
  const patch: Record<string, unknown> = {
    sheet_last_attempt_at: now,
    sheet_attempts: attempts,
  };
  if (res.ok) {
    patch.sheet_sync_status = "ok";
    patch.sheet_synced_at = now;
    patch.sheet_sync_error = null;
    if (res.updatedRange) patch.sheet_updated_range = res.updatedRange;
  } else {
    patch.sheet_sync_status = "error";
    patch.sheet_sync_error = res.error ?? "unknown";
  }
  await admin.from("marketing_optin").update(patch).eq("id", row.id);
  await admin.from("marketing_optin_sync_attempts").insert({
    optin_id: row.id,
    telefone: row.telefone,
    ok: res.ok,
    http_status: res.status ?? null,
    error: res.ok ? null : (res.error ?? "unknown"),
    updated_range: res.updatedRange ?? null,
    source,
  });
}

async function checkAlertsAndMaybeFire() {
  // Fila de pendentes/erros
  const { count: pendingCount } = await admin
    .from("marketing_optin")
    .select("id", { count: "exact", head: true })
    .neq("sheet_sync_status", "ok");
  const threshold = Number(Deno.env.get("ALERT_QUEUE_THRESHOLD") ?? 25);
  if ((pendingCount ?? 0) >= threshold && shouldFire("queue_high")) {
    await sendAlert({
      title: "Fila de sincronização acima do limite",
      message: `Há ${pendingCount} opt-ins pendentes/erro na fila do Google Sheets (limite: ${threshold}).`,
      severity: "warning",
      meta: { pendingCount, threshold },
    });
  }

  // Taxa de erro nas últimas 15 min
  const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { data: recent } = await admin
    .from("marketing_optin_sync_attempts")
    .select("ok, error")
    .gte("attempted_at", since)
    .limit(500);
  const total = recent?.length ?? 0;
  const errors = (recent ?? []).filter((r) => !r.ok).length;
  const errorRate = total ? errors / total : 0;
  if (total >= 5 && errorRate >= 0.5 && shouldFire("error_rate_high")) {
    await sendAlert({
      title: "Taxa de erro alta na sincronização com Google Sheets",
      message: `${errors} de ${total} tentativas falharam nos últimos 15 min (${(errorRate * 100).toFixed(0)}%).`,
      severity: "critical",
      meta: { total, errors, errorRate, sample: (recent ?? []).slice(0, 3) },
    });
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function str(v: unknown, max = 500): string | null {
  if (v === null || v === undefined) return null;
  const s = String(v).trim();
  if (!s) return null;
  return s.slice(0, max);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ success: false, error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, message: "Payload inválido." }, 400);
  }

  const telefoneRaw = str(body.telefone, 40);
  const telefone = telefoneRaw ? telefoneRaw.replace(/\D/g, "") : null;
  const campaign_source = str(body.campaign_source, 120);
  const origem_url = str(body.origem_url, 500) ?? req.headers.get("referer");
  const ultimo_template_enviado = str(body.ultimo_template_enviado, 120);
  const lgpd_aceite = body.lgpd_aceite === true || body.lgpd_aceite === "true";

  const user_agent = req.headers.get("user-agent") || null;
  const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "";
  const ip = ipHeader.split(",")[0].trim() || null;

  const errors: Record<string, string> = {};
  if (!telefone || telefone.length < 10 || telefone.length > 13) {
    errors.telefone = "DDD + número (10 a 13 dígitos).";
  }
  if (!lgpd_aceite) errors.lgpd_aceite = "Consentimento obrigatório.";

  if (Object.keys(errors).length) {
    return json({ success: false, message: "Dados inválidos.", errors }, 400);
  }

  const payload = { telefone, campaign_source, origem_url, ultimo_template_enviado, ip, user_agent, lgpd_aceite: true };
  const { data, error } = await admin.rpc("submit_marketing_optin", { payload });

  if (error) {
    const msg = String(error.message || "");
    if (msg.includes("INVALID_PHONE")) return json({ success: false, message: "Informe um WhatsApp válido com DDD." }, 400);
    if (msg.includes("LGPD_REQUIRED")) return json({ success: false, message: "Consentimento obrigatório." }, 400);
    if (msg.includes("INVALID_CAMPAIGN") || msg.includes("INVALID_TEMPLATE")) {
      return json({ success: false, message: "Parâmetro de campanha inválido." }, 400);
    }
    console.error("marketing_optin failed:", error);
    return json({ success: false, message: "Falha temporária. Tente novamente." }, 500);
  }

  const result = data as { ok?: boolean; duplicate?: boolean; id?: string };
  if (result?.duplicate) {
    return json({
      success: false,
      duplicate: true,
      message: "Este número já está participando do Programa de Ofertas Exclusivas.",
    }, 200);
  }

  if (result?.id) {
    const { data: row } = await admin
      .from("marketing_optin")
      .select("id, created_at, telefone, status, campaign_source, ultimo_template_enviado, origem_url, ip, user_agent, data_aceite")
      .eq("id", result.id)
      .maybeSingle();
    if (row) {
      const res = await appendOptinToSheet(row as OptinRow);
      await markSync(row as OptinRow, res, "realtime");
      if (!res.ok) console.warn("sheet_append_failed", res.error);
      // Alertas (não bloqueia resposta)
      checkAlertsAndMaybeFire().catch((e) => console.warn("alert_check_failed", e));
    }
  }

  return json({ success: true, id: result?.id, message: "Cadastro realizado com sucesso." });
});
