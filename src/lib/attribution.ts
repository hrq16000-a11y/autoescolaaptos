/**
 * Preserve tagged campaign origin while visitors navigate the SPA.
 *
 * Only UTM fields are saved in sessionStorage: no personal information,
 * click IDs, referrer URLs, IP addresses, or cookies.
 * A new tagged campaign replaces the previous one (last tagged touch).
 * Direct/internal navigation never erases the tagged source.
 *
 * A source such as "ig" or "fb" identifies the Meta placement only when
 * the ad URL provides it. It does not prove a visitor clicked a paid ad:
 * check utm_medium/Ads Manager to distinguish paid from organic traffic.
 */
const STORAGE_KEY = "aptos:campaign-attribution:session:v1";

const FIELDS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

export type UTMField = (typeof FIELDS)[number];
export type AttributionUtms = Partial<Record<UTMField, string>>;

function readTaggedUrl(): AttributionUtms {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const values: AttributionUtms = {};
  for (const key of FIELDS) {
    // Never store click identifiers or arbitrary URL query parameters.
    const value = (params.get(key) || "").replace(/[\x00-\x1f\x7f]/g, "").trim().slice(0, 100);
    if (value) values[key] = value;
  }
  return values;
}

function readStored(): AttributionUtms {
  if (typeof window === "undefined") return {};
  try {
    const value = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || "null") as AttributionUtms | null;
    if (!value || typeof value !== "object") return {};
    const result: AttributionUtms = {};
    for (const key of FIELDS) {
      if (typeof value[key] === "string") result[key] = value[key]!.slice(0, 100);
    }
    return result;
  } catch {
    return {};
  }
}

export function captureCampaignAttribution(): AttributionUtms {
  const incoming = readTaggedUrl();
  if (Object.keys(incoming).length === 0) return readStored();
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(incoming));
  } catch {
    // Storage may be blocked; keep UTM values from this page working.
  }
  return incoming;
}

export function readAttributionUtms(): AttributionUtms {
  return captureCampaignAttribution();
}
