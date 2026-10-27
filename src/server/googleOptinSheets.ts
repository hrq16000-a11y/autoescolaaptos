/// <reference types="node" />
import { createSign } from "node:crypto";

export type MarketingOptinForSheet = {
  id: string;
  telefone: string;
  created_at: string;
  campaign_source?: string | null;
  ultimo_template_enviado?: string | null;
  origem_url?: string | null;
  lgpd_aceite: boolean;
};

type GoogleCredentials = { client_email: string; private_key: string; token_uri?: string };
let cachedToken: { value: string; until: number } | undefined;
const SHEET_TAB = "Optins";
const TIMEOUT_MS = 8000;

function requiredConfiguration() {
  const raw = process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON;
  const sheetId = process.env.OFERTAS_SHEET_ID;
  if (!raw || !sheetId) throw new Error("GOOGLE_SHEETS_CONFIG_MISSING");
  let credentials: GoogleCredentials;
  try { credentials = JSON.parse(raw) as GoogleCredentials; }
  catch { throw new Error("GOOGLE_SHEETS_CREDENTIALS_INVALID"); }
  if (!credentials.client_email || !credentials.private_key || !/^[\w-]{20,}$/.test(sheetId)) {
    throw new Error("GOOGLE_SHEETS_CREDENTIALS_INVALID");
  }
  return { credentials, sheetId };
}

export function sheetsConfigured() {
  return Boolean(process.env.GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON && process.env.OFERTAS_SHEET_ID);
}

function base64url(value: string) { return Buffer.from(value).toString("base64url"); }
async function googleAccessToken(credentials: GoogleCredentials): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.until) return cachedToken.value;
  const now = Math.floor(Date.now() / 1000);
  const endpoint = credentials.token_uri || "https://oauth2.googleapis.com/token";
  if (endpoint !== "https://oauth2.googleapis.com/token") throw new Error("GOOGLE_OAUTH_ENDPOINT_INVALID");
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64url(JSON.stringify({
    iss: credentials.client_email, scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: endpoint, iat: now, exp: now + 3600,
  }));
  const body = header + "." + claims;
  const signature = createSign("RSA-SHA256").update(body).end().sign(credentials.private_key, "base64url");
  const assertion = body + "." + signature;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error("GOOGLE_OAUTH_FAILED_" + response.status);
  const data = await response.json() as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("GOOGLE_OAUTH_INVALID_RESPONSE");
  cachedToken = { value: data.access_token, until: Date.now() + Math.max(30, (data.expires_in || 3600) - 120) * 1000 };
  return data.access_token;
}

function normalizePhone(value: string) {
  let digits = String(value).replace(/\D/g, "");
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) digits = digits.slice(2);
  return digits;
}

function safeCell(value?: string | null) {
  const v = String(value || "").slice(0, 500);
  return /^[=+@\-\t\r]/.test(v) ? "'" + v : v;
}

async function sheetsRequest(sheetId: string, token: string, range: string, method: "GET" | "POST", body?: unknown) {
  const uri = "https://sheets.googleapis.com/v4/spreadsheets/" + encodeURIComponent(sheetId) +
    "/values/" + encodeURIComponent(range) +
    (method === "POST" ? ":append?valueInputOption=RAW&insertDataOption=INSERT_ROWS" : "?majorDimension=ROWS");
  const response = await fetch(uri, {
    method,
    headers: { Authorization: "Bearer " + token, ...(method === "POST" ? { "Content-Type": "application/json" } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!response.ok) throw new Error("GOOGLE_SHEETS_" + method + "_FAILED_" + response.status);
  return await response.json() as { values?: unknown[][]; updates?: { updatedRows?: number } };
}

export async function syncOptinsToSheets(records: MarketingOptinForSheet[]) {
  const { credentials, sheetId } = requiredConfiguration();
  const authorized = await googleAccessToken(credentials);
  const previous = await sheetsRequest(sheetId, authorized, SHEET_TAB + "!B2:C", "GET");
  const idSet = new Set<string>();
  const phoneSet = new Set<string>();
  for (const row of previous.values || []) {
    if (row[0]) idSet.add(String(row[0]).trim());
    if (row[1]) phoneSet.add(normalizePhone(String(row[1])));
  }
  const append: string[][] = [];
  let duplicates = 0;
  for (const r of records) {
    const digits = normalizePhone(r.telefone);
    if (!r.id || !r.lgpd_aceite || digits.length < 10 || digits.length > 11 ||
        !r.created_at || Number.isNaN(Date.parse(r.created_at))) {
      throw new Error("GOOGLE_SHEETS_OPTIN_INVALID");
    }
    if (idSet.has(r.id) || phoneSet.has(digits)) { duplicates++; continue; }
    idSet.add(r.id); phoneSet.add(digits);
    append.push([
      r.created_at, r.id, digits, "autorizado",
      safeCell(r.campaign_source), safeCell(r.ultimo_template_enviado),
      safeCell(r.origem_url), "", "", r.created_at,
    ]);
  }
  if (append.length) {
    const result = await sheetsRequest(sheetId, authorized, SHEET_TAB + "!A:J", "POST", { values: append });
    if (result.updates?.updatedRows !== append.length) throw new Error("GOOGLE_SHEETS_APPEND_UNCONFIRMED");
  }
  return { added: append.length, skipped: duplicates, examined: records.length };
}
