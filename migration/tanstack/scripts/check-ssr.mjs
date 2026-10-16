import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import server from '../dist/server/server.js';
const response = await server.fetch(new Request('http://localhost:3001/perguntas-frequentes'));
const html = await response.text();
assert.equal(response.status, 200);
for (const expected of ['Perguntas Frequentes CNH | Autoescola APTOS', 'Qual a idade mínima', 'FAQPage', 'noindex, nofollow', 'rel="canonical"', 'https://autoescolaaptos.com.br/perguntas-frequentes']) {
  assert.ok(html.includes(expected), `SSR missing: ${expected}`);
}
assert.ok(!html.includes('Erro ao carregar'));
const assets = fileURLToPath(new URL('../dist/client/assets/', import.meta.url));
const css = readdirSync(assets).filter(p => p.endsWith('.css')).map(p => readFileSync(`${assets}/${p}`, 'utf8')).join('');
assert.ok(css.includes('.min-h-screen'), 'Missing generated Tailwind utilities');
assert.ok(!/@tailwind|@apply/.test(css), 'Unprocessed Tailwind directives');
console.log('PASS FAQ SSR, metadata, JSON-LD and generated CSS');

for (const path of ['/primeira-habilitacao', '/exames-detran', '/resolucao-1020-2025']) {
  const response = await server.fetch(new Request(`http://localhost:3001${path}`));
  const html = await response.text();
  assert.equal(response.status, 200);
  for (const expected of ['<h1', 'application/ld+json', `https://autoescolaaptos.com.br${path}`, 'noindex, nofollow']) {
    assert.ok(html.includes(expected), `${path}: missing ${expected}`);
  }
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length > 0);
  for (const script of scripts) assert.doesNotThrow(() => JSON.parse(script[1]));
  console.log(`PASS SSR and valid schema: ${path}`);
}

const homeResponse = await server.fetch(new Request('http://localhost:3001/'));
const homeHtml = await homeResponse.text();
assert.equal(homeResponse.status, 200);
for (const expected of ['Conquiste Sua', 'CNH', 'Conhecer carro automático', 'WebSite', 'Organization', 'DrivingSchool', 'noindex, nofollow']) {
  assert.ok(homeHtml.includes(expected), `Home missing ${expected}`);
}
assert.ok(!homeHtml.includes('ambiente de validação'));
assert.ok(homeHtml.includes('api.whatsapp.com/send'));
console.log('PASS home SSR, structured data and WhatsApp links');
