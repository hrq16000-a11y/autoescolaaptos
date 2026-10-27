import { createFileRoute } from '@tanstack/react-router';
import Ofertas from '@/pages/Ofertas';

export const Route = createFileRoute('/ofertas')({
  head: () => ({
    meta: [
      { title: 'Programa de Ofertas Exclusivas | Autoescola APTOS' },
      {
        name: 'description',
        content: 'Autorize o envio de campanhas promocionais exclusivas da Autoescola APTOS pelo WhatsApp.',
      },
      { name: 'robots', content: 'noindex, follow' },
    ],
    links: [{ rel: 'canonical', href: 'https://autoescolaaptos.com.br/ofertas' }],
  }),
  component: Ofertas,
});
