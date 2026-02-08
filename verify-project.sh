#!/bin/bash

# IdeaDepth - Installation Verification Script
# This script checks if all required files are present

echo "🔍 IdeaDepth - Project Verification"
echo "===================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check counter
checks_passed=0
checks_failed=0

# Function to check file
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} $1 - MISSING"
        ((checks_failed++))
    fi
}

# Function to check directory
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1/"
        ((checks_passed++))
    else
        echo -e "${RED}✗${NC} $1/ - MISSING"
        ((checks_failed++))
    fi
}

echo "📁 Configuration Files:"
check_file "package.json"
check_file "next.config.js"
check_file "tailwind.config.js"
check_file "tsconfig.json"
check_file "postcss.config.js"
check_file ".eslintrc.json"
check_file ".gitignore"
check_file ".env.example"
echo ""

echo "📄 Documentation Files:"
check_file "README.md"
check_file "ARCHITECTURE.md"
check_file "QUICKSTART.md"
check_file "PROJECT_SUMMARY.md"
check_file "LICENSE"
echo ""

echo "📂 Source Directories:"
check_dir "src"
check_dir "src/components"
check_dir "src/components/screens"
check_dir "src/components/ui"
check_dir "src/context"
check_dir "src/lib"
check_dir "src/pages"
check_dir "src/pages/api"
check_dir "src/styles"
echo ""

echo "🎨 Screen Components:"
check_file "src/components/screens/LandingScreen.tsx"
check_file "src/components/screens/InputScreen.tsx"
check_file "src/components/screens/ThinkingScreen.tsx"
check_file "src/components/screens/AnalysisScreen.tsx"
check_file "src/components/screens/FollowupScreen.tsx"
echo ""

echo "🧩 Core Files:"
check_file "src/components/ui/index.tsx"
check_file "src/context/AppContext.tsx"
check_file "src/lib/analysisEngine.ts"
check_file "src/pages/_app.tsx"
check_file "src/pages/_document.tsx"
check_file "src/pages/index.tsx"
check_file "src/pages/api/analyze.ts"
check_file "src/styles/globals.css"
echo ""

echo "===================================="
echo "📊 Results:"
echo -e "${GREEN}Passed: $checks_passed${NC}"
echo -e "${RED}Failed: $checks_failed${NC}"
echo ""

if [ $checks_failed -eq 0 ]; then
    echo -e "${GREEN}✅ All files present! Project is complete.${NC}"
    echo ""
    echo "🚀 Next steps:"
    echo "1. Run: npm install"
    echo "2. Run: npm run dev"
    echo "3. Open: http://localhost:3000"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some files are missing. Please check the output above.${NC}"
    echo ""
    exit 1
fi
