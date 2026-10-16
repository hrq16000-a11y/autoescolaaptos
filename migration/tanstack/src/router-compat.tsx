import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useLocation as useTanStackLocation } from '@tanstack/react-router';

// Transitional bridge for the first reused page. Unmigrated links keep opening
// the existing public site instead of landing on a pilot 404.
const migrated = new Set(['/', '/perguntas-frequentes', '/primeira-habilitacao', '/exames-detran', '/resolucao-1020-2025']);
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const path = to.split(/[?#]/)[0];
  const href = to.startsWith('/') && !migrated.has(path)
    ? `https://autoescolaaptos.com.br${to}` : to;
  return <a {...props} href={href} ref={ref} />;
});
Link.displayName = 'MigrationLink';
export function useLocation() { return useTanStackLocation(); }

export function useNavigate() {
  return (to: string | number, options?: { replace?: boolean }) => {
    if (typeof window === 'undefined') return;
    if (typeof to === 'number') { window.history.go(to); return; }
    const path = to.split(/[?#]/)[0];
    const href = to.startsWith('/') && !migrated.has(path) ? `https://autoescolaaptos.com.br${to}` : to;
    if (options?.replace) window.location.replace(href);
    else window.location.assign(href);
  };
}
