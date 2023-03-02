---
"@ducanh2912/next-pwa": minor
---

feat(deps): `next-pwa` no longer requires `swc-loader` to be manually installed

- This package now installs `swc-loader` on its own, and then resolve it using `require.resolve`.
