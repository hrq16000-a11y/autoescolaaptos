import { createFileRoute } from '@tanstack/react-router';
import Page, { blogJsonLd } from '@/pages/Blog';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/blog')({
  head: () => pageHead("Blog | Autoescola APTOS - Dicas de Direção e Legislação", "Artigos sobre direção defensiva, dicas para provas do DETRAN, legislação de trânsito e muito mais. Aprenda com especialistas em São José dos Pinhais.", '/blog', blogJsonLd),
  component: Page,
});
