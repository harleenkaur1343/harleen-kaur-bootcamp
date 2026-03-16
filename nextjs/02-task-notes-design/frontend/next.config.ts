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
  async headers() {
    return [
      {
        // static files — cache forever (they have hashed names)
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          }
        ]
      },
      {
        // images in /public folder
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          }
        ]
      },
      {
        // fonts
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          }
        ]
      },
      {
        // API routes — no caching
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store",
          }
        ]
      }
    ]
  }
};

export default nextConfig;