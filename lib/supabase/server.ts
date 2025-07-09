import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Database } from '@/types/database';

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

// IMPORTANT: Always use getUser() in server code, not getSession()
// getUser() validates the auth token with Supabase's servers every time
export async function getUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return user;
}

// Get user session data (safe for server-side use)
export async function getSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error fetching session:', error);
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
  const supabase = await createClient();
  const user = await getUser();
  
  if (!user) return null;
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
  
  return profile;
}