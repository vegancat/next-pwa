import path from "path";
import {
  findConfigFile,
  parseJsonConfigFileContent,
  readConfigFile,
  sys as tsSys,
} from "typescript";
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

export const loadTSConfig = (relativeTSConfigPath: string | undefined) => {
  // Find tsconfig.json file
  const tsConfigPath =
    findConfigFile(
      process.cwd(),
      tsSys.fileExists,
      relativeTSConfigPath ?? "tsconfig.json"
    ) ?? findConfigFile(process.cwd(), tsSys.fileExists, "jsconfig.json");

  if (!tsConfigPath) {
    return;
  }

  // Read tsconfig.json file
  const tsConfigFile = readConfigFile(tsConfigPath, tsSys.readFile);

  // Resolve extends
  const parsedTSConfig = parseJsonConfigFileContent(
    tsConfigFile.config,
    tsSys,
    path.dirname(tsConfigPath)
  );

  return parsedTSConfig;
};
