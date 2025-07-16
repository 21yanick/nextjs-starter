// Shop Template - Swiss-only Configuration
// This template is configured specifically for Swiss market operations

export type BusinessModel = 'shop'; // Fixed - no other options

export interface BusinessConfig {
  model: 'shop'; // Always Shop
  currency: string;
  locale: string;
  features: {
    subscriptions: false; // Always false - completely removed
    shop: true; // Always true
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
    model: 'shop',
    currency: 'CHF',
    locale: 'de-CH',
    features: {
      subscriptions: false, // Completely removed - no subscription code exists
      shop: true,
      bookings: false, // Completely removed - no booking code exists
    },
    payment: {
      methods: ['card', 'twint'], // Swiss payment methods only
      currency: 'CHF',
    },
  };
}

// Shop-only utility functions (simplified)
export function isSaasEnabled(): boolean {
  return false; // Always false - subscription functionality removed
}

export function isShopEnabled(): boolean {
  return true; // Always true in Shop template
}

export function isBookingEnabled(): boolean {
  return false; // Always false - booking functionality removed
}

export function getDefaultRoute(): string {
  return '/shop'; // Always shop catalog for Shop
}

export function getPricingRoute(): string {
  return '/shop'; // Always product catalog
}

export function getAvailableFeatures() {
  return {
    hasSubscriptions: false,
    hasShop: true,
    hasBookings: false,
    hasPayments: true,
    isMultiModel: false, // Single model - Shop only
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
    shopping: {
      addToCart: 'In den Warenkorb',
      checkout: 'Zur Kasse',
      cart: 'Warenkorb',
    },
  };
}

// Swiss-specific shop configuration helpers
export function getShippingConfig() {
  return {
    freeShippingThreshold: 5000, // 50 CHF in cents
    shippingCost: 990, // 9.90 CHF in cents
    allowedCountries: ['CH', 'LI'], // Switzerland and Liechtenstein
  };
}

export function getTaxConfig() {
  return {
    includeTax: true,
    taxRate: 0.077, // 7.7% VAT Switzerland
    taxLabel: 'inkl. 7.7% MwSt.',
  };
}