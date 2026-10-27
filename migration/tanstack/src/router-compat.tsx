import { forwardRef, useCallback, type AnchorHTMLAttributes } from 'react';
import { Link as TanStackLink, useLocation as useTanStackLocation, useRouter, useRouterState } from '@tanstack/react-router';
import protectedRoutes from '../protected-routes.json';

// Unmigrated destinations continue to open the existing public site.
const migrated = new Set(['/', '/perguntas-frequentes', '/primeira-habilitacao', '/exames-detran', '/resolucao-1020-2025', '/formas-estudo-teorico', '/aulas-praticas-direcao', '/por-que-autoescola-credenciada', '/carro-automatico', '/orcamento', '/calculadora-cnh', '/comparador', '/pcd', '/autoescola-sao-jose-dos-pinhais', '/cnh-sao-jose-dos-pinhais', '/categoria-a', '/categoria-b', '/categoria-ab', '/inclusao-categoria', '/reciclagem-cnh', '/reteste-pratico', '/aulas-praticas', '/parceiros/ping-solucoes', '/parceiros/mestre-dos-servicos', '/parceiros/preciso-de-um-tecnico', '/promocao-aniversario', '/promocao-indique-amigo', '/aprovados', '/simulado-detran-pr', '/blog', '/bairros']);
function isLegacyProtectedPath(path: string): boolean {
  return protectedRoutes.exact.includes(path) || protectedRoutes.prefixes.some(prefix => path.startsWith(prefix));
}
function migratedDestination(to: string) {
  const path = to.split(/[?#]/)[0];
  if (isLegacyProtectedPath(path)) return false;
  return to.startsWith('/') && (migrated.has(path) || /^\/(blog|bairros)\/[^/]+$/.test(path));
}
function publicDestination(to: string) {
  return to.startsWith('/') ? `https://autoescolaaptos.com.br${to}` : to;
}
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  if (migratedDestination(to)) {
    return <TanStackLink {...props} to={to} ref={ref} />;
  }
  return <a {...props} href={publicDestination(to)} ref={ref} />;
});
Link.displayName = 'MigrationLink';
export function useLocation() { return useTanStackLocation(); }
export function useNavigate() {
  const router = useRouter();
  return useCallback((to: string | number, options?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;
    if (typeof to === 'number') { window.history.go(to); return; }
    if (migratedDestination(to)) return router.navigate({ href: to, replace: options?.replace });
    const href = publicDestination(to);
    if (options?.replace) window.location.replace(href);
    else window.location.assign(href);
  }, [router]);
}

export function useParams<T extends Record<string, string | undefined> = Record<string, string | undefined>>() {
  const matches = useRouterState({ select: state => state.matches });
  return (matches[matches.length - 1]?.params ?? {}) as Partial<T>;
}
export { Navigate } from '@tanstack/react-router';
