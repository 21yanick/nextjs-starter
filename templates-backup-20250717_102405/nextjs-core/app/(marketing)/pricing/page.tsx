import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getBusinessConfig, getAvailableFeatures, formatCurrency } from '@/lib/business-config'
import { CheckoutButton } from '@/components/checkout-button'
import { Check, ArrowRight } from 'lucide-react'
import { env } from '@/lib/env'
import Link from 'next/link'

export default function PricingPage() {
  const config = getBusinessConfig()
  const features = getAvailableFeatures()

  // SaaS Pricing Plans (Swiss CHF)
  const subscriptionPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 2900, // CHF 29.00 in Rappen
      interval: 'month',
      description: 'Perfekt für kleine Teams und Startups',
      priceId: env.STRIPE_STARTER_PRICE_ID,
      features: [
        'Bis zu 5 Benutzer',
        'Basis Dashboard',
        'E-Mail Support',
        'Kern-Funktionen',
        'Mobile App Zugang',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 9900, // CHF 99.00 in Rappen
      interval: 'month',
      description: 'Ideal für wachsende Unternehmen',
      priceId: env.STRIPE_PRO_PRICE_ID,
      features: [
        'Bis zu 25 Benutzer',
        'Erweiterte Analytik',
        'Prioritäts-Support',
        'Custom Integrationen',
        'API Zugang',
        'Erweiterte Sicherheit',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 24900, // CHF 249.00 in Rappen
      interval: 'month',
      description: 'Für grosse Organisationen',
      priceId: env.STRIPE_ENTERPRISE_PRICE_ID || env.STRIPE_PRO_PRICE_ID, // Fallback to Pro
      features: [
        'Unbegrenzte Benutzer',
        'Custom Features',
        'Dedicated Support',
        'SLA Garantie',
        'On-Premise Option',
        'Custom Integrationen',
      ],
      popular: false,
    },
  ]

  // Service/Booking Pricing (Swiss CHF)
  const serviceRates = [
    {
      name: 'Basis Service',
      price: 5000, // CHF 50.00 in Rappen
      duration: '60 min',
      description: 'Standard Service Paket',
      features: ['Beratung', 'Basis Service', 'Nachbetreuung'],
    },
    {
      name: 'Premium Service',
      price: 8500, // CHF 85.00 in Rappen
      duration: '90 min',
      description: 'Erweiterte Service mit Extras',
      features: ['Ausführliche Beratung', 'Premium Service', 'Nachsorge', 'Produkt-Empfehlungen'],
      popular: true,
    },
    {
      name: 'Deluxe Paket',
      price: 12000, // CHF 120.00 in Rappen
      duration: '120 min',
      description: 'Komplette Premium Erfahrung',
      features: ['Vollständige Beratung', 'Deluxe Service', 'Premium Produkte', 'Erweiterte Nachsorge'],
    },
  ]

  if (!features.hasSubscriptions && !features.hasBookings) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Contact us for custom pricing based on your needs.
          </p>
          <Button asChild>
            <Link href="/contact">Contact Sales</Link>
          </Button>
        </div>
      </div>
    )
  }

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

      {/* SaaS Subscription Pricing */}
      {features.hasSubscriptions && (
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
                  <CheckoutButton
                    priceId={plan.priceId}
                    planName={plan.name}
                    popular={plan.popular}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Service/Booking Pricing */}
      {features.hasBookings && (
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Service Rates</h2>
            <p className="text-lg text-muted-foreground">
              Professional services with transparent pricing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {serviceRates.map((service, index) => (
              <Card key={index} className={`${service.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{service.name}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {formatCurrency(service.price, config.currency)}
                    </span>
                    <div className="text-sm text-muted-foreground mt-1">
                      {service.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="w-4 h-4 mr-3 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={service.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link href="/booking">
                      Book Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Häufig gestellte Fragen</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Kann ich jederzeit den Plan wechseln?</h3>
            <p className="text-muted-foreground">
              Ja, Sie können jederzeit upgraden oder downgraden. Änderungen werden im nächsten Abrechnungszyklus wirksam.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Gibt es eine kostenlose Testphase?</h3>
            <p className="text-muted-foreground">
              Ja, wir bieten eine 14-tägige kostenlose Testphase für alle Pläne. Keine Kreditkarte erforderlich.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Welche Zahlungsmethoden akzeptieren Sie?</h3>
            <p className="text-muted-foreground">
              Wir akzeptieren alle gängigen Kreditkarten und TWINT für schnelle und sichere Zahlungen in der Schweiz.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Kann ich jederzeit kündigen?</h3>
            <p className="text-muted-foreground">
              Absolut. Sie können Ihr Abonnement jederzeit kündigen. Der Zugang bleibt bis zum Ende der Abrechnungsperiode bestehen.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}