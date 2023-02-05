---
"@ducanh2912/next-pwa": patch
---

chore(deps, code): updated all deps, cleaned up some code, removed subdomainPrefix.

- This will remove subdomainPrefix from types.ts, but it will only trigger TS if you still have that option, because it stopped doing anything ages ago.

- Cleaned up some code while I was finding a way to better support offline.
