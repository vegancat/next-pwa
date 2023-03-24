import fs from "fs";
import path from "path";
import type { TsConfigJson as TSConfigJSON } from "type-fest";
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

export const loadTSConfig = (
  baseDir: string,
  relativeTSConfigPath: string | undefined
): TSConfigJSON | undefined => {
  try {
    // Find tsconfig.json file
    const tsConfigPath = findFirstTruthy(
      [relativeTSConfigPath ?? "tsconfig.json", "jsconfig.json"],
      (filePath) => {
        const resolvedPath = path.join(baseDir, filePath);
        return fs.existsSync(resolvedPath) ? resolvedPath : undefined;
      }
    );

    if (!tsConfigPath) {
      return undefined;
    }

    // Read tsconfig.json file
    const tsConfigFile = JSON.parse(fs.readFileSync(tsConfigPath, "utf-8"));

    return tsConfigFile;
  } catch {
    return undefined;
  }
};

export const findFirstTruthy = <T, U>(arr: T[], fn: (elm: T) => U) => {
  for (const i of arr) {
    const resolved = fn(i);
    if (resolved) {
      return resolved;
    }
  }
  return undefined;
};
