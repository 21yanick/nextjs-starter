# 🔧 Setup Issues & Solutions

This document outlines the major setup issues we encountered and how they were resolved.

## 🚨 **Major Issues Encountered**

### 1. Port Inconsistencies Across Project
**Problem**: Different files used different ports, causing connection failures.
- `setup-database.js` used port `54323` instead of `55323`
- Documentation had mixed port references
- Services couldn't communicate properly

**Solution**: Standardized all ports across the project:
- **Kong/API Gateway**: `55321`
- **PostgreSQL Database**: `55322` 
- **Supabase Studio**: `55323`

### 2. Missing Meta Service for Supabase Studio
**Problem**: Supabase Studio showed "Failed to retrieve tables" and "Failed to load schemas".
- Studio needs `postgres-meta` service for schema management
- Without it, Studio can't read database structure

**Solution**: Added `nextjs-starter-meta` service:
```yaml
nextjs-starter-meta:
  image: supabase/postgres-meta:v0.68.0
  environment:
    PG_META_DB_HOST: nextjs-starter-db
    PG_META_DB_PASSWORD: your-super-secret-and-long-postgres-password
```

### 3. Storage Service Configuration Issues
**Problem**: Storage service crashed with `FILE_STORAGE_BACKEND_PATH env variable not set`.

**Solution**: Added missing environment variables and volume:
```yaml
environment:
  FILE_STORAGE_BACKEND_PATH: /var/lib/storage
  PGRST_JWT_SECRET: your-super-secret-jwt-token-with-at-least-32-characters-long
volumes:
  - nextjs-starter-storage-data:/var/lib/storage
```

### 4. Database Migrations Never Executed
**Problem**: Public schema had no tables (`profiles`, `subscriptions` missing).
- Migration file `00001_initial_schema.sql` existed but was never run
- Only auth and storage schemas had tables

**Solution**: Manually executed migrations to create:
- `public.profiles` table with RLS policies
- `public.subscriptions` table with RLS policies  
- Automatic profile creation trigger
- Storage buckets (`avatars`, `user-uploads`)

### 5. Kong API Gateway Routing
**Problem**: Studio couldn't reach meta service through Kong.

**Solution**: Added meta service route to `kong.yml`:
```yaml
- name: meta-service
  url: http://nextjs-starter-meta:8080
  routes:
    - name: meta-route
      strip_path: true
      paths:
        - /pg
```

## ✅ **Current Working Configuration**

### Services & Ports
```
nextjs-starter-db      → PostgreSQL Database (port 55322)
nextjs-starter-auth    → Supabase GoTrue Auth Service
nextjs-starter-rest    → PostgREST API Service
nextjs-starter-storage → Supabase Storage Service
nextjs-starter-meta    → PostgreSQL Meta Service (NEW!)
nextjs-starter-kong    → Kong API Gateway (port 55321)
nextjs-starter-studio  → Supabase Studio (port 55323)
```

### Fixed Environment Variables
```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321
DATABASE_URL=postgresql://postgres:your-super-secret-and-long-postgres-password@localhost:55322/postgres
```

### Working Studio Configuration
```yaml
STUDIO_PG_META_URL: http://nextjs-starter-meta:8080
SUPABASE_URL: http://nextjs-starter-kong:8000
SUPABASE_PUBLIC_URL: http://localhost:55321
```

## 🎯 **Key Learnings**

1. **Port Consistency is Critical**: Every reference must use the same ports
2. **Meta Service is Required**: Supabase Studio needs postgres-meta for schema management
3. **Environment Variables Must Be Complete**: Missing variables cause silent failures
4. **Migrations Must Be Executed**: Tables don't exist until migrations run
5. **Service Dependencies Matter**: Studio depends on Kong, which depends on Meta

## 🔄 **Reliable Setup Process**

```bash
# 1. Clean start
pnpm run docker:down
docker volume rm nextjs-starter_nextjs-starter-db-data

# 2. Start all services  
pnpm run docker:up

# 3. Wait for services to be ready
sleep 45

# 4. Check all services are healthy
pnpm run docker:ps

# 5. Verify migrations ran (should show profiles, subscriptions)
docker exec nextjs-starter-db psql -U postgres -d postgres -c "\dt"

# 6. Test authentication
pnpm run dev
# → Register at http://localhost:3000/auth/register
# → Check Studio at http://localhost:55323
```

## 🚨 **Red Flags to Watch For**

- **"User not found" errors**: Normal for non-authenticated users
- **Studio shows "unhealthy"**: Wait 1-2 minutes for full startup
- **Empty table list in Studio**: Migrations didn't run, execute manually
- **Port conflicts**: Change ports or kill conflicting processes
- **Storage service exits**: Missing environment variables

## 📚 **References**

- [Supabase Self-Hosting Guide](https://supabase.com/docs/guides/self-hosting)
- [Docker Compose Best Practices](https://docs.docker.com/compose/production/)
- [Kong Configuration](https://docs.konghq.com/gateway/latest/reference/configuration/)

---

**This setup now works reliably with all services healthy and Studio functional!** 🎉