import { env } from './env';

export type BusinessModel = 'saas' | 'shop' | 'booking' | 'universal';
export type PaymentRegion = 'international' | 'swiss' | 'german' | 'universal';

export interface BusinessConfig {
  model: BusinessModel;
  region: PaymentRegion;
  currency: string;
  features: {
    subscriptions: boolean;
    shop: boolean;
    bookings: boolean;
  };
  payment: {
    methods: string[];
    currency: string;
  };
}

export function getBusinessConfig(): BusinessConfig {
  const model = env.BUSINESS_MODEL;
  const region = env.PAYMENT_REGION;
  
  
  // Determine currency based on region
  const currency = region === 'swiss' ? 'CHF' : 
                  region === 'german' ? 'EUR' : 'USD';
  
  // Determine payment methods based on region
  const paymentMethods = {
    international: ['card', 'link'],
    swiss: ['card', 'twint'],
    german: ['card', 'sepa_debit', 'sofort'],
    universal: ['card'],
  };
  
  return {
    model,
    region,
    currency,
    features: {
      subscriptions: env.ENABLE_SUBSCRIPTIONS,
      shop: env.ENABLE_SHOP,
      bookings: env.ENABLE_BOOKINGS,
    },
    payment: {
      methods: paymentMethods[region] || paymentMethods.universal,
      currency,
    },
  };
}

// Business model specific utilities
export function isSaasEnabled(): boolean {
  const config = getBusinessConfig();
  return config.model === 'saas' || (config.model === 'universal' && config.features.subscriptions);
}

export function isShopEnabled(): boolean {
  const config = getBusinessConfig();
  return config.model === 'shop' || (config.model === 'universal' && config.features.shop);
}

export function isBookingEnabled(): boolean {
  const config = getBusinessConfig();
  return config.model === 'booking' || (config.model === 'universal' && config.features.bookings);
}

// Navigation/routing helpers
export function getDefaultRoute(): string {
  const config = getBusinessConfig();
  
  switch (config.model) {
    case 'saas':
      return '/dashboard';
    case 'shop':
      return '/shop';
    case 'booking':
      return '/booking';
    default:
      // Universal - choose based on enabled features
      if (config.features.subscriptions) return '/dashboard';
      if (config.features.shop) return '/shop';
      if (config.features.bookings) return '/booking';
      return '/';
  }
}

export function getPricingRoute(): string {
  const config = getBusinessConfig();
  
  if (config.features.subscriptions) {
    return '/pricing';
  } else if (config.features.shop) {
    return '/shop';
  } else if (config.features.bookings) {
    return '/booking';
  }
  
  return '/pricing';
}

// Feature availability checks for components
export function getAvailableFeatures() {
  const config = getBusinessConfig();
  
  return {
    hasSubscriptions: config.features.subscriptions,
    hasShop: config.features.shop,
    hasBookings: config.features.bookings,
    hasPayments: config.features.subscriptions || config.features.shop || config.features.bookings,
    isMultiModel: [config.features.subscriptions, config.features.shop, config.features.bookings]
      .filter(Boolean).length > 1,
  };
}

// Region-specific helpers
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
  ).format(amount / 100); // Convert from cents
}

export function getLocalizedStrings() {
  const config = getBusinessConfig();
  
  // Basic localization based on region
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