# next-pwa - custom server example

[TOC]

This example demonstrates how to use `next-pwa` to turn a `Next.js`-based web app into a PWA easily.

It uses `fastify` as a custom server to serve `sw.js` and `precache` scripts statically, and it contains a minimal icon set and a `manifest.json` in the `public` directory. The example also features full offline support and boasts full (all 100) scores on Lighthouse 🎉.

> [Check out Lighthouse's summary](https://github.com/DuCanhGH/next-pwa/blob/master/examples/custom-server/lighthouse.pdf), or run the test yourself.

## Usage

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/custom-server
pnpm build
pnpm start
```

## Recommended `.gitignore`

```gitignore
**/public/precache.*.js
**/public/sw.js
```
