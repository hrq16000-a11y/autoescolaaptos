const { chromium } = require("playwright");
const base = "https://autoescolaaptos.com.br";
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const results = [];
  async function verify(path, buttonName, selections, expected) {
    await page.goto(base + path, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.getByRole("button", { name: buttonName, exact: true }).first().click({ timeout: 15000 });
    const dialog = page.getByRole("dialog");
    await dialog.waitFor({ timeout: 10000 });
    for (const [label, option] of selections) {
      await dialog.getByLabel(label).selectOption({ label: option });
    }
    const target = dialog.getByRole("button", { name: /Continuar no WhatsApp/ });
    if (!(await target.isEnabled())) throw new Error("Botao WhatsApp desabilitado");
    let outbound = null;
    await page.route(/https:\/\/(api\.whatsapp\.com|wa\.me)\//, async route => {
      outbound = route.request().url();
      await route.abort();
    });
    await target.click();
    await page.waitForTimeout(1100);
    await page.unrouteAll({ behavior: "ignoreErrors" });
    if (!outbound) throw new Error("Nao ocorreu encaminhamento WhatsApp: " + path);
    const url = new URL(outbound);
    const message = url.searchParams.get("text") || "";
    for (const value of expected) {
      if (!message.includes(value)) throw new Error("Ausente na mensagem de " + path + ": " + value);
    }
    results.push(path + " OK: modal e WhatsApp qualificado");
  }
  try {
    await verify("/aulas-praticas-direcao", "Agendar Aulas",
      [["Modalidade *", "Polo automático (categoria B)"], ["O que você precisa? *", "Aulas avulsas"], ["Melhor período *", "Tarde"]],
      ["Polo automático", "Aulas avulsas", "Tarde"]);
    await verify("/carro-automatico", "Falar no WhatsApp",
      [["Qual é seu objetivo? *", "Primeira habilitação"], ["Qual período é melhor para você? *", "Manhã"]],
      ["Primeira habilitação", "Manhã"]);
    console.log(results.join("\n"));
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exit(1); });
