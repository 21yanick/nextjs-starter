# NextJS 15+ Production Starter Kit - Technical Specification

## 🎯 Project Philosophy

**Core Principle**: Start minimal, stay clean, scale when needed.

This starter kit represents the "sweet spot" between too minimal and over-engineered. Every decision is made with these goals:
- Production-ready from day 1
- Clean code that any developer can understand
- No premature abstractions
- Server-first architecture
- Type safety everywhere

## 📦 Tech Stack

### Core Dependencies (Current Implementation)
```json
{
  "dependencies": {
    "next": "15.3.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.50.4",
    "@supabase/ssr": "^0.6.1",
    "stripe": "^18.3.0",
    "resend": "^4.6.0",
    "react-email": "^4.1.0",
    "@react-email/components": "^0.2.0",
    "@sentry/nextjs": "^9.36.0",
    "pino": "^9.7.0",
    "zod": "^4.0.0",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.525.0",
    "next-themes": "^0.4.6",
    "tailwind-merge": "^3.3.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "tailwindcss": "^4",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "prettier": "^3.6.2",
    "eslint": "^9",
    "eslint-config-next": "15.3.5",
    "@commitlint/cli": "^19.8.1",
    "@commitlint/config-conventional": "^19.8.1",
    "husky": "^9.1.7",
    "dotenv": "^17.2.0",
    "pino-pretty": "^13.0.0",
    "tailwindcss-animate": "^1.0.7",
    "tw-animate-css": "^1.3.5"
  }
}
```

### Explicitly NOT Included (Yet)
- ❌ Redis/Caching Layer
- ❌ Multi-Tenancy
- ❌ Background Job Processing
- ❌ Analytics (Umami/Plausible)
- ❌ Feature Flags
- ❌ Complex Testing Setup
- ❌ ORM beyond Supabase Client
- ❌ Supabase Cloud Account - 100% Self-Hosted!

## 📁 Project Structure

```
nextjs-starter/
├── app/                          # NextJS 15 App Router
│   ├── auth/                     # Authentication pages
│   │   ├── confirm/
│   │   │   └── page.tsx         # Email confirmation
│   │   ├── login/
│   │   │   └── page.tsx         # Login page
│   │   ├── register/
│   │   │   └── page.tsx         # Registration page
│   │   └── reset/
│   │       └── page.tsx         # Password reset
│   ├── dashboard/
│   │   └── page.tsx             # Protected dashboard
│   ├── api/
│   │   ├── health/
│   │   │   └── route.ts         # Health check endpoint
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts     # Stripe webhook handler
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles
│   ├── error.tsx                # Global error boundary
│   └── not-found.tsx            # 404 page
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── alert.tsx
│   │   ├── avatar.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── label.tsx
│   │   ├── separator.tsx
│   │   └── ...
│   ├── auth/                    # Authentication components
│   │   ├── auth-button.tsx      # Dynamic auth button
│   │   ├── sign-in-form.tsx     # Login form with Server Actions
│   │   ├── sign-up-form.tsx     # Registration form
│   │   └── submit-button.tsx    # Form submit button with loading
│   ├── layout/                  # Layout components
│   │   ├── header.tsx           # Navigation header
│   │   ├── footer.tsx           # Site footer
│   │   └── container.tsx        # Container component
│   └── theme-provider.tsx       # Theme context provider
├── lib/                         # Core utilities
│   ├── auth/
│   │   └── actions.ts           # Server Actions for auth
│   ├── supabase/
│   │   ├── server.ts            # Server-side client
│   │   ├── client.ts            # Client-side client
│   │   └── middleware.ts        # Auth middleware
│   ├── stripe/
│   │   ├── config.ts            # Stripe configuration
│   │   └── checkout.ts          # Checkout logic
│   ├── email/
│   │   ├── client.ts            # Resend client
│   │   └── templates/           # React Email templates
│   │       ├── welcome.tsx
│   │       └── invoice.tsx
│   ├── env.ts                   # Environment validation
│   ├── logger.ts                # Pino logger setup
│   └── utils.ts                 # Utility functions
├── hooks/                       # Custom React hooks
│   ├── use-user.ts              # User state management
│   └── use-profile.ts           # Profile management
├── types/                       # TypeScript types
│   ├── database.ts              # Supabase generated types
│   └── env.d.ts                 # Environment types
├── supabase/                    # Supabase configuration
│   ├── migrations/              # SQL migrations
│   │   └── 00001_initial_schema.sql
│   ├── seed.sql                 # Development seed data
│   └── kong.yml                 # Kong API gateway config
├── scripts/                     # Utility scripts
│   ├── setup-database.js        # Database setup script
│   └── create-test-user.js      # Test user creation
├── middleware.ts                # Auth + Security middleware
├── instrumentation.ts           # Logging setup
├── .env.local                   # Local environment
├── .env.example                 # Environment template
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── prettier.config.js           # Prettier configuration
├── .eslintrc.json               # ESLint configuration
├── .commitlintrc.json           # Commit lint configuration
├── docker-compose.yml           # Local Supabase stack
└── Dockerfile                   # Production build
```

## 🔧 Implementation Details

### 1. Environment Variables & Validation

**File: `lib/env.ts`**
```typescript
import { z } from 'zod';

const envSchema = z.object({
  // Public variables (exposed to client)
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().min(1),
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  
  // Server-only variables
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
  RESEND_API_KEY: z.string().min(1),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  
  // Database Direct Connection (for migrations)
  DATABASE_URL: z.string().optional(),
});

// Validate on startup
export const env = envSchema.parse(process.env);
```

**File: `types/env.d.ts`**
```typescript
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_SENTRY_DSN?: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    STRIPE_SECRET_KEY: string;
    STRIPE_WEBHOOK_SECRET: string;
    RESEND_API_KEY: string;
    SENTRY_AUTH_TOKEN?: string;
  }
}
```

### 2. Supabase Setup

**File: `lib/supabase/server.ts`**
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
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

// Helper functions
export async function getUser() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth() {
  const user = await getUser();
  if (!user) {
    redirect('/login');
  }
  return user;
}
```

**File: `lib/supabase/client.ts`**
```typescript
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database';

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

### 3. Security Headers & Middleware

**File: `middleware.ts`**
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { updateSession } from '@/lib/supabase/middleware';

export async function middleware(request: NextRequest) {
  // Update session and get user info
  const { supabaseResponse, user } = await updateSession(request);
  
  // Clone response to modify headers
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  
  // Apply security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https:; connect-src 'self' http://localhost:55321 https://*.supabase.co;"
  );
  
  // Protect authenticated routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }
  
  // Redirect authenticated users away from auth pages
  if (request.nextUrl.pathname.startsWith('/auth/')) {
    if (user) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }
  
  return supabaseResponse;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
```

### 4. Logging Setup

**File: `lib/logger.ts`**
```typescript
import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

// Base logger configuration
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  ...(isDevelopment
    ? {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'HH:MM:ss',
          },
        },
      }
    : {
        // Production: JSON format
        formatters: {
          level: (label) => ({ level: label.toUpperCase() }),
        },
        timestamp: pino.stdTimeFunctions.isoTime,
      }),
});

// Create child loggers for different modules
export const getLogger = (module: string) => logger.child({ module });
```

**File: `instrumentation.ts`**
```typescript
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { logger } = await import('./lib/logger');
    
    // Log unhandled errors
    process.on('unhandledRejection', (reason, promise) => {
      logger.error({ err: reason }, 'Unhandled Promise Rejection');
    });
    
    process.on('uncaughtException', (error) => {
      logger.fatal({ err: error }, 'Uncaught Exception');
      process.exit(1);
    });
  }
}
```

### 5. Error Handling

**File: `app/error.tsx`**
```typescript
'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to Sentry
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 mb-6">
        We've been notified and are working on it.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
```

### 6. Stripe Integration

**File: `lib/stripe/config.ts`**
```typescript
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
  typescript: true,
});

export const PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID!,
  pro: process.env.STRIPE_PRO_PRICE_ID!,
} as const;
```

**File: `lib/stripe/checkout.ts`**
```typescript
import { stripe, PRICE_IDS } from './config';
import { getUser } from '@/lib/supabase/server';

export async function createCheckoutSession(priceId: keyof typeof PRICE_IDS) {
  const user = await getUser();
  if (!user?.email) throw new Error('User not authenticated');

  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: PRICE_IDS[priceId],
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      userId: user.id,
    },
  });

  return session;
}
```

### 7. Email Templates

**File: `lib/email/templates/welcome.tsx`**
```typescript
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';

interface WelcomeEmailProps {
  userFirstname: string;
}

export function WelcomeEmail({ userFirstname }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our SaaS!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome, {userFirstname}!</Heading>
          <Text style={text}>
            Thanks for signing up. We're excited to have you on board.
          </Text>
          <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`} style={button}>
            Go to Dashboard
          </Link>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = { backgroundColor: '#f6f9fc', fontFamily: 'sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px' };
const h1 = { color: '#333', fontSize: '24px' };
const text = { color: '#555', fontSize: '16px', lineHeight: '24px' };
const button = {
  backgroundColor: '#5469d4',
  color: '#fff',
  padding: '12px 20px',
  textDecoration: 'none',
  borderRadius: '5px',
  display: 'inline-block',
};
```

### 8. Health Check Endpoint

**File: `app/api/health/route.ts`**
```typescript
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { logger } from '@/lib/logger';

export async function GET() {
  const checks = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    checks: {
      database: 'unknown',
      stripe: 'unknown',
    },
  };

  try {
    // Check Supabase
    const supabase = await createClient();
    const { error } = await supabase.from('_health_check').select('*').limit(1);
    checks.checks.database = error ? 'unhealthy' : 'healthy';
  } catch (error) {
    logger.error({ error }, 'Health check failed for database');
    checks.checks.database = 'unhealthy';
  }

  const isHealthy = Object.values(checks.checks).every(check => check === 'healthy');
  
  return NextResponse.json(checks, { 
    status: isHealthy ? 200 : 503 
  });
}
```

### 9. Docker Configuration

**File: `Dockerfile`**
```dockerfile
# Dependencies
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

# Builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Supabase types (if needed)
# RUN npm run generate:types

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Runner
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

# Health check for Coolify
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => process.exit(res.statusCode === 200 ? 0 : 1))"

CMD ["node", "server.js"]
```

### 10. Development Setup

**File: `.env.example`**
```bash
# Supabase (Local Docker defaults)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

# Database Direct Connection (Local Docker)
DATABASE_URL=postgresql://postgres:password@localhost:55322/postgres

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx

# Resend
RESEND_API_KEY=re_xxx

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=sntrys_xxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
LOG_LEVEL=debug
```

**File: `tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    },
    "strictNullChecks": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**File: `package.json` (scripts section)**
```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "type-check": "tsc --noEmit",
    "db:setup": "node scripts/setup-database.js",
    "db:types": "echo 'Supabase CLI not installed. Please install it to generate types.'",
    "db:migrate": "node scripts/migrate.js",
    "db:seed": "node scripts/seed.js",
    "db:migration:new": "echo 'Supabase CLI not installed. Please install it to create migrations.'",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f",
    "docker:ps": "docker-compose ps",
    "prepare": "husky"
  }
}
```

### 11. Database Setup

**File: `supabase/migrations/00001_initial_schema.sql`**
```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can view own subscriptions" 
  ON public.subscriptions FOR SELECT 
  USING (auth.uid() = user_id);

-- Automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (new.id, new.email);
  RETURN new;
END;
$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('avatars', 'avatars', true),
  ('user-uploads', 'user-uploads', false);
```

**File: `supabase/seed.sql`**
```sql
-- Development seed data
-- Only run this in development!

-- Test user (password: password123)
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  crypt('password123', gen_salt('bf')),
  NOW()
);

-- Test profile
INSERT INTO public.profiles (id, email, full_name)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'test@example.com',
  'Test User'
);

-- Test subscription
INSERT INTO public.subscriptions (user_id, stripe_subscription_id, stripe_price_id, status)
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'sub_test_123',
  'price_test_starter',
  'active'
);
```

### 12. Docker Compose for Local Development

**File: `docker-compose.yml`**
```yaml
version: '3.8'

services:
  nextjs-starter-db:
    image: supabase/postgres:15.1.0.117
    container_name: nextjs-starter-db
    ports:
      - "55322:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres
    volumes:
      - nextjs-starter-db-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 5s
      timeout: 5s
      retries: 5

  nextjs-starter-auth:
    image: supabase/gotrue:v2.99.0
    container_name: nextjs-starter-auth
    depends_on:
      nextjs-starter-db:
        condition: service_healthy
    environment:
      GOTRUE_API_HOST: 0.0.0.0
      GOTRUE_API_PORT: 9999
      API_EXTERNAL_URL: http://localhost:55321
      GOTRUE_DB_DRIVER: postgres
      GOTRUE_DB_DATABASE_URL: postgres://postgres:password@nextjs-starter-db:5432/postgres?search_path=auth
      GOTRUE_SITE_URL: http://localhost:3000
      GOTRUE_URI_ALLOW_LIST: http://localhost:3000
      GOTRUE_JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long
      GOTRUE_JWT_EXP: 3600
      GOTRUE_JWT_DEFAULT_GROUP_NAME: authenticated
      GOTRUE_EXTERNAL_EMAIL_ENABLED: true
      GOTRUE_MAILER_AUTOCONFIRM: true
      GOTRUE_SMTP_ADMIN_EMAIL: admin@example.com
      GOTRUE_SMTP_HOST: localhost
      GOTRUE_SMTP_PORT: 1025
      GOTRUE_SMTP_SENDER_NAME: "NextJS Starter"

  nextjs-starter-rest:
    image: postgrest/postgrest:v11.2.0
    container_name: nextjs-starter-rest
    depends_on:
      nextjs-starter-db:
        condition: service_healthy
    environment:
      PGRST_DB_URI: postgres://postgres:password@nextjs-starter-db:5432/postgres
      PGRST_DB_SCHEMAS: public,storage,auth
      PGRST_DB_ANON_ROLE: anon
      PGRST_JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long

  nextjs-starter-storage:
    image: supabase/storage-api:v0.40.4
    container_name: nextjs-starter-storage
    depends_on:
      nextjs-starter-db:
        condition: service_healthy
    environment:
      ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
      SERVICE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU
      POSTGREST_URL: http://nextjs-starter-rest:3000
      DATABASE_URL: postgres://postgres:password@nextjs-starter-db:5432/postgres
      STORAGE_BACKEND: file
      FILE_SIZE_LIMIT: 52428800
      TENANT_ID: stub
      REGION: stub
      GLOBAL_S3_BUCKET: stub

  nextjs-starter-kong:
    image: kong:2.8.1
    container_name: nextjs-starter-kong
    ports:
      - "55321:8000"
    environment:
      KONG_DATABASE: "off"
      KONG_DECLARATIVE_CONFIG: /var/lib/kong/kong.yml
      KONG_DNS_ORDER: LAST,A,CNAME
      KONG_PLUGINS: request-transformer,cors,key-auth,acl,basic-auth
    volumes:
      - ./supabase/kong.yml:/var/lib/kong/kong.yml

  nextjs-starter-studio:
    image: supabase/studio:latest
    container_name: nextjs-starter-studio
    ports:
      - "55323:3000"
    environment:
      STUDIO_PG_META_URL: http://nextjs-starter-db:5432/postgres
      POSTGRES_PASSWORD: password
      DEFAULT_ORGANIZATION_NAME: "NextJS Starter"
      DEFAULT_PROJECT_NAME: "NextJS Starter Dev"
      SUPABASE_URL: http://nextjs-starter-kong:8000
      SUPABASE_PUBLIC_URL: http://localhost:55321
      SUPABASE_ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
      SUPABASE_SERVICE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

volumes:
  nextjs-starter-db-data:
```

**File: `supabase/kong.yml`**
```yaml
_format_version: "2.1"
services:
  - name: auth-service
    url: http://supabase-auth:9999
    routes:
      - name: auth-route
        strip_path: true
        paths:
          - /auth/v1
  - name: rest-service
    url: http://supabase-rest:3000
    routes:
      - name: rest-route
        strip_path: false
        paths:
          - /rest/v1
  - name: storage-service
    url: http://supabase-storage:5000
    routes:
      - name: storage-route
        strip_path: true
        paths:
          - /storage/v1

consumers:
  - username: anon
    keyauth_credentials:
      - key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
  - username: service_role
    keyauth_credentials:
      - key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU

plugins:
  - name: cors
    config:
      origins:
        - http://localhost:3000
      credentials: true
      methods:
        - GET
        - POST
        - PUT
        - DELETE
        - OPTIONS
      headers:
        - Accept
        - Authorization
        - Content-Type
        - X-Requested-With
        - apikey
  - name: key-auth
    config:
      key_names:
        - apikey
        - Authorization
      hide_credentials: true
```

## 🚀 Deployment with Coolify (100% Self-Hosted)

### Prerequisites
- Hetzner VPS with minimum 8GB RAM (for NextJS builds)
- Coolify installed
- Domain configured
- NO cloud accounts needed!

### Deployment Steps

1. **Deploy Self-Hosted Supabase in Coolify**
   - Create new Service → Choose "Supabase" template
   - Configure secure passwords and JWT secrets
   - Set domain: `supabase.yourdomain.com`
   - Wait for all services to be healthy

2. **Configure Production Environment**
   ```env
   # Production Supabase (from your Coolify deployment)
   NEXT_PUBLIC_SUPABASE_URL=https://supabase.yourdomain.com
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-production-service-key
   
   # Change JWT secret in docker-compose for production!
   GOTRUE_JWT_SECRET=generate-a-secure-64-character-secret
   ```

3. **Deploy NextJS App**
   - Connect GitHub repository
   - Set Build Pack to "Docker"
   - Configure all environment variables
   - Set health check URL to `/api/health`
   - Set domain: `app.yourdomain.com`

4. **Post-Deployment**
   - Run database migrations
   - Configure email settings in Supabase
   - Test auth flow end-to-end

## 📋 Development Workflow

### Initial Setup
```bash
# Clone and install
git clone <repo>
cd my-saas-starter
npm install

# Start local Supabase stack
docker-compose up -d

# Wait for services to be ready (~30 seconds)
docker-compose ps

# Setup environment
cp .env.example .env.local

# Initialize database
npm run db:setup  # Creates tables, enables RLS

# Generate TypeScript types
npm run db:types

# Start development
npm run dev
```

### Database Management
```bash
# Create new migration
npm run db:migration:new create-profiles

# Run migrations
npm run db:migrate

# Generate types after schema changes
npm run db:types

# Seed development data
npm run db:seed
```

### Git Hooks (via Husky)
- Pre-commit: Prettier formatting
- Commit-msg: Commitlint validation

### Common Commands
```bash
# Docker & Supabase
docker-compose up -d     # Start Supabase stack
docker-compose down      # Stop Supabase
docker-compose logs -f   # View logs
docker-compose ps        # Check service status

# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run type-check       # TypeScript check

# Database
npm run db:setup         # Initialize database
npm run db:types         # Generate TypeScript types
npm run db:migrate       # Run migrations
npm run db:seed          # Load test data
```

## 🎯 Key Decisions & Rationale

### Why These Choices?

1. **100% Self-Hosted Supabase**
   - Full data sovereignty
   - No vendor lock-in
   - DSGVO/GDPR compliant hosting possible
   - No monthly Supabase bills

2. **No ORM beyond Supabase Client**
   - Supabase client is sufficient for most queries
   - Avoids abstraction overhead
   - Can add Prisma/Drizzle later if needed

3. **Pino over Winston**
   - Better performance
   - Smaller bundle size
   - Native JSON logging

4. **Server Components by Default**
   - Better performance
   - Reduced client bundle
   - SEO benefits

5. **Minimal Abstractions**
   - Direct SDK usage
   - Easier to understand
   - Easier to upgrade

6. **Environment Validation with Zod**
   - Catches config errors early
   - Type-safe environment access
   - Better developer experience

### When to Add More

Add these features when you actually need them:
- **Redis**: When you have performance issues (>1000 concurrent users)
- **Background Jobs**: When emails/webhooks timeout
- **Analytics**: When you need user insights
- **Multi-tenancy**: When you have enterprise customers
- **Advanced Testing**: When team grows beyond 3 developers

## 🔒 Security Checklist

- [x] Security headers via middleware
- [x] CSRF protection (built into Server Actions)
- [x] Environment variable validation
- [x] Secure session handling (httpOnly cookies via Supabase)
- [x] Content Security Policy
- [x] SQL injection protection (parameterized queries via Supabase)
- [x] XSS protection (React escaping + CSP)
- [x] Rate limiting ready (can add when needed)

## 📝 Next Steps After Setup

1. Change default passwords in docker-compose.yml
2. Configure Stripe products and prices
3. Set up Resend domain verification
4. Customize email templates
5. Add your UI components
6. Implement your core features
7. Deploy to Coolify (100% self-hosted!)

Remember: This starter is intentionally minimal. Add complexity only when you need it, not before.

## 🏠 Self-Hosted Philosophy

This starter kit is designed for 100% self-hosting:
- **Local Development**: Docker Compose with full Supabase stack
- **Production**: Self-hosted on your infrastructure via Coolify
- **No Cloud Dependencies**: Own your data, control your costs
- **GDPR/DSGVO Ready**: Host in your preferred jurisdiction