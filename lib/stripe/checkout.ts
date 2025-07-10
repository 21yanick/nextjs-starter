// Universal Checkout Interface
// This file provides a unified interface for all payment types

import { BusinessModel, getBusinessConfig } from './config';
import { createSubscriptionCheckout, SubscriptionPlan } from './subscription';
import { createShopCheckout, CartItem } from './shop';
import { createBookingCheckout, BookingService, BookingSlot } from './booking';

export type CheckoutType = 'subscription' | 'shop' | 'booking';

export interface UniversalCheckoutOptions {
  type: CheckoutType;
  
  // Subscription-specific options
  subscriptionPlan?: SubscriptionPlan;
  trialDays?: number;
  
  // Shop-specific options
  cartItems?: CartItem[];
  requireShipping?: boolean;
  
  // Booking-specific options
  service?: BookingService;
  timeSlot?: BookingSlot;
  appointmentId?: string;
  deposit?: number;
  
  // Common options
  metadata?: Record<string, string>;
}

export async function createUniversalCheckout(options: UniversalCheckoutOptions) {
  const config = getBusinessConfig();
  
  switch (options.type) {
    case 'subscription':
      if (!options.subscriptionPlan) {
        throw new Error('Subscription plan is required for subscription checkout');
      }
      return await createSubscriptionCheckout({
        priceId: options.subscriptionPlan,
        trialDays: options.trialDays,
        metadata: options.metadata,
      });
      
    case 'shop':
      if (!options.cartItems || options.cartItems.length === 0) {
        throw new Error('Cart items are required for shop checkout');
      }
      return await createShopCheckout({
        items: options.cartItems,
        requireShipping: options.requireShipping,
        metadata: options.metadata,
      });
      
    case 'booking':
      if (!options.service || !options.timeSlot) {
        throw new Error('Service and time slot are required for booking checkout');
      }
      return await createBookingCheckout({
        service: options.service,
        slot: options.timeSlot,
        appointmentId: options.appointmentId,
        deposit: options.deposit,
        metadata: options.metadata,
      });
      
    default:
      throw new Error(`Unsupported checkout type: ${options.type}`);
  }
}

// Backward compatibility - Legacy function
export async function createCheckoutSession(priceId: SubscriptionPlan) {
  return await createSubscriptionCheckout({ priceId });
}

// Business model detection for automatic checkout type selection
export function getRecommendedCheckoutType(): CheckoutType {
  const config = getBusinessConfig();
  
  if (config.businessModel === 'saas' && config.enableSubscriptions) {
    return 'subscription';
  } else if (config.businessModel === 'shop' && config.enableShop) {
    return 'shop';
  } else if (config.businessModel === 'booking' && config.enableBookings) {
    return 'booking';
  }
  
  // Default fallback based on enabled features
  if (config.enableSubscriptions) return 'subscription';
  if (config.enableShop) return 'shop';
  if (config.enableBookings) return 'booking';
  
  return 'shop'; // Safe default
}