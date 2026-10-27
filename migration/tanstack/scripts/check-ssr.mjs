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

for (const path of ['/categoria-a', '/categoria-b', '/categoria-ab', '/inclusao-categoria', '/reciclagem-cnh', '/reteste-pratico', '/aulas-praticas', '/parceiros/ping-solucoes', '/parceiros/mestre-dos-servicos', '/parceiros/preciso-de-um-tecnico', '/pcd', '/comparador', '/calculadora-cnh', '/orcamento', '/primeira-habilitacao', '/exames-detran', '/resolucao-1020-2025', '/formas-estudo-teorico', '/aulas-praticas-direcao', '/por-que-autoescola-credenciada', '/carro-automatico']) {
  const response = await server.fetch(new Request(`http://localhost:3001${path}`));
  const html = await response.text();
  assert.equal(response.status, 200);
  for (const expected of ['<h1', 'application/ld+json', `https://autoescolaaptos.com.br${path}`, 'noindex, nofollow']) {
    assert.ok(html.includes(expected), `${path}: missing ${expected}`);
  }
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  assert.ok(scripts.length > 0);
  for (const script of scripts) { try { JSON.parse(script[1]); } catch (error) { throw new Error(`${path}: JSON-LD inválido ${JSON.stringify(script[1])}`, { cause: error }); } }
  if (['/inclusao-categoria', '/reciclagem-cnh', '/reteste-pratico', '/aulas-praticas'].includes(path)) {
    const graph = JSON.parse(scripts[0][1])['@graph'];
    assert.deepEqual(graph.map(item => item['@type']), ['Service', 'FAQPage', 'BreadcrumbList'], `${path}: schema incompleto`);
    assert.ok(graph[1].mainEntity.length > 0, `${path}: perguntas ausentes`);
  }
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

// A página de orçamento mantém SEO e conteúdo SSR, mas permanece noindex no piloto.
const quote = await server.fetch(new Request('http://localhost:3001/orcamento'));
const quoteHtml = await quote.text();
assert.equal(quote.status, 200);
for (const expected of ['Monte seu', 'orçamento', 'noindex, nofollow', 'https://autoescolaaptos.com.br/orcamento']) {
  assert.ok(quoteHtml.includes(expected), `Quote SSR missing: ${expected}`);
}


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


// O piloto não implementa autenticação, OAuth, área administrativa nem
// a confirmação de conversão. Evita que um novo route handler exponha esses
// caminhos sem validação de segurança e sem migração explícita.
for (const path of [
  '/login',
  '/.lovable/oauth/consent?authorization_id=ci-placeholder',
  '/admin',
  '/admin/leads',
  '/obrigado',
]) {
  const result = await server.fetch(new Request('http://localhost:3001' + path));
  assert.equal(result.status, 404, `Sensitive route must stay outside pilot: ${path}`);
  const html = await result.text();
  assert.ok(html.includes('noindex, nofollow'), `Missing noindex on ${path}`);
  assert.ok(!html.includes('Entrar na APTOS'), `Auth page unexpectedly served: ${path}`);
  assert.ok(!html.includes('Conectar esse aplicativo'), `OAuth consent unexpectedly served: ${path}`);
  console.log(`PASS isolated sensitive route: ${path}`);
}
