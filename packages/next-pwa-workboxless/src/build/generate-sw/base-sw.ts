declare const self: ServiceWorkerGlobalScope;
/*
self.addEventListener("fetch", (event) => {
  // empty
});
*/
declare const __PWA_IMPORT_SCRIPTS__: string[] | undefined;
declare const __PWA_SKIP_WAITING__: boolean;

if (__PWA_IMPORT_SCRIPTS__) {
  importScripts(...__PWA_IMPORT_SCRIPTS__);
}

if (__PWA_SKIP_WAITING__) {
  self.skipWaiting();
}
