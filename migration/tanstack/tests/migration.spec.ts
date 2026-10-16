import { test, expect } from '@playwright/test';
test('home hydrates, opens funnel and navigates without a full reload', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /hydration|did not match|server HTML/i.test(message.text())) errors.push(message.text());
  });
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('CNH');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCSS('opacity', '1');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
  await page.locator('button[data-intent="funil"]').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.evaluate(() => Object.assign(window, { aptosDocumentMarker: 'preserved' }));
  await page.locator('a[href="/perguntas-frequentes"]').first().click();
  await expect(page).toHaveURL(/\/perguntas-frequentes$/);
  expect(await page.evaluate(() => (window as unknown as { aptosDocumentMarker?: string }).aptosDocumentMarker)).toBe('preserved');
  await expect(page).toHaveTitle('Perguntas Frequentes CNH | Autoescola APTOS');
  await page.getByRole('button', { name: 'Qual a idade mínima para tirar a primeira habilitação?' }).click();
  await expect(page.getByText('A idade mínima é 18 anos completos.', { exact: false }).first()).toBeVisible();
  expect(errors).toEqual([]);
});
