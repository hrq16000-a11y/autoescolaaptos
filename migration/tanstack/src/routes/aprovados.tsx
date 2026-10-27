import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/Aprovados';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Aprovados na Autoescola APTOS — São José dos Pinhais',
  description: 'Conheça os alunos aprovados na Autoescola APTOS em São José dos Pinhais. Seja o próximo aprovado.',
  url: 'https://autoescolaaptos.com.br/aprovados',
  isPartOf: { '@type': 'WebSite', name: 'Autoescola APTOS', url: 'https://autoescolaaptos.com.br' },
};

export const Route = createFileRoute('/aprovados')({
  head: () => pageHead(
    'Aprovados na Autoescola APTOS — São José dos Pinhais',
    'Conheça os alunos aprovados na Autoescola APTOS em São José dos Pinhais. Centenas de novos motoristas formados todo ano. Seja o próximo aprovado.',
    '/aprovados',
    jsonLd,
  ),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
