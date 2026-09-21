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
    const action = url.searchParams.get("action");
    const status = url.searchParams.get("status_funil");
    const utm = url.searchParams.get("utm_source");
    const device = url.searchParams.get("device");
    const ip = url.searchParams.get("ip");
    const minTempo = parseInt(url.searchParams.get("min_tempo") || "0");
    const from = url.searchParams.get("from"); // ISO date
    const to = url.searchParams.get("to");     // ISO date

    if (action === "campaigns") {
      const definitions = [
        { campaign: "polo_automatico", label: "Polo automático", aliases: ["polo_automatico", "carro_automatico"] },
        { campaign: "promocao_aniversario", label: "Promoção de aniversário", aliases: ["promocao_aniversario", "aniversario"] },
        { campaign: "indique_amigo", label: "Indique um amigo", aliases: ["indique_amigo", "indicacao"] },
        { campaign: "campanha_geral", label: "Campanha geral", aliases: ["campanha_geral", "campanha"] },
      ];

      let eventsQuery = admin
        .from("campaign_events")
        .select("campaign, event_type, device, utm_source, created_at");
      let leadsQuery = admin
        .from("triagem_leads")
        .select("origem, utm_campaign, device, utm_source, created_at");
      let optinsQuery = admin
        .from("marketing_optin")
        .select("campaign_source, created_at");
      if (from) {
        eventsQuery = eventsQuery.gte("created_at", from);
        leadsQuery = leadsQuery.gte("created_at", from);
        optinsQuery = optinsQuery.gte("created_at", from);
      }
      if (to) {
        eventsQuery = eventsQuery.lte("created_at", to);
        leadsQuery = leadsQuery.lte("created_at", to);
        optinsQuery = optinsQuery.lte("created_at", to);
      }

      const [eventsResult, leadsResult, optinsResult] = await Promise.all([
        eventsQuery.limit(20000),
        leadsQuery.limit(10000),
        optinsQuery.limit(10000),
      ]);
      const readError = eventsResult.error || leadsResult.error || optinsResult.error;
      if (readError) return json({ error: "query_failed", message: readError.message }, 500);

      const campaigns = definitions.map((definition) => {
        const matches = (value: unknown) => {
          const normalized = String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "_");
          return definition.aliases.some((alias) => normalized.includes(alias));
        };
        const events = (eventsResult.data ?? []).filter((row) => row.campaign === definition.campaign);
        const leads = (leadsResult.data ?? []).filter((row) => matches(row.utm_campaign) || matches(row.origem));
        const optins = (optinsResult.data ?? []).filter((row) => matches(row.campaign_source));
        const views = events.filter((row) => row.event_type === "view").length;
        const whatsappClicks = events.filter((row) => row.event_type === "whatsapp_click").length;
        const byDevice: Record<string, number> = {};
        const bySource: Record<string, number> = {};
        events.forEach((row) => {
          const deviceName = row.device || "não identificado";
          const sourceName = row.utm_source || "direto";
          byDevice[deviceName] = (byDevice[deviceName] || 0) + 1;
          bySource[sourceName] = (bySource[sourceName] || 0) + 1;
        });
        leads.forEach((row) => {
          const deviceName = row.device || "não identificado";
          const sourceName = row.utm_source || "direto";
          byDevice[deviceName] = (byDevice[deviceName] || 0) + 1;
          bySource[sourceName] = (bySource[sourceName] || 0) + 1;
        });
        return {
          campaign: definition.campaign,
          label: definition.label,
          views,
          whatsappClicks,
          leads: leads.length + optins.length,
          clickRate: views ? whatsappClicks / views : 0,
          byDevice,
          bySource,
        };
      });
      return json({ campaigns });
    }

    // ---- Modo métricas: agrega contagens/taxas de conversão ----
    if (action === "metrics") {
      let q = admin.from("triagem_leads").select("status_funil, servico, device, utm_source, utm_campaign, created_at");
      if (utm) q = q.eq("utm_source", utm);
      if (device) q = q.eq("device", device);
      if (from) q = q.gte("created_at", from);
      if (to) q = q.lte("created_at", to);
      const { data, error } = await q.limit(10000);
      if (error) return json({ error: "query_failed", message: error.message }, 500);

      const rows = data ?? [];
      const byStatus: Record<string, number> = { new: 0, contacted: 0, booked: 0, won: 0, lost: 0 };
      const byServico: Record<string, number> = {};
      const byUtm: Record<string, number> = {};
      const byDevice: Record<string, number> = {};
      const byDay: Record<string, number> = {};
      rows.forEach((r) => {
        byStatus[r.status_funil] = (byStatus[r.status_funil] || 0) + 1;
        if (r.servico) byServico[r.servico] = (byServico[r.servico] || 0) + 1;
        const src = r.utm_source || "direto";
        byUtm[src] = (byUtm[src] || 0) + 1;
        if (r.device) byDevice[r.device] = (byDevice[r.device] || 0) + 1;
        const day = new Date(r.created_at as string).toISOString().slice(0, 10);
        byDay[day] = (byDay[day] || 0) + 1;
      });
      const total = rows.length;
      const contactedPlus = byStatus.contacted + byStatus.booked + byStatus.won + byStatus.lost;
      const bookedPlus = byStatus.booked + byStatus.won + byStatus.lost;
      const closed = byStatus.won + byStatus.lost;
      const rates = {
        contact_rate: total ? contactedPlus / total : 0,
        book_rate: contactedPlus ? bookedPlus / contactedPlus : 0,
        close_rate: bookedPlus ? closed / bookedPlus : 0,
        win_rate: closed ? byStatus.won / closed : 0,
        overall_win_rate: total ? byStatus.won / total : 0,
      };
      return json({ total, byStatus, byServico, byUtm, byDevice, byDay, rates });
    }

    // ---- Modo listagem ----
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "200"), 1000);
    let q = admin.from("triagem_leads").select("*").order("created_at", { ascending: false }).limit(limit);
    if (status) q = q.eq("status_funil", status);
    if (utm) q = q.eq("utm_source", utm);
    if (device) q = q.eq("device", device);
    if (ip) q = q.eq("ip", ip);
    if (minTempo > 0) q = q.gte("tempo_gasto_segundos", minTempo);
    if (from) q = q.gte("created_at", from);
    if (to) q = q.lte("created_at", to);

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
