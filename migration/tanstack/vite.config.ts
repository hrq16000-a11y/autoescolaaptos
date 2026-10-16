import { defineConfig } from 'vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const local = (path: string) => fileURLToPath(new URL(path, import.meta.url));
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
  plugins: [tanstackStart(), react()],
});
