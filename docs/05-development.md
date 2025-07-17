# 💻 Development Workflow

**Essential commands für tägliche Entwicklung mit Next.js 15 + Turbopack**

---

## 🚀 Quick Start

### Template-Entwicklung (Starter-Kit-Verbesserung)
```bash
# 1. Infrastructure starten
cd infrastructure && docker compose up -d

# 2. Development-Template wählen und setup
cd ../templates/nextjs-saas-dev
pnpm install && pnpm run db:setup

# 3. Development starten  
pnpm run dev
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

## 🛠️ Template-Development

### Template-Manager Commands
```bash
# Status anzeigen
scripts/template-manager.sh status

# Development-Templates erstellen
scripts/template-manager.sh create-dev

# Nach Entwicklung: Sync zurück zu Production
scripts/template-manager.sh sync saas

# Alle Templates validieren
scripts/template-manager.sh validate
```

### Template-Development-Workflow
```bash
# 1. Development-Template erstellen (einmalig)
scripts/template-manager.sh create-dev

# 2. Daily Development
cd templates/nextjs-saas-dev/
pnpm install && pnpm run dev
# → Entwickle Core-Changes (UI, Auth) + SaaS-Changes (Stripe, API)

# 3. Intelligente Synchronisation
scripts/template-manager.sh sync saas
# → Core-Changes automatisch zu nextjs-core/
# → SaaS-Changes automatisch zu nextjs-saas-template/
# → Alle Dev-Templates werden regeneriert
```

### Template-Intelligence
- **Core-Detection**: `components/ui/`, `lib/supabase/`, `components/auth/` → Shared
- **SaaS-Detection**: `lib/stripe/`, `app/api/checkout/`, SaaS-components → Business-specific
- **Auto-Sync**: Script erkennt automatisch Ziel-Template
- **Complete-Regeneration**: Alle Templates bleiben konsistent

### Template-Struktur
```bash
templates/
├── nextjs-core/              # Shared (UI, Auth, Layout)
├── nextjs-saas-template/     # SaaS-specific (Stripe, API)
├── nextjs-saas-dev/          # Development (Core + SaaS merged)
├── nextjs-shop-dev/          # Development (Core + Shop merged)
└── nextjs-booking-dev/       # Development (Core + Booking merged)
```

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

### Commit Process
```bash
git add .
git commit -m "feat: add feature"  # Conventional commits
# → Auto-triggers: format + lint + type-check
```

### Branch Development
```bash
git checkout -b feature/new-feature
# ... development
npm run format && npm run lint && npm run type-check
git commit -m "feat: implement new feature"
```

---

## ⚡ Performance Tips

### Development Speed
- **Turbopack**: Enabled by default (`--turbopack`)
- **Incremental TypeScript**: Faster type checking
- **Docker**: Keep services running between sessions

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

**Development Status**: Next.js 15 + Turbopack ⚡  
**Quality Tools**: ESLint + Prettier + TypeScript + Husky ✅  
**Infrastructure**: Docker + Supabase + Swiss-optimized 🇨🇭