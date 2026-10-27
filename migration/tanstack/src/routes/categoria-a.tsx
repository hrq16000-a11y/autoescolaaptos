import { createFileRoute } from '@tanstack/react-router';
import Page, { CATEGORIAS, getCategoriaJsonLd } from '@/pages/Categoria';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
const data = CATEGORIAS['a'];
export const Route = createFileRoute('/categoria-a')({
  head: () => pageHead(data.hero + ' | Autoescola APTOS', data.subtitle.slice(0, 155), '/categoria-a', getCategoriaJsonLd(data)),
  component: () => <FunnelProvider><Page categorySlug="a" /></FunnelProvider>,
});
