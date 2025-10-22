#!/bin/bash

echo "================================================"
echo "🔥 Script de Configuración Firebase"
echo "================================================"
echo ""

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}Paso 1: Login en Firebase${NC}"
echo "Este paso abrirá tu navegador para autenticarte con Google..."
echo ""
firebase login

echo ""
echo -e "${GREEN}✓ Login completado${NC}"
echo ""

echo -e "${BLUE}Paso 2: Listar tus proyectos Firebase${NC}"
echo "Estos son tus proyectos disponibles:"
echo ""
firebase projects:list

echo ""
echo -e "${YELLOW}Copia el ID de tu proyecto de la lista anterior${NC}"
echo ""

# Pedir al usuario el ID del proyecto
read -p "Ingresa el ID de tu proyecto Firebase: " PROJECT_ID

echo ""
echo -e "${BLUE}Paso 3: Inicializando Firebase en el proyecto...${NC}"
echo ""

# Crear .firebaserc con el proyecto seleccionado
cat > .firebaserc << EOF
{
  "projects": {
    "default": "$PROJECT_ID"
  }
}
EOF

echo -e "${GREEN}✓ Proyecto configurado: $PROJECT_ID${NC}"
echo ""

echo -e "${BLUE}Paso 4: Inicializando Hosting, Firestore y Storage...${NC}"
echo ""

# Usar el firebase.json que ya existe
echo -e "${GREEN}✓ Configuración de hosting ya existe${NC}"
echo ""

echo -e "${BLUE}Paso 5: Desplegando reglas de Firestore...${NC}"
firebase deploy --only firestore:rules

echo ""
echo -e "${BLUE}Paso 6: Desplegando reglas de Storage...${NC}"
firebase deploy --only storage:rules

echo ""
echo "================================================"
echo -e "${GREEN}🎉 ¡Configuración completada!${NC}"
echo "================================================"
echo ""
echo "Próximos pasos:"
echo "1. Actualiza firebase-config.js con las credenciales de tu proyecto"
echo "2. Crea los usuarios en Firebase Authentication"
echo "3. Ejecuta: firebase deploy --only hosting"
echo ""

