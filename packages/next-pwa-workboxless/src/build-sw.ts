import { createRequire } from "module";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import webpack from "webpack";

import swcRc from "./.swcrc.json";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);

export const buildSW = ({
  id,
  destDir,
  minify,
}: {
  id: string;
  baseDir: string;
  destDir: string;
  minify: boolean;
}) => {
  const name = `fallback-${id}.js`;
  const swJs = path.join(__dirname, `sw.js`);

  webpack({
    mode: minify ? "production" : "development",
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
    optimization: minify
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : undefined,
  }).run((error, status) => {
    if (error || status?.hasErrors()) {
      console.error(`> [PWA] Failed to build fallback worker.`);
      console.error(status?.toString({ colors: true }));
      process.exit(-1);
    }
  });
};
