// @ts-check

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: false,
  workboxOptions: {
    skipWaiting: false,
  },
});

module.exports = withPWA();
