// Kalasandhya 2026 — Service Worker
// Caches the app shell (HTML, manifest, icons) so the app opens instantly
// and works offline. Firestore data sync is handled separately by the app
// itself and is unaffected by this cache — when there's no connection, the
// app already falls back to local storage on its own.

const CACHE_NAME = 'kalasandhya-2026-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-32.png',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// Strategy:
// - For the app shell (same-origin files listed above): cache-first, so the
//   app opens instantly even offline, with a network fallback to pick up
//   updates when online.
// - For everything else (Firebase SDK from gstatic.com, Firestore traffic,
//   fonts, etc.): always go to the network. Never cache third-party or API
//   calls — caching live data would show stale program info.
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (!isSameOrigin) {
    // Let the browser handle Firebase/Firestore/CDN requests normally.
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const networkFetch = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
          }
          return response;
        })
        .catch(() => cached); // offline and not cached: nothing more we can do

      // Serve cached immediately if we have it (fast + offline-capable),
      // and still update the cache in the background from the network.
      return cached || networkFetch;
    })
  );
});
