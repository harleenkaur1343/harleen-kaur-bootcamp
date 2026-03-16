import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   async rewrites() {
     const apiUrl = process.env.API_URL || 'http://localhost:9000';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
