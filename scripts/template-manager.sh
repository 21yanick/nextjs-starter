#!/bin/bash

# 🛠️ Template Manager
# Central script for all template operations

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

# Usage function
usage() {
    echo "🛠️  Template Manager - Central script for all template operations"
    echo ""
    echo "Usage: $0 [command] [options]"
    echo ""
    echo "Commands:"
    echo "  create-dev       Create all development templates"
    echo "  sync [template]  Sync changes from development templates"
    echo "  validate         Validate all templates"
    echo "  status           Show template status"
    echo "  help             Show this help message"
    echo ""
    echo "Sync options:"
    echo "  sync saas        Sync SaaS development template"
    echo "  sync shop        Sync Shop development template"
    echo "  sync booking     Sync Booking development template"
    echo "  sync all         Sync all development templates"
    echo ""
    echo "Examples:"
    echo "  $0 create-dev    # Create all development templates"
    echo "  $0 sync saas     # Sync SaaS template after development"
    echo "  $0 validate      # Validate all templates"
    echo "  $0 status        # Show current template status"
}

# Function to show template status
show_status() {
    print_status "📊 Template Status Overview"
    echo ""
    
    # Check core template
    if [ -d "templates/nextjs-core" ]; then
        print_success "✅ Core template: Available"
    else
        print_error "❌ Core template: Missing"
    fi
    
    # Check business templates
    local business_templates=("saas" "shop" "booking")
    for template in "${business_templates[@]}"; do
        if [ -d "templates/nextjs-${template}-template" ]; then
            print_success "✅ ${template^} template: Available"
        else
            print_warning "⚠️  ${template^} template: Missing"
        fi
    done
    
    echo ""
    print_status "📋 Development Templates"
    
    # Check development templates
    for template in "${business_templates[@]}"; do
        if [ -d "templates/nextjs-${template}-dev" ]; then
            print_success "✅ ${template^} dev template: Available"
        else
            print_warning "⚠️  ${template^} dev template: Missing - run 'create-dev' command"
        fi
    done
    
    echo ""
    print_status "🔧 Available Scripts"
    echo "  create-dev-templates.sh  - Create development templates"
    echo "  sync-from-dev.sh        - Sync changes from development"
    echo "  validate-templates.sh   - Validate template consistency"
    echo "  template-manager.sh     - This script"
}

# Main execution
if [ $# -eq 0 ]; then
    usage
    exit 1
fi

command=$1
shift

case $command in
    "create-dev")
        print_status "🚀 Creating development templates..."
        ./scripts/create-dev-templates.sh
        ;;
    "sync")
        if [ $# -eq 0 ]; then
            print_error "Sync command requires a template name"
            echo "Usage: $0 sync [saas|shop|booking|all]"
            exit 1
        fi
        template=$1
        print_status "🔄 Syncing development template: $template"
        ./scripts/sync-from-dev.sh "$template"
        ;;
    "validate")
        print_status "🔍 Validating templates..."
        ./scripts/validate-templates.sh
        ;;
    "status")
        show_status
        ;;
    "help")
        usage
        ;;
    *)
        print_error "Unknown command: $command"
        usage
        exit 1
        ;;
esac