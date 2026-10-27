import { createHash, timingSafeEqual } from "node:crypto";

// Rota administrativa somente leitura. Não expor tokens, IPs nem URLs privadas.
const origins = new Set([
  "https://autoescolaaptos.com.br",
  "https://www.autoescolaaptos.com.br",
  "https://autoescolaaptos.lovable.app",
]);
const prefix = "marketing-optins/";
const MAX_PAGE = 40;

function respond(res: any, status: number, body: unknown, origin?: string) {
  res.statusCode = status;
  res.setHeader("Cache-Control", "private, no-store, max-age=0");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "no-referrer");
  if (origin && origins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Headers", "X-Aptos-Admin-Token");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Vary", "Origin");
  }
  return res.end(JSON.stringify(body));
}

function authorized(provided: unknown, expected: string) {
  if (typeof provided !== "string" || !expected || expected.length < 32 || provided.length > 256) return false;
  const a = createHash("sha256").update(provided).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

function storeIdFromToken(token: string) {
  const storeId = process.env.BLOB_STORE_ID?.replace(/^store_/, "") || token.split("_")[3];
  if (!storeId || !/^[a-zA-Z0-9-]+$/.test(storeId)) throw new Error("Blob store identifier is invalid");
  return storeId;
}

async function getBlobRecord(pathname: string, storeId: string, token: string) {
  if (!pathname.startsWith(prefix) || !/^marketing-optins\/[a-f0-9]{32}\.json$/.test(pathname)) {
    throw new Error("Unexpected blob pathname");
  }
  const response = await fetch(
    `https://${storeId}.private.blob.vercel-storage.com/${pathname}`,
    { headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(8000) },
  );
  if (!response.ok) throw new Error("Unable to read private blob");
  const length = Number(response.headers.get("content-length") || "0");
  if (length > 16_384) throw new Error("Unexpected blob size");
  const raw = await response.text();
  if (raw.length > 16_384) throw new Error("Unexpected blob size");
  const record = JSON.parse(raw) as Record<string, unknown>;
  if (record.event !== "marketing_optin" ||
    typeof record.telefone !== "string" ||
    !/^[0-9]{10,13}$/.test(record.telefone) ||
    typeof record.id !== "string" ||
    typeof record.created_at !== "string") {
    throw new Error("Invalid opt-in record");
  }
  return {
    id: record.id,
    telefone: record.telefone,
    created_at: record.created_at,
    campaign_source: typeof record.campaign_source === "string" ? record.campaign_source.slice(0, 120) : null,
    lgpd_aceite: record.lgpd_aceite === true,
  };
}

async function listOptins(token: string, storeId: string, cursor: string | null, limit: number) {
  const params = new URLSearchParams({ prefix, limit: String(limit) });
  if (cursor) params.set("cursor", cursor);
  const response = await fetch(`https://vercel.com/api/blob/?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "x-vercel-blob-store-id": storeId,
      "x-api-version": "13",
    },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new Error("Unable to list private blobs");
  const data = await response.json() as {
    blobs?: Array<{ pathname?: string }>;
    cursor?: string;
    hasMore?: boolean;
  };
  if (!Array.isArray(data.blobs) || data.blobs.length > limit) throw new Error("Invalid Blob listing");
  const rows = [];
  for (let i = 0; i < data.blobs.length; i += 5) {
    const batch = data.blobs.slice(i, i + 5);
    const read = await Promise.all(batch.map(b =>
      getBlobRecord(String(b.pathname || ""), storeId, token)));
    rows.push(...read);
  }
  return {
    records: rows,
    hasMore: data.hasMore === true,
    cursor: data.hasMore === true && typeof data.cursor === "string" ? data.cursor : null,
  };
}

export default async function handler(req: any, res: any) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;
  if (origin && !origins.has(origin)) return respond(res, 403, { message: "Origem não autorizada." });
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.setHeader("Cache-Control", "no-store");
    if (origin) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Access-Control-Allow-Headers", "X-Aptos-Admin-Token");
      res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
      res.setHeader("Vary", "Origin");
    }
    return res.end();
  }
  if (req.method !== "GET") return respond(res, 405, { message: "Método não permitido." }, origin);
  const secret = process.env.APTOS_OFFERS_ADMIN_TOKEN || "";
  if (!secret || secret.length < 32) return respond(res, 503, { message: "Painel ainda não configurado." }, origin);
  if (!authorized(req.headers["x-aptos-admin-token"], secret)) {
    return respond(res, 401, { message: "Credencial administrativa inválida." }, origin);
  }

  const rwToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!rwToken) return respond(res, 503, { message: "Armazenamento não configurado." }, origin);
  const cursor = typeof req.query?.cursor === "string" ? req.query.cursor : null;
  if (cursor && cursor.length > 2048) return respond(res, 400, { message: "Cursor inválido." }, origin);
  const limitRaw = typeof req.query?.limit === "string" ? Number(req.query.limit) : 30;
  if (!Number.isSafeInteger(limitRaw) || limitRaw < 1 || limitRaw > MAX_PAGE) {
    return respond(res, 400, { message: "Limite inválido." }, origin);
  }
  try {
    const data = await listOptins(rwToken, storeIdFromToken(rwToken), cursor, limitRaw);
    return respond(res, 200, data, origin);
  } catch (error) {
    console.error("private marketing opt-ins read failed", error instanceof Error ? error.name : "unknown");
    return respond(res, 502, { message: "Não foi possível consultar os cadastros. Tente novamente." }, origin);
  }
}
