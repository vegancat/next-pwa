import type { GenerateSW, InjectManifest } from "workbox-webpack-plugin";

import type {
  FullPluginOptions,
  GenerateSWPluginOptions,
  InjectManifestPluginOptions,
} from "./private_types";

export const overrideAfterCalledMethod = (
  workboxPlugin: InjectManifest | GenerateSW
) => {
  Object.defineProperty(workboxPlugin, "alreadyCalled", {
    get() {
      return false;
    },
    set() {
      // do nothing
    },
  });
};

export const isInjectManifestConfig = (
  config: FullPluginOptions
): config is InjectManifestPluginOptions => {
  return typeof config.swSrc === "string";
};

export const isGenerateSWConfig = (
  config: FullPluginOptions
): config is GenerateSWPluginOptions => {
  return !isInjectManifestConfig(config);
};
