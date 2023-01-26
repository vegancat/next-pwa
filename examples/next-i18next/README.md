# next-pwa - i18n example

[TOC]

This example demonstrates how to use `next-pwa` to turn a `Next.js`-based web app into a PWA easily.

It uses `express` to build a custom server and [`next-i18next`](https://github.com/isaachinman/next-i18next) as a i18n solution.

> `i18next-express-middleware` is not compatible with `fastify` right now unfortunately.

Because service worker must be served without any redirection, make sure its route is excluded from the i18n middleware. See `index.js` for an example.

## Usage

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/next-i18next
pnpm build
pnpm start
```

Then try out following paths:

```
https://localhost:3000/
https://localhost:3000/en
https://localhost:3000/zh
```
