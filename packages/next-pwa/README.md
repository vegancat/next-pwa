# Zero-config [PWA](https://web.dev/learn/pwa/) plugin for [Next.js](https://nextjs.org/)

This plugin is powered by [Workbox](https://developer.chrome.com/docs/workbox/) and other good stuff.

[![Build Size](https://img.shields.io/bundlephobia/minzip/@ducanh2912/next-pwa?label=Bundle%20size&style=flat&color=success)](https://bundlephobia.com/result?p=@ducanh2912/next-pwa)
[![Version](https://img.shields.io/npm/v/@ducanh2912/next-pwa?style=flat&color=success)](https://www.npmjs.com/package/@ducanh2912/next-pwa)

👋 Share your awesome PWA project 👉 [here](https://github.com/shadowwalker/next-pwa/discussions/206)

**Features**

- 0️⃣ Zero-config for registering and generating service worker out of the box
- ✨ Optimized precaching and runtime caching
- 💯 Maximal Lighthouse score
- 🎈 Easy-to-understand examples
- 📴 Offline support with fallbacks ([example](/examples/offline-fallback-v2))
- 📦 Uses [Workbox](https://developer.chrome.com/docs/workbox/) and [workbox-window](https://developer.chrome.com/docs/workbox/modules/workbox-window) v6
- 🍪 Works with cookies out of the box
- 🔉 Default range requests for audios and videos
- ☕ No custom server needed for Next.js 9+ ([example](/examples/basic))
- 🔧 Handle PWA lifecycle events (opt-in - [example](/examples/lifecycle))
- 📐 Custom worker to run extra code with code splitting and **Typescript** support ([example](/examples/custom-worker))
- 📜 [Public environment variables](https://nextjs.org/docs/basic-features/environment-variables#exposing-environment-variables-to-the-browser) are available in custom workers
- 🐞 Debug service worker in development mode without caching
- 🌏 Internationalization support (a.k.a i18n) with `next-i18next` ([example](/examples/next-i18next))
- 🛠 Configurable by [Workbox's options](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin) for [GenerateSW](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#generatesw-plugin) and [InjectManifest](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#injectmanifest-plugin)
- ⚡ Supports [blitz.js](https://blitzjs.com/) (simply add `blitz.config.js`)
- 🚀 Spin up a [GitPod](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/) and try out examples in rocket speed (or use `create-next-app` to create a brand new Next.js app with them (for example, run `pnpm create next-app --example https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic` to create a new Next.js app using the `basic` example))

> **NOTE 1** - `next-pwa` version 2.0.0+ should only work with `Next.js` 9.1+, and static files should only be served through the `public` directory.
>
> **NOTE 2** - If you encounter the error `TypeError: Cannot read property **'javascript' of undefined**` during build, [please consider upgrading to Webpack 5 in `next.config.js`](https://github.com/shadowwalker/next-pwa/issues/198#issuecomment-817205700).
>
> **NOTE 3** - `@ducanh2912/next-pwa` currently doesn't support Turbopack, but I will start working on it as soon as we get our hands on Turbopack. It may not use Workbox anymore depending on [Workbox's maintain status](https://github.com/GoogleChrome/workbox/issues/3149), however.

---

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

## Install

> If you are new to `React` or `Next.js`, you may want to checkout [learn React](https://beta.reactjs.org/learn), [learn Next.js](https://nextjs.org/learn/basics/create-nextjs-app) and [Next.js documentation](https://nextjs.org/docs/getting-started) first. Then start from [a simple example (you can use `create-next-app` on these examples, fyi)](https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic) or [the progressive-web-app example in Next.js's repository](https://github.com/vercel/next.js/tree/canary/examples/progressive-web-app).

```bash
npm i @ducanh2912/next-pwa
# or
# yarn add @ducanh2912/next-pwa
# or
# pnpm add @ducanh2912/next-pwa
```

## Basic usage

### Step 1: Wrap your Next config with `withPWA`

Update or create your `next.config.js` with

```js
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
});

module.exports = withPWA({
  // Next.js config
});
```

or if you prefer ESM:

```js
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  // Next.js config
});
```

After running `next build`, this will generate two files in your `public` directory: `workbox-*.js` and `sw.js`, which will automatically be served statically.

If you are using Next.js v9+, then skip the section below and move onto step 2.

Otherwise, you'll need to pick one of the two options below before continuing to step 2.

> **NOTE**: This plugin is written in Typescript. JSDoc is supported, and it is recommended to add `// @ts-check` to the top of your `next.config.js` file to leverage type checking as well. This is especially useful when you use `PluginOptions.workboxOptions`, as you may unknowningly mix InjectManifest-specific and GenerateSW-specific options up.

### Option 1: Hosting static files

Copy files to your static file hosting server, so that they are accessible from the following paths: `https://yourdomain.com/sw.js` and `https://yourdomain.com/workbox-*.js`.

An example is using Firebase hosting service to host those files statically. You can automate the copying step with scripts in your deployment workflow.

> For security reasons, you must host these files directly from your domain. If the content is delivered using a redirect, the browser will refuse to run the service worker.

### Option 2: Using a custom server

Example `server.js`

```js
const { createServer } = require("http");
const { join } = require("path");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
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
  }).listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

> **NOTE**: it is recommended to upgrade your Next.js version instead. Usually, Next.js will provide codemods needed to migrate between major versions (see [Next.js codemods](https://nextjs.org/docs/advanced-features/codemods)). Its releases are often packed with a lot of awesome features, and you shouldn't miss out on them :)

### Step 2: Add a manifest.json file

Create a `manifest.json` file in your `public` folder:

```json
{
  "name": "My awesome PWA app",
  "short_name": "PWA App",
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

### Step 3: Add `<meta />` and `<link />` tags to your `<head />`

Add the following code to your `_app.tsx`'s `<Head />`, or your root `layout.tsx`'s `<head />` if you are using appDir:

```jsx
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>My awesome PWA app</title>
  <meta name="description" content="Best PWA app in the world!">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="mask-icon" href="/icons/mask-icon.svg" color="#FFFFFF">
  <meta name="theme-color" content="#ffffff">
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
  <link rel="manifest" href="/manifest.json" />
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:url" content="https://yourdomain.com" />
  <meta name="twitter:title" content="My awesome PWA app" />
  <meta name="twitter:description" content="Best PWA app in the world!" />
  <meta name="twitter:image" content="/icons/android-chrome-192x192.png" />
  <meta name="twitter:creator" content="@DavidWShadow" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="My awesome PWA app" />
  <meta property="og:description" content="Best PWA app in the world!" />
  <meta property="og:site_name" content="My awesome PWA app" />
  <meta property="og:url" content="https://yourdomain.com" />
  <meta property="og:image" content="/icons/apple-touch-icon.png" />
  {/* Apple splashscreen images
  <link rel="apple-touch-startup-image" href="/images/apple_splash_2048.png" sizes="2048x2732" />
  <link rel="apple-touch-startup-image" href="/images/apple_splash_1668.png" sizes="1668x2224" />
  <link rel="apple-touch-startup-image" href="/images/apple_splash_1536.png" sizes="1536x2048" />
  <link rel="apple-touch-startup-image" href="/images/apple_splash_1125.png" sizes="1125x2436" />
  <link rel="apple-touch-startup-image" href="/images/apple_splash_1242.png" sizes="1242x2208" />
  <link rel="apple-touch-startup-image" href="/images/apple_splash_750.png" sizes="750x1334" />
  <link rel="apple-touch-startup-image" href="/images/apple_splash_640.png" sizes="640x1136" />
  */}
</head>
```

## Offline fallbacks

When fetching from both cache and network fails and offline fallbacks are enabled, a precached resource is served rather than an error.

To get started, simply add a `/_offline.tsx` file to your `pages/` directory or a `/_offline/page.tsx` file to your `app/` directory. You are all set! When the user is offline, all pages which are not cached will fallback to `/_offline`.

**[Use this example to see it in action](/examples/offline-fallback-v2)**

`next-pwa` helps you precache those resources on first load, then inject a fallback handler to `handlerDidError` plugin to all `runtimeCaching` configs, so that precached resources are served when fetching fails.

You can also setup `precacheFallback.fallbackURL` in your [runtimeCaching config entry](https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-RuntimeCaching) to implement a similar functionality. The difference is that the above method is based on the resource type, whereas this method is based on matched URL pattern. If this config is set in the `runtimeCaching` config entry, resource-type-based fallback will be disabled automatically for this particular URL pattern to avoid conflicts.

## Configuration

There are options you can use to customize the behavior of this plugin:

```javascript
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: "/app",
  // sw: "service-worker.js",
  //...
});

// your Next config is automatically typed!
module.exports = withPWA({
  // Next.js config
});
```

or if you prefer ESM:

```javascript
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  // register: true,
  // scope: "/app",
  // sw: "service-worker.js",
  //...
});

// your Next config is automatically typed!
export default withPWA({
  // Next.js config
});
```

### Available options

See [PluginOptions](/packages/next-pwa/src/types.ts?plain=1#L5)

### Other options

`next-pwa` uses `workbox-webpack-plugin`, other options can be found in [workbox-webpack-plugin's documentation](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin) for [GenerateSW](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#generatesw-plugin) and [InjectManifest](https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#injectmanifest-plugin).

### Runtime caching

`next-pwa` has a default runtime caching array, see: [cache.ts](/packages/next-pwa/src/cache.ts)

There is a chance you may want to have your own runtime caching rules. Please feel free to copy the default `cache.ts` file and customize the rules as you like. Don't forget to change your `withPWAInit` config in `next.config.js` like so:

```js
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  // your other options,
  workboxOptions: {
    runtimeCaching: [
      // your runtime caching array
    ],
  },
});

export default withPWA({
  // your Next config
});
```

Here is [the documentation on how to write a runtime caching array](https://developer.chrome.com/docs/workbox/reference/workbox-build/#type-RuntimeCaching), including background sync, broadcast update, and more!

## Tips

See [our tips on using `next-pwa`](/packages/next-pwa/TIPS.md)

## Reference

1. [Google Workbox](https://developer.chrome.com/docs/workbox/what-is-workbox/)
2. [ServiceWorker, MessageChannel, & postMessage](https://ponyfoo.com/articles/serviceworker-messagechannel-postmessage) by [Nicolás Bevacqua](https://ponyfoo.com/contributors/ponyfoo)
3. [The service worker lifecycle](https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle)
4. [6 Tips to make your iOS PWA feel like a native app](https://www.netguru.com/codestories/pwa-ios)
5. [Make your PWA available on Google Play Store](https://www.netguru.com/codestories/make-your-pwa-available-on-google-play-store)
