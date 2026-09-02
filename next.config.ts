import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86_400,
    qualities: [75, 100],
    localPatterns: [{ pathname: "/images/**" }]
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.automade.in" }],
        destination: "https://automade.in/:path*",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
