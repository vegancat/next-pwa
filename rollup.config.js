// @ts-check
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default [
  defineConfig({
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
    plugins: [
      typescript({
        noForceEmit: true,
        noEmitOnError: true,
        outDir: "dist",
        declaration: true,
        noEmit: false,
      }),
      ...[process.env.NODE_ENV === "production" ? [terser()] : []],
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
  }),
  defineConfig({
    input: "src/register.js",
    output: {
      file: "dist/register.js",
      format: "esm",
    },
    plugins: [...[process.env.NODE_ENV === "production" ? [terser()] : []]],
    external: ["workbox-window"],
  }),
];
