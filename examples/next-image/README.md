# next-pwa - `next/image` example

[TOC]

This example demonstrates best practices to serve your images through `Next.js`'s built-in image feature.

For best performance, put images in its own folder rather than `public`. This will prevent duplicated precaching entries in the service worker script. Then `import Image from 'next/image'` to use the `Image` component provided by `Next.js` in your app.

## Usage

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/next-image
pnpm build
pnpm start
```

## Recommended `.gitignore`

```gitignore
**/public/workbox-*.js
**/public/sw.js
```
