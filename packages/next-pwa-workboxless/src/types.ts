export interface PluginOptions {
  /**
   * Disable PWA. Set to `true` to completely disable PWA, set to `false` to
   * generate service worker in both dev and prod.
   *
   * @default false
   */
  disable?: boolean;
  /**
   * Toggle logging in service worker. By default it is only enabled in dev.
   *
   * @default context.dev
   */
  logging?: boolean;
  /**
   * Set output directory for service worker. Relative to Next.js's root
   * directory.
   *
   * @default "public"
   */
  dest?: string;
  /**
   * Allow this plugin to automatically register the service worker for you. Set
   * this to `false` when you want to register the service worker yourself.
   *
   * @default true
   */
  register?: boolean;
  /**
   * Config precached routes to fallback when both cache and network are not
   * available to serve resources. If you just need a offline fallback page,
   * simply create a `/_offline.tsx` file in your `pages/` dir or a
   * `/~offline/page.tsx` file in your `app/` dir and you are all set, no
   * configuration necessary.
   */
  fallbackRoutes?: FallbackRoutes;
  /**
   * TODO: add JSDoc.
   */
  swSrc?: string;
  /**
   * TODO: add JSDoc.
   */
  skipWaiting?: boolean;
}

export interface FallbackRoutes {
  /**
   * Fallback route for document (pages).
   *
   * @default
   *   ```js
   *   "/_offline" // or none if it doesn't exist.
   *   ```
   */
  document?: string;
  /**
   * Fallback route for data, defaults to none.
   *
   * @default undefined
   */
  data?: string;
  /**
   * Fallback route for images, defaults to none.
   *
   * @default undefined
   */
  image?: string;
  /**
   * Fallback route for audios, defaults to none.
   *
   * @default undefined
   */
  audio?: string;
  /**
   * Fallback route for videos, defaults to none.
   *
   * @default undefined
   */
  video?: string;
  /**
   * Fallback route for fonts, defaults to none.
   *
   * @default undefined
   */
  font?: string;
}
