const { chromium } = require("playwright");
const fs = require("node:fs");
const site = "https://autoescolaaptos.com.br";
const sizes = [320, 375, 390, 430];

(async () => {
  fs.mkdirSync("artifacts/aptos-visual", { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of sizes) {
      const page = await browser.newPage({ viewport: { width, height: 844 }, isMobile: true, hasTouch: true });
      const response = await page.goto(site + "/", { waitUntil: "domcontentloaded", timeout: 45000 });
      if (!response || response.status() !== 200) throw Error("Home HTTP invalido " + width + ": " + response?.status());
      const hero = page.locator('[data-component="MobileHero"]');
      await hero.waitFor({ state: "visible", timeout: 30000 });
      const nav = page.locator("nav.fixed").first();
      const toolbar = page.locator('[data-component="HeroMobileControls"]');
      await toolbar.waitFor({ state: "visible", timeout: 15000 });
      const [navBox, heroBox, toolbarBox] = await Promise.all([nav.boundingBox(), hero.boundingBox(), toolbar.boundingBox()]);
      if (!navBox || !heroBox || !toolbarBox) throw Error("Elemento ausente " + width);
      const navBottom = navBox.y + navBox.height;
      if (toolbarBox.y < navBottom - 2) throw Error("Controles sob navbar: " + width + ", " + JSON.stringify({navBottom,toolbarY:toolbarBox.y}));
      if (toolbarBox.x < -2 || toolbarBox.x + toolbarBox.width > width + 2) throw Error("Controles fora da largura: " + width);
      const photo = hero.locator('article').first().locator('img').first();
      const photoInfo = await photo.evaluate(async img => {
        if (!img.complete) await new Promise(resolve => {img.addEventListener("load",resolve,{once:true});img.addEventListener("error",resolve,{once:true});});
        return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, fit: getComputedStyle(img).objectFit };
      });
      if (!photoInfo.naturalWidth || photoInfo.fit !== "contain") throw Error("Fotografia cortada ou quebrada " + width + ": " + JSON.stringify(photoInfo));
      for (const label of ["Banner anterior", "Próximo banner", "Reproduzir banners"]) {
        await toolbar.getByRole("button", { name: label }).waitFor({ state: "visible" });
      }
      await toolbar.getByRole("button", { name: "Próximo banner" }).click();
      await page.waitForTimeout(550);
      const index = (await toolbar.innerText()).match(/(\d+)\s*\/\s*5/);
      if (!index || index[1] !== "2") throw Error("Avanco do slide nao funcionou " + width + ": " + await toolbar.innerText());
      await page.screenshot({ path: "artifacts/aptos-visual/hero-mobile-" + width + ".png", fullPage: false, animations: "disabled" });
      console.log("PASS Hero mobile " + width + "px: navbar, controles, imagem e navegacao");
      await page.close();
    }
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });