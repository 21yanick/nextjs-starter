import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
  typescript: true,
});

// Business Model Types
export type BusinessModel = 'saas' | 'shop' | 'booking' | 'universal';
export type PaymentMode = 'subscription' | 'payment' | 'setup';

// Swiss-only Payment Methods Configuration
export const PAYMENT_METHODS = {
  swiss: ['card', 'twint'],
} as const;

// SaaS Subscription Configuration
export const SUBSCRIPTION_PRICES = {
  starter: process.env.STRIPE_STARTER_PRICE_ID!,
  pro: process.env.STRIPE_PRO_PRICE_ID!,
  enterprise: process.env.STRIPE_ENTERPRISE_PRICE_ID,
} as const;

// Business Model Configuration (Swiss-only)
export function getBusinessConfig() {
  const businessModel = (process.env.BUSINESS_MODEL as BusinessModel) || 'saas';
  
  return {
    businessModel,
    region: 'swiss',
    paymentMethods: PAYMENT_METHODS.swiss,
    currency: 'CHF',
    enableSubscriptions: process.env.ENABLE_SUBSCRIPTIONS === 'true',
    enableShop: process.env.ENABLE_SHOP === 'true',
    enableBookings: process.env.ENABLE_BOOKINGS === 'true',
  };
}

// Utility to get available payment methods for checkout
export function getPaymentMethodsForCheckout(businessModel?: BusinessModel) {
  const config = getBusinessConfig();
  
  // Swiss-only payment methods - all available for SaaS model
  return config.paymentMethods;
}