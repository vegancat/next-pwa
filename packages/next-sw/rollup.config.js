// @ts-check
/**
 * @typedef {Pick<
 *   import("rollup").RollupOptions,
 *   "input" | "output" | "external" | "plugins"
 * >} FileEntry
 */
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

const isDev = process.env.NODE_ENV !== "production";

/** @type {FileEntry[]} */
const files = [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/next-sw.cjs",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/next-sw.module.js",
        format: "esm",
      },
    ],
    // chalk should be bundled with the package to work with CJS.
    external: [
      "clean-webpack-plugin",
      "terser-webpack-plugin",
      "webpack",
      "semver",
    ],
  },
  {
    input: "src/build/generate-sw/base-sw.ts",
    output: {
      file: "dist/base-sw.js",
      format: "esm",
    },
  },
  {
    input: "src/sw-entry.ts",
    output: {
      file: "dist/sw-entry.js",
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
      nodeResolve({
        exportConditions: ["node"],
      }),
      typescript({
        noForceEmit: true,
        noEmitOnError: !isDev,
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
