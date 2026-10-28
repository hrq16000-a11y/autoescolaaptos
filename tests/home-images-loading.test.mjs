import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const hero = readFileSync("src/components/Hero.tsx", "utf8");
const about = readFileSync("src/components/About.tsx", "utf8");
test("imagem principal do carrossel permanece prioritária", () => {
  assert.match(hero, /loading=\{index === 0 \? "eager" : "lazy"\}/);
  assert.match(hero, /fetchpriority: index === 0 \? "high" : "auto"/);
  assert.match(hero, /decoding="async"/);
});
test("imagens abaixo da dobra usam lazy e decoding async", () => {
  for (const alt of ["Instrutor da Autoescola APTOS", "Sala de aula teórica da Autoescola APTOS"]) {
    const pos = about.indexOf(alt);
    assert.ok(pos !== -1);
    assert.match(about.slice(pos, pos + 260), /loading="lazy"/);
    assert.match(about.slice(pos, pos + 260), /decoding="async"/);
  }
});
