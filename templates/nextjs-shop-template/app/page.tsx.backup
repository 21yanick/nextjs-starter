import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle, Info, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="py-16">
      <Container>
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-4">
            🚀 Phase 1: UI Foundation Complete
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            SaaS Starter Kit
          </h1>
          <p className="mt-6 text-lg text-muted-foreground">
            100% self-hosted SaaS starter with Next.js 15, Supabase, and Stripe.
            Production-ready from day 1.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button size="lg">Get Started</Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </div>

        <Separator className="my-16" />

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                Security First
              </CardTitle>
              <CardDescription>
                Built with security headers, validation, and best practices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ CSP Headers</li>
                <li>✅ Environment Validation</li>
                <li>✅ SQL Injection Protection</li>
                <li>✅ XSS Protection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Modern Stack</CardTitle>
              <CardDescription>
                Latest technologies for 2025 development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Next.js 15 + React 19</li>
                <li>✅ Tailwind CSS 4</li>
                <li>✅ TypeScript 5</li>
                <li>✅ shadcn/ui Components</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Self-Hosted</CardTitle>
              <CardDescription>
                100% data sovereignty, no cloud dependencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Local Supabase Stack</li>
                <li>✅ GDPR Compliant</li>
                <li>✅ No Vendor Lock-in</li>
                <li>✅ Full Control</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Separator className="my-16" />

        {/* Component Showcase */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight">
              UI Components Showcase
            </h2>
            <p className="mt-4 text-muted-foreground">
              All components are working and ready to use
            </p>
          </div>

          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                All button variants with proper accessibility
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm">Small</Button>
                <Button size="default">Default</Button>
                <Button size="lg">Large</Button>
              </div>
            </CardContent>
          </Card>

          {/* Forms */}
          <Card>
            <CardHeader>
              <CardTitle>Form Components</CardTitle>
              <CardDescription>
                Input fields with labels and validation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alert Messages</CardTitle>
              <CardDescription>
                Different alert variants for user feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This is an info alert with useful information.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  This is a destructive alert for errors.
                </AlertDescription>
              </Alert>
              <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-200">
                  This is a success alert for completed actions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Badges and Avatar */}
          <Card>
            <CardHeader>
              <CardTitle>Badges & Avatar</CardTitle>
              <CardDescription>
                Status indicators and user avatars
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </div>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src="" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
