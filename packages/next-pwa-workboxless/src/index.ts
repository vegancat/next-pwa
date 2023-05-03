import type { NextConfig } from "next";
import path from "path";
import type { Configuration, default as Webpack } from "webpack";

import { buildFallbackWorker } from "./build/fallback-routes/index.js";
import type { GenerateSWConfig } from "./build/generate-sw/index.js";
import { GenerateSW } from "./build/generate-sw/index.js";
import * as logger from "./logger.js";
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
          context.isServer && logger.info("PWA support is disabled.");
          return config;
        }

        logger.info(
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

        const swEntryJs = path.join(__dirname, "sw-entry.js");
        const entry = config.entry as () => Promise<
          Record<string, string[] | string>
        >;
        config.entry = () =>
          entry().then((entries) => {
            if (entries["main.js"] && !entries["main.js"].includes(swEntryJs)) {
              if (Array.isArray(entries["main.js"])) {
                entries["main.js"].unshift(swEntryJs);
              } else if (typeof entries["main.js"] === "string") {
                entries["main.js"] = [swEntryJs, entries["main.js"]];
              }
            }
            if (
              entries["main-app"] &&
              !entries["main-app"].includes(swEntryJs)
            ) {
              if (Array.isArray(entries["main-app"])) {
                entries["main-app"].unshift(swEntryJs);
              } else if (typeof entries["main-app"] === "string") {
                entries["main-app"] = [swEntryJs, entries["main-app"]];
              }
            }
            return entries;
          });

        if (!context.isServer) {
          if (dev && !warnedAboutDev) {
            logger.info(
              "Building in development mode. Caching and precaching are mostly disabled, but you can continue developing other functions in the service worker."
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
