const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: false,
  skipWaiting: false,
});

module.exports = withPWA();
