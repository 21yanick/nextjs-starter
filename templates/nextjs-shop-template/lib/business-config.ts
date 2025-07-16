// Shop Template - Hard-coded Configuration (No ENV switching)
// This replaces the universal business-config.ts with Shop-only logic

export type BusinessModel = 'shop'; // Fixed - no other options
export type PaymentRegion = 'international' | 'swiss' | 'german';

export interface BusinessConfig {
  model: 'shop'; // Always Shop
  region: PaymentRegion;
  currency: string;
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
  // No ENV switching - hard-coded Shop configuration
  const region = (process.env.PAYMENT_REGION as PaymentRegion) || 'international';
  
  const currency = region === 'swiss' ? 'CHF' : 
                  region === 'german' ? 'EUR' : 'USD';
  
  const paymentMethods = {
    international: ['card', 'link'],
    swiss: ['card', 'twint'],
    german: ['card', 'sepa_debit', 'sofort'],
  };
  
  return {
    model: 'shop',
    region,
    currency,
    features: {
      subscriptions: false, // Completely removed - no subscription code exists
      shop: true,
      bookings: false, // Completely removed - no booking code exists
    },
    payment: {
      methods: paymentMethods[region] || paymentMethods.international,
      currency,
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
      shopping: {
        addToCart: config.region === 'swiss' ? 'In den Warenkorb' : 'In den Warenkorb',
        checkout: config.region === 'swiss' ? 'Zur Kasse' : 'Zur Kasse',
        cart: config.region === 'swiss' ? 'Warenkorb' : 'Warenkorb',
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
    shopping: {
      addToCart: 'Add to Cart',
      checkout: 'Checkout',
      cart: 'Shopping Cart',
    },
  };
}

// Shop-specific configuration helpers
export function getShippingConfig() {
  const config = getBusinessConfig();
  
  return {
    freeShippingThreshold: config.region === 'swiss' ? 5000 : 5000, // 50 CHF/EUR/USD in cents
    shippingCost: config.region === 'swiss' ? 990 : 990, // 9.90 CHF/EUR/USD in cents
    allowedCountries: config.region === 'swiss' ? ['CH', 'LI'] :
                     config.region === 'german' ? ['DE', 'AT', 'CH'] :
                     ['US', 'CA', 'GB', 'EU'],
  };
}

export function getTaxConfig() {
  const config = getBusinessConfig();
  
  return {
    includeTax: config.region === 'swiss' || config.region === 'german',
    taxRate: config.region === 'swiss' ? 0.077 : // 7.7% VAT Switzerland
             config.region === 'german' ? 0.19 : // 19% VAT Germany
             0.0, // No tax for international (handled by Stripe Tax)
    taxLabel: config.region === 'swiss' ? 'inkl. 7.7% MwSt.' :
              config.region === 'german' ? 'inkl. 19% MwSt.' :
              'Tax calculated at checkout',
  };
}