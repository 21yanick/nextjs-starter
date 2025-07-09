# 🚀 NextJS SaaS Starter Kit - Self-Hosted Edition

Ein production-ready Starter Kit für moderne SaaS-Anwendungen. 100% self-hosted, keine Cloud-Abhängigkeiten, volle Kontrolle über deine Daten.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Self--Hosted-green?style=flat-square&logo=supabase)
![Docker](https://img.shields.io/badge/Docker-Ready-blue?style=flat-square&logo=docker)

## ✨ Features

### Core Features
- **🔐 Authentifizierung** - Self-hosted Supabase Auth (Email/Password, Magic Links, OAuth)
- **💳 Zahlungen** - Stripe Subscriptions fertig integriert
- **📧 E-Mails** - Transactional Emails mit Resend + React Email
- **🗄️ Datenbank** - PostgreSQL self-hosted via Supabase
- **🎨 UI Components** - Tailwind CSS + shadcn/ui vorbereitet
- **📊 Error Tracking** - Sentry Integration vorbereitet
- **🔒 Security** - CSP Headers, CSRF Protection, Environment Validation
- **📊 Logging** - Strukturiertes Logging mit Pino

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
# Development Server starten
pnpm run dev

# Besuche:
# - App: http://localhost:3000
# - Supabase Studio: http://localhost:55323
```

## 📦 Verfügbare Scripts

```bash
# Development
pnpm run dev              # Development Server starten
pnpm run build            # Production Build
pnpm run start            # Production Server starten

# Code Quality
pnpm run lint             # ESLint ausführen
pnpm run format           # Code formatieren mit Prettier
pnpm run type-check       # TypeScript prüfen

# Database
pnpm run db:setup         # Datenbank initialisieren
pnpm run db:migrate       # Migrations ausführen
pnpm run db:seed          # Test-Daten laden

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
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth-geschützte Routen
│   │   └── dashboard/     
│   ├── (marketing)/       # Öffentliche Seiten
│   └── api/              
├── components/           
├── lib/                   # Core Utilities
│   ├── supabase/         # DB Clients
│   ├── stripe/           # Payment Logic
│   └── email/            # Email Templates
├── supabase/             # Supabase Config
│   ├── migrations/       # SQL Migrations
│   └── seed.sql          # Demo Daten
├── docker-compose.yml    # Lokales Supabase
└── Dockerfile           # Production Build
```

## 🐳 Docker Services

Das `docker-compose.yml` startet folgende Services:

- **nextjs-starter-db** - PostgreSQL Database
- **nextjs-starter-auth** - Supabase Auth Service
- **nextjs-starter-rest** - Supabase REST API
- **nextjs-starter-storage** - File Storage
- **nextjs-starter-studio** - Web Dashboard
- **nextjs-starter-kong** - API Gateway

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

### Supabase startet nicht

```bash
# Logs prüfen
pnpm run docker:logs

# Ports prüfen
netstat -tulpn | grep 55321

# Clean restart
pnpm run docker:down
pnpm run docker:up
```

### Port-Konflikte

Falls Ports bereits belegt sind:
1. Ports in `docker-compose.yml` ändern
2. Ports in `.env.local` aktualisieren
3. Container neu starten

### Database Connection Issues

```bash
# Direct DB connection testen
docker exec -it nextjs-starter-db psql -U postgres

# Connection URL für Debugging
postgresql://postgres:your-password@localhost:55322/postgres
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