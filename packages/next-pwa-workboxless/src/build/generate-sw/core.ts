import { createRequire } from "module";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import type { Configuration, default as Webpack } from "webpack";

import swcRc from "../../.swcrc.json";
import { error } from "../../logger.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);

export interface GenerateSWConfig {
  id: string;
  destDir: string;
  mode?: Configuration["mode"];
  minify?: boolean;
  /**
   * A list of JavaScript files that should be passed to `importScripts()` inside
   * the generated service worker file. This is useful when you want to let
   * `next-pwa` create your top-level service worker file, but want to include some
   * additional code, such as a push event listener.
   */
  importScripts?: string[];
  skipWaiting: boolean;
}

export const generateSW = ({
  webpackInstance: webpack,
  destDir,
  mode,
  minify,
  importScripts,
  skipWaiting,
}: GenerateSWConfig & {
  webpackInstance?: typeof Webpack;
}) => {
  if (!webpack) {
    error("Webpack instance is not provided to generateSW.");
    return;
  }

  const name = "sw.js";
  const swJs = path.join(__dirname, "base-sw.js");

  webpack({
    mode,
    target: "webworker",
    entry: {
      main: swJs,
    },
    resolve: {
      extensions: [".js"],
      fallback: {
        module: false,
        dgram: false,
        dns: false,
        path: false,
        fs: false,
        os: false,
        crypto: false,
        stream: false,
        http2: false,
        net: false,
        tls: false,
        zlib: false,
        child_process: false,
      },
    },
    resolveLoader: {
      alias: {
        "swc-loader": require.resolve("swc-loader"),
      },
    },
    module: {
      rules: [
        {
          test: /\.(t|j)s$/i,
          use: [
            {
              loader: "swc-loader",
              options: swcRc,
            },
          ],
        },
      ],
    },
    output: {
      path: destDir,
      filename: name,
    },
    plugins: [
      new webpack.DefinePlugin({
        __PWA_IMPORT_SCRIPTS__: JSON.stringify(importScripts),
        __PWA_SKIP_WAITING__: skipWaiting.toString(),
      }),
    ],
    optimization: minify
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : undefined,
  }).run((err, status) => {
    if (err || status?.hasErrors()) {
      error("Failed to build service worker.");
      error(status?.toString({ colors: true }));
      process.exit(-1);
    }
  });
};
