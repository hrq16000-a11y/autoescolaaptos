import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";

test("ofertas usa fluxo original que atualiza a planilha e não a Vercel Blob", () => {
  const src = readFileSync("src/pages/Ofertas.tsx", "utf8");
  assert.match(src, /import \{ supabase \} from ["']@\/integrations\/supabase\/client["']/);
  assert.match(src, /supabase\.functions\.invoke\("marketing-optin"/);
  assert.doesNotMatch(src, /MARKETING_OPTIN_API_URL/);
  assert.doesNotMatch(src, /marketing-api-msolus\.vercel\.app/);
  assert.match(src, /lgpd_aceite:\s*true/);
  assert.match(src, /res\?\.success === true/);
  assert.match(src, /window\.location\.assign\(whatsappOptinUrl\(telefone, true\)\)/);
});
