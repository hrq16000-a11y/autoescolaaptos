import { test, expect } from '@playwright/test';

test.describe('legacy redirect aliases', () => {
  for (const [source, target] of [
    ['/site', '/'],
    ['/modelo1', '/'],
    ['/1', '/'],
    ['/home', '/'],
    ['/contato', '/#contato'],
    ['/site/contato', '/#contato'],
  ] as const) {
    test(`redirects ${source} to ${target}`, async ({ page }) => {
      const response = await page.goto(source);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveURL(new RegExp(`${target.replace('/', '\\/').replace('#', '\\#')}$`));
    });
  }
});
