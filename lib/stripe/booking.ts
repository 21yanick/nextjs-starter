import { stripe, getBusinessConfig, getPaymentMethodsForCheckout } from './config';
import { getUser } from '@/lib/supabase/server';
import Stripe from 'stripe';

export interface BookingService {
  name: string;
  description?: string;
  price: number; // in cents
  duration: number; // in minutes
  category?: string;
}

export interface BookingSlot {
  startTime: Date;
  endTime: Date;
  serviceId?: string;
}

export interface CreateBookingCheckoutOptions {
  service: BookingService;
  slot: BookingSlot;
  appointmentId?: string;
  deposit?: number; // deposit amount in cents, if different from full price
  metadata?: Record<string, string>;
}

export async function createBookingCheckout({
  service,
  slot,
  appointmentId,
  deposit,
  metadata = {},
}: CreateBookingCheckoutOptions) {
  const user = await getUser();
  if (!user?.email) throw new Error('User must be logged in to book appointments');

  const config = getBusinessConfig();
  const paymentMethods = getPaymentMethodsForCheckout('booking');
  
  // Use deposit amount if specified, otherwise full price
  const paymentAmount = deposit || service.price;
  const isDeposit = deposit && deposit < service.price;

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    customer_email: user.email,
    mode: 'payment',
    payment_method_types: paymentMethods as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
    line_items: [
      {
        price_data: {
          currency: config.currency.toLowerCase(),
          product_data: {
            name: isDeposit ? `${service.name} - Deposit` : service.name,
            description: `${service.description || ''}\n\nScheduled: ${slot.startTime.toLocaleString()} - ${slot.endTime.toLocaleString()}`,
            metadata: {
              serviceType: 'booking',
              serviceName: service.name,
              duration: service.duration.toString(),
              startTime: slot.startTime.toISOString(),
              endTime: slot.endTime.toISOString(),
            },
          },
          unit_amount: paymentAmount,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/booking`,
    metadata: {
      businessModel: 'booking',
      appointmentId: appointmentId || '',
      userId: user.id,
      serviceName: service.name,
      servicePrice: service.price.toString(),
      paymentAmount: paymentAmount.toString(),
      isDeposit: isDeposit ? 'true' : 'false',
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString(),
      duration: service.duration.toString(),
      ...metadata,
    },
  };

  const session = await stripe.checkout.sessions.create(sessionParams);
  return session;
}

export async function createBookingPaymentIntent(
  service: BookingService,
  slot: BookingSlot,
  appointmentId?: string,
  deposit?: number,
  metadata: Record<string, string> = {}
) {
  const user = await getUser();
  if (!user) throw new Error('User must be logged in to book appointments');

  const config = getBusinessConfig();
  const paymentAmount = deposit || service.price;
  const isDeposit = deposit && deposit < service.price;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: paymentAmount,
    currency: config.currency.toLowerCase(),
    payment_method_types: getPaymentMethodsForCheckout('booking') as string[],
    metadata: {
      businessModel: 'booking',
      appointmentId: appointmentId || '',
      userId: user.id,
      serviceName: service.name,
      servicePrice: service.price.toString(),
      paymentAmount: paymentAmount.toString(),
      isDeposit: isDeposit ? 'true' : 'false',
      startTime: slot.startTime.toISOString(),
      endTime: slot.endTime.toISOString(),
      duration: service.duration.toString(),
      ...metadata,
    },
  });

  return paymentIntent;
}

export async function cancelBookingPayment(paymentIntentId: string, reason?: string) {
  const user = await getUser();
  if (!user) throw new Error('User not authenticated');

  return await stripe.paymentIntents.cancel(paymentIntentId, {
    cancellation_reason: 'requested_by_customer',
  });
}

export async function refundBookingPayment(
  paymentIntentId: string, 
  amount?: number, 
  reason: string = 'requested_by_customer'
) {
  const user = await getUser();
  if (!user) throw new Error('User not authenticated');

  const refundData: Stripe.RefundCreateParams = {
    payment_intent: paymentIntentId,
    metadata: {
      refundedBy: user.id,
      refundedAt: new Date().toISOString(),
      reason,
      businessModel: 'booking',
    },
  };

  if (amount) {
    refundData.amount = amount;
  }

  return await stripe.refunds.create(refundData);
}

// Helper function to calculate booking price with time-based adjustments
export function calculateBookingPrice(
  basePrice: number,
  duration: number,
  timeSlot: Date,
  options: {
    peakHourMultiplier?: number;
    weekendMultiplier?: number;
    holidayMultiplier?: number;
  } = {}
): number {
  let finalPrice = basePrice;
  
  const hour = timeSlot.getHours();
  const isWeekend = timeSlot.getDay() === 0 || timeSlot.getDay() === 6;
  
  // Peak hours (9-12, 14-18)
  if ((hour >= 9 && hour <= 12) || (hour >= 14 && hour <= 18)) {
    finalPrice *= options.peakHourMultiplier || 1.0;
  }
  
  // Weekend pricing
  if (isWeekend) {
    finalPrice *= options.weekendMultiplier || 1.0;
  }
  
  // Duration-based pricing (longer appointments might have discounts)
  if (duration > 120) { // 2+ hours
    finalPrice *= 0.9; // 10% discount for long appointments
  }
  
  return Math.round(finalPrice);
}