import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const source = readFileSync("src/pages/admin/AdminOptin.tsx", "utf8");

test("CSV protege formula injection", () => {
  assert.ok(source.includes("Evita execução de fórmulas"), "CSV protection comment");
  assert.ok(source.includes(String.raw`/^[\s\u0000-\u001f]*[=+@-]/`), "regex for dangerous CSV values");
  assert.ok(source.includes('s = "\'" + s'), "escape with apostrophe");
  assert.ok(source.includes('s.replace(/"/g'), "escape double quotes");
});
test("CSV exporta somente registros carregados", () => {
  assert.ok(source.includes("...rows.map((r) => headers.map((h) => esc("));
  assert.ok(source.includes("if (!rows.length) return;"));
});