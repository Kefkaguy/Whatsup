/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Let production checks run without sharing the active dev server's cache.
  distDir: process.env.PORTFOLIO_BUILD_DIR || ".next",
};

export default nextConfig;
