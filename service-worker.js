const CACHE_NAME = 'portfolio-cache-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/main.css',
    '/preloader.css',
    '/main.js',
    '/preloader.js',
    '/gsap-animations.js',
    // Add other assets here
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(ASSETS_TO_CACHE);
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // Cache-first strategy for HTML, CSS, JS
    if (event.request.url.match(/\.(html|css|js)$/)) {
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    return cachedResponse || fetch(event.request).then((response) => {
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        // Cache the new response
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });
                            
                        return response;
                    });
                })
        );
    }
    // Stale-while-revalidate for images
    else if (event.request.url.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
        event.respondWith(
            caches.match(event.request)
                .then((cachedResponse) => {
                    const fetchPromise = fetch(event.request).then((response) => {
                        // Cache the new image
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, response);
                            });
                    });
                    
                    // Return cached response if available, otherwise wait for network
                    return cachedResponse || fetchPromise;
                })
        );
    }
});
