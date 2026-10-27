import assert from "node:assert/strict";
import { test, after } from "node:test";
import { generateKeyPairSync } from "node:crypto";
import { syncOptinsToSheets } from "../src/server/googleOptinSheets.ts";

const saved = {
  account: process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON,
  id: process.env.OFERTAS_SHEET_ID,
  fetch: globalThis.fetch,
};
const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON = JSON.stringify({
  client_email: "sheet-sync-test@example.iam.gserviceaccount.com",
  private_key: privateKey.export({ type: "pkcs8", format: "pem" }),
  token_uri: "https://oauth2.googleapis.com/token",
});
process.env.OFERTAS_SHEET_ID = "1ta5aB4OxmF9dxCEx8Ql0S2K0cwYamW6rrxh-2FlO9x0";

after(() => {
  if (saved.account === undefined) delete process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON;
  else process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON = saved.account;
  if (saved.id === undefined) delete process.env.OFERTAS_SHEET_ID;
  else process.env.OFERTAS_SHEET_ID = saved.id;
  globalThis.fetch = saved.fetch;
});

test("Google Sheets aceita somente novos telefones, preserva consentimento e ignora duplicações", async () => {
  let appended = [];
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    const u = new URL(String(url));
    if (u.hostname === "oauth2.googleapis.com") {
      assert.equal(options.method, "POST");
      return Response.json({ access_token: "mock-access-token", expires_in: 3600 });
    }
    assert.equal(u.hostname, "sheets.googleapis.com");
    assert.equal(options.headers.Authorization, "Bearer mock-access-token");
    if (options.method === "GET") {
      assert.equal(decodeURIComponent(u.pathname).endsWith("Optins!B2:C"), true);
      return Response.json({ values: [
        ["legacy-id", "(41) 99999-9999"],
        ["another", "5541987654321"],
      ] });
    }
    assert.equal(options.method, "POST");
    calls++;
    const payload = JSON.parse(options.body);
    appended = payload.values;
    return Response.json({ updates: { updatedRows: payload.values.length } });
  };
  const date = "2026-10-27T10:00:00.000Z";
  const result = await syncOptinsToSheets([
    { id: "repeated-phone", telefone: "5541999999999", created_at: date, lgpd_aceite: true },
    { id: "legacy-id", telefone: "4198765432", created_at: date, lgpd_aceite: true },
    { id: "new-id", telefone: "41955555555", created_at: date, lgpd_aceite: true, campaign_source: "=danger" },
    { id: "new-id-2", telefone: "+55 (41) 95555-5555", created_at: date, lgpd_aceite: true },
  ]);
  assert.deepEqual(result, { added: 1, skipped: 3, examined: 4 });
  assert.equal(calls, 1);
  assert.equal(appended.length, 1);
  assert.equal(appended[0][0], date);
  assert.equal(appended[0][1], "new-id");
  assert.equal(appended[0][2], "41955555555");
  assert.equal(appended[0][3], "autorizado");
  assert.equal(appended[0][4], "'=danger");
  assert.equal(appended[0][7], "");
  assert.equal(appended[0][8], "");
});

test("rejeita opt-in sem consentimento antes de escrever", async () => {
  globalThis.fetch = async (url, options) => {
    const u = new URL(String(url));
    if (u.hostname === "oauth2.googleapis.com") return Response.json({ access_token: "mock-access-token", expires_in: 3600 });
    if (options.method === "GET") return Response.json({ values: [] });
    throw Error("Nenhuma gravação permitida");
  };
  await assert.rejects(
    syncOptinsToSheets([{ id: "no-accept", telefone: "41955555555", created_at: "2026-10-27T10:00:00.000Z", lgpd_aceite: false }]),
    /GOOGLE_SHEETS_OPTIN_INVALID/,
  );
});
