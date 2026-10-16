import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import server from '../dist/server/server.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const config = JSON.parse(readFileSync(join(root, 'protected-routes.json'), 'utf8'));
assert.ok(Array.isArray(config.exact) && config.exact.length > 0, 'No sensitive routes');
assert.ok(Array.isArray(config.prefixes) && config.prefixes.length > 0, 'No prefixes');
const all = [...config.exact, ...config.prefixes];
assert.equal(new Set(all).size, all.length, 'Duplicate protected paths');
const legacyApp = readFileSync(join(root, '../../src/App.tsx'), 'utf8');
const registered = new Set([...legacyApp.matchAll(/<Route\s+path="([^"]+)"/g)].map(m => m[1]));
for (const path of config.exact) {
  assert.ok(registered.has(path), 'Missing official public route: ' + path);
}
for (const prefix of config.prefixes) {
  assert.ok([...registered].some(path => path.startsWith(prefix)), 'No public route for: ' + prefix);
}
const pilotRoutes = fileURLToPath(new URL('../src/routes/', import.meta.url));
for (const dirent of readdirSync(pilotRoutes, { withFileTypes: true })) {
  if (!dirent.isFile() || !/\.tsx?$/.test(dirent.name)) continue;
  const code = readFileSync(join(pilotRoutes, dirent.name), 'utf8');
  for (const match of code.matchAll(/createFileRoute\(['"]([^'"]+)['"]\)/g)) {
    const path = match[1];
    assert.ok(!config.exact.includes(path) && !config.prefixes.some(p => path.startsWith(p)),
      'Protected route was added to the pilot: ' + path);
  }
}
const compat = readFileSync(join(root, 'src/router-compat.tsx'), 'utf8');
assert.ok(compat.includes('protectedRoutes') && compat.includes('isLegacyProtectedPath'),
  'Missing legacy route protection in navigation adapter');
assert.ok(compat.includes('https://autoescolaaptos.com.br'), 'Missing original site fallback');
const paths = [...config.exact, '/admin/leads', '/admin/campanhas', '/.lovable/oauth/callback'];
for (const path of paths) {
  const url = new URL('http://localhost:3001' + path);
  if (path === '/.lovable/oauth/consent') url.searchParams.set('authorization_id', 'ci-placeholder');
  const response = await server.fetch(new Request(url));
  assert.equal(response.status, 404, 'Protected pilot path must fail closed: ' + path);
  const html = await response.text();
  assert.ok(html.includes('noindex, nofollow'), 'Missing noindex: ' + path);
  assert.ok(!html.includes('Conectar esse aplicativo'), 'Unexpected OAuth consent: ' + path);
  assert.ok(!html.includes('Entrar na APTOS'), 'Unexpected login view: ' + path);
  console.log('PASS isolated data/auth route: ' + path);
}
console.log('PASS protected routes, public handoff and no write forms in staging');
