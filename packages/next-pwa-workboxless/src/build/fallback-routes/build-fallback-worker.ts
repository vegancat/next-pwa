import { CleanWebpackPlugin } from "clean-webpack-plugin";
import fs from "fs";
import { createRequire } from "module";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import { fileURLToPath } from "url";
import webpack from "webpack";

import swcRc from "../../.swcrc.json";
import type { FallbackRoutes } from "../../types.js";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const require = createRequire(import.meta.url);

const getFallbackEnvs = ({
  fallbackRoutes,
  baseDir,
  id,
  pageExtensions,
  isAppDirEnabled,
}: {
  fallbackRoutes: FallbackRoutes;
  baseDir: string;
  id: string;
  pageExtensions: readonly string[];
  isAppDirEnabled: boolean;
}) => {
  let { data, document } = fallbackRoutes;

  (() => {
    if (!document) {
      let pagesDir = "";
      let appDir = "";

      if (isAppDirEnabled) {
        const rootAppDir = path.join(baseDir, "app");
        const srcAppDir = path.join(baseDir, "src/app");
        if (fs.existsSync(rootAppDir)) {
          appDir = rootAppDir;
        } else if (fs.existsSync(srcAppDir)) {
          appDir = srcAppDir;
        }
      }

      const rootPagesDir = path.join(baseDir, "pages");
      const srcPagesDir = path.join(baseDir, "src/pages");

      if (fs.existsSync(rootPagesDir)) {
        pagesDir = rootPagesDir;
      } else if (fs.existsSync(srcPagesDir)) {
        pagesDir = srcPagesDir;
      }

      if (!pagesDir && !appDir) {
        return;
      }

      for (const ext of pageExtensions) {
        const appDirOfflineFile = path.join(appDir, `_offline/page.${ext}`);
        const pagesDirOfflineFile = path.join(pagesDir, `_offline.${ext}`);
        if (
          (isAppDirEnabled && !!appDir && fs.existsSync(appDirOfflineFile)) ||
          (!!pagesDir && fs.existsSync(pagesDirOfflineFile))
        ) {
          document = "/_offline";
          return;
        }
      }
    }
  })();

  if (data && data.endsWith(".json")) {
    data = path.posix.join("/_next/data", id, data);
  }

  const envs = {
    __PWA_FALLBACK_DOCUMENT__: document || false,
    __PWA_FALLBACK_IMAGE__: fallbackRoutes.image || false,
    __PWA_FALLBACK_AUDIO__: fallbackRoutes.audio || false,
    __PWA_FALLBACK_VIDEO__: fallbackRoutes.video || false,
    __PWA_FALLBACK_FONT__: fallbackRoutes.font || false,
    __PWA_FALLBACK_DATA__: data || false,
  };

  if (Object.values(envs).filter((v) => !!v).length === 0) return;

  console.log(
    "> [PWA] This app will fallback to these precached routes when fetching from cache or network fails:"
  );

  if (envs.__PWA_FALLBACK_DOCUMENT__) {
    console.log(
      `> [PWA]   Documents (pages): ${envs.__PWA_FALLBACK_DOCUMENT__}`
    );
  }
  if (envs.__PWA_FALLBACK_IMAGE__) {
    console.log(`> [PWA]   Images: ${envs.__PWA_FALLBACK_IMAGE__}`);
  }
  if (envs.__PWA_FALLBACK_AUDIO__) {
    console.log(`> [PWA]   Audio: ${envs.__PWA_FALLBACK_AUDIO__}`);
  }
  if (envs.__PWA_FALLBACK_VIDEO__) {
    console.log(`> [PWA]   Videos: ${envs.__PWA_FALLBACK_VIDEO__}`);
  }
  if (envs.__PWA_FALLBACK_FONT__) {
    console.log(`> [PWA]   Fonts: ${envs.__PWA_FALLBACK_FONT__}`);
  }
  if (envs.__PWA_FALLBACK_DATA__) {
    console.log(
      `> [PWA]   Data (/_next/data/**/*.json): ${envs.__PWA_FALLBACK_DATA__}`
    );
  }

  return envs;
};

export const buildFallbackWorker = ({
  id,
  fallbackRoutes,
  baseDir,
  destDir,
  minify,
  pageExtensions,
  isAppDirEnabled,
}: {
  id: string;
  fallbackRoutes: FallbackRoutes;
  baseDir: string;
  destDir: string;
  minify: boolean;
  pageExtensions: string[];
  isAppDirEnabled: boolean;
}) => {
  const envs = getFallbackEnvs({
    fallbackRoutes,
    baseDir,
    id,
    pageExtensions,
    isAppDirEnabled,
  });
  if (!envs) return;

  const name = `fallback-${id}.js`;
  const fallbackJs = path.join(__dirname, `fallback.js`);

  webpack({
    mode: minify ? "production" : "development",
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
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [
          path.join(destDir, "fallback-*.js"),
          path.join(destDir, "fallback-*.js.map"),
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
      console.error(`> [PWA] Failed to build fallback worker.`);
      console.error(status?.toString({ colors: true }));
      process.exit(-1);
    }
  });

  return { name, precaches: Object.values(envs).filter((v) => !!v) };
};
