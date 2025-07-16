# 🇨🇭 Supabase Setup - Swiss NextJS Starter Kit

**Automatisches, selbst-gehostetes Supabase-System für Schweizer Entwickler**

## 🎯 Überblick

Dieses Starter Kit verwendet ein **vollständig automatisiertes Supabase-Setup** mit Docker-Compose. Keine manuelle Konfiguration, keine Cloud-Abhängigkeiten - alles läuft lokal und produktionsreif.

### ✅ Was funktioniert automatisch:
- **Database Setup**: 22 Tabellen (6 Business + 16 Auth) werden automatisch erstellt
- **Auth System**: Email-Registrierung mit Auto-Bestätigung
- **Business Schema**: SaaS, E-Commerce und Booking-ready
- **Swiss-Only**: CHF, de-CH, TWINT optimiert
- **JWT-Keys**: Synchronisiert zwischen Infrastructure und Templates

---

## 🚀 Schnellstart

### 1. Infrastructure starten
```bash
cd infrastructure
docker compose up -d
```

### 2. Projekt erstellen
```bash
./create-project.sh mein-projekt saas
cd ../clients/mein-projekt
pnpm install
pnpm run dev
```

### 3. Testen
- **App**: http://localhost:3000
- **Studio**: http://localhost:55323
- **Account erstellen**: http://localhost:3000/auth/register

---

## 🏗️ System-Architektur

### Container-Stack
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   NextJS App    │    │  Supabase       │    │   PostgreSQL    │
│   localhost:3000│◄──►│  localhost:55321│◄──►│  localhost:55322│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └─────────────►│ Supabase Studio │◄─────────────┘
                        │ localhost:55323 │
                        └─────────────────┘
```

### Port-Matrix
| Service | Port | URL | Zweck |
|---------|------|-----|-------|
| **NextJS App** | 3000 | http://localhost:3000 | Hauptanwendung |
| **Supabase API** | 55321 | http://localhost:55321 | REST API Gateway |
| **PostgreSQL** | 55322 | localhost:55322 | Direkte DB-Verbindung |
| **Supabase Studio** | 55323 | http://localhost:55323 | Database Management |

---

## 📋 Database Schema

### Business-Tabellen (6 Stück)
```sql
public.profiles        -- User-Profile (erweitert auth.users)
public.subscriptions   -- SaaS-Abonnements (Stripe-Integration)
public.products        -- E-Commerce-Produkte (CHF-Preise)
public.orders          -- Bestellungen (Swiss-optimiert)
public.order_items     -- Bestellpositionen
public.appointments    -- Terminbuchungen (Europe/Zurich)
```

### Auth-Tabellen (16 Stück)
```sql
auth.users            -- Benutzer-Accounts
auth.sessions         -- Login-Sessions
auth.refresh_tokens   -- JWT-Refresh-Tokens
auth.identities       -- OAuth-Identitäten
... (12 weitere Supabase-System-Tabellen)
```

### Swiss-Only Optimierungen
- **Währung**: CHF (Rappen-basiert)
- **Zeitzone**: Europe/Zurich
- **Locale**: de-CH (Schweizer Deutsch)
- **Zahlungen**: Kreditkarten + TWINT
- **Geschäftszeiten**: 09:00-18:00 (Mon-Fri)

---

## 🔧 Entwicklung

### Projekt-Struktur
```
nextjs-starter/
├── infrastructure/           # Supabase-Infrastructure
│   ├── docker-compose.yml   # Container-Orchestrierung
│   ├── .env                 # Infrastructure-Konfiguration
│   ├── volumes/db/          # Database-Initialisierung
│   │   ├── business-schema.sql  # Business-Tabellen
│   │   ├── realtime.sql         # Supabase-Realtime
│   │   └── ... (System-Dateien)
│   └── scripts/             # Client-Utilities
├── templates/               # Projekt-Templates
│   ├── nextjs-core/         # Basis-Template
│   ├── nextjs-saas-template/    # SaaS-spezifisch
│   ├── nextjs-shop-template/    # E-Commerce-spezifisch
│   └── nextjs-booking-template/ # Booking-spezifisch
└── clients/                 # Generierte Projekte
    └── mein-projekt/        # Dein Projekt
```

### Template-System
```bash
# SaaS-Projekt (Subscriptions)
./create-project.sh kunde-portal saas

# E-Commerce-Shop
./create-project.sh online-shop shop

# Booking-System
./create-project.sh beauty-salon booking
```

### Environment-Konfiguration
Alle generierten Projekte erhalten automatisch:
- Korrekte Supabase-URLs und Keys
- Swiss-Only Business-Konfiguration
- Database-Verbindung (Pooler)
- Stripe-Integration (Test-Keys)

---

## 🔍 Troubleshooting

### Infrastructure-Probleme

**Container starten nicht:**
```bash
cd infrastructure
docker compose down -v
docker compose up -d
```

**Database-Reset (Datenverlust!):**
```bash
docker compose down
sudo rm -rf volumes/db/data/*
docker compose up -d
```

**Port-Konflikte:**
```bash
# Prüfe welche Ports belegt sind
netstat -tulpn | grep :55321
netstat -tulpn | grep :55322
netstat -tulpn | grep :55323
```

### Auth-Probleme

**"Invalid authentication credentials":**
- JWT-Keys zwischen Infrastructure und Client stimmen nicht überein
- Lösung: Projekt neu generieren mit `./create-project.sh`

**User kann sich nicht registrieren:**
- Prüfe Supabase Studio → Authentication → Settings
- `ENABLE_EMAIL_AUTOCONFIRM` sollte `true` sein

**Hydration-Fehler:**
- Theme-Toggle-Problem in NextJS 15
- Lösung: Template wurde bereits gefixt

### Performance-Probleme

**Langsame Database-Queries:**
```bash
# Prüfe Container-Performance
docker stats
```

**Supabase Studio langsam:**
```bash
# Restart Studio-Container
docker compose restart studio
```

---

## 🛠️ Erweiterte Konfiguration

### Custom Business-Schema
Business-Tabellen können in `infrastructure/volumes/db/business-schema.sql` angepasst werden.

**Nach Änderungen:**
```bash
docker compose down
sudo rm -rf volumes/db/data/*
docker compose up -d
```

### Produktions-Setup
1. **Secrets ändern** in `infrastructure/.env`
2. **Domain konfigurieren** in `SITE_URL`
3. **SMTP-Server** für E-Mail-Versand
4. **Stripe-Keys** für Zahlungen
5. **Backup-Strategie** für PostgreSQL

### Monitoring
- **Logs**: `docker compose logs -f`
- **Database**: Supabase Studio → SQL Editor
- **Performance**: Docker Stats + PostgreSQL-Monitoring

---

## 📈 Nächste Schritte

### Nach dem Setup:
1. **Test-User erstellen** → http://localhost:3000/auth/register
2. **Supabase Studio erkunden** → http://localhost:55323
3. **Stripe-Integration testen** → Test-Keys konfigurieren
4. **Business-Logic entwickeln** → TypeScript + Supabase Client

### Produktions-Deployment:
1. **Infrastructure-Secrets** anpassen
2. **Domain & SSL** konfigurieren
3. **Backup-System** implementieren
4. **Monitoring** einrichten

---

## 🎯 Support

### Dokumentation
- **Supabase Docs**: https://supabase.com/docs
- **NextJS Docs**: https://nextjs.org/docs
- **Stripe Docs**: https://stripe.com/docs

### System-Status prüfen
```bash
# Alle Container-Status
docker compose ps

# Logs von spezifischem Service
docker compose logs auth
docker compose logs db

# Database-Verbindung testen
docker exec supabase-db psql -U postgres -d postgres -c "SELECT NOW();"
```

### Häufige Befehle
```bash
# Infrastructure neu starten
docker compose restart

# Database-Tabellen anzeigen
docker exec supabase-db psql -U postgres -d postgres -c "\dt"

# Neues Projekt erstellen
./create-project.sh projekt-name saas

# Template-Keys synchronisieren (bei Problemen)
rm -rf ../clients/projekt-name
./create-project.sh projekt-name saas
```

---

**Status**: Production-Ready ✅  
**Letzte Aktualisierung**: 2025-07-16  
**Version**: Swiss NextJS Starter Kit v2.0