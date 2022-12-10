# next-pwa - web push example

[TOC]

This example demonstrates how to use `next-pwa` to implement web push with custom worker.

**NOTE**

In real world application, you may want to send the subscription data to your server once the user agrees to subscribe to web push. Store the data associated with the user, so that you can initiate a web push notification from your server to that very user.

## Usage

[![Open in Gitpod](https://img.shields.io/badge/Open%20In-Gitpod.io-%231966D2?style=for-the-badge&logo=gitpod)](https://gitpod.io/#https://github.com/DuCanhGH/next-pwa/)

```bash
cd examples/web-push
pnpm vapid
```

Create a `.env` file, and put the public key generated from the previous steps

```
WEB_PUSH_EMAIL=user@example.com
WEB_PUSH_PRIVATE_KEY=<vapid-private-key>
NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY=<vapid-public-key>
```

Build and start

```bash
pnpm build
pnpm start
```

## Recommended `.gitignore`

```
**/public/workbox-*.js
**/public/sw.js
**/public/worker-*.js
```
