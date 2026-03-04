import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    appDir: true
  },
  distDir: ".next"
};

export default nextConfig;