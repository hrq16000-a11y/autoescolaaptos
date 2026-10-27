// Resumo + sugestão de resposta de lead via Lovable AI Gateway (Responses API, streaming).
import { createOpenAI } from "npm:@ai-sdk/openai";
import { streamText } from "npm:ai";
import type { SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.45.4";

const RUN_ID = "X-Lovable-AIG-Run-ID";

const FIELDS = ["nome", "servico", "categoria", "situacao", "experiencia", "conhece_procedimento", "prazo", "data_inicio", "device", "origem", "utm_source", "utm_campaign"];

export async function summarizeLead(admin: SupabaseClient, id: string) {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return { ok: false, error: "LOVABLE_API_KEY ausente" };
  const { data: lead, error } = await admin.from("triagem_leads").select("*").eq("id", id).maybeSingle();
  if (error || !lead) return { ok: false, error: error?.message || "lead não encontrado" };

  const info = FIELDS.filter((k) => lead[k]).map((k) => `${k}: ${lead[k]}`).join("\n");
  let runId: string | undefined;
  const provider = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
    fetch: async (input: RequestInfo | URL, init?: RequestInit) => {
      const headers = new Headers(init?.headers);
      if (runId) headers.set(RUN_ID, runId);
      const res = await fetch(input, { ...init, headers });
      runId ??= res.headers.get(RUN_ID) ?? undefined;
      return res;
    },
  });

  try {
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system:
        "Você é atendente comercial da Autoescola APTOS em São José dos Pinhais (PR). Nunca mencione Curitiba, preços ou prazos não informados. Responda exatamente no formato:\nRESUMO: <2 frases objetivas sobre o perfil e a intenção do lead>\nRESPOSTA: <mensagem curta e cordial de WhatsApp, em português, chamando o lead pelo primeiro nome e propondo o próximo passo>",
      messages: [{ role: "user", content: `Dados do lead:\n${info}` }],
      providerOptions: {
        openai: { forceReasoning: true, reasoningEffort: "low", reasoningSummary: "auto", store: false, include: ["reasoning.encrypted_content"] },
      },
    });
    const text = (await result.text).trim();
    const summary = text.match(/RESUMO:\s*([\s\S]*?)(?:\n\s*RESPOSTA:|$)/i)?.[1]?.trim() || text;
    const reply = text.match(/RESPOSTA:\s*([\s\S]*)$/i)?.[1]?.trim() || null;
    await admin.from("triagem_leads").update({ ai_summary: summary, ai_reply: reply, ai_status: "done", ai_updated_at: new Date().toISOString() }).eq("id", id);
    return { ok: true, summary, reply };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("lead ai failed:", msg);
    await admin.from("triagem_leads").update({ ai_status: "error", ai_updated_at: new Date().toISOString() }).eq("id", id);
    return { ok: false, error: msg };
  }
}
