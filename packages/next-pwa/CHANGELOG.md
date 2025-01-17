# @ducanh2912/next-pwa

## 8.4.1

### Patch Changes

- 5c37579: fix(next-pwa): removed ignoreVary for pages-rsc

## 8.4.0

### Minor Changes

- 6f73e23: Feat: change logging style based on Next's version

## 8.3.0

### Minor Changes

- 537566f: chore(deps): monthly dependencies maintenance
- 537566f: feat(logging): use chalk with console.log

  - Log with `info  -`, `warn  -`, `error -`, `wait  -` to match Next's style of logging.

  - chalk is bundled with the package so there shouldn't be any compatibility issue.

## 8.2.0

### Minor Changes

- 8421d6d: feat(fallbackRoutes): enable the fallback worker when `app/~offline/page.js` is found

  - This also adds a warning about Next.js appDir ignoring folders prefixed by underscore and suggests migrating to /~offline when /\_offline is found.

## 8.1.1

### Patch Changes

- 7e5a838: refactor(core): use .swcrc instead of Next's webpack.config.resolve for path aliases.

## 8.1.0

### Minor Changes

- 172eebf: feat(deps): `next-pwa` no longer requires `swc-loader` to be manually installed

  - This package now installs `swc-loader` on its own, and then resolve it using `require.resolve`.

- 172eebf: chore(docs): isolated parts of README.md into SETUP.md for better docs maintenance

  - I found scrolling through README.md to be quite a pain, so I've isolated parts of it into a new file again.

### Patch Changes

- 172eebf: chore(deps): monthly dependencies maintenance

  - Though I've been quite busy recently with Next.js itself (tons of typedRoutes PRs) and my own stuff, I've promised to always perform a monthly dependencies maintenance.

  - `examples/basic` has migrated from `<head />` to metadata with this.

## 8.0.0

### Major Changes

- 73a4f26: BREAKING CHANGE(typescript): renamed Fallbacks to FallbackRoutes, /register to /workbox.

  - Some JSDoc has also been added to FallbackRoutes.

  - Changing /register to /workbox should have minimal impact, you only need to change `"@ducanh2912/next-pwa/register"` in `compilerOptions.types` to `"@ducanh2912/next-pwa/worker"`

  BREAKING CHANGE(PluginOptions): removed `PluginOptions.exclude`.

  - You should use `PluginOptions.buildExcludes` instead. It is almost the same as `PluginOptions.exclude`, except for the fact that it doesn't override the plugin's `exclude` function, which is used to exclude files that shouldn't/can't be precached.

  style(code): renamed `register.ts` to `sw-entry.ts`.

  - I think this name conveys the meaning of the file better, as it doesn't only register the SW but also handles some of the plugin's features.

  **NOTES**: How to upgrade:

  - Change `"@ducanh2912/next-pwa/register"` in your `tsconfig.json`'s `compilerOptions.types` to `"@ducanh2912/next-pwa/worker"`.

  - Change `exclude` to `buildExcludes` like so:

  ```js
  import withPWAInit from "@ducanh2912/next-pwa";

  const withPWA = withPWAInit({
    // your other options,
    exclude: [],
  });

  export default withPWA({
    // your Next config
  });
  ```

  to

  ```js
  import withPWAInit from "@ducanh2912/next-pwa";

  const withPWA = withPWAInit({
    // your other options,
    buildExcludes: [],
  });

  export default withPWA({
    // your Next config
  });
  ```

  - If you have used the interface `Fallbacks` somewhere in your code, just change it to `FallbackRoutes`.

### Minor Changes

- 0646231: feat(core): support for path aliases in custom worker

  - This does it by copying Next.js's `webpackConfig.resolve` into custom worker's Webpack config.

### Patch Changes

- 4172cd0: chore(deps, code): updated all deps, cleaned up some code, removed subdomainPrefix.

  - This will remove subdomainPrefix from types.ts, but it will only trigger TS if you still have that option, because it stopped doing anything ages ago.

  - Cleaned up some code while I was finding a way to better support offline.

## 7.3.3

### Patch Changes

- ecc1fe7: fix(core): fixed user's webpack config being overridden if the plugin is disabled

  - Before this patch, the plugin used to override user-defined or other plugins' Webpack custom config because it early returned the config (without calling `nextConfig.webpack?.()`) if it was disabled. This fixes it by calling `nextConfig.webpack?.()` before doing anything else.

  chore(types): changed `compilerOptions.moduleResolution` to `"nodeNext"`.

  - This shouldn't impact users. It is only meant to force me to write `.js` at the end of import paths and stuff.

  docs(README): refined main README.md

  - Rewrote README.md to fix grammar issues and decouple tips into TIPS.md. I also fixed/removed some broken links.

  chore(deps): ran deps:update-all

  - Nothing too special...

## 7.3.2

### Patch Changes

- 1bcc70c: docs(types.ts): fixed links, added example for `PluginOptions.register`, `PluginOptions.buildExcludes`.

  - This patch add an example of registering the SW on your own with `register: false` and an example of how `buildExcludes` should look like.
  - It also removed an invalid link (which led to Github's 404 page) and an old link (which led to a deprecated example).

  chore(deps): ran deps:update-all.

  - To clarify the previous patch's message, this is meant to be done at least once a month, but it can be done anytime.

  style(code): cleaned up index.ts.

  - Replaced `_fallbacks` with `hasFallbacks` as copying `pluginOptions.fallbacks` just to indicate that the user did use this feature wasn't really necessary, and can be simplified to using a boolean.

## 7.3.1

### Patch Changes

- 8274a95:

  fix(deps): moved swc-loader to `devDependencies` and `peerDependencies`, added note that reminds users to install swc-loader when using fallbacks and custom worker in `PluginOptions`.

  - swc-loader being in `dependencies` didn't do anything as webpack wants it declared in the user's `package.json`, so I moved it to `devDependencies` and added it to `peerDependencies` (optional).

  docs(README): fixed example `create-next-app` command (added --example flag).

  - Before this change it wasn't a really valid command; while `create-next-app` does run, it will crash on trying to create a `https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic` folder.

  chore(lockfile): moved to pnpm-lock.yaml's v6 format.

  - This doesn't change anything, I just think it is nice to migrate as it will become the default anyway.

## 7.3.0

### Minor Changes

- f224625: feat(core): added support for /\_offline page in appDir.

  - With this version, app/\_offline/page.tsx will automatically enable the fallback worker just like pages/\_offline.tsx.

  chore(deps): updated all dependencies

  - This version also bumps every dependency to their latest versions. This process is done monthly.

## 7.2.0

### Minor Changes

- b6f10be:

  refactor(core): replaced babel with swc.

  - This version replaces babel-loader with swc-loader when building fallback workers and custom workers so that we don't have to use the old `next/babel` anymore.

  - There should be no changes needed except for deleting babel-loader and @babel/core from your `devDependencies` if you don't need them anymore, because this package doesn't.

  refactor(examples): converted every example to Typescript, renamed some, deprecated some.

## 7.1.1

### Patch Changes

- 360c94a: Fix @ducanh2912/next-pwa not having a README.md on npm

## 7.1.0

### Minor Changes

- eb04bce: I refactored the repo into a monorepo one to make it easy to update examples without having to use examples/\_\_examples_utils.
