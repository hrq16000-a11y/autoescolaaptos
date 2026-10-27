import assert from "node:assert/strict";
import { test, after } from "node:test";
import handler from "../api/admin-marketing-optins.ts";

const previousSecret = process.env.APTOS_OFFERS_ADMIN_TOKEN;
const previousBlob = process.env.BLOB_READ_WRITE_TOKEN;
const previousStore = process.env.BLOB_STORE_ID;
const originalFetch = globalThis.fetch;
const secret = "valid-secret-of-at-least-32-characters-12345";
const blobToken = "vercel_blob_rw_store_FAKETOKEN";
const allowedOrigin = "https://autoescolaaptos.com.br";

process.env.APTOS_OFFERS_ADMIN_TOKEN = secret;
process.env.BLOB_READ_WRITE_TOKEN = blobToken;
process.env.BLOB_STORE_ID = "teststore";

after(() => {
  if (previousSecret === undefined) delete process.env.APTOS_OFFERS_ADMIN_TOKEN;
  else process.env.APTOS_OFFERS_ADMIN_TOKEN = previousSecret;
  if (previousBlob === undefined) delete process.env.BLOB_READ_WRITE_TOKEN;
  else process.env.BLOB_READ_WRITE_TOKEN = previousBlob;
  if (previousStore === undefined) delete process.env.BLOB_STORE_ID;
  else process.env.BLOB_STORE_ID = previousStore;
  globalThis.fetch = originalFetch;
});

function request(method = "GET", key = secret, origin = allowedOrigin) {
  return {
    method, query: {}, headers: { origin, "x-aptos-admin-token": key },
  };
}
function response() {
  const headers = new Map();
  return {
    statusCode: 200,
    setHeader(name, value) { headers.set(name.toLowerCase(), value); },
    end(body) { this.body = body ? JSON.parse(body) : null; return this; },
    headers,
    body: null,
  };
}

test("nega origem não autorizada antes de consultar dados", async () => {
  const r = response();
  await handler(request("GET", secret, "https://site-externo.example"), r);
  assert.equal(r.statusCode, 403);
});
test("nega GET sem credencial e não consulta Blob", async () => {
  globalThis.fetch = async () => { throw Error("Não deve consultar storage"); };
  const r = response();
  await handler(request("GET", ""), r);
  assert.equal(r.statusCode, 401);
  assert.equal(r.headers.get("cache-control"), "private, no-store, max-age=0");
  assert.equal(r.headers.get("access-control-allow-origin"), allowedOrigin);
});
test("nega POST com método 405", async () => {
  const r = response();
  await handler(request("POST"), r);
  assert.equal(r.statusCode, 405);
});
test("GET autenticado lê apenas os campos necessários e pagina", async () => {
  let listCalls = 0;
  let blobCalls = 0;
  globalThis.fetch = async (url, init) => {
    const str = String(url);
    assert.equal(init.headers.Authorization, "Bearer " + blobToken);
    if (str.startsWith("https://vercel.com/api/blob/")) {
      listCalls++;
      assert.equal(init.headers["x-vercel-blob-store-id"], "teststore");
      assert.equal(new URL(str).searchParams.get("prefix"), "marketing-optins/");
      return Response.json({ blobs: [{ pathname: "marketing-optins/" + "a".repeat(32) + ".json" }], hasMore: false });
    }
    if (str.startsWith("https://teststore.private.blob.vercel-storage.com/")) {
      blobCalls++;
      return Response.json({
        event: "marketing_optin", id: "optin-1", telefone: "41999999999",
        created_at: "2026-10-27T10:00:00.000Z", campaign_source: "site",
        lgpd_aceite: true, ip: "127.0.0.1", user_agent: "sensitive",
      });
    }
    throw Error("Requisição inesperada: " + str);
  };
  const r = response();
  await handler(request(), r);
  assert.equal(r.statusCode, 200);
  assert.equal(listCalls, 1);
  assert.equal(blobCalls, 1);
  assert.equal(r.body.records.length, 1);
  assert.equal(r.body.records[0].telefone, "41999999999");
  assert.equal(r.body.records[0].ip, undefined);
  assert.equal(r.body.records[0].user_agent, undefined);
  assert.equal(r.body.cursor, null);
  assert.equal(r.body.hasMore, false);
});
