import { GenerateSWConfig } from "workbox-webpack-plugin";

export interface PluginOptions extends GenerateSWConfig {
  disable?: boolean;
  register?: boolean;
  dest?: string;
  sw?: string;
  swSrc?: string;
  cacheStartUrl?: boolean;
  dynamicStartUrl?: boolean;
  dynamicStartUrlRedirect?: string;
  publicExcludes?: string[];
  buildExcludes?: GenerateSWConfig["exclude"];
  fallbacks?: Fallbacks;
  cacheOnFrontEndNav?: boolean;
  scope?: string;
  customWorkerDir?: string;
  reloadOnOnline?: boolean;
  /** @deprecated Use `basePath` in `next.config.js` instead. */
  subdomainPrefix?: string;
}

export interface Fallbacks {
  document?: string;
  data?: string;
  image?: string;
  audio?: string;
  video?: string;
  font?: string;
}
