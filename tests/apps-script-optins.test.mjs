import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { test } from "node:test";

const source = readFileSync("integrations/google-apps-script/AutoescolaAptosOfertas.gs", "utf8");
const environment = {
  console: { log() {} },
  Date, Set, Array, Object, JSON, String, Number, Error, RegExp, encodeURIComponent, isNaN,
  PropertiesService: {
    getUserProperties() {
      return { getProperty: key => key === "APTOS_OFFERS_ADMIN_READ_TOKEN" ? "a".repeat(40) : null,
        setProperty() {} };
    },
  },
};
runInNewContext(source, environment, { timeout: 1500 });
const iso = "2026-10-27T12:34:56.000Z";

test("deduplica números históricos mesmo com código do país e não sobrescreve", () => {
  const existing = [["legacy-id", "41999999999"], ["legacy-other", "5541988888888"]];
  const records = [
    { id: "new-id-same-phone", telefone: "+55 (41) 99999-9999", lgpd_aceite: true, created_at: iso },
    { id: "legacy-id", telefone: "41977777777", lgpd_aceite: true, created_at: iso },
    { id: "new-id", telefone: "41955555555", lgpd_aceite: true, created_at: iso, campaign_source: "=fórmula" },
    { id: "new-id-2", telefone: "5541955555555", lgpd_aceite: true, created_at: iso },
    { id: "no-consent", telefone: "41944444444", lgpd_aceite: false, created_at: iso },
    { id: "bad-phone", telefone: "123", lgpd_aceite: true, created_at: iso },
  ];
  const x = environment.aptosPlanejar(existing, records);
  assert.equal(x.rows.length, 1);
  assert.equal(x.duplicados, 3);
  assert.equal(x.ignorados, 2);
  assert.equal(x.rows[0][1], "new-id");
  assert.equal(x.rows[0][2], "41955555555");
  assert.equal(x.rows[0][3], "autorizado");
  assert.equal(x.rows[0][4], "'=fórmula");
  assert.equal(x.rows[0][7], "");
  assert.equal(x.rows[0][8], "");
});

test("rotina usa autorização privada, pagina e só grava os novos registros", () => {
  const lastRow = 3;
  const sheetData = [["legacy-id", "41999999999"], ["legacy-id-2", "41988888888"]];
  let phoneNumberFormat = false;
  let written;
  let calls = 0;
  let requests = 0;
  const sheet = {
    getLastRow() { return lastRow; },
    getRange(row, col, count, width) {
      if (row === 2) return { getDisplayValues: () => sheetData };
      if (col === 3) return { setNumberFormat: format => { assert.equal(format, "@"); phoneNumberFormat = true; } };
      assert.equal(row, 4);
      assert.equal(col, 1); assert.equal(width, 10);
      return { setValues: rows => { written = rows; } };
    },
  };
  environment.SpreadsheetApp = { getActiveSpreadsheet: () => ({
    getId: () => "1ta5aB4OxmF9dxCEx8Ql0S2K0cwYamW6rrxh-2FlO9x0",
    getSheetByName: name => name === "Optins" ? sheet : null,
  }) };
  environment.LockService = { getDocumentLock: () => ({
    tryLock: () => true, releaseLock: () => { calls++; },
  }) };
  environment.PropertiesService = { getUserProperties() {
    return { getProperty: () => "a".repeat(40), setProperty: () => {} };
  } };
  environment.UrlFetchApp = {
    fetch(url, opts) {
      requests++;
      assert.equal(opts.headers["X-Aptos-Admin-Token"], "a".repeat(40));
      const response = requests === 1 ? {
        records: [{ id: "new-from-api", telefone: "41955555555", created_at: iso,
          lgpd_aceite: true }], hasMore: true, cursor: "next",
      } : {
        records: [{ id: "existing-api-id", telefone: "5541999999999", created_at: iso,
          lgpd_aceite: true }], hasMore: false,
      };
      assert.equal(new URL(url).searchParams.get("cursor"), requests === 1 ? null : "next");
      return { getResponseCode: () => 200, getContentText: () => JSON.stringify(response) };
    },
  };
  const result = environment.aptosSincronizar();
  assert.equal(result.added, 1);
  assert.equal(result.existing, 1);
  assert.equal(result.ignored, 0);
  assert.equal(requests, 2);
  assert.equal(calls, 1);
  assert.equal(phoneNumberFormat, true);
  assert.equal(written.length, 1);
  assert.equal(written[0][2], "41955555555");
});
