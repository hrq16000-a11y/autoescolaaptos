const origin = 'https://autoescolaaptos.com.br';
export function pageHead(title: string, description: string, path: string, jsonLd: object) {
  const canonical = `${origin}${path}`;
  return {
    meta: [{ title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:url', content: canonical }, { property: 'og:type', content: 'website' },
      { property: 'og:image', content: `${origin}/og-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' }],
    links: [{ rel: 'canonical', href: canonical }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }],
  };
}
