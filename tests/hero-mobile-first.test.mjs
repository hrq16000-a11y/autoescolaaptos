import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const hero = readFileSync("src/components/Hero.tsx", "utf8");

test("hero mobile usa os mesmos arquivos oficiais e preserva desktop", () => {
  assert.match(hero, /data-component="MobileHero"/);
  assert.match(hero, /md:hidden/);
  assert.match(hero, /hidden md:flex/);
  assert.match(hero, /const slides = \[/);
  assert.match(hero, /src=\{slide\.image\}/);
});
test("imagem mobile visivel, nao cortada, com leitura separada", () => {
  assert.match(hero, /max-h-\[42svh\] object-contain/);
  assert.match(hero, /px-4 py-5 space-y-3/);
});
test("controle mobile completo e autoplay desligado inicialmente", () => {
  assert.match(hero, /useState\(false\)/);
  assert.match(hero, /watchDrag: true/);
  for(const label of ["Banner anterior","Próximo banner","Pausar banners","Reproduzir banners","Deslize para navegar"]) assert.ok(hero.includes(label),label);
  assert.match(hero, /prefers-reduced-motion: reduce/);
});
test("CTA do polo preserva destino interno", () => {
  assert.match(hero, /index === 0 \? "\/carro-automatico" : "\/orcamento"/);
  assert.match(hero, /data-component="HeroMobilePrimaryCTA"/);
});
