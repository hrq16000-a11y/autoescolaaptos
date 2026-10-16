import assert from 'node:assert/strict';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Fail CI if a Vercel-mode build only emits files and silently loses the
// serverless function or routing (the R10 staging incident was HTTP 404).
const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, '.vercel', 'output');
const configPath = join(output, 'config.json');
const functionsDir = join(output, 'functions');
const staticDir = join(output, 'static');
assert.ok(existsSync(configPath), 'Missing Vercel Build Output API config.json');
const config = JSON.parse(readFileSync(configPath, 'utf8'));
assert.equal(config.version, 3, 'Unexpected Vercel Build Output API version');
assert.ok(Array.isArray(config.routes) && config.routes.length > 0, 'No Vercel route mapping');
assert.ok(existsSync(functionsDir), 'No serverless function output');
const funcs = readdirSync(functionsDir, { withFileTypes: true })
  .filter(dir => dir.isDirectory() && dir.name.endsWith('.func'))
  .map(dir => dir.name);
assert.ok(funcs.length > 0, 'No Vercel serverless functions');
const serverFunction = funcs.find(name => name.includes('server'));
assert.ok(serverFunction, 'Nitro server SSR function missing');
const configContent = JSON.stringify(config.routes);
assert.ok(configContent.includes('__server'), 'No rewrite/mapping to Nitro server function');
const functionPath = join(functionsDir, serverFunction);
assert.ok(existsSync(join(functionPath, '.vc-config.json')), 'No function runtime configuration');
const functionSettings = JSON.parse(readFileSync(join(functionPath, '.vc-config.json'), 'utf8'));
assert.ok(functionSettings.runtime, 'Vercel function runtime is missing');
assert.ok(existsSync(staticDir), 'No static directory emitted');
const staticEntries = readdirSync(staticDir);
assert.ok(staticEntries.length > 0, 'Empty Vercel static output');
const settings = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));
const security = (settings.headers || []).flatMap(rule => rule.headers || []);
const robots = security.find(header => header.key.toLowerCase() === 'x-robots-tag');
assert.ok(robots && /noindex/.test(robots.value), 'Staging must remain noindex');
assert.ok(!settings.redirects?.some(rule => rule.destination?.includes('autoescolaaptos.com.br')), 'Unexpected public domain redirects');
console.log('PASS Nitro SSR function:', serverFunction);
console.log('PASS Vercel route mapping, function runtime, assets, noindex');
