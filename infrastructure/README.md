# Infrastructure Setup

Development infrastructure for NextJS Swiss Starter Kit.

## Contents

- `supabase-official/` - Official Supabase repository for development
- `volumes/` - Docker volumes for database persistence
- `docker-compose.yml` - Main development setup
- `docker-compose.yml.official` - Official Supabase setup

## Usage

```bash
# Start development infrastructure
cd infrastructure/
docker-compose up -d

# Stop infrastructure
docker-compose down

# Reset volumes (clean database)
docker-compose down -v
```

## Services

- **Database**: PostgreSQL with business schema
- **Studio**: Supabase Studio on http://localhost:55323
- **Kong**: API Gateway on http://localhost:55321
- **Functions**: Edge Functions
- **Storage**: File storage

## Template Development

Templates are located in `../templates/` and are completely separate from this infrastructure.

Each template connects to this infrastructure via environment variables:
- `NEXT_PUBLIC_SUPABASE_URL=http://localhost:55321`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY=...`