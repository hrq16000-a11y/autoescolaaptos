// Diagnóstico temporário: inspeciona a planilha de opt-ins (abas e últimas linhas).
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const GOOGLE_SHEETS_API_KEY = Deno.env.get("GOOGLE_SHEETS_API_KEY");
const SHEET_ID = Deno.env.get("OFERTAS_SHEET_ID");
const SHEET_TAB = Deno.env.get("OFERTAS_SHEET_TAB") || "Optins";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const h = {
    Authorization: `Bearer ${LOVABLE_API_KEY}`,
    "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY ?? "",
  };
  const out: Record<string, unknown> = {
    sheet_id_set: !!SHEET_ID,
    sheet_id: SHEET_ID,
    tab: SHEET_TAB,
    keys: { lovable: !!LOVABLE_API_KEY, connection: !!GOOGLE_SHEETS_API_KEY },
  };
  try {
    const metaR = await fetch(
      `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_ID}?fields=properties.title,sheets.properties`,
      { headers: h },
    );
    const metaT = await metaR.text();
    out.meta_status = metaR.status;
    try {
      const m = JSON.parse(metaT);
      out.title = m?.properties?.title;
      out.tabs = (m?.sheets ?? []).map((s: any) => ({
        title: s?.properties?.title,
        gid: s?.properties?.sheetId,
      }));
    } catch {
      out.meta_raw = metaT.slice(0, 500);
    }

    const valR = await fetch(
      `https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/${SHEET_ID}/values/${SHEET_TAB}!A1:J50`,
      { headers: h },
    );
    const valT = await valR.text();
    out.values_status = valR.status;
    try {
      const v = JSON.parse(valT);
      out.row_count = (v?.values ?? []).length;
      out.last_rows = (v?.values ?? []).slice(-3);
    } catch {
      out.values_raw = valT.slice(0, 500);
    }
  } catch (e) {
    out.error = e instanceof Error ? e.message : String(e);
  }
  return new Response(JSON.stringify(out, null, 2), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
