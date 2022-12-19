// @ts-check
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
global.__filename = __filename;

const commonConfig = defineConfig({
  watch: {
    chokidar: {
      usePolling: false,
    },
  },
});

/** @type {import("rollup").InputPluginOption} */
const plugins = [
  typescript({
    noForceEmit: true,
    noEmitOnError: true,
    outDir: "dist",
    declaration: true,
    noEmit: false,
  }),
  ...[process.env.NODE_ENV === "production" ? [terser()] : []],
];

export default [
  defineConfig({
    ...commonConfig,
    input: "src/index.ts",
    output: [
      {
        file: "dist/ducanh2912-next-pwa.cjs",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/ducanh2912-next-pwa.modern.mjs",
        format: "esm",
      },
      {
        file: "dist/ducanh2912-next-pwa.module.js",
        format: "esm",
      },
    ],
    plugins,
    external: [
      "clean-webpack-plugin",
      "terser-webpack-plugin",
      "workbox-webpack-plugin",
      "webpack",
      "crypto",
      "fs",
      "path",
      "url",
      "fast-glob",
      "workbox-window",
    ],
  }),
  defineConfig({
    ...commonConfig,
    input: "src/fallback.ts",
    output: {
      file: "dist/fallback.js",
      format: "cjs",
    },
    plugins,
  }),
  defineConfig({
    ...commonConfig,
    input: "src/register.ts",
    output: {
      file: "dist/register.js",
      format: "esm",
    },
    plugins,
    external: ["workbox-window"],
  }),
];
