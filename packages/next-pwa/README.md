# Zero-config [PWA](https://web.dev/learn/pwa/) plugin for [Next.js](https://nextjs.org/)

This plugin is powered by [Workbox](https://developer.chrome.com/docs/workbox/) and other good stuff.

[![Build Size](https://img.shields.io/bundlephobia/minzip/@ducanh2912/next-pwa?label=Bundle%20size&style=flat&color=success)](https://bundlephobia.com/result?p=@ducanh2912/next-pwa)
[![Version](https://img.shields.io/npm/v/@ducanh2912/next-pwa?style=flat&color=success)](https://www.npmjs.com/package/@ducanh2912/next-pwa)

👋 Share your awesome PWA project 👉 [here](https://github.com/shadowwalker/next-pwa/discussions/206)

**Features**

- 0️⃣ Zero-config for registering and generating Service Worker out of the box
- ✨ Optimized precaching and runtime caching
- 💯 Maximal Lighthouse score
- 🎈 Easy-to-understand examples
- 📴 Offline support with fallbacks ([example](https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2))
- 📦 Uses [Workbox](https://developer.chrome.com/docs/workbox/) and [workbox-window](https://developer.chrome.com/docs/workbox/modules/workbox-window) v6
- 🍪 Works with cookies out of the box
- 🔉 Default range requests for audios and videos
- ☕ No custom server needed for Next.js 9+ ([example](https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-9))
- 🔧 Handle PWA lifecycle events (opt-in - [example](https://github.com/DuCanhGH/next-pwa/tree/master/examples/lifecycle))
- 📐 Custom worker to run extra code with code splitting and **Typescript** support ([example](https://github.com/DuCanhGH/next-pwa/tree/master/examples/custom-ts-worker))
- 📜 [Public environment variables](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser) available in custom workers
- 🐞 Debug Service Worker in development mode without caching
- 🌏 Internationalization support (a.k.a I18N) with `next-i18next` [example](https://github.com/DuCanhGH/next-pwa/tree/master/examples/next-i18next)
- 🛠 Configurable by the same [Workbox configuration options](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin) for [GenerateSW](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#generatesw-plugin) and [InjectManifest](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#injectmanifest-plugin)
- ⚡ Supports [blitz.js](https://blitzjs.com/) (simply add `blitz.config.js`)
- 🚀 Spin up a [GitPod](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/) and try out examples in rocket speed (or use `create-next-app` to create a brand new Next.js app with those (for example, run `pnpm create next-app https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic` to create a new Next.js app using the `basic` example))

> **NOTE 1** - `next-pwa` version 2.0.0+ should only work with `Next.js` 9.1+, and static files should only be served through the `public` directory. This makes things simpler.
>
> **NOTE 2** - If you encounter the error `TypeError: Cannot read property **'javascript' of undefined**` during build, [please consider upgrading to Webpack 5 in `next.config.js`](https://github.com/shadowwalker/next-pwa/issues/198#issuecomment-817205700).

---

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

## Install

> If you are new to `Next.js` or `React.js`, you may want to checkout [learn Next.js](https://nextjs.org/learn/basics/create-nextjs-app) or [Next.js documentation](https://nextjs.org/docs/getting-started) first. Then start from [a simple example (you can use `create-next-app` on these examples, fyi)](https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic) or [the progressive-web-app example in Next.js's repository](https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app).

```bash
npm i @ducanh2912/next-pwa
# or
# yarn add @ducanh2912/next-pwa
# or
# pnpm add @ducanh2912/next-pwa
```

## Basic usage

### Step 1: withPWA

Update or create `next.config.js` with

```javascript
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

module.exports = withPWA({
  // Next.js config
});
```

or if you prefer ESM:

```javascript
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  // Next.js config
});
```

After running `next build`, this will generate two files in your `public` directory: `workbox-*.js` and `sw.js`, which will automatically be served statically.

If you are using Next.js version 9 or newer, then skip the options below and move onto Step 2.

Otherwise, you'll need to pick one of the two options below before continuing to Step 2.

### Option 1: Hosting static files

Copy files to your static file hosting server, so that they are accessible from the following paths: `https://yourdomain.com/sw.js` and `https://yourdomain.com/workbox-*.js`.

An example is using Firebase hosting service to host those files statically. You can automate the copying step with scripts in your deployment workflow.

> For security reasons, you must host these files directly from your domain. If the content is delivered using a redirect, the browser will refuse to run the Service Worker.

### Option 2: Using a custom server

When an HTTP request is received, check if those files are requested, then return them.

Example `server.js`

```javascript
const { createServer } = require("http");
const { join } = require("path");
const { parse } = require("url");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (
      pathname === "/sw.js" ||
      /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)
    ) {
      const filePath = join(__dirname, ".next", pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, () => {
    console.log(`> Ready on http://localhost:${3000}`);
  });
});
```

> The following setup has nothing to do with `next-pwa` plugin, and you have probably already set them up. If not, go ahead and do so.

### Step 2: Add a manifest.json file

Create a `manifest.json` file in your `public` folder:

```json
{
  "name": "PWA App",
  "short_name": "App",
  "icons": [
    {
      "src": "/icons/android-chrome-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/android-chrome-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "theme_color": "#FFFFFF",
  "background_color": "#FFFFFF",
  "start_url": "/",
  "display": "standalone",
  "orientation": "portrait"
}
```

### Step 3: Add `<meta />`s and `<link />`s to your `<head />` (Example)

Add the following code to your `_document.tsx` or `_app.tsx`, in `<Head>`:

```html
<meta name="application-name" content="PWA App" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<meta name="apple-mobile-web-app-status-bar-style" content="default" />
<meta name="apple-mobile-web-app-title" content="PWA App" />
<meta name="description" content="Best PWA App in the world" />
<meta name="format-detection" content="telephone=no" />
<meta name="mobile-web-app-capable" content="yes" />
<meta name="msapplication-config" content="/icons/browserconfig.xml" />
<meta name="msapplication-TileColor" content="#2B5797" />
<meta name="msapplication-tap-highlight" content="no" />
<meta name="theme-color" content="#000000" />

<link rel="apple-touch-icon" href="/icons/touch-icon-iphone.png" />
<link
  rel="apple-touch-icon"
  sizes="152x152"
  href="/icons/touch-icon-ipad.png"
/>
<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="/icons/touch-icon-iphone-retina.png"
/>
<link
  rel="apple-touch-icon"
  sizes="167x167"
  href="/icons/touch-icon-ipad-retina.png"
/>

<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="/icons/favicon-32x32.png"
/>
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="/icons/favicon-16x16.png"
/>
<link rel="manifest" href="/manifest.json" />
<link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
<link rel="shortcut icon" href="/favicon.ico" />
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
/>

<meta name="twitter:card" content="summary" />
<meta name="twitter:url" content="https://yourdomain.com" />
<meta name="twitter:title" content="PWA App" />
<meta name="twitter:description" content="Best PWA App in the world" />
<meta
  name="twitter:image"
  content="https://yourdomain.com/icons/android-chrome-192x192.png"
/>
<meta name="twitter:creator" content="@DavidWShadow" />
<meta property="og:type" content="website" />
<meta property="og:title" content="PWA App" />
<meta property="og:description" content="Best PWA App in the world" />
<meta property="og:site_name" content="PWA App" />
<meta property="og:url" content="https://yourdomain.com" />
<meta
  property="og:image"
  content="https://yourdomain.com/icons/apple-touch-icon.png"
/>

<!-- apple splash screen images -->
<!--
<link rel='apple-touch-startup-image' href='/images/apple_splash_2048.png' sizes='2048x2732' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1668.png' sizes='1668x2224' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1536.png' sizes='1536x2048' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1125.png' sizes='1125x2436' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_1242.png' sizes='1242x2208' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_750.png' sizes='750x1334' />
<link rel='apple-touch-startup-image' href='/images/apple_splash_640.png' sizes='640x1136' />
-->
```

> Tip: Put the `viewport` meta tag in your `_app.tsx`, rather than `_document.tsx`, if you need it.

```html
<meta
  name="viewport"
  content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
/>
```

## Offline fallbacks

Offline fallbacks are useful when fetching from both cache and network falls, as a precached resource is served rather than an error.

To get started simply add a `/_offline.tsx` in your `pages/`. You are all set! When the user is offline, all pages which are not cached will fallback to '/\_offline'.

**[Use this example to see it in action](https://github.com/DuCanhGH/next-pwa/tree/master/examples/offline-fallback-v2)**

`next-pwa` helps you precache those resources on first load, then inject a fallback handler to `handlerDidError` plugin to all `runtimeCaching` configs, so that precached resources are served when fetching fails.

You can also setup `precacheFallback.fallbackURL` in your [runtimeCaching config entry](https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-RuntimeCaching) to implement a similar functionality. The difference is that the above method is based on the resource type, whereas this method is based on matched URL pattern. If this config is set in the `runtimeCaching` config entry, resource-type-based fallback will be disabled automatically for this particular URL pattern to avoid conflict.

## Configuration

There are options you can use to customize the behavior of this plugin:

```javascript
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

module.exports = withPWA({
  // Next.js config
});
```

or if you prefer ESM:

```javascript
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
});

export default withPWA({
  // Next.js config
});
```

### Available options

See [PluginOptions](https://github.com/DuCanhGH/next-pwa/blob/master/src/types.ts?plain=1#L5)

### Other options

`next-pwa` uses `workbox-webpack-plugin`, other options can be found in [Google's documentation for workbox-webpack-plugin](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin) for [GenerateSW](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#generatesw-plugin) and [InjectManifest](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#injectmanifest-plugin).

### Runtime caching

`next-pwa` has a default runtime caching array, see: [cache.ts](https://github.com/DuCanhGH/next-pwa/blob/master/src/cache.ts)

There is a chance you may want to have your own runtime caching rules. Please feel free to copy the default `cache.ts` file and customize the rules as you like. Don't forget to add the configuration to your `withPWAInit` config in `next.config.js`.

Here is the [document on how to write a runtime caching array](https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-RuntimeCaching), including background sync, broadcast update, and more!

## Tips

1. [Common UX pattern to ask user to reload when a new Service Worker is installed](https://github.com/DuCanhGH/next-pwa/blob/master/examples/lifecycle/pages/index.js#L26-L38)
2. Use a convention like `{command: 'doSomething', message: ''}` object when `postMessage` to Service Worker. So that on the listener it can do multiple different tasks using `if...else...`.
3. When you are debugging Service Worker, constantly clean the application cache to reduce some flaky errors.
4. If you are redirecting the user to another route, please note that [Workbox by default only cache response with 200 HTTP status](https://developer.chrome.com/docs/workbox/modules/workbox-cacheable-response#what_are_the_defaults), if you really want to cache redirected page for the route, you can specify it in `runtimeCaching` (just like this: `options.cacheableResponse.statuses=[200,302]`).
5. When debugging issues, sometimes you may want to format your generated `sw.js` file to figure out what's really going on. In development mode it is not minified though, so it is kinda readable.
6. You can force `next-pwa` to generate worker box in production mode by adding `mode: 'production'` in your `withPWAInit` config in `next.config.js`. Though `next-pwa` by default generates the worker box in development mode during development (by running `next dev`) and worker box in production mode during production (by running `next build` and `next start`), you may still want to force it to build for production even in development mode of your web app because:
   1. Reduced logging noise as the production build doesn't include logging.
   2. Improved performance as the production build is better optimized.
7. If you just want to disable worker box's logging while still using the development build during development, [simply put `self.__WB_DISABLE_DEV_LOGS = true` in your `worker/index.js` (create one if you don't have one)](https://github.com/DuCanhGH/next-pwa/blob/c48ef110360d0138ad2dacd82ab96964e3da2daf/examples/custom-worker/worker/index.js#L6).
8. It is common for developers to have to use the `userAgent` string to determine users' platform, and [ua-parser-js](https://www.npmjs.com/package/ua-parser-js) library is a good friend for that.

## Reference

1. [Google Workbox](https://developer.chrome.com/docs/workbox/what-is-workbox/)
2. [ServiceWorker, MessageChannel, & postMessage](https://ponyfoo.com/articles/serviceworker-messagechannel-postmessage) by [Nicolás Bevacqua](https://ponyfoo.com/contributors/ponyfoo)
3. [The Service Worker Lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
4. [6 Tips to make your iOS PWA feel like a native app](https://www.netguru.com/codestories/pwa-ios)
5. [Make Your PWA Available on Google Play Store](https://www.netguru.com/codestories/make-your-pwa-available-on-google-play-store)

## Fun PWA projects

1. [Experience SAMSUNG on an iPhone - must open on an iPhone to start](https://itest.nz/)
2. [App Scope - like an app store for PWA](https://appsco.pe/)
3. [PWA Directory](https://pwa-directory.appspot.com/)
4. [PWA Builder - Alternative way to build awesome PWA](https://www.pwabuilder.com/)

## License

MIT
