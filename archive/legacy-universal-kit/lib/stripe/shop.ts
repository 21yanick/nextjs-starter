import { stripe, getBusinessConfig, getPaymentMethodsForCheckout } from './config';
import { getUser } from '@/lib/supabase/server';
import Stripe from 'stripe';

export interface CartItem {
  productId: string;
  name: string;
  price: number; // in cents
  quantity: number;
  description?: string;
  image?: string;
  metadata?: Record<string, string>;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  postal_code: string;
  country: string;
  state?: string;
}

export interface CreateShopCheckoutOptions {
  items: CartItem[];
  orderId?: string;
  shippingAddress?: ShippingAddress;
  billingAddress?: ShippingAddress;
  metadata?: Record<string, string>;
  requireShipping?: boolean;
}

export async function createShopCheckout({
  items,
  orderId,
  shippingAddress,
  billingAddress,
  metadata = {},
  requireShipping = false,
}: CreateShopCheckoutOptions) {
  if (!items || items.length === 0) {
    throw new Error('Cart cannot be empty');
  }

  const user = await getUser();
  const config = getBusinessConfig();
  const paymentMethods = getPaymentMethodsForCheckout('shop');

  // Calculate total
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'payment',
    payment_method_types: paymentMethods as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
    line_items: items.map(item => ({
      price_data: {
        currency: config.currency.toLowerCase(),
        product_data: {
          name: item.name,
          description: item.description,
          images: item.image ? [item.image] : undefined,
          metadata: item.metadata || {},
        },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/cart`,
    metadata: {
      businessModel: 'shop',
      orderId: orderId || '',
      totalAmount: totalAmount.toString(),
      itemCount: items.length.toString(),
      ...metadata,
    },
  };

  // Add customer info if user is logged in
  if (user?.email) {
    sessionParams.customer_email = user.email;
    sessionParams.metadata!.userId = user.id;
  }

  // Add shipping configuration
  if (requireShipping) {
    sessionParams.shipping_address_collection = {
      allowed_countries: ['CH', 'DE', 'AT', 'FR', 'IT'], // Customize as needed
    };
  }

  // Pre-fill shipping address if provided
  if (shippingAddress) {
    sessionParams.shipping_options = [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0, // Free shipping, customize as needed
            currency: config.currency.toLowerCase(),
          },
          display_name: 'Standard Shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 2,
            },
            maximum: {
              unit: 'business_day',
              value: 5,
            },
          },
        },
      },
    ];
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  return session;
}

export async function createPaymentIntent(
  amount: number,
  currency: string = 'eur',
  orderId?: string,
  metadata: Record<string, string> = {}
) {
  const user = await getUser();
  const config = getBusinessConfig();

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: currency.toLowerCase(),
    payment_method_types: getPaymentMethodsForCheckout('shop') as string[],
    metadata: {
      businessModel: 'shop',
      orderId: orderId || '',
      userId: user?.id || '',
      ...metadata,
    },
  });

  return paymentIntent;
}

export async function refundPayment(paymentIntentId: string, amount?: number, reason?: string) {
  const user = await getUser();
  if (!user) throw new Error('User not authenticated');

  const refundData: Stripe.RefundCreateParams = {
    payment_intent: paymentIntentId,
    metadata: {
      refundedBy: user.id,
      refundedAt: new Date().toISOString(),
      reason: reason || 'requested_by_customer',
    },
  };

  if (amount) {
    refundData.amount = amount;
  }

  return await stripe.refunds.create(refundData);
}