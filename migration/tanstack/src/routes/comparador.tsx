import { createFileRoute } from '@tanstack/react-router';
import Comparador from '@/pages/Comparador';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Comparador de CNH: categorias A, B, AB e Inclusão',
  url: 'https://autoescolaaptos.com.br/comparador',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Autoescola APTOS',
    url: 'https://autoescolaaptos.com.br',
  },
};

export const Route = createFileRoute('/comparador')({
  head: () => pageHead(
    'Comparador de CNH: A, B, AB e Inclusão — Autoescola APTOS',
    'Compare as categorias A, B, AB e a inclusão de categoria na Autoescola APTOS. Conheça os requisitos e solicite seu orçamento.',
    '/comparador',
    jsonLd,
  ),
  component: () => <FunnelProvider><Comparador /></FunnelProvider>,
});
