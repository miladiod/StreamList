// public/service-worker.js
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js');

if (workbox) {
  console.log(`✅ Workbox is loaded`);

  workbox.precaching.precacheAndRoute([
    { url: '/', revision: null },
  { url: '/index.html', revision: null },
  { url: '/manifest.json', revision: null },
  { url: '/static/js/main.js', revision: null },
  { url: '/static/css/main.css', revision: null },
  { url: '/static/js/manifest.js', revision: null },
  ]);
} else {
  console.log(`❌ Workbox didn't load`);
}
workbox.routing.registerRoute(
  ({ request }) => request.destination === 'image',
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 7 * 24 * 60 * 60, // 7 Days
      }),
    ],
  })
);

// Cache the offline page
workbox.precaching.precacheAndRoute([{ url: '/offline.html', revision: null }]);

// Serve it when offline
workbox.routing.setCatchHandler(async ({ event }) => {
  if (event.request.destination === 'document') {
    return caches.match('/offline.html');
  }
  return Response.error();
});
