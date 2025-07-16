#!/bin/bash

# NextJS Starter Kit - Client Project Generator
# Usage: ./create-project.sh <client-name> <business-model> [region]
# Example: ./create-project.sh kunde-crm saas swiss

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check arguments
if [ $# -lt 2 ]; then
    print_error "Usage: $0 <client-name> <business-model> [region]"
    echo "Business models: saas, shop, booking"
    echo "Regions: international (default), swiss, german"
    echo ""
    echo "Examples:"
    echo "  $0 kunde-crm saas"
    echo "  $0 beauty-salon booking swiss"
    echo "  $0 online-shop shop german"
    exit 1
fi

CLIENT_NAME=$1
BUSINESS_MODEL=$2
REGION=${3:-international}

# Validate business model
case $BUSINESS_MODEL in
    saas|shop|booking)
        ;;
    *)
        print_error "Invalid business model: $BUSINESS_MODEL"
        echo "Valid options: saas, shop, booking"
        exit 1
        ;;
esac

# Validate region
case $REGION in
    international|swiss|german)
        ;;
    *)
        print_error "Invalid region: $REGION"
        echo "Valid options: international, swiss, german"
        exit 1
        ;;
esac

TARGET_DIR="../clients/$CLIENT_NAME"
TEMPLATE_DIR="templates/nextjs-${BUSINESS_MODEL}-template"
CORE_DIR="templates/nextjs-core"

print_status "🚀 Creating professional ${BUSINESS_MODEL} project for ${CLIENT_NAME}"
print_status "📍 Region: ${REGION}"
print_status "📂 Target: ${TARGET_DIR}"

# Check if template exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    print_error "Template not found: $TEMPLATE_DIR"
    exit 1
fi

if [ ! -d "$CORE_DIR" ]; then
    print_error "Core foundation not found: $CORE_DIR"
    exit 1
fi

# Check if target directory already exists
if [ -d "$TARGET_DIR" ]; then
    print_warning "Directory $TARGET_DIR already exists"
    read -p "Continue and overwrite? [y/N] " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Cancelled by user"
        exit 0
    fi
    rm -rf "$TARGET_DIR"
fi

# Create client directory structure
mkdir -p "../clients"
print_status "📋 Copying core foundation..."

# Copy core files
cp -r "$CORE_DIR" "$TARGET_DIR"

print_status "🎯 Adding $BUSINESS_MODEL specific features..."

# Copy and merge template-specific files
if [ -d "$TEMPLATE_DIR" ]; then
    # Copy template files, overwriting core files where needed
    cp -rf "$TEMPLATE_DIR"/* "$TARGET_DIR"/
fi

# Update package.json with client name
print_status "📦 Customizing package.json for $CLIENT_NAME..."
sed -i "s/\"name\": \".*\"/\"name\": \"$CLIENT_NAME\"/" "$TARGET_DIR/package.json"

# Copy working environment from main project and customize
print_status "⚙️ Creating environment configuration..."

# Copy complete working environment
cp .env.local "$TARGET_DIR/.env.local"

# Add client-specific header
sed -i "1i# $CLIENT_NAME - $BUSINESS_MODEL Configuration" "$TARGET_DIR/.env.local"
sed -i "2i# Generated on $(date)" "$TARGET_DIR/.env.local"
sed -i "3i#" "$TARGET_DIR/.env.local"

# Update business model specific configuration
sed -i "s/^BUSINESS_MODEL=.*/BUSINESS_MODEL=$BUSINESS_MODEL/" "$TARGET_DIR/.env.local"
sed -i "s/^PAYMENT_REGION=.*/PAYMENT_REGION=$REGION/" "$TARGET_DIR/.env.local"

# Set feature flags based on business model
case $BUSINESS_MODEL in
    saas)
        sed -i "s/^ENABLE_SUBSCRIPTIONS=.*/ENABLE_SUBSCRIPTIONS=true/" "$TARGET_DIR/.env.local"
        sed -i "s/^ENABLE_SHOP=.*/ENABLE_SHOP=false/" "$TARGET_DIR/.env.local"
        sed -i "s/^ENABLE_BOOKINGS=.*/ENABLE_BOOKINGS=false/" "$TARGET_DIR/.env.local"
        ;;
    shop)
        sed -i "s/^ENABLE_SUBSCRIPTIONS=.*/ENABLE_SUBSCRIPTIONS=false/" "$TARGET_DIR/.env.local"
        sed -i "s/^ENABLE_SHOP=.*/ENABLE_SHOP=true/" "$TARGET_DIR/.env.local"
        sed -i "s/^ENABLE_BOOKINGS=.*/ENABLE_BOOKINGS=false/" "$TARGET_DIR/.env.local"
        ;;
    booking)
        sed -i "s/^ENABLE_SUBSCRIPTIONS=.*/ENABLE_SUBSCRIPTIONS=false/" "$TARGET_DIR/.env.local"
        sed -i "s/^ENABLE_SHOP=.*/ENABLE_SHOP=false/" "$TARGET_DIR/.env.local"
        sed -i "s/^ENABLE_BOOKINGS=.*/ENABLE_BOOKINGS=true/" "$TARGET_DIR/.env.local"
        ;;
esac

# Create client documentation
print_status "📝 Creating client documentation..."
cat > "$TARGET_DIR/CLIENT-README.md" << EOF
# $CLIENT_NAME - $BUSINESS_MODEL Platform

Professional $BUSINESS_MODEL solution built with NextJS Starter Kit.

## Business Model: $BUSINESS_MODEL
**Region:** $REGION  
**Generated:** $(date)

## Features Included
EOF

case $BUSINESS_MODEL in
    saas)
        cat >> "$TARGET_DIR/CLIENT-README.md" << EOF
- ✅ User authentication & management
- ✅ Subscription billing (Stripe)
- ✅ Dashboard & analytics
- ✅ Email system
- ✅ Security & compliance
- ❌ E-commerce (not included)
- ❌ Booking system (not included)
EOF
        ;;
    shop)
        cat >> "$TARGET_DIR/CLIENT-README.md" << EOF
- ✅ User authentication & management
- ✅ E-commerce & shopping cart
- ✅ Product management
- ✅ Payment processing
- ✅ Order management
- ❌ Subscriptions (not included)
- ❌ Booking system (not included)
EOF
        ;;
    booking)
        cat >> "$TARGET_DIR/CLIENT-README.md" << EOF
- ✅ User authentication & management
- ✅ Appointment booking system
- ✅ Calendar integration
- ✅ Service management
- ✅ Payment & deposits
- ❌ Subscriptions (not included)
- ❌ E-commerce (not included)
EOF
        ;;
esac

cat >> "$TARGET_DIR/CLIENT-README.md" << EOF

## Zero Ballast Code
This project contains ONLY the code needed for your $BUSINESS_MODEL business.
No unused payment methods, no irrelevant features, no bloat.

## Quick Start
\`\`\`bash
cd $CLIENT_NAME
npm install
npm run docker:up
npm run db:setup
npm run dev
\`\`\`

## Production Deployment
1. Update .env.local with production values
2. Configure Stripe webhooks
3. Set up email service (Resend)
4. Deploy with your preferred hosting

## Support
- Framework: NextJS 15 + React 19
- Database: Supabase (self-hosted)
- Payments: Stripe
- Email: Resend
- Styling: Tailwind CSS 4

Built with professional standards and best practices.
EOF

# Create .gitignore if it doesn't exist
if [ ! -f "$TARGET_DIR/.gitignore" ]; then
    print_status "📁 Creating .gitignore..."
    cat > "$TARGET_DIR/.gitignore" << EOF
# Dependencies
node_modules/
.pnp
.pnp.js

# Production builds
.next/
out/
dist/

# Environment files
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# Dependency directories
node_modules/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# Stores VSCode versions used for testing VSCode extensions
.vscode-test

# yarn v2
.yarn/cache
.yarn/unplugged
.yarn/build-state.yml
.yarn/install-state.gz
.pnp.*

# Database
*.db
*.sqlite

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Docker
volumes/
EOF
fi

print_success "🎉 Client project created successfully!"
print_success "📂 Location: $TARGET_DIR"
print_success "🎯 Business Model: $BUSINESS_MODEL"
print_success "📍 Region: $REGION"

echo ""
print_status "Next steps:"
echo "1. cd $TARGET_DIR"
echo "2. npm install"
echo "3. npm run docker:up"
echo "4. npm run db:setup"
echo "5. npm run dev"
echo ""
print_status "Professional $BUSINESS_MODEL solution ready for $CLIENT_NAME! 🚀"