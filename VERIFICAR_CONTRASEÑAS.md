# 🔑 Verificar y Resetear Contraseñas

## ✅ CAMBIOS APLICADOS

El sitio ahora muestra **mensajes de error claros**:

- 🔑 "Contraseña incorrecta" → Si la contraseña está mal
- ❌ "Usuario no válido" → Si el usuario no existe
- 🚫 "Demasiados intentos" → Si Firebase te bloqueó temporalmente
- 👤 "Usuario no encontrado" → Si el usuario no está creado en Firebase

---

## 🎯 CÓMO VERIFICAR TUS CONTRASEÑAS

### Paso 1: Ve a Firebase Console

👉 **https://console.firebase.google.com/project/bleixenydavo/authentication/users**

### Paso 2: Verifica que existan los usuarios

Deberías ver dos usuarios:
- ✅ `jvallejo@timeline.com`
- ✅ `bvega@timeline.com`

Si **NO** los ves, créalos:
1. Click "Add user"
2. Email: `jvallejo@timeline.com`
3. Contraseña: (elige una simple como `admin123`)
4. Click "Add user"
5. Repite para `bvega@timeline.com`

---

## 🔄 RESETEAR CONTRASEÑAS

Si no recuerdas las contraseñas:

### Opción 1: Resetear desde Firebase Console

1. Ve a: https://console.firebase.google.com/project/bleixenydavo/authentication/users
2. Click en el usuario (ej: `jvallejo@timeline.com`)
3. Click en los 3 puntos verticales (⋮)
4. Click "Reset password"
5. **Anota la nueva contraseña** que Firebase te da
6. Úsala para el login

### Opción 2: Cambiar contraseña manualmente

1. Ve a: https://console.firebase.google.com/project/bleixenydavo/authentication/users
2. Click en el usuario
3. Click en "Set password"
4. Ingresa una nueva contraseña (ej: `admin123`)
5. Guarda
6. Úsala para el login

---

## 🎯 CÓMO HACER LOGIN CORRECTAMENTE

### En la página web: https://bleixenydavo.web.app

**Para el Administrador:**
```
Usuario: jvallejo
Contraseña: [la que configuraste en Firebase]
```

**Para el Visor:**
```
Usuario: bvega
Contraseña: [la que configuraste en Firebase]
```

⚠️ **IMPORTANTE:** 
- **NO** uses `jvallejo@timeline.com` como usuario
- Usa **SOLO** `jvallejo` (sin el @timeline.com)
- El sistema automáticamente lo convierte al email correcto

---

## 🧪 PRUEBA CON CONTRASEÑAS SIMPLES (Para Testing)

Te recomiendo usar contraseñas simples durante las pruebas:

**En Firebase Console:**
- `jvallejo@timeline.com` → Contraseña: `admin123`
- `bvega@timeline.com` → Contraseña: `viewer123`

**En el sitio web:**
- Usuario: `jvallejo` / Contraseña: `admin123`
- Usuario: `bvega` / Contraseña: `viewer123`

Luego puedes cambiarlas por contraseñas más seguras.

---

## 📋 VERIFICACIÓN PASO A PASO

### 1. Verifica que los usuarios existen
```
✅ Ve a Firebase Console → Authentication → Users
✅ Debe haber 2 usuarios
```

### 2. Resetea las contraseñas si es necesario
```
✅ Click en cada usuario → Reset password
✅ Anota las nuevas contraseñas
```

### 3. Limpia el caché del navegador
```
✅ Presiona Cmd + Shift + R (Mac)
✅ O Ctrl + Shift + R (Windows)
```

### 4. Prueba el login
```
✅ Ve a: https://bleixenydavo.web.app
✅ Usuario: jvallejo
✅ Contraseña: [la que acabas de configurar]
```

### 5. Verifica los mensajes de error
```
✅ Si la contraseña está mal, verás: "🔑 Contraseña incorrecta"
✅ Si el usuario está mal, verás: "❌ Usuario no válido"
✅ Si hay bloqueo temporal, verás: "🚫 Demasiados intentos fallidos"
```

---

## 🔍 DEBUGGING

Si sigue sin funcionar:

### 1. Abre la Consola del Navegador (F12)
- Ve a la pestaña "Console"
- Busca errores en rojo
- Pégalos aquí para ayudarte

### 2. Verifica la Consola de Firebase
- Ve a: https://console.firebase.google.com/project/bleixenydavo/authentication/providers
- Verifica que "Email/Password" esté **ACTIVADO**

### 3. Verifica las reglas de Firestore
- Ve a: https://console.firebase.google.com/project/bleixenydavo/firestore/rules
- Deberían estar publicadas y sin errores

---

## 🎯 SOLUCIÓN RÁPIDA (Si nada funciona)

Elimina y recrea los usuarios:

1. **Eliminar usuarios existentes:**
   - Firebase Console → Authentication → Users
   - Click en cada usuario → Delete user

2. **Crear usuarios nuevos:**
   ```
   Usuario 1:
   - Email: jvallejo@timeline.com
   - Contraseña: admin123
   
   Usuario 2:
   - Email: bvega@timeline.com
   - Contraseña: viewer123
   ```

3. **Probar login:**
   - https://bleixenydavo.web.app
   - Usuario: `jvallejo`
   - Contraseña: `admin123`

---

## 📱 PROBAR EN MODO INCÓGNITO

Si hay bloqueo por "too-many-requests":

1. Abre ventana incógnita:
   - Chrome/Edge: `Cmd + Shift + N`
   - Firefox: `Cmd + Shift + P`
   - Safari: File → New Private Window

2. Ve a: https://bleixenydavo.web.app

3. Intenta login con las credenciales correctas

---

## ✅ CHECKLIST FINAL

Antes de intentar login de nuevo:

- [ ] Usuarios creados en Firebase Authentication
- [ ] Contraseñas reseteadas/conocidas
- [ ] Caché del navegador limpiado (Cmd+Shift+R)
- [ ] Sitio actualizado (https://bleixenydavo.web.app)
- [ ] Usando `jvallejo` (NO jvallejo@timeline.com)
- [ ] Probando en modo incógnito si hay bloqueo

---

## 🎉 AHORA PRUEBA

1. **Limpia el caché:** Cmd + Shift + R
2. **Ve a:** https://bleixenydavo.web.app
3. **Ingresa:**
   - Usuario: `jvallejo`
   - Contraseña: [la que configuraste]
4. **Observa el mensaje de error** (si hay)
5. **Pégame el mensaje** y te ayudo

---

**Los mensajes de error ahora son claros y te dirán exactamente qué está mal.** 🎯

