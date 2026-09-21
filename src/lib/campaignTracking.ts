import { supabase } from "@/integrations/supabase/client";
import { getAnonId } from "@/lib/events";

export type CampaignName =
  | "polo_automatico"
  | "promocao_aniversario"
  | "indique_amigo"
  | "campanha_geral";

export type CampaignEventType = "view" | "whatsapp_click";

export function readCampaignUtms() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
  };
}

function detectDevice() {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
}

export function recordCampaignEvent(
  campaign: CampaignName,
  eventType: CampaignEventType,
  source?: string,
) {
  if (typeof window === "undefined") return;

  const payload = {
    campaign,
    event_type: eventType,
    source,
    page_path: window.location.pathname,
    anon_id: getAnonId(),
    device: detectDevice(),
    ...readCampaignUtms(),
  };

  void supabase.functions.invoke("campaign-events", { body: payload }).catch(() => {
    // Analytics never blocks the visitor's primary action.
  });
}