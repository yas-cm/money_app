// Plin: guarda o app no aparelho para abrir sem internet.
// Mude VERSAO quando publicar uma versão nova, para o navegador trocar o cache.
const VERSAO = 'plin-1.11';
const APP = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg', 'icon-v2-192.png', 'icon-v2-512.png', 'icon-v2-maskable-512.png'];

self.addEventListener('install', (e) => {
  // cache: 'reload' pula o cache do navegador (o GitHub Pages guarda os arquivos por 10 min), senão a versão nova podia nascer com arquivos velhos
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(APP.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // páginas: tenta a rede primeiro (pega versão nova), cai no cache sem internet
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req.url, { cache: 'no-cache' }).then((r) => { const cp = r.clone(); caches.open(VERSAO).then((c) => c.put('index.html', cp)); return r; }).catch(() => caches.match('index.html')));
    return;
  }
  // arquivos do app e fontes: cache primeiro
  if (url.origin === location.origin || url.hostname.endsWith('fonts.googleapis.com') || url.hostname.endsWith('fonts.gstatic.com')) {
    e.respondWith(caches.match(req).then((hit) => hit || fetch(req).then((r) => {
      if (r.ok || r.type === 'opaque') { const cp = r.clone(); caches.open(VERSAO).then((c) => c.put(req, cp)); }
      return r;
    })));
  }
});
