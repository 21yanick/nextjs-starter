/**
 * Swiss SaaS Template - Plan Configuration
 * Centralized plan definitions optimized for Swiss market (CHF)
 */

export type PlanType = 'free' | 'starter' | 'pro';

export interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: number; // in CHF
  currency: 'CHF';
  interval: 'month';
  icon: string;
  features: string[];
  badgeVariant: 'secondary' | 'outline' | 'default';
  highlight?: boolean;
}

/**
 * Swiss-optimized plan definitions
 * Prices in Swiss Francs (CHF)
 */
export const PLANS: Record<PlanType, Plan> = {
  free: {
    id: 'free',
    name: 'Free',
    description: 'Perfect for getting started',
    price: 0,
    currency: 'CHF',
    interval: 'month',
    icon: '🆓',
    badgeVariant: 'secondary',
    features: [
      'Basic dashboard',
      'Core features', 
      'Community support'
    ]
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    description: 'Essential features for small projects',
    price: 9.90,
    currency: 'CHF',
    interval: 'month',
    icon: '🟡',
    badgeVariant: 'outline',
    highlight: true,
    features: [
      'Advanced dashboard',
      'Email support',
      'Extended features',
      'Basic analytics'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Professional', 
    description: 'Advanced features for growing businesses',
    price: 19.90,
    currency: 'CHF',
    interval: 'month',
    icon: '🟢',
    badgeVariant: 'default',
    features: [
      'Premium dashboard',
      'Priority support',
      'Advanced analytics',
      'Custom integrations',
      'API access'
    ]
  }
} as const;

/**
 * Get plan information by plan type
 */
export function getPlan(planType: PlanType): Plan {
  return PLANS[planType] || PLANS.free;
}

/**
 * Format Swiss currency (CHF)
 */
export function formatSwissPrice(price: number): string {
  if (price === 0) return 'Free forever';
  
  return new Intl.NumberFormat('de-CH', {
    style: 'currency',
    currency: 'CHF',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Get plan price display text
 */
export function getPlanPriceText(plan: Plan): string {
  if (plan.price === 0) return 'Free forever';
  return `${plan.currency} ${plan.price.toFixed(2)}/${plan.interval}`;
}

/**
 * Get all plans as array for comparison display
 */
export function getAllPlans(): Plan[] {
  return [PLANS.free, PLANS.starter, PLANS.pro];
}