/******
 * Installing the service worker
 * Caching everything of the project
 * Returning the cached files
 */
self.addEventListener("install", (event) => {
  console.log("Installed the app service worker!");
  event.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        ".", 
        "./public/css/app.css",
        "./public/js/app.js",
        "./resources/views/index.php",
        "./resources/views/includes/footer.php",
        "./public/logo/logo.png"
      ]);
    })
  );
});

/*****
 * Fetch the cached files
 * Looking for a match with the request
 * return the response
 */
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
