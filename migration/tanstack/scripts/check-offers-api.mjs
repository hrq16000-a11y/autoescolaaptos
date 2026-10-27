import assert from 'node:assert/strict';
import server from '../dist/server/server.js';

const invalid = await server.fetch(new Request('http://localhost:3001/api/marketing-optin', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ telefone: '123', lgpd_aceite: true }),
}));
assert.equal(invalid.status, 400, 'invalid phone must be rejected');

const unavailable = await server.fetch(new Request('http://localhost:3001/api/marketing-optin', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ telefone: '(41) 99999-9999', lgpd_aceite: true }),
}));
assert.equal(unavailable.status, 503, 'missing webhook must fail closed');
const body = await unavailable.json();
assert.equal(body.success, false, 'missing webhook must not report success');
console.log('PASS Supabase-free marketing opt-in boundary');
