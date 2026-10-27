import { createHash, timingSafeEqual } from "node:crypto";
import { listOptins } from "./admin-marketing-optins";
import { sheetsConfigured, syncOptinsToSheets } from "../src/server/googleOptinSheets";

function respond(res: any, code: number, body: unknown) {
  res.statusCode = code;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function authorized(provided: unknown, expected: string) {
  if (typeof provided !== "string" || !expected || expected.length < 32) return false;
  return timingSafeEqual(
    createHash("sha256").update(provided).digest(),
    createHash("sha256").update(expected).digest(),
  );
}

// Private Vercel cron, one daily safety pass for any failed realtime sync.
// The frontend must never call this route.
export default async function handler(req: any, res: any) {
  if (req.method !== "GET") return respond(res, 405, { ok: false });
  const expected = process.env.CRON_SECRET || "";
  const bearer = typeof req.headers.authorization === "string" ? req.headers.authorization : "";
  if (!authorized(bearer.startsWith("Bearer ") ? bearer.slice(7) : "", expected)) {
    return respond(res, 401, { ok: false });
  }
  const blobToken = process.env.BLOB_READ_WRITE_TOKEN;
  if (!sheetsConfigured() || !blobToken) {
    return respond(res, 503, { ok: false, reason: "sync_not_configured" });
  }
  const storeId = process.env.BLOB_STORE_ID?.replace(/^store_/, "") || blobToken.split("_")[3];
  if (!storeId) return respond(res, 503, { ok: false, reason: "store_not_configured" });
  try {
    let cursor: string | null = null;
    let hasMore = false;
    const records: Array<{
      id: string; telefone: string; created_at: string;
      campaign_source: string | null; lgpd_aceite: boolean;
    }> = [];
    for (let page = 0; page < 10; page++) {
      const batch = await listOptins(blobToken, storeId, cursor, 40);
      records.push(...batch.records);
      hasMore = batch.hasMore;
      cursor = batch.cursor;
      if (!hasMore) break;
      if (!cursor) throw new Error("BLOB_PAGINATION_INVALID");
    }
    // Prevent silently claiming full synchronization if we could not read all pages.
    if (hasMore) throw new Error("BLOB_RECONCILIATION_PAGE_LIMIT");
    const result = await syncOptinsToSheets(records);
    return respond(res, 200, { ok: true, ...result });
  } catch (e) {
    // Deliberately omit record contents and secrets from logs and response.
    console.error("marketing sheet reconciliation failed", e instanceof Error ? e.name : "unknown");
    return respond(res, 502, { ok: false, reason: "reconciliation_failed" });
  }
}
