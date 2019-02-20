const validCacheName = "restaurant-reviews-crg";

self.addEventListener("install", function(event) {
  const urlsToCache = [
    "/",
    "css/styles.css",
    "data/restaurants.json",
    "js/*",
    "index.html",
    "restaurant.html"
  ];
  event.waitUntil(
    caches
      .open(validCacheName)
      .then(cache => cache.addAll(urlsToCache))
      .catch(function(error) {
        console.log(error);
      })
  );
});

self.addEventListener("fetch", function(event) {
  event.waitUntil(
    caches.match(event.request).then(response => {
      if (!response || response.status !== 200 || response.type !== "basic") {
        return response;
      }
      fetch(event.request).then(response => {
        caches.open(validCacheName).then(cache => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(cacheName) {
            return cacheName != validCacheName;
          })
          .map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});
