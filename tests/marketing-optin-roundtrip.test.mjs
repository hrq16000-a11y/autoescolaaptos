import assert from "node:assert/strict";
import { after, test } from "node:test";
import registerOptin from "../api/marketing-optin.ts";
import listAdminOptins from "../api/admin-marketing-optins.ts";

// Teste contratual em memória: não acessa a Vercel real e não cadastra pessoas.
const previous = {
  blob: process.env.BLOB_READ_WRITE_TOKEN,
  store: process.env.BLOB_STORE_ID,
  admin: process.env.APTOS_OFFERS_ADMIN_TOKEN,
  fetch: globalThis.fetch,
};
const token = "vercel_blob_rw_teststore_fixture";
const adminToken = "fixture-admin-token-with-strong-length-123456";
const origin = "https://autoescolaaptos.com.br";
process.env.BLOB_READ_WRITE_TOKEN = token;
process.env.BLOB_STORE_ID = "teststore";
process.env.APTOS_OFFERS_ADMIN_TOKEN = adminToken;

after(() => {
  for (const [key, prior] of [
    ["BLOB_READ_WRITE_TOKEN", previous.blob],
    ["BLOB_STORE_ID", previous.store],
    ["APTOS_OFFERS_ADMIN_TOKEN", previous.admin],
  ]) {
    if (prior === undefined) delete process.env[key];
    else process.env[key] = prior;
  }
  globalThis.fetch = previous.fetch;
});

function makeResponse() {
  return {
    statusCode: 200,
    headers: new Map(),
    setHeader(key, value) { this.headers.set(key.toLowerCase(), String(value)); },
    end(body) {
      this.body = body ? JSON.parse(body) : null;
      return this;
    },
  };
}

test("cadastro com consentimento e leitura administrativa compartilham o mesmo formato; duplicata não sobrescreve", async () => {
  const stored = new Map();
  let actualUploads = 0;
  globalThis.fetch = async (url, options = {}) => {
    const target = new URL(String(url));
    assert.equal(options.headers?.authorization || options.headers?.Authorization, "Bearer " + token);
    const path = target.searchParams.get("pathname");
    if (target.hostname === "vercel.com" && options.method === "PUT") {
      assert.equal(options.headers["x-vercel-blob-store-id"], "teststore");
      assert.equal(options.headers["x-vercel-blob-access"], "private");
      assert.equal(options.headers["x-allow-overwrite"], "0");
      assert.match(path || "", /^marketing-optins\/[a-f0-9]{32}\.json$/);
      if (stored.has(path)) return Response.json({ message: "already exists" }, { status: 409 });
      const document = JSON.parse(options.body);
      stored.set(path, document);
      actualUploads++;
      return Response.json({ pathname: path, url: "private://fixture" });
    }
    if (target.hostname === "vercel.com" && !options.method) {
      assert.equal(target.searchParams.get("prefix"), "marketing-optins/");
      const blobs = [...stored.keys()].map(pathname => ({ pathname }));
      return Response.json({ blobs, hasMore: false });
    }
    if (target.hostname === "teststore.private.blob.vercel-storage.com") {
      const pathname = target.pathname.slice(1);
      assert.ok(stored.has(pathname), "leitura de blob deve apontar para um registro existente");
      return Response.json(stored.get(pathname));
    }
    throw new Error("Unexpected external request in test");
  };

  const invalid = makeResponse();
  await registerOptin({
    method: "POST",
    headers: { origin },
    body: { telefone: "(41) 99999-9999", lgpd_aceite: false },
  }, invalid);
  assert.equal(invalid.statusCode, 400);
  assert.equal(stored.size, 0, "consentimento ausente jamais salva");

  const valid = makeResponse();
  const request = {
    method: "POST",
    headers: { origin, "x-forwarded-for": "127.0.0.1", "user-agent": "fixture-only" },
    body: {
      telefone: "(41) 99999-9999",
      lgpd_aceite: true,
      campaign_source: "site",
      origem_url: "https://autoescolaaptos.com.br/ofertas",
    },
  };
  await registerOptin(request, valid);
  assert.equal(valid.statusCode, 200);
  assert.equal(valid.body.success, true);
  assert.equal(typeof valid.body.id, "string");
  assert.equal(stored.size, 1);
  assert.equal(actualUploads, 1);
  const saved = [...stored.values()][0];
  assert.equal(saved.telefone, "41999999999");
  assert.equal(saved.lgpd_aceite, true);
  assert.equal(saved.event, "marketing_optin");

  const admin = makeResponse();
  await listAdminOptins({
    method: "GET",
    headers: { origin, "x-aptos-admin-token": adminToken },
    query: { limit: "30" },
  }, admin);
  assert.equal(admin.statusCode, 200);
  assert.equal(admin.headers.get("cache-control"), "private, no-store, max-age=0");
  assert.equal(admin.body.records.length, 1);
  assert.equal(admin.body.records[0].id, saved.id);
  assert.equal(admin.body.records[0].telefone, saved.telefone);
  assert.equal(admin.body.records[0].lgpd_aceite, true);
  assert.equal(admin.body.records[0].campaign_source, "site");
  assert.equal(admin.body.records[0].ip, undefined);
  assert.equal(admin.body.records[0].user_agent, undefined);

  const repeated = makeResponse();
  await registerOptin(request, repeated);
  assert.equal(repeated.statusCode, 200);
  assert.equal(repeated.body.success, false);
  assert.equal(repeated.body.duplicate, true);
  assert.equal(actualUploads, 1, "não sobrescrever consentimento original");
  assert.equal(stored.size, 1);
  assert.equal([...stored.values()][0].id, saved.id);
});
