import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/Servico';
import { SERVICOS } from '@/data/servicosData';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
const data = SERVICOS['reciclagem-cnh'];
export const Route = createFileRoute('/reciclagem-cnh')({
  head: () => pageHead(data.metaTitle, data.metaDescription, '/reciclagem-cnh', { '@context': 'https://schema.org', '@type': 'Service', name: data.serviceType, url: 'https://autoescolaaptos.com.br/reciclagem-cnh' }),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
