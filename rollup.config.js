// @ts-check
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    format: "cjs",
  },
  plugins: [
    typescript({
      noForceEmit: true,
      noEmitOnError: true,
      outDir: "dist",
      declaration: true,
    }),
    terser(),
  ],
  external: [
    "clean-webpack-plugin",
    "terser-webpack-plugin",
    "webpack",
    "fs",
    "path",
    "crypto",
    "globby",
    "workbox-window",
  ],
});
