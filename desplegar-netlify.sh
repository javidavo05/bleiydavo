#!/bin/bash

echo "================================================"
echo "🌐 Desplegar a Netlify"
echo "================================================"
echo ""

GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Paso 1: Login en Netlify${NC}"
netlify login

echo ""
echo -e "${BLUE}Paso 2: Inicializando proyecto...${NC}"
netlify init

echo ""
echo -e "${GREEN}🎉 ¡Listo! Tu sitio está desplegado en Netlify${NC}"
echo ""
echo "Para desplegar actualizaciones en el futuro, ejecuta:"
echo "  netlify deploy --prod"
echo ""

