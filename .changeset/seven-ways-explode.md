---
"@ducanh2912/next-pwa": minor
---

# Core

refactor(core): replaced babel with swc.

- This version replaces babel-loader with swc-loader when building fallback workers and custom workers so that we don't have to use the old `next/babel` anymore.

- There should be no changes needed except for deleting babel-loader and @babel/core from your `devDependencies` if you don't need them anymore, because this package doesn't.

# Examples

refactor(examples): converted every example to Typescript, renamed some, deprecated some.
