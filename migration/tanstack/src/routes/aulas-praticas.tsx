import { createFileRoute } from '@tanstack/react-router';
import Page, { getServicoJsonLd } from '@/pages/Servico';
import { SERVICOS } from '@/data/servicosData';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
const data = SERVICOS['aulas-praticas'];
export const Route = createFileRoute('/aulas-praticas')({
  head: () => pageHead(data.metaTitle, data.metaDescription, '/aulas-praticas', getServicoJsonLd(data)),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
