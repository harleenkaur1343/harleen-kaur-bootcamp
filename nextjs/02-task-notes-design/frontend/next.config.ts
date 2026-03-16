import type { NextConfig } from "next";
import ".env";

const nextConfig: NextConfig = {
  /* config options here */
   async rewrites() {
     const apiUrl = process.env.API_URL || 'http://localhost:9000';
    return [
      {
        source: '/api/:path*',
        destination: `import.meta.${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
