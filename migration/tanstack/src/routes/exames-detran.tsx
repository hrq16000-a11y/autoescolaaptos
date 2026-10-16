import { createFileRoute } from '@tanstack/react-router';
import Page, { jsonLd } from '@/pages/ExamesDetran';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/exames-detran')({
  head: () => pageHead("Exame DETRAN PR | Prova Teórica e Prática da CNH | APTOS", "Tudo sobre o exame DETRAN PR: prova teórica de 60 min (20/30 acertos pela Res. 1020/2025), prova prática de direção, faltas eliminatórias e como se preparar.", '/exames-detran', jsonLd),
  component: Page,
});
