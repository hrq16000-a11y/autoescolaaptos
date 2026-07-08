// Edge function: /functions/v1/submit-triagem
// Recebe a triagem do formulário /1contato, aplica honeypot + rate-limit
// por IP (via função Postgres SECURITY DEFINER), grava em `triagem_leads`
// e, se `LEAD_WEBHOOK_URL` estiver definida, replica o lead para
// Google Sheets / CRM / Zapier / Make.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const LEAD_WEBHOOK_URL = Deno.env.get("LEAD_WEBHOOK_URL");

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // IP do cliente (Supabase Edge coloca em x-forwarded-for)
  const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "";
  const ip = ipHeader.split(",")[0].trim() || null;

  const payload = { ...body, ip };

  const { data, error } = await admin.rpc("submit_triagem", { payload });

  if (error) {
    const msg = String(error.message || "");
    if (msg.includes("RATE_LIMIT")) return json({ error: "rate_limit" }, 429);
    if (msg.includes("INVALID_NAME")) return json({ error: "invalid_name" }, 400);
    if (msg.includes("TOO_FAST")) return json({ error: "too_fast" }, 400);
    if (msg.includes("LGPD_REQUIRED")) return json({ error: "lgpd_required" }, 400);
    console.error("submit_triagem failed:", error);
    return json({ error: "server_error", details: msg }, 500);
  }

  // Forward opcional para Google Sheets / Zapier / Make / CRM
  if (LEAD_WEBHOOK_URL && !(data as { skipped?: boolean })?.skipped) {
    try {
      await fetch(LEAD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          ip,
          received_at: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("webhook forward failed:", e);
      // não falha o lead por causa do webhook
    }
  }

  return json(data);
});
