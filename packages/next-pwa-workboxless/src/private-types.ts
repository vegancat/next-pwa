export type StrategyName =
  | "CacheFirst"
  | "CacheOnly"
  | "NetworkFirst"
  | "NetworkOnly"
  | "StaleWhileRevalidate";

type UrlPattern = RegExp | string | ((request: Request) => boolean);

export interface RuntimeCaching {
  urlPattern: UrlPattern;
  handler: StrategyName;
  method?: string;
  options?: {
    cacheName?: string;
    expiration?: {
      maxEntries?: number;
      maxAgeSeconds?: number;
    };
  };
}
