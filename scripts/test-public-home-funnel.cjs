const { chromium } = require("playwright");
(async () => {
 const browser=await chromium.launch({headless:true});
 try {
  const page=await browser.newPage({viewport:{width:390,height:844}});
  await page.goto("https://autoescolaaptos.com.br/",{waitUntil:"networkidle",timeout:45000});
  const cta=page.locator('[data-component="HomePrimeiraHabilitacaoFunil"]');
  await cta.waitFor({state:"visible",timeout:15000});
  if(await cta.getAttribute("href")!=="/orcamento") throw Error("Destino incorreto do funil");
  await cta.click();
  await page.waitForURL(/\/orcamento/,{timeout:20000});
  await page.getByRole("heading",{name:/orçamento.*3 passos/i}).waitFor({state:"visible",timeout:12000});
  console.log("PASS home: card Primeira Habilitacao -> orcamento em 3 passos");
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
