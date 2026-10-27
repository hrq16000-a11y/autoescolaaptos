import { createFileRoute } from '@tanstack/react-router';
import Page, { CATEGORIAS, getCategoriaJsonLd } from '@/pages/Categoria';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
const data = CATEGORIAS['b'];
export const Route = createFileRoute('/categoria-b')({
  head: () => pageHead(data.hero + ' | Autoescola APTOS', data.subtitle.slice(0, 155), '/categoria-b', getCategoriaJsonLd(data)),
  component: () => <FunnelProvider><Page categorySlug="b" /></FunnelProvider>,
});
