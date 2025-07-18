# 🧹 Template Cleanup Roadmap

**Clean, modular, simple architecture for professional Swiss NextJS starter**

---

## 🎯 Core Philosophy

- **Ein Template = Ein Business Model** (no complex abstractions)
- **Server-first architecture** (minimal client components)
- **Modular infrastructure** (plug-and-play schemas)
- **Single source of truth** (unified configuration)

---

## 📋 Cleanup Tasks

### 1. **Schema Modularization** ✅ **COMPLETED & TESTED**

```bash
# Modular schema system implemented
infrastructure/volumes/db/
├── 00-core-schema.sql      # Profiles, triggers, storage (required)
├── 01-saas-schema.sql      # Subscriptions, plans (default)
├── 02-shop-schema.sql      # Products, orders (optional)
├── 03-booking-schema.sql   # Appointments (optional)
└── business-schema.sql     # Loads core + saas by default
```

**Implementation:** 
- ✅ Modular schema files created with Swiss optimization
- ✅ Docker volume mounts updated in docker-compose.yml
- ✅ Core schema required for all projects
- ✅ SaaS schema loaded by default (CHF currency, Swiss locale)
- ✅ Shop/Booking schemas commented out (uncomment to enable)
- ✅ Clear documentation and configuration notes

**Benefits:** Project-specific database setup, no unused tables, easy extension

### 2. **Remove Business Model Abstractions**

```typescript
// Remove from template:
- lib/business-config.ts (getBusinessModel, feature flags)
- Multi-domain types in stripe/config.ts
- BUSINESS_MODEL environment variables
- ENABLE_* feature flags

// Template becomes pure SaaS-focused
// Document how to add Shop/Booking features separately
```

**Benefits:** Simplicity, no unused code, clear purpose

### 3. **Configuration Unification**

```typescript
// Single config file: lib/config.ts
export const CONFIG = {
  app: { name: 'Swiss SaaS', url: process.env.NEXT_PUBLIC_APP_URL },
  swiss: { currency: 'CHF', locale: 'de-CH', timezone: 'Europe/Zurich' },
  stripe: { /* unified stripe config */ },
  supabase: { /* unified supabase config */ },
  email: { /* resend config */ }
} as const;
```

**Benefits:** One place to change settings, no conflicts

### 4. **Server-First Components**

```typescript
// Convert to Server Components:
- app/dashboard/page.tsx     # Remove 'use client', use server auth
- components/plan-status.tsx # Server-rendered with user data
- pricing pages             # Server-rendered for SEO

// Keep as Client Components only:
- Forms with interactivity
- Theme provider
- Auth form interactions
```

**Benefits:** Better performance, SEO, simpler data flow

### 5. **Component Organization**

```bash
# Group related components
components/
├── billing/              # Move billing-related components here
│   ├── plan-status.tsx
│   ├── plan-actions.tsx  
│   ├── billing-history.tsx
│   └── checkout-button.tsx
├── auth/                 # Keep existing
├── layout/               # Keep existing
└── ui/                   # Keep existing
```

**Benefits:** Clear domains, easier maintenance

### 6. **API Route Grouping**

```bash
# Organize related API routes
app/api/
├── auth/                 # Auth-related endpoints
├── billing/              # Billing & subscription endpoints
│   ├── checkout/
│   ├── subscription/
│   └── webhooks/stripe/
└── health/               # Keep existing
```

**Benefits:** Related functionality grouped together

---

## 🚀 Implementation Order

### **Phase 1: Core Cleanup** (1-2 days)
1. Remove business model abstractions
2. Create unified configuration 
3. Clean up conflicting config files

### **Phase 2: Architecture** (2-3 days)
1. Convert components to server-first
2. Reorganize component structure
3. Group API routes logically

### **Phase 3: Infrastructure** (1-2 days)
1. Split business schema into modules
2. Update docker initialization
3. Test database setup workflow

---

## 📖 Documentation Updates

- Update all docs to reflect SaaS-focus
- Add "Extending to Shop/Booking" guide
- Document new component organization
- Explain server vs client component decisions

---

## ✅ Success Criteria

- **Simplified:** No unused business model code
- **Modular:** Database schemas plug-and-play
- **Clear:** Obvious server vs client boundaries  
- **Fast:** Optimized for server-first rendering
- **Swiss:** Maintained CHF/TWINT/de-CH optimization

---

**Result:** Professional Swiss SaaS starter kit with clean, extensible architecture