// @ts-check
/**
 * @typedef {{
 *   input: import("rollup").InputOption;
 *   output:
 *     | import("rollup").OutputOptions
 *     | import("rollup").OutputOptions[]
 *     | undefined;
 *   externalPackages?: import("rollup").ExternalOption;
 *   additionalPlugins?: import("rollup").InputPluginOption;
 * }} FileEntry
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
    externalPackages: [
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
    externalPackages: ["workbox-window"],
  },
];

export default files.map(
  ({ input, output, externalPackages, additionalPlugins }) =>
    defineConfig({
      input,
      output,
      external: externalPackages,
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
        ...[additionalPlugins ?? []],
      ],
    })
);
