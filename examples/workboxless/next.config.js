const withPWA = require("@ducanh2912/next-pwa-workboxless").default();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

module.exports = withPWA(nextConfig);
