const { chromium } = require("playwright");
const base = "https://autoescolaaptos.com.br";
(async () => {
  const browser = await chromium.launch({headless:true});
  try {
    for (const width of [320,390,768]) {
      const page = await browser.newPage({viewport:{width,height:800}});
      await page.goto(base+"/", {waitUntil:"domcontentloaded",timeout:35000});
      const toggle = page.getByRole("button",{name:"Abrir menu de navegação"});
      await toggle.click();
      const closer = page.getByRole("button",{name:"Fechar menu de navegação"});
      if(await closer.getAttribute("aria-expanded") !== "true") throw Error(width+": aria-expanded nao abriu");
      if(await closer.getAttribute("aria-controls") !== "aptos-mobile-menu") throw Error(width+": aria-controls incorreto");
      const nav=page.locator("#aptos-mobile-menu");
      await nav.getByRole("link",{name:"Primeira Habilitação"}).waitFor({state:"visible"});
      await page.keyboard.press("Escape");
      await page.getByRole("button",{name:"Abrir menu de navegação"}).waitFor({state:"visible"});
      await page.getByRole("button",{name:"Abrir menu de navegação"}).click();
      await nav.getByRole("link",{name:"Primeira Habilitação"}).click();
      await page.waitForURL(/\/primeira-habilitacao/, {timeout:20000});
      if(await page.getByRole("button",{name:"Abrir menu de navegação"}).getAttribute("aria-expanded") !== "false")
        throw Error(width+": menu nao fechou ao navegar");
      console.log("PASS menu mobile "+width+"px: abre, Esc, link e fechamento em rota");
      await page.close();
    }
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
