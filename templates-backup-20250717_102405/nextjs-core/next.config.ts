import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Only add serverExternalPackages in production or when Sentry is actually configured
  ...(process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_SENTRY_DSN && !process.env.NEXT_PUBLIC_SENTRY_DSN.includes('xxx') ? {
    serverExternalPackages: [
      'pino', 
      'pino-pretty',
      'import-in-the-middle',
      'require-in-the-middle',
      '@opentelemetry/instrumentation',
      '@sentry/node',
      '@sentry/node-core'
    ],
  } : {}),
  
  // Optimize for production
  output: 'standalone',
  
  // Security headers are handled in middleware.ts
  
  // Turbopack configuration (stable in Next.js 15.3+)
  turbopack: {
    resolveAlias: {
      // Turbopack handles node.js polyfills automatically
    },
  },
};

export default nextConfig;
