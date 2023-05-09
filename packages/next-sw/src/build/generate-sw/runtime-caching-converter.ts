import type { RuntimeCaching } from "../../types.js";

const getRequiredOptionErrorMessage = (
  optionName: string,
  entryCacheName: string | undefined
) =>
  `${optionName} is a required option in runtimeCaching! ${
    entryCacheName ? `(entry's cacheName: ${entryCacheName})` : ""
  }`;

/**
 * Stringify runtimeCaching so that it can be inlined.
 * @param runtimeCaching
 * @returns
 */
export const runtimeCachingConverter = (runtimeCaching: RuntimeCaching[]) =>
  `[${runtimeCaching
    .map((entry) => {
      if (!entry.urlPattern) {
        throw new Error(
          getRequiredOptionErrorMessage("urlPattern", entry.options?.cacheName)
        );
      }

      if (!entry.handler) {
        throw new Error(
          getRequiredOptionErrorMessage("handler", entry?.options?.cacheName)
        );
      }

      if (
        entry.options &&
        entry.options.networkTimeoutSeconds &&
        entry.handler !== "NetworkFirst" &&
        entry.handler !== "NetworkOnly"
      ) {
        throw new Error(
          "options.networkTimeoutSeconds can only be used with NetworkFirst or NetworkOnly (runtimeCaching)."
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
