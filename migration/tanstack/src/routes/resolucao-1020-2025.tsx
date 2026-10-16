import { createFileRoute } from '@tanstack/react-router';
import Page, { jsonLd } from '@/pages/Resolucao1020';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/resolucao-1020-2025')({
  head: () => pageHead("Resolução 1020 2025 CNH | O que Mudou na Habilitação | APTOS", "Resolução 1020 2025 CNH: fim das 20h teóricas, só 2h de prática, sem prazo de 12 meses, app CNH do Brasil. O que vale no DETRAN-PR hoje (exames, taxas e reteste).", '/resolucao-1020-2025', jsonLd),
  component: Page,
});
