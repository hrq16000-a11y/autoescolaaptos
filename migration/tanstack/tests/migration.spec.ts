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
  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth, width: document.documentElement.scrollWidth,
    elements: [...document.querySelectorAll('body *')].filter(el => el.getBoundingClientRect().right > window.innerWidth + 1).slice(0, 12).map(el => ({ tag: el.tagName, className: String(el.className), right: el.getBoundingClientRect().right })),
  }));
  expect(overflow.width, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport + 1);
  // Evidência visual do layout SSR/hidratado; nunca envia formulários ou mensagens.
  await test.info().attach('aptos-home-viewport', {
    body: await page.screenshot({ animations: 'disabled' }),
    contentType: 'image/png',
  });
  await page.locator('button[data-intent="funil"]').first().click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await page.evaluate(() => Object.assign(window, { aptosDocumentMarker: 'preserved' }));
  const menu = page.getByRole('button', { name: 'Toggle menu' });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole('link', { name: 'FAQ', exact: true }).click();
  await expect(page).toHaveURL(/\/perguntas-frequentes$/);
  expect(await page.evaluate(() => (window as unknown as { aptosDocumentMarker?: string }).aptosDocumentMarker)).toBe('preserved');
  await expect(page).toHaveTitle('Perguntas Frequentes CNH | Autoescola APTOS');
  await page.getByRole('button', { name: 'Qual a idade mínima para tirar a primeira habilitação?' }).click();
  await expect(page.getByText('A idade mínima é 18 anos completos.', { exact: false }).first()).toBeVisible();
  expect(errors).toEqual([]);
});

test('blog and neighborhood routes render and navigate', async ({ page }) => {
 const errors: string[] = [];
 page.on('pageerror', error => errors.push(error.message));
 await page.goto('/blog');
 await expect(page.getByRole('heading', { level: 1 })).toContainText('Blog');
 await test.info().attach('aptos-blog-viewport', {
   body: await page.screenshot({ animations: 'disabled' }),
   contentType: 'image/png',
 });
 await page.locator('a[href="/blog/o-que-e-direcao-defensiva"]').first().click();
 await expect(page).toHaveURL(/\/blog\/o-que-e-direcao-defensiva$/);
 await expect(page.getByRole('heading', { level: 1 })).toContainText('Direção Defensiva');
 await page.goto('/bairros/centro');
 await expect(page.getByRole('heading', { level: 1 })).toContainText('Centro');
 await test.info().attach('aptos-bairro-centro-viewport', {
   body: await page.screenshot({ animations: 'disabled' }),
   contentType: 'image/png',
 });
 const missing = await page.goto('/bairros/nao-existe');
 expect(missing?.status()).toBe(404);
 expect(errors).toEqual([]);
});
