import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const CAMPAIGNS = new Set([
  "polo_automatico",
  "promocao_aniversario",
  "indique_amigo",
  "campanha_geral",
]);
const EVENT_TYPES = new Set(["view", "whatsapp_click"]);

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function clean(value: unknown, max = 160) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().slice(0, max);
  return normalized || null;
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

  const campaign = clean(body.campaign, 80);
  const eventType = clean(body.event_type, 40);
  if (!campaign || !CAMPAIGNS.has(campaign) || !eventType || !EVENT_TYPES.has(eventType)) {
    return json({ error: "invalid_event" }, 400);
  }

  const anonId = clean(body.anon_id, 100);
  if (anonId) {
    const since = new Date(Date.now() - 60_000).toISOString();
    const { count } = await admin
      .from("campaign_events")
      .select("id", { count: "exact", head: true })
      .eq("anon_id", anonId)
      .gte("created_at", since);
    if ((count ?? 0) >= 30) return json({ error: "rate_limit" }, 429);
  }

  const device = clean(body.device, 20);
  const row = {
    campaign,
    event_type: eventType,
    source: clean(body.source, 80),
    page_path: clean(body.page_path, 200) ?? "/",
    anon_id: anonId,
    device: device && ["mobile", "tablet", "desktop"].includes(device) ? device : null,
    utm_source: clean(body.utm_source),
    utm_medium: clean(body.utm_medium),
    utm_campaign: clean(body.utm_campaign),
    utm_content: clean(body.utm_content),
    utm_term: clean(body.utm_term),
  };

  const { error } = await admin.from("campaign_events").insert(row);
  if (error) {
    console.error("campaign event insert failed:", error.message);
    return json({ error: "insert_failed" }, 500);
  }
  return json({ ok: true }, 201);
});