import type {
  Compilation,
  Compiler,
  default as Webpack,
  WebpackError,
} from "webpack";

import type { FilterEntry } from "../../types.js";
import type { GenerateSWConfig } from "./core.js";
import { generateSW } from "./core.js";
import { getManifestEntriesFromCompilation } from "./get-manifest-entries-from-compilation.js";

const generatedAssetNames = new Set<string>();

export interface GenerateSWWebpackConfig extends GenerateSWConfig {
  include?: FilterEntry[];
  exclude?: FilterEntry[];
}

export class GenerateSW {
  protected config: GenerateSWWebpackConfig & {
    webpackInstance?: typeof Webpack;
  };

  protected propagateConfigWithCompiler(compiler: Compiler): void {
    // Properties that are already set take precedence over derived
    // properties from the compiler.
    this.config = Object.assign(
      {
        mode: compiler.options.mode,
        webpackInstance: compiler.webpack,
      },
      this.config
    );
  }

  /**
   * @param compilation The webpack compilation.
   */
  protected async addAssets(compilation: Compilation): Promise<void> {
    const config = this.config;

    if (!config.exclude) {
      config.exclude = [];
    }

    // Ensure that we don't precache any of the assets generated by *any*
    // instance of this plugin.
    config.exclude.push(({ asset }) => generatedAssetNames.has(asset.name));

    const { sortedEntries } = await getManifestEntriesFromCompilation(
      compilation,
      config
    );

    config.manifestEntries = sortedEntries;

    generateSW(config);
  }

  /**
   * Creates an instance of GenerateSW.
   */
  constructor(config: GenerateSWWebpackConfig) {
    this.config = config;
  }

  /**
   * @param compiler Default compiler object passed from webpack
   */
  apply(compiler: Compiler): void {
    this.propagateConfigWithCompiler(compiler);

    const { PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER } =
      compiler.webpack.Compilation;

    compiler.hooks.thisCompilation.tap(this.constructor.name, (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: "GenerateSW",
          stage: PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER - 10,
        },
        () =>
          this.addAssets(compilation).catch((error: WebpackError) => {
            compilation.errors.push(error);
          })
      );
    });
  }
}