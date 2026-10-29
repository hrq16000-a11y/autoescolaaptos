import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

// Testa a função REAL usada por /ofertas, em isolamento e sem chamadas externas.
const source = readFileSync("src/pages/Ofertas.tsx", "utf8");
const start = source.indexOf("function origemDaVisita() {");
const end = source.indexOf("export default function Ofertas", start);
assert.ok(start > 0 && end > start, "função origemDaVisita deve estar no formulário");
const fnSource = source.slice(start, end)
  .replace("let referencia: URL | null = null;", "let referencia = null;")
  .replace("(key: string)", "(key)");

function origem(href, referrer = "") {
  return runInNewContext(fnSource + "\norigemDaVisita()", {
    URL, window: { location: { href } }, document: { referrer },
  }, { timeout: 500 });
}

const page = "https://autoescolaaptos.com.br/ofertas";

test("identifica domínios Instagram e Facebook sem UTM", () => {
  assert.match(origem(page, "https://l.instagram.com/").campaignSource, /^instagram$/);
  assert.match(origem(page, "https://m.facebook.com/").campaignSource, /^facebook$/);
  assert.match(origem(page, "https://www.instagram.com/").campaignSource, /^instagram$/);
  assert.match(origem(page, "https://fb.me/").campaignSource, /^facebook$/);
});

test("distingue Google orgânico, anúncios, WhatsApp e links internos", () => {
  assert.equal(origem(page, "https://www.google.com/search?q=aptos").campaignSource, "google orgânico");
  assert.equal(origem(page + "?gclid=abc").campaignSource, "google ads");
  assert.equal(origem(page, "https://wa.me/5541999999999").campaignSource, "whatsapp");
  const internal = origem(page, "https://autoescolaaptos.com.br/aulas-praticas-direcao?private=test");
  assert.equal(internal.campaignSource, "site / página interna");
  const ref = new URL(internal.origemUrl).searchParams.get("referencia");
  assert.equal(ref, "https://autoescolaaptos.com.br/aulas-praticas-direcao");
});

test("UTM identifica Instagram Stories, campanha e peça sem copiar parâmetros privados", () => {
  const query = "?utm_source=instagram&utm_medium=story&utm_campaign=ofertas_exclusivas&utm_content=story01&fbclid=secret&telefone=41999999999";
  const data = origem(page + query);
  assert.match(data.campaignSource, /instagram/);
  assert.match(data.campaignSource, /story/);
  assert.match(data.campaignSource, /ofertas_exclusivas/);
  const url = new URL(data.origemUrl);
  assert.equal(url.searchParams.get("utm_content"), "story01");
  assert.equal(url.searchParams.get("fbclid"), null);
  assert.equal(url.searchParams.get("telefone"), null);
});

test("acesso sem referência não inventa atribuição de origem", () => {
  const data = origem(page);
  assert.equal(data.campaignSource, "direto / não identificado");
  assert.equal(new URL(data.origemUrl).searchParams.get("referencia"), null);
});
