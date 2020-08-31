const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

// This is training code only it has 2 flaws
// 1 Everytime add new element to cashe this code would need to re-add 1 by 1
// 2 Everytime add a new version of the service worker - would have to manually update the code
// 3 its a 'cachefirst` which may not be optimal
// use staleWhileRevalidate for avatar caching

// Install SW
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         console.log("Opened cache");

         return cache.addAll(urlsToCache);
      })
   );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
   event.respondWith(
      caches.match(event.request).then(() => {
         return fetch(event.request).catch(() => caches.match("offline.html"));
      })
   );
});

// Activate the SW
self.addEventListener("activate", (event) => {
   const cacheWhitelist = [];
   cacheWhitelist.push(CACHE_NAME);

   event.waitUntil(
      caches.keys().then((cacheNames) =>
         Promise.all(
            cacheNames.map((cacheName) => {
               if (!cacheWhitelist.includes(cacheName)) {
                  return caches.delete(cacheName);
               }
            })
         )
      )
   );
});
