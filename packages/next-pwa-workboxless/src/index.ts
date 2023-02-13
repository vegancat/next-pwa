import type { NextConfig } from "next";
import type { Configuration, default as Webpack } from "webpack";

import { info } from "./logger.js";
import type { PluginOptions } from "./types.js";

const withPWAInit = (
  pluginOptions: PluginOptions = {}
): ((_?: NextConfig) => NextConfig) => {
  return (nextConfig: NextConfig = {}) => ({
    ...nextConfig,
    ...{
      webpack(config: Configuration, options) {
        //const isAppDirEnabled = !!nextConfig.experimental?.appDir;

        const { disable = false, register = true } = pluginOptions;

        const { dev } = options;

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

        if (dev) {
          info(
            "Building in development mode, caching and precaching are disabled for the most part. This means that offline support is disabled, but you can continue developing other functions in service worker."
          );
        }

        if (!config.plugins) {
          config.plugins = [];
        }

        config.plugins.push(
          new webpack.DefinePlugin({
            __PWA_ENABLE_REGISTER__: register.toString(),
          })
        );

        return config;
      },
    },
  });
};

export default withPWAInit;
