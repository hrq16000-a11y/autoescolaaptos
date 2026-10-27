import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/DiagnosticoSeo';
import { pageHead } from '../page-head';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Diagnóstico SEO — Autoescola APTOS',
  description: 'Dashboard interno de monitoramento de 404s, redirects e rotas indexáveis.',
  url: 'https://autoescolaaptos.com.br/diagnostico-seo',
};

export const Route = createFileRoute('/diagnostico-seo')({
  head: () => pageHead(
    'Diagnóstico SEO — Autoescola APTOS',
    'Dashboard interno de monitoramento de 404s, redirects e rotas indexáveis.',
    '/diagnostico-seo',
    jsonLd,
  ),
  component: Page,
});
