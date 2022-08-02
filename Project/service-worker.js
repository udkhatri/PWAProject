const cache_version = 'v2';

self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cache_version)
      .then((cache)=>{
        console.log('Opened cache',cache);
        cache.addAll([
          '/Project/',
          '/Project/index.html',
          '/Project/css/styles.css',
          '/Project/manifest.json',
          '/Project/icons/android-chrome-192x192.png',
          '/Project/js/script.js',
          '/Project/pages/'
        ]);
    })
  )
  
});
/*
 -- On Activate Event
 -- Triggered when the service worker is activated
 */
self.addEventListener('activate', function (event) {

  // Claims control over all uncontrolled tabs/windows
  event.waitUntil(clients.claim());
  // Delete any old caches that are not the current one
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== cache_version) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  )
});


/*
 -- On Fetch Event
 -- Triggered when the service worker retrieves an asset
 */
self.addEventListener('fetch', function (event) {

  // Slate version
  
  event.respondWith(caches.open(cache_version)
    .then((cache) => {
      return cache.match(event.request)
      .then((cachedResponse) => {
        const fetchedResponse = fetch(event.request)
        .then((networkResponse) => {
          cache.put(event.request, networkResponse.clone());
           return networkResponse;
          });
        return cachedResponse || fetchedResponse;
      });
    })
  ); 
});
