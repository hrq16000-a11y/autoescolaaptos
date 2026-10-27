declare module '@/pages/FAQ' {
  import type { FunctionComponent } from 'react';
  const FAQ: FunctionComponent;
  export default FAQ;
}

declare module '@/pages/PrimeiraHabilitacao' {
  import type { FunctionComponent } from 'react';
  export const jsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/ExamesDetran' {
  import type { FunctionComponent } from 'react';
  export const jsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/Resolucao1020' {
  import type { FunctionComponent } from 'react';
  export const jsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/Index' {
  import type { FunctionComponent } from 'react';
  export const homeJsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}
declare module '@/hooks/useFunnelModal' {
  import type { FunctionComponent, ReactNode } from 'react';
  export const FunnelProvider: FunctionComponent<{ children: ReactNode }>;
}

declare module '@/pages/FormasEstudoTeorico' {
  import type { FunctionComponent } from 'react';
  export const jsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/AulasPraticasDirecao' {
  import type { FunctionComponent } from 'react';
  export const jsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/PorQueAutoescola' {
  import type { FunctionComponent } from 'react';
  export const jsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/CarroAutomatico' {
  import type { FunctionComponent } from 'react';
  export const jsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/Blog' {
 import type { FunctionComponent } from 'react';
 export const blogJsonLd: object;
 const Page: FunctionComponent; export default Page;
}

declare module '@/pages/NeighborhoodsIndex' {
 import type { FunctionComponent } from 'react';
 export const jsonLd: object;
 const Page: FunctionComponent; export default Page;
}

declare module '@/pages/BlogPost' {
 import type { FunctionComponent } from 'react';
 export function getArticleJsonLd(data: unknown): object;
 const Page: FunctionComponent; export default Page;
}

declare module '@/pages/NeighborhoodPage' {
 import type { FunctionComponent } from 'react';
 export function getNeighborhoodJsonLd(data: unknown): object;
 const Page: FunctionComponent; export default Page;
}

declare module '@/pages/NotFound' {
 import type { FunctionComponent } from 'react';
 const Page: FunctionComponent; export default Page;
}

declare module '@/pages/Orcamento' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/lib/analytics' {
  export function track(eventName: string, payload?: Record<string, unknown>): void;
}

declare module '@/pages/CalculadoraCnh' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/Comparador' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/HabilitacaoPCD' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/PingSolucoes' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/MestreDosServicos' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/PrecisoDeTecnico' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/Servico' {
  import type { FunctionComponent } from 'react';
  export function getServicoJsonLd(data: unknown): object;
  const Page: FunctionComponent;
  export default Page;
}
declare module '@/data/servicosData' {
  export const SERVICOS: Record<string, { metaTitle: string; metaDescription: string; serviceType: string }>;
}

declare module '@/pages/Ofertas' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent<{ preview?: boolean }>;
  export default Page;
}

declare module '@/pages/Categoria' {
  import type { FunctionComponent } from 'react';
  export const CATEGORIAS: Record<'a' | 'b' | 'ab', { hero: string; subtitle: string }>;
  export function getCategoriaJsonLd(data: unknown): object;
  const Page: FunctionComponent<{ categorySlug?: 'a' | 'b' | 'ab' }>;
  export default Page;
}

declare module '@/pages/AutoescolaSaoJoseDosPinhais' {
  import type { FunctionComponent } from 'react';
  export const localJsonLd: object;
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/PromoAniversario' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}

declare module '@/pages/PromoIndiqueAmigo' {
  import type { FunctionComponent } from 'react';
  const Page: FunctionComponent;
  export default Page;
}
