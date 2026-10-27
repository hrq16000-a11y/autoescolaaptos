import { test, expect } from '@playwright/test';

test('preview de ofertas não envia cadastros nem confirma gravação', async ({ page }) => {
  const external: string[] = [];
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', async route => {
    const req = route.request();
    const url = new URL(req.url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    if (req.method() !== 'GET' || url.hostname.endsWith('supabase.co')) external.push(url.hostname);
    return route.abort();
  });
  const response = await page.goto('/preview-ofertas?campanha=teste');
  expect(response?.status()).toBe(200);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
  await expect(page.getByRole('status')).toContainText('nenhum cadastro');
  await page.locator('#telefone').fill('00000000000');
  const submit = page.getByRole('button', { name: 'Quero participar' });
  await expect(submit).toBeDisabled();
  await page.getByRole('checkbox').check();
  await submit.click();
  await expect(page.getByRole('alert')).toContainText('Não foi possível confirmar');
  await expect(page.getByText('Cadastro realizado com sucesso!')).toHaveCount(0);
  await expect(page.getByRole('link', { name: 'Solicitar participação pelo WhatsApp' })).toBeVisible();
  expect(external).toEqual([]);
  expect(errors).toEqual([]);
  const blocked = await page.goto('/ofertas');
  expect(blocked?.status()).toBe(404);
});
