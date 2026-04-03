import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/service_data/images/**",
      },
    ],
    domains: ["localhost"],
    dangerouslyAllowLocalIP: true,
  },
};

export default nextConfig;
