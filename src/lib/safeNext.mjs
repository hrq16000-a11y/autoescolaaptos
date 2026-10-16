/**
 * Same-origin redirect target for /login?next=.
 * Never accept absolute, protocol-relative, backslash or encoded-slash paths.
 */
export function safeNext(raw) {
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//')) return '/';
  if (/[\\\u0000-\u001f\u007f]/.test(raw)) return '/';
  const path = raw.split(/[?#]/, 1)[0];
  if (/%(?:2f|5c|00|0a|0d)/i.test(path)) return '/';
  try {
    const u = new URL(raw, 'https://autoescolaaptos.com.br');
    if (u.origin !== 'https://autoescolaaptos.com.br') return '/';
    return u.pathname + u.search + u.hash;
  } catch {
    return '/';
  }
}
