import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.prod.website-files.com",
        pathname: "/66f81ae9418ca91d08c5b27e/**",
      },
    ],
  },
};

export default nextConfig;
