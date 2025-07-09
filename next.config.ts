import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['pino', 'pino-pretty'],
  
  // Optimize for production
  output: 'standalone',
  
  // Security headers are handled in middleware.ts
  
  // Turbopack configuration (now stable)
  turbopack: {
    resolveAlias: {
      // Turbopack handles node.js polyfills automatically
    },
  },
};

export default nextConfig;
