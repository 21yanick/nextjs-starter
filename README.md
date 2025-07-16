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

## 🎨 Business Templates

### SaaS Template
**Perfect für:** CRM, Dashboards, B2B Tools
```bash
./create-project.sh kunde-portal saas
```
✅ Subscriptions • ✅ User Management • ✅ Stripe CHF

### Shop Template  
**Perfect für:** E-Commerce, Online Shops
```bash
./create-project.sh online-shop shop
```
✅ Product Catalog • ✅ Shopping Cart • ✅ TWINT

### Booking Template
**Perfect für:** Termine, Services, Reservationen
```bash
./create-project.sh beauty-salon booking
```
✅ Appointments • ✅ Calendar • ✅ Deposits

## 🏗️ Architektur

**Self-Hosted Stack:**
```
infrastructure/              # Zentrale Supabase-Infrastruktur
├── Docker Compose Stack
├── PostgreSQL Database  
└── Supabase Services

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
| **[🎨 Templates](docs/03-templates.md)** | Business Models wählen |
| **[🔗 Integrations](docs/04-integrations.md)** | Stripe, Resend, Services |
| **[💻 Development](docs/05-development.md)** | Daily Workflow |
| **[🎯 Customization](docs/06-customization.md)** | Starter → Client-Projekt |

## 🛠️ Tech Stack

**Frontend:** Next.js 15 • React 19 • TypeScript • Tailwind CSS  
**Backend:** Supabase (self-hosted) • PostgreSQL • Docker  
**Payments:** Stripe • TWINT • CHF-optimiert

---

**🇨🇭 Swiss-optimiert für professionelle Web-Entwicklung**
