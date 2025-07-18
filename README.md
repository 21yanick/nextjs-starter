# NextJS Starter Kit

**Production-ready NextJS template with authentication, payments, and database**

Self-hosted stack with Supabase, Stripe integration, and modern development setup.

## 🚀 Quick Start

```bash
# 1. Start infrastructure
cd infrastructure && docker compose up -d

# 2. Start development
cd ../template
pnpm install && pnpm run dev
```

**Ready:** [App](http://localhost:3000) | [Database](http://localhost:55323)

## 🛠️ Tech Stack

**Frontend:** Next.js 15 • React 19 • TypeScript • Tailwind CSS  
**Backend:** Supabase (self-hosted) • PostgreSQL • Docker  
**Payments:** Stripe integration
**Components:** Radix UI • shadcn/ui

## ✨ Features

### Complete Authentication
- Email/password signup and login
- Protected routes and middleware
- User profiles and session management
- Password reset flow

### Payment Integration
- Stripe checkout and subscriptions
- Webhook handling for payment events
- Subscription management dashboard
- Invoice and billing history

### Modern Development
- Server-first architecture with client islands
- TypeScript validation with Zod schemas
- Dark/light theme with persistent state
- Responsive design with Tailwind CSS

### Self-Hosted Infrastructure
- PostgreSQL database with migrations
- Supabase authentication and API
- Docker Compose development stack
- Database management interface

## 📁 Project Structure

```
template/                # Main development template
├── app/                # Next.js 15 App Router
├── components/         # React components
├── lib/               # Utilities and integrations
└── .env.local         # Environment configuration

infrastructure/         # Docker Compose stack
├── docker-compose.yml # Service definitions
├── volumes/           # Database initialization
└── .env.local        # Infrastructure configuration
```

## 🔧 Configuration

The template comes pre-configured with:
- **Currency:** CHF (easily changeable in `lib/config.ts`)
- **Locale:** German (de-CH) with Swiss formatting
- **Payments:** Stripe with card and TWINT support
- **Timezone:** Europe/Zurich

Update `lib/config.ts` to customize for your region:

```typescript
export const siteConfig = {
  name: "Your App Name",
  currency: "USD" as const,
  locale: "en-US" as const,
  pricing: {
    starter: 9.99,
    pro: 19.99
  }
}
```

## 🧪 Development

### Daily Commands
```bash
pnpm run dev          # Development server
pnpm run build        # Production build  
pnpm run lint         # Code linting
pnpm run type-check   # TypeScript validation
```

### Infrastructure Management
```bash
cd infrastructure/
docker compose up -d      # Start services
docker compose down       # Stop services  
docker compose ps         # Service status
```

### Database
- **Management:** [Supabase Studio](http://localhost:55323)
- **Direct access:** `docker exec -it supabase-db psql -U postgres`
- **Migrations:** SQL files in `infrastructure/volumes/db/`

## 📚 Documentation

- **[Quickstart](docs/01-quickstart.md)** - Complete setup guide
- **[Development](docs/05-development.md)** - Development workflow
- **[Infrastructure](infrastructure/README.md)** - Docker setup details

## 🔑 Environment Setup

### Template Configuration
```env
# Database
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Infrastructure Configuration
```env
# Secrets (change for production)
POSTGRES_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret-32-chars-min
ANON_KEY=your_anon_key
SERVICE_ROLE_KEY=your_service_role_key

# Ports
KONG_HTTP_PORT=55321
STUDIO_PORT=55323
```

## 🚀 Production Deployment

1. **Environment:** Configure production `.env.local`
2. **Database:** Set up managed PostgreSQL or self-host
3. **Payments:** Configure Stripe live keys and webhooks
4. **Domain:** Set up custom domain with SSL
5. **Monitoring:** Configure error tracking and analytics

## 🏗️ Architecture

- **Server-first:** Optimized for server-side rendering and data fetching
- **Component organization:** Grouped by domain (auth, billing, layout, theme)
- **Type-safe:** Full TypeScript coverage with runtime validation
- **Extensible:** Clean patterns for adding new features

## 📊 Performance

- **Bundle optimization:** Server components with minimal client JavaScript
- **Database efficiency:** Optimized queries with connection pooling
- **Caching:** Strategic caching at multiple levels
- **Loading states:** Smooth UX with proper loading indicators

---

**Status:** Production Ready ✅  
**License:** MIT  
**Node.js:** 18+ required