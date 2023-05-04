import type { RuntimeCaching } from "../../types.js";

export const runtimeCachingConverter = (runtimeCaching: RuntimeCaching[]) =>
  `[${runtimeCaching
    .map((entry) => {
      if (!entry.urlPattern) {
        throw new Error("You must define urlPattern (runtimeCaching).");
      }

      if (!entry.handler) {
        throw new Error("You must define handler (runtimeCaching).");
      }

      if (
        entry.options &&
        (entry.options as any).networkTimeoutSeconds &&
        entry.handler !== "NetworkFirst"
      ) {
        throw new Error(
          "options.networkTimeoutSeconds must be used with NetworkFirst (runtimeCaching)."
        );
      }

      const entryUrlPattern =
        typeof entry.urlPattern === "string"
          ? `"${entry.urlPattern}"`
          : entry.urlPattern.toString();

      const entryHandler =
        typeof entry.handler === "string"
          ? `"${entry.handler}"`
          : entry.handler.toString();

      const entryMethod = !entry.method ? "undefined" : `"${entry.method}"`;

      return `{urlPattern:${entryUrlPattern},handler:${entryHandler},method:${entryMethod},options:${JSON.stringify(
        entry.options
      )}}`;
    })
    .join(",")}]`;
