const CACHE_NAME = 'shooter-game-cache-v1';
const urlsToCache = [
  '/index.html',
  '/Game.js',
  '/Player.js',
  '/Opponent.js',
  '/Shot.js',
  '/main.js',
  '/game.css',
  '/assets/bueno.png',
  '/assets/malo.png',
  '/assets/shot1.png',
  '/assets/shot2.png'
];

// Al instalar, guarda los recursos en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activación: Limpia cachés antiguas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepta las solicitudes y responde desde caché si es posible
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
