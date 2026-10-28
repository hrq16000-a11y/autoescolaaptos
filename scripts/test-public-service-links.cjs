const { chromium } = require("playwright");
const origin = "https://autoescolaaptos.com.br";
const services = [
  { name: "Inclusão de Categoria (A ou B)", route: "/inclusao-categoria" },
  { name: "Curso de Reciclagem 100% Online", route: "/reciclagem-cnh" },
  { name: "Reteste Prático", route: "/reteste-pratico" },
];
(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 844 } });
      await page.goto(origin + "/", { waitUntil: "networkidle", timeout: 45000 });
      for (const service of services) {
        const card = page.locator("#servicos").locator("div.group").filter({ has: page.getByRole("heading", { name: service.name, exact: true }) }).first();
        const details = card.locator('a[data-component="HomeServiceDetails"]');
        await details.waitFor({ state: "visible", timeout: 15000 });
        if (await details.getAttribute("href") !== service.route) throw Error("Destino incorreto: " + service.name);
        const whats = card.getByRole("link", { name: "Solicitar Orçamento" });
        const href = await whats.getAttribute("href");
        if (!href || !/(api\.whatsapp\.com|wa\.me)/.test(href)) throw Error("WhatsApp ausente em " + service.name);
        const message = new URL(href).searchParams.get("text") || "";
        if (!message.includes(service.name)) throw Error("Mensagem sem o servico: " + service.name);
        await details.click();
        await page.waitForURL(url => url.pathname === service.route, { timeout: 20000 });
        await page.getByRole("main").first().waitFor({ state: "visible", timeout: 15000 });
        console.log("PASS " + width + "px: " + service.name + " -> " + service.route + "; WhatsApp preservado");
        await page.goto(origin + "/", { waitUntil: "networkidle", timeout: 45000 });
      }
      await page.close();
    }
  } finally { await browser.close(); }
})().catch(err => { console.error(err); process.exit(1); });
