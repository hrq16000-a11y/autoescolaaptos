import { createFileRoute } from '@tanstack/react-router';
import Page, { getServicoJsonLd } from '@/pages/Servico';
import { SERVICOS } from '@/data/servicosData';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
const data = SERVICOS['inclusao-categoria'];
export const Route = createFileRoute('/inclusao-categoria')({
  head: () => pageHead(data.metaTitle, data.metaDescription, '/inclusao-categoria', getServicoJsonLd(data)),
  component: () => <FunnelProvider><Page /></FunnelProvider>,
});
