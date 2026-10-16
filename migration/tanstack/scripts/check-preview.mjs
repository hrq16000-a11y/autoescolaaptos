import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { extname } from 'node:path';

const port = 43000 + (process.pid % 1000);
const origin = 'http://127.0.0.1:' + port;
const child = spawn(process.execPath, ['scripts/serve-preview.mjs'], {
  cwd: fileURLToPath(new URL('../', import.meta.url)),
  env: { ...process.env, HOST: '127.0.0.1', PORT: String(port) },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let stderr = '';
child.stderr.setEncoding('utf8');
child.stderr.on('data', data => { stderr += data; });

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
async function get(path, options) {
  return fetch(origin + path, { ...options, signal: AbortSignal.timeout(12000) });
}
try {
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (child.exitCode !== null) throw Error('Preview exited early');
    try {
      const response = await get('/healthz');
      if (response.status === 200) { ready = true; break; }
    } catch { /* waiting for server */ }
    await sleep(100);
  }
  assert.ok(ready, 'Preview did not become ready; ' + stderr.slice(0, 400));
  for (const path of ['/', '/orcamento', '/perguntas-frequentes', '/blog', '/bairros/centro']) {
    const response = await get(path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive', path);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
    assert.equal(response.headers.get('x-frame-options'), 'DENY');
    const html = await response.text();
    assert.match(html, /noindex, nofollow/, path);
    assert.match(html, /<h1/, path);
    console.log('PASS preview SSR/security: ' + path);
  }
  const missing = await get('/bairros/nao-existe');
  assert.equal(missing.status, 404);
  assert.equal(missing.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive');

  const method = await get('/orcamento', { method: 'POST' });
  assert.equal(method.status, 405);
  assert.equal(method.headers.get('allow'), 'GET, HEAD');
  const head = await get('/orcamento', { method: 'HEAD' });
  assert.equal(head.status, 200);
  assert.equal((await head.text()).length, 0);

  const assets = fileURLToPath(new URL('../dist/client/assets/', import.meta.url));
  const file = readdirSync(assets).find(name => ['.css', '.js'].includes(extname(name)));
  assert.ok(file, 'Built asset missing');
  const response = await get('/assets/' + encodeURIComponent(file));
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type') || '', /text\/(css|javascript)/);
  assert.ok((await response.arrayBuffer()).byteLength > 0);
  const traversal = await get('/assets/%2e%2e/%2e%2e/.env');
  assert.notEqual(traversal.status, 200);
  console.log('PASS preview assets, HEAD, read-only methods, path protection');
} finally {
  child.kill('SIGTERM');
}
