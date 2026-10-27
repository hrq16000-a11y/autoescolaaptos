import { test, expect } from '@playwright/test';

for (const scenario of [
  {
    path: '/promocao-indique-amigo',
    heading: 'Indique um Amigo',
    title: /Indique um Amigo e Ganhe/,
    cta: /Quero indicar um amigo/,
  },
  {
    path: '/promocao-aniversario',
    heading: 'Promoção de Aniversário',
    title: /Promoção de Aniversário/,
    cta: /Quero minha aula grátis/,
  },
]) {
  test(`campaign page ${scenario.path} renders without staging writes`, async ({ page }) => {
    const writes: string[] = [];
    page.on('request', request => {
      if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.url());
    });
    const response = await page.goto(scenario.path + '?utm_source=staging');
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(scenario.title);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(scenario.heading);
    await expect(page.getByRole('link', { name: scenario.cta })).toHaveAttribute('href', /api\.whatsapp\.com\/send\?phone=5541991453627/);
    expect(writes).toEqual([]);
  });
}

test('home campaign cards stay on the TanStack staging router', async ({ page }) => {
  const externalNavigations: string[] = [];
  page.on('request', request => {
    if (request.isNavigationRequest() && request.url().startsWith('https://autoescolaaptos.com.br/')) {
      externalNavigations.push(request.url());
    }
  });
  await page.goto('/');
  await page.locator('img[alt="Promoção de Aniversário - Autoescola APTOS"]').click({ force: true });
  await expect(page).toHaveURL(/\/promocao-aniversario$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Promoção de Aniversário');
  await page.goto('/');
  await page.locator('img[alt="Programa Indique e Ganhe - Autoescola APTOS"]').click({ force: true });
  await expect(page).toHaveURL(/\/promocao-indique-amigo$/);
  expect(externalNavigations).toEqual([]);
});
