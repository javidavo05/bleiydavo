# 📦 Resumen del Proyecto - Timeline Especial

## 🎯 ¿Qué hace este proyecto?

Una aplicación web interactiva donde:
- 📅 Se muestra una timeline de 13 meses (Agosto 2025 - Agosto 2026)
- 🔒 Cada mes se desbloquea automáticamente el día 23 a las 00:00
- 👤 Dos usuarios: Administrador (jvallejo) y Visor (bvega)
- 📸 Galería de fotos, títulos e instrucciones para cada mes
- ⚙️ Panel de administración para gestionar todo el contenido

---

## 📁 Estructura de Archivos

```
Bleixenydavo/
│
├── 📄 index.html                    # Página principal (HTML)
├── 🎨 styles.css                    # Todos los estilos (CSS)
├── ⚙️ app.js                        # Lógica principal (JavaScript)
├── 🔥 firebase-config.js            # Configuración de Firebase
│
├── 🔒 firestore.rules               # Reglas de seguridad Firestore
├── 🔒 storage.rules                 # Reglas de seguridad Storage
├── ⚙️ firebase.json                 # Configuración de hosting
├── 🚫 .gitignore                    # Archivos ignorados por Git
│
├── 📖 README.md                     # Documentación completa
├── 🚀 INICIO_RAPIDO.md             # Guía rápida (5 minutos)
├── 📋 INSTRUCCIONES_CONFIGURACION.md # Guía paso a paso detallada
├── 📊 RESUMEN_PROYECTO.md          # Este archivo
│
└── 📁 assets/
    └── 🖼️ login-image.jpg          # Imagen para la pantalla de login
```

---

## 🔑 Usuarios del Sistema

### 👨‍💼 Administrador (jvallejo)

**Credenciales:**
- Usuario: `jvallejo`
- Email: `jvallejo@timeline.com`
- Rol: Admin

**Permisos:**
- ✅ Ver todos los meses (incluso los bloqueados)
- ✅ Acceder al Panel de Administración
- ✅ Editar títulos e instrucciones
- ✅ Subir y eliminar fotos
- ✅ Preparar contenido para meses futuros

**Pantallas:**
- 🏠 Timeline (con todos los meses visibles)
- ⚙️ Panel Admin (exclusivo)

---

### 👁️ Visor (bvega)

**Credenciales:**
- Usuario: `bvega`
- Email: `bvega@timeline.com`
- Rol: Viewer

**Permisos:**
- ✅ Ver meses desbloqueados
- ✅ Ver detalles e instrucciones
- ✅ Ver galería de fotos
- ❌ No puede editar nada
- ❌ No puede ver meses bloqueados

**Pantallas:**
- 🏠 Timeline (solo meses desbloqueados)

---

## 📅 Timeline de Meses

| Mes | Fecha de Desbloqueo | ID en Firestore |
|-----|---------------------|-----------------|
| Agosto 2025 | 23 ago 2025, 00:00 | `ago2025` |
| Septiembre 2025 | 23 sep 2025, 00:00 | `sep2025` |
| Octubre 2025 | 23 oct 2025, 00:00 | `oct2025` |
| Noviembre 2025 | 23 nov 2025, 00:00 | `nov2025` |
| Diciembre 2025 | 23 dic 2025, 00:00 | `dic2025` |
| Enero 2026 | 23 ene 2026, 00:00 | `ene2026` |
| Febrero 2026 | 23 feb 2026, 00:00 | `feb2026` |
| Marzo 2026 | 23 mar 2026, 00:00 | `mar2026` |
| Abril 2026 | 23 abr 2026, 00:00 | `abr2026` |
| Mayo 2026 | 23 may 2026, 00:00 | `may2026` |
| Junio 2026 | 23 jun 2026, 00:00 | `jun2026` |
| Julio 2026 | 23 jul 2026, 00:00 | `jul2026` |
| Agosto 2026 | 23 ago 2026, 00:00 | `ago2026` |

---

## 🗄️ Estructura de Firestore

### Colección: `months`

Cada documento tiene este formato:

```javascript
{
  title: "Título del mes",              // String
  instructions: "Instrucciones...",     // String (texto largo)
  photos: [                             // Array de URLs
    "https://...",
    "https://..."
  ],
  createdAt: Timestamp,                 // Fecha de creación
  updatedAt: Timestamp                  // Última actualización
}
```

**Documentos:**
- `ago2025` - Agosto 2025
- `sep2025` - Septiembre 2025
- `oct2025` - Octubre 2025
- ... etc.

---

## 📦 Estructura de Storage

```
storage/
└── photos/
    ├── ago2025/
    │   ├── 1234567890_foto1.jpg
    │   └── 1234567891_foto2.jpg
    ├── sep2025/
    │   ├── 1234567892_foto1.jpg
    │   └── 1234567893_foto2.jpg
    └── ...
```

Cada foto se guarda con un timestamp para evitar colisiones de nombres.

---

## 🎨 Características de Diseño

### 🌈 Colores

- **Fondo:** Degradado azul oscuro (#0f172a → #1e1b4b)
- **Primario:** Azul índigo (#6366f1)
- **Secundario:** Púrpura (#8b5cf6)
- **Acento:** Rosa (#ec4899)
- **Superficies:** Gris azulado (#1e293b, #334155)
- **Texto:** Blanco humo (#f1f5f9)

### ✨ Animaciones

- Hover en cards: Elevación con sombra
- Botones: Efecto de elevación
- Transiciones suaves en todos los elementos
- Gradientes animados en encabezados

### 📱 Responsive

- Desktop: Grid de cards 3-4 columnas
- Tablet: Grid de 2 columnas
- Mobile: 1 columna
- Panel admin se convierte en vertical en móvil

---

## 🔐 Reglas de Seguridad

### Firestore Rules

```javascript
// Solo admin puede escribir
// Todos los autenticados pueden leer
allow read: if isAuthenticated();
allow write: if isAdmin();
```

### Storage Rules

```javascript
// Solo admin puede subir/eliminar
// Todos los autenticados pueden ver
allow read: if isAuthenticated();
allow write, delete: if isAdmin();
```

---

## 🚀 Flujo de Trabajo

### Para el Administrador:

1. **Login** → Dashboard con timeline completa
2. **Panel Admin** → Seleccionar mes
3. **Editar:**
   - Título del mes
   - Instrucciones/mensaje
   - Subir fotos (múltiples)
4. **Guardar** → Contenido guardado en Firestore + Storage
5. **Vista previa** → Ver cómo se verá para el visor

### Para el Visor:

1. **Login** → Dashboard con timeline
2. **Meses futuros** → Bloqueados con 🔒
3. **Día 23 a las 00:00** → Mes se desbloquea automáticamente
4. **Ver detalles** → Modal con instrucciones y galería
5. **Historial** → Todos los meses pasados visibles

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|------------|-----|
| HTML5 | Estructura de la página |
| CSS3 | Estilos y animaciones |
| JavaScript (ES6+) | Lógica de la aplicación |
| Firebase Auth | Autenticación de usuarios |
| Cloud Firestore | Base de datos NoSQL |
| Firebase Storage | Almacenamiento de fotos |
| Firebase Hosting | Hosting web (opcional) |

**Sin frameworks ni librerías adicionales** - Todo vanilla!

---

## ⏱️ Lógica de Desbloqueo

```javascript
// Pseudocódigo simplificado
function isMonthUnlocked(month) {
  const now = new Date();
  const unlockDate = month.unlockDate; // 23 del mes a las 00:00
  
  // Admin siempre puede ver todo
  if (currentUser.role === 'admin') return true;
  
  // Visor solo ve si ya pasó la fecha
  return now >= unlockDate;
}
```

**Características:**
- Verifica en tiempo real al cargar la página
- Se actualiza automáticamente (no necesita refrescar)
- Zona horaria del navegador del usuario
- Admin ve todo siempre (para testing y preparación)

---

## 📈 Escalabilidad

### ¿Quieres agregar más meses?

1. Abre `firebase-config.js`
2. Agrega más objetos al array `TIMELINE_MONTHS`
3. Ejemplo:
```javascript
{ 
  id: 'sep2026', 
  month: 'Septiembre', 
  year: 2026, 
  unlockDate: new Date(2026, 8, 23, 0, 0, 0) 
}
```

### ¿Quieres cambiar la fecha de desbloqueo?

Cambia el día 23 por otro número en cada `unlockDate`:
```javascript
unlockDate: new Date(2025, 7, 15, 0, 0, 0) // Día 15 en vez de 23
```

### ¿Quieres más usuarios?

1. Agrega el email en `USERS` en `firebase-config.js`
2. Crea el usuario en Firebase Authentication
3. Define su rol: `'admin'` o `'viewer'`

---

## 🎯 Casos de Uso

### Escenario 1: Primera Configuración
1. Admin prepara contenido para los 13 meses
2. Sube todas las fotos, títulos e instrucciones
3. Todo queda guardado pero bloqueado

### Escenario 2: Día de Desbloqueo
1. Llega el día 23 del mes a las 00:00
2. Visor inicia sesión
3. Ve el nuevo mes desbloqueado
4. Lee las instrucciones y ve las fotos

### Escenario 3: Actualización de Contenido
1. Admin se da cuenta que faltó algo
2. Entra al Panel Admin
3. Edita el mes (incluso si ya está desbloqueado)
4. Los cambios se ven inmediatamente

### Escenario 4: Ver Historial
1. Cualquier usuario puede ver meses pasados
2. Todo el contenido histórico permanece accesible
3. Pueden volver a ver fotos e instrucciones antiguas

---

## 🔄 Mantenimiento

### Backups

Firebase hace backups automáticos, pero puedes exportar:
- **Firestore:** Exportar desde consola → Herramientas → Exportar
- **Storage:** Descargar fotos desde consola o código

### Actualizar Contenido

Usa el Panel Admin - no necesitas tocar código ni base de datos directamente.

### Monitoreo

Firebase Console te muestra:
- Usuarios activos
- Uso de almacenamiento
- Lecturas/escrituras de Firestore
- Ancho de banda de Storage

---

## 💡 Tips y Trucos

### Para mejores resultados:

1. **Fotos:** Usa imágenes optimizadas (< 1MB cada una)
2. **Instrucciones:** Escribe mensajes con saltos de línea para mejor lectura
3. **Testing:** Prueba como ambos usuarios antes de lanzar
4. **Preparación:** Prepara todo el contenido con anticipación
5. **Backup:** Guarda copias locales de las fotos importantes

### Shortcuts:

- **F12:** Abrir consola del navegador (para debug)
- **Ctrl+Shift+R:** Refrescar sin caché
- **Ver en móvil:** F12 → Toggle device toolbar

---

## 🎉 ¡Listo para Usar!

Todo está configurado y listo. Solo necesitas:

1. ✅ Actualizar `firebase-config.js` con tus credenciales
2. ✅ Crear los usuarios en Firebase Authentication
3. ✅ Configurar las reglas de Firestore y Storage
4. ✅ Agregar una imagen de login (opcional)
5. ✅ Abrir `index.html` en tu navegador

**¿Dudas?** Consulta:
- 🚀 `INICIO_RAPIDO.md` - Para empezar en 5 minutos
- 📋 `INSTRUCCIONES_CONFIGURACION.md` - Guía paso a paso
- 📖 `README.md` - Documentación completa

---

**Creado con ❤️ para una experiencia especial**

