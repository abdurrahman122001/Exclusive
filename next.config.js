/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa");

// Parse hostname from BASE_URL (e.g., https://yourdomain.com → yourdomain.com)
const { hostname } = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}`);

// PWA status flag
const pwa = process.env.NEXT_PWA_STATUS;

// Main Next.js config
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false, // <--- Disabled here
  images: {
    domains: [
      hostname,                // Allow your domain
      "images.unsplash.com",
      "medias.utsavfashion.com",
      "upload.wikimedia.org",  // ✅ Allow Unsplash images
    ],
  },
};

// Combine with PWA if enabled
const nextConfigWithPwa = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);

// Export final config
module.exports = pwa === "1" ? nextConfigWithPwa : nextConfig;
