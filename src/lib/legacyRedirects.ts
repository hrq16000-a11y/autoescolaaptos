// Single source of truth para redirects legados.
// Usado pelo App.tsx (aplicar <Navigate />) e pelo /diagnostico-seo (auditoria).
export interface LegacyRedirect {
  from: string;      // path original (pode conter *)
  to: string;        // destino final
  reason: string;    // por que existe
  code: 301 | 308;   // intenção semântica (client-side <Navigate replace /> emula 301)
}

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  { from: "/site",          to: "/",         reason: "Home do site antigo",              code: 301 },
  { from: "/site/*",        to: "/",         reason: "Qualquer subpágina do site antigo", code: 301 },
  { from: "/site/contato",  to: "/#contato", reason: "Contato do site antigo",             code: 301 },
  { from: "/modelo1",       to: "/",         reason: "Template modelo1",                  code: 301 },
  { from: "/modelo1/*",     to: "/",         reason: "Subpáginas do template modelo1",    code: 301 },
  { from: "/1",             to: "/",         reason: "Path de teste antigo",              code: 301 },
  { from: "/1/*",           to: "/",         reason: "Subpáginas do path /1",             code: 301 },
  { from: "/index.html",    to: "/",         reason: "Arquivo raiz herdado",              code: 308 },
  { from: "/home",          to: "/",         reason: "Alias comum de home",               code: 301 },
  { from: "/contato",       to: "/#contato", reason: "Ancoragem para seção de contato",   code: 301 },
];
