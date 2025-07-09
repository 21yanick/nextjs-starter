import { stripe, PRICE_IDS } from './config';
import { getUser } from '@/lib/supabase/server';

export async function createCheckoutSession(priceId: keyof typeof PRICE_IDS) {
  const user = await getUser();
  if (!user?.email) throw new Error('User not authenticated');

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: PRICE_IDS[priceId],
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      userId: user.id,
    },
  });

  return session;
}