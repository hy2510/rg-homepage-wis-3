/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wcfresource.a1edu.com",
      },
      {
        protocol: "http",
        hostname: "wcfresource.a1edu.com",
      },
    ],
  },
};

// const withPWA = require('next-pwa')({
//   dest: 'public',
// });

// module.exports = withPWA(nextConfig);
module.exports = nextConfig;
