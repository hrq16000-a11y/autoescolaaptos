import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listLeadsTool from "./tools/list-leads";
import getLeadTool from "./tools/get-lead";
import updateLeadStatusTool from "./tools/update-lead-status";

// Direct Supabase host is required for the OAuth issuer (see app-mcp-server-authoring):
// SUPABASE_URL on Lovable Cloud is a `.lovable.cloud` proxy that mcp-js rejects.
const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "aptos-autoescola-mcp",
  title: "Autoescola APTOS",
  version: "0.1.0",
  instructions:
    "Ferramentas para consultar e gerenciar leads da triagem (/1contato) da Autoescola APTOS. Requer login como administrador.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listLeadsTool, getLeadTool, updateLeadStatusTool],
});
