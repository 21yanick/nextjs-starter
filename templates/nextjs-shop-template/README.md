# 🌟 NextJS Universal Starter Kit - Self-Hosted Edition

A production-ready universal starter kit supporting **multiple business models**: SaaS, E-Commerce, Booking Systems, and more. 100% self-hosted, no cloud dependencies, full control over your data.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Self--Hosted-green?style=flat-square&logo=supabase)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)
![Stripe](https://img.shields.io/badge/Stripe-Integrated-purple?style=flat-square&logo=stripe)

## 🎯 Universal Business Models

**One Kit, Multiple Possibilities:**
- **💼 SaaS Platform** - Subscription management, user dashboards, recurring billing
- **🛍️ E-Commerce Shop** - Product catalog, shopping cart, order management  
- **📅 Booking System** - Appointment scheduling, service management, payments
- **🏢 Corporate Website** - Marketing pages, contact forms, lead generation
- **🔄 Universal Mode** - Combine multiple models in one application

## ✨ Features

### ✅ **Production Ready (100% Complete)**
- **🔐 Complete Authentication Flow** - JWT/PostgREST integration, middleware protection
- **💳 Stripe Payment Integration** - Real checkout, webhooks, subscription management
- **🔄 Business Model Switching** - Dynamic UI adaptation based on configuration
- **🎨 Universal UI System** - Dynamic Header/Footer, dark/light mode, responsive design
- **🛡️ Security First** - RLS policies, JWT validation, environment protection
- **📊 Structured Logging** - Pino logger with proper error handling
- **🗄️ Production Database** - PostgreSQL with comprehensive migrations
- **🚀 Performance Optimized** - Server Components, React 19, optimized builds

### 🛍️ **E-Commerce Features**
- **Product Catalog** - Image galleries, pricing, inventory
- **Shopping Cart** - Add to cart, quantity management
- **Order Processing** - Checkout flow, payment integration
- **Responsive Design** - Mobile-first e-commerce experience

### Self-Hosted Benefits
- **🏠 100% Data Sovereignty** - All data stays on your server
- **💰 No Cloud Costs** - Only your server costs
- **🔐 GDPR Compliant** - Host in Germany if needed
- **🚫 No Vendor Lock-in** - You control everything

## 🏁 Quick Start

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm
- Docker & Docker Compose
- Stripe Account (for payments - optional)
- Resend Account (for emails - optional)

### 1. Setup Project

```bash
# Clone and install dependencies
git clone <your-repo>
cd nextjs-starter
pnpm install

# Create environment file
cp .env.example .env.local

# Start local Supabase stack
pnpm run docker:up

# Wait ~30 seconds for services to be ready
pnpm run docker:ps
```

### 2. Local Supabase Services

After `pnpm run docker:up` these services will be available:

- **Studio**: http://localhost:55323 (Supabase Dashboard)
- **API**: http://localhost:55321 (Public API)
- **Database**: localhost:55322 (PostgreSQL)

### 3. Configure Environment

The `.env.local` file contains local Supabase defaults. Update these for external services:

```env
# Supabase (Local defaults - already configured)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Business Model Configuration (Swiss-only)
BUSINESS_MODEL=shop                 # Swiss-only shop template
ENABLE_SUBSCRIPTIONS=false
ENABLE_SHOP=true
ENABLE_BOOKINGS=false

# External Services (Optional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
RESEND_API_KEY=re_...
```

### 🔄 Business Model Switching

Change your entire application by updating the environment:

```bash
# SaaS Platform
BUSINESS_MODEL=saas
ENABLE_SUBSCRIPTIONS=true
ENABLE_SHOP=false

# E-Commerce Shop  
BUSINESS_MODEL=shop
ENABLE_SUBSCRIPTIONS=false
ENABLE_SHOP=true

# Booking System
BUSINESS_MODEL=booking
ENABLE_SUBSCRIPTIONS=false
ENABLE_BOOKINGS=true

# Universal (All Features)
BUSINESS_MODEL=universal
ENABLE_SUBSCRIPTIONS=true
ENABLE_SHOP=true
ENABLE_BOOKINGS=true
```

**Changes Applied Automatically:**
- Header/Footer navigation adapts
- Landing page content switches
- Features page shows relevant sections
- Pricing page displays appropriate plans
- Payment flows adjust to business model

### 4. Initialize Database

```bash
# Setup database schema
pnpm run db:setup

# This will:
# - Start all Supabase services (DB, Auth, REST, Storage, Meta, Studio)
# - Auto-run migrations to create tables with RLS policies
# - Set up authentication triggers
# - Create storage buckets
# 
# Note: The setup script automatically runs migrations and creates all necessary tables
```

### 5. Start Development

```bash
# Start development server with Turbopack
pnpm run dev

# Visit: http://localhost:3000
# Supabase Studio: http://localhost:55323
```

### 6. Test Authentication

1. **Register**: Go to http://localhost:3000/auth/register
2. **Create Account**: Use any email/password
3. **Auto-confirm**: Development mode auto-confirms emails
4. **Dashboard**: Access protected http://localhost:3000/dashboard

## 📦 Available Scripts

```bash
# Development
pnpm run dev              # Start development server (Turbopack)
pnpm run build            # Build for production
pnpm run start            # Start production server

# Code Quality
pnpm run lint             # Run ESLint
pnpm run format           # Format with Prettier
pnpm run type-check       # TypeScript check

# Database
pnpm run db:setup         # Initialize database with schema
pnpm run db:migrate       # Run migrations
pnpm run db:seed          # Load test data
pnpm run db:types         # Generate TypeScript types (requires Supabase CLI)

# Docker
pnpm run docker:up        # Start Supabase stack
pnpm run docker:down      # Stop Supabase stack
pnpm run docker:logs      # View logs
pnpm run docker:ps        # Check service status
```

## 🏗️ Project Structure

```
├── app/                          # Next.js 15 App Router
│   ├── auth/                    # Authentication pages
│   │   ├── login/page.tsx       # Login page
│   │   ├── register/page.tsx    # Registration page
│   │   ├── reset/page.tsx       # Password reset
│   │   └── confirm/page.tsx     # Email confirmation
│   ├── dashboard/page.tsx       # Protected dashboard
│   ├── api/
│   │   ├── health/route.ts      # Health check endpoint
│   │   └── webhooks/stripe/     # Stripe webhook handlers
│   ├── layout.tsx               # Root layout with theme
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/                   # React components
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx           # Button component
│   │   ├── card.tsx             # Card component
│   │   ├── input.tsx            # Input component
│   │   ├── alert.tsx            # Alert component
│   │   └── ...                  # Other UI components
│   ├── auth/                    # Authentication components
│   │   ├── auth-button.tsx      # Dynamic auth button
│   │   ├── sign-in-form.tsx     # Login form
│   │   ├── sign-up-form.tsx     # Registration form
│   │   └── submit-button.tsx    # Form submit button
│   ├── layout/                  # Layout components
│   │   ├── header.tsx           # Navigation header
│   │   └── footer.tsx           # Site footer
│   └── theme-provider.tsx       # Theme context provider
├── lib/                         # Core utilities
│   ├── auth/
│   │   └── actions.ts           # Server Actions for auth
│   ├── supabase/                # Database clients
│   │   ├── client.ts            # Client-side client
│   │   ├── server.ts            # Server-side client
│   │   └── middleware.ts        # Middleware client
│   ├── stripe/                  # Payment logic
│   │   ├── config.ts            # Stripe configuration
│   │   └── checkout.ts          # Checkout logic
│   ├── email/                   # Email system
│   │   ├── client.ts            # Resend client
│   │   └── templates/           # React Email templates
│   ├── env.ts                   # Environment validation
│   ├── logger.ts                # Structured logging
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
│   └── setup-database.js       # Database setup script
├── middleware.ts                # Auth + Security middleware
├── instrumentation.ts           # Logging setup
├── docker-compose.yml           # Local Supabase stack
├── Dockerfile                   # Production build
├── tailwind.config.ts           # Tailwind configuration
└── next.config.ts               # Next.js configuration
```

## 🔒 Security Features

- ✅ **Security Headers** - CSP, HSTS, X-Frame-Options via middleware
- ✅ **CSRF Protection** - Built into React 19 Server Actions
- ✅ **Environment Validation** - Zod schema validation on startup
- ✅ **Session Security** - httpOnly cookies, secure token handling
- ✅ **Route Protection** - Middleware-based authentication guards
- ✅ **SQL Injection Protection** - Parameterized queries via Supabase
- ✅ **XSS Protection** - React escaping + Content Security Policy
- ✅ **Input Validation** - Server-side validation with error handling
- ✅ **Audit Logging** - Structured logging with Pino

## 🛠️ Tech Stack Details

### Frontend
- **Next.js 15** - App Router with Server Components
- **React 19** - useActionState, useFormStatus, Server Actions
- **TypeScript 5** - Full type safety with ES2022 targets
- **Tailwind CSS 4** - Zero-config styling with modern CSS features
- **shadcn/ui** - Accessible components with Radix primitives

### Backend
- **Supabase** - Self-hosted PostgreSQL with built-in auth
- **Row Level Security** - Database-level security policies
- **Server Actions** - Type-safe server mutations
- **Middleware** - Route protection and security headers
- **Structured Logging** - Pino with proper error handling

### Development
- **Turbopack** - Fast development builds
- **ESLint** - Code quality with Next.js rules
- **Prettier** - Code formatting
- **Husky** - Git hooks for quality gates
- **Docker Compose** - Local development environment

## 🐳 Docker Services

The `docker-compose.yml` includes these services with prefixed names:

- **nextjs-starter-db** - PostgreSQL database (port 55322)
- **nextjs-starter-auth** - Supabase GoTrue auth service  
- **nextjs-starter-rest** - Supabase REST API
- **nextjs-starter-storage** - File storage service
- **nextjs-starter-studio** - Web-based database dashboard (port 55323)
- **nextjs-starter-kong** - API Gateway (port 55321)

## 🚀 Production Deployment

### With Coolify (Recommended)
1. **Deploy Supabase** - Use Coolify's Supabase template
2. **Deploy Next.js App** - Use the included Dockerfile
3. **Configure Environment** - Set production variables
4. **Health Checks** - Use `/api/health` endpoint

### Environment Variables for Production
```env
# Production Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-domain.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key

# Production App
NEXT_PUBLIC_APP_URL=https://your-app-domain.com

# External Services
STRIPE_SECRET_KEY=sk_live_...
RESEND_API_KEY=re_...
```

## 📝 Development Workflow

### Authentication Testing
```bash
# 1. Start services
pnpm run docker:up

# 2. Initialize database
pnpm run db:setup

# 3. Start development
pnpm run dev

# 4. Test authentication
# - Register: http://localhost:3000/auth/register
# - Login: http://localhost:3000/auth/login
# - Dashboard: http://localhost:3000/dashboard
```

### Code Quality
```bash
# Run all quality checks
pnpm run type-check    # TypeScript compilation
pnpm run lint          # ESLint checks
pnpm run build         # Production build test
```

## 🎯 Key Decisions

- **React 19 Server Actions** - Modern form handling without client-side complexity
- **Middleware-based Auth** - Route protection at the edge
- **Server Components First** - Better performance and SEO
- **Self-hosted Supabase** - Complete data sovereignty
- **Zero-config Tailwind** - Modern CSS with minimal setup
- **Type Safety Everywhere** - Zod validation + TypeScript

## 🔧 Customization

### Branding
- Update logo in `components/layout/header.tsx`
- Modify theme colors in `app/globals.css`
- Customize email templates in `lib/email/templates/`

### Database Schema
- Add migrations in `supabase/migrations/`
- Update TypeScript types in `types/database.ts`
- Modify RLS policies as needed

### UI Components
- All components are in `components/ui/`
- Fully customizable with Tailwind classes
- Follow shadcn/ui patterns for consistency

## 📚 Learn More

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Features](https://react.dev/blog/2024/12/05/react-19)
- [Supabase Self-Hosting](https://supabase.com/docs/guides/self-hosting)
- [Tailwind CSS 4](https://tailwindcss.com/blog/tailwindcss-v4)
- [shadcn/ui Components](https://ui.shadcn.com/)

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. "Failed to retrieve tables" in Supabase Studio
**Problem**: Studio can't connect to database or missing tables  
**Solution**: 
```bash
# Check if all services are running
pnpm run docker:ps

# If tables are missing, run migrations manually:
pnpm run db:setup
```

#### 2. Port Conflicts
**Problem**: Ports 55321, 55322, or 55323 already in use  
**Solution**: 
- Stop conflicting services: `sudo lsof -ti:55321 | xargs kill -9`
- Or change ports in `docker-compose.yml` and `.env.local`

#### 3. Authentication "User not found" Errors
**Problem**: Console shows "User not found" errors  
**Note**: These errors are **normal** for non-authenticated users browsing public pages.

#### 4. Database Connection Issues
**Problem**: Services can't connect to database  
**Solution**:
```bash
# Clean restart with fresh database
pnpm run docker:down
docker volume rm nextjs-starter_nextjs-starter-db-data
pnpm run docker:up
sleep 30 && pnpm run db:setup
```

#### 5. Studio Unhealthy Status
**Problem**: Studio container shows as unhealthy  
**Solution**: Wait 1-2 minutes for all services to fully start, then refresh Studio

### Verifying Setup Success
```bash
# All these should work:
curl http://localhost:55321/auth/v1/settings  # Should show auth settings
curl http://localhost:55323                   # Should show Studio
pnpm run docker:ps                           # Should show all containers healthy
```

### Getting Help
- Check the [Issues](https://github.com/your-repo/issues) section
- Review the `PROJECT-CUSTOMIZATION.md` guide
- Verify your environment setup

## 📄 License

MIT License - Use it for anything you want!

---

**Built with ❤️ for Data Sovereignty - 100% Self-Hosted SaaS**