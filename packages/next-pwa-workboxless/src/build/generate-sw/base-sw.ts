import type { RuntimeCaching } from "../../types.js";
import { checkEntry, fallback, getFetch } from "./base-sw-utils.js";

declare const self: ServiceWorkerGlobalScope;

declare const __PWA_IMPORT_SCRIPTS__: readonly string[] | undefined;
declare const __PWA_RUNTIME_CACHING__: readonly RuntimeCaching[];
declare const __PWA_SKIP_WAITING__: boolean;

if (__PWA_IMPORT_SCRIPTS__) {
  importScripts(...__PWA_IMPORT_SCRIPTS__);
}

// __PWA_RUNTIME_CACHING__ is inlined, and if we reference it multiple times
// they will all get replaced by the actual array, which is not the desired
// behavior.
const runtimeCaching = __PWA_RUNTIME_CACHING__;

const FALLBACK_CACHE_NAME = "__next_pwa_cache__";

const mapUrlToCacheType = new Map<Request, number>();

const getRuntimeCachingEntry = (
  request: Request,
  requestUrl: URL,
  sameOrigin: boolean
) => {
  const cachedIdx = mapUrlToCacheType.get(request);
  if (cachedIdx !== undefined) {
    return runtimeCaching[cachedIdx];
  }

  for (let i = 0; i < runtimeCaching.length; i++) {
    if (checkEntry(runtimeCaching[i], request, requestUrl, sameOrigin)) {
      // Cache the entry index so that we don't have to loop
      // through runtimeCaching again for this request.
      mapUrlToCacheType.set(request, i);
      return runtimeCaching[i];
    }
  }

  return undefined;
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const requestUrl = new URL(event.request.url);
      const sameOrigin = self.location.origin === requestUrl.origin;
      const entry = getRuntimeCachingEntry(
        event.request,
        requestUrl,
        sameOrigin
      );

      // If there's no entry, we just pass. In NetworkOnly, only
      // fetching is allowed.
      if (!entry || entry.handler === "NetworkOnly") {
        return await fetch(event.request);
      }

      // Let the user determine how to respond.
      if (typeof entry.handler === "function") {
        return entry.handler({
          request: event.request,
          url: requestUrl,
          sameOrigin,
        });
      }

      const cachedResponse = await caches.match(event.request);

      // In CacheOnly, either we return a cached response or we fallback.
      // No fetching should be made.
      if (entry.handler === "CacheOnly") {
        return cachedResponse ?? (await fallback(event.request));
      }

      // In CacheFirst, we should return a cached response if it exists, but
      // we may fetch otherwise.
      if (entry.handler === "CacheFirst" && cachedResponse) {
        return cachedResponse;
      }

      const entryTimeout = entry?.options?.networkTimeoutSeconds;

      // Fetch, fallback to cachedResponse, if it doesn't exist then fallback to
      // fallbackRoutes.
      const response = await getFetch(
        entryTimeout,
        entry.handler,
        event.request
      ).catch(() => cachedResponse);

      // Fetched successfully, we may add it to the cache.
      if (response && response.ok) {
        // We must clone the response so that the original response's body isn't locked.
        const clonedResponse = response.clone();

        // Add a [request, response] pair to `caches`.
        let cacheName = entry.options?.cacheName ?? FALLBACK_CACHE_NAME;
        if (
          cacheName === "next-html-response" &&
          event.request.headers.get("RSC") === "1"
        ) {
          // special handling for RSC.
          cacheName = "next-rsc-response";
        }

        const cache = await caches.open(cacheName);

        await cache.put(event.request, clonedResponse);
      }

      return response ?? (await fallback(event.request));
    })()
  );
});

if (__PWA_SKIP_WAITING__) {
  self.skipWaiting();
}
