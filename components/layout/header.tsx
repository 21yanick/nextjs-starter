import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">S</span>
              </div>
              <span className="hidden font-bold sm:inline-block">
                SaaS Starter
              </span>
            </Link>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Beta
            </Badge>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <Link 
              href="/pricing" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Pricing
            </Link>
            <Link 
              href="/docs" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Docs
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/auth/register">Get started</Link>
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  )
}