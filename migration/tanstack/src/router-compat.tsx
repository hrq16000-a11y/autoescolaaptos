import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { useLocation as useTanStackLocation } from '@tanstack/react-router';

// Transitional bridge for the first reused page. Unmigrated links keep opening
// the existing public site instead of landing on a pilot 404.
const migrated = new Set(['/', '/perguntas-frequentes']);
type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { to: string };
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...props }, ref) => {
  const path = to.split(/[?#]/)[0];
  const href = to.startsWith('/') && !migrated.has(path)
    ? `https://autoescolaaptos.com.br${to}` : to;
  return <a {...props} href={href} ref={ref} />;
});
Link.displayName = 'MigrationLink';
export function useLocation() { return useTanStackLocation(); }
