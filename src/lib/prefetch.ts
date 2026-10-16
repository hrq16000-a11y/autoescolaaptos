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
  "/perguntas-frequentes": () => import("@/pages/FAQ"),
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
  if (typeof window === "undefined" || typeof navigator === "undefined") return;
  if (!importer || done.has(path) || saveData() || document.visibilityState === "hidden") return;
  done.add(path);
  importer().catch(() => done.delete(path));
}

// Only the two conversion routes are downloaded speculatively. Other routes
// remain available through explicit intent-based prefetchRoute calls.
export function prefetchIdleRoutes(paths: string[] = ["/orcamento", "/1contato"]): () => void {
  if (typeof window === "undefined" || typeof navigator === "undefined" || saveData()) return () => {};
  const pending = [...paths];
  let cancelled = false;
  let handle: number;
  const ric = window.requestIdleCallback?.bind(window);
  const schedule = () => {
    handle = ric ? ric(run, { timeout: 4000 }) : window.setTimeout(run, 2500);
  };
  const run = () => {
    if (cancelled || document.visibilityState === "hidden" || saveData()) return;
    const path = pending.shift();
    if (path) prefetchRoute(path);
    if (pending.length) schedule();
  };
  schedule();
  return () => {
    cancelled = true;
    if (ric) window.cancelIdleCallback(handle);
    else window.clearTimeout(handle);
  };
}
