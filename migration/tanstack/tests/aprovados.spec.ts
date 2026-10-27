import { test, expect } from '@playwright/test';

test('approved students page renders and filters without writes', async ({ page }) => {
  const writes: string[] = [];
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url());
  });
  const response = await page.goto('/aprovados');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Aprovados na Autoescola APTOS/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Nossos Aprovados');
  await expect(page.getByText('Categoria A', { exact: false }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Categoria A', exact: true }).click();
  await expect(page.getByText('Diego R.', { exact: true })).toBeVisible();
  await expect(page.getByText('Bruna L.', { exact: true })).toHaveCount(0);
  expect(writes).toEqual([]);
});
