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
      webpack(config: Configuration, context) {
        const isAppDirEnabled = !!nextConfig.experimental?.appDir;
        const {
          buildId,
          dev,
          config: { pageExtensions = ["tsx", "ts", "jsx", "js", "mdx"] },
        } = context;

        const webpack: typeof Webpack = context.webpack;

        let basePath = context.config.basePath;

        // basePath can be an empty string.
        if (!basePath) {
          basePath = "/";
        }

        const {
          disable = false,
          dest = "public",
          fallbackRoutes = {},
          logging = dev,
          register = true,
          skipWaiting = true,
        } = pluginOptions;

        if (typeof nextConfig.webpack === "function") {
          config = nextConfig.webpack(config, context);
        }

        if (disable) {
          context.isServer && info("PWA support is disabled.");
          return config;
        }

        info(
          `Compiling for ${context.isServer ? "server" : "client (static)"}...`
        );

        if (!config.plugins) {
          config.plugins = [];
        }

        config.plugins.push(
          new webpack.DefinePlugin({
            __PWA_ENABLE_REGISTER__: register.toString(),
            __PWA_ENABLE_LOGGING__: logging.toString(),
          })
        );

        if (!context.isServer) {
          if (dev && !warnedAboutDev) {
            info(
              "Building in development mode, caching and precaching are disabled for the most part. This means that offline support is disabled, but you can continue developing other functions in service worker."
            );
            warnedAboutDev = true;
          }
          const resolvedDest = path.join(context.dir, dest);
          const importScripts: GenerateSWConfig["importScripts"] = [];

          if (fallbackRoutes) {
            const res = buildFallbackWorker({
              webpackInstance: webpack,
              id: buildId,
              fallbackRoutes,
              baseDir: context.dir,
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
            new GenerateSW({
              id: buildId,
              destDir: resolvedDest,
              minify: !dev,
              importScripts,
              runtimeCaching: [],
              skipWaiting,
            })
          );
        }

        return config;
      },
    },
  });
};

export default withPWAInit;
