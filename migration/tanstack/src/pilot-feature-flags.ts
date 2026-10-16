import { useEffect, useState } from 'react';
import { track } from '../../../src/lib/analytics';
import { assignVariant } from '../../../src/lib/featureFlags';
import type { FeatureFlagConfig } from '../../../src/lib/featureFlags';

export { assignVariant, trackExperimentConversion, isFeatureEnabled } from '../../../src/lib/featureFlags';
export type { FeatureFlagConfig } from '../../../src/lib/featureFlags';

const EXPOSURES = 'aptos_ab_exposures_v1';

/**
 * Variante SSR/hidratação determinística no piloto TanStack.
 * Não lê localStorage durante a renderização inicial no servidor ou navegador.
 * Após o mount, aplica a mesma atribuição/persistência do app existente.
 */
export function useVariant<V extends string>(
  flagKey: string,
  variants: readonly V[],
  config?: FeatureFlagConfig,
): V {
  const [variant, setVariant] = useState<V>(() => variants[0]);
  useEffect(() => {
    const assigned = assignVariant(flagKey, variants, config);
    setVariant(assigned);
    try {
      const raw = localStorage.getItem(EXPOSURES);
      const exposures: Record<string, string> = raw ? JSON.parse(raw) : {};
      if (exposures[flagKey] === assigned) return;
      exposures[flagKey] = assigned;
      localStorage.setItem(EXPOSURES, JSON.stringify(exposures));
      track('experiment_exposure', {
        experiment_id: flagKey,
        variant_id: assigned,
      });
    } catch {
      // Bloqueio de armazenamento não impede o site de funcionar.
    }
    // Variantes/configurações deste hook são constantes por flag.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagKey]);
  return variant;
}
