const validCacheName = "restaurant-reviews-crg";

self.addEventListener('install', function(event) {
    const urlsToCache = [
        '/',
        'css/styles.css',
        'data/restaurants.json',
        'img/*',
        'js/*',
        'index.html',
        'restaurant.html'
    ];
    event.waitUntil(
        caches.open(validCacheName).then(cache => cache.addAll())
    );
})

self.addEventListener('fetch', function(event) {
 console.log('a');
});