import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const ui = readFileSync("src/pages/admin/AdminOptin.tsx", "utf8");
const api = readFileSync("supabase/functions/admin-optin/index.ts", "utf8");

test("a lista usa o filtro de telefone autorizado", () => {
  assert.match(ui, /buildParams\(\{ action: "list"/);
  assert.match(ui, /if \(filters\.q\) p\.set\("q"/);
});
test("metricas de telefone sao computadas dos mesmos registros", () => {
  assert.match(ui, /function metricsFromLoadedRows\(rows: OptinRow\[\]\)/);
  assert.match(ui, /setMetrics\(filters\.q \? metricsFromLoadedRows\(fetchedRows\) : metJson\)/);
  assert.match(ui, /bySync\[sync\]/);
  assert.match(ui, /Lista e indicadores consideram a pesquisa por telefone/);
});
test("funcao remota preservada, sem dependencia de novo deploy", () => {
  const metrics=api.slice(api.indexOf('if (action === "metrics")'),api.indexOf("// list",api.indexOf('if (action === "metrics")')));
  assert.doesNotMatch(metrics, /if \(q\) query = query\.ilike/);
});
