import { createFileRoute } from '@tanstack/react-router';
import Page from '@/pages/PrecisoDeTecnico';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';

const schema = { '@context': 'https://schema.org', '@type': 'WebPage', name: "Preciso de um Técnico", url: 'https://autoescolaaptos.com.br/parceiros/preciso-de-um-tecnico' };
export const Route = createFileRoute('/parceiros/preciso-de-um-tecnico')({
  head: () => pageHead("Preciso de um Técnico | Serviços Técnicos Residenciais e Comerciais", "Encontre técnicos para serviços residenciais e comerciais.", '/parceiros/preciso-de-um-tecnico', schema),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
