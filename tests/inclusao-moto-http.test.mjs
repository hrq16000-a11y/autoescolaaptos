import assert from "node:assert/strict";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";

const dist = "dist";
const vercel = JSON.parse(readFileSync("vercel.json", "utf8"));
const motoPath = "/inclusao-moto/index.html";
const route = vercel.rewrites.find((item) => item.source === "/inclusao-moto");
assert.equal(route?.destination, motoPath, "rewrite exata da campanha necessária");
assert.ok(existsSync(join(dist, motoPath)), "HTML pré-renderizado da campanha não gerado");
const root = readFileSync(join(dist, "index.html"), "utf8");
const moto = readFileSync(join(dist, motoPath), "utf8");

test("HTML estático contém SEO específico e exclusivo", () => {
  const expected = readFileSync("src/pages/InclusaoCategoriaA.tsx", "utf8");
  const tag = expected.match(/<SEO\b([\s\S]*?)\/>/)?.[1];
  const get = (key) => tag?.match(new RegExp("\\b" + key + '="([^"]+)"'))?.[1];
  const title = get("title"), description = get("description");
  assert.ok(title && description);
  assert.ok(moto.includes("<title>" + title + "</title>"));
  assert.ok(moto.includes('content="' + description + '"'));
  assert.match(moto, /rel="canonical" href="https:\/\/autoescolaaptos\.com\.br\/inclusao-moto"/);
  assert.match(moto, /property="og:url" content="https:\/\/autoescolaaptos\.com\.br\/inclusao-moto"/);
  assert.match(moto, /property="og:image" content="https:\/\/res\.cloudinary\.com\//);
  assert.match(moto, /"@type":"Service"/);
  assert.equal((moto.match(/rel="canonical"/g) || []).length, 1);
  assert.notEqual(root.match(/<title>([^<]+)<\/title>/)?.[1], title);
});

test("HTTP local serve campanha, assets e funil sem gravar leads", async () => {
  const server = createServer((req, res) => {
    const path = new URL(req.url, "http://localhost").pathname;
    const target = path === "/inclusao-moto" || path === "/inclusao-moto/"
      ? motoPath
      : path.startsWith("/api/")
        ? null
        : path.startsWith("/assets/") ? path : "/index.html";
    if (!target || !existsSync(join(dist, target))) {
      res.writeHead(404); res.end("Not found"); return;
    }
    const mime = target.endsWith(".js") ? "application/javascript" :
      target.endsWith(".css") ? "text/css" : "text/html";
    res.writeHead(200, { "Content-Type": mime });
    res.end(readFileSync(join(dist, target)));
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  try {
    const base = "http://127.0.0.1:" + server.address().port;
    const page = await fetch(base + "/inclusao-moto");
    assert.equal(page.status, 200);
    assert.match(await page.text(), /canonical" href="https:\/\/autoescolaaptos\.com\.br\/inclusao-moto/);
    assert.equal((await fetch(base + "/1contato")).status, 200);
    assert.equal((await fetch(base + "/api/nao-existe")).status, 404);
    const assets = [...moto.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((m) => m[1]);
    assert.ok(assets.length > 0);
    for (const asset of assets) {
      assert.equal((await fetch(base + asset)).status, 200, "asset ausente: " + asset);
    }
  } finally {
    await new Promise((resolve, reject) => server.close((e) => e ? reject(e) : resolve()));
  }
});
