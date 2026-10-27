import { test, expect } from '@playwright/test';

test('DETRAN simulator renders and starts locally without writes', async ({ page }) => {
  const writes: string[] = [];
  const errors: string[] = [];
  page.on('request', request => {
    if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url());
  });
  page.on('pageerror', error => errors.push(error.message));
  const response = await page.goto('/simulado-detran-pr');
  expect(response?.status()).toBe(200);
  await expect(page).toHaveTitle(/Simulado DETRAN PR 2026/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Simulado DETRAN PR 2026');
  await page.getByRole('button', { name: 'Iniciar Simulado Agora' }).click();
  await expect(page.getByText(/Questão 1 de 30/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Confirmar resposta' })).toBeDisabled();
  expect(writes).toEqual([]);
  expect(errors).toEqual([]);
});
