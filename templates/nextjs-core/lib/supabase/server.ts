import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '@/types/database';
import { getLogger } from '@/lib/logger';

const logger = getLogger('supabase-server');

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        },
      },
    }
  );
}

export async function createServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  
  const { createClient } = await import('@supabase/supabase-js');
  const client = createClient<Database>(url, key);
  
  return client;
}

// IMPORTANT: Always use getUser() in server code, not getSession()
// getUser() validates the auth token with Supabase's servers every time
export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    // Only log actual errors, not "no session" errors
    if (error.message !== 'Auth session missing!') {
      logger.error('Failed to fetch user', { error: error.message });
    }
    return null;
  }
  
  return user;
}

// Get user session data (safe for server-side use)
export async function getSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    logger.error('Failed to fetch session', { error: error.message });
    return null;
  }
  
  return session;
}

// Helper function to require authentication
export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect('/auth/login');
  }
  return user;
}

// Helper function to require no authentication (redirect if logged in)
export async function requireNoAuth() {
  const user = await getUser();
  if (user) {
    redirect('/dashboard');
  }
}

// Helper function to get user profile
export async function getUserProfile() {
  const user = await getUser();
  
  if (!user) {
    return null;
  }
  
  // Use service role client for database operations to bypass RLS
  const serviceSupabase = await createServiceClient();
  
  const { data: profile, error } = await serviceSupabase
    .from('profiles')
    .select('*')
    .eq('id', user.id);
    
  if (error) {
    logger.error('Failed to fetch user profile', { error: error.message, userId: user.id });
    return null;
  }
  
  return profile?.[0] || null;
}