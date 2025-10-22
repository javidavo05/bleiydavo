#!/bin/bash

echo "================================================"
echo "🔑 Obtener Credenciales de Firebase"
echo "================================================"
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}Paso 1: Verificando login...${NC}"
echo ""

# Verificar si está logueado
if firebase projects:list > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Ya estás logueado en Firebase${NC}"
else
    echo -e "${YELLOW}⚠ No estás logueado. Ejecutando login...${NC}"
    firebase login
fi

echo ""
echo -e "${BLUE}Paso 2: Configurando proyecto bleixenydavo...${NC}"
firebase use bleixenydavo

echo ""
echo -e "${BLUE}Paso 3: Obteniendo credenciales...${NC}"
echo ""
echo "================================================"
echo "COPIA ESTO Y PÉGALO EN EL CHAT:"
echo "================================================"
echo ""

# Intentar obtener las credenciales
firebase apps:sdkconfig

echo ""
echo "================================================"
echo ""
echo -e "${YELLOW}Si no se muestran credenciales arriba:${NC}"
echo "1. Ve a: https://console.firebase.google.com/project/bleixenydavo/settings/general"
echo "2. Scroll abajo a 'Tus aplicaciones'"
echo "3. Si no hay apps, crea una web app (ícono </>)"
echo "4. Copia el firebaseConfig"
echo ""

