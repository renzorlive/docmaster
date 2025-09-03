// Service Worker for PWA functionality
const CACHE_NAME = 'modern-docs-v1';
const urlsToCache = [
    '/',
    '/css/main.css',
    '/js/main.js',
    '/js/advanced.js',
    '/levels.html',
    '/commands.html',
    '/api.html'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});

// Background sync for offline analytics
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    // Sync offline data when connection restored
    const data = await getOfflineData();
    if (data.length > 0) {
        await fetch('/api/sync', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}