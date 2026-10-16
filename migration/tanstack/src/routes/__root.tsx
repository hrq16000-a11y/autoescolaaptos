import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import '@/index.css';
export const Route = createRootRoute({
  head: () => ({ meta: [
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'noindex, nofollow' },
    { title: 'APTOS — validação da migração' },
  ] }),
  component: () => <html lang="pt-BR"><head><HeadContent /></head><body><Outlet /><Scripts /></body></html>,
});
