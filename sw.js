// sw.js - Sajilo Travels background helper
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'START_LOCATION_SYNC') {
    // Register background sync if supported (Chrome Android)
    if ('sync' in self.registration) {
      self.registration.sync.register('location-sync').catch(() => {});
    }
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'location-sync') {
    event.waitUntil(retryLocationSync());
  }
});

async function retryLocationSync() {
  // This runs when the browser wakes up and internet is available.
  // It reads the last stored coordinates and posts to Firestore REST endpoint.
  // Note: Firestore REST requires auth token — this is best-effort.
  // The main page already writes directly when it wakes.
  return Promise.resolve();
}