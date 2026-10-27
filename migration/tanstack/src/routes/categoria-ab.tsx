import { createFileRoute } from '@tanstack/react-router';
import Page, { CATEGORIAS, getCategoriaJsonLd } from '@/pages/Categoria';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
const data = CATEGORIAS['ab'];
export const Route = createFileRoute('/categoria-ab')({
  head: () => pageHead(data.hero + ' | Autoescola APTOS', data.subtitle.slice(0, 155), '/categoria-ab', getCategoriaJsonLd(data)),
  component: () => <FunnelProvider><Page categorySlug="ab" /></FunnelProvider>,
});
