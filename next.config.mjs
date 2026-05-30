/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Pixel art must never be smoothed/optimized away.
    unoptimized: true,
  },
};

export default nextConfig;
