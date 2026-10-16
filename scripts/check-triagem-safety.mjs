import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const triage = readFileSync(fileURLToPath(new URL('../src/pages/UmContato.tsx', import.meta.url)), 'utf8');
const edge = readFileSync(fileURLToPath(new URL('../supabase/functions/submit-triagem/index.ts', import.meta.url)), 'utf8');
const offer = readFileSync(fileURLToPath(new URL('../src/pages/Ofertas.tsx', import.meta.url)), 'utf8');

// Structural regression guard for privacy + persistence; not a live submission test.
assert.match(triage, /useState<Respostas>\(\{\s*lgpd:\s*false,\s*aceita_whats:\s*true\s*\}\)/);
assert.doesNotMatch(triage, /lgpd:\s*true,\s*aceita_whats:\s*true/);
assert.match(triage, /if\s*\(!resp\.lgpd\)/);
assert.match(triage, /checked=\{!!resp\.lgpd\}/);
assert.match(triage, /lgpd:\s*false[\s\S]*?\}\)\);/);
const draft = triage.match(/localStorage\.setItem\(\s*STORAGE_KEY,\s*JSON\.stringify\(([\s\S]*?)\)\s*\);/);
assert.ok(draft, 'Draft persistence not found');
for (const privateField of ['nome:', 'telefone:', 'email:', 'lgpd:', 'aceita_whats:', 'aceita_email:']) {
  assert.ok(!draft[1].includes(privateField), 'Private data/consent in draft: ' + privateField);
}
assert.match(triage, /const\s+receipt\s*=\s*data\s+as/);
assert.match(triage, /receipt\?\.ok\s*!==\s*true/);
assert.match(triage, /receipt\.skipped/);
assert.match(triage, /typeof receipt\.id\s*!==\s*"string"/);
assert.doesNotMatch(triage, /supabase\.from\("triagem_leads"\)\.insert/);
assert.doesNotMatch(triage, /track\("triagem_complete",\s*payload\b/);
const event = triage.match(/track\("triagem_complete",\s*\{([\s\S]*?)\}\);/);
assert.ok(event, 'Missing sanitized analytics event');
for (const privateField of ['nome', 'telefone', 'email', 'user_agent', 'referrer', 'ip']) {
  assert.ok(!new RegExp('\\b' + privateField + '\\b').test(event[1]), 'Private field in analytics: ' + privateField);
}
assert.match(edge, /admin\.rpc\("submit_triagem"/);
assert.match(edge, /return json\(\{\s*\.\.\.\(data as Record<string, unknown>\)/);
assert.match(offer, /const \[aceite, setAceite\] = useState\(false\)/);
assert.match(offer, /if \(!canSubmit\) return/);
console.log('PASS consent opt-in, anonymous draft, persisted receipt, sanitized analytics, offers opt-in');
