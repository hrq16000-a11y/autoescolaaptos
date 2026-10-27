import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/Servico';
import { SERVICOS } from '@/data/servicosData';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
const data = SERVICOS['reteste-pratico'];
export const Route = createFileRoute('/reteste-pratico')({
  head: () => pageHead(data.metaTitle, data.metaDescription, '/reteste-pratico', { '@context': 'https://schema.org', '@type': 'Service', name: data.serviceType, url: 'https://autoescolaaptos.com.br/reteste-pratico' }),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
