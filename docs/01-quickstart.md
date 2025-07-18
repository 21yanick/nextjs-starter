# 🚀 Quick Start Guide

**Get the NextJS starter template running in 5 minutes**

## ✅ Prerequisites

- Docker Desktop (running)
- Node.js 18+ 
- pnpm or npm
- Ports 3000, 55321-55323 available

```bash
# Verify setup
docker --version && node --version
```

## 🏗️ Setup (2 Steps)

### 1. Start Infrastructure (2 min)
```bash
git clone [repo-url] nextjs-starter
cd nextjs-starter/infrastructure
docker compose up -d
```

Wait for all services to be healthy:
```bash
docker compose ps
# All services should show "healthy" status
```

### 2. Start Template Development (1 min)
```bash
cd ../template
pnpm install
pnpm run dev
```

**✅ Ready:** [App](http://localhost:3000) | [Database](http://localhost:55323)

## 🔍 Verify Setup

### Quick Test Checklist
- [ ] [App loads](http://localhost:3000) - Main application
- [ ] [Studio works](http://localhost:55323) - Database interface  
- [ ] Sign up creates account - Test authentication
- [ ] Dashboard accessible - Protected routes work

### Test Account Creation
1. Go to [Sign Up](http://localhost:3000/auth/register)
2. Create account with any email/password
3. Check [Supabase Studio](http://localhost:55323) → Authentication → Users

## 🎯 What You Get

### Template Features
- **Authentication** - Complete signup/login system
- **Database** - PostgreSQL with Supabase interface
- **Payments** - Stripe integration (test mode)
- **UI Components** - Radix UI with Tailwind CSS
- **Theme** - Dark/light mode toggle

### Development Stack
- **Frontend:** Next.js 15 + React 19 + TypeScript
- **Backend:** Self-hosted Supabase stack
- **Database:** PostgreSQL with migrations
- **Styling:** Tailwind CSS + shadcn/ui

## 🛠️ Daily Development

### Common Commands
```bash
# Development
pnpm run dev          # Start development server
pnpm run build        # Test production build
pnpm run lint         # Code linting
pnpm run type-check   # TypeScript validation

# Infrastructure  
cd infrastructure/
docker compose ps       # Check service status
docker compose logs -f  # View logs
```

## 🔧 Configuration

### Customize Template
Edit `lib/config.ts` to customize:

```typescript
export const siteConfig = {
  name: "Your App Name",
  currency: "USD" as const,  // Change from CHF
  locale: "en-US" as const,  // Change from de-CH
  pricing: {
    starter: 9.99,
    pro: 19.99
  }
}
```

### Environment Variables
Key variables in `template/.env.local`:

```env
# Database (auto-configured)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

# Payments (add your test keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...
```

## 🐛 Troubleshooting

### Common Issues

| Problem | Solution |
|---------|----------|
| Port 3000 in use | `lsof -i :3000` → kill process |
| Docker services fail | Check Docker Desktop is running |
| Build errors | `rm -rf .next && pnpm run dev` |
| Database connection | `docker compose restart` |

### Infrastructure Issues

**Services won't start:**
```bash
# Check available ports
netstat -tulpn | grep :55321

# Restart infrastructure
cd infrastructure/
docker compose down && docker compose up -d
```

**Database connection failed:**
```bash
# Check service logs
docker compose logs supabase-db
docker compose logs kong

# Test database
docker exec supabase-db pg_isready -U postgres
```

### Template Issues

**Authentication not working:**
- Check Supabase Studio → Settings → API
- Verify JWT keys match between infrastructure and template
- Check browser console for errors

**Build failures:**
```bash
# Clear Next.js cache
rm -rf .next node_modules
pnpm install
pnpm run dev
```

### Emergency Reset
```bash
# Complete reset (nuclear option)
cd infrastructure/
docker compose down -v
docker compose up -d

cd ../template/
rm -rf .next node_modules
pnpm install
pnpm run dev
```

## 📚 Next Steps

### Learn the Stack
- **[Development Guide](05-development.md)** - Daily workflow and best practices
- **[Infrastructure Details](../infrastructure/README.md)** - Docker setup and services

### Customize Your App
1. **Branding:** Update logo, colors, and content
2. **Features:** Add your business logic
3. **Database:** Extend schema in `infrastructure/volumes/db/`
4. **Payments:** Configure Stripe with your products

### Production Deployment
1. Set up production database (managed PostgreSQL)
2. Configure live Stripe keys and webhooks  
3. Set up custom domain with SSL
4. Configure monitoring and error tracking

---

**Setup time:** ~5 minutes | **Status:** Production Ready ✅