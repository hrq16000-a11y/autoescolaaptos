// Edge function protegida por token: /functions/v1/admin-optin
// Painel do Programa de Ofertas Exclusivas (marketing_optin).
// Ações:
//  - GET  ?action=list&limit=500&status=autorizado&campaign_source=julho2026&from=...&to=...&q=41999
//  - GET  ?action=metrics&from=...&to=...
// Autenticação: header `x-admin-token` = secret ADMIN_LEADS_TOKEN.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ADMIN_TOKEN = Deno.env.get("ADMIN_LEADS_TOKEN");

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
  if (!ADMIN_TOKEN) return json({ error: "not_configured" }, 500);
  const token = req.headers.get("x-admin-token") || "";
  if (token !== ADMIN_TOKEN) return json({ error: "unauthorized" }, 401);

  if (req.method !== "GET") return json({ error: "method_not_allowed" }, 405);

  const url = new URL(req.url);
  const action = url.searchParams.get("action") || "list";
  const status = url.searchParams.get("status");
  const campaign = url.searchParams.get("campaign_source");
  const from = url.searchParams.get("from");
  const to = url.searchParams.get("to");
  const q = url.searchParams.get("q");

  if (action === "metrics") {
    let query = admin
      .from("marketing_optin")
      .select("status, campaign_source, ultimo_template_enviado, quantidade_campanhas, created_at, data_aceite")
      .limit(20000);
    if (from) query = query.gte("created_at", from);
    if (to) query = query.lte("created_at", to);
    if (status) query = query.eq("status", status);
    if (campaign) query = query.eq("campaign_source", campaign);

    const { data, error } = await query;
    if (error) return json({ error: "query_failed", message: error.message }, 500);

    const rows = data ?? [];
    const total = rows.length;
    const byStatus: Record<string, number> = {};
    const byCampaign: Record<string, { optins: number; retorno: number; taxa: number }> = {};
    const byTemplate: Record<string, number> = {};
    const byDay: Record<string, number> = {};

    for (const r of rows) {
      const st = r.status || "indefinido";
      byStatus[st] = (byStatus[st] || 0) + 1;

      const c = r.campaign_source || "(sem campanha)";
      if (!byCampaign[c]) byCampaign[c] = { optins: 0, retorno: 0, taxa: 0 };
      byCampaign[c].optins += 1;
      if ((r.quantidade_campanhas ?? 0) > 0) byCampaign[c].retorno += 1;

      if (r.ultimo_template_enviado) {
        byTemplate[r.ultimo_template_enviado] = (byTemplate[r.ultimo_template_enviado] || 0) + 1;
      }

      const day = new Date(r.created_at as string).toISOString().slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;
    }
    for (const c of Object.keys(byCampaign)) {
      const row = byCampaign[c];
      row.taxa = row.optins ? row.retorno / row.optins : 0;
    }

    return json({ total, byStatus, byCampaign, byTemplate, byDay });
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
  if (from) query = query.gte("created_at", from);
  if (to) query = query.lte("created_at", to);
  if (q) query = query.ilike("telefone", `%${q.replace(/\D/g, "")}%`);

  const { data, error } = await query;
  if (error) return json({ error: "query_failed", message: error.message }, 500);
  return json({ optins: data ?? [] });
});
