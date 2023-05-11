> **NOTE**: This package is not ready at the moment. Please use `@ducanh2912/next-pwa` instead.

# Zero-config [PWA](https://web.dev/learn/pwa/) plugin for [Next.js](https://nextjs.org/)

This plugin is powered by [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) and other good stuff.

[![Build Size](https://img.shields.io/bundlephobia/minzip/@ducanh2912/next-sw?label=Bundle%20size&style=flat&color=success)](https://bundlephobia.com/result?p=@ducanh2912/next-sw)
[![Version](https://img.shields.io/npm/v/@ducanh2912/next-sw?style=flat&color=success)](https://www.npmjs.com/package/@ducanh2912/next-sw)

**Features**

- 0️⃣ Zero-config for registering and generating service worker out of the box
- ✨ Optimized precaching and runtime caching (in progress)
- 💯 Maximal Lighthouse score (not guaranteed for now)
- 🎈 Easy-to-understand examples
- 📦 Uses [Service Worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- 🛠 Configurable (more in future!)
- 🚀 Spin up a [GitPod](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/) and try out examples in rocket speed (or use `create-next-app` to create a brand new Next.js app with them (for example, run `pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/workboxless` to create a new Next.js app using the `basic` example))

> **NOTE 1** - `next-pwa` version 2.0.0+ should only work with `Next.js` 9.1+, and static files should only be served through the `public` directory.
>
> **NOTE 2** - `@ducanh2912/next-sw` currently doesn't support Turbopack, but I will start working on it as soon as we get our hands on Turbopack.

---

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

## How is it different from `@ducanh2912/next-pwa`?

It directly makes use of the `ServiceWorker` API instead of `workbox`. Both are supported, so just make a pick! If you are not sure, you may want to use `@ducanh2912/next-pwa` instead as it allows you to customize your service worker further.

## Reference

1. [ServiceWorker, MessageChannel, & postMessage](https://ponyfoo.com/articles/serviceworker-messagechannel-postmessage) by [Nicolás Bevacqua](https://ponyfoo.com/contributors/ponyfoo)
2. [The service worker lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
3. [6 Tips to make your iOS PWA feel like a native app](https://www.netguru.com/codestories/pwa-ios)
4. [Make your PWA available on Google Play Store](https://www.netguru.com/codestories/make-your-pwa-available-on-google-play-store)
