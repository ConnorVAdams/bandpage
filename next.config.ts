import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/", // e.g., "/my-nextjs-app"
  assetPrefix: "/", // e.g., "/my-nextjs-app/"
  images: {
    unoptimized: true, // required for next/image with static export to work without a third-party service
  },
};

export default nextConfig;
