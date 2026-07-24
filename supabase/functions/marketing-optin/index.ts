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

  const telefone = str(body.telefone, 40);
  const campaign_source = str(body.campaign_source, 120);
  const origem_url = str(body.origem_url, 500) ?? req.headers.get("referer");
  const ultimo_template_enviado = str(body.ultimo_template_enviado, 120);
  const lgpd_aceite = body.lgpd_aceite === true || body.lgpd_aceite === "true";

  const user_agent = req.headers.get("user-agent") || null;
  const ipHeader = req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "";
  const ip = ipHeader.split(",")[0].trim() || null;

  const errors: Record<string, string> = {};
  if (!telefone) errors.telefone = "Informe um WhatsApp válido.";
  else {
    const digits = telefone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 13) errors.telefone = "DDD + número (10 a 13 dígitos).";
  }
  if (!lgpd_aceite) errors.lgpd_aceite = "Consentimento obrigatório.";

  if (Object.keys(errors).length) {
    console.warn("marketing_optin validation_failed", { errors, ip, campaign_source });
    return json({ success: false, message: "Dados inválidos.", errors }, 400);
  }

  const payload = {
    telefone,
    campaign_source,
    origem_url,
    ultimo_template_enviado,
    ip,
    user_agent,
    lgpd_aceite: true,
  };

  console.log("marketing_optin submit", {
    ip,
    campaign_source,
    origem_url,
    ultimo_template_enviado,
    ua_len: user_agent?.length ?? 0,
  });

  const { data, error } = await admin.rpc("submit_marketing_optin", { payload });

  if (error) {
    const msg = String(error.message || "");
    if (msg.includes("INVALID_PHONE")) {
      return json({ success: false, message: "Informe um WhatsApp válido com DDD." }, 400);
    }
    if (msg.includes("LGPD_REQUIRED")) {
      return json({ success: false, message: "Consentimento obrigatório." }, 400);
    }
    if (msg.includes("INVALID_CAMPAIGN") || msg.includes("INVALID_TEMPLATE")) {
      return json({ success: false, message: "Parâmetro de campanha inválido." }, 400);
    }
    console.error("marketing_optin failed:", error);
    return json({ success: false, message: "Falha temporária. Tente novamente." }, 500);
  }

  const result = data as { ok?: boolean; duplicate?: boolean; id?: string };
  if (result?.duplicate) {
    console.log("marketing_optin duplicate", { id: result.id, campaign_source });
    return json({
      success: false,
      duplicate: true,
      message: "Este número já está participando do Programa de Ofertas Exclusivas.",
    }, 200);
  }

  console.log("marketing_optin created", { id: result?.id, campaign_source });
  return json({ success: true, id: result?.id, message: "Cadastro realizado com sucesso." });
});
