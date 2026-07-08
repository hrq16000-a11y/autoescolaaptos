// Edge function: /functions/v1/submit-triagem
// Grava a triagem via RPC `submit_triagem` (SECURITY DEFINER com honeypot,
// rate-limit por IP e validações) e, se `LEAD_WEBHOOK_URL` estiver definida,
// replica o lead para Google Sheets / CRM / Zapier / Make com retry + backoff.

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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Envia lead ao webhook (Sheets/CRM) com retry exponencial:
 * tentativas 1s, 3s, 9s. Falha silenciosamente após 3 tentativas
 * para não bloquear o handoff do WhatsApp.
 */
async function forwardWithRetry(url: string, payload: unknown) {
  const attempts = 3;
  let lastError: string | null = null;
  for (let i = 0; i < attempts; i++) {
    try {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (resp.ok) return { ok: true, attempts: i + 1 };
      lastError = `HTTP ${resp.status}`;
      // 4xx (exceto 408/429) não vai melhorar retriando
      if (resp.status >= 400 && resp.status < 500 && resp.status !== 408 && resp.status !== 429) {
        break;
      }
    } catch (e) {
      lastError = e instanceof Error ? e.message : String(e);
    }
    if (i < attempts - 1) await sleep(Math.pow(3, i) * 1000);
  }
  return { ok: false, attempts, error: lastError };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ error: "invalid_json", message: "Payload inválido." }, 400);
  }

  const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "";
  const ip = ipHeader.split(",")[0].trim() || null;
  const payload = { ...body, ip };

  const { data, error } = await admin.rpc("submit_triagem", { payload });

  if (error) {
    const msg = String(error.message || "");
    if (msg.includes("RATE_LIMIT"))
      return json({ error: "rate_limit", message: "Muitas tentativas em pouco tempo. Aguarde alguns minutos." }, 429);
    if (msg.includes("INVALID_NAME"))
      return json({ error: "invalid_name", message: "Informe um nome válido (mínimo 5 caracteres)." }, 400);
    if (msg.includes("TOO_FAST"))
      return json({ error: "too_fast", message: "Envio muito rápido. Preencha o formulário e tente novamente." }, 400);
    if (msg.includes("LGPD_REQUIRED"))
      return json({ error: "lgpd_required", message: "É preciso aceitar os termos da LGPD." }, 400);
    console.error("submit_triagem failed:", error);
    return json({ error: "server_error", message: "Falha temporária no servidor. Tente novamente." }, 500);
  }

  // Forward opcional com retry
  let webhookResult: unknown = { skipped: true };
  if (LEAD_WEBHOOK_URL && !(data as { skipped?: boolean })?.skipped) {
    webhookResult = await forwardWithRetry(LEAD_WEBHOOK_URL, {
      ...body,
      ip,
      lead_id: (data as { id?: string })?.id,
      status_funil: "new",
      received_at: new Date().toISOString(),
    });
    if (!(webhookResult as { ok?: boolean }).ok) {
      console.error("webhook forward failed after retries:", webhookResult);
      // não falha o lead — apenas registra
    }
  }

  return json({ ...(data as Record<string, unknown>), webhook: webhookResult });
});
