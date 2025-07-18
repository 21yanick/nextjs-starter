# 🎯 Project Customization

**Template → Client transformation für professionelle Projekte**

---

## 🚀 Project Generation

```bash
# Client-Projekt erstellen
./create-project.sh kunde-name saas
cd clients/kunde-name
npm install
```

### Was passiert automatisch
- Universal template kopiert
- Environment Variables konfiguriert
- Package.json mit Client-Namen angepasst
- README.md für Client generiert
- Business Model Feature Flags gesetzt

---

## 🎨 Branding & Design

### Logo & Visual Identity
```bash
# Logo ersetzen
public/logo.svg          # Header logo
public/favicon.ico       # Browser favicon
public/apple-icon.png    # Mobile icon
```

### Brand Colors (Tailwind)
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          500: '#3b82f6',  // Main brand color
          900: '#1e3a8a',
        }
      }
    }
  }
}
```

### Component Theming
```typescript
// Update components/ui/* für Brand-spezifische Styles
// Radix UI components automatisch mit Brand colors
```

---

## ⚙️ Business Configuration

### Feature Flags anpassen
```env
# .env.local
BUSINESS_MODEL=saas
ENABLE_SUBSCRIPTIONS=true
ENABLE_SHOP=false
ENABLE_BOOKINGS=false
```

### Navigation customization
```typescript
// components/layout/header.tsx
const navigation = [
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  // Client-spezifische Navigation hinzufügen
]
```

---

## 📄 Content Customization

### Landing Page
```typescript
// app/(marketing)/page.tsx
- Hero Section: Titel, Untertitel, CTA
- Features: Client-spezifische Features
- Testimonials: Client testimonials
- Pricing: Business model pricing
```

### Marketing Pages
```bash
app/(marketing)/
├── features/page.tsx     # Feature-Liste anpassen
├── pricing/page.tsx      # Pricing-Tabelle
├── contact/page.tsx      # Kontakt-Informationen
└── legal/               # Impressum, Datenschutz
```

### Email Templates
```typescript
// lib/email/templates/
├── welcome.tsx          # Client-Branding
├── invoice.tsx          # Logo, Kontaktdaten
└── custom-template.tsx  # Client-spezifische Emails
```

---

## 🔧 Feature Extensions

### Database Schema erweitern
```sql
-- Custom tables für Client-Requirements
CREATE TABLE client_specific_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  custom_field TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### API Routes hinzufügen
```typescript
// app/api/client-feature/route.ts
export async function POST(request: Request) {
  // Client-spezifische Business Logic
}
```

### Components erweitern
```typescript
// components/client/
├── custom-dashboard.tsx
├── client-widget.tsx
└── specialized-form.tsx
```

---

## 🎯 Business Model Customization

### SaaS Configuration
```typescript
// Subscription Plans anpassen
const plans = [
  { name: 'Starter', price: 29, features: [...] },
  { name: 'Pro', price: 79, features: [...] },
  // Client-spezifische Plans
]

// Dashboard customization
// app/dashboard/page.tsx - User-spezifische Metrics
```

### Shop Configuration
```typescript
// Product Categories
const categories = ['Category1', 'Category2', 'Custom']

// Payment Methods
const paymentMethods = ['card', 'twint'] // Regional anpassen
```

### Booking Configuration
```typescript
// Services definieren
const services = [
  { name: 'Consultation', duration: 60, price: 100 },
  // Client-spezifische Services
]

// Business Hours
const businessHours = {
  monday: { open: '09:00', close: '18:00' },
  // Client-spezifische Öffnungszeiten
}
```

---

## 🌐 Production Setup

### Domain Configuration
```bash
# Vercel/Netlify deployment
NEXT_PUBLIC_APP_URL=https://client-domain.com

# Custom domain setup
# DNS: CNAME www → vercel deployment
# SSL: Automatisch via platform
```

### Environment Variables (Production)
```env
# Live API Keys
STRIPE_SECRET_KEY=sk_live_...
RESEND_API_KEY=re_live_...
NEXT_PUBLIC_SENTRY_DSN=https://...

# Client-spezifische Settings
BUSINESS_NAME="Client Company"
SUPPORT_EMAIL=support@client.com
```

### Analytics & Monitoring
```typescript
// Client-spezifische Analytics Events
trackEvent('client_conversion', { 
  plan: 'pro', 
  source: 'website' 
});
```

---

## 🔄 Maintenance & Updates

### Template Updates übernehmen
```bash
# 1. Backup Client-Customizations
git branch backup-customizations

# 2. Neue Template Version holen  
cd ../../template/
git pull origin main

# 3. Selective Updates anwenden
# Manual merge von Template-Updates mit Client-Customizations
```

### Client-spezifische Changes bewahren
```bash
# .gitignore für Client-specific files
/components/client/
/app/custom-pages/
.env.production.local
```

### Backup Strategy
```bash
# Database Backup
pg_dump $DATABASE_URL > client-backup-$(date +%Y%m%d).sql

# Code Backup
git tag release-v1.0.0
git push origin --tags
```

---

## 📋 Customization Checklist

### Brand Identity
- [ ] Logo & Favicon updated
- [ ] Brand colors in Tailwind config
- [ ] Typography & fonts configured
- [ ] Email templates branded

### Content
- [ ] Landing page customized
- [ ] Navigation updated
- [ ] Marketing pages adapted
- [ ] Legal pages (Impressum, Privacy)

### Functionality
- [ ] Business model configured
- [ ] Payment methods setup
- [ ] Custom features implemented
- [ ] Database schema extended

### Production
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Production API keys set
- [ ] Analytics tracking enabled
- [ ] Error monitoring configured

### Testing
- [ ] All features tested
- [ ] Payment flow validated
- [ ] Email delivery working
- [ ] Mobile responsiveness checked

---

## 🎯 Best Practices

### Code Organization
```bash
# Client-spezifische Files separieren
/components/client/     # Custom components
/lib/client/           # Client-specific logic
/app/client-pages/     # Custom pages
```

### Version Control
```bash
# Client Branch Strategy
main                   # Template base
client/feature-name    # Client customizations
production            # Deployed version
```

### Documentation
```markdown
# CLIENT-README.md (auto-generated)
- Setup instructions
- Custom features overview
- Deployment process
- Support contacts
```

---

**Customization Status**: Template → Client Ready ✅  
**Next Steps**: [Development Guide](05-development.md) | [Quick Start](01-quickstart.md)  
**Version**: NextJS Starter Kit v3.0 - Simplified Edition