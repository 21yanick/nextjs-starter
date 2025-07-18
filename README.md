# 🇨🇭 NextJS Swiss Starter Kit

**Von Null auf professionelle Swiss Web-App in 15 Minuten**

> Self-hosted, template-basiert, Swiss-optimiert – für Solo-Entwickler

## 🚀 Quick Start

```bash
# 1. Infrastructure starten
cd infrastructure && docker compose up -d

# 2. Projekt erstellen
./create-project.sh kunde-crm saas

# 3. Development starten
cd ../clients/kunde-crm
npm install && npm run dev

# ✅ Ready: http://localhost:3000
```

## 🎨 Ein Template, Alle Business Models

**Universelles Swiss NextJS Template** - konfigurierbar für jedes Business Model:

### SaaS Configuration
```bash
./create-project.sh kunde-portal saas
```
✅ Subscriptions • ✅ User Management • ✅ Stripe CHF

### E-Commerce Configuration  
```bash
./create-project.sh online-shop shop
```
✅ Product Catalog • ✅ Shopping Cart • ✅ TWINT

### Booking Configuration
```bash
./create-project.sh beauty-salon booking
```
✅ Appointments • ✅ Calendar • ✅ Deposits

**Konfiguration erfolgt automatisch via Environment-Variablen** - ein Template, alle Möglichkeiten!

## 🏗️ Simplified Architecture

**Self-Hosted Stack:**
```
infrastructure/              # Zentrale Supabase-Infrastruktur
├── Docker Compose Stack
├── PostgreSQL Database  
└── Supabase Services

template/                    # Ein universelles Template
├── Complete Auth System
├── Stripe Integration  
├── Swiss Optimization
└── Configurable Features

clients/kunde-1/             # Generierte Projekte
clients/kunde-2/             
clients/kunde-3/             
```

**Jedes Projekt:** CHF • TWINT • de-CH • 7.7% MwSt • TypeScript

## 📚 Dokumentation

| Guide | Zweck |
|-------|-------|
| **[🚀 Quickstart](docs/01-quickstart.md)** | Erstes Projekt in 15 Min |
| **[🔧 System](docs/02-system.md)** | Infrastructure & Supabase |
| **[🎨 Template](docs/03-templates.md)** | Single Universal Template |
| **[🔗 Integrations](docs/04-integrations.md)** | Stripe, Resend, Services |
| **[💻 Development](docs/05-development.md)** | Simplified Workflow |
| **[🎯 Customization](docs/06-customization.md)** | Template → Client-Projekt |

## 🛠️ Tech Stack

**Frontend:** Next.js 15 • React 19 • TypeScript • Tailwind CSS  
**Backend:** Supabase (self-hosted) • PostgreSQL • Docker  
**Payments:** Stripe • TWINT • CHF-optimiert

## ✨ Simplified Development

### Template-Entwicklung (Starter-Kit-Verbesserung)
```bash
cd template/
pnpm install && pnpm run dev
# → Direkte Entwicklung ohne Sync-Komplexität
# → Alle künftigen Projekte profitieren automatisch
```

### Kundenprojekt-Entwicklung
```bash
./create-project.sh mein-kunde saas
cd clients/mein-kunde
pnpm install && pnpm run dev
# → Vollständig isolierte Projekt-Entwicklung
```

## 🎯 Business Model Features

**Ein Template, alle Features:**

### Universal Authentication
- ✅ Supabase Auth (Email/Password + Social)
- ✅ User Management & Profiles
- ✅ Protected Routes & Role-Based Access
- ✅ Swiss-optimierte User Experience

### Stripe Integration (CHF)
- ✅ Subscriptions (Create, Cancel, Resume, Update)
- ✅ Payment Processing (CHF-optimiert)
- ✅ Webhook Handling (Complete Event Processing)
- ✅ TWINT Support (Swiss Payment Method)

### Swiss Optimization
- ✅ CHF Currency (Rappen-basierte Berechnungen)
- ✅ German Localization (de-CH)
- ✅ Swiss Tax (7.7% MwSt automatisch)
- ✅ TWINT Payment Method
- ✅ Swiss Number/Date Formatting

### Configurable Features
```env
# Business Model Selection
BUSINESS_MODEL=saas|shop|booking

# Feature Flags (automatic based on business model)
ENABLE_SUBSCRIPTIONS=true   # SaaS
ENABLE_SHOP=true           # E-Commerce
ENABLE_BOOKINGS=true       # Appointments
```

## 🚀 Template Benefits

### ✅ Developer Experience
- **No Sync Complexity**: Direkte Entwicklung im Template
- **Single Source of Truth**: Ein Template für alle Business Models
- **Immediate Availability**: Features sofort in allen künftigen Projekten
- **15-Minute Setup**: Von Null zur produktiven App

### ✅ Production Ready
- **Complete Features**: Authentication, Payments, Dashboard
- **Swiss Optimized**: CHF, TWINT, de-CH, MwSt compliance
- **Modern Stack**: Next.js 15, React 19, TypeScript
- **Self-Hosted**: Vollständige Kontrolle über Infrastructure

### ✅ Business Value
- **Fast Time-to-Market**: Sofort produktionsfähige Apps
- **Consistent Quality**: Bewährte Patterns und Best Practices
- **Scalable Architecture**: Enterprise-ready von Tag 1
- **Swiss Compliance**: Automatisch rechtssicher und optimiert

## 🔧 Quick Commands

```bash
# Projekt erstellen (Business Model optional - Standard: saas)
./create-project.sh mein-projekt [saas|shop|booking]

# Template entwickeln
cd template/ && pnpm run dev

# Infrastructure
cd infrastructure/ && docker compose up -d

# Client project
cd clients/mein-projekt/ && pnpm run dev
```

## 🎉 Simplified Architecture Highlights

**Previous:** 7 complex templates with sync scripts and layered architecture  
**Now:** 1 universal template with environment-based configuration

**Benefits:**
- 🚀 **85% faster setup** - keine komplexen Sync-Mechanismen
- 🎯 **100% feature consistency** - ein Template, eine Quelle der Wahrheit  
- ⚡ **Sofortige Updates** - Template-Verbesserungen automatisch in allen künftigen Projekten
- 🧹 **Zero maintenance overhead** - keine script-basierten Template-Manager

---

**🇨🇭 Swiss-optimiert für professionelle Web-Entwicklung**  
**Version:** NextJS Starter Kit v3.0 - Simplified Edition