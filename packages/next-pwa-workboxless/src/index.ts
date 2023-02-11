import type { NextConfig } from "next";
import type { Configuration, default as Webpack } from "webpack";

import type { PluginOptions } from "./types.js";

export const withPWAInit = (
  pluginOptions: PluginOptions
): ((_?: NextConfig) => NextConfig) => {
  return (nextConfig: NextConfig = {}) => ({
    ...nextConfig,
    ...{
      webpack(config: Configuration, options) {
        //const isAppDirEnabled = !!nextConfig.experimental?.appDir;

        const { disable = false, register = true } = pluginOptions;

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
          options.isServer && console.log("> [PWA] PWA support is disabled.");
          return config;
        }

        console.log(
          `> [PWA] Compiling for ${
            options.isServer ? "server" : "client (static)"
          }...`
        );

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
