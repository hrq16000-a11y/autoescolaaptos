import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/PromoAniversario';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  name: 'Promoção de Aniversário — aula prática grátis',
  description: 'No mês do seu aniversário, ganhe uma aula prática de presente na Autoescola APTOS.',
  url: 'https://autoescolaaptos.com.br/promocao-aniversario',
  availability: 'https://schema.org/InStock',
  priceCurrency: 'BRL',
  areaServed: 'São José dos Pinhais, PR',
  seller: { '@type': 'DrivingSchool', name: 'Autoescola APTOS', url: 'https://autoescolaaptos.com.br' },
};

export const Route = createFileRoute('/promocao-aniversario')({
  head: () => pageHead(
    'Promoção de Aniversário — Aula Grátis | Autoescola APTOS',
    'No mês do seu aniversário, ganhe uma aula prática de presente na Autoescola APTOS em São José dos Pinhais. Consulte condições.',
    '/promocao-aniversario',
    jsonLd,
  ),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
