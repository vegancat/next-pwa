# next-pwa - lifecycle and register workflow control example

[TOC]

This example demonstrates how to use `next-pwa` to turn a `Next.js`-based web app into a PWA easily.

It shows how to control the Service Worker registration workflow (instead of automatically registering the Service Worker) and add an event listener to handle the lifecycle events. It gives you more control over the PWA lifecycle. The key here is to set `register` in your `withPWAInit` config in `next.config.js` to `false` then call `window.workbox.register()` manually to register the generated Service Worker.

This example also demonstrates how to [prompt the user to reload the page when a new version is available](https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users).

## Usage

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/lifecycle
pnpm build
pnpm start
```

## Recommended `.gitignore`

```
**/public/precache.*.js
**/public/sw.js
```
