import type { WebpackInjectManifestOptions } from "workbox-build";
import type { GenerateSWConfig } from "workbox-webpack-plugin";

export type WorkboxTypes = {
  GenerateSW: GenerateSWConfig & {
    swSrc?: undefined;
  };
  InjectManifest: WebpackInjectManifestOptions;
};
