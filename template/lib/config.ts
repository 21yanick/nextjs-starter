/**
 * Site Configuration - Single Source of Truth
 * Swiss SaaS Template - Essential configurations for customer projects
 */

export const siteConfig = {
  // Core Brand Identity - Updated in 100% of customer projects
  name: "SaaS Starter",
  description: "100% self-hosted SaaS starter kit with Next.js 15, Supabase, and Stripe. Production-ready from day 1.",
  
  // Business Essentials - Different for each market
  currency: "CHF" as const,
  region: "swiss" as const,
  locale: "de-CH" as const,
  
  // Contact & Legal - Required by Swiss/EU law
  contact: {
    email: "support@yourcompany.com",
    company: "Your Company Name"
  },
  
  // Core Business Pricing - Market-specific adjustments
  pricing: {
    starter: 9.90,
    pro: 19.90
  }
} as const;

// Type exports for TypeScript safety
export type SiteConfig = typeof siteConfig;
export type Currency = typeof siteConfig.currency;
export type Region = typeof siteConfig.region;
export type Locale = typeof siteConfig.locale;

/**
 * Helper function to get formatted currency display
 */
export function formatPrice(amount: number): string {
  if (amount === 0) return 'Free forever';
  
  return new Intl.NumberFormat(siteConfig.locale, {
    style: 'currency',
    currency: siteConfig.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Helper function to get site metadata
 */
export function getSiteMetadata() {
  return {
    title: `${siteConfig.name} - Self-Hosted Next.js 15 Kit`,
    description: siteConfig.description,
    author: siteConfig.contact.company,
    keywords: ['saas', 'nextjs', 'supabase', 'stripe', 'self-hosted', siteConfig.region]
  };
}