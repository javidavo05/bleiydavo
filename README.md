# Timeline Especial - Configuración

Este proyecto es un sitio web interactivo con una timeline que se desbloquea mes a mes, específicamente el día 23 de cada mes a las 00:00 horas.

## Características

- **Autenticación**: Dos usuarios con roles diferentes
  - `jvallejo` (Administrador): Puede modificar contenido y subir fotos
  - `bvega` (Visor): Solo puede ver contenido desbloqueado

- **Timeline**: 13 meses (Agosto 2025 - Agosto 2026)
  - Cada mes se desbloquea automáticamente el día 23 a las 00:00
  - Cards con fotos, títulos e instrucciones
  - Contenido bloqueado muestra signos de interrogación

- **Panel de Administración**: El usuario admin puede:
  - Editar títulos e instrucciones de cada mes
  - Subir y eliminar fotos
  - Preparar contenido para meses futuros

## Configuración de Firebase

### 1. Obtener las credenciales de Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a "Configuración del proyecto" (ícono de engranaje)
4. En la sección "Tus aplicaciones", selecciona la aplicación web o crea una nueva
5. Copia las credenciales del objeto `firebaseConfig`

### 2. Configurar el archivo firebase-config.js

Abre el archivo `firebase-config.js` y reemplaza estos valores con los de tu proyecto:

```javascript
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_PROJECT_ID.firebaseapp.com",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_PROJECT_ID.appspot.com",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};
```

### 3. Configurar Firebase Authentication

1. En Firebase Console, ve a "Authentication"
2. Habilita el método "Correo electrónico/contraseña"
3. Ve a la pestaña "Users" y agrega estos dos usuarios:

   **Usuario Administrador:**
   - Email: `jvallejo@timeline.com`
   - Contraseña: (elige una contraseña segura)

   **Usuario Visor:**
   - Email: `bvega@timeline.com`
   - Contraseña: (elige una contraseña segura)

### 4. Configurar Cloud Firestore

1. En Firebase Console, ve a "Firestore Database"
2. Crea la base de datos (modo producción)
3. Ve a la pestaña "Reglas" y copia el contenido del archivo `firestore.rules`
4. Publica las reglas

### 5. Configurar Firebase Storage

1. En Firebase Console, ve a "Storage"
2. Crea el bucket de storage
3. Ve a la pestaña "Rules" y copia el contenido del archivo `storage.rules`
4. Publica las reglas

### 6. Agregar imagen de login

Coloca una imagen llamada `login-image.jpg` en la carpeta `assets/` para que aparezca en la pantalla de login.

## Desplegar en Firebase Hosting

### 1. Instalar Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. Iniciar sesión en Firebase

```bash
firebase login
```

### 3. Inicializar Firebase Hosting

```bash
firebase init hosting
```

Selecciona:
- Tu proyecto existente
- Directorio público: `.` (directorio actual)
- Configurar como single-page app: No
- No sobrescribir archivos existentes

### 4. Desplegar

```bash
firebase deploy
```

## Estructura de archivos

```
.
├── index.html              # Página principal con todas las pantallas
├── styles.css              # Estilos del sitio
├── app.js                  # Lógica principal de la aplicación
├── firebase-config.js      # Configuración de Firebase
├── firestore.rules         # Reglas de seguridad de Firestore
├── storage.rules           # Reglas de seguridad de Storage
├── assets/
│   └── login-image.jpg     # Imagen para la pantalla de login
└── README.md               # Este archivo
```

## Uso

### Para el Usuario Administrador (jvallejo)

1. Inicia sesión con tu usuario
2. Verás todos los meses desbloqueados en la timeline
3. Haz clic en "Panel Admin" para editar contenido
4. Selecciona un mes del menú lateral
5. Edita el título, instrucciones y sube fotos
6. Guarda los cambios

### Para el Usuario Visor (bvega)

1. Inicia sesión con tu usuario
2. Verás la timeline con los meses
3. Los meses futuros estarán bloqueados hasta el día 23 a las 00:00
4. Una vez desbloqueados, podrás ver el contenido y las fotos
5. Haz clic en "Ver Detalles" para ver la galería completa

## Cómo funciona el desbloqueo

- Cada mes tiene una fecha de desbloqueo: día 23 a las 00:00 horas
- El usuario visor solo puede ver contenido de meses desbloqueados
- El usuario admin puede ver y editar todos los meses siempre
- Una vez pasada la fecha de desbloqueo, el contenido permanece visible para ambos usuarios

## Soporte

Para cualquier problema o pregunta, contacta al desarrollador del proyecto.

