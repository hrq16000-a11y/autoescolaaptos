// Local/CI HTTP adapter for the built pilot, not a production hosting adapter.
import { createServer } from 'node:http';
import { Readable } from 'node:stream';
import { pipeline } from 'node:stream/promises';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, sep, extname } from 'node:path';
import server from '../dist/server/server.js';
const root = fileURLToPath(new URL('../dist/client/', import.meta.url));
const port = Number(process.env.PORT ?? 3001);
const types = { '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
createServer(async (req, res) => {
  try {
    const url = new URL(req.url ?? '/', `http://127.0.0.1:${port}`);
    if (url.pathname.startsWith('/assets/')) {
      const path = resolve(root, `.${decodeURIComponent(url.pathname)}`);
      if (!path.startsWith(root.endsWith(sep) ? root : `${root}${sep}`)) { res.writeHead(403).end(); return; }
      const content = await readFile(path);
      res.writeHead(200, { 'Content-Type': types[extname(path)] ?? 'application/octet-stream' });
      res.end(req.method === 'HEAD' ? undefined : content);
      return;
    }
    const init = { method: req.method, headers: new Headers(req.headers) };
    if (req.method !== 'GET' && req.method !== 'HEAD') Object.assign(init, { body: Readable.toWeb(req), duplex: 'half' });
    const response = await server.fetch(new Request(url, init));
    res.writeHead(response.status, Object.fromEntries(response.headers));
    if (response.body && req.method !== 'HEAD') await pipeline(Readable.fromWeb(response.body), res);
    else res.end();
  } catch (error) {
    console.error(error);
    if (!res.headersSent) res.writeHead(error?.code === 'ENOENT' ? 404 : 500);
    res.end();
  }
}).listen(port, '127.0.0.1', () => console.log(`Pilot production build: http://127.0.0.1:${port}`));
