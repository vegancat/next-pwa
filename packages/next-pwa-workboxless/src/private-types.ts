export type StrategyName =
  | "CacheFirst"
  | "CacheOnly"
  | "NetworkFirst"
  | "NetworkOnly"
  | "StaleWhileRevalidate";

type UrlPattern =
  | RegExp
  | string
  | ((_: { request: Request; url: URL; sameOrigin: boolean }) => boolean);

export interface RuntimeCaching {
  urlPattern: UrlPattern;
  handler: StrategyName | ((request: Request) => Response);
  method?: string;
  options?: {
    cacheName?: string;
    expiration?: {
      maxEntries?: number;
      maxAgeSeconds?: number;
    };
  };
}

export type StringKeyOf<BaseType> = `${Extract<
  keyof BaseType,
  string | number
>}`;
