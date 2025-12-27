import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // wildcard: sab host allow
        pathname: "**", // sab path allow
      },
    ],
  },
};

export default nextConfig;
