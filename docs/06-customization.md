# 🎨 Template-Anpassungen

**Praktische Anleitungen zur Individualisierung des Starter Kits**

Das Template kann einfach für verschiedene Anwendungen angepasst werden - von SaaS zu Shop, Booking oder komplett eigenen Lösungen.

---

## 🎯 Anpassungs-Philosophie

**Modulare Anpassung statt komplexe Konfiguration:**
- ✅ **Einfacher Umbau**: Pages und Components nach Bedarf ersetzen
- ✅ **SQL Module**: Schema-Komponenten nach Anwendung aktivieren
- ✅ **Saubere Struktur**: Keine komplexen Feature Flags
- ✅ **Swiss-Optimiert**: CHF, de-CH, TWINT bleiben erhalten
- ✅ **Type-Safe**: TypeScript Unterstützung bleibt vollständig

### Standard → Angepasst

Das Template kommt standardmäßig als **SaaS** und kann systematisch umgebaut werden:

- **SaaS Standard**: Subscriptions, Pricing, Billing
- **Shop Umbau**: Products, Orders, Shopping Cart  
- **Booking Umbau**: Appointments, Services, Calendar
- **Custom**: Eigene Business Logic

---

## 🛍️ SaaS → Shop Umbau

### Schritt-für-Schritt Anleitung

**1. SQL Schema aktivieren**

```bash
# 1. Schema-Datei bearbeiten
cd infrastructure/volumes/db/
vi business-schema.sql
```

```sql
-- business-schema.sql
\i 00-core-schema.sql

-- SaaS deaktivieren
-- \i 01-saas-schema.sql

-- Shop aktivieren  
\i 02-shop-schema.sql

-- Optional: Booking für Services
-- \i 03-booking-schema.sql
```

```bash
# 2. Database neustarten
cd ../../
docker compose restart supabase-db

# 3. Schema in Studio überprüfen
open http://localhost:55323
# → Tables Tab: products, orders, order_items sollten sichtbar sein
```

**2. Navigation umstellen**

```typescript
// components/layout/header.tsx
export function Header() {
  const navigationLinks = [
    { href: '/shop', label: 'Shop' },         // ← /pricing ersetzen
    { href: '/features', label: 'Produkte' }, // ← /features anpassen
    { href: '/contact', label: 'Kontakt' }    // ← bleibt gleich
  ]
  
  // Rest bleibt gleich...
}
```

**3. Dashboard umbauen**

```bash
# Subscription Dashboard entfernen
rm -rf template/app/dashboard/subscription/

# Shop Dashboard erstellen
mkdir template/app/dashboard/orders/
```

```typescript
// template/app/dashboard/orders/page.tsx
import { getUser } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'
import { OrdersTable } from '@/components/shop/orders-table'

export default async function OrdersPage() {
  const user = await getUser()
  if (!user) return null
  
  const supabase = createClient()
  const { data: orders } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (
        *,
        product:products (name, price)
      )
    `)
    .eq('customer_id', user.id)
    .order('created_at', { ascending: false })
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Meine Bestellungen</h1>
      <OrdersTable orders={orders} />
    </div>
  )
}
```

**4. Shop Components erstellen**

```bash
# Shop Components Verzeichnis
mkdir template/components/shop/
```

```typescript
// components/shop/product-card.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatSwissPrice } from '@/lib/plans'

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string
    price: number // in Rappen
    image_url?: string
  }
  onAddToCart: (productId: string) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="h-full">
      {product.image_url && (
        <div className="aspect-square overflow-hidden">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">
            {formatSwissPrice(product.price / 100)}
          </span>
          <Button onClick={() => onAddToCart(product.id)}>
            In den Warenkorb
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
```

**5. Shop API Routes**

```typescript
// app/api/cart/add/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { productId, quantity = 1 } = await request.json()
    
    const supabase = createClient()
    
    // Add to cart logic (session-based or database)
    // Implementation depends on your cart strategy
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add to cart' }, 
      { status: 500 }
    )
  }
}
```

**6. Stripe für Shop anpassen**

```typescript
// lib/stripe/shop.ts
import { stripe } from './config'

export async function createShopCheckout(items: {
  productId: string
  quantity: number
  price: number
}[]) {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment', // ← nicht subscription!
    payment_method_types: ['card', 'twint'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'chf',
        product_data: {
          name: `Product ${item.productId}`,
        },
        unit_amount: item.price, // in Rappen
      },
      quantity: item.quantity,
    })),
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/shop`,
  })
  
  return session
}
```

---

## 📅 SaaS → Booking Umbau

### Service-Buchung System

**1. Booking Schema aktivieren**

```sql
-- business-schema.sql
\i 00-core-schema.sql
-- \i 01-saas-schema.sql    -- deaktivieren
\i 03-booking-schema.sql   -- aktivieren
```

**2. Booking Components**

```typescript
// components/booking/service-selector.tsx
export function ServiceSelector({ 
  services, 
  onSelect 
}: {
  services: Service[]
  onSelect: (service: Service) => void
}) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Card key={service.id} className="cursor-pointer hover:shadow-lg">
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
            <div className="text-2xl font-bold">
              {formatSwissPrice(service.price / 100)}
              <span className="text-sm text-muted-foreground">
                / {service.duration}min
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              {service.description}
            </p>
            <Button onClick={() => onSelect(service)} className="w-full">
              Service wählen
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

**3. Calendar Integration**

```typescript
// components/booking/time-slot-picker.tsx
import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

export function TimeSlotPicker({ 
  serviceId, 
  onSlotSelect 
}: {
  serviceId: string
  onSlotSelect: (slot: Date) => void
}) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [availableSlots, setAvailableSlots] = useState<Date[]>([])
  
  // Fetch available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots(serviceId, selectedDate)
        .then(setAvailableSlots)
    }
  }, [selectedDate, serviceId])
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Datum wählen</h3>
        <Calendar
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date < new Date()}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Zeit wählen</h3>
        <div className="grid grid-cols-2 gap-2">
          {availableSlots.map((slot) => (
            <Button
              key={slot.toISOString()}
              variant="outline"
              onClick={() => onSlotSelect(slot)}
            >
              {slot.toLocaleTimeString('de-CH', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
```

---

## 🎨 Branding & Design

### Logo und Visual Identity

**1. Logo ersetzen**

```bash
# Logo-Dateien ersetzen (SVG empfohlen)
template/public/logo.svg          # Header Logo
template/public/favicon.ico       # Browser Favicon  
template/public/apple-icon.png    # Mobile Icon
```

**2. Brand Colors anpassen**

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe', 
          500: '#0ea5e9',  // ← Ihre Hauptfarbe
          600: '#0284c7',
          900: '#0c4a6e',
        },
        // Weitere Brand Colors...
      }
    }
  }
}
```

**3. Typography anpassen**

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'Inter', 'sans-serif'], // ← Custom Font
      }
    }
  }
}
```

### Zentrale Konfiguration

**Branding in lib/config.ts:**

```typescript
export const siteConfig = {
  // Branding - wird in jedem Projekt angepasst
  name: "Ihr Unternehmen",
  description: "Ihre professionelle Lösung für...",
  
  // Regional Settings (Swiss bleibt)
  currency: "CHF" as const,
  region: "swiss" as const, 
  locale: "de-CH" as const,
  
  // Business Settings - an Ihr Modell anpassen
  pricing: {
    starter: 29.90,     // ← Ihre Preise
    pro: 79.90,
    enterprise: 199.90  // ← falls benötigt
  },
  
  // Kontakt-Informationen
  contact: {
    email: "info@ihrunternehmen.ch",
    company: "Ihr Unternehmen GmbH",
    phone: "+41 44 123 45 67",       // ← neu
    address: "Ihre Adresse, Zürich"  // ← neu
  },
  
  // Social Media (optional)
  social: {
    twitter: "https://twitter.com/ihrunternehmen",
    linkedin: "https://linkedin.com/company/ihrunternehmen"
  }
} as const
```

---

## 🔧 Custom Features

### Neue Funktionalität hinzufügen

**1. Database Schema erweitern**

```sql
-- infrastructure/volumes/db/04-custom-schema.sql
-- Custom tables für Ihre spezifischen Anforderungen

CREATE TABLE IF NOT EXISTS public.your_custom_table (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  custom_field TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS aktivieren
ALTER TABLE public.your_custom_table ENABLE ROW LEVEL SECURITY;

-- Policy für User-spezifische Daten
CREATE POLICY "Users can manage own data" 
  ON public.your_custom_table 
  FOR ALL USING (auth.uid() = user_id);
```

```sql
-- business-schema.sql erweitern
\i 00-core-schema.sql
\i 01-saas-schema.sql  -- oder andere Module
\i 04-custom-schema.sql  -- ← Ihr Custom Schema
```

**2. TypeScript Types generieren**

```bash
# Supabase Types aktualisieren
pnpm supabase gen types typescript --local > types/database.ts
```

**3. Custom API Routes**

```typescript
// app/api/custom-feature/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/lib/auth/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const supabase = createClient()
  const { data, error } = await supabase
    .from('your_custom_table')
    .select('*')
    .eq('user_id', user.id)
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}

export async function POST(request: NextRequest) {
  const user = await getUser()
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  const body = await request.json()
  
  const supabase = createClient()
  const { data, error } = await supabase
    .from('your_custom_table')
    .insert({
      user_id: user.id,
      custom_field: body.customField,
      metadata: body.metadata || {}
    })
    .select()
    .single()
    
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json({ data })
}
```

**4. Custom Components**

```typescript
// components/custom/your-feature.tsx
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface CustomData {
  id: string
  customField: string
  createdAt: string
}

export function YourFeature() {
  const [data, setData] = useState<CustomData[]>([])
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  
  // Daten laden
  useEffect(() => {
    fetchCustomData()
  }, [])
  
  const fetchCustomData = async () => {
    const response = await fetch('/api/custom-feature')
    const result = await response.json()
    setData(result.data || [])
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/custom-feature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customField: inputValue })
      })
      
      if (response.ok) {
        setInputValue('')
        fetchCustomData() // Daten neu laden
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ihre Custom Funktion</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Eingabe..."
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? 'Speichern...' : 'Hinzufügen'}
          </Button>
        </form>
        
        <div className="mt-6 space-y-2">
          {data.map((item) => (
            <div key={item.id} className="p-3 border rounded">
              <p>{item.customField}</p>
              <span className="text-xs text-muted-foreground">
                {new Date(item.createdAt).toLocaleDateString('de-CH')}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

---

## 🌐 Production Setup

### Domain und SSL

**1. Custom Domain konfigurieren**

```env
# Production .env.local
NEXT_PUBLIC_APP_URL=https://yourdomain.ch
EMAIL_DOMAIN=yourdomain.ch
```

**2. SSL Certificate**

```bash
# Bei den meisten Hosting-Providern automatisch
# Vercel: Automatisches SSL
# Netlify: Automatisches SSL
# Eigener Server: Let's Encrypt verwenden
```

**3. DNS Konfiguration**

```dns
# DNS Records für yourdomain.ch
A     @     123.45.67.89        # Main domain
CNAME www   yourdomain.ch       # www redirect
MX    @     10 mail.provider.com # Email (falls eigener Server)

# Email DNS (für Resend)
TXT   @     "v=spf1 include:_spf.resend.com ~all"
CNAME resend._domainkey.yourdomain.ch resend._domainkey.resend.com
```

### Environment Migration

**Development → Production:**

```bash
# 1. API Keys aktualisieren
STRIPE_SECRET_KEY=sk_live_...           # ← Live Keys!
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
RESEND_API_KEY=re_live_...

# 2. Database Migration
# Supabase Cloud oder eigene PostgreSQL
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
DATABASE_URL=postgresql://user:pass@host:5432/db

# 3. Monitoring
NEXT_PUBLIC_SENTRY_DSN=https://production-dsn...
```

---

## 🔄 Maintenance & Updates

### Template Updates

Das Template kann aktualisiert werden ohne bestehende Anpassungen zu verlieren:

**1. Backup erstellen**

```bash
# Git Branch für Backup
git checkout -b backup-customizations-$(date +%Y%m%d)
git commit -am "Backup before template update"
```

**2. Selective Updates**

```bash
# Nur spezifische Template-Dateien aktualisieren
# Beispiel: Neue UI Components
cp template/components/ui/new-component.tsx your-project/components/ui/

# Core System Updates (vorsichtig!)
# lib/auth/, lib/supabase/ nur bei Breaking Changes
```

**3. Database Migrations**

```sql
-- Neue Schema-Features hinzufügen ohne bestehende zu brechen
-- Beispiel: Neue Felder zu bestehenden Tabellen
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS new_field TEXT;
```

### Backup Strategy

**Database Backup:**

```bash
# Regelmäßige Database Backups
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Automatisiert via Cron (Production)
0 2 * * * pg_dump $DATABASE_URL | gzip > /backups/db-$(date +%Y%m%d).sql.gz
```

**Code Versioning:**

```bash
# Release Tags für Stable Versions
git tag v1.0.0
git push origin --tags

# Feature Branches für große Änderungen
git checkout -b feature/new-payment-provider
```

---

## 📋 Anpassungs-Checklist

### Basis-Anpassungen
- [ ] Logo und Favicon aktualisiert
- [ ] Brand Colors in tailwind.config.ts
- [ ] Site Config angepasst (Name, Kontakt)
- [ ] Navigation für Anwendung optimiert

### Schema & Funktionen
- [ ] SQL Schema aktiviert (SaaS/Shop/Booking)
- [ ] Database Services neugestartet
- [ ] TypeScript Types aktualisiert
- [ ] Custom API Routes erstellt

### Components & UI
- [ ] Unnötige Components entfernt
- [ ] Anwendungs-spezifische Components erstellt
- [ ] Dashboard für Anwendung angepasst
- [ ] Email Templates aktualisiert

### Integration & Services
- [ ] Stripe für Anwendung konfiguriert
- [ ] Payment Flow getestet
- [ ] Email Templates angepasst
- [ ] Error Tracking konfiguriert

### Production Setup
- [ ] Custom Domain konfiguriert
- [ ] SSL Certificate aktiv
- [ ] Production API Keys gesetzt
- [ ] DNS Records konfiguriert
- [ ] Backup Strategy implementiert

### Testing
- [ ] Alle Features getestet
- [ ] Payment Flow validiert
- [ ] Email Delivery funktioniert
- [ ] Mobile Responsiveness geprüft
- [ ] Performance optimiert

---

## 🎯 Best Practices

### Code Organization

```bash
# Projekt-spezifische Dateien separieren
components/
├── ui/              # Template UI (wenig ändern)
├── auth/            # Template Auth (wenig ändern)  
├── custom/          # ← Ihre spezifischen Components
└── [app-specific]/  # ← SaaS: billing/, Shop: shop/, etc.

lib/
├── config.ts        # ← Hauptsächlich hier anpassen
├── supabase/        # Template (wenig ändern)
├── stripe/          # ← Anwendungs-spezifisch anpassen
└── custom/          # ← Ihre Business Logic
```

### Version Control

```bash
# Branch Strategy für Anpassungen
main                    # Template Base (clean)
feature/branding       # Branding Anpassungen
feature/shop-system    # Shop-spezifische Features
feature/custom-logic   # Ihre Business Logic
production            # Deployed Version
```

### Documentation

```bash
# Projekt-spezifische Dokumentation
docs/
├── setup.md          # ← Ihr Setup Guide
├── features.md       # ← Ihre Features
├── deployment.md     # ← Ihr Deployment
└── customizations.md # ← Ihre Anpassungen
```

---

**Anpassungs-Status:** Template → Ihr Projekt ✅  
**Flexibilität:** SaaS/Shop/Booking/Custom ✅  
**Swiss-Optimiert:** CHF + TWINT + de-CH ✅