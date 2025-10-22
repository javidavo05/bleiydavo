# 🧪 Prueba de Login - Paso a Paso

## ✅ Lo que hiciste
- ✅ Eliminaste el usuario anterior
- ✅ Creaste nuevo usuario con contraseña: `admin123`

---

## 🎯 AHORA PRUEBA ESTO

### Paso 1: Limpia el caché completamente

**Opción A - Limpieza rápida:**
```
Cmd + Shift + R (Mac)
Ctrl + Shift + R (Windows)
```

**Opción B - Limpieza profunda:**
1. Presiona F12 (abre Developer Tools)
2. Click derecho en el botón de recargar (⟳)
3. Selecciona "Empty Cache and Hard Reload"

---

### Paso 2: Abre el sitio en MODO INCÓGNITO

Esto asegura que no haya caché ni cookies viejas.

**Chrome/Edge:**
```
Cmd + Shift + N (Mac)
Ctrl + Shift + N (Windows)
```

**Firefox:**
```
Cmd + Shift + P (Mac)
Ctrl + Shift + P (Windows)
```

**Safari:**
```
File → New Private Window
```

---

### Paso 3: Ve al sitio

En la ventana incógnita, abre:
```
https://bleixenydavo.web.app
```

---

### Paso 4: Intenta login

```
Usuario: jvallejo
Contraseña: admin123
```

⚠️ **IMPORTANTE:**
- NO uses "jvallejo@timeline.com"
- Usa SOLO "jvallejo"

---

### Paso 5: Abre la Consola (F12)

Antes de hacer login:
1. Presiona F12
2. Ve a la pestaña "Console"
3. Luego haz login
4. Observa qué mensajes aparecen

---

## 📋 Posibles Resultados

### ✅ SI FUNCIONA:
- Entrarás al dashboard
- Verás la timeline con los 13 meses
- Verás botón "Panel Admin"
- 🎉 ¡ÉXITO!

### ❌ SI FALLA:
Verás uno de estos mensajes en PANTALLA (no en consola):

1. **"🔑 Contraseña incorrecta"**
   → La contraseña está mal
   → Resetéala de nuevo en Firebase
   
2. **"❌ Usuario no válido"**
   → Escribiste mal el usuario
   → Debe ser exactamente: `jvallejo`
   
3. **"❌ Usuario no encontrado"**
   → El usuario no existe en Firebase
   → Créalo de nuevo

4. **"🚫 Demasiados intentos fallidos"**
   → Espera 30 minutos o prueba en otro navegador

---

## 🔍 QUÉ REVISAR EN LA CONSOLA

### Mensajes NORMALES (ignóralos):
- ❌ chrome-extension errors
- ❌ content_script.js errors
- ❌ Failed to load resource: chrome-extension

Estos son de extensiones del navegador, no del sitio.

### Mensajes IMPORTANTES (dime si ves estos):
- ✅ "Error de login:" seguido de algún mensaje
- ✅ "FirebaseError:" seguido de algún mensaje
- ✅ Cualquier cosa que diga "auth/"

---

## 📸 COPIA Y PÉGAME

Después de intentar login, cópiame:

1. **El mensaje que ves EN PANTALLA** (no en consola)
2. **Cualquier línea en la consola que diga "Error de login:"**
3. **Cualquier línea que diga "FirebaseError:"**

---

## 🎯 VERIFICACIÓN PREVIA

Antes de probar, verifica que:

- [ ] Usuario creado en Firebase: `jvallejo@timeline.com` ✓
- [ ] Contraseña: `admin123` ✓
- [ ] Email/Password activado en Firebase ✓
- [ ] Pruebas en modo incógnito ✓
- [ ] Usando usuario: `jvallejo` (sin @timeline.com) ✓

---

## 🔧 SI SIGUE FALLANDO

Prueba esto:

### Crear usuario de prueba diferente:

1. En Firebase Console, crea:
   - Email: `test@timeline.com`
   - Password: `test123`

2. Edita `firebase-config.js` línea 21-32, agrega:
```javascript
'test': {
    email: 'test@timeline.com',
    role: 'admin',
    displayName: 'Test User'
}
```

3. Despliega:
```bash
firebase deploy --only hosting
```

4. Prueba con usuario: `test` / password: `test123`

---

## 📞 NECESITO QUE ME DIGAS

1. ¿Qué mensaje ves EN PANTALLA cuando intentas login?
2. ¿Qué dice la consola? (copia las líneas que digan "Error" o "Firebase")
3. ¿Lo estás probando en modo incógnito?
4. ¿Estás usando `jvallejo` o `jvallejo@timeline.com`?

---

**AHORA PRUEBA Y DIME QUÉ PASA** 🚀

