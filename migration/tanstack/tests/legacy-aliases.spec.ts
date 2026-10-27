import { test, expect } from '@playwright/test';

test.describe('legacy public aliases', () => {
  test('keeps category alias on the migrated route', async ({ page }) => {
    const response = await page.goto('/mudanca-de-categoria');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveURL(/\/inclusao-categoria$/);
  });

  for (const [source, target] of [
    ['/habilitacao-pcd', '/pcd'],
    ['/autoescola-pcd', '/pcd'],
  ] as const) {
    test(`redirects ${source} to ${target}`, async ({ page }) => {
      const response = await page.goto(source);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(new RegExp(`${target}$`));
    });
  }
});
