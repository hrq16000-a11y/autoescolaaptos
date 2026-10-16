import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/CalculadoraCnh';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

// Preview remains noindex until the full independent cutover is validated.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Simulador de Jornada CNH | Autoescola APTOS',
  url: 'https://autoescolaaptos.com.br/calculadora-cnh',
  isPartOf: {
    '@type': 'WebSite',
    name: 'Autoescola APTOS',
    url: 'https://autoescolaaptos.com.br',
  },
};

export const Route = createFileRoute('/calculadora-cnh')({
  head: () => pageHead(
    'Simulador de Jornada CNH — Autoescola APTOS em São José dos Pinhais',
    'Planeje as etapas estimadas da CNH com o simulador APTOS: exames, estudo, aulas práticas e prova. Consulte a equipe para orçamento e disponibilidade.',
    '/calculadora-cnh',
    jsonLd,
  ),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
