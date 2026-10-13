import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [
    "192.168.6.236",
    "192.168.*",
    "10.170.173.60",
    "10.*",
    "localhost",
    "127.0.0.1",
  ],
  turbopack: {
    root: __dirname,
  },
  // v2 used to live under /v2 (shared links); it is now the main site.
  // "/v2" is listed on its own: ":path*" matches nothing there and Next would emit an empty Location header.
  redirects: async () => [
    { source: "/v2", destination: "/", permanent: true },
    { source: "/v2/:path+", destination: "/:path+", permanent: true },
  ],
};

export default nextConfig;
