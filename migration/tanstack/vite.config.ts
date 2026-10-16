import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const local = (path: string) => fileURLToPath(new URL(path, import.meta.url));
// Vercel needs Nitro to generate serverless SSR routes; CI/local keep the tested
// fetch-based build used by check:ssr and the independent Node preview server.
const vercelPlugins = process.env.VERCEL === '1'
  ? [(await import('nitro/vite')).nitro({ preset: 'vercel' })]
  : [];
export default defineConfig({
  envDir: local('../../'),
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: '@/components/SEO', replacement: local('./src/legacy-seo.tsx') },
      { find: '@/lib/featureFlags', replacement: local('./src/pilot-feature-flags.ts') },
      { find: 'react-router-dom', replacement: local('./src/router-compat.tsx') },
      { find: '@', replacement: local('../../src') },
    ],
  },
  ssr: { noExternal: true },
  css: { postcss: local('./') },
  plugins: [tanstackStart(), ...vercelPlugins, react()],
});
