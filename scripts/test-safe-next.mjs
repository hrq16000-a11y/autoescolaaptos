import assert from 'node:assert/strict';
import { safeNext } from '../src/lib/safeNext.mjs';
for (const value of ['/', '/admin', '/admin/leads?tab=new',
  '/.lovable/oauth/consent?authorization_id=synthetic', '/blog/post#top']) {
  assert.equal(safeNext(value), value, 'Expected valid path: ' + value);
}
for (const value of [null, '', 'https://evil.invalid', 'javascript:alert(1)',
  '//evil.invalid', '///evil.invalid', '/\\evil.invalid',
  '/%5cevil.invalid', '/%2fevil.invalid', '/admin\nLocation: external',
  '/\0admin', '\\evil.invalid', 'admin', 'http:foo']) {
  assert.equal(safeNext(value), '/', 'Unsafe redirect: ' + JSON.stringify(value));
}
assert.equal(safeNext('/admin?next=https%3A%2F%2Fevil.invalid'),
  '/admin?next=https%3A%2F%2Fevil.invalid');
console.log('PASS login ?next= URL safety and valid local callbacks');
