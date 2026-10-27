import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/SimuladoDetranPr';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Simulado DETRAN PR 2026 Grátis | 30 Questões Atualizadas - APTOS',
  description: 'Simulado DETRAN PR grátis com 30 questões atualizadas pela Resolução 1020/2025. Treine para a prova teórica online, com gabarito e explicações. Sem cadastro.',
  url: 'https://autoescolaaptos.com.br/simulado-detran-pr',
  isPartOf: { '@type': 'WebSite', name: 'Autoescola APTOS', url: 'https://autoescolaaptos.com.br' },
};

export const Route = createFileRoute('/simulado-detran-pr')({
  head: () => pageHead(
    'Simulado DETRAN PR 2026 Grátis | 30 Questões Atualizadas - APTOS',
    'Simulado DETRAN PR grátis com 30 questões atualizadas pela Resolução 1020/2025. Treine para a prova teórica online, com gabarito e explicações. Sem cadastro.',
    '/simulado-detran-pr',
    jsonLd,
  ),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
