# next-pwa - offline fallback example

[TOC]

> **Check out a simpler and easier way to implement offline fallbacks without InjectManifest: **
>
> **[offline-fallback-v2](https://github.com/shadowwalker/next-pwa/tree/master/examples/offline-fallback-v2)**

This example demonstrates how to use `next-pwa` to implement fallback route, image or font when fetching fails. Fetching errors usually happen when the user is **offline**. (Note: fetching is regarded as successful even when the server returns error status codes like `404, 400, 500, ...`)

This example uses `workbox`'s **InjectManifest**. The advantage of using this module is that you get more control over your Service Worker. The disadvantage is that it is more complicated and needs more code.

The idea of implementing comprehensive fallbacks can be found [here](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks).

## Usage

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/offline-fallback
pnpm install
pnpm build
pnpm start
```

## Recommended `.gitignore`

```
**/public/workbox-*.js
**/public/sw.js
```
