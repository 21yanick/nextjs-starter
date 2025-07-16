# 🔧 System Architecture

**Self-hosted Supabase infrastructure mit multi-template business model system**

Dieses Starter Kit verwendet eine selbst-gehostete Supabase-Infrastruktur mit einem intelligenten Template-System für verschiedene Business Models (SaaS, E-Commerce, Booking). Das System generiert spezialisierte Projekte ohne unnötigen Code-Ballast.

> **📖 Setup-Anweisungen**: Siehe [infrastructure/README.md](../infrastructure/README.md)

---

## 🏗️ System Components

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │  Kong Gateway   │    │   PostgreSQL    │
│   localhost:3000│◄──►│  localhost:55321│◄──►│  localhost:55322│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         └─────────────►│ Supabase Studio │◄─────────────┘
                        │ localhost:55323 │
                        └─────────────────┘
```

### Infrastructure Stack
- **Docker Compose**: 13 Services (DB, Auth, Storage, Analytics, etc.)
- **Kong API Gateway**: Zentrale API-Verwaltung mit JWT-Authentication
- **PostgreSQL**: Business-Schema + 16 Supabase Auth-Tabellen
- **Supabase Studio**: Database-Management Interface

### Template Generation
- **Project Generator**: `./create-project.sh name model`
- **Core Foundation**: Shared components + authentication
- **Business Overlays**: Model-spezifische Features
- **Feature Flags**: Runtime business model detection

---

## 📋 Template System Architecture

### Core Foundation (`nextjs-core/`)
**Shared basis für alle business models:**
- Authentication (Supabase Auth integration)
- UI Components (Radix + Tailwind)
- Layout System (Header, Footer, Navigation)
- Theme Support (Dark/Light mode)
- Email Templates (Welcome, notifications)

### Business Model Templates
| Template | Focus | Key Features |
|----------|-------|--------------|
| **SaaS** | Subscriptions | Stripe subscriptions, user dashboard, billing |
| **Shop** | E-Commerce | Product catalog, shopping cart, checkout |
| **Booking** | Appointments | Calendar system, service management, deposits |

### Generation Process
1. **Copy Core**: `nextjs-core/` → `clients/project-name/`
2. **Apply Template**: `nextjs-{model}-template/` → overwrites specific files
3. **Configure**: Update `package.json`, `.env.local`, feature flags
4. **Sync Keys**: Ensure JWT keys match infrastructure

---

## 🗄️ Database Architecture

### Business Schema (6 Tables)
```sql
-- Core User Management
public.profiles         -- Extended user data + Stripe customer_id

-- SaaS Features  
public.subscriptions    -- Stripe subscription management

-- E-Commerce Features
public.products         -- Product catalog
public.orders           -- Order management
public.order_items      -- Order line items

-- Booking Features
public.appointments     -- Appointment scheduling
```

### Authentication Integration
- **16 Supabase Auth Tables**: `auth.users`, `auth.sessions`, etc.
- **Automatic Profile Creation**: Trigger creates profile for new users
- **Row Level Security**: Users can only access their own data
- **JWT Integration**: Seamless frontend authentication

### Multi-Tenant Design
```sql
-- RLS Policy Example
CREATE POLICY "Users can only see own data" ON public.profiles
  FOR ALL USING (auth.uid() = user_id);
```

---

## ⚙️ Configuration & Environment

### Business Model Detection
```env
# Runtime feature flags
BUSINESS_MODEL=saas|shop|booking
ENABLE_SUBSCRIPTIONS=true|false
ENABLE_SHOP=true|false  
ENABLE_BOOKINGS=true|false
```

### Database Connection
```env
# Pooled connection (recommended)
DATABASE_URL=postgresql://postgres:password@localhost:55322/postgres

# Direct connection (development only)
DATABASE_URL=postgresql://postgres:password@localhost:5432/postgres
```

### Supabase Configuration
```env
# Local infrastructure
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsI...

# Production: Update URLs and rotate keys
```

### Development vs Production
| Aspect | Development | Production |
|--------|-------------|------------|
| **Database** | Docker PostgreSQL | Managed/Self-hosted PostgreSQL |
| **JWT Secrets** | Demo keys | Rotated production keys |
| **Email** | Mock SMTP (inbucket) | Real SMTP service |
| **Analytics** | Postgres backend | External analytics |
| **Domains** | localhost | Custom domain + SSL |

---

## 🔗 Integration Points

### Payment Processing
- **Stripe Integration**: CHF currency, subscription + one-time payments
- **Webhook Handling**: Automated subscription/order updates
- **Test Mode**: Stripe test keys for development

### Email System  
- **Resend Integration**: Transactional emails
- **Template System**: Welcome, password reset, notifications
- **Development**: Mock SMTP via inbucket container

### API Gateway (Kong)
- **Authentication**: JWT token validation
- **Authorization**: Role-based access control
- **CORS**: Cross-origin request handling
- **Rate Limiting**: API usage protection

### Monitoring & Analytics
- **Supabase Analytics**: Usage statistics
- **Vector Logging**: Centralized log collection
- **Health Checks**: Container status monitoring
- **Performance**: Database query analysis

---

## 🚀 Architecture Benefits

### Template Advantages
- **Zero Code Ballast**: Only necessary code per business model
- **Rapid Deployment**: 15-minute project generation
- **Consistent Structure**: Standardized project layout
- **Easy Customization**: Clear separation of concerns

### Self-Hosting Benefits
- **Full Control**: No vendor lock-in or usage limits
- **Cost Predictable**: Fixed infrastructure costs
- **Data Ownership**: Complete data control and privacy
- **Custom Extensions**: Modify Supabase as needed

### Scalability Design
- **Connection Pooling**: Supavisor handles connection limits
- **Horizontal Scaling**: Container-based architecture
- **Database Optimization**: Indexed queries + RLS efficiency
- **CDN Ready**: Static asset optimization

---

## 🔧 Development Workflow

### Local Development
1. **Start Infrastructure**: `docker compose up -d`
2. **Generate Project**: `./create-project.sh myapp saas`
3. **Install Dependencies**: `pnpm install`
4. **Start Development**: `pnpm run dev`

### Database Management
- **Schema Changes**: Edit `business-schema.sql` + restart containers
- **Migrations**: Manual SQL execution via Studio or CLI
- **Seeding**: Test data scripts in `infrastructure/scripts/`
- **Backup**: Docker volume persistence + manual exports

### Project Customization
- **Branding**: Update logo, colors, fonts in components
- **Features**: Enable/disable via environment flags
- **Schema**: Extend business tables as needed
- **Integrations**: Add new services via environment config

---

**Architecture Status**: Production-Ready ✅  
**Setup Guide**: [infrastructure/README.md](../infrastructure/README.md)  
**Version**: NextJS Starter Kit v2.0