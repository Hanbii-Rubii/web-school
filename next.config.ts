import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {},

  webpack(config) {
    config.resolve.alias["@"] = path.join(__dirname, "src");
    return config;
  }
};

export default nextConfig;