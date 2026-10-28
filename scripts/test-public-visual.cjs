const { chromium } = require("playwright");
const fs = require("fs");
const base = "https://autoescolaaptos.com.br";
const cases = [
  { path: "/carro-automatico", imageAlt: /Volkswagen Polo automático da Autoescola APTOS/ },
  { path: "/aulas-praticas-direcao", imageAlt: /Polo automático preto e amarelo da Autoescola APTOS/ },
];
(async () => {
  fs.mkdirSync("artifacts/aptos-visual", { recursive: true });
  const browser = await chromium.launch({ headless: true });
  try {
    // Regressao: simulador fica oculto da home, mas acessivel por URL direta.
    const home = await browser.newPage({ viewport: { width: 390, height: 844 } });
    const homeResponse = await home.goto(base + "/", { waitUntil: "networkidle", timeout: 45000 });
    if (!homeResponse || homeResponse.status() !== 200) throw Error("Home nao respondeu HTTP 200");
    const visibleHomeLinks = await home.locator('a[href="/simulado-detran-pr"]').count();
    if (visibleHomeLinks !== 0) throw Error("Simulado ainda exposto na home: " + visibleHomeLinks + " links");
    console.log("PASS home: Simulado DETRAN-PR oculto dos links");
    const directResponse = await home.goto(base + "/simulado-detran-pr", { waitUntil: "domcontentloaded", timeout: 45000 });
    if (!directResponse || directResponse.status() !== 200) throw Error("Simulado nao acessivel por URL direta");
    await home.getByRole("heading", { name: /Simulado DETRAN PR 2026/i }).waitFor({ state: "visible", timeout: 15000 });
    console.log("PASS rota direta: Simulado DETRAN-PR acessivel");
    await home.close();
    for (const device of [{name:"compact",width:320,height:640},{name:"mobile",width:390,height:844},{name:"tablet",width:768,height:1024},{name:"desktop",width:1440,height:900}]) {
      const page = await browser.newPage({ viewport:{width:device.width,height:device.height}, deviceScaleFactor:1 });
      for(const item of cases) {
        const response=await page.goto(base+item.path,{waitUntil:"networkidle",timeout:45000});
        if(!response || response.status()!==200) throw Error(item.path+" HTTP "+response?.status());
        const photo=page.getByRole("img",{name:item.imageAlt}).first();
        await photo.scrollIntoViewIfNeeded();
        await photo.waitFor({state:"visible"});
        const info=await photo.evaluate(async el=>{
          if(!el.complete) await new Promise(resolve=>{el.addEventListener("load",resolve,{once:true});el.addEventListener("error",resolve,{once:true});});
          const r=el.getBoundingClientRect();
          return {naturalWidth:el.naturalWidth,naturalHeight:el.naturalHeight,x:r.x,right:r.right,width:r.width};
        });
        if(info.naturalWidth===0||info.naturalHeight===0) throw Error("Imagem quebrada "+item.path+": "+JSON.stringify(info));
        if(info.x < -4 || info.right > device.width+4) {
          const layout = await photo.evaluate(el => {
            const link = el.parentElement;
            const grid = link.parentElement;
            const container = grid.parentElement;
            const style = getComputedStyle(grid);
            return {
              imgRect: el.getBoundingClientRect().toJSON(),
              linkRect: link.getBoundingClientRect().toJSON(),
              gridRect: grid.getBoundingClientRect().toJSON(),
              containerRect: container.getBoundingClientRect().toJSON(),
              template: style.gridTemplateColumns,
              columns: grid.className,
              linkClass: link.className,
              cssAssets: [...document.querySelectorAll('link[rel=stylesheet]')].map(a => a.href),
            };
          });
          console.error("DIAGNOSTICO_CSS_PUBLICO " + JSON.stringify(layout));
          throw Error("Imagem fora da tela " + device.name + " " + item.path + ": " + JSON.stringify(info));
        }
        // Confere que o botao e o pop-up de triagem permanecem utilizaveis nesta largura.
        const buttonName = item.path === "/carro-automatico" ? "Falar no WhatsApp" : "Agendar Aulas";
        await page.getByRole("button", { name: buttonName, exact: true }).first().click();
        const dialog = page.getByRole("dialog");
        await dialog.waitFor({ state: "visible" });
        const dialogBox = await dialog.boundingBox();
        if (!dialogBox || dialogBox.x < -4 || dialogBox.x + dialogBox.width > device.width + 4)
          throw Error("Dialog fora da largura " + device.name + " " + item.path);
        const submit = dialog.getByRole("button", { name: /Continuar no WhatsApp/ });
        await submit.scrollIntoViewIfNeeded();
        const submitBox = await submit.boundingBox();
        if (!submitBox || submitBox.x < -4 || submitBox.x + submitBox.width > device.width + 4)
          throw Error("Botao de triagem cortado " + device.name + " " + item.path);
        await page.keyboard.press("Escape");
        await dialog.waitFor({ state: "hidden" });
        await page.screenshot({path:"artifacts/aptos-visual/"+device.name+"-"+item.path.slice(1)+".png",fullPage:true,animations:"disabled"});
        console.log("PASS "+device.name+" "+item.path+" fotografia "+info.naturalWidth+"x"+info.naturalHeight);
      }
      await page.close();
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
