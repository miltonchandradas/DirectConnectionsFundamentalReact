const cacheName = "v1";

// Call Install event...
self.addEventListener("install", (e) => {
   console.log("Service worker installed...");
});

// Call Activate event...
self.addEventListener("activate", (e) => {
   console.log("Service worker activated...");

   // Remove unwanted caches...
   // Service worker will not activate until code inside waitUntil() has successfully occurred
   e.waitUntil(
      caches.keys().then((cacheNames) => {
         return Promise.all(
            cacheNames.map((cache) => {
               if (cache !== cacheName) {
                  console.log("Service worker:  Clearing old cache");
                  return caches.delete(cache);
               }
            })
         );
      })
   );
});

// Call Fetch event...
self.addEventListener("fetch", (e) => {
   console.log("Service worker Fetching...");

   e.respondWith(
      fetch(e.request)
         .then((res) => {
            // make copy / clone of response
            const responseClone = res.clone();
            // open cache
            caches.open(cacheName).then((cache) => {
               // add response to cache
               cache.put(e.request, responseClone);
            });

            return res;
         })
         .catch(() => caches.match(e.request).then((res) => res))
   );
});
