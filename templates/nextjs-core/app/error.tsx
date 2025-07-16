'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import { getLogger } from '@/lib/logger'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, Home, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

const logger = getLogger('global-error');

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Capture error with Sentry if configured
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
    
    // Also log with structured logging
    logger.error('Global error occurred', {
      message: error.message,
      digest: error.digest,
      stack: error.stack
    });
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6 text-destructive" />
          </div>
          <CardTitle>Oops! Something went wrong</CardTitle>
          <CardDescription>
            We&apos;ve encountered an unexpected error. Our team has been notified and we&apos;re working on a fix.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded">
            Error ID: {error.digest || 'Unknown'}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={reset} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button variant="outline" asChild className="flex-1">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}