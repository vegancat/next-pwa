// @ts-check
/**
 * @typedef {Pick<
 *   import("rollup").RollupOptions,
 *   "input" | "output" | "external" | "plugins"
 * >} FileEntry
 */
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

/** @type {readonly FileEntry[]} */
const files = [
  {
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
  },
  {
    input: "src/fallback.ts",
    output: {
      file: "dist/fallback.js",
      format: "cjs",
    },
  },
  {
    input: "src/register.ts",
    output: {
      file: "dist/register.js",
      format: "esm",
    },
    external: ["workbox-window"],
  },
];

export default files.map(({ input, output, external, plugins }) =>
  defineConfig({
    input,
    output,
    external,
    watch: {
      chokidar: {
        usePolling: false,
      },
    },
    plugins: [
      typescript({
        noForceEmit: true,
        noEmitOnError: true,
        outDir: "dist",
        declaration: true,
        noEmit: false,
      }),
      json(),
      ...[process.env.NODE_ENV === "production" ? [terser()] : []],
      ...[plugins ?? []],
    ],
  })
);
