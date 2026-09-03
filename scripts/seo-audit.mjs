#!/usr/bin/env node
/**
 * Auditoria contínua de SEO (build-time).
 *
 * Verifica:
 *  - index.html: title, meta description, canonical, og/twitter
 *  - public/robots.txt: presença, diretiva Sitemap, bloqueio global indevido
 *  - public/sitemap.xml: URLs válidas, duplicadas, conflito com robots (Disallow)
 *  - src/pages/**: presença de <SEO .../> ou <Helmet> com title/description/canonical
 *
 * Saída: public/seo-audit.json (relatório visualizável em /admin/growth),
 * mantendo o snapshot anterior em `previous` para comparação Antes/Depois.
 *
 * Nunca falha o build (exit 0) — é um relatório, não um guard.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "public", "seo-audit.json");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : null);

const issues = [];
const add = (severity, area, message) => issues.push({ severity, area, message });

// ---------- index.html ----------
const html = read(join(ROOT, "index.html")) ?? "";
const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
const description =
  html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i)?.[1]?.trim() ?? "";
const canonical =
  html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1] ?? "";

if (!title) add("error", "metatags", "index.html sem <title>.");
else if (/lovable app/i.test(title)) add("error", "metatags", "Title padrão do template.");
else if (title.length > 65) add("warn", "metatags", `Title com ${title.length} caracteres (>65).`);

if (!description) add("error", "metatags", "index.html sem meta description.");
else if (description.length > 165)
  add("warn", "metatags", `Meta description com ${description.length} caracteres (>165).`);

if (!/og:title/i.test(html)) add("warn", "metatags", "og:title ausente no index.html.");
if (!/twitter:card/i.test(html)) add("warn", "metatags", "twitter:card ausente no index.html.");

// ---------- robots.txt ----------
const robots = read(join(ROOT, "public", "robots.txt"));
const disallowed = [];
if (!robots) add("error", "robots", "public/robots.txt não encontrado.");
else {
  if (!/^Sitemap:\s*https?:\/\//im.test(robots))
    add("warn", "robots", "robots.txt sem diretiva Sitemap.");
  for (const line of robots.split(/\r?\n/)) {
    const m = line.match(/^\s*Disallow:\s*(\S+)\s*$/i);
    if (m && m[1] !== "/") disallowed.push(m[1].replace(/\*$/, ""));
  }
  if (/^\s*User-agent:\s*\*\s*$[\s\S]*?^\s*Disallow:\s*\/\s*$/im.test(robots))
    add("error", "robots", "robots.txt bloqueia todo o site para crawlers (Disallow: /).");
}

// ---------- sitemap.xml ----------
const sitemap = read(join(ROOT, "public", "sitemap.xml"));
let urls = [];
if (!sitemap) add("error", "sitemap", "public/sitemap.xml não encontrado.");
else {
  urls = [...sitemap.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);
  if (urls.length === 0) add("error", "sitemap", "sitemap.xml sem nenhuma URL.");
  const dupes = urls.filter((u, i) => urls.indexOf(u) !== i);
  if (dupes.length) add("error", "sitemap", `URLs duplicadas: ${[...new Set(dupes)].join(", ")}`);
  for (const u of urls) {
    if (!/^https:\/\//.test(u)) add("error", "sitemap", `URL não-https no sitemap: ${u}`);
    const path = u.replace(/^https?:\/\/[^/]+/, "") || "/";
    const blocked = disallowed.find((d) => d !== "/" && path.startsWith(d));
    if (blocked) add("error", "sitemap", `URL ${path} está no sitemap mas bloqueada em robots (${blocked}).`);
    if (/\?/.test(u)) add("warn", "sitemap", `URL com query string no sitemap: ${u}`);
  }
}

// ---------- páginas ----------
const pagesDir = join(ROOT, "src", "pages");
const walk = (dir) =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".tsx") ? [p] : [];
  });

const pages = existsSync(pagesDir) ? walk(pagesDir) : [];
const pageReport = [];
for (const file of pages) {
  const src = readFileSync(file, "utf8");
  const rel = relative(ROOT, file);
  const isAdmin = /(^|\/)admin(\/|\.)/.test(rel) || /noindex/i.test(src);
  const hasSeo = /<SEO\b/.test(src);
  const hasHelmet = /<Helmet\b/.test(src);
  const hasTitle = hasSeo ? /title=/.test(src) : /<title>/.test(src);
  const hasDesc = hasSeo ? /description=/.test(src) : /name=["']description["']/.test(src);
  const hasCanonical = hasSeo ? /canonical=/.test(src) : /rel=["']canonical["']/.test(src);
  const ok = (hasSeo || hasHelmet) && hasTitle && hasDesc && (hasCanonical || isAdmin);
  pageReport.push({ file: rel, hasSeo, hasHelmet, hasTitle, hasDesc, hasCanonical, noindex: isAdmin, ok });
  if (!ok && !isAdmin) {
    add("warn", "paginas", `${rel}: faltam ${[
      !hasTitle && "title",
      !hasDesc && "description",
      !hasCanonical && "canonical",
    ].filter(Boolean).join(", ")}.`);
  }
}

// ---------- relatório ----------
const previous = (() => {
  try {
    const old = JSON.parse(readFileSync(OUT, "utf8"));
    return { generatedAt: old.generatedAt, summary: old.summary };
  } catch {
    return null;
  }
})();

const summary = {
  errors: issues.filter((i) => i.severity === "error").length,
  warnings: issues.filter((i) => i.severity === "warn").length,
  sitemapUrls: urls.length,
  pagesChecked: pageReport.length,
  pagesOk: pageReport.filter((p) => p.ok).length,
};

const report = {
  generatedAt: new Date().toISOString(),
  summary,
  previous,
  head: { title, description, canonical },
  robots: { present: Boolean(robots), disallowed },
  issues,
  pages: pageReport,
};

writeFileSync(OUT, JSON.stringify(report, null, 2));
console.log(
  `seo-audit: ${summary.errors} erro(s), ${summary.warnings} aviso(s), ${summary.sitemapUrls} URLs, ${summary.pagesOk}/${summary.pagesChecked} páginas OK → public/seo-audit.json`
);
