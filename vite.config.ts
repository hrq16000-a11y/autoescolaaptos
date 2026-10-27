import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // Keep Lovable integrations by default; standalone builds do not load its plugins.
  const standalone = process.env.APTOS_STANDALONE === "1";
  const plugins: PluginOption[] = [react()];
  if (!standalone) {
    if (mode === "development") {
      const { componentTagger } = await import("lovable-tagger");
      plugins.push(componentTagger());
    }
    const { mcpPlugin } = await import("@lovable.dev/mcp-js/stacks/supabase/vite");
    plugins.push(mcpPlugin());
  }
  return {
  server: {
    host: "::",
    port: 8080,
  },
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
