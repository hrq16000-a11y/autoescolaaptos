import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/Orcamento';
import { pageHead } from '../page-head';

// Isolado em pré-produção; o root mantém noindex, nofollow.
const quoteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Solicitar Orçamento de CNH | Autoescola APTOS',
  url: 'https://autoescolaaptos.com.br/orcamento',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Autoescola APTOS',
    url: 'https://autoescolaaptos.com.br',
  },
};

export const Route = createFileRoute('/orcamento')({
  head: () => pageHead(
    'Solicitar Orçamento de CNH | Autoescola APTOS São José dos Pinhais',
    'Receba um orçamento personalizado para CNH na Autoescola APTOS. Responda três perguntas e entre em contato com a equipe pelo WhatsApp.',
    '/orcamento',
    quoteSchema,
  ),
  component: Page,
});
