import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('old Detran simulator is not served as an application page', () => {
  const app = read('src/App.tsx');
  assert.doesNotMatch(app, /lazy\(\(\) => import\(["']\.\/pages\/SimuladoDetranPr/);
  assert.match(app, /path="\/simulado-detran-pr" element=\{<Navigate to="\/formas-estudo-teorico" replace \/>\}/);
  assert.doesNotMatch(read('src/lib/prefetch.ts'), /SimuladoDetranPr|simulado-detran-pr/);
  assert.ok(!existsSync(new URL('../src/pages/SimuladoDetranPr.tsx', import.meta.url)));
  assert.ok(!existsSync(new URL('../src/data/simuladoQuestions.ts', import.meta.url)));
});

test('old Detran simulator is absent from SEO publication', () => {
  assert.doesNotMatch(read('public/sitemap.xml'), /simulado-detran-pr/);
  const vc = JSON.parse(read('vercel.json'));
  assert.deepEqual(vc.redirects?.find(r => r.source === '/simulado-detran-pr'), {
    source: '/simulado-detran-pr',
    destination: '/formas-estudo-teorico',
    permanent: true,
  });
  assert.ok(!read('migration/tanstack/src/router-compat.tsx').includes("'/simulado-detran-pr'"));
  assert.ok(!existsSync(new URL('../migration/tanstack/src/routes/simulado-detran-pr.tsx', import.meta.url)));
});

test('the study page no longer promises simulated tests', () => {
  assert.doesNotMatch(read('src/pages/FormasEstudoTeorico.tsx'), /Simulados presenciais com acompanhamento/);
  assert.match(read('src/pages/FormasEstudoTeorico.tsx'), /Orientação individual para organizar os estudos/);
});
