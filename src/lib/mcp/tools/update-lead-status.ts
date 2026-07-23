import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";
import { z } from "zod";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "update_lead_status",
  title: "Atualizar status do lead",
  description:
    "Atualiza o status do funil de um lead (new, contacted, booked, won, lost). Requer admin.",
  inputSchema: {
    id: z.string().uuid(),
    status_funil: z.enum(["new", "contacted", "booked", "won", "lost"]),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true },
  handler: async ({ id, status_funil }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Não autenticado." }], isError: true };
    }
    const { data, error } = await supabaseForUser(ctx)
      .from("triagem_leads")
      .update({ status_funil, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select("id, status_funil")
      .maybeSingle();
    if (error) return { content: [{ type: "text", text: error.message }], isError: true };
    if (!data) return { content: [{ type: "text", text: "Lead não encontrado ou sem permissão." }], isError: true };
    return {
      content: [{ type: "text", text: `Lead ${data.id} atualizado para ${data.status_funil}.` }],
      structuredContent: { lead: data },
    };
  },
});
