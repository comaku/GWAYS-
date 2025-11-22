// GWAYS Service Worker

const CACHE_NAME = "gways-cache-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./offline.html",
  "./style.css",
  "./script.js"
];

// ✅ Install service worker & cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ✅ Serve cached files when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request).then(response => {
      return response || caches.match("offline.html");
    }))
  );
});


