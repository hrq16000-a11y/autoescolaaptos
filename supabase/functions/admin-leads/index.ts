// Edge function protegida por token: /functions/v1/admin-leads
// Ações:
//  - GET  ?limit=200&status_funil=new&utm_source=google&device=mobile&ip=...&min_tempo=10
//  - POST { id, status_funil }  → atualiza status do funil do lead
// Autenticação: header `x-admin-token` deve bater com o secret `ADMIN_LEADS_TOKEN`.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_TOKEN = Deno.env.get("ADMIN_LEADS_TOKEN");

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const ALLOWED_STATUS = ["new", "contacted", "booked", "won", "lost"] as const;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  if (!ADMIN_TOKEN) {
    return json({ error: "not_configured", message: "ADMIN_LEADS_TOKEN não configurado." }, 500);
  }
  const token = req.headers.get("x-admin-token") || "";
  if (token !== ADMIN_TOKEN) {
    return json({ error: "unauthorized" }, 401);
  }

  if (req.method === "GET") {
    const url = new URL(req.url);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "200"), 1000);
    const status = url.searchParams.get("status_funil");
    const utm = url.searchParams.get("utm_source");
    const device = url.searchParams.get("device");
    const ip = url.searchParams.get("ip");
    const minTempo = parseInt(url.searchParams.get("min_tempo") || "0");

    let q = admin.from("triagem_leads").select("*").order("created_at", { ascending: false }).limit(limit);
    if (status) q = q.eq("status_funil", status);
    if (utm) q = q.eq("utm_source", utm);
    if (device) q = q.eq("device", device);
    if (ip) q = q.eq("ip", ip);
    if (minTempo > 0) q = q.gte("tempo_gasto_segundos", minTempo);

    const { data, error } = await q;
    if (error) return json({ error: "query_failed", message: error.message }, 500);
    return json({ leads: data ?? [] });
  }

  if (req.method === "POST") {
    let body: { id?: string; status_funil?: string };
    try {
      body = await req.json();
    } catch {
      return json({ error: "invalid_json" }, 400);
    }
    if (!body.id || !body.status_funil || !ALLOWED_STATUS.includes(body.status_funil as never)) {
      return json({ error: "invalid_payload", message: "id e status_funil válidos são obrigatórios." }, 400);
    }
    const { error } = await admin
      .from("triagem_leads")
      .update({ status_funil: body.status_funil, updated_at: new Date().toISOString() })
      .eq("id", body.id);
    if (error) return json({ error: "update_failed", message: error.message }, 500);
    return json({ ok: true });
  }

  return json({ error: "method_not_allowed" }, 405);
});
