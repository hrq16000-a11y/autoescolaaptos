import { createHash } from "node:crypto";

type OptinPayload = {
  telefone?: unknown;
  campaign_source?: unknown;
  ultimo_template_enviado?: unknown;
  origem_url?: unknown;
  lgpd_aceite?: unknown;
};

type PersistedOptin = {
  event: "marketing_optin";
  id: string;
  created_at: string;
  telefone: string;
  campaign_source: string | null;
  ultimo_template_enviado: string | null;
  origem_url: string | null;
  lgpd_aceite: true;
  ip: string | null;
  user_agent: string | null;
};

const allowedOrigins = new Set([
  "https://autoescolaaptos.com.br",
  "https://www.autoescolaaptos.com.br",
  "https://autoescolaaptos.lovable.app",
]);

function text(value: unknown, max = 500) {
  if (value === null || value === undefined) return null;
  const result = String(value).trim();
  return result ? result.slice(0, max) : null;
}

function phone(value: unknown) {
  const digits = String(value ?? "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 13 ? digits : null;
}

function blobStoreId(token: string) {
  const configured = process.env.BLOB_STORE_ID?.trim().replace(/^store_/, "");
  if (configured) return configured;
  return token.split("_")[3] || "";
}

function blobPathname(telefone: string) {
  const key = createHash("sha256").update(telefone).digest("hex").slice(0, 32);
  return `marketing-optins/${key}.json`;
}

function clientIp(req: any) {
  const forwarded = req.headers["x-forwarded-for"];
  const value = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  return String(value || req.headers["x-real-ip"] || "").split(",")[0].trim() || null;
}

function responseBody(res: any, body: unknown, status: number, origin?: string) {
  res.statusCode = status;
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Vary", "Origin");
  }
  res.end(JSON.stringify(body));
}

async function persistInBlob(payload: PersistedOptin) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return { configured: false as const };

  const storeId = blobStoreId(token);
  if (!storeId) throw new Error("BLOB_READ_WRITE_TOKEN has no store id");

  const serialized = JSON.stringify(payload);
  const response = await fetch(
    `https://vercel.com/api/blob/?${new URLSearchParams({ pathname: blobPathname(payload.telefone) })}`,
    {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "x-vercel-blob-store-id": storeId,
        "x-api-version": "13",
        "x-content-type": "application/json",
        "x-vercel-blob-access": "private",
        "x-add-random-suffix": "0",
        "x-allow-overwrite": "0",
        "content-type": "application/json",
        "x-content-length": String(new TextEncoder().encode(serialized).byteLength),
      },
      body: serialized,
    },
  );

  const result = await response.json().catch(() => ({})) as {
    message?: string;
    error?: { message?: string };
  };

  if (response.status === 409 || response.status === 412) {
    return { configured: true as const, duplicate: true as const };
  }
  if (!response.ok) {
    throw new Error(result.error?.message || result.message || `Blob upload failed (${response.status})`);
  }

  return { configured: true as const, duplicate: false as const };
}

export default async function handler(req: any, res: any) {
  const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;

  if (req.method === "OPTIONS") {
    return responseBody(res, null, 204, origin);
  }
  if (req.method !== "POST") {
    return responseBody(res, { success: false, message: "Método não permitido." }, 405, origin);
  }
  if (origin && !allowedOrigins.has(origin)) {
    return responseBody(res, { success: false, message: "Origem não autorizada." }, 403);
  }

  const body = (req.body || {}) as OptinPayload;
  const telefone = phone(body.telefone);
  const lgpdAceite = body.lgpd_aceite === true || body.lgpd_aceite === "true";

  if (!telefone) {
    return responseBody(res, { success: false, message: "Informe um WhatsApp válido com DDD." }, 400, origin);
  }
  if (!lgpdAceite) {
    return responseBody(res, { success: false, message: "Consentimento obrigatório." }, 400, origin);
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not configured");
    return responseBody(res, { success: false, message: "Cadastro temporariamente indisponível." }, 503, origin);
  }

  const payload: PersistedOptin = {
    event: "marketing_optin",
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    telefone,
    campaign_source: text(body.campaign_source, 120),
    ultimo_template_enviado: text(body.ultimo_template_enviado, 120),
    origem_url: text(body.origem_url, 500) || (typeof req.headers.referer === "string" ? req.headers.referer : null),
    lgpd_aceite: true,
    ip: clientIp(req),
    user_agent: typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : null,
  };

  try {
    const result = await persistInBlob(payload);
    if (result.duplicate) {
      return responseBody(res, {
        success: false,
        duplicate: true,
        message: "Este número já está participando do Programa de Ofertas Exclusivas.",
      }, 200, origin);
    }
    return responseBody(res, {
      success: true,
      id: payload.id,
      message: "Cadastro realizado com sucesso.",
    }, 200, origin);
  } catch (error) {
    console.error("marketing_optin persistence error", error);
    return responseBody(res, { success: false, message: "Falha temporária. Tente novamente." }, 502, origin);
  }
}
