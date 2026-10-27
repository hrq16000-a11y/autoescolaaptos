const origin = 'https://autoescolaaptos.com.br';
export function pageHead(title: string, description: string, path: string, jsonLd: object, type = 'website') {
  const canonical = `${origin}${path}`;
  return {
    meta: [{ title }, { name: 'description', content: description },
      { property: 'og:title', content: title }, { property: 'og:description', content: description },
      { property: 'og:url', content: canonical }, { property: 'og:type', content: type },
      { property: 'og:image', content: `${origin}/og-image.png` },
      { name: 'twitter:card', content: 'summary_large_image' }],
    links: [{ rel: 'canonical', href: canonical }],
    scripts: [{ type: 'application/ld+json', children: JSON.stringify(jsonLd).replace(/[<\u007f-\uffff]/g, char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')) }],
  };
}
