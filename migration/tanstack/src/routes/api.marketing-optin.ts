import { createHash } from 'node:crypto';
import { createFileRoute } from '@tanstack/react-router';

type OptinPayload = {
  telefone?: unknown;
  campaign_source?: unknown;
  ultimo_template_enviado?: unknown;
  origem_url?: unknown;
  lgpd_aceite?: unknown;
};

type PersistedOptin = {
  event: 'marketing_optin';
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

const jsonHeaders = {
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function text(value: unknown, max = 500) {
  if (value === null || value === undefined) return null;
  const result = String(value).trim();
  return result ? result.slice(0, max) : null;
}

function phone(value: unknown) {
  const digits = String(value ?? '').replace(/\\D/g, '');
  return digits.length >= 10 && digits.length <= 13 ? digits : null;
}

function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || null;
}

function blobStoreId(token: string) {
  const configured = process.env.BLOB_STORE_ID?.trim().replace(/^store_/, '');
  if (configured) return configured;
  return token.split('_')[3] || '';
}

function blobPathname(telefone: string) {
  const key = createHash('sha256').update(telefone).digest('hex').slice(0, 32);
  return `marketing-optins/${key}.json`;
}

async function persistInBlob(payload: PersistedOptin) {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) return { configured: false as const };

  const storeId = blobStoreId(token);
  if (!storeId) throw new Error('BLOB_READ_WRITE_TOKEN has no store id');

  const serialized = JSON.stringify(payload);
  const response = await fetch(
    `https://vercel.com/api/blob/?${new URLSearchParams({ pathname: blobPathname(payload.telefone) })}`,
    {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        'x-vercel-blob-store-id': storeId,
        'x-api-version': '13',
        'x-content-type': 'application/json',
        'x-vercel-blob-access': 'private',
        'x-add-random-suffix': '0',
        'x-allow-overwrite': '0',
        'content-type': 'application/json',
        'x-content-length': String(new TextEncoder().encode(serialized).byteLength),
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

export const Route = createFileRoute('/api/marketing-optin')({
  server: {
    handlers: {
      GET: () => json({ success: false, message: 'Método não permitido.' }, 405),
      OPTIONS: () => new Response(null, { status: 204, headers: jsonHeaders }),
      POST: async ({ request }) => {
        let body: OptinPayload;
        try {
          body = await request.json();
        } catch {
          return json({ success: false, message: 'Payload inválido.' }, 400);
        }

        const telefone = phone(body.telefone);
        const lgpdAceite = body.lgpd_aceite === true || body.lgpd_aceite === 'true';

        if (!telefone) {
          return json({ success: false, message: 'Informe um WhatsApp válido com DDD.' }, 400);
        }
        if (!lgpdAceite) {
          return json({ success: false, message: 'Consentimento obrigatório.' }, 400);
        }

        const webhookUrl = process.env.MARKETING_OPTIN_WEBHOOK_URL;
        const hasBlobStorage = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
        if (!webhookUrl && !hasBlobStorage) {
          console.error('No marketing opt-in persistence target is configured');
          return json({ success: false, message: 'Cadastro temporariamente indisponível.' }, 503);
        }

        const payload: PersistedOptin = {
          event: 'marketing_optin',
          id: crypto.randomUUID(),
          created_at: new Date().toISOString(),
          telefone,
          campaign_source: text(body.campaign_source, 120),
          ultimo_template_enviado: text(body.ultimo_template_enviado, 120),
          origem_url: text(body.origem_url, 500) ?? request.headers.get('referer'),
          lgpd_aceite: true,
          ip: clientIp(request),
          user_agent: request.headers.get('user-agent'),
        };

        try {
          if (webhookUrl) {
            const headers: Record<string, string> = {
              'Content-Type': 'application/json',
              'X-Aptos-Event': 'marketing_optin',
            };
            const webhookSecret = process.env.MARKETING_OPTIN_WEBHOOK_SECRET;
            if (webhookSecret) headers['X-Aptos-Webhook-Secret'] = webhookSecret;

            const response = await fetch(webhookUrl, {
              method: 'POST',
              headers,
              body: JSON.stringify(payload),
            });
            const result = await response.json().catch(() => ({})) as {
              duplicate?: boolean;
              message?: string;
              id?: string;
            };

            if (result.duplicate) {
              return json({
                success: false,
                duplicate: true,
                message: result.message || 'Este número já está participando do Programa de Ofertas Exclusivas.',
              });
            }

            if (!response.ok || result.id !== payload.id) {
              console.error('marketing_optin webhook failed', response.status, result);
              return json({ success: false, message: 'Falha temporária. Tente novamente.' }, 502);
            }
          } else {
            const result = await persistInBlob(payload);
            if (result.duplicate) {
              return json({
                success: false,
                duplicate: true,
                message: 'Este número já está participando do Programa de Ofertas Exclusivas.',
              });
            }
          }

          return json({
            success: true,
            id: payload.id,
            message: 'Cadastro realizado com sucesso.',
          });
        } catch (error) {
          console.error('marketing_optin persistence error', error);
          return json({ success: false, message: 'Falha temporária. Tente novamente.' }, 502);
        }
      },
    },
  },
});
