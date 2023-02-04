---
"@ducanh2912/next-pwa": patch
---

chore(deps), removed subdomainPrefix & cleaned up some code

- This will remove subdomainPrefix from types.ts, but it will only trigger TS if you still have that option, because it stopped doing anything ages ago.

- Cleaned up some code while I was finding a way to better support offline.
