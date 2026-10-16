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

for (const path of ['/primeira-habilitacao', '/exames-detran', '/resolucao-1020-2025', '/formas-estudo-teorico', '/aulas-praticas-direcao', '/por-que-autoescola-credenciada', '/carro-automatico']) {
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

for (const path of ['/blog', '/blog/o-que-e-direcao-defensiva', '/bairros', '/bairros/centro']) {
 const response = await server.fetch(new Request(`http://localhost:3001${path}`));
 const html = await response.text();
 assert.equal(response.status, 200, path);
 for (const expected of ['<h1', 'application/ld+json', `https://autoescolaaptos.com.br${path}`, 'noindex, nofollow']) assert.ok(html.includes(expected), `${path}: ${expected}`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
 assert.ok(schemas.length > 0, `${path}: missing JSON-LD`);
 for (const schema of schemas) assert.doesNotThrow(() => JSON.parse(schema[1]), `${path}: invalid JSON-LD`);
 console.log(`PASS content SSR: ${path}`);
}
const missingPost = await server.fetch(new Request('http://localhost:3001/blog/nao-existe'));
assert.equal(missingPost.status, 302);
assert.equal(missingPost.headers.get('location'), '/blog');
const missingNeighborhood = await server.fetch(new Request('http://localhost:3001/bairros/nao-existe'));
assert.equal(missingNeighborhood.status, 404);
console.log('PASS missing article redirect and neighborhood HTTP 404');
