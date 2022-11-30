import { CleanWebpackPlugin } from "clean-webpack-plugin";
import fs from "fs";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import webpack from "webpack";

import type { Fallbacks } from "./types";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const getFallbackEnvs = ({
  fallbacks,
  basedir,
  id,
  pageExtensions,
}: {
  fallbacks: Fallbacks;
  basedir: string;
  id: string;
  pageExtensions: string[];
}) => {
  let { document, data } = fallbacks;

  if (!document) {
    let pagesDir = "";

    if (fs.existsSync(path.join(basedir, "pages"))) {
      pagesDir = path.join(basedir, "pages");
    } else if (fs.existsSync(path.join(basedir, "src", "pages"))) {
      pagesDir = path.join(basedir, "src", "pages");
    }

    if (!pagesDir) return;

    const offlines = pageExtensions
      .map((ext) => path.join(pagesDir, `_offline.${ext}`))
      .filter((entry) => fs.existsSync(entry));
    if (offlines.length === 1) {
      document = "/_offline";
    }
  }

  if (data && data.endsWith(".json")) {
    data = path.posix.join("/_next/data", id, data);
  }

  const envs = {
    __PWA_FALLBACK_DOCUMENT__: document,
    __PWA_FALLBACK_IMAGE__: fallbacks.image,
    __PWA_FALLBACK_AUDIO__: fallbacks.audio,
    __PWA_FALLBACK_VIDEO__: fallbacks.video,
    __PWA_FALLBACK_FONT__: fallbacks.font,
    __PWA_FALLBACK_DATA__: data,
  };

  if (Object.values(envs).filter((v) => !!v).length === 0) return;

  console.log(
    "> [PWA] Fallback to precache routes when fetch failed from cache or network:"
  );
  if (envs.__PWA_FALLBACK_DOCUMENT__)
    console.log(`> [PWA]   document (page): ${envs.__PWA_FALLBACK_DOCUMENT__}`);
  if (envs.__PWA_FALLBACK_IMAGE__)
    console.log(`> [PWA]   image: ${envs.__PWA_FALLBACK_IMAGE__}`);
  if (envs.__PWA_FALLBACK_AUDIO__)
    console.log(`> [PWA]   audio: ${envs.__PWA_FALLBACK_AUDIO__}`);
  if (envs.__PWA_FALLBACK_VIDEO__)
    console.log(`> [PWA]   video: ${envs.__PWA_FALLBACK_VIDEO__}`);
  if (envs.__PWA_FALLBACK_FONT__)
    console.log(`> [PWA]   font: ${envs.__PWA_FALLBACK_FONT__}`);
  if (envs.__PWA_FALLBACK_DATA__)
    console.log(
      `> [PWA]   data (/_next/data/**/*.json): ${envs.__PWA_FALLBACK_DATA__}`
    );

  return envs;
};

const buildFallbackWorker = ({
  id,
  fallbacks,
  basedir,
  destdir,
  minify,
  pageExtensions,
}: {
  id: string;
  fallbacks: Fallbacks;
  basedir: string;
  destdir: string;
  minify: boolean;
  pageExtensions: string[];
}) => {
  const envs = getFallbackEnvs({ fallbacks, basedir, id, pageExtensions });
  if (!envs) return;

  const name = `fallback-${id}.js`;
  const fallbackJs = path.join(__dirname, `fallback.js`);

  webpack({
    mode: "none",
    target: "webworker",
    entry: {
      main: fallbackJs,
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
    module: {
      rules: [
        {
          test: /\.js$/i,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "next/babel",
                    {
                      "transform-runtime": {
                        corejs: false,
                        helpers: true,
                        regenerator: false,
                        useESModules: true,
                      },
                      "preset-env": {
                        modules: false,
                        targets: "chrome >= 56",
                      },
                    },
                  ],
                ],
              },
            },
          ],
        },
      ],
    },
    output: {
      path: destdir,
      filename: name,
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(destdir, "fallback-*.js"),
          path.join(destdir, "fallback-*.js.map"),
        ],
      }),
      new webpack.EnvironmentPlugin(envs),
    ],
    optimization: minify
      ? {
          minimize: true,
          minimizer: [new TerserPlugin()],
        }
      : undefined,
  }).run((error, status) => {
    if (error || status?.hasErrors()) {
      console.error(`> [PWA] Failed to build fallback worker`);
      console.error(status?.toString({ colors: true }));
      process.exit(-1);
    }
  });

  return { fallbacks, name, precaches: Object.values(envs).filter((v) => !!v) };
};

export default buildFallbackWorker;
