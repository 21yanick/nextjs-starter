# NextJS Starter Kit - Template Separation Matrix

## 🎯 Target Architecture: Core + Focused Templates

```
templates/
├── nextjs-core/              # Shared foundation (40-50% current code)
├── nextjs-saas-template/     # Clean SaaS only (subscription + billing)
├── nextjs-shop-template/     # Clean shop only (ecommerce + cart)
├── nextjs-booking-template/  # Clean booking only (calendar + appointments)
└── create-project.sh         # Generator: "./create-project.sh kunde-crm saas"
```

## 📊 File Classification

### 🟢 CORE (Universal - Goes to nextjs-core/)
**Foundation files - needed by all templates:**

- `app/layout.tsx` ✅ Universal layout
- `middleware.ts` ✅ Auth protection
- `lib/auth/` ✅ Authentication system
- `lib/supabase/` ✅ Database clients
- `lib/email/client.ts` ✅ Email infrastructure
- `lib/env.ts` ✅ Environment validation
- `lib/logger.ts` ✅ Logging system
- `lib/utils.ts` ✅ Utility functions
- `components/ui/` ✅ Design system
- `components/auth/` ✅ Auth components
- `components/layout/` ✅ Layout components
- `components/theme-*` ✅ Theme system
- `hooks/` ✅ Shared hooks
- `types/database.ts` ✅ Database types
- `app/auth/` ✅ Auth pages
- `app/dashboard/page.tsx` ✅ Basic dashboard (customizable)
- `app/not-found.tsx` ✅ Error pages
- `app/api/health/` ✅ Health endpoint
- All config files ✅ (package.json, tsconfig, etc.)

### 🔴 SAAS-SPECIFIC (nextjs-saas-template only)
**Subscription & SaaS features:**

- `lib/stripe/subscription.ts` ❌ 115 lines SaaS ballast
- `lib/stripe/config.ts` (filtered for SaaS)
- `app/(marketing)/pricing/` (subscription plans only)
- `app/(marketing)/features/` (SaaS features only)
- `components/checkout-button.tsx` (subscription mode)
- `app/api/webhooks/stripe/` (subscription webhooks)
- `lib/email/templates/welcome.tsx` (SaaS onboarding)

### 🟠 SHOP-SPECIFIC (nextjs-shop-template only)
**E-commerce & shopping features:**

- `lib/stripe/shop.ts` ❌ 165 lines shop ballast
- `app/(marketing)/shop/` ❌ Shop pages
- `app/(marketing)/pricing/` (product pricing only)
- `app/(marketing)/features/` (shop features only)
- `components/checkout-button.tsx` (shop mode)
- Cart components (not yet implemented)
- Product components (not yet implemented)
- Order management (not yet implemented)

### 🟡 BOOKING-SPECIFIC (nextjs-booking-template only)
**Appointment & booking features:**

- `lib/stripe/booking.ts` ❌ 191 lines booking ballast
- `app/(marketing)/pricing/` (service rates only)
- `app/(marketing)/features/` (booking features only)
- `components/checkout-button.tsx` (booking mode)
- Calendar components (not yet implemented)
- Appointment management (not yet implemented)
- Service booking (not yet implemented)

### 🔄 CONDITIONAL COMPONENTS (Needs Template-Specific Versions)

**Components that change behavior based on business model:**

1. **`lib/business-config.ts`** - Core logic, template-specific defaults
2. **`app/(marketing)/features/page.tsx`** - Feature display logic
3. **`app/(marketing)/pricing/page.tsx`** - Pricing display logic  
4. **`components/checkout-button.tsx`** - Payment mode switching
5. **`app/(marketing)/layout.tsx`** - Navigation adaptation
6. **`components/layout/header.tsx`** - Menu structure

## 📈 Ballast Code Elimination

**Current Universal Kit:** 471 lines of unused payment code per client
**Target Clean Templates:**
- SaaS Client: Gets 115 lines subscription.ts (NO shop/booking code)
- Shop Client: Gets 165 lines shop.ts (NO saas/booking code)  
- Booking Client: Gets 191 lines booking.ts (NO saas/shop code)

**Result: 75% reduction in irrelevant code per client project!**

## 🚀 Implementation Strategy

### Phase 1: Core Extraction
1. Create `templates/nextjs-core/` directory
2. Move universal files to core
3. Create shared package.json with core dependencies

### Phase 2: Template Creation  
1. Create template directories
2. Copy core + add specific features
3. Remove business-config switching logic
4. Hard-code business model in each template

### Phase 3: Generator Script
1. Create `create-project.sh`
2. Template copying + customization
3. Business model specific configuration
4. Client project initialization

### Phase 4: Validation
1. Test each template independently
2. Verify zero ballast code
3. Confirm feature completeness
4. Client delivery testing