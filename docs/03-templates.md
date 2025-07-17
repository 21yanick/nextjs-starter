# 🎨 Business Templates

**Spezialisierte Templates für verschiedene Business Models mit unterschiedlichen Reifegraden**

Das Starter Kit bietet 3 Business Templates, die auf einer gemeinsamen Core Foundation aufbauen. **Wichtig**: Die Templates haben unterschiedliche Entwicklungsstände - wähle basierend auf deinen Produktionsanforderungen.

---

## 📊 Template-Reifegrad Übersicht

| Template | Reifegrad | Status | Produktionsbereit | Empfehlung |
|----------|-----------|---------|-------------------|------------|
| **🟢 SaaS** | 90% | Production-Ready | ✅ Ja | Hauptempfehlung |
| **🟡 Shop** | 45% | In Development | ❌ Nein | Nur für Entwickler |
| **🔴 Booking** | 25% | Early Preview | ❌ Nein | Concept-Only |

> **💡 Empfehlung**: Starte mit dem **SaaS Template** für produktive Projekte. Shop und Booking sind für experimentelle Entwicklung.

---

## 🏗️ Dual-Purpose-Architektur

**Saubere Trennung zwischen Development und Production:**

### Core Foundation (nextjs-core)
**Shared Basis für alle Templates:**
- **Authentication**: Vollständige Supabase Auth Integration
- **UI Components**: Radix UI + Tailwind CSS + Theme Support
- **Layout System**: Header, Footer, Navigation (business-model-aware)
- **Configuration**: Feature flags + environment-basierte Aktivierung
- **Email System**: Resend integration + React Email templates
- **Localization**: CHF currency, de-CH locale, TWINT payments

### Business Templates (nextjs-{model}-template)
**Business-spezifische Teile:**
- **SaaS**: `lib/stripe/subscription.ts`, `app/api/checkout/`, SaaS-specific components
- **Shop**: `lib/stripe/shop.ts`, `app/api/products/`, Shop-specific components
- **Booking**: `lib/stripe/booking.ts`, `app/api/appointments/`, Booking-specific components

### Development Templates (nextjs-{model}-dev)
**Merged Templates für Development:**
- **Auto-generated**: Core + Business Template merged
- **Ready-to-use**: `pnpm install && pnpm run dev`
- **Sync-ready**: Änderungen zurück zu Core/Business Templates

### Template Strategy
```bash
# Production (clean separation)
nextjs-core/                    # Shared components only
nextjs-saas-template/          # SaaS-specific only
nextjs-shop-template/          # Shop-specific only

# Development (merged for development)
nextjs-saas-dev/               # Core + SaaS merged
nextjs-shop-dev/               # Core + Shop merged
nextjs-booking-dev/            # Core + Booking merged
```

---

## 🟢 SaaS Template (Production-Ready)

**Subscription & Billing Management - 90% Vollständig**

### ✅ Implementierte Features
- **Stripe Subscriptions**: Create, cancel, resume, update subscriptions
- **Payment Processing**: CHF subscriptions + TWINT support
- **Webhook Integration**: Complete Stripe webhook handling
- **Pricing System**: 3-tier pricing (Free, Pro, Enterprise)
- **Database Schema**: Profiles + subscriptions tables
- **Email Notifications**: Welcome emails + billing notifications

### 🛠️ Business Logic
```typescript
// Subscription Management
createSubscriptionCheckout(priceId, userId)  // ✅ Complete
cancelSubscription(subscriptionId)          // ✅ Complete  
updateSubscription(subscriptionId, newPlan) // ✅ Complete
```

### 📋 Setup & Configuration
```env
# SaaS-specific environment
BUSINESS_MODEL=saas
ENABLE_SUBSCRIPTIONS=true
ENABLE_SHOP=false
ENABLE_BOOKINGS=false

# Stripe (CHF optimized)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### ⚠️ Was noch fehlt (10%)
- **Subscription Dashboard**: User subscription management UI
- **Usage Tracking**: Plan limits + feature restrictions
- **Billing History**: Invoice downloads + payment history

### 🚀 Template-Development
```bash
# Template-Entwicklung (empfohlen)
cd templates/nextjs-saas-dev/
pnpm install && pnpm run dev

# Nach Entwicklung: Sync zurück zu Production-Templates
scripts/sync-from-dev.sh saas
```

### 🚀 Kundenprojekt-Generierung
```bash
./create-project.sh mein-saas saas
cd clients/mein-saas
pnpm install && pnpm run dev
```

---

## 🟡 Shop Template (In Development)

**E-Commerce & Product Sales - 45% Vollständig**

> **⚠️ Development Warning**: Nicht für Produktionsnutzung. Kritische Features fehlen.

### ✅ Was funktioniert
- **Stripe Integration**: Basic shop payment logic
- **Product Display**: Static product catalog UI (6 demo products)
- **Business Configuration**: CHF pricing + Swiss localization
- **Payment Methods**: Credit card + TWINT support

### ❌ Kritische Lücken
- **API Endpoints**: `/api/checkout` route fehlt komplett
- **Database Schema**: Keine product/order tables
- **Shopping Cart**: Kein cart state management
- **Order Management**: Keine Bestellverwaltung
- **Inventory System**: Keine Lagerverwaltung

### 🛠️ Current State
```typescript
// Was implementiert ist
lib/stripe/shop.ts     // ✅ Payment logic
app/(marketing)/shop/  // ✅ Basic product display

// Was fehlt
app/api/checkout/      // ❌ Missing API endpoints
app/dashboard/orders/  // ❌ No order management
components/cart/       // ❌ No shopping cart
```

### 🔧 Für Entwickler
```bash
./create-project.sh mein-shop shop
# Erwarte: Viel Eigenentwicklung nötig
# Status: Proof-of-concept, nicht funktionsfähig
```

---

## 🔴 Booking Template (Early Preview)

**Appointment Scheduling - 25% Vollständig**

> **🔴 Preview Warning**: Nur für experimentelle Entwicklung. Grundlegende Features fehlen.

### ✅ Was implementiert ist
- **Stripe Booking Logic**: Sophisticated appointment payment system
- **Time-based Pricing**: Peak hours, weekend multipliers
- **Service Management**: Categories (Beauty, Health, Professional)
- **Payment Processing**: Deposits + full payments
- **Swiss Configuration**: CHF + Europe/Zurich timezone

### ❌ Fundamentale Lücken
- **Database Schema**: Keine appointment/service tables
- **Calendar System**: Kein date/time picker
- **API Endpoints**: Keine booking routes
- **Availability Management**: Keine timeslot logic
- **Booking Flow**: Kein reservation interface
- **Provider Dashboard**: Keine appointment management

### 🛠️ Development State
```typescript
// Hochwertige Implementierung
lib/stripe/booking.ts  // ✅ 80% - Excellent payment logic

// Komplett fehlend  
app/api/booking/       // ❌ No API layer
app/calendar/          // ❌ No calendar interface
components/scheduler/  // ❌ No booking UI
```

### 🧪 Für Entwickler
```bash
./create-project.sh mein-booking booking
# Erwarte: Massive Eigenentwicklung erforderlich
# Status: Concept-only, nicht nutzbar
```

---

## 🎯 Template-Auswahl Guide

### Für Produktive Projekte
**→ SaaS Template wählen**
- Vollständig funktionsfähig
- Production-ready infrastructure
- Minimal missing features (UI components)
- Sofortige Deployment-Bereitschaft

### Für Entwicklungsprojekte
**→ Shop oder Booking nur für erfahrene Entwickler**
- Erwarte erhebliche Eigenentwicklung
- Nutze als Ausgangspunkt, nicht als Lösung
- Budget für Backend + Frontend Development

### Business Model Anpassung
```typescript
// Alle Templates teilen dieselbe Konfiguration
BUSINESS_MODEL=saas|shop|booking

// Feature-spezifische Aktivierung
ENABLE_SUBSCRIPTIONS=true   // SaaS
ENABLE_SHOP=true           // E-Commerce
ENABLE_BOOKINGS=true       // Appointments
```

---

## 🛠️ Template-Management

### Template-Manager-Scripts
```bash
# Template-Manager (zentrale Steuerung)
scripts/template-manager.sh create-dev    # Development-Templates erstellen
scripts/template-manager.sh sync saas     # SaaS-Template synchronisieren
scripts/template-manager.sh validate      # Alle Templates validieren
scripts/template-manager.sh status        # Template-Status anzeigen

# Einzelne Scripts
scripts/create-dev-templates.sh           # Dev-Templates generieren
scripts/sync-from-dev.sh [template]       # Sync nach Development
scripts/validate-templates.sh             # Template-Konsistenz prüfen
```

### Template-Development-Workflow
```bash
# 1. Development-Template erstellen (einmalig)
scripts/template-manager.sh create-dev

# 2. Template-Entwicklung (täglich)
cd templates/nextjs-saas-dev/
pnpm install && pnpm run dev
# → Entwicklung: Core-Changes (UI, Auth) + SaaS-Changes (Stripe, API)

# 3. Intelligente Synchronisation (nach Entwicklung)
scripts/template-manager.sh sync saas
# → Core-Changes → nextjs-core/ (alle Templates profitieren)
# → SaaS-Changes → nextjs-saas-template/ (nur SaaS)
# → Regeneriert alle Dev-Templates automatisch
```

### Sync-Intelligence
- **Core-Files**: `components/ui/`, `lib/supabase/`, `components/auth/` → `nextjs-core/`
- **SaaS-Files**: `lib/stripe/`, `app/api/checkout/`, `components/checkout-button.tsx` → `nextjs-saas-template/`
- **Auto-Detection**: Script erkennt automatisch wo Files hingehören
- **Complete Regeneration**: Alle Dev-Templates bleiben synchron

### Template-Architektur-Vorteile
- ✅ **Intelligente Sync**: Automatische Trennung Core vs Business-specific
- ✅ **Vollständige Entwicklung**: Merged Templates mit allen Dependencies
- ✅ **Production-Ready**: Saubere Trennung für create-project.sh
- ✅ **Zero-Duplikation**: Shared components nur einmal in Core

---

## ⚙️ Template Generation Process

### Projekt erstellen
```bash
# Syntax
./create-project.sh [projekt-name] [template]

# Beispiele
./create-project.sh kunde-portal saas
./create-project.sh online-shop shop
./create-project.sh beauty-salon booking
```

### Was passiert automatisch
1. **Core Copy**: `nextjs-core/` → `clients/projekt-name/`
2. **Template Overlay**: `nextjs-{template}-template/` → overwrites specific files
3. **Configuration**: Update `package.json`, `.env.local`, feature flags
4. **Infrastructure Sync**: JWT keys + database connection
5. **Dependencies**: Install template-specific packages (Stripe, etc.)

### Nach der Generierung
```bash
cd clients/projekt-name
pnpm install
pnpm run dev  # localhost:3000

# Infrastructure muss laufen
cd ../../infrastructure
docker compose up -d
```

### Template-spezifische Dateien
| File | Core | SaaS | Shop | Booking |
|------|------|------|------|---------|
| `lib/stripe/` | - | subscription.ts | shop.ts | booking.ts |
| `app/api/checkout/` | - | ✅ Full | ❌ Missing | ❌ Missing |
| `app/api/webhooks/` | - | ✅ Stripe | ❌ Missing | ❌ Missing |
| `package.json` | Basic | +stripe | +stripe | +stripe |

---

## 🚀 Empfehlungen

### Template-Entwicklung (Starter-Kit-Verbesserung)
**→ Development-Templates nutzen**
- Entwicklung direkt in `templates/nextjs-saas-dev/`
- Automatische Synchronisation zu Production-Templates
- Saubere Trennung von Core und Business-Logic
- Template-Manager für alle Operationen

### Sofortiger Kundenprojekt-Start
**→ SaaS Template nutzen**
- 15 Minuten bis funktionsfähige App
- `./create-project.sh kunde-portal saas`
- Subscription system ready
- Nur UI customization nötig

### Development & Learning
**→ SaaS als Basis, Shop/Booking als Referenz**
- Verstehe SaaS implementation in Development-Template
- Verwende Shop/Booking code patterns
- Baue fehlende Features selbst
- Nutze Template-Manager für Konsistenz

### Enterprise/Agency Use
**→ SaaS Template + Custom Extensions**
- Starte mit SaaS foundation
- Erweitere um business-spezifische Features
- Nutze bewährte architecture patterns
- Template-Development für wiederverwendbare Components

---

**Template Status**: SaaS Production-Ready ✅ | Shop/Booking In Development 🔧  
**Nächste Schritte**: [Integration Setup](04-integrations.md) | [Development Guide](05-development.md)  
**Version**: NextJS Starter Kit v2.0