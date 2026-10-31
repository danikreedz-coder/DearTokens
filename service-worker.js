// Dear Tokens — service worker v2
// Subí VERSION cada vez que cambies archivos de la app para que los usuarios reciban la actualización.
const VERSION = 'v3';
const CACHE_NAME = 'dear-tokens-' + VERSION;
const FILES = [
  './', './index.html', './manifest.json',
  './icon.svg', './icon-192.png', './icon-512.png', './icon-maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys
        .filter(k => k.startsWith('dear-tokens-') && k !== CACHE_NAME)
        .map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: responde rápido desde la caché y actualiza en segundo plano.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req, { ignoreSearch: true });
    const network = fetch(req).then(response => {
      if (response && response.ok && response.type === 'basic') cache.put(req, response.clone());
      return response;
    }).catch(() => null);

    if (cached) { event.waitUntil(network); return cached; }
    const fresh = await network;
    if (fresh) return fresh;
    // Sin conexión y sin copia: solo las navegaciones vuelven a la pantalla principal.
    if (req.mode === 'navigate') {
      const home = await cache.match('./index.html');
      if (home) return home;
    }
    return new Response('Sin conexión', { status: 503, statusText: 'Sin conexión' });
  })());
});
