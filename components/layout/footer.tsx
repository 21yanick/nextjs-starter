import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-8 md:py-12">
          {/* Main footer content */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Brand column */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
                  <span className="text-xs font-bold text-primary-foreground">S</span>
                </div>
                <span className="font-bold">SaaS Starter</span>
              </div>
              <p className="text-sm text-muted-foreground">
                100% Self-hosted SaaS starter kit with Next.js 15 and Supabase.
              </p>
            </div>

            {/* Product column */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/features" className="text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-muted-foreground hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/changelog" className="text-muted-foreground hover:text-foreground">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources column */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-muted-foreground hover:text-foreground">
                    Support
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company column */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Bottom footer */}
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2025 SaaS Starter. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground">
                Status
              </Link>
              <Link href="/api/health" className="text-sm text-muted-foreground hover:text-foreground">
                Health
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}