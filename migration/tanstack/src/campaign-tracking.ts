/**
 * Campaign telemetry adapter for the isolated TanStack staging app.
 *
 * Campaign pages retain their UTM parsing and analytics events, but this
 * adapter intentionally does not invoke the production Supabase function.
 * Staging must never create campaign rows or send external writes.
 */
export type CampaignName =
  | 'polo_automatico'
  | 'promocao_aniversario'
  | 'indique_amigo'
  | 'campanha_geral';

export type CampaignEventType = 'view' | 'whatsapp_click';

export function readCampaignUtms() {
  if (typeof window === 'undefined') return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
    utm_term: params.get('utm_term') ?? undefined,
  };
}

export function recordCampaignEvent(
  _campaign: CampaignName,
  _eventType: CampaignEventType,
  _source?: string,
) {
  // Intentionally a no-op in the isolated pre-production pilot.
}
