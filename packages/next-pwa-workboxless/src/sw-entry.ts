declare const __PWA_ENABLE_REGISTER__: boolean;
declare const __PWA_ENABLE_LOGGING__: boolean;

if (
  typeof window !== "undefined" &&
  "serviceWorker" in navigator &&
  typeof caches !== "undefined"
) {
  if (__PWA_ENABLE_REGISTER__) {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        if (__PWA_ENABLE_LOGGING__) {
          console.log("Service worker registration succeeded: ", registration);
        }
      },
      (error) => {
        if (__PWA_ENABLE_LOGGING__) {
          console.error(
            `Service worker registration failed: ${
              error instanceof Error ? error.message : error
            }`
          );
        }
      }
    );
  }
}
