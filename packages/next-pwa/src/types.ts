import type { GenerateSWConfig } from "workbox-webpack-plugin";

import type { WorkboxTypes } from "./private-types.js";

export interface PluginOptions {
  /**
   * Disable PWA. Set to `true` to completely disable PWA, set to `false` to
   * generate service worker in both dev and prod.
   * @default false
   */
  disable?: boolean;
  /**
   * Allow this plugin to automatically register the service worker for you. Set
   * this to `false` when you want to register the service worker yourself (this
   * can be done by running `window.workbox.register()` in
   * `componentDidMount`/`useEffect` in your app).
   * @example
   *   ```tsx
   *   // app/register-pwa.tsx
   *   "use client";
   *   import type { Workbox } from "workbox-window";
   *
   *   declare global {
   *     interface Window {
   *       workbox: Workbox;
   *     }
   *   }
   *
   *   export default function RegisterPWA() {
   *     useEffect(() => {
   *       if ("serviceWorker" in navigator && window.workbox !== undefined) {
   *         const wb = window.workbox;
   *         wb.register();
   *       }
   *     }, []);
   *     return <></>;
   *   }
   *
   *   // app/layout.tsx
   *   import RegisterPWA from "./register-pwa";
   *
   *   export default function RootLayout({
   *     children,
   *   }: {
   *     children: React.ReactNode;
   *   }) {
   *     return (
   *       <html lang="en">
   *         <head />
   *         <body>
   *           <RegisterPWA />
   *           {children}
   *         </body>
   *       </html>
   *     );
   *   }
   *   ```
   * @default true
   */
  register?: boolean;
  /**
   * Set output directory for service worker. Relative to Next.js's root
   * directory. By default, this plugin uses `.next`, but it is recommended to
   * change it to `public` instead.
   * @default ".next"
   */
  dest?: string;
  /**
   * Service worker script's filename. Set to a string if you want to customize
   * the output filename.
   * @default "/sw.js"
   */
  sw?: string;
  /**
   * Turn on caching for start URL. [Discussion of use cases for this
   * option](https://github.com/shadowwalker/next-pwa/pull/296#issuecomment-1094167025)
   * @default true
   */
  cacheStartUrl?: boolean;
  /**
   * If your start URL returns different HTML document under different states
   * (such as logged in vs. not logged in), this should be set to true.
   * Effective only when `cacheStartUrl` is set to `true`. Set to `false` if
   * your start URL always returns same HTML document, then start URL will be
   * precached and as such help speed up first load time.
   * @default true
   */
  dynamicStartUrl?: boolean;
  /**
   * If your start URL redirect to another route such as `/login`, it's
   * recommended to setup this redirected URL for the best user experience.
   * Effective when `dynamicStartUrl` is set to `true`
   * @default undefined
   */
  dynamicStartUrlRedirect?: string;
  /**
   * An array of glob pattern strings to exclude files in the public folder from
   * being precached. By default, this plugin excludes public/noprecache.
   * Remember to add ! before each glob pattern for it to work :)
   * @example
   *   ```ts
   *   ["!img/super-large-image.jpg", "!fonts/not-used-fonts.otf"];
   *   ```
   */
  publicExcludes?: string[];
  /**
   * One or more specifiers used to exclude assets from the precache manifest.
   * This is interpreted following the same rules as Webpack's standard exclude
   * option. Relative to `.next/static` or your custom build folder. Defaults to
   * [].
   * @example
   *   ```ts
   *   [/chunks\/images\/.*$/];
   *   ```
   * @default
   *   ```ts
   *   [];
   *   ```
   */
  buildExcludes?: GenerateSWConfig["exclude"];
  /**
   * Config precached routes to fallback when both cache and network are not
   * available to serve resources. If you just need a offline fallback page,
   * simply create a `/_offline.tsx` file in your `pages/` dir or a
   * `/~offline/page.tsx` file in your `app/` dir and you are all set, no
   * configuration necessary.
   */
  fallbacks?: FallbackRoutes;
  /**
   * Enable additional route caching when navigating through pages with
   * `next/link` in frontend. This improves user experience in some cases but it
   * also adds some overhead because of additional network calls, so this can be
   * considered a tradeoff.
   * @default false
   */
  cacheOnFrontEndNav?: boolean;
  /**
   * URL scope for PWA. Defaults to `basePath` in `next.config.js`. Set to
   * `/foo` so that paths under `/foo` are PWA while others are not
   */
  scope?: string;
  /**
   * Change the directory `next-pwa` uses to look for a custom worker
   * implementation to add to the service worker generated by Workbox. For more
   * information, check out the [custom worker
   * example](https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-worker).
   * `next-pwa` will look into root and `src` directory for this directory.
   * Relative to Next.js's root directory.
   * @default "worker"
   */
  customWorkerDir?: string;
  /**
   * Reload the app when it detects that it has gone back online. Indicate if
   * the app should call `location.reload()` to refresh the app.
   * @default true
   */
  reloadOnOnline?: boolean;
  /**
   * Pass options to `workbox-webpack-plugin`. This one relies on
   * `workbox-webpack-plugin`'s own JSDoc, so some information may not be
   * exactly correct.
   */
  workboxOptions?: WorkboxTypes[keyof WorkboxTypes];
}

export interface FallbackRoutes {
  /**
   * Fallback route for document (pages).
   * @default
   *   ```js
   *   "/_offline" // or none if it doesn't exist.
   *   ```
   */
  document?: string;
  /**
   * Fallback route for data, defaults to none.
   * @default undefined
   */
  data?: string;
  /**
   * Fallback route for images, defaults to none.
   * @default undefined
   */
  image?: string;
  /**
   * Fallback route for audios, defaults to none.
   * @default undefined
   */
  audio?: string;
  /**
   * Fallback route for videos, defaults to none.
   * @default undefined
   */
  video?: string;
  /**
   * Fallback route for fonts, defaults to none.
   * @default undefined
   */
  font?: string;
}
