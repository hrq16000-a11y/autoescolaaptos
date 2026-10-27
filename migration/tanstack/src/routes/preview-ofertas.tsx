import { createFileRoute } from '@tanstack/react-router';
import Ofertas from '@/pages/Ofertas';

// Preview isolado: sem conexão de gravação e sem migração da rota pública.
export const Route = createFileRoute('/preview-ofertas')({
  head: () => ({ meta: [{ title: 'Pré-produção — Ofertas APTOS' }] }),
  component: () => <Ofertas preview />,
});
