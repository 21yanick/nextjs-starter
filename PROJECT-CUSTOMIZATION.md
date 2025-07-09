# 🔧 Projekt-Anpassungsleitfaden

Dieser Leitfaden zeigt dir Schritt für Schritt, wie du das NextJS SaaS Starter Kit für dein eigenes Projekt anpasst.

## 🎯 Überblick

Das Starter Kit wurde bewusst mit generischen Namen und Ports konfiguriert, damit du es einfach für dein spezifisches Projekt anpassen kannst. Hier ist eine Checkliste aller Änderungen:

## ✅ Checkliste für Projekt-Anpassung

### 1. Projekt-Grundlagen

- [ ] **Projekt-Name** in `package.json` ändern
- [ ] **Beschreibung** in `package.json` aktualisieren
- [ ] **Repository-URL** setzen
- [ ] **Lizenz** anpassen
- [ ] **README.md** für dein Projekt anpassen

### 2. Docker & Services

- [ ] **Container-Namen** in `docker-compose.yml` ändern
- [ ] **Ports** bei Konflikten anpassen
- [ ] **Passwörter** sicher setzen
- [ ] **JWT-Secrets** generieren
- [ ] **Service-Namen** in `supabase/kong.yml` aktualisieren

### 3. Environment-Variablen

- [ ] **Supabase-URL** bei Port-Änderungen
- [ ] **Database-URL** bei Port-Änderungen
- [ ] **Stripe-Keys** aus deinem Dashboard
- [ ] **Resend-API-Key** setzen
- [ ] **App-URL** für deine Domain

### 4. Branding & UI

- [ ] **Email-Templates** anpassen
- [ ] **Company-Name** in Docker-Compose
- [ ] **Favicon** ersetzen
- [ ] **Logo** hinzufügen
- [ ] **Farben** anpassen

## 📋 Detaillierte Anweisungen

### 1. Projekt-Grundlagen ändern

#### `package.json`
```json
{
  "name": "mein-saas-projekt",           // ✏️ Ändere hier
  "version": "1.0.0",                   // ✏️ Ändere hier
  "description": "Mein SaaS Projekt",   // ✏️ Ändere hier
  "private": true,
  "repository": {
    "type": "git",
    "url": "https://github.com/dein-username/mein-projekt"  // ✏️ Ändere hier
  },
  "author": "Dein Name <dein@email.com>",  // ✏️ Ändere hier
  "license": "MIT"  // ✏️ Ändere hier falls nötig
}
```

#### `README.md`
```markdown
# 🚀 Mein SaaS Projekt

Eine kurze Beschreibung deines Projekts.

## Features

- Deine spezifischen Features
- ...
```

### 2. Docker-Container anpassen

#### `docker-compose.yml`
```yaml
# Ersetze ALLE Vorkommen von "nextjs-starter" mit deinem Projekt-Namen
# Beispiel: nextjs-starter-db → mein-projekt-db

services:
  mein-projekt-db:                    # ✏️ Ändere hier
    image: supabase/postgres:15.1.0.117
    container_name: mein-projekt-db   # ✏️ Ändere hier
    ports:
      - "56322:5432"                  # ✏️ Ändere Port bei Konflikten
    environment:
      POSTGRES_PASSWORD: dein-sicheres-passwort  # ✏️ Ändere hier
      # ...

  mein-projekt-auth:                  # ✏️ Ändere hier
    # ...
    environment:
      GOTRUE_JWT_SECRET: dein-64-zeichen-jwt-secret  # ✏️ Ändere hier
      GOTRUE_SMTP_SENDER_NAME: "Mein SaaS Name"      # ✏️ Ändere hier
      # ...

  mein-projekt-studio:                # ✏️ Ändere hier
    # ...
    environment:
      DEFAULT_ORGANIZATION_NAME: "Mein Unternehmen"  # ✏️ Ändere hier
      DEFAULT_PROJECT_NAME: "Mein SaaS Projekt"      # ✏️ Ändere hier
      # ...

# Auch alle internen Service-URLs ändern:
# nextjs-starter-db → mein-projekt-db
# nextjs-starter-auth → mein-projekt-auth
# etc.
```

#### `supabase/kong.yml`
```yaml
services:
  - name: auth-service
    url: http://mein-projekt-auth:9999    # ✏️ Ändere hier
    # ...
  - name: rest-service
    url: http://mein-projekt-rest:3000    # ✏️ Ändere hier
    # ...
  - name: storage-service
    url: http://mein-projekt-storage:5000 # ✏️ Ändere hier
    # ...
```

### 3. Environment-Variablen anpassen

#### `.env.local`
```env
# Supabase (bei Port-Änderungen)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:56321  # ✏️ Neue Port-Nummer
DATABASE_URL=postgresql://postgres:dein-passwort@localhost:56322/postgres  # ✏️ Neue Port-Nummer + Passwort

# Stripe (aus deinem Dashboard)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxx  # ✏️ Echte Keys
STRIPE_SECRET_KEY=sk_test_xxxx                   # ✏️ Echte Keys
STRIPE_WEBHOOK_SECRET=whsec_xxxx                 # ✏️ Echte Keys
STRIPE_STARTER_PRICE_ID=price_xxxx               # ✏️ Echte Price-IDs
STRIPE_PRO_PRICE_ID=price_xxxx                   # ✏️ Echte Price-IDs

# Resend (aus deinem Dashboard)
RESEND_API_KEY=re_xxxx                           # ✏️ Echter Key

# App (für deine Domain)
NEXT_PUBLIC_APP_URL=https://mein-projekt.de     # ✏️ Deine Domain
```

### 4. Branding anpassen

#### `lib/email/templates/welcome.tsx`
```typescript
export function WelcomeEmail({ userFirstname }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Willkommen bei Mein SaaS!</Preview>  {/* ✏️ Ändere hier */}
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Willkommen bei Mein SaaS, {userFirstname}!</Heading>  {/* ✏️ Ändere hier */}
          <Text style={text}>
            Danke für deine Anmeldung bei Mein SaaS Projekt.  {/* ✏️ Ändere hier */}
          </Text>
          {/* ... */}
        </Container>
      </Body>
    </Html>
  );
}
```

#### `public/favicon.ico`
```bash
# Ersetze das Favicon
cp dein-favicon.ico public/favicon.ico
```

#### `app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: 'Mein SaaS Projekt',        // ✏️ Ändere hier
  description: 'Beschreibung deines Projekts',  // ✏️ Ändere hier
}
```

### 5. Sichere Passwörter generieren

#### JWT-Secret generieren
```bash
# 64-Zeichen JWT-Secret generieren
openssl rand -base64 48

# Oder mit Node.js
node -e "console.log(require('crypto').randomBytes(48).toString('base64'))"
```

#### Sichere Passwörter
```bash
# Postgres-Passwort generieren
openssl rand -base64 32

# Oder mit Node.js
node -e "console.log(require('crypto').randomBytes(24).toString('base64'))"
```

## 🛠️ Automatisierung

### Bulk-Replace Script

Erstelle ein Script `customize.sh`:

```bash
#!/bin/bash

# Variablen
PROJECT_NAME="mein-saas-projekt"
COMPANY_NAME="Mein Unternehmen"
DISPLAY_NAME="Mein SaaS Projekt"
DOCKER_PREFIX="mein-projekt"

# Docker-Compose anpassen
sed -i "s/nextjs-starter-/$DOCKER_PREFIX-/g" docker-compose.yml
sed -i "s/nextjs-starter/$DOCKER_PREFIX/g" docker-compose.yml
sed -i "s/NextJS SaaS Starter/$DISPLAY_NAME/g" docker-compose.yml

# Kong-Config anpassen
sed -i "s/nextjs-starter-/$DOCKER_PREFIX-/g" supabase/kong.yml

# Package.json anpassen
sed -i "s/nextjs-starter/$PROJECT_NAME/g" package.json

echo "✅ Projekt angepasst!"
echo "📝 Noch zu tun:"
echo "- Passwörter in docker-compose.yml setzen"
echo "- JWT-Secret generieren"
echo "- .env.local aktualisieren"
echo "- Email-Templates anpassen"
```

### Verwendung:
```bash
chmod +x customize.sh
./customize.sh
```

## 🔍 Validierung

### Prüfung nach Anpassung:

```bash
# 1. TypeScript prüfen
pnpm run type-check

# 2. Build testen
pnpm run build

# 3. Docker-Services starten
pnpm run docker:up

# 4. Services prüfen
pnpm run docker:ps

# 5. Health-Check
curl http://localhost:3000/api/health

# 6. Supabase Studio öffnen
open http://localhost:56323  # Oder dein angepasster Port
```

### Häufige Probleme:

1. **Port-Konflikte**: Andere Services verwenden die Ports bereits
   - Lösung: Ports in `docker-compose.yml` und `.env.local` ändern

2. **Container-Namen-Konflikte**: Container-Namen bereits vergeben
   - Lösung: Eindeutige Namen in `docker-compose.yml` verwenden

3. **JWT-Secret zu kurz**: Fehler beim Auth-Service
   - Lösung: Mindestens 32 Zeichen verwenden

4. **Passwort-Mismatch**: Database-Connection schlägt fehl
   - Lösung: Gleiches Passwort in `docker-compose.yml` und `.env.local`

## 📚 Nächste Schritte

Nach der Anpassung:

1. **Stripe-Setup**: Produkte und Preise in deinem Stripe-Dashboard anlegen
2. **Resend-Setup**: Domain verifizieren und DKIM einrichten
3. **Features entwickeln**: Deine spezifischen SaaS-Features implementieren
4. **Deployment**: Auf Coolify oder deiner bevorzugten Plattform deployen

## 🎯 Production-Checklist

Vor dem Production-Deployment:

- [ ] Alle Secrets sind sicher und unique
- [ ] Database-Backups eingerichtet
- [ ] Monitoring konfiguriert
- [ ] SSL-Zertifikate eingerichtet
- [ ] DSGVO-Compliance geprüft
- [ ] Error-Tracking (Sentry) konfiguriert
- [ ] Performance-Monitoring eingerichtet

---

**Tip**: Erstelle eine Kopie dieses Dokuments und hake ab, was du bereits erledigt hast!