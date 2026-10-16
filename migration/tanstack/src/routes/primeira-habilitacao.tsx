import { createFileRoute } from '@tanstack/react-router';
import Page, { jsonLd } from '@/pages/PrimeiraHabilitacao';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/primeira-habilitacao')({
  head: () => pageHead("Primeira Habilitação em São José dos Pinhais | CNH Cat. A e B | APTOS", "Primeira habilitação em São José dos Pinhais pela Res. 1020/2025: teórico 100% online no app CNH do Brasil, só 2h de prática obrigatória, sem prazo de 12 meses.", '/primeira-habilitacao', jsonLd),
  component: Page,
});
