# 🚀 NextJS SaaS Starter Kit - Self-Hosted Edition

A production-ready starter kit for modern SaaS applications. 100% self-hosted, no cloud dependencies, full control over your data.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Self--Hosted-green?style=flat-square&logo=supabase)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)

## ✨ Features

### Core Stack
- **🔐 Authentication** - Self-hosted Supabase Auth
- **💳 Payments** - Stripe Subscriptions ready
- **📧 Emails** - Transactional emails with Resend + React Email
- **🗄️ Database** - PostgreSQL via self-hosted Supabase
- **🎨 UI Components** - Tailwind CSS + shadcn/ui ready
- **🔒 Security** - CSP Headers, CSRF Protection, Environment Validation
- **📊 Logging** - Structured logging with Pino

### Self-Hosted Benefits
- **🏠 100% Data Sovereignty** - All data stays on your server
- **💰 No Cloud Costs** - Only your server costs
- **🔐 GDPR Compliant** - Host in Germany if needed
- **🚫 No Vendor Lock-in** - You control everything

## 🏁 Quick Start

### Prerequisites
- Node.js 20+
- pnpm
- Docker & Docker Compose
- Stripe Account (for payments)
- Resend Account (for emails)

### 1. Setup Project

```bash
# Install dependencies
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

Update `.env.local` with your API keys:

```env
# Stripe (from your dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...

# Resend (from your dashboard)
RESEND_API_KEY=re_...

# The Supabase local defaults are already configured
```

### 4. Initialize Database

```bash
# Setup database schema
pnpm run db:setup

# This will:
# - Create all tables
# - Set up Row Level Security (RLS)
# - Create storage buckets
```

### 5. Start Development

```bash
# Start development server
pnpm run dev

# Visit: http://localhost:3000
# Supabase Studio: http://localhost:55323
```

## 📦 Available Scripts

```bash
# Development
pnpm run dev              # Start development server
pnpm run build            # Build for production
pnpm run start            # Start production server

# Code Quality
pnpm run lint             # Run ESLint
pnpm run format           # Format with Prettier
pnpm run type-check       # TypeScript check

# Database
pnpm run db:setup         # Initialize database
pnpm run db:migrate       # Run migrations
pnpm run db:seed          # Load test data

# Docker
pnpm run docker:up        # Start Supabase stack
pnpm run docker:down      # Stop Supabase
pnpm run docker:logs      # View logs
pnpm run docker:ps        # Check service status
```

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-protected routes
│   ├── (marketing)/       # Public routes
│   └── api/               # API routes
├── components/            # React components
├── lib/                   # Core utilities
│   ├── supabase/         # Database clients
│   ├── stripe/           # Payment logic
│   └── email/            # Email templates
├── hooks/                # Custom React hooks
├── types/                # TypeScript types
├── supabase/             # Supabase config
│   ├── migrations/       # SQL migrations
│   └── seed.sql          # Demo data
├── docker-compose.yml    # Local Supabase stack
└── Dockerfile           # Production build
```

## 🔒 Security Features

- ✅ Security headers via middleware
- ✅ CSRF protection (built into Server Actions)
- ✅ Environment variable validation
- ✅ Secure session handling (httpOnly cookies)
- ✅ Content Security Policy
- ✅ SQL injection protection (parameterized queries)
- ✅ XSS protection (React escaping + CSP)

## 🐳 Docker Services

The `docker-compose.yml` includes:
- PostgreSQL database
- Supabase Auth service
- Supabase REST API
- Supabase Storage
- Supabase Studio (dashboard)
- Kong API Gateway

## 🚀 Production Deployment

### With Coolify (Recommended)
1. Deploy Supabase stack using Coolify's Supabase template
2. Deploy this Next.js app using the included Dockerfile
3. Configure environment variables for production

### Environment Variables for Production
```env
# Update these for production
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-domain.com
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-production-service-key
```

## 📝 Next Steps

1. **Configure Stripe** - Add your products and prices
2. **Set up email domain** - Verify your sending domain in Resend
3. **Customize UI** - Add your brand colors and components
4. **Add features** - Build your SaaS functionality
5. **Deploy** - Use Coolify or your preferred platform

## 🎯 Key Decisions

- **Server Components by default** - Better performance
- **Minimal abstractions** - Easy to understand and modify
- **Self-hosted first** - No cloud dependencies
- **Type safety everywhere** - Zod validation + TypeScript
- **Security first** - Headers, validation, and best practices

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Self-Hosting](https://supabase.com/docs/guides/self-hosting)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)

## 📄 License

MIT License - Use it for anything you want!

---

**Built with ❤️ for Data Sovereignty - 100% Self-Hosted SaaS**