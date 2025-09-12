// Service Worker for background tracking
self.addEventListener('install', event => {
    self.skipWaiting();
    console.log('Service Worker installed');
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated');
});

self.addEventListener('fetch', event => {
    // You can add fetch handling here if needed
});

// Background sync for offline tracking
self.addEventListener('sync', event => {
    if (event.tag === 'send-location') {
        console.log('Sync event fired - sending locations');
        // Implement your background sync logic here
    }
});