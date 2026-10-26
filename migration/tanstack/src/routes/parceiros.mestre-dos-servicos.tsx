import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/MestreDosServicos';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: "Mestre dos Serviços", url: 'https://autoescolaaptos.com.br/parceiros/mestre-dos-servicos' };
export const Route = createFileRoute('/parceiros/mestre-dos-servicos')({
  head: () => pageHead("Mestre dos Serviços | Reformas, Construções e Serviços Gerais", "Empresa especializada em reformas, construções, pintura e serviços gerais.", '/parceiros/mestre-dos-servicos', schema),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
