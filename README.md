# NextJS Starter Kit

**Production-Ready NextJS Template mit Authentication, Payments und Datenbank**

Self-hosted Stack mit Supabase, Stripe Integration und modernem Development Setup.

## 🚀 Schnellstart

```bash
# 1. Infrastructure starten
cd infrastructure && docker compose up -d

# 2. Development starten  
cd ../template
pnpm install && pnpm run dev
```

**Bereit:** [App](http://localhost:3000) | [Datenbank](http://localhost:55323)

## 🛠️ Tech Stack

**Frontend:** Next.js 15 • React 19 • TypeScript • Tailwind CSS  
**Backend:** Supabase (self-hosted) • PostgreSQL • Docker  
**Payments:** Stripe Integration  
**Components:** Radix UI • shadcn/ui

## ✨ Features

### Vollständige Authentication
- Email/Passwort Registrierung und Login
- Geschützte Routen und Middleware
- Benutzerprofile und Session-Management
- Passwort zurücksetzen Flow

### Payment Integration
- Stripe Checkout und Subscriptions
- Webhook Handling für Payment Events
- Subscription Management Dashboard
- Rechnungen und Billing History

### Moderne Entwicklung
- Server-first Architektur mit Client Islands
- TypeScript Validierung mit Zod Schemas
- Dark/Light Theme mit persistentem State
- Responsive Design mit Tailwind CSS

### Self-Hosted Infrastructure
- PostgreSQL Datenbank mit Migrations
- Supabase Authentication und API
- Docker Compose Development Stack
- Database Management Interface

## 📁 Projekt-Struktur

```
template/                # Haupt-Development Template
├── app/                # Next.js 15 App Router
├── components/         # React Components
├── lib/               # Utilities und Integrationen
└── .env.local         # Environment Konfiguration

infrastructure/         # Docker Compose Stack
├── docker-compose.yml # Service Definitionen
├── volumes/           # Database Initialisierung
└── .env.local        # Infrastructure Konfiguration
```

## 🔧 Konfiguration

Das Template kommt vorkonfiguriert mit:
- **Währung:** CHF (einfach änderbar in `lib/config.ts`)
- **Sprache:** Deutsch (de-CH) mit Schweizer Formatierung
- **Payments:** Stripe mit Karte und TWINT Support
- **Zeitzone:** Europe/Zurich

`lib/config.ts` anpassen für Ihre Region:

```typescript
export const siteConfig = {
  name: "Ihr App Name",
  currency: "EUR" as const,
  locale: "de-DE" as const,
  pricing: {
    starter: 9.99,
    pro: 19.99
  }
}
```

## 🧪 Development

### Tägliche Commands
```bash
pnpm run dev          # Development Server
pnpm run build        # Production Build  
pnpm run lint         # Code Linting
pnpm run type-check   # TypeScript Validierung
```

### Infrastructure Management
```bash
cd infrastructure/
docker compose up -d      # Services starten
docker compose down       # Services stoppen  
docker compose ps         # Service Status
```

### Datenbank
- **Management:** [Supabase Studio](http://localhost:55323)
- **Direkter Zugriff:** `docker exec -it supabase-db psql -U postgres`
- **Migrations:** SQL Dateien in `infrastructure/volumes/db/`

## 📚 Dokumentation

- **[Schnellstart](docs/01-quickstart.md)** - Komplette Setup Anleitung
- **[Development](docs/05-development.md)** - Development Workflow
- **[Infrastructure](infrastructure/README.md)** - Docker Setup Details

## 🔑 Environment Setup

### Template Konfiguration
```env
# Datenbank
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PRO_PRICE_ID=price_...

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Infrastructure Konfiguration
```env
# Secrets (für Production ändern)
POSTGRES_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret-32-chars-min
ANON_KEY=your_anon_key
SERVICE_ROLE_KEY=your_service_role_key

# Ports
KONG_HTTP_PORT=55321
STUDIO_PORT=55323
```

## 🚀 Production Deployment

1. **Environment:** Production `.env.local` konfigurieren
2. **Datenbank:** Managed PostgreSQL oder Self-hosting
3. **Payments:** Stripe Live Keys und Webhooks konfigurieren
4. **Domain:** Custom Domain mit SSL einrichten
5. **Monitoring:** Error Tracking und Analytics konfigurieren

---

**Status:** Production Ready ✅  
**Lizenz:** MIT  
**Node.js:** 18+ erforderlich