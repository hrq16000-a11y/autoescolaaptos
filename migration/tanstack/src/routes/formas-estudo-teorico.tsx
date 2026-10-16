import { createFileRoute } from '@tanstack/react-router';
import Page, { jsonLd } from '@/pages/FormasEstudoTeorico';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/formas-estudo-teorico')({
  head: () => pageHead("Formas de Estudo Teórico para CNH | Autoescola APTOS", "Conheça as opções de curso teórico para CNH: presencial em CFC, plataformas digitais e modelos híbridos. Entenda qual é a melhor opção para você.", '/formas-estudo-teorico', jsonLd),
  component: Page,
});
