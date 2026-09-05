/* global caches, fetch, self, URL */

const CACHE_NAME = "joydip-portfolio-v1";
const APP_SHELL = ["/", "/manifest.webmanifest", "/icons/favicon-512.png", "/images/logo-180.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(cacheNames.filter((cacheName) => cacheName !== CACHE_NAME).map((cacheName) => caches.delete(cacheName)))
      )
      .then(() => self.clients.claim())
  );
});

const putInCache = async (request, response) => {
  if (!response || !response.ok) {
    return response;
  }

  const cache = await caches.open(CACHE_NAME);
  cache.put(request, response.clone());
  return response;
};

const networkFirst = async (request) => {
  try {
    return await putInCache(request, await fetch(request));
  } catch {
    return (await caches.match(request)) || (await caches.match("/"));
  }
};

const cacheFirst = async (request) => {
  const cachedResponse = await caches.match(request);
  return cachedResponse || putInCache(request, await fetch(request));
};

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/")) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
  }

  if (["font", "image", "script", "style"].includes(request.destination)) {
    event.respondWith(cacheFirst(request));
  }
});
