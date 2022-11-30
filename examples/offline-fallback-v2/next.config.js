const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  fallbacks: {
    image: "/static/images/fallback.png",
    // document: '/other-offline',  // if you want to fallback to a custom page other than /_offline
    // font: '/static/font/fallback.woff2',
    // audio: ...,
    // video: ...,
  },
});

module.exports = withPWA({
  images: {
    domains: ["source.unsplash.com"],
  },
});
