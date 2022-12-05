import type { WebpackInjectManifestOptions } from "workbox-build";
import type { GenerateSWConfig } from "workbox-webpack-plugin";

import type { PluginOptions } from "./types";

export type GenerateSWPluginOptions = PluginOptions &
  GenerateSWConfig & {
    swSrc?: undefined;
  };

export type InjectManifestPluginOptions = PluginOptions &
  WebpackInjectManifestOptions;

export type FullPluginOptions =
  | GenerateSWPluginOptions
  | InjectManifestPluginOptions;
