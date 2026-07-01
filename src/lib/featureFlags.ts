/**
 * Feature Flags & A/B Testing — sistema client-side leve.
 *
 * Uso:
 *   const variant = useVariant("hero_cta", ["controle", "b"]);
 *   if (variant === "b") { ... }
 *
 * Cada visitante é atribuído deterministicamente a uma variante (hash do bucket_id
 * persistido em localStorage), garantindo consistência entre sessões.
 * Exposições e conversões são disparadas para GTM/GA4 via `track()`.
 */
import { useEffect, useMemo } from "react";
import { track } from "@/lib/analytics";

const BUCKET_KEY = "aptos_bucket_id_v1";
const EXPOSURE_KEY = "aptos_ab_exposures_v1";

function getBucketId(): string {
  if (typeof window === "undefined") return "server";
  let id = localStorage.getItem(BUCKET_KEY);
  if (!id) {
    id = `b_${Math.random().toString(36).slice(2, 10)}_${Date.now().toString(36)}`;
    localStorage.setItem(BUCKET_KEY, id);
  }
  return id;
}

// FNV-1a 32-bit — determinístico, rápido, distribui bem.
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export interface FeatureFlagConfig {
  /** Rollout de 0 a 1 — quantos usuários entram no experimento. */
  rollout?: number;
  /** Variante default para quem está fora do rollout. */
  defaultVariant?: string;
  /** Peso relativo de cada variante (default: igual). */
  weights?: Record<string, number>;
}

/**
 * Atribui variante determinística. Não dispara eventos — use `useVariant` no React.
 */
export function assignVariant<V extends string>(
  flagKey: string,
  variants: readonly V[],
  config: FeatureFlagConfig = {}
): V {
  const { rollout = 1, defaultVariant, weights } = config;
  const bucket = getBucketId();
  const seed = hash(`${flagKey}::${bucket}`);
  const rolloutSlot = (seed % 10000) / 10000;

  if (rolloutSlot >= rollout && defaultVariant) {
    return defaultVariant as V;
  }

  if (weights) {
    const total = variants.reduce((s, v) => s + (weights[v] ?? 1), 0);
    let cursor = (seed % 10000) / 10000 * total;
    for (const v of variants) {
      cursor -= weights[v] ?? 1;
      if (cursor <= 0) return v;
    }
  }

  return variants[seed % variants.length];
}

function recordExposure(flagKey: string, variant: string) {
  try {
    const raw = localStorage.getItem(EXPOSURE_KEY);
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    if (map[flagKey] === variant) return; // já disparado nesta sessão persistida
    map[flagKey] = variant;
    localStorage.setItem(EXPOSURE_KEY, JSON.stringify(map));
    track("experiment_exposure", {
      experiment_id: flagKey,
      variant_id: variant,
    });
  } catch {
    /* noop */
  }
}

/**
 * Hook React — retorna a variante e dispara exposição no mount.
 */
export function useVariant<V extends string>(
  flagKey: string,
  variants: readonly V[],
  config?: FeatureFlagConfig
): V {
  const variant = useMemo(
    () => assignVariant(flagKey, variants, config),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [flagKey]
  );

  useEffect(() => {
    recordExposure(flagKey, variant);
  }, [flagKey, variant]);

  return variant;
}

/**
 * Dispara conversão associada a um experimento.
 */
export function trackExperimentConversion(flagKey: string, goal = "primary") {
  try {
    const raw = localStorage.getItem(EXPOSURE_KEY);
    const map: Record<string, string> = raw ? JSON.parse(raw) : {};
    const variant = map[flagKey];
    if (!variant) return;
    track("experiment_conversion", {
      experiment_id: flagKey,
      variant_id: variant,
      goal,
    });
  } catch {
    /* noop */
  }
}

/**
 * Feature flag simples booleana (kill-switch).
 */
export function isFeatureEnabled(flagKey: string, defaultValue = false): boolean {
  const override =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get(`ff_${flagKey}`)
      : null;
  if (override === "1" || override === "true") return true;
  if (override === "0" || override === "false") return false;
  return defaultValue;
}
