# next-pwa - Next.js 9+ example

[TOC]

This example demonstrates how to use `next-pwa` to turn a `Next.js`-based web app into a PWA easily.

Thanks to **Next.js 9+**, we can use the `public` directory to serve static files. It cuts the need to write custom server only to serve those files. Therefore the setup is more easy and concise. We can use `next.config.js` to configure `next-pwa` to generate Service Worker and precache files in the `public` directory.

> [Check out Lighthouse's summary](https://github.com/DuCanhGH/next-pwa/blob/master/examples/next-9/lighthouse.pdf), or run the test yourself.

## Usage

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/next-9
pnpm install
pnpm build
pnpm start
```

## Recommended `.gitignore`

```
**/public/workbox-*.js
**/public/sw.js
```
