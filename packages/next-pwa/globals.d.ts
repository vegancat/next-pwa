declare namespace globalThis {
  interface Window {
    fallback: (_: Request) => Promise<Response | undefined>;
  }
}
