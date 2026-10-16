import { expect, test, type Page } from '@playwright/test';

const base = 'http://127.0.0.1:4178';
const key = 'aptos:1contato:draft:v1';
type Outcome = 'error' | 'missing-receipt' | 'success';
interface Fake { outcome: Outcome; calls: number; blocked: string[]; }
const fakeId = '00000000-0000-4000-8000-000000000017';

// All external connections are intercepted. No real account, phone,
// personal record, analytics or WhatsApp ever receives these inputs.
async function isolateNetwork(page: Page, state: Fake) {
  await page.route('**/*', async route => {
    const req = route.request();
    const url = req.url();
    if (url.startsWith(base + '/')) {
      await route.continue();
      return;
    }
    if (/\/functions\/v1\/submit-triagem(?:\?|$)/.test(url)) {
      const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info, x-supabase-api-version',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json',
      };
      if (req.method() === 'OPTIONS') {
        await route.fulfill({ status: 200, headers, body: '{}' });
        return;
      }
      expect(req.method()).toBe('POST');
      state.calls++;
      const body = req.postDataJSON() as Record<string, unknown>;
      expect(body.lgpd_aceite).toBe(true);
      expect(body.origem).toBe('1contato');
      expect(body.nome).toBe('Pessoa Ficticia');
      expect(String(body.telefone).replace(/\D/g, '')).toBe('00000000000');
      if (state.outcome === 'error') {
        await route.fulfill({ status: 500, headers, body: '{"error":"server_error"}' });
      } else if (state.outcome === 'missing-receipt') {
        await route.fulfill({ status: 200, headers, body: '{"ok":true}' });
      } else {
        await route.fulfill({ status: 200, headers, body: JSON.stringify({ ok: true, id: fakeId, action: 'created' }) });
      }
      return;
    }
    state.blocked.push(req.method() + ' ' + new URL(url).hostname);
    await route.abort();
  });
}
function fake(): Fake { return { outcome: 'error', calls: 0, blocked: [] }; }
async function reachFinalStep(page: Page) {
  await page.goto('/1contato');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Vamos entender');
  await page.getByRole('button', { name: 'Começaria do zero' }).click();
  await expect(page.getByRole('heading', { name: 'Qual é o seu caso?' })).toBeVisible();
  await page.getByRole('button', { name: 'Sim, conheço o procedimento' }).click();
  await page.getByRole('button', { name: 'Renovação de CNH' }).click();
  await expect(page.getByRole('heading', { name: 'Quando pretende iniciar?' })).toBeVisible();
  await page.getByRole('button', { name: 'Hoje' }).click();
  await expect(page.getByRole('heading', { name: /Quase lá! Confirme seus dados/ })).toBeVisible();
}

test('refuses submission without consent, survives server failure, and only confirms a persisted receipt', async ({ page }) => {
  const network = fake();
  await isolateNetwork(page, network);
  await reachFinalStep(page);
  await page.locator('#nome-triagem').fill('Pessoa Ficticia');
  await page.locator('#tel-triagem').fill('00000000000');
  const consent = page.getByRole('checkbox', { name: 'Autorização LGPD' });
  const finish = page.getByRole('button', { name: 'Quero agilizar meu atendimento' });
  await expect(consent).not.toBeChecked();
  await expect(finish).toBeDisabled();
  await consent.click();
  await expect(consent).toBeChecked();
  await expect(finish).toBeEnabled();

  await finish.click();
  await expect(page.getByRole('alert')).toContainText('Não foi possível confirmar seu pedido');
  await expect(finish).toBeEnabled();
  expect(network.calls).toBe(1);
  expect(network.blocked.some(x => x.includes('whatsapp.com'))).toBe(false);

  network.outcome = 'missing-receipt';
  await finish.click();
  await expect(page.getByRole('alert')).toContainText('Não foi possível confirmar seu pedido');
  expect(network.calls).toBe(2);
  expect(network.blocked.some(x => x.includes('whatsapp.com'))).toBe(false);

  const draft = await page.evaluate(storage => localStorage.getItem(storage), key);
  expect(draft).not.toBeNull();
  expect(draft).not.toContain('Pessoa Ficticia');
  expect(draft).not.toContain('00000000000');
  expect(draft).not.toContain('lgpd');

  network.outcome = 'success';
  await finish.click();
  await expect(page.getByRole('heading', { name: /Tudo pronto!/ })).toBeVisible();
  const href = await page.getByRole('link', { name: 'Continuar atendimento no WhatsApp' }).getAttribute('href');
  expect(href).toBeTruthy();
  const dest = new URL(href!);
  expect(dest.origin + dest.pathname).toBe('https://api.whatsapp.com/send');
  expect(dest.searchParams.get('phone')).toBe('554133833627');
  expect(dest.searchParams.get('text')).toContain('Pessoa Ficticia');
  expect(network.calls).toBe(3);
  await expect.poll(() => page.evaluate(storage => localStorage.getItem(storage), key)).toBeNull();
  await page.close(); // before auto redirect; no external action
});

test('previous drafts cannot restore consent, name, phone, or email', async ({ page }) => {
  const network = fake();
  await isolateNetwork(page, network);
  await page.goto('/');
  await page.evaluate(storage => {
    localStorage.setItem(storage, JSON.stringify({
      ts: Date.now(), step: 2,
      resp: {
        experiencia: 'Começaria do zero',
        conhece: 'Sim, conheço o procedimento',
        servico: 'Renovação de CNH',
        prazo: 'Hoje',
        nome: 'Pessoa Ficticia', telefone: '00000000000',
        email: 'teste-interno@example.invalid', lgpd: true,
      },
    }));
  }, key);
  await page.goto('/1contato');
  await expect(page.getByRole('heading', { name: 'Quando pretende iniciar?' })).toBeVisible();
  await expect.poll(() => page.evaluate(storage => localStorage.getItem(storage), key)).not.toContain('Pessoa Ficticia');
  await expect.poll(() => page.evaluate(storage => localStorage.getItem(storage), key)).not.toContain('teste-interno@example.invalid');
  await page.getByRole('button', { name: 'Hoje' }).click();
  await expect(page.getByRole('heading', { name: /Quase lá!/ })).toBeVisible();
  await expect(page.locator('#nome-triagem')).toHaveValue('');
  await expect(page.locator('#tel-triagem')).toHaveValue('');
  await expect(page.getByRole('checkbox', { name: 'Autorização LGPD' })).not.toBeChecked();
  expect(network.calls).toBe(0);
});
