import { test, expect } from '@playwright/test';
test('página local e alias preservam navegação para orçamento', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const path of ['/autoescola-sao-jose-dos-pinhais', '/cnh-sao-jose-dos-pinhais']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('São José dos Pinhais');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://autoescolaaptos.com.br/autoescola-sao-jose-dos-pinhais');
    const links = page.getByRole('link', { name: /Simular meu Orçamento/ });
    expect(await links.count()).toBeGreaterThan(0);
    for (const link of await links.all()) await expect(link).toHaveAttribute('href', '/orcamento');
  }
  expect(errors).toEqual([]);
});
