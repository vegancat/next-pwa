import type { NextConfig } from "next";
import path from "path";
import type { Configuration, default as Webpack } from "webpack";

import { buildFallbackWorker } from "./build/fallback-routes/index.js";
import type { GenerateSWConfig } from "./build/generate-sw/index.js";
import { GenerateSW } from "./build/generate-sw/index.js";
import { info } from "./logger.js";
import type { PluginOptions } from "./types.js";

let warnedAboutDev = false;

const withPWAInit = (
  pluginOptions: PluginOptions = {}
): ((_?: NextConfig) => NextConfig) => {
  return (nextConfig = {}) => ({
    ...nextConfig,
    ...{
      webpack(config: Configuration, options) {
        const isAppDirEnabled = !!nextConfig.experimental?.appDir;

        const {
          disable = false,
          dest = "public",
          fallbackRoutes = {},
          register = true,
        } = pluginOptions;

        const {
          buildId,
          dev,
          config: { pageExtensions = ["tsx", "ts", "jsx", "js", "mdx"] },
        } = options;

        const webpack: typeof Webpack = options.webpack;

        let basePath = options.config.basePath;

        // basePath can be an empty string.
        if (!basePath) {
          basePath = "/";
        }

        if (typeof nextConfig.webpack === "function") {
          config = nextConfig.webpack(config, options);
        }

        if (disable) {
          options.isServer && info("PWA support is disabled.");
          return config;
        }

        info(
          `Compiling for ${options.isServer ? "server" : "client (static)"}...`
        );

        if (dev && !warnedAboutDev) {
          info(
            "Building in development mode, caching and precaching are disabled for the most part. This means that offline support is disabled, but you can continue developing other functions in service worker."
          );
          warnedAboutDev = true;
        }

        if (!config.plugins) {
          config.plugins = [];
        }

        const resolvedDest = path.join(options.dir, dest);

        const importScripts: GenerateSWConfig["importScripts"] = [];

        if (fallbackRoutes) {
          const res = buildFallbackWorker({
            id: buildId,
            fallbackRoutes,
            baseDir: options.dir,
            destDir: resolvedDest,
            minify: !dev,
            pageExtensions,
            isAppDirEnabled,
          });
          if (res) {
            importScripts.unshift(res.name);
          }
        }

        config.plugins.push(
          new webpack.DefinePlugin({
            __PWA_ENABLE_REGISTER__: register.toString(),
          }),
          new GenerateSW({
            id: buildId,
            destDir: resolvedDest,
            importScripts,
          })
        );

        return config;
      },
    },
  });
};

export default withPWAInit;
