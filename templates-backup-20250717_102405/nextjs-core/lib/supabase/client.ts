import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';
import { getLogger } from '@/lib/logger';

const logger = getLogger('supabase-client');

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Client-side helper to get current user
export async function getUser() {
  const supabase = createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    logger.error('Failed to fetch user', { error: error.message });
    return null;
  }
  
  return user;
}

// Client-side helper to get current session
export async function getSession() {
  const supabase = createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    logger.error('Failed to fetch session', { error: error.message });
    return null;
  }
  
  return session;
}

// Client-side helper to sign out
export async function signOut() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    logger.error('Failed to sign out', { error: error.message });
    throw error;
  }
}