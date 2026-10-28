import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const frontend = readFileSync("src/pages/admin/AdminOptin.tsx", "utf8");
const backend = readFileSync("supabase/functions/admin-optin/index.ts", "utf8");

test("filtro de telefone e enviado para as metricas e a lista", () => {
  assert.match(frontend, /if \(filters\.q\) p\.set\("q", filters\.q\.replace\(/);
  assert.match(frontend, /buildParams\(\{ action: "metrics" \}\)/);
  assert.match(frontend, /buildParams\(\{ action: "list"/);
});

test("API aplica telefone em ambas as consultas, preservando outros filtros", () => {
  const metrics = backend.slice(backend.indexOf('if (action === "metrics")'), backend.indexOf("// list", backend.indexOf('if (action === "metrics")')));
  const listing = backend.slice(backend.indexOf("// list", backend.indexOf('if (action === "metrics")')));
  for (const source of [metrics, listing]) {
    assert.match(source, /if \(q\) query = query\.ilike\("telefone"/);
    assert.match(source, /if \(syncStatus\) query = query\.eq\("sheet_sync_status"/);
    assert.match(source, /if \(from\) query = query\.gte\("created_at"/);
  }
});

test("UI nao afirma mais que o telefone so filtra a lista", () => {
  assert.doesNotMatch(frontend, /mas não a busca por telefone/);
  assert.match(frontend, /Lista e indicadores consideram a pesquisa por telefone/);
});
