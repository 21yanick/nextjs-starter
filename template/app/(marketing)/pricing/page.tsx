import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getBusinessConfig, formatCurrency } from '@/lib/business-config'
import { CheckoutButton } from '@/components/checkout-button'
import { Check } from 'lucide-react'
import { env } from '@/lib/env'
import Link from 'next/link'

export default function PricingPage() {
  const config = getBusinessConfig()

  // Swiss SaaS Subscription Plans - CHF Optimized
  const subscriptionPlans = [
    {
      id: 'free',
      name: 'Free',
      price: 0, // CHF 0.00
      interval: 'month',
      description: 'Für erste Schritte und Testen',
      priceId: null, // No Stripe price needed for free
      features: [
        'Bis zu 1 Benutzer',
        'Basis Features',
        'Community Support',
        'Bis zu 100 Einträge',
        'Basic Dashboard',
      ],
      popular: false,
    },
    {
      id: 'starter',
      name: 'Starter',
      price: 990, // CHF 9.90 in Rappen
      interval: 'month',
      description: 'Perfekt für kleine Teams und Startups',
      priceId: env.STRIPE_STARTER_PRICE_ID,
      features: [
        'Bis zu 5 Benutzer',
        'Alle Basis Features',
        'E-Mail Support',
        'Bis zu 1000 Einträge',
        'Erweiterte Analytics',
        'Mobile App Zugang',
      ],
      popular: true,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 1990, // CHF 19.90 in Rappen
      interval: 'month',
      description: 'Für wachsende Unternehmen',
      priceId: env.STRIPE_PRO_PRICE_ID,
      features: [
        'Bis zu 25 Benutzer',
        'Alle Starter Features',
        'Priority Support',
        'Unbegrenzte Einträge',
        'Erweiterte Integrationen',
        'API Zugang',
        'Custom Branding',
      ],
      popular: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-bold mb-6">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Choose the plan that fits your needs. No hidden fees, no surprises.
        </p>
      </div>

      {/* SaaS Subscription Pricing Only */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Subscription Plans</h2>
          <p className="text-lg text-muted-foreground">
            Scale with confidence. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    {formatCurrency(plan.price, config.currency)}
                  </span>
                  <span className="text-muted-foreground">/{plan.interval}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.id === 'free' ? (
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/auth/register">
                      Kostenlos starten
                    </Link>
                  </Button>
                ) : (
                  <CheckoutButton
                    priceId={plan.priceId}
                    planName={plan.name}
                    popular={plan.popular}
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Can I change plans anytime?</h3>
            <p className="text-muted-foreground">
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
            <p className="text-muted-foreground">
              Yes, we offer a 14-day free trial for all plans. No credit card required to start.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">
              We accept all major credit cards and regional payment methods like TWINT (Switzerland) and SEPA (EU).
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Can I cancel anytime?</h3>
            <p className="text-muted-foreground">
              Absolutely. You can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}