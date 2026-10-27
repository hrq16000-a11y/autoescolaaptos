import { test, expect } from '@playwright/test';

for (const category of ['a', 'b', 'ab'] as const) {
  test('categoria ' + category.toUpperCase() + ' preserva conteúdo e orçamento', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto('/categoria-' + category);
    expect(response?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Categoria ' + category.toUpperCase());
    const link = page.getByRole('link', { name: 'Quero saber valores' });
    await expect(link).toHaveAttribute('href', '/orcamento');
    await link.click();
    await expect(page).toHaveURL(/\/orcamento$/);
    expect(errors).toEqual([]);
  });
}
