/**
 * Camada padronizada de eventos de funil/conversão.
 *
 * Todos os eventos passam por `track()` (GA4 + GTM dataLayer + Clarity) e
 * carregam um envelope mínimo comum: event, page_path, lead_score, user_id
 * (anônimo), timestamp e variant_id quando aplicável.
 *
 * Não substitui o tracking existente — é aditivo, para o Growth Dashboard e GTM.
 */
import { track, trackConversion, type TrackPayload } from "@/lib/analytics";
import { getLeadProfile, classifyLead } from "@/lib/leadScore";

const ANON_KEY = "aptos_anon_id_v1";

export function getAnonId(): string {
  if (typeof window === "undefined") return "server";
  try {
    let id = localStorage.getItem(ANON_KEY);
    if (!id) {
      id = `a_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
      localStorage.setItem(ANON_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

function envelope(extra: TrackPayload = {}): TrackPayload {
  let lead_score = 0;
  let lead_class = "cold";
  try {
    const profile = getLeadProfile();
    lead_score = profile.score ?? 0;
    lead_class = classifyLead(lead_score);
  } catch {
    /* noop */
  }
  return {
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
    user_id: getAnonId(),
    lead_score,
    lead_class,
    timestamp: new Date().toISOString(),
    ...extra,
  };
}

/** Etapas do funil de qualificação (1..4). */
export function trackFunnelStep(step: 1 | 2 | 3 | 4, extra: TrackPayload = {}) {
  track(`funnel_step_${step}`, envelope({ funnel_step: step, ...extra }));
}

/** Funil concluído — conversão. */
export function trackFunnelComplete(extra: TrackPayload = {}) {
  trackConversion("funnel_complete", envelope(extra));
}

/** Clique em qualquer CTA de WhatsApp (direto ou funil). */
export function trackWhatsAppClick(payload: {
  source: string;
  kind: "direto" | "funil";
  variant_id?: string;
  service?: string;
}) {
  track("whatsapp_click", envelope(payload as TrackPayload));
}

/** Envio efetivo de lead pelo WhatsApp (handoff com resumo). */
export function trackWhatsAppSubmit(payload: {
  source: string;
  kind: "direto" | "funil";
  extra_context?: string;
}) {
  trackConversion("whatsapp_submit", envelope(payload as TrackPayload));
}

/** Lead gerado (formulário/triagem). */
export function trackGenerateLead(profile: TrackPayload = {}) {
  trackConversion("generate_lead", envelope(profile));
}

export type AssistantEvent = "open" | "start" | "close";

export function trackAssistant(kind: AssistantEvent, extra: TrackPayload = {}) {
  track(`smartassistant_modal_${kind}`, envelope(extra));
}
