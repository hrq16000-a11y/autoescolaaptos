const { chromium } = require("playwright");
const base = "https://autoescolaaptos.com.br/orcamento";
(async () => {
 const browser=await chromium.launch({headless:true});
 try {
  for(const width of [390,1440]){
   const page=await browser.newPage({viewport:{width,height:844}});
   const response=await page.goto(base,{waitUntil:"domcontentloaded",timeout:40000});
   if(response?.status()!==200)throw Error("Orcamento HTTP "+response?.status());
   await page.getByRole("button",{name:/^Carro/}).first().click();
   await page.getByRole("button",{name:/^Este mês/}).click();
   await page.getByRole("button",{name:/^Nunca/}).click();
   const review=page.getByRole("button",{name:"Revisar minhas respostas"});
   await review.waitFor({state:"visible"});
   await review.click();
   await page.getByRole("button",{name:/^Já dirijo/}).click();
   await review.waitFor({state:"visible"});
   const final=page.getByRole("link",{name:"Receber meu orçamento agora"});
   const href=await final.getAttribute("href");
   if(!href||!/(api\.whatsapp\.com|wa\.me)/.test(href)) throw Error("WhatsApp indisponivel "+width);
   const msg=new URL(href).searchParams.get("text")||"";
   for (const phrase of ["Carro","Este mês","Já dirijo"]) if(!msg.includes(phrase)) throw Error("Resposta ausente "+phrase+" "+width);
   if(msg.includes("Nunca dirigi"))throw Error("Resposta antiga permaneceu na mensagem");
   await page.getByText(/A mensagem será preparada no WhatsApp/).waitFor({state:"visible"});
   console.log("PASS orcamento "+width+"px: 3 respostas, revisao e WhatsApp atualizado");
   await page.close();
  }
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
