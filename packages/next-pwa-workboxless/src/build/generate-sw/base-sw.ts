import type { RuntimeCaching } from "../../private-types.js";
import { runtimeCaching } from "./runtime-caching.js";

declare const self: ServiceWorkerGlobalScope;

declare const __PWA_IMPORT_SCRIPTS__: string[] | undefined;
declare const __PWA_SKIP_WAITING__: boolean;

if (__PWA_IMPORT_SCRIPTS__) {
  importScripts(...__PWA_IMPORT_SCRIPTS__);
}

const FALLBACK_CACHE_NAME = "__next_pwa_cache__";

const mapUrlToCacheType = new Map<Request, RuntimeCaching>();

/**
 * Check if a runtimeCaching's entry is valid for a request.
 * @param entry
 * @param request
 * @returns
 */
const checkEntry = (
  entry: RuntimeCaching,
  request: Request,
  requestUrl: URL
) => {
  switch (typeof entry.urlPattern) {
    case "function":
      return entry.urlPattern({
        request,
        url: requestUrl,
        sameOrigin: requestUrl.origin === self.location.origin,
      });
    case "string":
      return request.url === entry.urlPattern;
    default:
      return entry.urlPattern.test(request.url);
  }
};

const getRuntimeCachingEntry = (request: Request) => {
  const requestUrl = new URL(request.url);
  for (const entry of runtimeCaching) {
    if (checkEntry(entry, request, requestUrl)) {
      mapUrlToCacheType.set(request, entry);
      return entry;
    }
  }
  return undefined;
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const entry =
        mapUrlToCacheType.get(event.request) ??
        getRuntimeCachingEntry(event.request);

      if (!entry || entry.handler === "NetworkOnly") {
        return await fetch(event.request);
      }

      if (typeof entry.handler === "function") {
        return entry.handler(event.request);
      }

      const cachedResponse = await caches.match(event.request);

      if (entry.handler === "CacheOnly") {
        return cachedResponse ?? Response.error();
      }

      if (entry.handler === "CacheFirst" && cachedResponse) {
        return cachedResponse;
      }

      let response = await fetch(event.request).catch(() => cachedResponse);

      if (!response) {
        response = Response.error();
      }

      if (response.ok) {
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

      return response;
    })()
  );
});

if (__PWA_SKIP_WAITING__) {
  self.skipWaiting();
}
