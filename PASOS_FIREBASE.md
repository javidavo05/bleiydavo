# 🚀 Pasos para Conectar con Firebase

## Opción 1: Script Automático (Recomendado)

### Paso 1: Ejecuta el script

Abre tu terminal en esta carpeta y ejecuta:

```bash
./setup-firebase.sh
```

El script te guiará automáticamente por todos los pasos.

---

## Opción 2: Manual (Paso a Paso)

### 1. Login en Firebase

```bash
firebase login
```

Se abrirá tu navegador, inicia sesión con tu cuenta de Google.

### 2. Ver tus proyectos

```bash
firebase projects:list
```

Copia el **ID de tu proyecto** (no el nombre, el ID).

### 3. Seleccionar tu proyecto

```bash
firebase use [TU-PROJECT-ID]
```

Por ejemplo: `firebase use bleixenydavo-12345`

### 4. Desplegar reglas de Firestore

```bash
firebase deploy --only firestore:rules
```

### 5. Desplegar reglas de Storage

```bash
firebase deploy --only storage:rules
```

### 6. Desplegar el sitio web

```bash
firebase deploy --only hosting
```

---

## Configurar firebase-config.js

Antes de desplegar, necesitas actualizar `firebase-config.js`:

### 1. Ve a Firebase Console

https://console.firebase.google.com/

### 2. Selecciona tu proyecto

### 3. Ve a Configuración del Proyecto

Haz clic en el ícono de engranaje (⚙️) → "Configuración del proyecto"

### 4. Scroll abajo hasta "Tus aplicaciones"

Si no tienes una app web, haz clic en el ícono `</>` para crear una.

### 5. Copia las credenciales

Verás algo como:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 6. Actualiza firebase-config.js

Abre `firebase-config.js` y reemplaza las líneas que dicen `"TU_..."` con tus valores reales.

---

## Crear Usuarios en Firebase Authentication

### 1. Ve a Authentication

En Firebase Console → Authentication

### 2. Habilita Email/Password

Pestaña "Sign-in method" → Email/Password → Activar → Guardar

### 3. Crea los usuarios

Pestaña "Users" → "Add user"

**Usuario 1 (Administrador):**
- Email: `jvallejo@timeline.com`
- Contraseña: (elige una segura)

**Usuario 2 (Visor):**
- Email: `bvega@timeline.com`
- Contraseña: (elige una segura)

---

## Comandos Útiles

### Ver el estado del proyecto

```bash
firebase projects:list
```

### Ver qué proyecto estás usando

```bash
firebase use
```

### Desplegar todo

```bash
firebase deploy
```

### Desplegar solo hosting

```bash
firebase deploy --only hosting
```

### Ver logs

```bash
firebase functions:log
```

### Abrir el proyecto en la consola

```bash
firebase open
```

---

## Conectar con Netlify (Después de Firebase)

Una vez que tengas todo funcionando en Firebase, puedes también desplegarlo en Netlify:

### 1. Instalar Netlify CLI

```bash
npm install -g netlify-cli
```

### 2. Login en Netlify

```bash
netlify login
```

### 3. Inicializar el proyecto

```bash
netlify init
```

### 4. Desplegar

```bash
netlify deploy --prod
```

**Nota:** Si usas Netlify, el proyecto funcionará de la misma forma porque Firebase (Auth, Firestore, Storage) se accede desde el navegador del usuario, no desde el servidor.

---

## Verificar que Todo Funciona

1. ✅ Firebase login exitoso
2. ✅ Proyecto seleccionado
3. ✅ `firebase-config.js` actualizado
4. ✅ Reglas de Firestore desplegadas
5. ✅ Reglas de Storage desplegadas
6. ✅ Usuarios creados en Authentication
7. ✅ Hosting desplegado

### Probar el sitio

Después de `firebase deploy --only hosting`, verás una URL como:

```
https://tu-proyecto.web.app
```

Abre esa URL y prueba:
- Login como `jvallejo`
- Login como `bvega`
- Subir fotos desde el Panel Admin

---

## Problemas Comunes

### "Error: Invalid project id"

→ Verifica que hayas ejecutado `firebase use [PROJECT-ID]`

### "Permission denied" al desplegar reglas

→ Verifica que tu cuenta tenga permisos de editor en el proyecto

### "Firebase config not found"

→ Asegúrate de estar en la carpeta correcta del proyecto

### El sitio no se actualiza

→ Limpia el caché del navegador (Ctrl+Shift+R o Cmd+Shift+R)

---

## URL Útiles

- **Firebase Console:** https://console.firebase.google.com/
- **Documentación Firebase:** https://firebase.google.com/docs
- **Netlify Dashboard:** https://app.netlify.com/

---

¿Necesitas ayuda? Revisa los logs:

```bash
firebase debug
```

