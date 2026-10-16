import { createFileRoute } from '@tanstack/react-router';
import Page, { jsonLd } from '@/pages/AulasPraticasDirecao';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/aulas-praticas-direcao')({
  head: () => pageHead("Aulas Práticas de Direção em São José dos Pinhais | DETRAN-PR | APTOS", "Aulas práticas de direção em São José dos Pinhais com instrutores credenciados pelo DETRAN-PR. Veículos novos, horários flexíveis e foco na aprovação.", '/aulas-praticas-direcao', jsonLd),
  component: Page,
});
