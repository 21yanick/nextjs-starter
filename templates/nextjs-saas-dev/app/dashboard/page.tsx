'use client'

import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Mail, User, CreditCard } from 'lucide-react';
import { useUser } from '@/hooks/use-user';
import { useSubscription } from '@/hooks/use-subscription';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading: userLoading } = useUser();
  const { userPlan, loading: planLoading } = useSubscription();
  const router = useRouter();

  // Client-side authentication guard
  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, userLoading, router]);

  // Loading state
  if (userLoading || planLoading) {
    return (
      <div className="py-8">
        <Container>
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">Loading...</p>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  // Not authenticated
  if (!user) {
    return null; // Will redirect via useEffect
  }

  // Client-side plan info
  const getPlanInfo = (planType: string) => {
    const plans = {
      free: { name: 'Free', price: 0, currency: 'CHF' },
      starter: { name: 'Starter', price: 9.90, currency: 'CHF' },
      pro: { name: 'Professional', price: 19.90, currency: 'CHF' },
    };
    return plans[planType as keyof typeof plans] || plans.free;
  };

  const planInfo = getPlanInfo(userPlan?.type || 'free');

  const initials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : 'U';

  return (
    <div className="py-8">
      <Container>
        <div className="space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here&apos;s your account overview.
            </p>
          </div>

          {/* Welcome Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">
                    Welcome back, {user.email}!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">User ID: {user.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Email: {user.email_confirmed_at ? 'Confirmed' : 'Pending'}
                  </span>
                  <Badge variant={user.email_confirmed_at ? 'default' : 'secondary'}>
                    {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    Joined: {new Date(user.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Account Status</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Active</div>
                <p className="text-xs text-muted-foreground">
                  Account is in good standing
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscription</CardTitle>
                <Badge variant={userPlan?.type === 'free' ? 'secondary' : 'default'}>
                  {userPlan?.type === 'free' ? '🆓' : userPlan?.type === 'starter' ? '🟡' : '🟢'} {planInfo.name}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {planInfo.price === 0 ? 'Free Plan' : `${planInfo.currency} ${planInfo.price.toFixed(2)}`}
                </div>
                <div className="space-y-1">
                  {userPlan?.type === 'free' ? (
                    <p className="text-xs text-muted-foreground">
                      <Link href="/dashboard/subscription" className="hover:underline">
                        Upgrade to unlock more features
                      </Link>
                    </p>
                  ) : (
                    <>
                      {userPlan?.subscription?.currentPeriodEnd && (
                        <p className="text-xs text-muted-foreground">
                          Next billing: {new Date(userPlan.subscription.currentPeriodEnd).toLocaleDateString()}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        <Link href="/dashboard/subscription" className="hover:underline">
                          Manage subscription
                        </Link>
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Login</CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Today</div>
                <p className="text-xs text-muted-foreground">
                  Last activity just now
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Security</CardTitle>
                <Badge variant="default">Secure</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Protected</div>
                <p className="text-xs text-muted-foreground">
                  All security features enabled
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest account activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">Account created</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(user.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                
                {user.email_confirmed_at && (
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/10">
                      <Mail className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">Email verified</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(user.email_confirmed_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}