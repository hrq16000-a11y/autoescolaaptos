import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/HabilitacaoPCD';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

// Pilot preview only; the root route and Vercel header enforce noindex.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Autoescola PCD em São José dos Pinhais | Habilitação Especial | APTOS',
  url: 'https://autoescolaaptos.com.br/pcd',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Autoescola APTOS',
    url: 'https://autoescolaaptos.com.br',
  },
};

export const Route = createFileRoute('/pcd')({
  head: () => pageHead(
    'Autoescola PCD em São José dos Pinhais | Habilitação Especial | APTOS',
    'Conheça as etapas da Habilitação Especial PCD na Autoescola APTOS e consulte nossa equipe sobre veículos adaptados e atendimento.',
    '/pcd',
    jsonLd,
  ),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
