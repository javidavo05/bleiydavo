# 🔍 Diagnóstico del Error

## ❌ ERROR ACTUAL:
```
auth/invalid-credential
```

**Significa:** La contraseña o el email están INCORRECTOS en Firebase.

---

## 🎯 VERIFICACIÓN INMEDIATA

### Paso 1: Verifica que el usuario existe

1. Abre: https://console.firebase.google.com/project/bleixenydavo/authentication/users

2. **VERIFICA QUE VEAS:**
   - ✅ Un usuario con email: `jvallejo@timeline.com`
   - ✅ Estado: Enabled (no disabled)

3. **Si NO lo ves:**
   - Créalo AHORA mismo
   - Email: `jvallejo@timeline.com`
   - Password: `admin123`

---

### Paso 2: Asegúrate de la contraseña

**IMPORTANTE:** Cuando creaste el usuario, ¿pusiste EXACTAMENTE:
```
admin123
```

**SIN:**
- ❌ Espacios antes o después
- ❌ Mayúsculas (Admin123)
- ❌ Números diferentes

**Debe ser EXACTAMENTE:** `admin123` (todo minúsculas)

---

## 🔧 SOLUCIÓN RÁPIDA

### Opción 1: Resetear contraseña manualmente

1. Ve a: https://console.firebase.google.com/project/bleixenydavo/authentication/users

2. Click en el usuario `jvallejo@timeline.com`

3. Busca el campo **"Password"** 

4. Click en **"Set password"** o el ícono de editar (✏️)

5. Escribe EXACTAMENTE: `admin123`

6. **Copia y pega** para asegurarte: `admin123`

7. Guarda

8. Espera 10 segundos

9. Prueba login de nuevo

---

### Opción 2: Usar Email/Password directamente

Vamos a probar si el problema es con el username mapping.

**Prueba esto en tu sitio:**
- Usuario: `jvallejo@timeline.com` (el EMAIL COMPLETO)
- Contraseña: `admin123`

Si esto funciona, el problema es con el código que convierte `jvallejo` → `jvallejo@timeline.com`

---

### Opción 3: Crear usuario desde la terminal

Vamos a usar Firebase CLI para asegurarnos:

```bash
# NO EJECUTES ESTO TODAVÍA - primero prueba Opción 1
```

---

## 📸 NECESITO QUE HAGAS ESTO

Ve a Firebase Console → Authentication → Users

Toma una captura de pantalla (o dime):

1. ¿Cuántos usuarios ves?
2. ¿El email es exactamente `jvallejo@timeline.com`?
3. ¿Dice "Enabled" o "Disabled"?
4. ¿Hay alguna fecha en "Last sign-in"?

---

## 🧪 PRUEBA ALTERNATIVA

Vamos a probar con un usuario completamente nuevo:

### En Firebase Console:

1. Crea un usuario nuevo:
   - Email: `admin@bleixenydavo.com`
   - Password: `123456`

2. Copia esta contraseña EXACTA: `123456`

### En tu código:

NO vamos a modificar código todavía. Primero prueba con el email completo.

---

## ⚠️ POSIBLES CAUSAS

1. **Contraseña incorrecta:** La que pusiste NO es `admin123`
2. **Usuario no existe:** No se creó correctamente
3. **Email equivocado:** El email no es exactamente `jvallejo@timeline.com`
4. **Espacios extra:** Copiaste/pegaste con espacios

---

## 🎯 HAZ ESTO AHORA (EN ORDEN):

### 1. Verifica el usuario existe:
https://console.firebase.google.com/project/bleixenydavo/authentication/users

### 2. Click en el usuario `jvallejo@timeline.com`

### 3. Click "Set password" y pon: `admin123`

### 4. COPIA esta contraseña para usarla: `admin123`

### 5. Espera 10 segundos

### 6. Abre ventana incógnita

### 7. Ve a: https://bleixenydavo.web.app

### 8. Prueba:
```
Usuario: jvallejo
Contraseña: admin123 (pégala desde aquí)
```

### 9. Si SIGUE fallando, prueba con el EMAIL COMPLETO:
```
Usuario: jvallejo@timeline.com
Contraseña: admin123
```

---

## 📞 DIME:

1. ¿El usuario `jvallejo@timeline.com` existe en Firebase? (SÍ/NO)
2. ¿Qué contraseña pusiste EXACTAMENTE? (escríbela)
3. ¿Ya probaste con el EMAIL COMPLETO (`jvallejo@timeline.com`) en vez de solo `jvallejo`?
4. ¿Qué pasó cuando lo intentaste?

---

**PRUEBA AHORA Y DIME LOS RESULTADOS** 🔍

