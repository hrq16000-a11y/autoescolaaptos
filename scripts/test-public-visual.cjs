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
    for (const device of [{name:"mobile",width:390,height:844},{name:"desktop",width:1440,height:900}]) {
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
        if(info.x < -4 || info.right > device.width+4) throw Error("Imagem fora da tela "+item.path+": "+JSON.stringify(info));
        await page.screenshot({path:"artifacts/aptos-visual/"+device.name+"-"+item.path.slice(1)+".png",fullPage:true,animations:"disabled"});
        console.log("PASS "+device.name+" "+item.path+" fotografia "+info.naturalWidth+"x"+info.naturalHeight);
      }
      await page.close();
    }
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exit(1);});
