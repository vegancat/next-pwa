import type { StringKeyOf } from "./src/private_types.js";

declare global {
  interface Window {
    fallback: (_: Request) => Promise<Response | undefined>;
  }
  interface ObjectConstructor {
    keys<T>(o: T): StringKeyOf<T>[];
  }
}
