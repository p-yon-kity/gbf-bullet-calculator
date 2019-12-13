const CACHE_KEY = 'GbfBulletCalc-Cache-v5';

self.addEventListener('install', (event) => {
  self.skipWaiting();

  const urlsToCache = [
    './',
    'index.html',
    'style.css',
    'index.js',
    'favicon.png',
    'script/flat-polyfill.js',
    'img/aetherial-bullet.svg',
    'img/bullet.svg',
    'img/calc.svg',
    'img/cartridge-bullet.svg',
    'img/home.svg',
    'img/minus.svg',
    'img/minus-circle.svg',
    'img/parabellum-bullet.svg',
    'img/plus.svg',
    'img/plus-circle.svg',
    'img/preferences.svg',
    'img/rifle-bullet.svg',
    'img/treasure.svg'
  ];

  event.waitUntil(
    caches.open(CACHE_KEY)
      .then((cache) => cache.addAll(
        urlsToCache.map((url) => new Request(url, {cache: 'no-cache', mode: 'no-cors'}))
      ))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_KEY];

  const deleteOldCache = caches.keys().then((cacheNames) => {
    const deletePromises = cacheNames.map((cacheName) => {
      if (!cacheWhitelist.includes(cacheName)) {
        return caches.delete(cacheName);
      }
    });

    return Promise.all(deletePromises);
  });

  const claim = self.clients.claim();

  event.waitUntil(Promise.all([deleteOldCache, claim]));
});