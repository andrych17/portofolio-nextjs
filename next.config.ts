import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // @ts-ignore - turbopack.root is valid but not in type definitions
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
