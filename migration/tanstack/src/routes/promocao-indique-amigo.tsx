import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/PromoIndiqueAmigo';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Offer',
  name: 'Indique um Amigo — benefício para os dois',
  description: 'Indique um amigo para a Autoescola APTOS e ganhe benefícios exclusivos junto com o indicado.',
  url: 'https://autoescolaaptos.com.br/promocao-indique-amigo',
  availability: 'https://schema.org/InStock',
  priceCurrency: 'BRL',
  areaServed: 'São José dos Pinhais, PR',
  seller: { '@type': 'DrivingSchool', name: 'Autoescola APTOS', url: 'https://autoescolaaptos.com.br' },
};

export const Route = createFileRoute('/promocao-indique-amigo')({
  head: () => pageHead(
    'Indique um Amigo e Ganhe | Autoescola APTOS',
    'Indique um amigo para tirar a CNH na Autoescola APTOS em São José dos Pinhais e os dois ganham benefícios. Consulte condições.',
    '/promocao-indique-amigo',
    jsonLd,
  ),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
