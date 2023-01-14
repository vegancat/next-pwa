import { CleanWebpackPlugin } from "clean-webpack-plugin";
import fs from "fs";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import type { Configuration } from "webpack";
import webpack from "webpack";

import swcRc from "./.swcrc.json";

const buildCustomWorker = ({
  id,
  baseDir,
  customWorkerDir,
  destDir,
  plugins,
  minify,
}: {
  id: string;
  baseDir: string;
  customWorkerDir: string;
  destDir: string;
  plugins: Configuration["plugins"];
  minify: boolean;
}) => {
  let workerDir = "";

  const rootWorkerDir = path.join(baseDir, customWorkerDir);
  const srcWorkerDir = path.join(baseDir, "src", customWorkerDir);

  if (fs.existsSync(rootWorkerDir)) {
    workerDir = rootWorkerDir;
  } else if (fs.existsSync(srcWorkerDir)) {
    workerDir = srcWorkerDir;
  }

  if (!workerDir) return;

  const name = `worker-${id}.js`;
  const customWorkerEntries = ["ts", "js"]
    .map((ext) => path.join(workerDir, `index.${ext}`))
    .filter((entry) => fs.existsSync(entry));

  if (customWorkerEntries.length === 0) return;

  if (customWorkerEntries.length > 1) {
    console.warn(
      `> [PWA] WARNING: More than one custom worker found (${customWorkerEntries.join(
        ","
      )}), a custom worker will not be built.`
    );
    return;
  }

  const customWorkerEntry = customWorkerEntries[0];
  console.log(`> [PWA] Custom worker found: ${customWorkerEntry}`);
  console.log(`> [PWA] Building custom worker: ${path.join(destDir, name)}...`);

  webpack({
    mode: minify ? "production" : "development",
    target: "webworker",
    entry: {
      main: customWorkerEntry,
    },
    resolve: {
      extensions: [".ts", ".js"],
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
    plugins: (
      [
        new CleanWebpackPlugin({
          cleanOnceBeforeBuildPatterns: [
            path.join(destDir, "worker-*.js"),
            path.join(destDir, "worker-*.js.map"),
          ],
        }),
      ] as NonNullable<Configuration["plugins"]>
    ).concat(plugins ?? []),
    optimization: minify
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : undefined,
  }).run((error, status) => {
    if (error || status?.hasErrors()) {
      console.error(`> [PWA] Failed to build custom worker.`);
      console.error(status?.toString({ colors: true }));
      process.exit(-1);
    }
  });

  return name;
};

export default buildCustomWorker;
