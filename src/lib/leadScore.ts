/**
 * Lead Scoring — calcula score do visitante para priorização no CRM.
 * Persistido em localStorage. Pronto para integração futura (HubSpot/RD/Pipedrive).
 */
export type LeadSignal =
  | { type: "category"; value: "A" | "B" | "AB" }
  | { type: "service"; value: "primeira" | "inclusao" | "reciclagem" | "reteste" | "mudanca" | "aulas" }
  | { type: "urgency"; value: "hoje" | "semana" | "mes" | "futuro" }
  | { type: "experience"; value: "nenhuma" | "ppd" | "ja_dirigiu" }
  | { type: "time_on_site"; seconds: number }
  | { type: "pages_viewed"; count: number }
  | { type: "funnel_complete" }
  | { type: "whatsapp_click" };

const KEY = "aptos_lead_score_v1";

interface LeadProfile {
  score: number;
  signals: string[];
  firstSeen: number;
  lastSeen: number;
  pagesViewed: number;
  category?: string;
  service?: string;
  urgency?: string;
  experience?: string;
}

const SCORE_TABLE: Record<string, number> = {
  "category:AB": 25,
  "category:A": 15,
  "category:B": 20,
  "service:primeira": 15,
  "service:inclusao": 20,
  "service:mudanca": 18,
  "service:reciclagem": 12,
  "service:reteste": 10,
  "service:aulas": 14,
  "urgency:hoje": 35,
  "urgency:semana": 25,
  "urgency:mes": 15,
  "urgency:futuro": 5,
  "experience:nenhuma": 15,
  "experience:ppd": 10,
  "experience:ja_dirigiu": 5,
  "funnel_complete": 40,
  "whatsapp_click": 20,
};

export function getLeadProfile(): LeadProfile {
  if (typeof window === "undefined") return emptyProfile();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return emptyProfile();
    return JSON.parse(raw);
  } catch {
    return emptyProfile();
  }
}

function emptyProfile(): LeadProfile {
  const now = Date.now();
  return { score: 0, signals: [], firstSeen: now, lastSeen: now, pagesViewed: 0 };
}

function persist(profile: LeadProfile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    /* noop */
  }
}

export function addSignal(signal: LeadSignal) {
  const profile = getLeadProfile();
  let key = "";
  switch (signal.type) {
    case "category":
      profile.category = signal.value;
      key = `category:${signal.value}`;
      break;
    case "service":
      profile.service = signal.value;
      key = `service:${signal.value}`;
      break;
    case "urgency":
      profile.urgency = signal.value;
      key = `urgency:${signal.value}`;
      break;
    case "experience":
      profile.experience = signal.value;
      key = `experience:${signal.value}`;
      break;
    case "time_on_site":
      if (signal.seconds >= 90 && !profile.signals.includes("time_90s")) {
        profile.signals.push("time_90s");
        profile.score += 10;
      }
      break;
    case "pages_viewed":
      profile.pagesViewed = signal.count;
      if (signal.count >= 3 && !profile.signals.includes("pages_3plus")) {
        profile.signals.push("pages_3plus");
        profile.score += 15;
      }
      break;
    case "funnel_complete":
      key = "funnel_complete";
      break;
    case "whatsapp_click":
      key = "whatsapp_click";
      break;
  }
  if (key && !profile.signals.includes(key)) {
    profile.signals.push(key);
    profile.score += SCORE_TABLE[key] ?? 0;
  }
  profile.lastSeen = Date.now();
  persist(profile);
  return profile;
}

export function classifyLead(score: number): "frio" | "morno" | "quente" | "fervendo" {
  if (score >= 80) return "fervendo";
  if (score >= 50) return "quente";
  if (score >= 25) return "morno";
  return "frio";
}

export function resetLead() {
  try { localStorage.removeItem(KEY); } catch { /* noop */ }
}
