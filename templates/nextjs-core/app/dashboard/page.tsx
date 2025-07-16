import { requireAuth, getUserProfile } from '@/lib/supabase/server';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, Mail, User } from 'lucide-react';

export default async function DashboardPage() {
  // This will redirect to login if not authenticated
  const user = await requireAuth();
  const profile = await getUserProfile();

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
                    Welcome back, {profile?.full_name || user.email}!
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
                <Badge variant="outline">Free</Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Free Plan</div>
                <p className="text-xs text-muted-foreground">
                  Upgrade to unlock more features
                </p>
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