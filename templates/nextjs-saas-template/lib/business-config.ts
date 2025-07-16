// SaaS Template - Hard-coded Configuration (No ENV switching)
// This replaces the universal business-config.ts with SaaS-only logic

export type BusinessModel = 'saas'; // Fixed - no other options
export type PaymentRegion = 'international' | 'swiss' | 'german';

export interface BusinessConfig {
  model: 'saas'; // Always SaaS
  region: PaymentRegion;
  currency: string;
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
  // No ENV switching - hard-coded SaaS configuration
  const region = (process.env.PAYMENT_REGION as PaymentRegion) || 'international';
  
  const currency = region === 'swiss' ? 'CHF' : 
                  region === 'german' ? 'EUR' : 'USD';
  
  const paymentMethods = {
    international: ['card', 'link'],
    swiss: ['card', 'twint'],
    german: ['card', 'sepa_debit', 'sofort'],
  };
  
  return {
    model: 'saas',
    region,
    currency,
    features: {
      subscriptions: true,
      shop: false, // Completely removed - no shop code exists
      bookings: false, // Completely removed - no booking code exists
    },
    payment: {
      methods: paymentMethods[region] || paymentMethods.international,
      currency,
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

// Keep currency formatting (universal utility)
export function formatCurrency(amount: number, currency?: string): string {
  const config = getBusinessConfig();
  const useCurrency = currency || config.currency;
  
  return new Intl.NumberFormat(
    config.region === 'swiss' ? 'de-CH' :
    config.region === 'german' ? 'de-DE' : 'en-US',
    {
      style: 'currency',
      currency: useCurrency,
    }
  ).format(amount / 100);
}

export function getLocalizedStrings() {
  const config = getBusinessConfig();
  
  if (config.region === 'swiss' || config.region === 'german') {
    return {
      currency: config.currency,
      locale: config.region === 'swiss' ? 'de-CH' : 'de-DE',
      dateFormat: 'dd.MM.yyyy',
      paymentMethods: {
        card: 'Kreditkarte',
        twint: 'TWINT',
        sepa_debit: 'SEPA Lastschrift',
        sofort: 'Sofort',
      },
    };
  }
  
  return {
    currency: config.currency,
    locale: 'en-US',
    dateFormat: 'MM/dd/yyyy',
    paymentMethods: {
      card: 'Credit Card',
      link: 'Link',
    },
  };
}