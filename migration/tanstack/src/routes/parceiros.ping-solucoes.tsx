import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/PingSolucoes';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: "Ping Soluções", url: 'https://autoescolaaptos.com.br/parceiros/ping-solucoes' };
export const Route = createFileRoute('/parceiros/ping-solucoes')({
  head: () => pageHead("Ping Soluções | Desenvolvimento Web, Apps e Marketing Digital", "Empresa de tecnologia especializada em criação de sites, desenvolvimento de aplicativos, SEO e marketing digital.", '/parceiros/ping-solucoes', schema),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
