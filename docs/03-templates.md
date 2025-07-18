# 🎨 NextJS Template

**Ein universelles Swiss NextJS Template für alle Business Models**

Das Starter Kit bietet **eine einzige, vollständige Template** die für verschiedene Business Models konfigurierbar ist. Schluss mit komplexen Multi-Template-Systemen – maximale Einfachheit bei vollständiger Funktionalität.

---

## 🎯 Template-Philosophie

**Ein Template, alle Möglichkeiten:**
- ✅ **Production-Ready**: Vollständig funktionsfähige Swiss Web-App
- ✅ **Universal**: Unterstützt SaaS, E-Commerce, Booking via Environment-Variablen
- ✅ **Swiss-Optimiert**: CHF, de-CH, TWINT, 7.7% MwSt
- ✅ **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- ✅ **Complete Auth**: Supabase Authentication mit User Management
- ✅ **Stripe Integration**: Subscriptions, Payments, Webhooks

---

## 🏗️ Template-Struktur

```
template/                           # Ein universelles Template
├── app/                           # Next.js 15 App Router
│   ├── (auth)/                   # Authentication pages
│   ├── (marketing)/              # Landing pages
│   ├── dashboard/                # User dashboard
│   └── api/                      # API routes
├── components/                    # React components
│   ├── ui/                       # Radix UI components
│   ├── auth/                     # Authentication
│   └── checkout/                 # Payment components
├── lib/                          # Utilities
│   ├── stripe/                   # Payment logic
│   ├── supabase/                 # Database client
│   └── utils.ts                  # Helper functions
└── .env.example                  # Configuration template
```

---

## ⚙️ Business Model Konfiguration

Das Template unterstützt alle Business Models durch **Environment-Variablen**:

### SaaS Configuration
```env
BUSINESS_MODEL=saas
ENABLE_SUBSCRIPTIONS=true
ENABLE_SHOP=false
ENABLE_BOOKINGS=false
```

### E-Commerce Configuration  
```env
BUSINESS_MODEL=shop
ENABLE_SUBSCRIPTIONS=false
ENABLE_SHOP=true
ENABLE_BOOKINGS=false
```

### Booking Configuration
```env
BUSINESS_MODEL=booking
ENABLE_SUBSCRIPTIONS=false
ENABLE_SHOP=false
ENABLE_BOOKINGS=true
```

---

## 🚀 Projekt erstellen

### Syntax
```bash
./create-project.sh [projekt-name] [business-model]
```

### Beispiele
```bash
# SaaS Projekt (Standard)
./create-project.sh kunde-portal saas

# E-Commerce Projekt
./create-project.sh online-shop shop

# Booking Projekt  
./create-project.sh beauty-salon booking

# Business Model ist optional (Standard: saas)
./create-project.sh mein-projekt
```

---

## 🔧 Was passiert automatisch

### 1. Template Copy
```bash
# Direkter Copy ohne komplexe Layering
cp -r "template/." "clients/projekt-name/"
```

### 2. Automatische Konfiguration
- **package.json**: Projekt-Name wird gesetzt
- **.env.local**: Business Model Konfiguration
- **DATABASE_URL**: Docker-Pooler-Connection
- **Feature Flags**: Automatisch basierend auf Business Model

### 3. Swiss Optimization
- **Currency**: CHF (Rappen-basierte Berechnungen)
- **Language**: German (de-CH)
- **Payments**: Kreditkarte + TWINT
- **Tax**: 7.7% MwSt automatisch eingerechnet
- **Locale**: Schweizer Datum/Zahlen-Formatierung

---

## 💻 Development Workflow

### Template-Entwicklung (Starter-Kit-Verbesserung)
```bash
# Direkt im Template entwickeln
cd template/
pnpm install && pnpm run dev

# → Keine Sync-Komplexität 
# → Direkte Entwicklung in Production-Template
# → Alle künftigen Projekte profitieren automatisch
```

### Kundenprojekt-Entwicklung
```bash
# 1. Projekt erstellen
./create-project.sh kunde-crm saas

# 2. Development starten
cd clients/kunde-crm
pnpm install && pnpm run dev

# → Vollständige Isolation von Template
# → Normale Projekt-Entwicklung
```

---

## ✅ Template-Features

### Vollständige Authentication
- **Supabase Auth**: Email/Password + Social Login
- **User Management**: Profile, Sessions, Security
- **Protected Routes**: Dashboard, Admin-Bereiche
- **Role-Based Access**: User/Admin-Rollen

### Stripe Integration (CHF-optimiert)
- **Subscriptions**: Create, Cancel, Resume, Update
- **Payment Processing**: CHF-optimierte Preise
- **Webhook Handling**: Vollständige Stripe-Event-Verarbeitung
- **TWINT Support**: Swiss Payment Method

### UI/UX Swiss Standard
- **Radix UI**: Accessible components
- **Tailwind CSS**: Swiss-optimierte Farben/Spacing
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Vollständige Theme-Unterstützung

### Business Logic
- **Dashboard**: User-spezifische Übersichten
- **Subscription Management**: Self-service für Users
- **Admin Interface**: Management-Tools
- **Swiss Compliance**: MwSt, Datenschutz, Locale

---

## 🎨 Customization Guide

### Branding anpassen
```typescript
// tailwind.config.ts
colors: {
  primary: {
    50: '#f0f9ff',   // Brand-Farben anpassen
    500: '#3b82f6',
    900: '#1e3a8a'
  }
}
```

### Business-spezifische Features
```typescript
// lib/features.ts
export const features = {
  subscriptions: process.env.ENABLE_SUBSCRIPTIONS === 'true',
  shop: process.env.ENABLE_SHOP === 'true', 
  bookings: process.env.ENABLE_BOOKINGS === 'true'
}
```

### Stripe Konfiguration
```env
# Swiss CHF Pricing
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...

# CHF Price IDs (Stripe Dashboard)
STRIPE_PRICE_STARTER=price_...
STRIPE_PRICE_PRO=price_...
```

---

## 📋 Next Steps

### Nach Template-Generierung
```bash
cd clients/projekt-name

# 1. Dependencies installieren
pnpm install

# 2. Database setup
pnpm run db:setup

# 3. Development starten
pnpm run dev

# ✅ Ready: http://localhost:3000
```

### Production Deployment
1. **Environment**: Production `.env` konfigurieren
2. **Database**: Supabase Cloud oder eigene PostgreSQL
3. **Payments**: Stripe Live Keys konfigurieren
4. **Domain**: Custom Domain + SSL
5. **Monitoring**: Error tracking + Analytics

---

## 🛠️ Template-Maintenance

### Template-Updates
```bash
# Template verbessern
cd template/
# → Entwicklung hier

# Neue Projekte profitieren automatisch
./create-project.sh neues-projekt saas
# → Verwendet aktuellste Template-Version
```

### Bestehende Projekte aktualisieren
```bash
# Manuelle Updates in Client-Projekten
cd clients/bestehendes-projekt
# → Selective Updates von spezifischen Features
# → Keine automatische Sync (vermeidet Konflikte)
```

---

## 🎉 Vorteile der Single-Template-Architektur

### ✅ Developer Experience
- **Keine Sync-Komplexität**: Direkte Entwicklung im Template
- **Klare Struktur**: Ein Template, eine Quelle der Wahrheit
- **Einfache Wartung**: Updates nur an einer Stelle
- **Schnelle Projekte**: 15 Minuten bis produktive App

### ✅ Production Benefits
- **Vollständig getestet**: Alle Features in einem Template
- **Swiss-optimiert**: CHF, TWINT, de-CH, MwSt
- **Modern Stack**: Next.js 15, React 19, TypeScript
- **Security-First**: Supabase Auth + RLS + TypeScript

### ✅ Business Value
- **Schneller Time-to-Market**: Sofort produktionsfähig
- **Konsistente Qualität**: Bewährte Patterns und Practices
- **Skalierbare Architektur**: Enterprise-ready von Tag 1
- **Swiss Compliance**: Automatisch rechtssicher

---

**Template Status**: Production-Ready ✅ | Universal Business Model Support 🎯  
**Nächste Schritte**: [Integration Setup](04-integrations.md) | [Development Guide](05-development.md)  
**Version**: NextJS Starter Kit v3.0 - Simplified Edition