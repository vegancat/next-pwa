declare namespace globalThis {
  var fallback: (_: Request) => Promise<Response | undefined>;
}
