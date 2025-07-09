# 🚀 NextJS SaaS Starter Kit - Self-Hosted Edition

Ein production-ready Starter Kit für moderne SaaS-Anwendungen. 100% self-hosted, keine Cloud-Abhängigkeiten, volle Kontrolle über deine Daten.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Self--Hosted-green?style=flat-square&logo=supabase)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)

## ✨ Features

### ✅ **Implementiert (Production Ready)**
- **🔐 Komplettes Auth System** - Server Actions, Middleware-Schutz, React 19 Forms
- **🎨 Modernes UI System** - shadcn/ui Komponenten, Tailwind CSS 4, Dark Mode
- **🛡️ Security First** - CSP Headers, CSRF Protection, Environment Validation
- **📊 Strukturiertes Logging** - Pino Logger mit Error Handling
- **🗄️ Datenbank Setup** - PostgreSQL mit RLS Policies, Auto-Migration
- **🚀 Performance** - ES2022 Targets, optimierte Builds, SSR ready

### 🔄 **In Entwicklung**
- **💳 Stripe Integration** - Payment Processing und Webhooks
- **📧 Email System** - React Email Templates mit Resend
- **⚙️ Settings Pages** - User Profile Management
- **📊 Dashboard** - User Analytics und Daten

### Self-Hosted Vorteile
- **🏠 100% Datenhoheit** - Alle Daten bleiben auf deinem Server
- **💰 Keine Cloud-Kosten** - Nur deine Server-Kosten
- **🔐 DSGVO-konform** - Hosting in Deutschland möglich
- **🚫 Kein Vendor Lock-in** - Du kontrollierst alles

## 🏁 Quick Start

### Voraussetzungen
- Node.js 20+
- pnpm (empfohlen) oder npm
- Docker & Docker Compose
- Stripe Account (für Payments)
- Resend Account (für Emails)
- **KEIN Supabase Cloud Account nötig!** ✨

### 1. Repository Setup

```bash
# Dependencies installieren
pnpm install

# Environment erstellen
cp .env.example .env.local

# Lokales Supabase starten
pnpm run docker:up

# Warte ~30 Sekunden bis alle Services bereit sind
pnpm run docker:ps
```

### 2. Lokale Supabase Services

Nach `pnpm run docker:up` laufen diese Services:

- **Studio**: http://localhost:55323 (Supabase Dashboard)
- **API**: http://localhost:55321 (Public API)
- **Database**: localhost:55322 (PostgreSQL)
- **Auth**: Integriert in API
- **Storage**: Integriert in API

### 3. Environment Variables konfigurieren

Die `.env.local` Datei enthält bereits lokale Supabase-Defaults:

```env
# Supabase (Lokale Defaults - bereits konfiguriert)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Diese musst du aktualisieren:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_STARTER_PRICE_ID=price_xxx
STRIPE_PRO_PRICE_ID=price_xxx

RESEND_API_KEY=re_xxx
```

### 4. Datenbank initialisieren

```bash
# Datenbank-Schema anlegen
pnpm run db:setup

# Das führt aus:
# - Erstellt alle Tabellen
# - Setzt Row Level Security (RLS) auf
# - Erstellt Storage Buckets
```

### 5. Development starten

```bash
# Development Server starten (mit Turbopack)
pnpm run dev

# Besuche:
# - App: http://localhost:3000
# - Supabase Studio: http://localhost:55323
```

### 6. Authentication testen

1. **Registrieren**: Gehe zu http://localhost:3000/auth/register
2. **Account erstellen**: Beliebige Email/Password verwenden
3. **Auto-Bestätigung**: Development Mode bestätigt Emails automatisch
4. **Dashboard**: Zugriff auf geschütztes http://localhost:3000/dashboard

## 📦 Verfügbare Scripts

```bash
# Development
pnpm run dev              # Development Server starten (Turbopack)
pnpm run build            # Production Build
pnpm run start            # Production Server starten

# Code Quality
pnpm run lint             # ESLint ausführen
pnpm run format           # Code formatieren mit Prettier
pnpm run type-check       # TypeScript prüfen

# Database
pnpm run db:setup         # Datenbank mit Schema initialisieren
pnpm run db:migrate       # Migrations ausführen
pnpm run db:seed          # Test-Daten laden
pnpm run db:types         # TypeScript Types generieren (benötigt Supabase CLI)

# Docker
pnpm run docker:up        # Supabase Stack starten
pnpm run docker:down      # Supabase Stack stoppen
pnpm run docker:logs      # Logs anzeigen
pnpm run docker:ps        # Service-Status prüfen
```

## 🛠️ Für dein Projekt anpassen

### Wichtige Änderungen vor dem Start:

1. **Projekt-Name ändern** in `package.json`:
```json
{
  "name": "mein-saas-projekt",
  "version": "1.0.0"
}
```

2. **Docker-Container umbenennen** in `docker-compose.yml`:
```yaml
# Von: nextjs-starter-db
# Zu:  mein-projekt-db
```

3. **Ports ändern** (falls Konflikte):
```yaml
# In docker-compose.yml
ports:
  - "56321:8000"  # Statt 55321
  - "56322:5432"  # Statt 55322
  - "56323:3000"  # Statt 55323
```

4. **Environment-Variablen aktualisieren**:
```env
# In .env.local - neue Ports eintragen
NEXT_PUBLIC_SUPABASE_URL=http://localhost:56321
DATABASE_URL=postgresql://postgres:password@localhost:56322/postgres
```

5. **Sichere Passwörter setzen**:
```yaml
# In docker-compose.yml
POSTGRES_PASSWORD: dein-sicheres-passwort
GOTRUE_JWT_SECRET: dein-64-zeichen-jwt-secret
```

6. **README aktualisieren**:
- Projekt-Name
- Beschreibung
- Ports
- Spezifische Anweisungen

### Branding anpassen:

```typescript
// In lib/email/templates/welcome.tsx
GOTRUE_SMTP_SENDER_NAME: "Mein SaaS Name"

// In docker-compose.yml
DEFAULT_ORGANIZATION_NAME: "Mein Unternehmen"
DEFAULT_PROJECT_NAME: "Mein SaaS Projekt"
```

## 🏗️ Projekt-Struktur

```
├── app/                          # Next.js 15 App Router
│   ├── auth/                    # Authentication Seiten
│   │   ├── login/page.tsx       # Login Seite
│   │   ├── register/page.tsx    # Registrierung
│   │   ├── reset/page.tsx       # Passwort zurücksetzen
│   │   └── confirm/page.tsx     # Email Bestätigung
│   ├── dashboard/page.tsx       # Geschütztes Dashboard
│   ├── api/
│   │   ├── health/route.ts      # Health Check Endpoint
│   │   └── webhooks/stripe/     # Stripe Webhook Handler
│   ├── layout.tsx               # Root Layout mit Theme
│   ├── page.tsx                 # Landing Page
│   └── globals.css              # Globale Styles
├── components/                   # React Komponenten
│   ├── ui/                      # shadcn/ui Komponenten
│   │   ├── button.tsx           # Button Komponente
│   │   ├── card.tsx             # Card Komponente
│   │   └── ...                  # Weitere UI Komponenten
│   ├── auth/                    # Authentication Komponenten
│   │   ├── auth-button.tsx      # Dynamischer Auth Button
│   │   ├── sign-in-form.tsx     # Login Form
│   │   ├── sign-up-form.tsx     # Registrierung Form
│   │   └── submit-button.tsx    # Form Submit Button
│   ├── layout/                  # Layout Komponenten
│   │   ├── header.tsx           # Navigation Header
│   │   └── footer.tsx           # Site Footer
│   └── theme-provider.tsx       # Theme Context Provider
├── lib/                         # Core Utilities
│   ├── auth/
│   │   └── actions.ts           # Server Actions für Auth
│   ├── supabase/                # Database Clients
│   │   ├── client.ts            # Client-side Client
│   │   ├── server.ts            # Server-side Client
│   │   └── middleware.ts        # Middleware Client
│   ├── stripe/                  # Payment Logic
│   │   ├── config.ts            # Stripe Konfiguration
│   │   └── checkout.ts          # Checkout Logic
│   ├── email/                   # Email System
│   │   ├── client.ts            # Resend Client
│   │   └── templates/           # React Email Templates
│   ├── env.ts                   # Environment Validation
│   ├── logger.ts                # Strukturiertes Logging
│   └── utils.ts                 # Utility Functions
├── hooks/                       # Custom React Hooks
│   ├── use-user.ts              # User State Management
│   └── use-profile.ts           # Profile Management
├── middleware.ts                # Auth + Security Middleware
├── instrumentation.ts           # Logging Setup
├── docker-compose.yml           # Lokales Supabase
└── Dockerfile                   # Production Build
```

## 🐳 Docker Services

Das `docker-compose.yml` startet folgende Services mit Prefix:

- **nextjs-starter-db** - PostgreSQL Database (Port 55322)
- **nextjs-starter-auth** - Supabase GoTrue Auth Service
- **nextjs-starter-rest** - Supabase REST API
- **nextjs-starter-storage** - File Storage Service
- **nextjs-starter-studio** - Web-basiertes Database Dashboard (Port 55323)
- **nextjs-starter-kong** - API Gateway (Port 55321)

## 🛠️ Tech Stack Details

### Frontend
- **Next.js 15** - App Router mit Server Components
- **React 19** - useActionState, useFormStatus, Server Actions
- **TypeScript 5** - Vollständige Type Safety mit ES2022 Targets
- **Tailwind CSS 4** - Zero-Config Styling mit modernen CSS Features
- **shadcn/ui** - Zugängliche Komponenten mit Radix Primitives

### Backend
- **Supabase** - Self-hosted PostgreSQL mit integrierter Auth
- **Row Level Security** - Database-Level Security Policies
- **Server Actions** - Type-safe Server Mutations
- **Middleware** - Route Protection und Security Headers
- **Strukturiertes Logging** - Pino mit richtigem Error Handling

### Development
- **Turbopack** - Schnelle Development Builds
- **ESLint** - Code Quality mit Next.js Rules
- **Prettier** - Code Formatierung
- **Husky** - Git Hooks für Quality Gates
- **Docker Compose** - Lokale Development Umgebung

## 🚀 Production Deployment (Coolify)

### 1. Server vorbereiten

```bash
# Hetzner VPS mit min. 8GB RAM
# Coolify installieren
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

### 2. Supabase auf Coolify deployen

1. Neuen Service erstellen → "Supabase" Template wählen
2. Environment Variables setzen:
   - Sichere Passwörter generieren
   - JWT Secrets ändern
   - SMTP für Auth Emails konfigurieren

3. Domain zuweisen: `supabase.deine-domain.de`

### 3. NextJS App deployen

1. GitHub Repo verbinden
2. Build Pack: "Docker" 
3. Environment Variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://supabase.deine-domain.de
   NEXT_PUBLIC_SUPABASE_ANON_KEY=production-anon-key
   SUPABASE_SERVICE_ROLE_KEY=production-service-key
   # ... weitere Production ENV vars
   ```
4. Health Check: `/api/health`
5. Domain: `app.deine-domain.de`

## 🔒 Security Features

- ✅ Security Headers via Middleware
- ✅ CSRF Protection (eingebaut in Server Actions)
- ✅ Environment Variable Validation
- ✅ Sichere Session-Behandlung (httpOnly Cookies)
- ✅ Content Security Policy
- ✅ SQL Injection Schutz (parametrisierte Queries)
- ✅ XSS Schutz (React Escaping + CSP)

## 🐛 Troubleshooting

### Häufige Probleme & Lösungen

#### 1. "Failed to retrieve tables" im Supabase Studio
**Problem**: Studio kann nicht mit der Datenbank verbinden oder Tabellen fehlen  
**Lösung**: 
```bash
# Alle Services prüfen
pnpm run docker:ps

# Falls Tabellen fehlen, Migrations manuell ausführen:
pnpm run db:setup
```

#### 2. Port-Konflikte
**Problem**: Ports 55321, 55322 oder 55323 bereits belegt  
**Lösung**: 
```bash
# Konfliktierende Services stoppen
sudo lsof -ti:55321 | xargs kill -9

# Oder Ports in docker-compose.yml und .env.local ändern
```

#### 3. Authentication "User not found" Errors
**Problem**: Konsole zeigt "User not found" Fehler  
**Hinweis**: Diese Fehler sind **normal** für nicht-eingeloggte Benutzer auf öffentlichen Seiten.

#### 4. Database Connection Issues
**Problem**: Services können nicht mit Datenbank verbinden  
**Lösung**:
```bash
# Clean restart mit frischer Datenbank
pnpm run docker:down
docker volume rm nextjs-starter_nextjs-starter-db-data
pnpm run docker:up
sleep 30 && pnpm run db:setup
```

#### 5. Studio "Unhealthy" Status
**Problem**: Studio Container zeigt als unhealthy  
**Lösung**: 1-2 Minuten warten bis alle Services vollständig gestartet sind, dann Studio refreshen

### Setup-Erfolg verifizieren
```bash
# Diese Befehle sollten alle funktionieren:
curl http://localhost:55321/auth/v1/settings  # Zeigt Auth-Einstellungen
curl http://localhost:55323                   # Zeigt Studio
pnpm run docker:ps                           # Zeigt alle Container healthy
```

## 📝 Nächste Schritte

1. **Stripe Produkte** in Dashboard anlegen
2. **Email Domain** bei Resend verifizieren  
3. **Sentry Project** erstellen (optional)
4. **Erste Features** entwickeln
5. **Auf Coolify** deployen

## 🎯 Testing

```bash
# Alles testen
pnpm run type-check      # TypeScript prüfen
pnpm run lint            # Code-Qualität prüfen
pnpm run build           # Build testen
pnpm run docker:up       # Services starten
curl http://localhost:3000/api/health  # Health Check
```

## 📚 Wichtige Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Self-Hosting](https://supabase.com/docs/guides/self-hosting)
- [Coolify Documentation](https://coolify.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)

## 📄 Lizenz

MIT License - Nutze es für alles was du möchtest!

---

**Built with ❤️ for Data Sovereignty - 100% Self-Hosted SaaS**