/**
 * 🟩 SHOP-ONLY: Dashboard Server Actions
 * KISS Implementation for order management
 */

'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { requireAuth } from '@/lib/auth/server'
import { revalidatePath } from 'next/cache'

// Create Supabase client for server actions
async function createClient() {
  await requireAuth() // Ensure user is authenticated (= shop owner)
  
  const cookieStore = await cookies()
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll() {
          // Not needed in server actions
        },
      },
    }
  )
}

// Update order status
export async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    // Validate status
    const validStatuses = ['pending', 'processing', 'shipped', 'completed']
    if (!validStatuses.includes(newStatus)) {
      return { error: 'Ungültiger Status' }
    }

    const supabase = await createClient()
    
    const { error } = await supabase
      .from('orders')
      .update({ 
        status: newStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
    
    if (error) {
      console.error('Order status update error:', error)
      return { error: 'Fehler beim Aktualisieren des Status' }
    }
    
    // Revalidate pages that show order data
    revalidatePath('/dashboard/orders')
    revalidatePath(`/dashboard/orders/${orderId}`)
    
    return { success: true }
  } catch (err) {
    console.error('Order status update error:', err)
    return { error: 'Unerwarteter Fehler beim Aktualisieren' }
  }
}

// Get orders summary for dashboard
export async function getOrdersSummary() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('orders')
      .select('status, total_amount')
    
    if (error) {
      console.error('Orders summary error:', error)
      return { error: 'Fehler beim Laden der Bestellungsübersicht' }
    }
    
    // Calculate summary statistics
    const summary = {
      total: data.length,
      pending: data.filter(o => o.status === 'pending').length,
      processing: data.filter(o => o.status === 'processing').length,
      shipped: data.filter(o => o.status === 'shipped').length,
      completed: data.filter(o => o.status === 'completed').length,
      totalRevenue: data.reduce((sum, order) => sum + order.total_amount, 0),
    }
    
    return { data: summary }
  } catch (err) {
    console.error('Orders summary error:', err)
    return { error: 'Unerwarteter Fehler beim Laden der Übersicht' }
  }
}