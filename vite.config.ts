import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";


/**
 * Entrega metadados da campanha no HTML inicial, inclusive para bots que não
 * executam JavaScript. O React continua controlando a navegação e o funil.
 */
function motoSeoStaticPlugin(): PluginOption {
  return {
    name: "aptos-moto-campaign-static-seo",
    apply: "build",
    closeBundle() {
      const root = path.resolve(__dirname, "dist");
      const index = readFileSync(path.join(root, "index.html"), "utf8");
      const source = readFileSync(path.resolve(__dirname, "src/pages/InclusaoCategoriaA.tsx"), "utf8");
      const seoTag = source.match(/<SEO\b([\s\S]*?)\/>/)?.[1];
      if (!seoTag) throw new Error("Campanha /inclusao-moto: <SEO> não encontrado.");
      const get = (key: string) => {
        const value = seoTag.match(new RegExp("\\b" + key + '="([^"]+)"'))?.[1];
        if (!value) throw new Error("Campanha /inclusao-moto: SEO." + key + " ausente.");
        return value;
      };
      const escapeHtml = (value: string) => value
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
      const title = get("title");
      const description = get("description");
      const image = get("image");
      const canonical = "https://autoescolaaptos.com.br/inclusao-moto";
      const replacements: Array<[RegExp, string]> = [
        [/<title>[\s\S]*?<\/title>/i, "<title>" + escapeHtml(title) + "</title>"],
        [/<meta\b(?=[^>]*\bname=["']description["'])[^>]*>/i, '<meta data-react-helmet="true" name="description" content="' + escapeHtml(description) + '" />'],
        [/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i, '<link data-react-helmet="true" rel="canonical" href="' + canonical + '" />'],
        [/<meta\b(?=[^>]*\bproperty=["']og:title["'])[^>]*>/i, '<meta data-react-helmet="true" property="og:title" content="' + escapeHtml(title) + '" />'],
        [/<meta\b(?=[^>]*\bproperty=["']og:description["'])[^>]*>/i, '<meta data-react-helmet="true" property="og:description" content="' + escapeHtml(description) + '" />'],
        [/<meta\b(?=[^>]*\bproperty=["']og:url["'])[^>]*>/i, '<meta data-react-helmet="true" property="og:url" content="' + canonical + '" />'],
        [/<meta\b(?=[^>]*\bproperty=["']og:image["'])[^>]*>/i, '<meta data-react-helmet="true" property="og:image" content="' + escapeHtml(image) + '" />'],
        [/<meta\b(?=[^>]*\bname=["']twitter:title["'])[^>]*>/i, '<meta data-react-helmet="true" name="twitter:title" content="' + escapeHtml(title) + '" />'],
        [/<meta\b(?=[^>]*\bname=["']twitter:description["'])[^>]*>/i, '<meta data-react-helmet="true" name="twitter:description" content="' + escapeHtml(description) + '" />'],
        [/<meta\b(?=[^>]*\bname=["']twitter:image["'])[^>]*>/i, '<meta data-react-helmet="true" name="twitter:image" content="' + escapeHtml(image) + '" />'],
      ];
      let output = index;
      for (const [find, replacement] of replacements) {
        if (!find.test(output)) throw new Error("Campanha /inclusao-moto: tag obrigatória não encontrada: " + find);
        output = output.replace(find, replacement);
      }
      const service = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Inclusão de categoria A (moto) — Autoescola APTOS",
        description,
        url: canonical,
        provider: { "@id": "https://autoescolaaptos.com.br/#business" },
        areaServed: { "@type": "City", name: "São José dos Pinhais" },
      };
      const structuredData = JSON.stringify(service).replace(/</g, "\\u003c");
      output = output.replace("</head>", '<script type="application/ld+json">' + structuredData + '</script>\n  </head>');
      const folder = path.join(root, "inclusao-moto");
      mkdirSync(folder, { recursive: true });
      writeFileSync(path.join(folder, "index.html"), output, "utf8");
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  // Keep Lovable integrations by default; standalone builds do not load its plugins.
  const standalone = process.env.APTOS_STANDALONE === "1";
  const plugins: PluginOption[] = [react(), motoSeoStaticPlugin()];
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
