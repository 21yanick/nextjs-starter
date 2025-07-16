import { env } from './env';

export type BusinessModel = 'saas' | 'shop' | 'booking' | 'universal';

// Swiss-only configuration (simplified from multi-region)
export interface BusinessConfig {
  model: BusinessModel;
  currency: string;
  locale: string;
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
  
  return {
    model,
    currency: 'CHF',
    locale: 'de-CH',
    features: {
      subscriptions: env.ENABLE_SUBSCRIPTIONS,
      shop: env.ENABLE_SHOP,
      bookings: env.ENABLE_BOOKINGS,
    },
    payment: {
      methods: ['card', 'twint'], // Swiss payment methods only
      currency: 'CHF',
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

// Swiss-specific helpers (simplified from multi-region)
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