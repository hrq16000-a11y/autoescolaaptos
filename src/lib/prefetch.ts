/**
 * Prefetch de rotas secundárias em idle — melhora a navegação percebida sem
 * competir com o carregamento inicial (LCP).
 *
 * Usa requestIdleCallback quando disponível; nunca roda em conexões lentas
 * ou com data-saver ativo.
 */
type Importer = () => Promise<unknown>;

const done = new Set<string>();

const ROUTES: Record<string, Importer> = {
  "/orcamento": () => import("@/pages/Orcamento"),
  "/1contato": () => import("@/pages/UmContato"),
  "/calculadora-cnh": () => import("@/pages/CalculadoraCnh"),
  "/simulado-detran-pr": () => import("@/pages/SimuladoDetranPr"),
  "/primeira-habilitacao": () => import("@/pages/PrimeiraHabilitacao"),
  "/faq": () => import("@/pages/FAQ"),
};

function saveData(): boolean {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  };
  const c = nav.connection;
  if (!c) return false;
  if (c.saveData) return true;
  return c.effectiveType === "slow-2g" || c.effectiveType === "2g";
}

export function prefetchRoute(path: string) {
  const importer = ROUTES[path];
  if (!importer || done.has(path) || saveData()) return;
  done.add(path);
  importer().catch(() => done.delete(path));
}

export function prefetchIdleRoutes(paths: string[] = Object.keys(ROUTES)) {
  if (typeof window === "undefined" || saveData()) return;
  const run = () => paths.forEach(prefetchRoute);
  const ric = (window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  }).requestIdleCallback;
  if (ric) ric(run, { timeout: 4000 });
  else window.setTimeout(run, 2500);
}
