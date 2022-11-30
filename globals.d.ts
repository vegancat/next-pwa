type GlobalFallback = (_: Request) => Promise<Response | undefined>;

declare global {
  var fallback: GlobalFallback;
}

export {};
