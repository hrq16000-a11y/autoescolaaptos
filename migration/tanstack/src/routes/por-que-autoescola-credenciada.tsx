import { createFileRoute } from '@tanstack/react-router';
import Page, { jsonLd } from '@/pages/PorQueAutoescola';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/por-que-autoescola-credenciada')({
  head: () => pageHead("Por que Escolher uma Autoescola Credenciada | Autoescola APTOS", "Descubra as vantagens de escolher um CFC credenciado pelo DETRAN. Acompanhamento completo, menor risco de reprovação e suporte especializado.", '/por-que-autoescola-credenciada', jsonLd),
  component: Page,
});
