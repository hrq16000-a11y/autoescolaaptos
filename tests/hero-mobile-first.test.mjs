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

test("hero mobile respeita altura da navbar fixa no topo", () => {
  const navbar = readFileSync("src/components/Navbar.tsx", "utf8");
  assert.match(navbar, /fixed top-0 left-0 right-0/);
  assert.match(navbar, /justify-between h-20/);
  assert.match(hero, /data-component="MobileHero" className="[^"]*pt-20/);
});

test("controles ficam antes da imagem e fora da faixa dos botoes flutuantes", () => {
  const toolbar = hero.indexOf('data-component="HeroMobileControls"');
  const carousel = hero.indexOf('ref={mobileRef}');
  const cta = hero.indexOf('data-component="HeroMobilePrimaryCTA"');
  assert.ok(toolbar !== -1 && toolbar < carousel && carousel < cta);
  assert.match(hero.slice(toolbar - 130, toolbar + 250), /min-h-14/);
  assert.ok(hero.includes('min-[390px]:inline'));
});
