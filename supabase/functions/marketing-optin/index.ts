// Edge function: /functions/v1/marketing-optin
// Registra opt-in de campanhas promocionais (Programa de Ofertas Exclusivas).
// Independente de leads/matrículas.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

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
  if (req.method !== "POST") return json({ success: false, error: "method_not_allowed" }, 405);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return json({ success: false, message: "Payload inválido." }, 400);
  }

  const telefone = String(body.telefone || "").trim();
  const campaign_source = body.campaign_source ? String(body.campaign_source).slice(0, 120) : null;
  const user_agent = req.headers.get("user-agent") || null;
  const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "";
  const ip = ipHeader.split(",")[0].trim() || null;

  if (!telefone) {
    return json({ success: false, message: "Informe um WhatsApp válido." }, 400);
  }

  const { data, error } = await admin.rpc("submit_marketing_optin", {
    payload: { telefone, campaign_source, ip, user_agent },
  });

  if (error) {
    const msg = String(error.message || "");
    if (msg.includes("INVALID_PHONE")) {
      return json({ success: false, message: "Informe um WhatsApp válido com DDD." }, 400);
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

  return json({ success: true, message: "Cadastro realizado com sucesso." });
});
