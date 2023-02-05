---
"@ducanh2912/next-pwa": major
---

BREAKING CHANGE(typescript): renamed Fallbacks to FallbackRoutes, /register to /workbox.

- Some JSDoc has also been added to FallbackRoutes.

- Changing /register to /workbox should have minimal impact, you only need to change `"@ducanh2912/next-pwa/register"` in `compilerOptions.types` to `"@ducanh2912/next-pwa/worker"`

BREAKING CHANGE(PluginOptions): removed `PluginOptions.exclude`.

- You should use `PluginOptions.buildExcludes` instead. It is almost the same as `PluginOptions.exclude`, except for the fact that it doesn't override the plugin's `exclude` function, which is used to exclude files that shouldn't/can't be precached.

style(code): renamed `register.ts` to `sw-entry.ts`.

- I think this name conveys the meaning of the file better, as it doesn't only register the SW but also handles some of the plugin's features.

**NOTES**: How to upgrade:

- Change `"@ducanh2912/next-pwa/register"` in your `tsconfig.json`'s `compilerOptions.types` to `"@ducanh2912/next-pwa/worker"`.

- Change `exclude` to `buildExcludes` like so:

```js
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  // your other options,
  exclude: [],
});

export default withPWA({
  // your Next config
});
```

to

```js
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  // your other options,
  buildExcludes: [],
});

export default withPWA({
  // your Next config
});
```

- If you have used the interface `Fallbacks` somewhere in your code, just change it to `FallbackRoutes`.
