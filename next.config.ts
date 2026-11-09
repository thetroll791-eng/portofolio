import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "standalone" dipakai untuk self-host / sandbox.
  // Di Vercel otomatis dimatikan (Vercel punya deploy pipeline sendiri),
  // jadi build tetap sukses tanpa config tambahan.
  ...(process.env.VERCEL ? {} : { output: "standalone" as const }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
