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
