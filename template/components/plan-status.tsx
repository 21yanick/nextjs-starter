'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useSubscription } from '@/hooks/use-subscription'
import { CalendarDays, CreditCard } from 'lucide-react'

export function PlanStatus() {
  const { userPlan, loading, planType } = useSubscription()

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  // Client-side plan info  
  const getPlanInfo = (planType: string) => {
    const plans = {
      free: { name: 'Free', price: 0, currency: 'CHF', interval: 'month', description: 'Perfect for getting started' },
      starter: { name: 'Starter', price: 9.90, currency: 'CHF', interval: 'month', description: 'Essential features for small projects' },
      pro: { name: 'Professional', price: 19.90, currency: 'CHF', interval: 'month', description: 'Advanced features for growing businesses' },
    };
    return plans[planType as keyof typeof plans] || plans.free;
  };

  const planInfo = getPlanInfo(planType)
  const subscription = userPlan?.subscription

  // Badge variant based on plan
  const badgeVariant = planType === 'free' ? 'secondary' : 
                      planType === 'starter' ? 'outline' : 'default'

  // Plan icon
  const planIcon = planType === 'free' ? '🆓' : 
                   planType === 'starter' ? '🟡' : '🟢'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Current Plan</span>
          <Badge variant={badgeVariant}>
            {planIcon} {planInfo.name}
          </Badge>
        </CardTitle>
        <CardDescription>{planInfo.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Plan Price */}
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            {planInfo.price === 0 ? 'Free forever' : 
             `${planInfo.currency} ${planInfo.price.toFixed(2)}/${planInfo.interval}`}
          </span>
        </div>

        {/* Billing Date - only for paid plans */}
        {subscription && subscription.currentPeriodEnd && (
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Next billing: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
            </span>
          </div>
        )}

        {/* Status indicator */}
        <div className="text-xs text-muted-foreground">
          {planType === 'free' ? 'No subscription required' :
           subscription?.status === 'active' ? 'Active subscription' :
           'Subscription inactive'}
        </div>
      </CardContent>
    </Card>
  )
}