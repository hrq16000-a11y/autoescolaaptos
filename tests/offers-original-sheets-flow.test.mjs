import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

test("ofertas mantém fluxo original da planilha com POST simples sem preflight do SDK", () => {
  const src = readFileSync("src/pages/Ofertas.tsx", "utf8");
  assert.match(src, /VITE_SUPABASE_URL/);
  assert.match(src, /functions\/v1\/marketing-optin/);
  assert.match(src, /method:\s*"POST"/);
  assert.match(src, /"Content-Type":\s*"text\/plain;charset=UTF-8"/);
  assert.doesNotMatch(src, /supabase\.functions\.invoke/);
  assert.doesNotMatch(src, /"Authorization"\s*:/);
  assert.doesNotMatch(src, /"apikey"\s*:/);
  assert.doesNotMatch(src, /MARKETING_OPTIN_API_URL/);
  assert.doesNotMatch(src, /marketing-api-msolus\.vercel\.app/);
  assert.match(src, /lgpd_aceite:\s*true/);
  assert.match(src, /res\?\.success === true/);
  assert.match(src, /window\.location\.assign\(whatsappOptinUrl\(telefone, true, false, \{ campaignSource, origemUrl \}\)\)/);
  assert.match(src, /Canal\/campanha:/);
  assert.match(src, /Página\/referência:/);
  assert.match(src, /cadastro ainda não foi confirmado/);
});
