import { createFileRoute } from '@tanstack/react-router';
import FAQ from '@/pages/FAQ';
import { faqData } from '../../../../src/data/faqData';
const title = 'Perguntas Frequentes CNH | Autoescola APTOS';
const description = 'Dúvidas sobre 1ª habilitação, renovação de CNH, mudança de categoria e reciclagem. FAQ da Autoescola APTOS em São José dos Pinhais.';
const canonical = 'https://autoescolaaptos.com.br/perguntas-frequentes';
export const Route = createFileRoute('/perguntas-frequentes')({
  head: () => ({
    meta: [{ title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:url', content: canonical }, { property: 'og:type', content: 'website' },
      { property: 'og:image', content: 'https://autoescolaaptos.com.br/og-image.png' },
      { name: 'twitter:card', content: 'summary_large_image' }],
    links: [{ rel: 'canonical', href: canonical }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify({
      '@context': 'https://schema.org', '@type': 'FAQPage',
      mainEntity: faqData.map(item => ({ '@type': 'Question', name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer } })),
    }).replace(/</g, '\\u003c') }],
  }),
  component: FAQ,
});
