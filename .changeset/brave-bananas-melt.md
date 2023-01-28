---
"@ducanh2912/next-pwa": patch
---

fix(core): fixed user's webpack config being overridden if the plugin is disabled

- Before this patch, the plugin used to override user-defined or other plugins' Webpack custom config because it early returned the config (without calling `nextConfig.webpack?.()`) if it was disabled. This fixes it by calling `nextConfig.webpack?.()` before doing anything else.

chore(types): changed `compilerOptions.moduleResolution` to `"nodeNext"`.

- This shouldn't impact users. It is only meant to force me to write `.js` at the end of import paths and stuff.

docs(README): refined main README.md

- Rewrote README.md to fix grammar issues and decouple tips into TIPS.md. I also fixed/removed some broken links.

chore(deps): ran deps:update-all

- Nothing too special...
