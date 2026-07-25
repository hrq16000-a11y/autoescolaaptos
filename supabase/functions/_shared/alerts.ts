// Envio simples de alertas por Slack Webhook e/ou e-mail (Resend via connector).
// Envs opcionais:
//   SLACK_ALERT_WEBHOOK_URL - Incoming Webhook do Slack
//   ALERT_EMAIL_TO          - destinatário do e-mail
//   ALERT_EMAIL_FROM        - remetente verificado no Resend (default: alerts@autoescolaaptos.com.br)
//   RESEND_API_KEY          - key da conexão Resend

const SLACK_URL = Deno.env.get("SLACK_ALERT_WEBHOOK_URL");
const EMAIL_TO = Deno.env.get("ALERT_EMAIL_TO");
const EMAIL_FROM = Deno.env.get("ALERT_EMAIL_FROM") || "Autoescola APTOS <alerts@autoescolaaptos.com.br>";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

export type AlertSeverity = "info" | "warning" | "critical";

export async function sendAlert(opts: {
  title: string;
  message: string;
  severity?: AlertSeverity;
  meta?: Record<string, unknown>;
}): Promise<{ slack: boolean; email: boolean; errors: string[] }> {
  const severity = opts.severity ?? "warning";
  const errors: string[] = [];
  let slack = false;
  let email = false;
  const emoji = severity === "critical" ? "🚨" : severity === "warning" ? "⚠️" : "ℹ️";

  // Slack
  if (SLACK_URL) {
    try {
      const r = await fetch(SLACK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: `${emoji} *${opts.title}*\n${opts.message}${
            opts.meta ? `\n\`\`\`${JSON.stringify(opts.meta, null, 2).slice(0, 1500)}\`\`\`` : ""
          }`,
        }),
      });
      slack = r.ok;
      if (!r.ok) errors.push(`slack:${r.status}`);
    } catch (e) {
      errors.push(`slack:${e instanceof Error ? e.message : String(e)}`);
    }
  }

  // E-mail via Resend (connector gateway)
  if (EMAIL_TO && LOVABLE_API_KEY && RESEND_API_KEY) {
    try {
      const r = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: EMAIL_FROM,
          to: [EMAIL_TO],
          subject: `${emoji} [APTOS] ${opts.title}`,
          html: `<div style="font-family:Arial,sans-serif">
            <h2 style="margin:0 0 12px">${opts.title}</h2>
            <p>${opts.message.replace(/\n/g, "<br/>")}</p>
            ${opts.meta ? `<pre style="background:#f4f4f5;padding:12px;border-radius:8px;font-size:12px">${escapeHtml(JSON.stringify(opts.meta, null, 2))}</pre>` : ""}
          </div>`,
        }),
      });
      email = r.ok;
      if (!r.ok) errors.push(`email:${r.status}`);
    } catch (e) {
      errors.push(`email:${e instanceof Error ? e.message : String(e)}`);
    }
  }

  return { slack, email, errors };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}

// Anti-flood: memória em processo (por instância). Chave -> última execução.
const lastFire = new Map<string, number>();
export function shouldFire(key: string, minIntervalMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const last = lastFire.get(key) ?? 0;
  if (now - last < minIntervalMs) return false;
  lastFire.set(key, now);
  return true;
}
