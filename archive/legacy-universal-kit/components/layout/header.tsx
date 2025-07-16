import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AuthButton } from "@/components/auth"
import { ThemeToggle } from "@/components/theme-toggle"
import { getBusinessConfig, getAvailableFeatures } from "@/lib/business-config"

export function Header() {
  const config = getBusinessConfig()
  const features = getAvailableFeatures()

  // Dynamic branding based on business model
  const getBrandName = () => {
    switch (config.model) {
      case 'saas':
        return 'SaaS Starter'
      case 'shop':
        return 'Shop Starter'
      case 'booking':
        return 'Booking Starter'
      default:
        return 'Universal Starter'
    }
  }

  // Dynamic navigation based on business model and features
  const getNavigationLinks = () => {
    const links = []

    // Always show Features
    links.push({
      href: '/features',
      label: 'Features'
    })

    // Business model specific links
    if (features.hasShop) {
      links.push({
        href: '/shop',
        label: 'Shop'
      })
    }

    if (features.hasSubscriptions) {
      links.push({
        href: '/pricing',
        label: 'Pricing'
      })
    }

    if (features.hasBookings) {
      links.push({
        href: '/booking',
        label: 'Services'
      })
    }

    // Contact for shop/booking models
    if (config.model === 'shop' || config.model === 'booking') {
      links.push({
        href: '/contact',
        label: 'Contact'
      })
    }

    return links
  }

  const navigationLinks = getNavigationLinks()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">
                  {config.model === 'shop' ? 'S' : config.model === 'booking' ? 'B' : 'S'}
                </span>
              </div>
              <span className="hidden font-bold sm:inline-block">
                {getBrandName()}
              </span>
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Beta
            </Badge>
          </div>

          {/* Dynamic Navigation */}
          <nav className="flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <Separator orientation="vertical" className="h-6" />
            <ThemeToggle />
            <AuthButton />
          </nav>
        </div>
      </Container>
    </header>
  )
}