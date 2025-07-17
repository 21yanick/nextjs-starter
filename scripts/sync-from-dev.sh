#!/bin/bash

# 🔄 Development Template Sync
# Syncs changes from development templates back to core and business templates

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

# Function to sync a development template
sync_dev_template() {
    local template_name=$1
    local core_dir="templates/nextjs-core"
    local template_dir="templates/nextjs-${template_name}-template"
    local dev_dir="templates/nextjs-${template_name}-dev"
    
    print_status "Syncing development template: ${template_name}"
    
    # Check if dev template exists
    if [ ! -d "$dev_dir" ]; then
        print_error "Development template not found: $dev_dir"
        return 1
    fi
    
    # Define business-specific files/directories
    declare -a business_specific_files
    case $template_name in
        "saas")
            business_specific_files=(
                "lib/stripe/"
                "app/api/checkout/"
                "app/api/webhooks/stripe/"
                "components/checkout-button.tsx"
                "lib/business-config.ts"
            )
            ;;
        "shop")
            business_specific_files=(
                "lib/stripe/"
                "app/api/products/"
                "app/api/orders/"
                "components/product-card.tsx"
                "components/shopping-cart.tsx"
                "lib/business-config.ts"
            )
            ;;
        "booking")
            business_specific_files=(
                "lib/stripe/"
                "app/api/bookings/"
                "app/api/appointments/"
                "components/calendar.tsx"
                "components/booking-form.tsx"
                "lib/business-config.ts"
            )
            ;;
    esac
    
    # Sync business-specific files to template
    print_status "Syncing business-specific files to template..."
    for file in "${business_specific_files[@]}"; do
        if [ -e "$dev_dir/$file" ]; then
            # Create directory if it doesn't exist
            mkdir -p "$template_dir/$(dirname "$file")"
            
            if [ -d "$dev_dir/$file" ]; then
                # Directory
                cp -r "$dev_dir/$file" "$template_dir/$(dirname "$file")/"
                print_status "  Synced directory: $file"
            else
                # File
                cp "$dev_dir/$file" "$template_dir/$file"
                print_status "  Synced file: $file"
            fi
        fi
    done
    
    # Sync shared files to core (only if they exist in core)
    print_status "Syncing shared files to core..."
    
    # Find all files in dev template
    cd "$dev_dir"
    find . -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" -o -name "*.md" | while read file; do
        # Remove leading ./
        file=${file#./}
        
        # Skip business-specific files
        is_business_specific=false
        for business_file in "${business_specific_files[@]}"; do
            if [[ "$file" == "$business_file"* ]]; then
                is_business_specific=true
                break
            fi
        done
        
        # Skip if business-specific
        if [ "$is_business_specific" = true ]; then
            continue
        fi
        
        # Skip certain files that shouldn't be synced
        if [[ "$file" == "DEV-TEMPLATE.md" ]] || 
           [[ "$file" == ".env.local" ]] || 
           [[ "$file" == "package-lock.json" ]] || 
           [[ "$file" == "pnpm-lock.yaml" ]] || 
           [[ "$file" == "node_modules/"* ]]; then
            continue
        fi
        
        # Only sync if file exists in core
        if [ -f "../$core_dir/$file" ]; then
            # Create directory if it doesn't exist
            mkdir -p "../$core_dir/$(dirname "$file")"
            
            # Copy file
            cp "$file" "../$core_dir/$file"
            print_status "  Synced to core: $file"
        fi
    done
    
    cd - > /dev/null
    
    print_success "Sync completed for: ${template_name}"
}

# Usage function
usage() {
    echo "Usage: $0 [template-name|all]"
    echo ""
    echo "Template names:"
    echo "  saas    - Sync SaaS development template"
    echo "  shop    - Sync Shop development template"
    echo "  booking - Sync Booking development template"
    echo "  all     - Sync all development templates"
    echo ""
    echo "Examples:"
    echo "  $0 saas      # Sync only SaaS template"
    echo "  $0 all       # Sync all templates"
}

# Main execution
if [ $# -eq 0 ]; then
    usage
    exit 1
fi

template=$1

print_status "🔄 Starting development template sync..."

case $template in
    "saas")
        sync_dev_template "saas"
        ;;
    "shop")
        sync_dev_template "shop"
        ;;
    "booking")
        sync_dev_template "booking"
        ;;
    "all")
        sync_dev_template "saas"
        sync_dev_template "shop"
        sync_dev_template "booking"
        ;;
    *)
        print_error "Invalid template name: $template"
        usage
        exit 1
        ;;
esac

# Regenerate development templates
print_status "Regenerating development templates..."
./scripts/create-dev-templates.sh

print_success "🎉 Sync completed successfully!"
echo ""
print_status "Next steps:"
echo "1. Review changes in git"
echo "2. Test the updated templates"
echo "3. Commit changes if satisfied"