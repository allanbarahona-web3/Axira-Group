#!/bin/bash
# Script de verificación del entorno de desarrollo

echo "🔍 Verificando entorno de Axira Group..."
echo ""

# Colores
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Verificar Node.js
echo -n "Node.js: "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} $NODE_VERSION"
else
    echo -e "${RED}✗ No instalado${NC}"
fi

# Verificar pnpm
echo -n "pnpm: "
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm -v)
    echo -e "${GREEN}✓${NC} $PNPM_VERSION"
else
    echo -e "${RED}✗ No instalado${NC}"
fi

# Verificar dependencias críticas
echo ""
echo "📦 Dependencias críticas:"

check_package() {
    if [ -d "node_modules/$1" ]; then
        echo -e "  ${GREEN}✓${NC} $1"
    else
        echo -e "  ${RED}✗${NC} $1"
    fi
}

check_package "next"
check_package "react"
check_package "@sanity/client"
check_package "@sanity/image-url"
check_package "tailwindcss"
check_package "typescript"

# Verificar archivos de configuración
echo ""
echo "⚙️  Archivos de configuración:"

check_file() {
    if [ -f "$1" ]; then
        echo -e "  ${GREEN}✓${NC} $1"
    else
        echo -e "  ${RED}✗${NC} $1"
    fi
}

check_file "package.json"
check_file "tsconfig.json"
check_file "next.config.js"
check_file "tailwind.config.js"
check_file "postcss.config.js"

# Verificar estructura de directorios
echo ""
echo "📁 Estructura del proyecto:"

check_dir() {
    if [ -d "$1" ]; then
        echo -e "  ${GREEN}✓${NC} $1"
    else
        echo -e "  ${RED}✗${NC} $1"
    fi
}

check_dir "src/app"
check_dir "src/components"
check_dir "src/config"
check_dir "src/i18n"
check_dir "src/modules/real-estate"
check_dir "sanity-schema"

# Verificar variables de entorno
echo ""
echo "🔐 Variables de entorno:"

if [ -f ".env.local" ]; then
    echo -e "  ${GREEN}✓${NC} .env.local existe"
    if grep -q "NEXT_PUBLIC_SANITY_PROJECT_ID" .env.local 2>/dev/null; then
        if grep "NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here" .env.local &> /dev/null; then
            echo -e "  ${YELLOW}⚠${NC}  Sanity no configurado (usando mock data)"
        else
            echo -e "  ${GREEN}✓${NC} Sanity configurado"
        fi
    else
        echo -e "  ${YELLOW}⚠${NC}  Sanity no configurado (usando mock data)"
    fi
else
    echo -e "  ${YELLOW}⚠${NC}  .env.local no existe (usando mock data)"
    echo -e "      Ejecuta: ${YELLOW}cp .env.local.example .env.local${NC}"
fi

# Build test
echo ""
echo "🔨 Prueba de compilación:"
echo -n "  "
if pnpm build >/dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Build exitoso"
else
    echo -e "${RED}✗${NC} Build falló"
fi

echo ""
echo "✅ Verificación completa!"
echo ""
echo "Para iniciar el servidor de desarrollo:"
echo "  ${GREEN}pnpm dev${NC}"
echo ""
