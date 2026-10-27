import { test, expect } from '@playwright/test';

test('SEO diagnostics page renders as noindex internal tooling', async ({ page }) => {
  const response = await page.goto('/diagnostico-seo');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Diagnóstico SEO/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Diagnóstico SEO & 404');
  await expect(page.getByText(/Dashboard interno de monitoramento/)).toBeVisible();
});
