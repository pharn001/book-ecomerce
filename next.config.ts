import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost','www.sompharn.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '', // Add your www.sompharn.com here
        port: '', // ຖ້າບໍ່ມີບໍ່ຕ້ອງໃສ່
        pathname: '/upload/**',
      }
    ]
  },
};

export default nextConfig;
