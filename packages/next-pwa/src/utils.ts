import fs from "fs";
import type { GenerateSW, InjectManifest } from "workbox-webpack-plugin";

import type { WorkboxTypes } from "./private_types.js";

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
  config: WorkboxTypes[keyof WorkboxTypes] | undefined
): config is WorkboxTypes["InjectManifest"] => {
  return typeof config !== "undefined" && typeof config.swSrc === "string";
};

export const isGenerateSWConfig = (
  config: WorkboxTypes[keyof WorkboxTypes] | undefined
): config is WorkboxTypes["GenerateSW"] => {
  return !isInjectManifestConfig(config);
};

export const addPathAliasesToSWC = (
  config: any,
  baseDir: string,
  paths: Record<string, string[]>
) => {
  config.jsc.baseUrl = baseDir;
  config.jsc.paths = paths;
};

export const loadJSON = <T = unknown>(filePath: string): T | undefined => {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return undefined;
  }
};
