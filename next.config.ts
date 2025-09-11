import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "your-domain.com", // Replace with your actual domain
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
