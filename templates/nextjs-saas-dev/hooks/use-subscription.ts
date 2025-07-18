'use client';

import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUser } from './use-user';
import type { Database } from '@/types/database';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export interface UserPlan {
  type: 'free' | 'starter' | 'pro' | 'enterprise';
  subscription?: {
    id: string;
    stripeSubscriptionId: string;
    status: string;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    priceId: string;
  };
}

export function useSubscription() {
  const { user, loading: userLoading } = useUser();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setUserPlan({ type: 'free' });
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const supabase = createClient();

      // Fetch user's active subscription with plan_type from database
      const { data: subscription, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (subscription) {
        // Use plan_type directly from database - no client-side price ID mapping needed!
        setUserPlan({
          type: subscription.plan_type,
          subscription: {
            id: subscription.id,
            stripeSubscriptionId: subscription.stripe_subscription_id,
            status: subscription.status,
            currentPeriodStart: subscription.current_period_start,
            currentPeriodEnd: subscription.current_period_end,
            priceId: subscription.stripe_price_id,
          },
        });
      } else {
        // No active subscription found, user is on free plan
        setUserPlan({ type: 'free' });
      }
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch subscription');
      // Fallback to free plan on error
      setUserPlan({ type: 'free' });
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch subscription when user changes
  useEffect(() => {
    if (!userLoading) {
      fetchSubscription();
    }
  }, [user, userLoading, fetchSubscription]);

  // Refresh function for manual updates
  const refresh = useCallback(async () => {
    setLoading(true);
    await fetchSubscription();
  }, [fetchSubscription]);

  // Derived planType for easier access
  const planType = userPlan?.type || 'free';

  return {
    userPlan,
    planType,
    loading: userLoading || loading,
    error,
    refresh,
  };
}