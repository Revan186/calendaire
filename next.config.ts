import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
        
      },
      {
        hostname:  'utfs.io',
      }
    ],
  },
};

export default nextConfig;
