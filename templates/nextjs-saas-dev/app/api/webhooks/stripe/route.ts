import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/config'
import { createServerClient } from '@supabase/ssr'
import { getLogger } from '@/lib/logger'
import Stripe from 'stripe'

const logger = getLogger('stripe-webhook')

// Map Stripe price IDs to plan types using environment variables
function getPlanTypeFromPriceId(priceId: string): 'free' | 'starter' | 'pro' | 'enterprise' {
  if (priceId === process.env.STRIPE_STARTER_PRICE_ID) return 'starter'
  if (priceId === process.env.STRIPE_PRO_PRICE_ID) return 'pro'
  if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) return 'enterprise'
  return 'free'
}

// Create Supabase client with service role for webhook operations
function createServiceClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return [] },
        setAll() { },
      },
    }
  )
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    logger.error('Missing Stripe signature')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    logger.error({ error }, 'Invalid webhook signature')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = createServiceClient()

  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        logger.info({ subscriptionId: subscription.id }, 'Processing subscription event')

        // Get customer to find user
        const customer = await stripe.customers.retrieve(subscription.customer as string)
        if (!customer || customer.deleted) {
          logger.error({ customerId: subscription.customer }, 'Customer not found')
          break
        }

        // Find user by email
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('email', (customer as Stripe.Customer).email)
          .single()

        if (!profile) {
          logger.error({ email: (customer as Stripe.Customer).email }, 'User profile not found')
          break
        }

        // Upsert subscription
        const firstItem = subscription.items.data[0]
        const planType = getPlanTypeFromPriceId(firstItem?.price.id || '')
        
        const { error } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: profile.id,
            stripe_subscription_id: subscription.id,
            stripe_price_id: firstItem?.price.id,
            plan_type: planType,
            status: subscription.status,
            current_period_start: subscription.current_period_start 
              ? new Date(subscription.current_period_start * 1000).toISOString()
              : null,
            current_period_end: subscription.current_period_end
              ? new Date(subscription.current_period_end * 1000).toISOString()
              : null,
            updated_at: new Date().toISOString(),
          })

        if (error) {
          logger.error({ error, subscriptionId: subscription.id }, 'Failed to update subscription')
          throw error
        }

        // Update profile with customer ID if not set
        if (!(customer as Stripe.Customer).metadata?.user_id) {
          await supabase
            .from('profiles')
            .update({ stripe_customer_id: customer.id })
            .eq('id', profile.id)
        }

        logger.info({ subscriptionId: subscription.id, status: subscription.status }, 'Subscription updated')
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        logger.info({ subscriptionId: subscription.id }, 'Processing subscription deletion')

        const { error } = await supabase
          .from('subscriptions')
          .update({ 
            status: 'cancelled',
            updated_at: new Date().toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)

        if (error) {
          logger.error({ error, subscriptionId: subscription.id }, 'Failed to cancel subscription')
          throw error
        }

        logger.info({ subscriptionId: subscription.id }, 'Subscription cancelled')
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        logger.info({ paymentIntentId: paymentIntent.id }, 'Payment succeeded')

        // Handle one-time payments (e.g., for e-commerce)
        if (paymentIntent.metadata?.order_id) {
          const { error } = await supabase
            .from('orders')
            .update({ 
              status: 'paid',
              stripe_payment_intent_id: paymentIntent.id,
              updated_at: new Date().toISOString(),
            })
            .eq('id', paymentIntent.metadata.order_id)

          if (error) {
            logger.error({ error, orderId: paymentIntent.metadata.order_id }, 'Failed to update order')
            throw error
          }

          logger.info({ orderId: paymentIntent.metadata.order_id }, 'Order marked as paid')
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        logger.warn({ paymentIntentId: paymentIntent.id }, 'Payment failed')

        if (paymentIntent.metadata?.order_id) {
          const { error } = await supabase
            .from('orders')
            .update({ 
              status: 'payment_failed',
              updated_at: new Date().toISOString(),
            })
            .eq('id', paymentIntent.metadata.order_id)

          if (error) {
            logger.error({ error, orderId: paymentIntent.metadata.order_id }, 'Failed to update failed order')
          }
        }
        break
      }

      default:
        logger.info({ eventType: event.type }, 'Unhandled webhook event')
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    logger.error({ error, eventType: event.type }, 'Webhook processing failed')
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}