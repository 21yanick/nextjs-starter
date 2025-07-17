'use client'

import { Button } from '@/components/ui/button'
import { Calendar, Loader2, Clock } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import Link from 'next/link'

interface ScheduleButtonProps {
  serviceName: string
  duration: number // in minutes
  price?: number // Display only, no checkout
  popular?: boolean
}

export function CheckoutButton({ 
  serviceName, 
  duration,
  price,
  popular = false 
}: ScheduleButtonProps) {
  const { user, loading } = useUser()

  if (loading) {
    return (
      <Button className="w-full" variant={popular ? 'default' : 'outline'} disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    )
  }

  if (!user) {
    return (
      <Button 
        className="w-full" 
        variant={popular ? 'default' : 'outline'}
        asChild
      >
        <Link href="/auth/register">
          Sign up to Book
          <Calendar className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    )
  }

  return (
    <Button 
      className="w-full" 
      variant={popular ? 'default' : 'outline'}
      asChild
    >
      <Link href={`/booking?service=${encodeURIComponent(serviceName)}&duration=${duration}`}>
        <Calendar className="mr-2 h-4 w-4" />
        Schedule {serviceName}
        <Clock className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  )
}

// Export alias for backward compatibility
export { CheckoutButton as ScheduleButton }