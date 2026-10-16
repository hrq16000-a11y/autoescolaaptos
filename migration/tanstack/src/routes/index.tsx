import { createFileRoute } from '@tanstack/react-router';
import Index, { homeJsonLd } from '@/pages/Index';
import { FunnelProvider } from '@/hooks/useFunnelModal';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/')({
  head: () => pageHead(
    'Autoescola em São José dos Pinhais | APTOS — CNH, Aulas e Reciclagem',
    'Autoescola APTOS em São José dos Pinhais: primeira habilitação, inclusão de categoria, reciclagem, reteste e aulas práticas. Solicite seu orçamento.',
    '/', homeJsonLd),
  component: () => <FunnelProvider><Index /></FunnelProvider>,
});
