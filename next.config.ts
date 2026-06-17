import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Allow this local IP during development for HMR and asset loading
  allowedDevOrigins: ["192.168.23.172"],
};

export default nextConfig;
