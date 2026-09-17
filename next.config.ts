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
};

export default nextConfig;
