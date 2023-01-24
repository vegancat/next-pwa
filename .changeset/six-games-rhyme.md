---
"@ducanh2912/next-pwa": patch
---

docs(types.ts): fixed links, added example for `PluginOptions.register`, `PluginOptions.buildExcludes`.

- This patch add an example of registering the SW on your own with `register: false` and an example of how `buildExcludes` should look like.
- It also removed an invalid link (which led to Github's 404 page) and an old link (which led to a deprecated example).

chore(deps): ran deps:update-all.

- To clarify the previous patch's message, this is meant to be done at least once a month, but it can be done anytime.

style(code): cleaned up index.ts.

- Replaced `_fallbacks` with `hasFallbacks` as copying `pluginOptions.fallbacks` just to indicate that the user did use this feature wasn't really necessary, and can be simplified to using a boolean.
