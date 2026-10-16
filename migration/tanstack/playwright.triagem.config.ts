import { defineConfig, devices } from '@playwright/test';
import { fileURLToPath } from 'node:url';

// Vite production build of the legacy triage, with every external HTTP call
// intercepted by the test. The TanStack SSR pilot uses a separate config.
const root = fileURLToPath(new URL('../../', import.meta.url));
export default defineConfig({
  testDir: './tests/legacy-triagem',
  fullyParallel: false,
  workers: 1,
  retries: process.env.CI ? 1 : 0,
  timeout: 60000,
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report-triagem' }]],
  outputDir: 'test-results-triagem',
  use: {
    baseURL: 'http://127.0.0.1:4178',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['iPhone 13'], defaultBrowserType: 'chromium' } },
  ],
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4178 --strictPort',
    cwd: root,
    url: 'http://127.0.0.1:4178',
    reuseExistingServer: false,
    timeout: 60000,
  },
});
