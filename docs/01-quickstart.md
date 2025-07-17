# 🚀 Quick Start Guide

**Von null zur Swiss Web-App in 15 Minuten**

---

## ✅ Prerequisites

```bash
docker --version && node --version && git --version
```

**Required:** Docker Desktop (running) • Node.js 18+ • 4GB RAM • Ports 3000, 55321-55323 free

---

## 🏗️ Setup (3 Steps)

### Kundenprojekt-Entwicklung
### 1. Infrastructure (2 min)
```bash
git clone [repo-url] nextjs-starter
cd nextjs-starter/infrastructure
docker compose up -d
```

### 2. Project (1 min)
```bash
cd ..
./create-project.sh mein-projekt saas
```

### 3. Run (2 min)
```bash
cd clients/mein-projekt
pnpm install && pnpm run db:setup && pnpm run dev
```

**✅ Ready:** [App](http://localhost:3000) | [Database](http://localhost:55323)

---

## 🛠️ Template-Entwicklung (Starter-Kit-Verbesserung)

### 1. Infrastructure (2 min)
```bash
git clone [repo-url] nextjs-starter
cd nextjs-starter/infrastructure
docker compose up -d
```

### 2. Development-Template (1 min)
```bash
cd ..
scripts/template-manager.sh create-dev
```

### 3. Template-Development (2 min)
```bash
cd templates/nextjs-saas-dev/
pnpm install && pnpm run db:setup && pnpm run dev
```

**✅ Ready:** [App](http://localhost:3000) | [Database](http://localhost:55323)

---

## 🎯 Template Selection

| Template | Status | Empfehlung |
|----------|--------|------------|
| **🟢 SaaS** | 90% ✅ | **Production Ready** |
| **🟡 Shop** | 45% 🚧 | Development Only |
| **🔴 Booking** | 25% 🔴 | Concept Only |

**⚠️ Wichtig:** Nur SaaS Template für produktive Projekte verwenden!

```bash
# Empfohlen für Production
./create-project.sh kunde-portal saas

# Nur für Entwicklung
./create-project.sh test-shop shop
./create-project.sh test-booking booking
```

---

## 🔍 Verify Setup

### Quick Test
- [ ] [http://localhost:3000](http://localhost:3000) → App lädt
- [ ] [http://localhost:55323](http://localhost:55323) → Database Studio
- [ ] Sign Up → Test account erstellen
- [ ] Dashboard → Login funktioniert

### Test Account
```
Email: test@example.com
Password: password123
```

---

## 📚 Next Steps

**Verstehe das System:**
- [System Architecture](02-system.md) - Wie alles funktioniert
- [Template Details](03-templates.md) - Business Model Features + Template-Development

**Start Development:**
- [Development Workflow](05-development.md) - Daily commands + Template-Development
- [Service Integrations](04-integrations.md) - Stripe, Email setup

**Customize for Client:**
- [Customization Guide](06-customization.md) - Branding & Production

**Template-Development:**
- [Template Management](03-templates.md#template-management) - Scripts und Workflow
- [Development Templates](05-development.md#template-development) - Dual-Purpose-Architektur

---

## 🐛 Troubleshooting

| Problem | Lösung |
|---------|--------|
| Port 3000 belegt | `lsof -i :3000` → Process killen |
| Docker läuft nicht | Docker Desktop starten |
| Services starten nicht | `docker compose restart` |
| Build Fehler | `rm -rf .next && npm run dev` |
| Template funktioniert nicht | SaaS Template verwenden |

### Emergency Reset
```bash
docker compose down
rm -rf node_modules .next
npm install && npm run db:setup && npm run dev
```

---

## 💡 Quick Tips

### Daily Commands
```bash
npm run dev          # Development server
npm run format       # Code formatting  
npm run type-check   # TypeScript validation
```

### Production Ready?
```bash
# SaaS Template: ✅ Sofort einsatzbereit
# Shop Template: 🚧 Viele Features fehlen noch
# Booking Template: 🔴 Proof-of-concept nur
```

### Swiss Features
- 🇨🇭 CHF currency support
- 🔄 TWINT payments
- 🗣️ German localization
- 📊 Swiss business compliance

---

**Setup Zeit:** ~15 Minuten | **Production Ready:** SaaS Template only ⚡  
**Tech Stack:** Next.js 15 + React 19 + TypeScript + Supabase + Docker 🚀