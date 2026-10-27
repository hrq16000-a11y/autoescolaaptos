import { test, expect } from '@playwright/test';

test('ofertas mantém consentimento e oferece contato apenas após falha', async ({ page }) => {
  let outcome: 'error' | 'duplicate' | 'missing' | 'success' = 'error';
  let calls = 0;
  const whatsappVisits: string[] = [];
  await page.route('**/*', async route => {
    const req = route.request();
    if (req.url().startsWith('http://127.0.0.1:4178/')) return route.continue();
    if (req.url().startsWith('https://api.whatsapp.com/send?')) {
      whatsappVisits.push(req.url());
      return route.fulfill({ status: 200, contentType: 'text/html', body: 'WhatsApp simulado - sem envio real' });
    }
    if (/(?:\/functions\/v1|\/api)\/marketing-optin(?:\?|$)/.test(req.url())) {
      const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Content-Type': 'application/json' };
      if (req.method() === 'OPTIONS') return route.fulfill({ status: 200, headers, body: '{}' });
      calls++;
      expect(req.postDataJSON().lgpd_aceite).toBe(true);
      const body = outcome === 'error' ? { message: 'Falha temporária' } : outcome === 'duplicate'
        ? { success: false, duplicate: true, message: 'Este número já está participando do Programa de Ofertas Exclusivas.' }
        : outcome === 'missing' ? { success: true } : { success: true, id: 'ficticio' };
      return route.fulfill({ status: outcome === 'error' ? 500 : 200, headers, body: JSON.stringify(body) });
    }
    return route.abort();
  });
  await page.goto('/ofertas');
  await page.locator('#telefone').fill('00000000000');
  const submit = page.getByRole('button', { name: 'Quero participar' });
  await expect(submit).toBeDisabled();
  await page.getByRole('checkbox').check();
  await submit.click();
  const fallback = page.getByRole('link', { name: 'Continuar pelo WhatsApp' });
  await expect(fallback).toBeVisible();
  const url = new URL((await fallback.getAttribute('href'))!);
  expect(url.searchParams.get('phone')).toBe('554133833627');
  expect(url.searchParams.get('text')).toContain('Autorizo');
  await expect(page.getByText('Cadastro realizado com sucesso!')).toHaveCount(0);
  outcome = 'duplicate';
  await submit.click();
  await expect(page.getByText(/já está participando/)).toBeVisible();
  await expect(page.getByRole('link', { name: 'Continuar pelo WhatsApp' })).toBeVisible();
  outcome = 'missing';
  await submit.click();
  await expect(page.getByRole('alert')).toContainText('Não foi possível confirmar');
  await expect(fallback).toBeVisible();
  await expect(page.getByText('Cadastro realizado com sucesso!')).toHaveCount(0);
  outcome = 'success';
  await submit.click();
  await expect.poll(() => whatsappVisits.length).toBe(1);
  const target = new URL(whatsappVisits[0]);
  expect(target.origin + target.pathname).toBe('https://api.whatsapp.com/send');
  expect(target.searchParams.get('phone')).toBe('554133833627');
  const message = target.searchParams.get('text') || '';
  expect(message).toContain('Acabei de confirmar minha participação');
  expect(message).toContain('Autorizo receber novidades');
  expect(message).toContain('Meu número: (00) 00000-0000');
  expect(calls).toBe(4);
});
