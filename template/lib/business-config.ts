// SaaS Template - Swiss-only Configuration
// This template is configured specifically for Swiss market operations

export type BusinessModel = 'saas'; // Fixed - no other options

export interface BusinessConfig {
  model: 'saas'; // Always SaaS
  currency: string;
  locale: string;
  features: {
    subscriptions: true; // Always true
    shop: false; // Always false - completely removed
    bookings: false; // Always false - completely removed
  };
  payment: {
    methods: string[];
    currency: string;
  };
}

export function getBusinessConfig(): BusinessConfig {
  // Swiss-only configuration - no multi-region support
  return {
    model: 'saas',
    currency: 'CHF',
    locale: 'de-CH',
    features: {
      subscriptions: true,
      shop: false, // Completely removed - no shop code exists
      bookings: false, // Completely removed - no booking code exists
    },
    payment: {
      methods: ['card', 'twint'], // Swiss payment methods only
      currency: 'CHF',
    },
  };
}

// SaaS-only utility functions (simplified)
export function isSaasEnabled(): boolean {
  return true; // Always true in SaaS template
}

export function isShopEnabled(): boolean {
  return false; // Always false - shop functionality removed
}

export function isBookingEnabled(): boolean {
  return false; // Always false - booking functionality removed
}

export function getDefaultRoute(): string {
  return '/dashboard'; // Always dashboard for SaaS
}

export function getPricingRoute(): string {
  return '/pricing'; // Always subscription pricing
}

export function getAvailableFeatures() {
  return {
    hasSubscriptions: true,
    hasShop: false,
    hasBookings: false,
    hasPayments: true,
    isMultiModel: false, // Single model - SaaS only
  };
}

// Swiss-specific currency formatting
export function formatCurrency(amount: number, currency?: string): string {
  const useCurrency = currency || 'CHF';
  
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: useCurrency,
  }).format(amount / 100); // Convert from Rappen
}

export function getLocalizedStrings() {
  return {
    currency: 'CHF',
    locale: 'de-CH',
    dateFormat: 'dd.MM.yyyy',
    paymentMethods: {
      card: 'Kreditkarte',
      twint: 'TWINT',
    },
  };
}