declare const __PWA_ENABLE_REGISTER__: boolean;
declare const __PWA_ENABLE_LOGGING__: boolean;

const log = (...args: Parameters<Console["log"]>) => {
  if (__PWA_ENABLE_LOGGING__) {
    console.log(...args);
  }
};

const error = (...args: Parameters<Console["error"]>) => {
  if (__PWA_ENABLE_LOGGING__) {
    console.error(...args);
  }
};

if (
  typeof window !== "undefined" &&
  "serviceWorker" in navigator &&
  typeof caches !== "undefined"
) {
  if (__PWA_ENABLE_REGISTER__) {
    navigator.serviceWorker.register("/sw.js").then(
      (registration) => {
        log("Service worker registration succeeded: ", registration);
      },
      (err) => {
        if (__PWA_ENABLE_LOGGING__) {
          error(
            `Service worker registration failed: ${
              err instanceof Error ? err.message : err
            }`
          );
        }
      }
    );
  }
}
