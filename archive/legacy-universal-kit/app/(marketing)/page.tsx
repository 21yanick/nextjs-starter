import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getBusinessConfig, getAvailableFeatures } from '@/lib/business-config'
import { ArrowRight, Check, Shield, Zap, Users } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const config = getBusinessConfig()
  const features = getAvailableFeatures()

  const getHeroContent = () => {
    switch (config.model) {
      case 'saas':
        return {
          title: 'The Complete SaaS Platform',
          subtitle: 'Build, scale, and manage your software business with our all-in-one platform.',
          cta: 'Start Free Trial',
          ctaLink: '/auth/register',
        }
      case 'shop':
        return {
          title: 'Your Online Store, Simplified',
          subtitle: 'Create a beautiful e-commerce experience with powerful tools and seamless payments.',
          cta: 'Browse Products',
          ctaLink: '/shop',
        }
      case 'booking':
        return {
          title: 'Streamline Your Appointments',
          subtitle: 'Professional booking system with calendar management and payment processing.',
          cta: 'Book Now',
          ctaLink: '/booking',
        }
      default:
        return {
          title: 'Your Digital Platform',
          subtitle: 'Powerful, flexible, and ready for any business model. Start building today.',
          cta: 'Get Started',
          ctaLink: '/auth/register',
        }
    }
  }

  const hero = getHeroContent()

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 lg:text-2xl">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href={hero.ctaLink}>
                  {hero.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {features.hasSubscriptions && (
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built with modern technology and best practices for performance, security, and scalability.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>Security First</CardTitle>
                <CardDescription>
                  Built-in authentication, authorization, and data protection with industry standards.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Zap className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>High Performance</CardTitle>
                <CardDescription>
                  Optimized for speed with modern frameworks, caching, and efficient database queries.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Users className="w-12 h-12 mb-4 text-primary" />
                <CardTitle>User Experience</CardTitle>
                <CardDescription>
                  Intuitive interface with responsive design that works perfectly on all devices.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Model Specific Features */}
      {features.isMultiModel && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Flexible Business Models
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                One platform, multiple possibilities. Choose what works for your business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.hasSubscriptions && (
                <Card>
                  <CardHeader>
                    <CardTitle>SaaS Platform</CardTitle>
                    <CardDescription>
                      Subscription-based software with user management, billing, and analytics.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        User subscriptions
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Recurring billing
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Feature gating
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}

              {features.hasShop && (
                <Card>
                  <CardHeader>
                    <CardTitle>E-Commerce</CardTitle>
                    <CardDescription>
                      Online store with product catalog, cart, and payment processing.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Product management
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Shopping cart
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Order tracking
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}

              {features.hasBookings && (
                <Card>
                  <CardHeader>
                    <CardTitle>Appointment Booking</CardTitle>
                    <CardDescription>
                      Professional scheduling system with calendar integration and payments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Calendar management
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Time slot booking
                      </li>
                      <li className="flex items-center">
                        <Check className="w-4 h-4 mr-2 text-green-500" />
                        Deposit payments
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses that trust our platform to power their growth.
          </p>
          <Button variant="secondary" size="lg" asChild>
            <Link href={hero.ctaLink}>
              {hero.cta}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}