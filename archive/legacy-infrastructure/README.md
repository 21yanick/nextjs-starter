# Legacy Infrastructure Code Archive

**Date**: 2025-07-16  
**Reason**: Cleanup and consolidation of infrastructure code

## What was moved here:

### `supabase/` Directory
- **`migrations/`**: Legacy migration files (not used by Docker setup)
  - `00001_clean_schema.sql` - Custom PostgreSQL schema
  - `business-schema.sql` - Duplicate of volumes/db/business-schema.sql
- **`init-scripts/`**: Legacy initialization scripts
  - `jwt.sql` - Duplicate of volumes/db/jwt.sql
  - `roles.sql` - Duplicate of volumes/db/roles.sql
- **`seed.sql`**: Test data seeding (not used)
- **`templates/`**: Legacy templates
- **`kong.yml`**: Kong configuration (not used)

## Current Active System

**Docker-Compose System** (infrastructure/docker-compose.yml):
- Uses `infrastructure/volumes/db/*.sql` for database initialization
- Automatic setup on container start
- No manual migration needed

## Files Still Active in Production

```
infrastructure/
├── docker-compose.yml          # ✅ Main orchestration
├── .env                        # ✅ Configuration
├── volumes/db/                 # ✅ Database initialization
│   ├── business-schema.sql     # ✅ Business tables
│   ├── realtime.sql           # ✅ Supabase realtime
│   ├── webhooks.sql           # ✅ Supabase webhooks
│   ├── roles.sql              # ✅ Database roles
│   ├── jwt.sql                # ✅ JWT configuration
│   └── ... other system files
└── scripts/                    # ✅ Client-side utilities
```

## Why This Was Moved

1. **Duplication**: Same files existed in both `supabase/` and `volumes/db/`
2. **Confusion**: Two different migration systems
3. **Unused**: Docker-compose uses volumes/db/, not supabase/
4. **Maintenance**: Simpler to maintain single source of truth

## Recovery

If needed, these files can be restored from this archive directory.