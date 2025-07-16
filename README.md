# 🇨🇭 Swiss NextJS Starter Kit

**Sauberes, wartungsarmes Template-System für Schweizer Soloentwickler**

## 🚀 Quick Start

```bash
# 1. Infrastructure starten
cd infrastructure
docker-compose up -d

# 2. Projekt erstellen
./create-project.sh mein-projekt saas

# 3. Projekt starten
cd clients/mein-projekt
npm install
npm run dev
```

## 📁 Clean Architecture

```
nextjs-starter/
├── infrastructure/          # Docker-Services (Supabase, DB)
│   ├── docker-compose.yml   # Alle Services
│   ├── .env.example         # Infrastructure-Config
│   └── scripts/             # DB-Setup
├── templates/               # Template-Sammlung
│   └── nextjs-core/         # Basis-Template
├── clients/                 # Generierte Projekte
└── docs/                    # Dokumentation
```

## 🏗️ Business Models

- **SaaS**: Subscription-basiert mit Stripe
- **Shop**: E-Commerce mit Produkten
- **Booking**: Terminbuchungen
- **Universal**: Alle Features kombiniert

## 🇨🇭 Swiss-Only Features

- **Währung**: CHF (Rappen-basiert)
- **Sprache**: Deutsch (de-CH)
- **Payments**: Kreditkarten + TWINT
- **Steuern**: 7.7% MwSt.
- **Locale**: Schweizer Formatierung

## 🔧 Configuration

### Infrastructure (.env.local)
```env
# Copy from infrastructure/.env.example
POSTGRES_PASSWORD=your-secret
KONG_HTTP_PORT=55321
STUDIO_PORT=55323
```

### Project (.env.local)
```env
# Copy from templates/nextjs-core/.env.example
BUSINESS_MODEL=saas
ENABLE_SUBSCRIPTIONS=true
STRIPE_SECRET_KEY=sk_test_xxx
```

## 📊 Port Matrix

- **55321**: Supabase API (Kong Gateway)
- **55322**: Database (PostgreSQL with Pooler)
- **55323**: Supabase Studio
- **3000**: NextJS Application

## 🛠️ Development

```bash
# Infrastructure Services
docker-compose logs -f        # Logs anzeigen
docker-compose down           # Services stoppen

# Projekt-Entwicklung
npm run dev                   # Development server
npm run build                 # Production build
npm run test                  # Tests ausführen
```

## 📚 Documentation

- **Setup**: `docs/setup/` - Installations-Guides
- **Architecture**: `docs/architecture/` - System-Design
- **Templates**: `docs/templates/` - Template-Guides

## 🎯 Migration von Legacy

Falls Sie eine alte Version haben:

```bash
# Alte .env-Dateien entfernen
rm .env.local .env.example

# Neue Struktur verwenden
cp templates/nextjs-core/.env.example .env.local
cp infrastructure/.env.example infrastructure/.env.local

# Infrastructure starten
cd infrastructure && docker-compose up -d
```

## 🔍 Troubleshooting

**Port-Konflikte**:
```bash
# Prüfen welche Ports verwendet werden
lsof -i :55321
lsof -i :55322
lsof -i :55323
```

**Database-Probleme**:
```bash
# Database Reset
docker-compose down
docker volume rm nextjs-starter_db-data
docker-compose up -d
```

## 🤝 Support

- **Issues**: Erstellen Sie ein Issue für Bugs
- **Docs**: Vollständige Dokumentation in `docs/`
- **Examples**: Beispiel-Projekte in `clients/`

---

**Status**: Clean Architecture | Swiss-Only | Production-Ready  
**Letzte Aktualisierung**: 2025-07-16