const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  swSrc: "service-worker.js",
});

module.exports = withPWA({
  images: {
    domains: ["source.unsplash.com"],
  },
});
