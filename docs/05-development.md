# 💻 Development Workflow

**Simplified development für Next.js 15 + Turbopack mit Single-Template-Architektur**

---

## 🚀 Quick Start

### Template-Entwicklung (Starter-Kit-Verbesserung)
```bash
# 1. Infrastructure starten
cd infrastructure && docker compose up -d

# 2. Template-Entwicklung starten
cd ../template/
pnpm install && pnpm run db:setup && pnpm run dev
```

### Kundenprojekt-Entwicklung
```bash
# 1. Infrastructure starten
cd infrastructure && docker compose up -d

# 2. Kundenprojekt erstellen
./create-project.sh mein-kunde saas
cd clients/mein-kunde

# 3. Development starten
pnpm install && pnpm run db:setup && pnpm run dev
```

**URLs**: [App](http://localhost:3000) | [Database](http://localhost:55323)

---

## 📅 Daily Commands

### Core Development
```bash
npm run dev          # Next.js 15 + Turbopack
npm run format       # Prettier formatting
npm run lint         # ESLint validation  
npm run type-check   # TypeScript validation
```

### Quality Cycle
```bash
npm run format && npm run lint && npm run type-check
```

### Database Development
```bash
npm run db:setup     # Complete setup (first time)
npm run db:migrate   # Schema changes
npm run db:seed      # Test data
```

---

## 🛠️ Simplified Development Architecture

### Single-Template-Entwicklung
**Keine komplexen Sync-Mechanismen mehr!**

```bash
# Template-Verbesserung (Starter-Kit-Development)
cd template/
pnpm install && pnpm run dev
# → Direkte Entwicklung im Production-Template
# → Alle künftigen Projekte profitieren automatisch
# → Keine Sync-Scripts oder Merge-Konflikte
```

### Workflow-Vorteile
- ✅ **Direkte Entwicklung**: Template-Verbesserungen direkt im `template/` Directory
- ✅ **Sofortige Verfügbarkeit**: Neue Features automatisch in allen künftigen Projekten
- ✅ **Keine Sync-Komplexität**: Keine template-manager Scripts oder merge conflicts
- ✅ **Ein Source of Truth**: Template ist gleichzeitig Development- und Production-Version

### Template vs Client Project Development

| **Template Development** | **Client Project Development** |
|--------------------------|--------------------------------|
| `cd template/` | `cd clients/projekt-name/` |
| Verbesserung des Starter Kits | Kundenspezifische Entwicklung |
| Alle künftigen Projekte profitieren | Isolierte Projekt-Entwicklung |
| Generische Features | Business-spezifische Features |

---

## 🛠️ Build Commands

```bash
npm run build        # Production build
npm start           # Production server test
npm run type-check  # Pre-build validation
```

---

## 🐳 Infrastructure

### Docker Management
```bash
cd infrastructure/
docker compose up -d    # Start services
docker compose down     # Stop services
docker compose ps       # Service status
docker compose logs -f  # All logs
```

### Service Health
```bash
curl http://localhost:55321/health    # API health
curl http://localhost:55323           # Studio access
```

---

## 🗄️ Database Workflow

### Setup (First Time)
```bash
npm run db:setup
# → Starts Docker
# → Creates .env.local  
# → Runs migrations
# → Adds test data
```

### Daily Database Development
```bash
npm run db:migrate   # Apply schema changes
npm run db:seed      # Fresh test data
```

### Direct Database Access
```bash
docker exec -it supabase-db psql -U postgres -d postgres
```

---

## 🎯 Business Model Development

### Environment-Based Features
Template unterstützt alle Business Models durch Feature Flags:

```bash
# SaaS Development
cd template/
echo "BUSINESS_MODEL=saas" >> .env.local
echo "ENABLE_SUBSCRIPTIONS=true" >> .env.local
pnpm run dev

# E-Commerce Development  
echo "BUSINESS_MODEL=shop" >> .env.local
echo "ENABLE_SHOP=true" >> .env.local
pnpm run dev

# Booking Development
echo "BUSINESS_MODEL=booking" >> .env.local
echo "ENABLE_BOOKINGS=true" >> .env.local
pnpm run dev
```

### Feature-Flag-basierte Entwicklung
```typescript
// In Template-Code
import { features } from '@/lib/features'

// Conditional rendering basierend auf Business Model
{features.subscriptions && <SubscriptionButton />}
{features.shop && <ShoppingCart />}
{features.bookings && <BookingCalendar />}
```

---

## 🐛 Debugging

### Common Fixes
```bash
# Build issues
rm -rf .next && npm run dev

# Dependencies  
rm -rf node_modules && npm install

# Docker reset
docker compose down && docker compose up -d

# Port conflicts
sudo kill -9 $(lsof -ti:3000)
```

### Service Debugging
```bash
# Docker logs
docker compose logs supabase-db
docker compose logs supabase-auth
docker compose logs kong

# Service restart
docker compose restart service-name
```

### Environment Issues
```bash
# Check env validation
node -e "console.log(require('./lib/env.ts').env)"

# Copy env template
cp .env.example .env.local
```

---

## 🧪 Code Quality

### Automatic (Husky)
```bash
git commit  # → Triggers format + lint + commitlint
```

### Manual Validation
```bash
npm run format      # Fix formatting
npm run lint        # Check/fix linting  
npm run type-check  # TypeScript errors
```

### File Watching
- **Hot Reload**: File changes → instant browser update
- **Fast Refresh**: React state preserved on component updates
- **TypeScript**: Live error reporting in terminal

---

## 🔧 Development Environment

### VS Code Setup
```json
// .vscode/settings.json (auto-generated)
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.includePackageJsonAutoImports": "auto"
}
```

### Recommended Extensions
- **Prettier**: Code formatting
- **ESLint**: Code linting
- **TypeScript**: Language support
- **Tailwind CSS**: Class autocomplete

---

## 📦 Package Management

```bash
# Install package
npm install package-name

# Development dependency
npm install -D package-name

# Update dependencies
npm update

# Check outdated
npm outdated

# Security audit
npm audit && npm audit fix
```

---

## 🔄 Git Workflow

### Template Development
```bash
# Template improvements
cd template/
git add .
git commit -m "feat: add new feature to template"
# → Alle künftigen Projekte profitieren automatisch
```

### Client Project Development
```bash
# Client-specific changes
cd clients/kunde-projekt/
git add .
git commit -m "feat: add kunde-specific feature"
# → Isolierte Projekt-Entwicklung
```

### Branch Development
```bash
git checkout -b feature/new-feature
# ... development
npm run format && npm run lint && npm run type-check
git commit -m "feat: implement new feature"
```

---

## 🎨 Template Customization Patterns

### Neue Feature im Template hinzufügen
```bash
# 1. Feature-Development im Template
cd template/
# 2. Feature-Flag hinzufügen (optional)
echo "ENABLE_NEW_FEATURE=true" >> .env.example
# 3. Feature implementieren
# 4. Testen mit verschiedenen Business Models
# 5. Commit → Alle künftigen Projekte haben das Feature
```

### Business-Model-spezifische Features
```typescript
// lib/features.ts erweitern
export const features = {
  subscriptions: process.env.ENABLE_SUBSCRIPTIONS === 'true',
  shop: process.env.ENABLE_SHOP === 'true',
  bookings: process.env.ENABLE_BOOKINGS === 'true',
  newFeature: process.env.ENABLE_NEW_FEATURE === 'true'
}

// Conditional rendering
{features.newFeature && <NewFeatureComponent />}
```

---

## ⚡ Performance Tips

### Development Speed
- **Turbopack**: Enabled by default (`--turbopack`)
- **Incremental TypeScript**: Faster type checking
- **Docker**: Keep services running between sessions
- **Hot Reload**: Instant feedback on changes

### Build Optimization
```bash
# Analyze bundle
npm run build  # Shows build statistics

# TypeScript performance
npm run type-check  # Incremental compilation
```

---

## 🚨 Troubleshooting

| Issue | Command | Solution |
|-------|---------|-----------|
| Port 3000 taken | `lsof -i :3000` | Kill process or use different port |
| Docker not running | `docker compose ps` | Start Docker Desktop |
| Database connection | `docker compose logs supabase-db` | Check service health |
| Build fails | `rm -rf .next && npm run build` | Clear Next.js cache |
| Type errors | `npm run type-check` | Fix TypeScript issues |
| Git hooks fail | `npm run format && npm run lint` | Fix quality issues |

### Emergency Reset
```bash
# Complete reset (nuclear option)
docker compose down
rm -rf node_modules .next package-lock.json
npm install
npm run db:setup
npm run dev
```

---

## 🎯 Development Workflows

### Scenario 1: Template-Feature hinzufügen
```bash
# Neue Authentication-Feature für alle Projekte
cd template/
# → Feature entwickeln
# → Testen mit allen Business Models
# → Commit
# Resultat: Alle künftigen Projekte haben das Feature
```

### Scenario 2: Kundenprojekt-spezifische Entwicklung
```bash
# Kunde-spezifisches Dashboard
cd clients/kunde-portal/
# → Kundenspezifische Features entwickeln
# → Normale Projekt-Entwicklung
# → Template bleibt unverändert
```

### Scenario 3: Business-Model-Feature
```bash
# Neue Shop-Feature für E-Commerce
cd template/
# → Feature mit Feature-Flag entwickeln
# → In shop-spezifischen Bereichen implementieren
# → Testen mit ENABLE_SHOP=true
# Resultat: Alle Shop-Projekte profitieren
```

---

## 🏗️ Simplified Architecture Benefits

### ✅ Development Benefits
- **No Sync Complexity**: Direkte Entwicklung ohne merge conflicts
- **Immediate Availability**: Features sofort in allen künftigen Projekten
- **Single Source of Truth**: Template ist einzige Quelle der Wahrheit
- **Clear Separation**: Template vs Client Project Development

### ✅ Maintenance Benefits
- **Easy Updates**: Template-Verbesserungen an einer Stelle
- **Consistent Quality**: Alle Projekte verwenden bewährte Template-Version
- **Reduced Complexity**: Keine script-basierten Sync-Mechanismen
- **Fast Development**: Sofort produktionsfähige Projekte

---

**Development Status**: Simplified Single-Template Architecture ✅  
**Quality Tools**: ESLint + Prettier + TypeScript + Husky ⚡  
**Infrastructure**: Docker + Supabase + Swiss-optimized 🇨🇭  
**Version**: NextJS Starter Kit v3.0 - Simplified Edition