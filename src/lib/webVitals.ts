/**
 * Coleta local de Core Web Vitals (LCP, CLS, INP) sem dependências externas.
 * Os valores são persistidos em localStorage por rota e lidos pelo painel
 * interno /admin/growth. Também são enviados ao dataLayer/GA4 via `track`.
 */
import { track } from "@/lib/analytics";

const STORE_KEY = "aptos_web_vitals_v1";
const MAX_ENTRIES = 200;

export interface VitalSample {
  metric: "LCP" | "CLS" | "INP";
  value: number;
  path: string;
  ts: number;
}

export function readVitals(): VitalSample[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORE_KEY);
    return raw ? (JSON.parse(raw) as VitalSample[]) : [];
  } catch {
    return [];
  }
}

function save(sample: VitalSample) {
  try {
    const all = [...readVitals(), sample].slice(-MAX_ENTRIES);
    localStorage.setItem(STORE_KEY, JSON.stringify(all));
  } catch {
    /* noop */
  }
  track("web_vitals", {
    metric_name: sample.metric,
    metric_value: Math.round(sample.value * 1000) / 1000,
    page_path: sample.path,
  });
}

function observe(type: string, cb: (entries: PerformanceEntry[]) => void) {
  try {
    const po = new PerformanceObserver((list) => cb(list.getEntries()));
    // buffered garante que entradas anteriores ao init sejam capturadas
    po.observe({ type, buffered: true } as PerformanceObserverInit);
    return po;
  } catch {
    return null;
  }
}

export function initWebVitals() {
  if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
  const path = () => window.location.pathname;

  let lcp = 0;
  observe("largest-contentful-paint", (entries) => {
    const last = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
    if (last) lcp = last.startTime;
  });

  let cls = 0;
  observe("layout-shift", (entries) => {
    for (const e of entries as (PerformanceEntry & { value: number; hadRecentInput: boolean })[]) {
      if (!e.hadRecentInput) cls += e.value;
    }
  });

  let inp = 0;
  observe("event", (entries) => {
    for (const e of entries as (PerformanceEntry & { duration: number })[]) {
      if (e.duration > inp) inp = e.duration;
    }
  });

  const flush = () => {
    const p = path();
    if (lcp > 0) save({ metric: "LCP", value: lcp, path: p, ts: Date.now() });
    save({ metric: "CLS", value: cls, path: p, ts: Date.now() });
    if (inp > 0) save({ metric: "INP", value: inp, path: p, ts: Date.now() });
    lcp = 0;
    cls = 0;
    inp = 0;
  };

  let flushed = false;
  const once = () => {
    if (flushed) return;
    flushed = true;
    flush();
  };

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") once();
  });
  window.addEventListener("pagehide", once);
  // fallback: reporta após 12s de navegação para painéis em sessões longas
  window.setTimeout(() => {
    if (!flushed) flush();
  }, 12000);
}

export const VITAL_THRESHOLDS: Record<VitalSample["metric"], [number, number]> = {
  LCP: [2500, 4000],
  CLS: [0.1, 0.25],
  INP: [200, 500],
};

export function rateVital(metric: VitalSample["metric"], value: number) {
  const [good, poor] = VITAL_THRESHOLDS[metric];
  if (value <= good) return "bom" as const;
  if (value <= poor) return "regular" as const;
  return "ruim" as const;
}
