'use client'

import { Container } from '@/components/ui/container'
import { PlanStatus } from '@/components/plan-status'
import { PlanActions } from '@/components/plan-actions'
import { BillingHistory } from '@/components/billing-history'
import { useUser } from '@/hooks/use-user'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SubscriptionPage() {
  const { user, loading } = useUser()
  const router = useRouter()

  // Client-side authentication guard
  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  // Loading state
  if (loading) {
    return (
      <div className="py-8">
        <Container>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="py-8">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Subscription Management</h1>
            <p className="text-muted-foreground">
              Manage your subscription and billing settings.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Current Plan Status */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Current Plan</h2>
              <PlanStatus />
            </div>

            {/* Plan Actions */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Manage Plan</h2>
              <PlanActions />
            </div>
          </div>

          {/* Plan Comparison */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Plan Comparison</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {/* Free Plan */}
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <h3 className="font-semibold">🆓 Free</h3>
                  <p className="text-sm text-muted-foreground">Perfect for getting started</p>
                  <p className="text-lg font-bold">CHF 0.00/month</p>
                  <ul className="text-sm space-y-1">
                    <li>• Basic dashboard</li>
                    <li>• Core features</li>
                    <li>• Community support</li>
                  </ul>
                </div>
              </div>

              {/* Starter Plan */}
              <div className="rounded-lg border p-4 border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
                <div className="space-y-2">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">🟡 Starter</h3>
                  <p className="text-sm text-muted-foreground">Essential features for small projects</p>
                  <p className="text-lg font-bold">CHF 9.90/month</p>
                  <ul className="text-sm space-y-1">
                    <li>• Advanced dashboard</li>
                    <li>• Email support</li>
                    <li>• Extended features</li>
                    <li>• Basic analytics</li>
                  </ul>
                </div>
              </div>

              {/* Pro Plan */}
              <div className="rounded-lg border p-4 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                <div className="space-y-2">
                  <h3 className="font-semibold text-green-800 dark:text-green-200">🟢 Professional</h3>
                  <p className="text-sm text-muted-foreground">Advanced features for growing businesses</p>
                  <p className="text-lg font-bold">CHF 19.90/month</p>
                  <ul className="text-sm space-y-1">
                    <li>• Premium dashboard</li>
                    <li>• Priority support</li>
                    <li>• Advanced analytics</li>
                    <li>• Custom integrations</li>
                    <li>• API access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Billing History */}
          <div className="space-y-4">
            <BillingHistory />
          </div>
        </div>
      </Container>
    </div>
  )
}