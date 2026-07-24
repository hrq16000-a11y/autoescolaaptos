// Cron/worker para reprocessar automaticamente opt-ins em pending/error.
// Chamável manualmente (GET) ou por pg_cron via net.http_post.
// Sem auth externa (verify_jwt = false). Idempotente e seguro para rodar em loop.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

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

async function appendBatch(rows: Row[]): Promise<{ ok: boolean; error?: string }> {
  if (!rows.length) return { ok: true };
  if (!SHEET_ID || !LOVABLE_API_KEY || !GOOGLE_SHEETS_API_KEY) {
    return { ok: false, error: "missing_sheet_config" };
  }
  const values = rows.map((r) => [
    r.created_at,
    r.id,
    r.telefone,
    r.status,
    r.campaign_source ?? "",
    r.ultimo_template_enviado ?? "",
    r.origem_url ?? "",
    r.ip ?? "",
    r.user_agent ?? "",
    r.data_aceite ?? r.created_at,
  ]);
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
      return { ok: false, error: `[${resp.status}] ${txt.slice(0, 400)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const url = new URL(req.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 100), 500);
  const testOnly = url.searchParams.get("test") === "1";

  // ---- test connection (validate credentials + sheet access) ----
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
    const body = await r.text();
    return new Response(JSON.stringify({ ok: r.ok, status: r.status, body: body.slice(0, 500) }), {
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
  const now = new Date().toISOString();

  for (let i = 0; i < rows.length; i += 50) {
    const chunk = rows.slice(i, i + 50);
    const res = await appendBatch(chunk);
    if (res.ok) succeeded += chunk.length;
    else { failed += chunk.length; lastError = res.error; }

    for (const r of chunk) {
      await admin.from("marketing_optin").update({
        sheet_last_attempt_at: now,
        sheet_attempts: (r.sheet_attempts ?? 0) + 1,
        sheet_sync_status: res.ok ? "ok" : "error",
        sheet_synced_at: res.ok ? now : null,
        sheet_sync_error: res.ok ? null : (res.error ?? "unknown"),
      }).eq("id", r.id);
    }
  }

  return new Response(JSON.stringify({
    ok: failed === 0, processed: rows.length, succeeded, failed, error: lastError,
  }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
