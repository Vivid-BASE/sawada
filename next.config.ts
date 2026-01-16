import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'custom-images.strikinglycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'static-assets.strikinglycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'user-images.strikinglycdn.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  basePath: process.env.NODE_ENV === 'production' ? '/sawada' : '',
};

export default nextConfig;
