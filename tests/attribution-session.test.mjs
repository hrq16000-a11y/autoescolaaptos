import assert from "node:assert/strict";
import { after, test } from "node:test";
import { captureCampaignAttribution, readAttributionUtms } from "../src/lib/attribution.ts";

const previousWindow = globalThis.window;
const storage = new Map();
const sessionStorage = {
  getItem: (key) => storage.get(key) ?? null,
  setItem: (key, value) => { storage.set(key, String(value)); },
};

function visit(search) {
  globalThis.window = { location: { search }, sessionStorage };
  return captureCampaignAttribution();
}

after(() => {
  if (previousWindow === undefined) delete globalThis.window;
  else globalThis.window = previousWindow;
});

test("visita paga no Instagram persiste na navegação interna sem copiar click IDs", () => {
  storage.clear();
  const first = visit("?utm_source=ig&utm_medium=paid_social&utm_campaign=novembro&utm_content=ad01&fbclid=private&telefone=123");
  assert.deepEqual(first, {
    utm_source: "ig", utm_medium: "paid_social",
    utm_campaign: "novembro", utm_content: "ad01",
  });
  assert.equal(storage.get("aptos:campaign-attribution:session:v1").includes("fbclid"), false);
  assert.deepEqual(visit(""), first);
  assert.deepEqual(readAttributionUtms(), first);
});

test("nova campanha Facebook substitui a origem anterior na mesma sessão", () => {
  storage.clear();
  visit("?utm_source=instagram&utm_medium=paid_social&utm_campaign=anterior");
  const latest = visit("?utm_source=fb&utm_medium=paid_social&utm_campaign=atual");
  assert.equal(latest.utm_source, "fb");
  assert.equal(visit("").utm_campaign, "atual");
});

test("visita sem marcação não inventa anúncio ou rede social", () => {
  storage.clear();
  assert.deepEqual(visit("?fbclid=indefinido"), {});
  assert.deepEqual(visit(""), {});
});

test("storage bloqueado não impede ler a origem na própria landing", () => {
  globalThis.window = {
    location: { search: "?utm_source=facebook&utm_medium=paid_social" },
    sessionStorage: { getItem() { throw Error("blocked"); }, setItem() { throw Error("blocked"); } },
  };
  assert.equal(readAttributionUtms().utm_source, "facebook");
});
