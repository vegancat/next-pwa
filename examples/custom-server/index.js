// @ts-check
// we will want to avoid having to manually compile it, but still leverages TS.
import fastifyCompress from "@fastify/compress";
import Fastify from "fastify";
import fs from "fs";
import Next from "next";
import { join } from "path";
import { fileURLToPath, parse } from "url";

import nextConfig from "./next.config.mjs";

const fastify = Fastify({
  logger: false,
});

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";

/** @type {Buffer} */
let workboxJs;

fastify.register(fastifyCompress);

fastify.register((fastify, _options, next) => {
  const app = Next({ dev, conf: nextConfig });
  const handle = app.getRequestHandler();
  app
    .prepare()
    .then(() => {
      fastify.get("/sw.js", (_request, reply) => {
        try {
          const swJs = fs.readFileSync(join(__dirname, ".next", "sw.js"));
          return reply.type("application/javascript").send(swJs);
        } catch {
          return reply.type("application/javascript").send("");
        }
      });

      fastify.get("/workbox-*", (request, reply) => {
        try {
          if (!request.raw.url) {
            return reply.type("application/javascript").send("");
          }
          const { pathname } = parse(request.raw.url, true);
          if (!pathname) {
            return reply.type("application/javascript").send("");
          }
          if (!workboxJs) {
            workboxJs = fs.readFileSync(join(__dirname, ".next", pathname));
          }
          return reply.type("application/javascript").send(workboxJs);
        } catch {
          return reply.type("application/javascript").send("");
        }
      });

      fastify.all("/*", async (request, reply) => {
        return handle(request.raw, reply.raw).then(() => {
          reply.hijack();
        });
      });

      fastify.setNotFoundHandler(async (request, reply) => {
        return app.render404(request.raw, reply.raw).then(() => {
          reply.hijack();
        });
      });

      next();
    })
    .catch((err) => next(err));
});

fastify.listen({ port }, (err, address) => {
  if (err) throw err;
  console.log(`> Ready on ${address}`);
});
