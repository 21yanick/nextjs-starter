#!/bin/bash

# 🇨🇭 NextJS Swiss Starter Kit - Client Project Generator
# Usage: ./create-project.sh <client-name> <business-model>
# Example: ./create-project.sh kunde-crm saas

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
if [ $# -lt 1 ]; then
    print_error "Usage: $0 <client-name> [business-model]"
    echo "Business models: saas (default), shop, booking"
    echo ""
    echo "Examples:"
    echo "  $0 kunde-crm"
    echo "  $0 kunde-crm saas"
    echo "  $0 beauty-salon booking"
    echo "  $0 online-shop shop"
    exit 1
fi

CLIENT_NAME=$1
BUSINESS_MODEL=${2:-saas}  # Default to saas if not provided

# Validate business model
if [[ ! "$BUSINESS_MODEL" =~ ^(saas|shop|booking)$ ]]; then
    print_error "Invalid business model: $BUSINESS_MODEL"
    echo "Valid options: saas, shop, booking"
    exit 1
fi

# Validate client name
if [[ ! "$CLIENT_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
    print_error "Invalid client name: $CLIENT_NAME"
    echo "Client name must contain only letters, numbers, hyphens, and underscores"
    exit 1
fi

# Directory paths
TEMPLATE_DIR="template"
TARGET_DIR="../clients/${CLIENT_NAME}"

# Check if template exists
if [ ! -d "$TEMPLATE_DIR" ]; then
    print_error "Template not found: $TEMPLATE_DIR"
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

# Create target directory
mkdir -p "$TARGET_DIR"

# Start generation
print_status "🚀 Creating professional ${BUSINESS_MODEL} project for ${CLIENT_NAME}"
print_status "📂 Target: ${TARGET_DIR}"

# Copy universal template
print_status "📋 Copying NextJS template..."
cp -r "$TEMPLATE_DIR/." "$TARGET_DIR/"

# Customize package.json
print_status "📦 Customizing package.json for ${CLIENT_NAME}..."
if [ -f "$TARGET_DIR/package.json" ]; then
    sed -i "s/\"name\": \".*\"/\"name\": \"${CLIENT_NAME}\"/" "$TARGET_DIR/package.json"
fi

# Create environment configuration
print_status "⚙ Creating environment configuration..."
if [ -f "$TARGET_DIR/.env.example" ]; then
    cp "$TARGET_DIR/.env.example" "$TARGET_DIR/.env.local"
fi

# Add header to .env.local
sed -i "1i# ${CLIENT_NAME} - ${BUSINESS_MODEL} Configuration" "$TARGET_DIR/.env.local"
sed -i "2i# Generated on $(date)" "$TARGET_DIR/.env.local"
sed -i "3i#" "$TARGET_DIR/.env.local"

# Fix DATABASE_URL to use Docker pooler port (55322) for client connections
print_status "🔧 Fixing DATABASE_URL for Docker pooler connection..."
sed -i "s/DATABASE_URL=postgresql:\/\/postgres:.*@localhost:[0-9]*\/postgres/DATABASE_URL=postgresql:\/\/postgres:your-super-secret-and-long-postgres-password@localhost:55322\/postgres/" "$TARGET_DIR/.env.local"

# Update business model specific configuration (Swiss-only)
sed -i "s/^BUSINESS_MODEL=.*/BUSINESS_MODEL=$BUSINESS_MODEL/" "$TARGET_DIR/.env.local"

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
cat > "$TARGET_DIR/README.md" << EOF
# ${CLIENT_NAME} - Swiss ${BUSINESS_MODEL} Application

**Business Model:** ${BUSINESS_MODEL}
**Generated:** $(date)

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
\`\`\`

## 🏗️ Project Structure

This project is generated from the Swiss NextJS Starter Kit template.

- **Business Model:** ${BUSINESS_MODEL}
- **Currency:** CHF (Swiss Francs)
- **Language:** German (de-CH)
- **Payment Methods:** Kreditkarte, TWINT

## 🔧 Configuration

Environment variables are configured in \`.env.local\`:

\`\`\`env
BUSINESS_MODEL=${BUSINESS_MODEL}
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## 📚 Documentation

- **Main Documentation:** \`nextjs-starter/docs/\`
- **Template Guide:** \`nextjs-starter/docs/templates/\`
- **Setup Guide:** \`nextjs-starter/docs/setup/\`

## 🛠️ Development

\`\`\`bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
\`\`\`

## 🏢 Business Model Features

EOF

# Add business model specific documentation
case $BUSINESS_MODEL in
    saas)
        cat >> "$TARGET_DIR/README.md" << EOF
### SaaS Features
- ✅ Subscription Management
- ✅ User Dashboards
- ✅ Stripe Integration
- ✅ Authentication System

### Subscription Plans
- Starter Plan: CHF 29/month
- Pro Plan: CHF 99/month
- Enterprise: Custom pricing
EOF
        ;;
    shop)
        cat >> "$TARGET_DIR/README.md" << EOF
### E-Commerce Features
- ✅ Product Catalog
- ✅ Shopping Cart
- ✅ Order Management
- ✅ Payment Processing

### Swiss E-Commerce
- Free shipping over CHF 50
- 7.7% VAT included
- Swiss & Liechtenstein delivery
EOF
        ;;
    booking)
        cat >> "$TARGET_DIR/README.md" << EOF
### Booking Features
- ✅ Appointment Scheduling
- ✅ Service Management
- ✅ Calendar Integration
- ✅ Payment Processing

### Swiss Booking System
- Business hours: 09:00 - 18:00
- 24h advance booking required
- 50% deposit required
- Europe/Zurich timezone
EOF
        ;;
esac

cat >> "$TARGET_DIR/README.md" << EOF

## 🇨🇭 Swiss Optimization

This application is optimized for the Swiss market:

- **Currency:** CHF (Rappen-based calculations)
- **Language:** German (de-CH)
- **Payments:** Kreditkarte, TWINT
- **Tax:** 7.7% MwSt. included
- **Locale:** Swiss number/date formatting

## 🔗 Infrastructure

Make sure the infrastructure is running:

\`\`\`bash
# Start infrastructure
cd ../nextjs-starter/infrastructure
docker-compose up -d

# Check status
docker-compose ps
\`\`\`

## 📞 Support

For issues or questions, refer to the main documentation in \`nextjs-starter/docs/\`.

---

Generated with 🇨🇭 Swiss NextJS Starter Kit
EOF

# Remove any .git directory from template
if [ -d "$TARGET_DIR/.git" ]; then
    rm -rf "$TARGET_DIR/.git"
fi

# Success message
print_success "🎉 Client project created successfully!"
print_success "📂 Location: ${TARGET_DIR}"
print_success "🎯 Business Model: ${BUSINESS_MODEL}"

echo ""
print_status "Next steps:"
echo "1. Start infrastructure: cd infrastructure && docker compose up -d"
echo "2. Setup client project: cd ${TARGET_DIR}"
echo "3. npm install"
echo "4. npm run db:setup"
echo "5. npm run dev"
echo ""
print_status "Professional ${BUSINESS_MODEL} solution ready for ${CLIENT_NAME}! 🚀"
print_status "📁 Infrastructure runs separately from nextjs-starter/infrastructure/"