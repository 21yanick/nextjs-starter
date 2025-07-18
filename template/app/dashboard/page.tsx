'use client'

import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mail, User, CreditCard } from 'lucide-react';
import Link from 'next/link';
import { useUser } from '@/hooks/use-user';
import { useSubscription } from '@/hooks/use-subscription';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading: userLoading } = useUser();
  const { userPlan, loading: subscriptionLoading, planType } = useSubscription();
  const router = useRouter();

  // Client-side authentication guard
  useEffect(() => {
    if (!userLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, userLoading, router]);

  // Loading state
  if (userLoading || subscriptionLoading) {
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

  const initials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : 'U';

  // Get plan info based on current subscription
  const getPlanInfo = (planType: string) => {
    const plans = {
      free: { name: 'Free Plan', badge: 'Free', color: 'secondary' },
      starter: { name: 'Starter Plan', badge: 'Starter', color: 'outline' },
      pro: { name: 'Pro Plan', badge: 'Pro', color: 'default' },
      enterprise: { name: 'Enterprise Plan', badge: 'Enterprise', color: 'default' },
    };
    return plans[planType as keyof typeof plans] || plans.free;
  };

  const currentPlan = getPlanInfo(planType);

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
                    Welcome back, {user.user_metadata?.full_name || user.email}!
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
                <Badge variant={currentPlan.color as any}>{currentPlan.badge}</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currentPlan.name}</div>
                <p className="text-xs text-muted-foreground mb-3">
                  {planType === 'free' 
                    ? 'Upgrade to unlock more features' 
                    : userPlan?.subscription?.status === 'active' 
                      ? 'Active subscription' 
                      : 'Subscription inactive'
                  }
                </p>
                <Button asChild size="sm" className="w-full">
                  <Link href="/dashboard/subscription">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Manage Subscription
                  </Link>
                </Button>
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