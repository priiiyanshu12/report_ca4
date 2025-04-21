const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
  '/',
  'index.css',
  'main.js',
  'assets/horizontal_sprite.png',
  'about1.php',
  'contact1.php',
  'index.php',
  'join.php',
  'services1.php'
];

self.addEventListener('install', event => {
  console.log('Service Worker installation event triggered');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache opened');
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url} (${response.status} ${response.statusText})`);
                }
                return cache.put(url, response);
              })
              .then(() => console.log('Cached:', url))
              .catch(error => console.error('Failed to cache', url, ':', error));
          })
        );
      })
      .catch(error => {
        console.error('Failed to cache files during installation:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event triggered for:', event.request.url);

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          console.log('Cache hit for:', event.request.url);
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('Cached (from fetch event):', event.request.url);
              });

            return response;
          })
          .catch(error => {
            console.error('Failed to fetch:', error);
            throw error;
          });
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activation event triggered');

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});