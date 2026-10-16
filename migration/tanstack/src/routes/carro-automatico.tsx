import { createFileRoute } from '@tanstack/react-router';
import Page, { jsonLd } from '@/pages/CarroAutomatico';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/carro-automatico')({
  head: () => pageHead("Aulas de direção em carro automático | Autoescola APTOS SJP", "Aulas práticas em carro automático na Autoescola APTOS, em São José dos Pinhais. Conheça a opção automática, tire dúvidas e fale com a equipe pelo WhatsApp.", '/carro-automatico', jsonLd),
  component: Page,
});
