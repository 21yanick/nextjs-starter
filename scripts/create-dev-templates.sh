#!/bin/bash

# 🔧 Development Template Generator
# Creates merged templates for development purposes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Function to create a development template
create_dev_template() {
    local template_name=$1
    local core_dir="templates/nextjs-core"
    local template_dir="templates/nextjs-${template_name}-template"
    local dev_dir="templates/nextjs-${template_name}-dev"
    
    print_status "Creating development template: ${template_name}"
    
    # Check if source directories exist
    if [ ! -d "$core_dir" ]; then
        print_error "Core template not found: $core_dir"
        return 1
    fi
    
    if [ ! -d "$template_dir" ]; then
        print_error "Template not found: $template_dir"
        return 1
    fi
    
    # Remove existing dev template
    if [ -d "$dev_dir" ]; then
        print_warning "Removing existing dev template: $dev_dir"
        rm -rf "$dev_dir"
    fi
    
    # Create dev template directory
    mkdir -p "$dev_dir"
    
    # Copy core foundation
    print_status "Copying core foundation..."
    cp -r "$core_dir/." "$dev_dir/"
    
    # Overlay template-specific files
    print_status "Overlaying ${template_name}-specific files..."
    cp -rf "$template_dir/." "$dev_dir/"
    
    # Copy .env.local if it exists in template
    if [ -f "$template_dir/.env.local" ]; then
        cp "$template_dir/.env.local" "$dev_dir/.env.local"
    fi
    
    # Add development marker
    echo "# This is a development template - auto-generated" > "$dev_dir/DEV-TEMPLATE.md"
    echo "# Source: $core_dir + $template_dir" >> "$dev_dir/DEV-TEMPLATE.md"
    echo "# Generated: $(date)" >> "$dev_dir/DEV-TEMPLATE.md"
    echo "" >> "$dev_dir/DEV-TEMPLATE.md"
    echo "This template is auto-generated for development purposes." >> "$dev_dir/DEV-TEMPLATE.md"
    echo "Do not edit source files directly - they will be overwritten." >> "$dev_dir/DEV-TEMPLATE.md"
    echo "" >> "$dev_dir/DEV-TEMPLATE.md"
    echo "To update this template, run: scripts/create-dev-templates.sh" >> "$dev_dir/DEV-TEMPLATE.md"
    
    print_success "Development template created: $dev_dir"
}

# Main execution
print_status "🚀 Creating development templates..."

# Create development templates for all business models
create_dev_template "saas"
create_dev_template "shop"
create_dev_template "booking"

print_success "🎉 All development templates created!"
echo ""
print_status "Usage:"
echo "  cd templates/nextjs-saas-dev/ && pnpm install && pnpm run dev"
echo "  cd templates/nextjs-shop-dev/ && pnpm install && pnpm run dev"
echo "  cd templates/nextjs-booking-dev/ && pnpm install && pnpm run dev"