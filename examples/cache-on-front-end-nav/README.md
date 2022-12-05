# next-pwa - cache on frontend navigation example

[TOC]

> **Since `next-pwa@5.2.1`, you can set `cacheOnFrontEndNav: true` in your `pwa` config to achieve the same result in this example, no extra code needed.**

This example demonstrates how to use `next-pwa` to solve the issue in which users refresh on a frontend navigated route while being offline. This is an edge case which should not happen very often, however, this should help you improve UX.

For context, `Next.js` features both SSR and frontend navigation to deliver smooth user experience. When an user navigates through the web app using `next/router` or `next/link` (Link component), the navigation is made through frontend routing, which means there is no HTTP GET request made to the server as it only swap the React component to the new page and change the URL shown on the URL bar. This "fake" navigation is usually desired because it means users do not have to wait for network delays.

However the problem appears in caching, because there is no requests that Service Worker could intercept, and as such nothing is cached. Users may visit your home page and navigate to different pages. If the network is lost and users reload these pages using the refresh button or re-open the browser, a network lost page from the browser will be presented, which is such a bummer! This behavior will leave users pretty confused and annoyed as they could navigate through the web app without any problem before the refresh.

So we have to enforce a cache for each front-end navigation. It adds additional network traffic which seems to be conflicting with what we are trying to achieve with frontend routing. But since the cache happens in the Service Worker, it should have trivial impact on user experience or more specifically, page load.

I personally feel it's a tradeoff for you.

## Related issue

[A fix for offline refreshes #95](https://github.com/shadowwalker/next-pwa/issues/95) (this example is based on what @bahumbert suggested)

## Usage

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/cache-on-front-end-nav
pnpm install
pnpm build
pnpm start
```

## Recommended `.gitignore`

```
**/public/workbox-*.js
**/public/sw.js
**/public/worker-*.js
```
