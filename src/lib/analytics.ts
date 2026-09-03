/**
 * Camada universal de analytics — dispara em paralelo para:
 *  - Google Analytics 4 (gtag)
 *  - Google Tag Manager (dataLayer)
 *  - Meta Pixel (fbq) — quando disponível
 *  - Microsoft Clarity (clarity) — quando disponível
 *
 * Todos os eventos do site devem passar por `track()` ou `trackConversion()`.
 */
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

export type TrackPayload = Record<string, unknown>;

const EVENT_LOG_KEY = "aptos_event_log_v1";
const EVENT_LOG_MAX = 400;

export interface LoggedEvent {
  event: string;
  ts: number;
  path: string;
  payload: TrackPayload;
}

/** Log local de eventos (usado pelo painel interno /admin/growth). */
export function readEventLog(): LoggedEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EVENT_LOG_KEY);
    return raw ? (JSON.parse(raw) as LoggedEvent[]) : [];
  } catch {
    return [];
  }
}

function persistEvent(eventName: string, payload: TrackPayload) {
  try {
    const entry: LoggedEvent = {
      event: eventName,
      ts: Date.now(),
      path: String(payload.page_path ?? window.location.pathname),
      payload,
    };
    const all = [...readEventLog(), entry].slice(-EVENT_LOG_MAX);
    localStorage.setItem(EVENT_LOG_KEY, JSON.stringify(all));
  } catch {
    /* noop */
  }
}

export function track(eventName: string, payload: TrackPayload = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", eventName, payload);
    window.dataLayer?.push({ event: eventName, ...payload });
    // Clarity custom tag — para filtrar heatmaps por evento
    window.clarity?.("set", eventName, JSON.stringify(payload).slice(0, 240));
    persistEvent(eventName, payload);
  } catch {
    /* noop */
  }
}


export function trackConversion(name: string, payload: TrackPayload = {}) {
  track(name, { ...payload, is_conversion: true });
  if (typeof window !== "undefined") {
    window.fbq?.("track", "Lead", payload);
  }
}

export function trackPageView(path: string, title?: string) {
  track("page_view", { page_path: path, page_title: title });
}

export function identifyLead(profile: { score: number; class: string; category?: string; urgency?: string }) {
  if (typeof window === "undefined") return;
  try {
    window.clarity?.("set", "lead_score", String(profile.score));
    window.clarity?.("set", "lead_class", profile.class);
    if (profile.category) window.clarity?.("set", "lead_category", profile.category);
    if (profile.urgency) window.clarity?.("set", "lead_urgency", profile.urgency);
    window.dataLayer?.push({
      event: "lead_identified",
      lead_score: profile.score,
      lead_class: profile.class,
      lead_category: profile.category,
      lead_urgency: profile.urgency,
    });
  } catch {
    /* noop */
  }
}
