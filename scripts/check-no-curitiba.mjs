#!/usr/bin/env node
/**
 * Build-time guard: falha se a string "Curitiba" aparecer em conteúdos, títulos,
 * metatags, JSON-LD ou dados do site. O foco é São José dos Pinhais.
 *
 * Escopo:
 *  - index.html (title, meta, JSON-LD)
 *  - public/**  (sitemap.xml, robots.txt, llms.txt, etc.)
 *  - src/**     (componentes, páginas, dados, hooks — .ts/.tsx/.js/.jsx/.md/.json)
 *
 * Ignora este próprio script e node_modules/dist/.git.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";

const ROOT = process.cwd();
const TARGET = /curitiba/i;
const SCAN_DIRS = ["public", "src"];
const SCAN_FILES = ["index.html"];
const ALLOWED_EXT = new Set([
  ".html", ".htm", ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".json", ".md", ".txt", ".xml", ".css",
]);
const IGNORE = new Set([
  "node_modules", "dist", "build", ".git", ".vite", ".next", ".cache",
  "coverage", "supabase", "scripts",
]);

const offenders = [];

function walk(dir) {
  let entries;
  try { entries = readdirSync(dir); } catch { return; }
  for (const name of entries) {
    if (IGNORE.has(name)) continue;
    const full = join(dir, name);
    let st;
    try { st = statSync(full); } catch { continue; }
    if (st.isDirectory()) walk(full);
    else if (st.isFile()) scanFile(full);
  }
}

function scanFile(path) {
  const ext = extname(path).toLowerCase();
  if (!ALLOWED_EXT.has(ext)) return;
  let content;
  try { content = readFileSync(path, "utf8"); } catch { return; }
  const lines = content.split(/\r?\n/);
  lines.forEach((line, i) => {
    if (TARGET.test(line)) {
      offenders.push({ file: relative(ROOT, path), line: i + 1, text: line.trim().slice(0, 160) });
    }
  });
}

for (const f of SCAN_FILES) scanFile(join(ROOT, f));
for (const d of SCAN_DIRS) walk(join(ROOT, d));

if (offenders.length) {
  console.error("\n❌ Verificação falhou: 'Curitiba' encontrado.\n");
  console.error("A Autoescola APTOS atende exclusivamente São José dos Pinhais.\n");
  for (const o of offenders) {
    console.error(`  - ${o.file}:${o.line}  →  ${o.text}`);
  }
  console.error(`\n${offenders.length} ocorrência(s). Corrija antes do build.\n`);
  process.exit(1);
}

console.log("✅ check:no-curitiba — nenhuma ocorrência de 'Curitiba' encontrada.");
