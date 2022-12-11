import fastifyCompress from "@fastify/compress";
import Fastify from "fastify";
import Next from "next";

import nextConfig from "./next.config.js";

const fastify = Fastify({
  logger: {
    level: "error",
  },
});

const port = parseInt(process.env.PORT ?? "3000", 10);
const dev = process.env.NODE_ENV !== "production";

fastify.register(fastifyCompress);

fastify.register((fastify, _options, next) => {
  const app = Next({ dev, conf: nextConfig });
  const handle = app.getRequestHandler();
  app
    .prepare()
    .then(() => {
      if (dev) {
        fastify.get("/_next/*", async (request, reply) => {
          return handle(request.raw, reply.raw).then(() => {
            reply.hijack();
          });
        });
      }
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

fastify.listen({ port }, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});
