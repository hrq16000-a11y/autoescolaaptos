import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const page = readFileSync("src/pages/InclusaoCategoriaA.tsx","utf8");
const router = readFileSync("src/App.tsx","utf8");
const home = readFileSync("src/pages/Index.tsx","utf8");
const triage = readFileSync("src/pages/UmContato.tsx","utf8");
const sitemap = readFileSync("public/sitemap.xml","utf8");

test("rota /inclusao-moto publicada pelo React Router e canonical único", () => {
  assert.match(router, /<Route path="\/inclusao-moto" element=\{<InclusaoCategoriaA \/>\}/);
  assert.match(router, /path="\/inclusao-categoria-a" element=\{<Navigate to="\/inclusao-moto" replace \/>\}/);
  assert.match(page, /const PATH = "\/inclusao-moto"/);
  assert.match(page, /canonical=\{PATH\}/);
  assert.match(sitemap, /https:\/\/autoescolaaptos\.com\.br\/inclusao-moto/);
  assert.doesNotMatch(sitemap, /https:\/\/autoescolaaptos\.com\.br\/inclusao-categoria-a/);
});

test("campanha exibe oferta e separa as taxas do DETRAN", () => {
  assert.match(page, /R\$ 750/);
  assert.match(page, /Taxas do DETRAN não inclusas/);
  assert.match(page, /399/);
  assert.match(page, /Honda PCX/);
  assert.match(page, /Honda Fan 160/);
});

test("links e mídia têm URL estável, sem imagem local 404", () => {
  assert.doesNotMatch(page, /\/campanhas\/categoria-a\/(pcx|fan160)-aptos-real\.webp/);
  const refs = [...page.matchAll(/https:\/\/res\.cloudinary\.com\/dqnwlodjs\/image\/upload\/v\d+\/aptos\/categoria-a\/[^"\s]+/g)];
  assert.ok(refs.length >= 4, "landing deve usar banner, poster e fotos reais");
  assert.match(home, /to="\/inclusao-moto"/);
  assert.match(home, /HomeMotoCallout/);
  assert.match(home, /R\$ 750/);
});

test("captação é feita antes do WhatsApp e mantém a moto e UTMs", () => {
  assert.match(page, /qs\.set\("moto", moto\)/);
  assert.match(page, /qs\.set\("origem", CAMPAIGN\)/);
  assert.match(page, /utm_source/);
  assert.match(triage, /motoCampanha/);
  assert.match(triage, /inclusao_moto_\$\{motoCampanha\}/);
  assert.match(triage, /Moto de interesse/);
  assert.match(triage, /persistence_not_confirmed/);
  assert.match(triage, /submit-triagem/);
});
