## [6.0.12](https://github.com/DuCanhGH/next-pwa/compare/v6.0.11...v6.0.12) (2022-11-30)


### Bug Fixes

* **not really:** test protected branch ([4cc9aa4](https://github.com/DuCanhGH/next-pwa/commit/4cc9aa47040fcf0e03f7a15aeb86afb53468657a))
* **not really:** test protected branch ([894af1e](https://github.com/DuCanhGH/next-pwa/commit/894af1e289836a63377ec496823d637495bb3fda))
* **not really:** test protected branch ([6e1183a](https://github.com/DuCanhGH/next-pwa/commit/6e1183aedab4aaf12b81b773b18f13c64ec1ef38))
* **not really:** test protected branch ([aa0482f](https://github.com/DuCanhGH/next-pwa/commit/aa0482f0081aed771c6d7eb75c3c0e6ae4624991))
* **not really:** test protected branch ([a53bdd0](https://github.com/DuCanhGH/next-pwa/commit/a53bdd02a7649d1058f5b64b901af10f9aa0a9c8))

## [6.0.11](https://github.com/DuCanhGH/next-pwa/compare/v6.0.10...v6.0.11) (2022-11-30)


### Bug Fixes

* turned off removeComments ([3aecbdc](https://github.com/DuCanhGH/next-pwa/commit/3aecbdcbd4f96e43714333c8721782952a88e7ad))

## [6.0.10](https://github.com/DuCanhGH/next-pwa/compare/v6.0.9...v6.0.10) (2022-11-30)


### Bug Fixes

* fixed register.js not found ([40cfb17](https://github.com/DuCanhGH/next-pwa/commit/40cfb17596d486ff9ab503c0c711284ac5b83d24))

## [6.0.9](https://github.com/DuCanhGH/next-pwa/compare/v6.0.8...v6.0.9) (2022-11-30)


### Bug Fixes

* fixed rollup's warning ([4263088](https://github.com/DuCanhGH/next-pwa/commit/4263088ec4ba656f5ea3a3faec4c50dbd1446b0a))

## [6.0.8](https://github.com/DuCanhGH/next-pwa/compare/v6.0.7...v6.0.8) (2022-11-30)


### Bug Fixes

* fixed __dirname not being defined ([ce47611](https://github.com/DuCanhGH/next-pwa/commit/ce476118f1910d1ae1e26aa860bb6b91eb78f905))

## [6.0.7](https://github.com/DuCanhGH/next-pwa/compare/v6.0.6...v6.0.7) (2022-11-30)


### Bug Fixes

* fixed rollup's warning ([7a5fd7c](https://github.com/DuCanhGH/next-pwa/commit/7a5fd7cd9e79c0b057195b8554102b8e0156f9d2))

## [6.0.6](https://github.com/DuCanhGH/next-pwa/compare/v6.0.5...v6.0.6) (2022-11-30)


### Bug Fixes

* export defaultCache ([78bc00d](https://github.com/DuCanhGH/next-pwa/commit/78bc00d4454fbca88d56b2921ce39531f4da5489))

## [6.0.5](https://github.com/DuCanhGH/next-pwa/compare/v6.0.4...v6.0.5) (2022-11-30)


### Bug Fixes

* replaced self.fallback with fallback ([43db63a](https://github.com/DuCanhGH/next-pwa/commit/43db63a6902d2033ab364c4a289cf2e5f6093993))

## [6.0.4](https://github.com/DuCanhGH/next-pwa/compare/v6.0.3...v6.0.4) (2022-11-30)


### Bug Fixes

* check if nextConfig.webpack is present ([53d3955](https://github.com/DuCanhGH/next-pwa/commit/53d39554daf97c4592f60f01c714e4ee8dc440cd))

## [6.0.3](https://github.com/DuCanhGH/next-pwa/compare/v6.0.2...v6.0.3) (2022-11-30)


### Bug Fixes

* make NextConfig optional ([51e8dd3](https://github.com/DuCanhGH/next-pwa/commit/51e8dd3f1c3b58e16b92cab1411ab4079abc953c))

## [6.0.2](https://github.com/DuCanhGH/next-pwa/compare/v6.0.1...v6.0.2) (2022-11-30)


### Bug Fixes

* fixed typing ([2c4cb17](https://github.com/DuCanhGH/next-pwa/commit/2c4cb17076236d08c6693af743ffc46bbb00ae20))

## [6.0.1](https://github.com/DuCanhGH/next-pwa/compare/v6.0.0...v6.0.1) (2022-11-30)


### Bug Fixes

* multiple output format ([75357a8](https://github.com/DuCanhGH/next-pwa/commit/75357a8b324fb0e654c210cc7e21079a2a710901))

# [6.0.0](https://github.com/DuCanhGH/next-pwa/compare/v5.6.0...v6.0.0) (2022-11-30)


* replace Microbundle with Rollup ([c7fcce7](https://github.com/DuCanhGH/next-pwa/commit/c7fcce7729eaebb64e768bca668c573b10ca9e0c))


### BREAKING CHANGES

* nothing, triggering test release

## 5.6.0
### BREAKING CHANGE

1. Start from version 5.6.0. This plugin function signature has been changed to follow the recommended pattern from next.js. Mainly extracting pwa config from mixing into rest of the next.js config. This is also less intrusive. See following commit for details.

## 5.5.0

### Fix

1. Update precache manifest revision to `contenthash` from webpack, [suggested by @ammar-oker](https://github.com/shadowwalker/next-pwa/issues/336)

### Misc

- Update dependencies

### Fix

1. (the real) Fix for not precache server js
2. Fix service worker register url edge case

## 5.4.7

### Fix

1. (the real) Fix for not precache server js
2. Fix service worker register url edge case

## 5.4.6

### Fix

- [fixed buildExcludes options not working](https://github.com/shadowwalker/next-pwa/pull/333)

### Misc

- Update examples and dependencies

## 5.4.5

### Fix

- [Fix double // for precache in static/media](https://github.com/shadowwalker/next-pwa/pull/319)
- [Fixing middleware-runtime.js error](https://github.com/shadowwalker/next-pwa/pull/325)

## 5.4.4

### Misc

- Update examples and dependencies

## 5.4.2

### Fix

- Exclude `middleware-manifest.json` from precache

### Misc

- Update examples and dependencies

## 5.4.0

1. [Add custom worker directory config (@TimoWilhelm)](https://github.com/shadowwalker/next-pwa/pull/282)

## 5.3.2

### Misc

- Update examples and dependencies

## 5.3.1

1. Default range requests for audios and videos

## 5.2.25

### Fix

1. [Add support for pageExtensions](https://github.com/shadowwalker/next-pwa/issues/261)

### Misc

- Update examples and dependencies

## 5.2.24

### Fix

1. [Back online reload behaviour configurable](https://github.com/shadowwalker/next-pwa/issues/232)

## 5.2.23

### Fix

1. Fix double `//` when precache `next/image` url - [Issue 231](https://github.com/shadowwalker/next-pwa/issues/231)

### Misc

- Add `next-image` example

## 5.2.22

### Fix

1. [Fix dynamic routes url encoding issue](https://github.com/shadowwalker/next-pwa/issues/223)
2. Add check for caches before register - @redian
3. Add cross origin cache configuration

### Misc

- Update examples and dependencies

## 5.2.17

### Fix

1. Fix offline page fallback scenario
2. Present offline post page for @next/mdx users
3. Auto reload when app becomes online again

## 5.2.14

### Fix

1. Fix custom worker and offline page not detected in `src` folders issue

## 5.2.12

### Major

1. Add `next-image` runtime cache rules by default

## 5.2.10

### Fix

1. [OAuth workflow in Safari, work out of box with next-auth](https://github.com/shadowwalker/next-pwa/issues/131#issuecomment-821894809)

## 5.2.6

### Fix

1. Fix minor issues

## 5.2.5

### Major

1. Add dependency `terser-webpack-plugin`

## 5.2.4

### Major

1. Fix start url redirect use case

## 5.2.1

### Major

1. Implement cache on front end navigation feature

## 5.2.0

### Major

1. Implement offline fallbacks feature

### Fix

1. Not precache `/_error`

## 5.1.4

### Misc

1. Offline fallback concept with `handlerDidError` cache plugin

### Fix

1. Pass auto offline check in Chrome

## 5.1.3

### Major

1. Fix webpack build on custom worker
2. Support typescript for custom worker - Thanks @felixmosh
3. Support environment variable in custom worker - Thanks @felixmosh

### Misc

- Update examples and dependencies

## 5.0.6

### Major

1. Update workbox depdencies to 6.1.1

### Misc

- Update examples and dependencies

## 5.0.4

### Major

1. Support ES6+ syntax in custom worker

### Misc

- Update examples and dependencies

## 5.0.2

### Major

1. Fix bug for default runtimeCaching not populated
2. Improve log when build custom worker failed

## 5.0.0

### Major

1. Upgrade workbox to 6.0.2
2. Fix modifyURLPrefix config injection
3. Add build id as revision for precache entries

### Misc

- Update examples and dependencies

## 4.0.0.beta.0

### Major

- Upgrade to workbox 6.0.0-rc.0
- Support webpack 5

### Misc

- Update examples and dependencies

## 3.1.5

### Fix

- Fix register script to run on IE11

### Misc

- Update README.md
- Fix typo in logs

## 3.1.4

### Fix

- `viewport` head meta tag not recommended to be put in the `_document.js`

### Misc

- Update `workbox` to `5.1.4`
- Update examples and dependencies
- Add cache on front end navigation example

## 3.1.3

### Fix

- `dev` mode borken due to empty runtime caching and precaching

## 3.1.2

### Misc

- Update examples and dependencies

## 3.1.1

### Fix

- Remove POST api runtime cache from default cache configuration as it's not supported in service worker

## 3.1.0

### Fix

- Fix `register.js` to cache `start-url` when auto register is off
- Give back full control of runtime caching for `start-url`

### Example

- [lifecycle] Update prompt user to reload web app when new version is available

### Misc

- Add more instruction for customizing runtime caching

## 3.0.3

### Fix

- Duplicate `start-url` runtime cache entry in generated `sw.js`

### Example

- Add offline fallback example
- Add web push example

### Misc

- Add CHANGELOG.md
- Add LICENSE and CHANGELOG.md to .npmignore
