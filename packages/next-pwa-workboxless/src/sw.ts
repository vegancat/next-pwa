/*declare const self: ServiceWorkerGlobalScope;

self.addEventListener("fetch", (event) => {
  // empty
});

function fallback(request: Request) {
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
      caches.match(fallbackResponse, {
        ignoreSearch: true,
      }) ?? Response.error()
    );
  }
  if (
    process.env.__PWA_FALLBACK_DATA__ &&
    url.match(/\/_next\/data\/.+\/.+\.json$/i)
  ) {
    return caches.match(process.env.__PWA_FALLBACK_DATA__, {
      ignoreSearch: true,
    });
  }
  return Response.error();
}
*/
declare const __PWA_IMPORT_SCRIPTS__: string[] | undefined;

if (__PWA_IMPORT_SCRIPTS__) {
  importScripts(...__PWA_IMPORT_SCRIPTS__);
}
