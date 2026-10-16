import { createFileRoute } from '@tanstack/react-router';
import Page, { jsonLd } from '@/pages/NeighborhoodsIndex';
import { pageHead } from '../page-head';
export const Route = createFileRoute('/bairros')({
  head: () => pageHead("Autoescola em São José dos Pinhais - Todos os Bairros | APTOS", "Autoescola APTOS atende todos os bairros de São José dos Pinhais. Centro, Afonso Pena, Cidade Jardim, Guatupê, Costeira e mais. Ligue: (41) 3383-3627", '/bairros', jsonLd),
  component: Page,
});
