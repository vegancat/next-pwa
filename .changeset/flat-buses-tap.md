---
"@ducanh2912/next-pwa": patch
---

fix(deps): moved swc-loader to `devDependencies` and `peerDependencies`, added note that reminds users to install swc-loader when using fallbacks and custom worker in `PluginOptions`.

    - swc-loader being in `dependencies` didn't do anything as webpack wants it declared in the user's `package.json`, so I moved it to `devDependencies` and added it to `peerDependencies` (optional).

docs(README): fixed example `create-next-app` command (added --example flag).

    - Before this change it wasn't a really valid command; while `create-next-app` does run, it will crash on trying to create a `https://github.com/DuCanhGH/next-pwa/tree/master/examples/basic` folder.

chore(lockfile): moved to pnpm-lock.yaml's v6 format.

    - This doesn't change anything, I just think it is nice to migrate as it will become the default anyway.
