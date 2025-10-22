# 🔓 Solucionar Bloqueo de Firebase Authentication

## 🚨 Error: "too-many-requests"

Este error aparece cuando Firebase detecta muchos intentos de login fallidos y bloquea temporalmente tu dispositivo como medida de seguridad.

---

## ✅ SOLUCIONES (en orden de rapidez)

### Solución 1: Desactivar Protección Temporal (RECOMENDADO)

1. Ve a: https://console.firebase.google.com/project/bleixenydavo/authentication/settings

2. Scroll abajo hasta **"User account management"**

3. Busca **"Email enumeration protection"**

4. **DESACTÍVALA** (cambia el switch a OFF)

5. Guarda los cambios

6. Espera 1-2 minutos

7. Intenta login de nuevo en: https://bleixenydavo.web.app

---

### Solución 2: Esperar (Sin hacer nada)

- El bloqueo es temporal
- Usualmente se levanta en **1-2 horas**
- No necesitas hacer nada, solo esperar

---

### Solución 3: Cambiar de Dispositivo/Red

- Prueba desde otro navegador (Chrome → Firefox)
- Prueba en modo incógnito
- Prueba desde tu móvil
- Prueba desde otra red WiFi

---

### Solución 4: Resetear contraseña

1. Ve a: https://console.firebase.google.com/project/bleixenydavo/authentication/users

2. Encuentra el usuario `jvallejo@timeline.com`

3. Click en el menú de 3 puntos (⋮)

4. Selecciona "Reset password"

5. Firebase te dará una nueva contraseña temporal

6. Intenta login con esa nueva contraseña

---

## 🔍 ¿Por qué pasó esto?

Posibles razones:
- ❌ Usuario/contraseña incorrectos múltiples veces
- ❌ Intentaste con diferentes combinaciones
- ❌ Pruebas repetidas en poco tiempo
- ❌ Firebase es muy estricto con la seguridad

---

## ✅ VERIFICAR LAS CREDENCIALES CORRECTAS

### Para el Login en la Web:

**Administrador:**
- ❌ NO uses: `jvallejo@timeline.com` (esto es el EMAIL)
- ✅ USA: `jvallejo` (solo el username)
- Contraseña: (la que configuraste en Firebase)

**Visor:**
- ❌ NO uses: `bvega@timeline.com` (esto es el EMAIL)
- ✅ USA: `bvega` (solo el username)
- Contraseña: (la que configuraste en Firebase)

El sistema automáticamente convierte:
- `jvallejo` → `jvallejo@timeline.com`
- `bvega` → `bvega@timeline.com`

---

## 🎯 PASOS DESPUÉS DE DESBLOQUEAR

1. Abre: https://bleixenydavo.web.app

2. En la pantalla de login:
   - Usuario: `jvallejo` (sin @timeline.com)
   - Contraseña: (la que configuraste)

3. Si no funciona, verifica la contraseña en Firebase Console:
   - https://console.firebase.google.com/project/bleixenydavo/authentication/users
   - Resetea la contraseña si es necesario

---

## 🔄 MIENTRAS ESPERAS...

Si no quieres esperar 1-2 horas, puedes:

### Probar en modo incógnito:

**Chrome/Edge:**
- Mac: `Cmd + Shift + N`
- Windows: `Ctrl + Shift + N`

**Firefox:**
- Mac: `Cmd + Shift + P`
- Windows: `Ctrl + Shift + P`

**Safari:**
- Menu → File → New Private Window

Luego ve a: https://bleixenydavo.web.app

---

## 📱 Probar desde Móvil

El bloqueo es por dispositivo, así que:
1. Abre https://bleixenydavo.web.app en tu móvil
2. Prueba el login ahí
3. Si funciona, el problema es temporal en tu computadora

---

## 🆘 Si NADA Funciona

Puedes crear usuarios de prueba nuevos:

1. Ve a Firebase Console → Authentication → Users
2. Crea: `test@timeline.com` con contraseña simple
3. Edita `firebase-config.js` y agrega:

```javascript
'test': {
    email: 'test@timeline.com',
    role: 'admin',
    displayName: 'Test User'
}
```

4. Guarda y ejecuta: `firebase deploy --only hosting`
5. Intenta con usuario: `test`

---

## 📊 MONITOREAR INTENTOS

Para ver cuántos intentos fallidos hay:

1. Firebase Console → Authentication
2. Click en el usuario
3. Ve el historial de "Sign-in activity"

---

## 🔐 PREVENIR EN EL FUTURO

1. **Anota bien las contraseñas** en un lugar seguro
2. **Prueba una vez** con cada combinación
3. Si no funciona a la primera, **verifica la contraseña** antes de reintentar
4. Usa contraseñas simples en desarrollo (ej: `admin123`)

---

## ✅ CHECKLIST

- [ ] Desactivar "Email enumeration protection" en Firebase
- [ ] Esperar 1-2 minutos
- [ ] Intentar login con usuario: `jvallejo` (NO jvallejo@timeline.com)
- [ ] Si falla, resetear contraseña en Firebase Console
- [ ] Si sigue fallando, probar en modo incógnito
- [ ] Si sigue fallando, esperar 1-2 horas

---

## 🎯 RESUMEN RÁPIDO

**MEJOR SOLUCIÓN (1 minuto):**

1. https://console.firebase.google.com/project/bleixenydavo/authentication/settings
2. Desactiva "Email enumeration protection"
3. Espera 2 minutos
4. Intenta de nuevo

**O simplemente espera 1-2 horas y se desbloqueará solo.**

---

¿Necesitas ayuda? Revisa que estés usando:
- Usuario: `jvallejo` (sin @timeline.com)
- Contraseña: (exactamente como la configuraste)

