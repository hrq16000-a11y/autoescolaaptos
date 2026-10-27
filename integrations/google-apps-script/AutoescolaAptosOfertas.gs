/**
 * Autoescola APTOS | Sincronização privada de Ofertas Exclusivas
 * Vincule este script à planilha oficial: Extensões > Apps Script.
 * Não utiliza Google Cloud, conta de serviço, chave JSON ou Lovable.
 * Requer uma única autorização do proprietário da planilha.
 * @OnlyCurrentDoc
 */

var APTOS_CONFIG = Object.freeze({
  sheetId: "1ta5aB4OxmF9dxCEx8Ql0S2K0cwYamW6rrxh-2FlO9x0",
  tab: "Optins",
  api: "https://autoescolaaptos-marketing-api-msolus.vercel.app/api/admin-marketing-optins",
  tokenProperty: "APTOS_OFFERS_ADMIN_READ_TOKEN",
  statusProperty: "APTOS_SYNC_LAST_RESULT",
  pageSize: 40,
  maxPages: 100
});

function onOpen() {
  SpreadsheetApp.getUi().createMenu("APTOS | Ofertas")
    .addItem("Ativar sincronização automática", "aptosAtivar")
    .addItem("Sincronizar agora", "aptosSincronizarAgora")
    .addItem("Consultar último resultado", "aptosStatus")
    .addSeparator()
    .addItem("Desativar sincronização", "aptosDesativar")
    .addToUi();
}

function aptosPlanilhar() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet || spreadsheet.getId() !== APTOS_CONFIG.sheetId) {
    throw new Error("Planilha incorreta: execute na planilha oficial de ofertas da APTOS.");
  }
  var sheet = spreadsheet.getSheetByName(APTOS_CONFIG.tab);
  if (!sheet) throw new Error("A aba Optins não existe.");
  return sheet;
}

function aptosNormalizarTelefone(value) {
  var digits = String(value == null ? "" : value).replace(/\D/g, "");
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    digits = digits.slice(2);
  }
  return /^\d{10,11}$/.test(digits) ? digits : "";
}

function aptosTextoSeguro(value) {
  var text = String(value == null ? "" : value).slice(0, 500);
  return /^[=+\-@\t\r]/.test(text) ? "'" + text : text;
}

/**
 * Planeja apenas novos registros. Não modifica cadastros históricos.
 * A planilha pode conter o número com ou sem o código de país 55.
 */
function aptosPlanejar(existing, records) {
  var ids = new Set();
  var telefones = new Set();
  existing.forEach(function (row) {
    var id = String(row[0] == null ? "" : row[0]).trim();
    var phone = aptosNormalizarTelefone(row[1]);
    if (id) ids.add(id);
    if (phone) telefones.add(phone);
  });

  var rows = [];
  var duplicados = 0;
  var ignorados = 0;
  records.forEach(function (record) {
    var id = String(record.id == null ? "" : record.id).trim();
    var phone = aptosNormalizarTelefone(record.telefone);
    var date = String(record.created_at == null ? "" : record.created_at);
    if (!id || !phone || record.lgpd_aceite !== true ||
        !date || isNaN(Date.parse(date))) {
      ignorados++;
      return;
    }
    if (ids.has(id) || telefones.has(phone)) {
      duplicados++;
      return;
    }
    ids.add(id);
    telefones.add(phone);
    rows.push([
      date,
      id,
      phone,
      "autorizado",
      aptosTextoSeguro(record.campaign_source),
      "",
      aptosTextoSeguro(record.origem_url),
      "",
      "",
      date
    ]);
  });
  return { rows: rows, duplicados: duplicados, ignorados: ignorados };
}

function aptosLerRegistros(token) {
  var cursor = "";
  var seen = new Set();
  var all = [];
  for (var page = 0; page < APTOS_CONFIG.maxPages; page++) {
    var url = APTOS_CONFIG.api + "?limit=" + APTOS_CONFIG.pageSize +
      (cursor ? "&cursor=" + encodeURIComponent(cursor) : "");
    var response = UrlFetchApp.fetch(url, {
      method: "get",
      headers: { "X-Aptos-Admin-Token": token },
      muteHttpExceptions: true,
      followRedirects: false
    });
    var code = response.getResponseCode();
    if (code !== 200) {
      throw new Error("API de ofertas respondeu HTTP " + code + ". Confira a credencial.");
    }
    var payload;
    try { payload = JSON.parse(response.getContentText()); }
    catch (e) { throw new Error("A API de ofertas retornou um formato inválido."); }
    if (!Array.isArray(payload.records) || payload.records.length > APTOS_CONFIG.pageSize) {
      throw new Error("A consulta de ofertas retornou registros inválidos.");
    }
    Array.prototype.push.apply(all, payload.records);
    if (payload.hasMore !== true) return all;
    if (typeof payload.cursor !== "string" || !payload.cursor || seen.has(payload.cursor)) {
      throw new Error("Paginação de ofertas inválida.");
    }
    cursor = payload.cursor;
    seen.add(cursor);
  }
  throw new Error("Limite de páginas atingido; nenhum cadastro foi gravado.");
}

function aptosSincronizar() {
  var token = PropertiesService.getUserProperties().getProperty(APTOS_CONFIG.tokenProperty);
  if (!token) throw new Error("Sincronização não ativada; use o menu APTOS | Ofertas.");
  var lock = LockService.getDocumentLock();
  if (!lock || !lock.tryLock(25000)) throw new Error("Outra sincronização está em execução.");
  try {
    var sheet = aptosPlanilhar();
    var records = aptosLerRegistros(token);
    var existing = sheet.getLastRow() > 1
      ? sheet.getRange(2, 2, sheet.getLastRow() - 1, 2).getDisplayValues()
      : [];
    var plan = aptosPlanejar(existing, records);
    if (plan.rows.length) {
      var startRow = sheet.getLastRow() + 1;
      // Texto explícito para telefones, impedindo conversão para número/formula.
      sheet.getRange(startRow, 3, plan.rows.length, 1).setNumberFormat("@");
      sheet.getRange(startRow, 1, plan.rows.length, 10).setValues(plan.rows);
    }
    var result = {
      processed: records.length,
      added: plan.rows.length,
      existing: plan.duplicados,
      ignored: plan.ignorados,
      at: new Date().toISOString()
    };
    PropertiesService.getUserProperties().setProperty(APTOS_CONFIG.statusProperty, JSON.stringify(result));
    console.log("APTOS Ofertas: sincronização concluída; adicionados=" + result.added +
      ", existentes=" + result.existing + ", ignorados=" + result.ignored);
    return result;
  } finally {
    lock.releaseLock();
  }
}

function aptosAtivar() {
  var ui = SpreadsheetApp.getUi();
  aptosPlanilhar();
  var prompt = ui.prompt(
    "Sincronização APTOS — acesso privado",
    "Cole a credencial administrativa vigente do painel de Ofertas (Vercel). " +
    "Ela ficará nas propriedades do seu usuário do Apps Script, nunca em células. " +
    "Não envie a credencial por WhatsApp, e-mail ou chat.",
    ui.ButtonSet.OK_CANCEL
  );
  if (prompt.getSelectedButton() !== ui.Button.OK) return;
  var token = String(prompt.getResponseText() || "").trim();
  if (token.length < 32 || token.length > 256) {
    ui.alert("A credencial informada não parece válida. Nenhuma alteração foi feita.");
    return;
  }
  try {
    // Confirma a autenticação antes de criar gatilhos, evitando loops com chave inválida.
    aptosLerRegistros(token);
    var props = PropertiesService.getUserProperties();
    props.setProperty(APTOS_CONFIG.tokenProperty, token);
    ScriptApp.getProjectTriggers().forEach(function (trigger) {
      if (trigger.getHandlerFunction() === "aptosSincronizar") ScriptApp.deleteTrigger(trigger);
    });
    ScriptApp.newTrigger("aptosSincronizar").timeBased().everyMinutes(5).create();
    var result = aptosSincronizar();
    ui.alert("Ativado! APTOS sincronizará automaticamente a cada 5 minutos.\n" +
      "Nesta execução: " + result.added + " novo(s), " + result.existing +
      " já existente(s), " + result.ignored + " ignorado(s) por validação.");
  } catch (error) {
    ui.alert("Não foi possível ativar: " + (error instanceof Error ? error.message : "erro de conexão"));
  }
}

function aptosSincronizarAgora() {
  try {
    var r = aptosSincronizar();
    SpreadsheetApp.getUi().alert(
      "Sincronização concluída!\nAdicionados: " + r.added +
      "\nJá existentes: " + r.existing +
      "\nIgnorados: " + r.ignored
    );
  } catch (error) {
    SpreadsheetApp.getUi().alert(error instanceof Error ? error.message : "Erro na sincronização.");
  }
}

function aptosStatus() {
  var raw = PropertiesService.getUserProperties().getProperty(APTOS_CONFIG.statusProperty);
  var enabled = ScriptApp.getProjectTriggers().some(function (trigger) {
    return trigger.getHandlerFunction() === "aptosSincronizar";
  });
  var message = enabled ? "Gatilho automático: ativo (5 minutos)." : "Gatilho automático: desativado.";
  if (raw) {
    var result = JSON.parse(raw);
    message += "\nÚltima sincronização concluída: " + result.at +
      "\nAdicionados: " + result.added + "\nJá existentes: " + result.existing;
  }
  SpreadsheetApp.getUi().alert(message);
}

function aptosDesativar() {
  ScriptApp.getProjectTriggers().forEach(function (trigger) {
    if (trigger.getHandlerFunction() === "aptosSincronizar") ScriptApp.deleteTrigger(trigger);
  });
  PropertiesService.getUserProperties().deleteProperty(APTOS_CONFIG.tokenProperty);
  SpreadsheetApp.getUi().alert("Gatilho desativado e credencial local removida.");
}
