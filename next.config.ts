import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === "production" ? "/team_about" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/team_about" : "",
};

export default nextConfig;
