import type { RuntimeCaching } from "../../types.js";

/**
 * Get the fallback response for request.
 * @param request
 * @returns
 */
export const fallback = async (request: Request) => {
  const matchOptions: MultiCacheQueryOptions = {
    ignoreSearch: true,
  };
  // https://developer.mozilla.org/en-US/docs/Web/API/RequestDestination
  const { destination, url } = request;
  const fallbackUrl: Partial<Record<RequestDestination, string | undefined>> = {
    document: process.env.__PWA_FALLBACK_DOCUMENT__,
    image: process.env.__PWA_FALLBACK_IMAGE__,
    audio: process.env.__PWA_FALLBACK_AUDIO__,
    video: process.env.__PWA_FALLBACK_VIDEO__,
    font: process.env.__PWA_FALLBACK_FONT__,
  };
  const fallbackResponse = fallbackUrl[destination];
  if (fallbackResponse) {
    return (
      (await caches.match(fallbackResponse, matchOptions)) ?? Response.error()
    );
  }
  if (
    destination === "" &&
    process.env.__PWA_FALLBACK_DATA__ &&
    url.match(/\/_next\/data\/.+\/.+\.json$/i)
  ) {
    return (
      (await caches.match(process.env.__PWA_FALLBACK_DATA__, matchOptions)) ??
      Response.error()
    );
  }
  return Response.error();
};

/**
 * Check if a runtimeCaching's entry is valid for a request.
 * @param entry
 * @param request
 * @returns
 */
export const checkEntry = (
  entry: RuntimeCaching,
  request: Request,
  requestUrl: URL,
  sameOrigin: boolean
) => {
  if (entry.method !== request.method) {
    return false;
  }
  switch (typeof entry.urlPattern) {
    case "function":
      return entry.urlPattern({
        request,
        url: requestUrl,
        sameOrigin,
      });
    case "string":
      return request.url === entry.urlPattern;
    default:
      return entry.urlPattern.test(request.url);
  }
};
