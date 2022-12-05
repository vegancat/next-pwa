const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  workboxOptions: {
    swSrc: "service-worker.js",
  },
});

module.exports = withPWA({
  images: {
    domains: ["source.unsplash.com"],
  },
});
