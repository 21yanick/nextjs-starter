import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
  typescript: true,
});

// Business Model Types
export type BusinessModel = 'saas' | 'shop' | 'booking' | 'universal';
export type PaymentMode = 'subscription' | 'payment' | 'setup';

// Universal Payment Methods Configuration
export const PAYMENT_METHODS = {
  // Default payment methods by region/business model
  international: ['card', 'link'],
  swiss: ['card', 'twint'],
  german: ['card', 'sepa_debit', 'sofort'],
  universal: ['card'], // Safe default
} as const;

// SaaS Subscription Configuration
export const SUBSCRIPTION_PRICES = {
  starter: process.env.STRIPE_STARTER_PRICE_ID!,
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
} as const;

// Business Model Configuration
export function getBusinessConfig() {
  const businessModel = (process.env.BUSINESS_MODEL as BusinessModel) || 'universal';
  const region = process.env.PAYMENT_REGION || 'universal';
  
  return {
    businessModel,
    region,
    paymentMethods: PAYMENT_METHODS[region as keyof typeof PAYMENT_METHODS] || PAYMENT_METHODS.universal,
    currency: region === 'swiss' ? 'CHF' : region === 'german' ? 'EUR' : 'USD',
    enableSubscriptions: process.env.ENABLE_SUBSCRIPTIONS === 'true',
    enableShop: process.env.ENABLE_SHOP === 'true',
    enableBookings: process.env.ENABLE_BOOKINGS === 'true',
  };
}

// Utility to get available payment methods for checkout
export function getPaymentMethodsForCheckout(businessModel?: BusinessModel) {
  const config = getBusinessConfig();
  
  // Business model specific payment method filtering
  switch (businessModel || config.businessModel) {
    case 'saas':
      return config.paymentMethods; // All available methods
    case 'shop':
      return config.paymentMethods; // All available methods
    case 'booking':
      return config.paymentMethods.filter(method => method !== 'sepa_debit'); // Immediate payments only
    default:
      return config.paymentMethods;
  }
}