'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight, Loader2, ShoppingCart } from 'lucide-react'
import { useUser } from '@/hooks/use-user'
import { useState } from 'react'
import Link from 'next/link'

interface CheckoutButtonProps {
  productId: string
  productName: string
  price: number // in cents
  description?: string
  popular?: boolean
}

export function CheckoutButton({ 
  productId, 
  productName, 
  price,
  description,
  popular = false 
}: CheckoutButtonProps) {
  const { user, loading } = useUser()
  const [isCreatingSession, setIsCreatingSession] = useState(false)

  const handleCheckout = async () => {
    if (!user) return

    setIsCreatingSession(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{
            productId,
            name: productName,
            price,
            quantity: 1,
            description: description || productName
          }]
        }),
      })

      const data = await response.json()

      if (response.ok && data.url) {
        window.location.href = data.url
      } else {
        console.error('Error creating checkout session:', data.error)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsCreatingSession(false)
    }
  }

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
          Sign up to Purchase
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    )
  }

  return (
    <Button 
      className="w-full" 
      variant={popular ? 'default' : 'outline'}
      onClick={handleCheckout}
      disabled={isCreatingSession}
    >
      {isCreatingSession ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy {productName}
          <ArrowRight className="ml-2 h-4 w-4" />
        </>
      )}
    </Button>
  )
}