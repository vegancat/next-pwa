import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  // pwa output folder
  // dest: '.next/pwa'
  //
  // Other configurations:
  // ...
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

export default withPWA(nextConfig);
