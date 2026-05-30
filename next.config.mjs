// Base path for GitHub Pages project sites (served under /<repo>).
// Set NEXT_PUBLIC_BASE_PATH=/PixelWeddingPage in CI; empty locally.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> ./out (works on GitHub Pages / any static host).
  output: "export",
  basePath: basePath || undefined,
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Pixel art must never be smoothed/optimized away, and the export
    // target has no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
