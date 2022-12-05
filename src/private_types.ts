import type { WebpackInjectManifestOptions } from "workbox-build";
import type { GenerateSWConfig } from "workbox-webpack-plugin";

type Impossible<K extends keyof any> = { [P in K]?: never };

type GenerateSWOverrideJSDoc = {
  /**
   * Note: This plugin changes the default to `true`.
   *
   * @default true ("next-pwa")
   */
  skipWaiting?: GenerateSWConfig["skipWaiting"];
  /**
   * Note: This plugin changes the default to `true`.
   *
   * @default true ("next-pwa")
   */
  clientsClaim?: GenerateSWConfig["clientsClaim"];
  /**
   * Note: This plugin changes the default to `true`.
   *
   * @default true ("next-pwa")
   */
  cleanUpOutdatedCaches?: GenerateSWConfig["cleanupOutdatedCaches"];
  /** Note: This plugin changes the default to `[]`. */
  ignoreURLParametersMatching?: GenerateSWConfig["ignoreURLParametersMatching"];
};

export type WorkboxTypes = {
  GenerateSW: Impossible<
    Exclude<
      keyof WebpackInjectManifestOptions,
      Extract<keyof GenerateSWConfig, keyof WebpackInjectManifestOptions>
    >
  > &
    GenerateSWConfig &
    GenerateSWOverrideJSDoc;
  InjectManifest: Impossible<
    Exclude<
      keyof GenerateSWConfig,
      Extract<keyof WebpackInjectManifestOptions, keyof GenerateSWConfig>
    >
  > &
    WebpackInjectManifestOptions;
};
