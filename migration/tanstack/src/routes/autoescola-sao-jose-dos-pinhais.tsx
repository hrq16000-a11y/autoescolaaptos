import { createFileRoute } from '@tanstack/react-router';
import Page, { localJsonLd } from '@/pages/AutoescolaSaoJoseDosPinhais';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/autoescola-sao-jose-dos-pinhais')({
  head: () => pageHead('Autoescola em São José dos Pinhais | CNH com Aprovação | APTOS', 'Autoescola APTOS em São José dos Pinhais: +15 anos, 95% de aprovação no DETRAN-PR, carros novos, curso online e próximo ao DETRAN. Solicite seu orçamento.', '/autoescola-sao-jose-dos-pinhais', localJsonLd),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
