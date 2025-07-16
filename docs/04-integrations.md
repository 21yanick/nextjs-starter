# 🔗 Service Integrations

**Production-ready Service-Integration mit CHF-Optimierung und Template-spezifischen Workflows**

Das Starter Kit integriert professionelle Services für Payment, Email, Monitoring und Analytics. Alle Services sind für den Schweizer Markt optimiert mit CHF-Währung, TWINT-Unterstützung und de-CH Lokalisierung.

---

## 🔄 Integration Overview

| Service | Purpose | Template Support | Swiss Optimization |
|---------|---------|------------------|-------------------|
| **Stripe** | Payments | SaaS, Shop, Booking | ✅ CHF + TWINT |
| **Resend** | Email | All Templates | ✅ German Templates |
| **Supabase** | Database + Auth | All Templates | ✅ Europe/Zurich |
| **Sentry** | Error Tracking | All Templates | ✅ GDPR Compliant |
| **Pino** | Logging | All Templates | ✅ Structured Logs |

### Template-Service Matrix
```typescript
// Business Model → Active Services
saas:    Stripe (subscriptions), Resend (billing), Sentry, Analytics
shop:    Stripe (payments), Resend (orders), Sentry, Analytics  
booking: Stripe (appointments), Resend (confirmations), Sentry, Analytics
```

---

## 💳 Stripe Payment Integration

**Swiss-optimierte Payment-Verarbeitung mit CHF und TWINT**

### Setup & Configuration
```bash
# 1. Stripe Dashboard
# - Schweizer Unternehmen registrieren
# - TWINT Payment Method aktivieren
# - Webhook Endpoints konfigurieren

# 2. Environment Variables
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Business Model Integration

**SaaS Template:**
```typescript
// Subscription Pricing (CHF)
STRIPE_STARTER_PRICE_ID=price_1ABC_starter_chf_monthly
STRIPE_PRO_PRICE_ID=price_1DEF_pro_chf_monthly
STRIPE_ENTERPRISE_PRICE_ID=price_1GHI_enterprise_chf_monthly

// Webhook Events
customer.subscription.created|updated|deleted
payment_intent.succeeded|payment_failed
```

**Shop Template:**
```typescript
// Dynamic Product Pricing
currency: 'CHF'
payment_method_types: ['card', 'twint']
shipping_address_collection: {
  allowed_countries: ['CH', 'DE', 'AT']
}
```

**Booking Template:**
```typescript
// Time-based Pricing with Swiss Business Hours
peakHours: ['09:00-12:00', '14:00-18:00']
peakMultiplier: 1.2
currency: 'CHF'
timezone: 'Europe/Zurich'
```

### Webhook Implementation
```typescript
// app/api/webhooks/stripe/route.ts
export async function POST(request: Request) {
  const signature = headers().get('stripe-signature');
  const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  
  // Database synchronization with structured logging
  await supabase.from('subscriptions').upsert({
    stripe_subscription_id: subscription.id,
    status: subscription.status,
    // ... Swiss-specific fields
  });
}
```

### TWINT Integration
```typescript
// Swiss Payment Method Configuration
const paymentMethods = ['card', 'twint'];
const checkout = await stripe.checkout.sessions.create({
  payment_method_types: paymentMethods,
  currency: 'CHF',
  locale: 'de',
  // ... TWINT-specific configuration
});
```

---

## 📧 Email System (Resend)

**React Email Templates mit Swiss Business Formatting**

### Service Setup
```bash
# 1. Resend Account
# https://resend.com → API Key generieren

# 2. Domain Verification  
# DNS Records für eigene Domain konfigurieren

# 3. Environment
RESEND_API_KEY=re_your_api_key
```

### Swiss Email Templates
```typescript
// lib/email/templates/invoice.tsx
const formattedAmount = new Intl.NumberFormat('de-CH', {
  style: 'currency',
  currency: 'CHF'
}).format(amount / 100);

const germanDate = new Intl.DateTimeFormat('de-CH', {
  year: 'numeric', month: 'long', day: 'numeric'
}).format(new Date(paymentDate));
```

### Template-spezifische Workflows

**SaaS Emails:**
- Welcome: Subscription onboarding
- Invoice: Billing notifications (CHF)
- Cancellation: Subscription management

**Shop Emails:**
- Order Confirmation: Purchase details
- Shipping: Delivery notifications
- Refunds: Return processing

**Booking Emails:**
- Appointment Confirmation: Service details
- Reminders: Time-based notifications
- Cancellation: Booking changes

### Development Setup
```bash
# Development: SMTP Mock via Inbucket (Docker)
# Production: Resend API

# Email Templates testen
npm run email:dev  # React Email Preview
```

---

## ⚙️ Environment Configuration

**Multi-Template Configuration mit Feature Flags**

### Core Environment Setup
```env
# Business Model Detection
BUSINESS_MODEL=saas|shop|booking
ENABLE_SUBSCRIPTIONS=true|false
ENABLE_SHOP=true|false
ENABLE_BOOKINGS=true|false

# Swiss Localization
NEXT_PUBLIC_APP_URL=https://yourapp.ch
TIMEZONE=Europe/Zurich
LOCALE=de-CH
CURRENCY=CHF
```

### Service Integration Variables
```env
# Stripe (Swiss Configuration)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email Service
RESEND_API_KEY=re_...

# Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://...
SENTRY_AUTH_TOKEN=...

# Database (Infrastructure Connection)
DATABASE_URL=postgresql://postgres:password@localhost:55322/postgres
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
```

### Development vs Production
```bash
# Development (Test Keys)
STRIPE_SECRET_KEY=sk_test_...  # Safe for local development
RESEND_API_KEY=re_test_...     # Test email delivery

# Production (Live Keys)  
STRIPE_SECRET_KEY=sk_live_...  # Production payments
RESEND_API_KEY=re_live_...     # Live email delivery
```

### Template Generation
```bash
# Automatische Environment-Konfiguration
./create-project.sh kunde-app saas
# → Erstellt .env.local mit SaaS-spezifischen Einstellungen
# → ENABLE_SUBSCRIPTIONS=true, andere Features=false
```

---

## 📊 Monitoring & Analytics

**Strukturiertes Logging und Error Tracking für Production**

### Logging (Pino)
```typescript
// lib/logger.ts Integration
import { getLogger } from '@/lib/logger';
const logger = getLogger('stripe-webhook');

logger.info('Processing webhook', { 
  event_type: event.type,
  customer_id: event.data.object.customer 
});
```

### Error Tracking (Sentry)
```typescript
// Automatische Integration in error.tsx
'use client';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error }: { error: Error }) {
  Sentry.captureException(error);
  // User-friendly error display
}
```

### Business Analytics
```typescript
// Supabase Analytics Integration
const trackEvent = async (event: string, metadata: object) => {
  await supabase.from('analytics_events').insert({
    event_type: event,
    metadata,
    user_id: user?.id,
    business_model: process.env.BUSINESS_MODEL
  });
};

// Usage Examples
trackEvent('subscription_created', { plan: 'pro', currency: 'CHF' });
trackEvent('order_completed', { amount: 9990, currency: 'CHF' });
trackEvent('appointment_booked', { service: 'consultation', duration: 60 });
```

### Infrastructure Monitoring
```bash
# Docker Health Checks
docker compose ps  # Service status
docker compose logs stripe-webhook  # Service logs

# Supabase Analytics Dashboard
http://localhost:55323 → Analytics Tab
```

---

## 🔧 Development Workflow

### Local Development Setup
```bash
# 1. Infrastructure starten
cd infrastructure/
docker compose up -d

# 2. Services konfigurieren
cp .env.example .env.local
# → Test API keys einfügen

# 3. Template erstellen
./create-project.sh test-app saas
cd clients/test-app/
pnpm install && pnpm run dev

# 4. Service Testing
# → Stripe: Test webhooks via CLI
# → Email: Inbucket UI (localhost:9001)
# → Analytics: Supabase Studio (localhost:55323)
```

### Production Deployment
```bash
# 1. Live API Keys konfigurieren
STRIPE_SECRET_KEY=sk_live_...
RESEND_API_KEY=re_live_...

# 2. Webhook Endpoints aktualisieren
# Stripe Dashboard → Webhooks → Live Mode
# https://yourapp.ch/api/webhooks/stripe

# 3. Domain & SSL
# Custom domain mit SSL certificate
# Resend domain verification
```

---

## 🚨 Troubleshooting

### Stripe Integration Issues

**Webhook Verification Failed:**
```bash
# Check webhook secret
echo $STRIPE_WEBHOOK_SECRET
# Verify endpoint in Stripe Dashboard
# Test with Stripe CLI: stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

**TWINT Payment Failed:**
```bash
# Check if TWINT enabled in Stripe Dashboard
# Verify Swiss business account setup
# Test with CHF currency only
```

### Email Delivery Issues

**Resend API Error:**
```bash
# Verify API key
curl -H "Authorization: Bearer $RESEND_API_KEY" https://api.resend.com/emails

# Check domain verification
# DNS records: SPF, DKIM, DMARC
```

**Development Email Testing:**
```bash
# Access Inbucket UI
http://localhost:9001
# Check SMTP container logs
docker compose logs inbucket
```

### Environment Configuration

**Missing Environment Variables:**
```typescript
// Zod validation catches missing vars at startup
ZodError: Required environment variable missing: STRIPE_SECRET_KEY
```

**Business Model Detection:**
```bash
# Check feature flags
echo $BUSINESS_MODEL $ENABLE_SUBSCRIPTIONS
# Verify template-specific configuration
```

### Service Connectivity

**Supabase Connection:**
```bash
# Test database connection
curl http://localhost:55321/health
# Check JWT keys synchronization
```

**Infrastructure Services:**
```bash
# All services status
docker compose ps
# Restart specific service
docker compose restart kong
```

---

## 📋 Integration Checklist

### Setup Verification
- [ ] Stripe Dashboard konfiguriert (CHF + TWINT)
- [ ] Webhook Endpoints aktiv (Test + Live)
- [ ] Resend Domain verifiziert
- [ ] Environment Variables gesetzt
- [ ] Infrastructure Services laufen
- [ ] Business Model korrekt erkannt

### Testing
- [ ] Test Payment durchgeführt (CHF)
- [ ] TWINT Payment getestet
- [ ] Email Templates funktionieren
- [ ] Webhooks verarbeitet
- [ ] Analytics Events tracked
- [ ] Error Logging aktiv

---

**Integration Status**: Production-Ready ✅ | Swiss-Optimized 🇨🇭  
**Next Steps**: [Development Guide](05-development.md) | [Customization](06-customization.md)  
**Version**: NextJS Starter Kit v2.0