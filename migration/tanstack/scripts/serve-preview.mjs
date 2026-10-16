// Standalone preview adapter for the built TanStack pilot.
// Not a substitute for an authenticated, HTTPS production ingress.
import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep, extname } from 'node:path';
import app from '../dist/server/server.js';

const assetRoot = fileURLToPath(new URL('../dist/client/', import.meta.url));
const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 3002);
const loopback = new Set(['localhost', '127.0.0.1', '::1']);
if (!loopback.has(host) && process.env.APTOS_PREVIEW_ALLOW_PUBLIC !== '1') {
  console.error('Refusing to expose the pilot outside loopback without an explicit opt-in and protected ingress.');
  process.exit(1);
}
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('Invalid PORT');
  process.exit(1);
}

const contentTypes = {
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.json': 'application/json; charset=utf-8',
};
const safeHeaders = {
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Cache-Control': 'no-store',
};

function respond(res, method, status, headers, body = '') {
  res.writeHead(status, { ...safeHeaders, ...headers });
  res.end(method === 'HEAD' ? undefined : body);
}

createServer(async (req, res) => {
  const method = req.method || 'GET';
  try {
    if (method !== 'GET' && method !== 'HEAD') {
      respond(res, method, 405, { Allow: 'GET, HEAD' }, 'Method not allowed');
      return;
    }
    const url = new URL(req.url || '/', 'http://127.0.0.1:' + port);
    if (url.pathname === '/healthz') {
      respond(res, method, 200, { 'Content-Type': 'text/plain; charset=utf-8' }, 'ok\n');
      return;
    }
    if (url.pathname.startsWith('/assets/')) {
      let decoded;
      try { decoded = decodeURIComponent(url.pathname); }
      catch { respond(res, method, 400, {}, 'Invalid path'); return; }
      const file = resolve(assetRoot, '.' + decoded);
      const rootPrefix = assetRoot.endsWith(sep) ? assetRoot : assetRoot + sep;
      if (!file.startsWith(rootPrefix)) {
        respond(res, method, 403, {}, 'Forbidden');
        return;
      }
      let bytes;
      try { bytes = await readFile(file); }
      catch (error) {
        if (error && error.code === 'ENOENT') {
          respond(res, method, 404, {}, 'Not found');
          return;
        }
        throw error;
      }
      respond(res, method, 200, {
        'Content-Type': contentTypes[extname(file)] || 'application/octet-stream',
      }, bytes);
      return;
    }
    const result = await app.fetch(new Request(url, {
      method,
      headers: new Headers(req.headers),
    }));
    const headers = { ...Object.fromEntries(result.headers), ...safeHeaders };
    res.writeHead(result.status, headers);
    if (method === 'HEAD' || !result.body) {
      res.end();
      return;
    }
    await pipeline(Readable.fromWeb(result.body), res);
  } catch (error) {
    // Do not print query parameters, personal data or request headers.
    console.error('Preview request failed: ' + (error?.code || 'internal error'));
    if (!res.headersSent) respond(res, method, 500, {}, 'Internal error');
    else res.destroy();
  }
}).listen(port, host, () => {
  console.log('TanStack pilot preview listening on ' + host + ':' + port);
});
