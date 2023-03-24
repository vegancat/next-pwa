import path from "path";

import type { FallbackRoutes } from "../types.js";

export const getFallbackEnvs = ({
  fallbacks,
  id,
}: {
  fallbacks: FallbackRoutes;
  id: string;
}) => {
  let data = fallbacks.data;

  if (data && data.endsWith(".json")) {
    data = path.posix.join("/_next/data", id, data);
  }

  const envs = {
    __PWA_FALLBACK_DOCUMENT__: fallbacks.document || false,
    __PWA_FALLBACK_IMAGE__: fallbacks.image || false,
    __PWA_FALLBACK_AUDIO__: fallbacks.audio || false,
    __PWA_FALLBACK_VIDEO__: fallbacks.video || false,
    __PWA_FALLBACK_FONT__: fallbacks.font || false,
    __PWA_FALLBACK_DATA__: data || false,
  };

  if (Object.values(envs).filter((v) => !!v).length === 0) return;

  console.log(
    "> [PWA] This app will fallback to these precached routes when fetching from cache or network fails:"
  );

  if (envs.__PWA_FALLBACK_DOCUMENT__) {
    console.log(
      `> [PWA]   Documents (pages): ${envs.__PWA_FALLBACK_DOCUMENT__}`
    );
  }
  if (envs.__PWA_FALLBACK_IMAGE__) {
    console.log(`> [PWA]   Images: ${envs.__PWA_FALLBACK_IMAGE__}`);
  }
  if (envs.__PWA_FALLBACK_AUDIO__) {
    console.log(`> [PWA]   Audio: ${envs.__PWA_FALLBACK_AUDIO__}`);
  }
  if (envs.__PWA_FALLBACK_VIDEO__) {
    console.log(`> [PWA]   Videos: ${envs.__PWA_FALLBACK_VIDEO__}`);
  }
  if (envs.__PWA_FALLBACK_FONT__) {
    console.log(`> [PWA]   Fonts: ${envs.__PWA_FALLBACK_FONT__}`);
  }
  if (envs.__PWA_FALLBACK_DATA__) {
    console.log(
      `> [PWA]   Data (/_next/data/**/*.json): ${envs.__PWA_FALLBACK_DATA__}`
    );
  }

  return envs;
};
