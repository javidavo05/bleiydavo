# 🚀 Instrucciones Paso a Paso - Configuración Firebase

## ✅ Paso 1: Configurar las credenciales de Firebase

### 1.1 Obtener las credenciales

1. Abre tu navegador y ve a: https://console.firebase.google.com/
2. Selecciona tu proyecto de Firebase
3. Haz clic en el ícono de **engranaje (⚙️)** al lado de "Descripción general del proyecto"
4. Selecciona **"Configuración del proyecto"**
5. Baja hasta la sección **"Tus aplicaciones"**
6. Si no tienes una aplicación web, haz clic en el ícono **`</>`** para crear una
7. Dale un nombre a tu app (por ejemplo: "Timeline Web")
8. **NO** marques Firebase Hosting todavía
9. Copia el código que aparece en `firebaseConfig`

### 1.2 Actualizar firebase-config.js

1. Abre el archivo `firebase-config.js` en tu editor
2. Reemplaza las líneas que dicen `"TU_..."` con tus valores reales
3. Debe quedar algo así:

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

4. Guarda el archivo

---

## ✅ Paso 2: Configurar Authentication

### 2.1 Habilitar autenticación por email

1. En Firebase Console, ve al menú lateral izquierdo
2. Haz clic en **"Authentication"** (o "Autenticación")
3. Haz clic en **"Get Started"** si es la primera vez
4. Ve a la pestaña **"Sign-in method"** (Método de acceso)
5. Haz clic en **"Email/Password"** (Correo electrónico/Contraseña)
6. **Activa** el primer switch (Email/Password)
7. Haz clic en **"Save"** (Guardar)

### 2.2 Crear los usuarios

1. Ve a la pestaña **"Users"** (Usuarios)
2. Haz clic en **"Add user"** (Agregar usuario)

**Primer usuario (Administrador):**
- Email: `jvallejo@timeline.com`
- Password: Elige una contraseña segura (ej: `Admin123!`)
- Haz clic en "Add user"

**Segundo usuario (Visor):**
- Email: `bvega@timeline.com`
- Password: Elige una contraseña segura (ej: `Viewer123!`)
- Haz clic en "Add user"

⚠️ **IMPORTANTE:** Anota estas contraseñas, las necesitarás para iniciar sesión.

---

## ✅ Paso 3: Configurar Cloud Firestore

### 3.1 Crear la base de datos

1. En Firebase Console, ve a **"Firestore Database"**
2. Haz clic en **"Create database"** (Crear base de datos)
3. Selecciona **"Start in production mode"** (Iniciar en modo de producción)
4. Elige la ubicación más cercana a ti (por ejemplo: `us-central`)
5. Haz clic en **"Enable"** (Habilitar)

### 3.2 Configurar las reglas de seguridad

1. Una vez creada la base de datos, ve a la pestaña **"Rules"** (Reglas)
2. **Borra todo** el contenido que aparece
3. Abre el archivo `firestore.rules` de tu proyecto
4. **Copia todo** el contenido del archivo
5. **Pega** el contenido en el editor de reglas de Firebase Console
6. Haz clic en **"Publish"** (Publicar)

Las reglas deberían verse así:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    ...
  }
}
```

---

## ✅ Paso 4: Configurar Storage

### 4.1 Crear el bucket de Storage

1. En Firebase Console, ve a **"Storage"**
2. Haz clic en **"Get started"** (Comenzar)
3. Te preguntará sobre las reglas, selecciona **"Start in production mode"**
4. Elige la misma ubicación que usaste para Firestore
5. Haz clic en **"Done"** (Listo)

### 4.2 Configurar las reglas de seguridad

1. Ve a la pestaña **"Rules"** (Reglas)
2. **Borra todo** el contenido que aparece
3. Abre el archivo `storage.rules` de tu proyecto
4. **Copia todo** el contenido del archivo
5. **Pega** el contenido en el editor de reglas de Firebase Console
6. Haz clic en **"Publish"** (Publicar)

---

## ✅ Paso 5: Agregar imagen de login

1. Busca una imagen bonita que quieras usar en la pantalla de login
2. Renómbrala a `login-image.jpg`
3. Copia la imagen a la carpeta `assets/` de tu proyecto
4. Si no tienes una imagen, puedes usar cualquier foto y el sistema la adaptará

---

## ✅ Paso 6: Probar localmente

### 6.1 Abrir el sitio

1. Ve a la carpeta de tu proyecto
2. Haz doble clic en `index.html` para abrirlo en tu navegador
3. O arrastra el archivo a una ventana de Chrome/Firefox/Safari

### 6.2 Probar el login

**Probar como administrador:**
1. Usuario: `jvallejo`
2. Contraseña: La que configuraste en el Paso 2.2
3. Deberías ver la timeline y un botón "Panel Admin"

**Probar como visor:**
1. Cierra sesión
2. Usuario: `bvega`
3. Contraseña: La que configuraste en el Paso 2.2
4. Deberías ver la timeline pero sin el botón "Panel Admin"
5. Los meses futuros estarán bloqueados

---

## ✅ Paso 7: Desplegar en Firebase Hosting

### 7.1 Instalar Firebase CLI

Abre tu terminal y ejecuta:

```bash
npm install -g firebase-tools
```

Si no tienes npm instalado, descarga Node.js desde: https://nodejs.org/

### 7.2 Iniciar sesión

```bash
firebase login
```

Se abrirá tu navegador para que inicies sesión con tu cuenta de Google.

### 7.3 Inicializar el proyecto

En la terminal, navega a la carpeta de tu proyecto:

```bash
cd /Users/javiervallejo/Documents/Websites/Bleixenydavo
```

Luego ejecuta:

```bash
firebase init hosting
```

Responde a las preguntas así:
- **Project Setup:** "Use an existing project" → Selecciona tu proyecto
- **Public directory:** Escribe `.` (punto) y presiona Enter
- **Single-page app:** `N` (No)
- **Sobrescribir index.html:** `N` (No)
- **Sobrescribir firebase.json:** `N` (No)

### 7.4 Desplegar

```bash
firebase deploy
```

Espera a que termine. Al final te dará una URL como:
```
Hosting URL: https://tu-proyecto.web.app
```

¡Ya está en línea! 🎉

---

## 🎯 Cómo usar el sitio

### Como Administrador (jvallejo)

1. Inicia sesión
2. Haz clic en **"Panel Admin"**
3. Selecciona un mes del menú lateral
4. Edita:
   - **Título del mes**: Un nombre descriptivo
   - **Instrucciones**: El mensaje que verá el visor
   - **Fotos**: Haz clic en "Seleccionar Fotos" para subir imágenes
5. Haz clic en **"Guardar Cambios"**
6. Las fotos se subirán automáticamente a Firebase Storage
7. Puedes eliminar fotos haciendo clic en la **X** roja

### Como Visor (bvega)

1. Inicia sesión
2. Verás la timeline con 13 meses
3. Los meses con 🔒 están bloqueados (aún no es día 23)
4. Los meses desbloqueados muestran:
   - Título
   - Vista previa de fotos
   - Botón "Ver Detalles"
5. Haz clic en "Ver Detalles" para ver:
   - Título completo
   - Instrucciones
   - Galería completa de fotos

---

## 📅 Fechas de desbloqueo

Cada mes se desbloquea automáticamente a las **00:00 horas del día 23**:

- Agosto 2025: 23 de agosto, 2025 00:00
- Septiembre 2025: 23 de septiembre, 2025 00:00
- Octubre 2025: 23 de octubre, 2025 00:00
- ... y así sucesivamente hasta agosto 2026

El administrador puede ver y editar **todos los meses siempre**, independientemente de la fecha.

---

## 🔧 Solución de problemas comunes

### Error: "Firebase not defined"
- Verifica que hayas actualizado `firebase-config.js` con tus credenciales reales

### No puedo iniciar sesión
- Verifica que hayas creado los usuarios en Authentication
- Verifica que estés usando los emails exactos: `jvallejo@timeline.com` y `bvega@timeline.com`
- Verifica que la contraseña sea correcta

### Las fotos no se suben
- Verifica que hayas configurado Storage en Firebase Console
- Verifica que hayas publicado las reglas de Storage (`storage.rules`)
- Verifica que estés iniciando sesión como `jvallejo` (admin)

### Los meses no se guardan
- Verifica que hayas configurado Firestore en Firebase Console
- Verifica que hayas publicado las reglas de Firestore (`firestore.rules`)

### Página en blanco al abrir
- Abre la consola del navegador (F12) y revisa si hay errores
- Verifica que todos los archivos estén en el mismo directorio
- Verifica que `firebase-config.js` tenga las credenciales correctas

---

## 📞 ¿Necesitas ayuda?

Si algo no funciona:
1. Abre la consola del navegador (F12) y revisa los errores
2. Verifica cada paso de esta guía
3. Asegúrate de haber publicado las reglas de Firestore y Storage
4. Verifica que los usuarios existan en Authentication

---

## ✨ ¡Listo!

Tu timeline especial está configurada y lista para usar. El usuario administrador puede preparar todo el contenido para los próximos meses, y el visor irá descubriendo el contenido mes a mes. 🎉

