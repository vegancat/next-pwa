import type { RuntimeCaching } from "../../private-types.js";

declare const self: ServiceWorkerGlobalScope;

declare const __PWA_RUNTIME_CACHING__: RuntimeCaching[];
declare const __PWA_IMPORT_SCRIPTS__: string[] | undefined;
declare const __PWA_SKIP_WAITING__: boolean;

if (__PWA_IMPORT_SCRIPTS__) {
  importScripts(...__PWA_IMPORT_SCRIPTS__);
}

const rscResponseHeaders = new Set([
  "text/x-component",
  "text/plain",
  "application/octet-stream",
]);

const mapUrlToCacheType: Record<string, RuntimeCaching> = {};

const getHandler = (request: Request) => {
  for (const handler of __PWA_RUNTIME_CACHING__) {
    if (
      (handler.urlPattern instanceof RegExp &&
        handler.urlPattern.test(request.url)) ||
      (typeof handler.urlPattern === "string" &&
        request.url === handler.urlPattern) ||
      (typeof handler.urlPattern === "function" &&
        handler.urlPattern(request) &&
        handler.method === request.method)
    ) {
      mapUrlToCacheType[request.url] = handler;
      return handler;
    }
  }
  return undefined;
};

const addToCache = async (
  { urlPattern, handler, options }: RuntimeCaching,
  request: Request,
  response: Response
) => {
  if (
    (urlPattern instanceof RegExp && urlPattern.test(request.url)) ||
    (typeof urlPattern === "string" && request.url === urlPattern) ||
    (typeof urlPattern === "function" && urlPattern(request))
  ) {
    if (handler !== "CacheOnly" && handler !== "NetworkOnly") {
      let cacheName = options?.cacheName ?? "__next_pwa_cache__";
      // special handling for RSC.
      if (cacheName === "next-html-response") {
        const resContentType = response.headers.get("Content-Type");
        if (resContentType && rscResponseHeaders.has(resContentType)) {
          cacheName = "next-rsc-response";
        }
      }
      const cache = await caches.open(cacheName);
      cache.put(request, response);
    }
  }
};

self.addEventListener("fetch", (event) => {
  event.respondWith(
    (async () => {
      const cachedResponse = await caches.match(event.request);
      const handler =
        mapUrlToCacheType[event.request.url] ?? getHandler(event.request);

      if (!handler) {
        return await fetch(event.request);
      }

      if (handler.handler === "CacheOnly") {
        return cachedResponse ?? Response.error();
      }

      if (handler.handler === "CacheFirst" && cachedResponse) {
        return cachedResponse;
      }

      let response = await fetch(event.request);
      if (!response.ok && handler.handler !== "NetworkOnly") {
        if (cachedResponse) {
          response = cachedResponse;
        } else {
          response = Response.error();
        }
      }
      if (response.ok) {
        addToCache(handler, event.request, response);
      }
      return response;
    })()
  );
});

if (__PWA_SKIP_WAITING__) {
  self.skipWaiting();
}
