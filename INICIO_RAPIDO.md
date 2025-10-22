# 🎯 Inicio Rápido - 5 Minutos

## Lo que necesitas antes de empezar:

✅ Proyecto de Firebase ya creado (lo tienes)  
✅ Auth, Firestore y Storage activados (lo tienes)  
✅ 5 minutos de tiempo  

---

## 📋 Lista de verificación rápida:

### 1️⃣ Configurar credenciales (2 minutos)

**Obtén tus credenciales:**
1. Ve a: https://console.firebase.google.com/
2. Selecciona tu proyecto
3. Ícono engranaje ⚙️ → "Configuración del proyecto"
4. Scroll abajo → "Tus aplicaciones" → Ícono web `</>`
5. Copia el código `firebaseConfig`

**Actualiza el archivo:**
- Abre: `firebase-config.js`
- Reemplaza donde dice `"TU_..."` con tus valores
- Guarda

### 2️⃣ Crear usuarios (1 minuto)

**En Firebase Console:**
1. Ve a "Authentication" → pestaña "Sign-in method"
2. Activa "Email/Password" → Guardar
3. Pestaña "Users" → "Add user"
4. Crea estos dos usuarios:
   - `jvallejo@timeline.com` (tu contraseña)
   - `bvega@timeline.com` (tu contraseña)

### 3️⃣ Configurar Firestore (1 minuto)

1. Ve a "Firestore Database" → "Create database"
2. Modo producción → Elige ubicación → Enable
3. Pestaña "Rules" → Borra todo
4. Copia y pega el contenido de `firestore.rules`
5. Publish

### 4️⃣ Configurar Storage (1 minuto)

1. Ve a "Storage" → "Get started"
2. Modo producción → Misma ubicación → Done
3. Pestaña "Rules" → Borra todo
4. Copia y pega el contenido de `storage.rules`
5. Publish

### 5️⃣ Agregar imagen (30 segundos)

- Coloca una imagen llamada `login-image.jpg` en la carpeta `assets/`
- Si no tienes, déjalo así (se verá un gradiente bonito)

### 6️⃣ Probar (30 segundos)

- Abre `index.html` en tu navegador
- Login con `jvallejo` o `bvega`
- ¡Listo! 🎉

---

## 🚀 Desplegar a internet (Opcional)

Si quieres que esté online:

```bash
npm install -g firebase-tools
firebase login
cd /Users/javiervallejo/Documents/Websites/Bleixenydavo
firebase init hosting
# Responde: proyecto existente, directorio ".", No a SPA, No a sobrescribir
firebase deploy
```

---

## 🆘 ¿Problemas?

Consulta: `INSTRUCCIONES_CONFIGURACION.md` (guía detallada)

---

## 📝 Credenciales de acceso

**Administrador:**
- Usuario: `jvallejo`
- Email: `jvallejo@timeline.com`
- Contraseña: (la que configuraste)

**Visor:**
- Usuario: `bvega`
- Email: `bvega@timeline.com`
- Contraseña: (la que configuraste)

---

## ✨ Primeros pasos después de configurar:

1. Inicia sesión como `jvallejo`
2. Haz clic en "Panel Admin"
3. Selecciona "Agosto 2025"
4. Agrega un título, instrucciones y fotos
5. Guarda
6. Cierra sesión e inicia como `bvega` para ver cómo se ve

¡Disfruta! 🎊

