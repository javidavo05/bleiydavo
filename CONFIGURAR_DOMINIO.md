# 🌐 Configurar Dominio Personalizado bleiydavo.com

## ✅ PASO 1: Configurar en Netlify

### 1.1 Agregar Dominio Personalizado

1. **Ve a:** https://app.netlify.com/
2. **Selecciona** tu sitio (bleiydavo)
3. **Ve a:** "Domain settings" o "Custom domains"
4. **Click:** "Add custom domain"
5. **Ingresa:** `bleiydavo.com`
6. **Click:** "Verify"

### 1.2 Configurar Subdominio www (Opcional)

También agrega:
- `www.bleiydavo.com`

Netlify te dará las opciones de DNS que necesitas.

---

## ✅ PASO 2: Configurar DNS en Namecheap

### 2.1 Acceder a Namecheap

1. **Ve a:** https://www.namecheap.com/
2. **Login** con tu cuenta
3. **Ve a:** "Domain List"
4. **Click** en "Manage" de `bleiydavo.com`

### 2.2 Configurar DNS Records

En la sección "Advanced DNS", agrega estos registros:

#### **Registro A (Principal)**
```
Type: A Record
Host: @
Value: [IP de Netlify - te la dará Netlify]
TTL: Automatic
```

#### **Registro CNAME (www)**
```
Type: CNAME Record
Host: www
Value: [subdomain de Netlify - te la dará Netlify]
TTL: Automatic
```

#### **Registro CNAME (Netlify)**
```
Type: CNAME Record
Host: [subdomain que te dé Netlify]
Value: [target de Netlify]
TTL: Automatic
```

---

## ✅ PASO 3: Verificar en Netlify

### 3.1 Esperar Propagación DNS

- ⏰ **Tiempo:** 5-60 minutos
- 🔍 **Verificar:** Netlify te dirá cuando esté listo
- ✅ **Estado:** "Verified" en Netlify

### 3.2 Configurar HTTPS

1. **Netlify** → **Domain settings**
2. **HTTPS** → **"Enable HTTPS"**
3. **SSL Certificate** → Automático (Let's Encrypt)

---

## ✅ PASO 4: Configurar Deploy Automático

### 4.1 Conectar GitHub (si no está conectado)

1. **Netlify** → **Site settings** → **Build & deploy**
2. **Continuous Deployment** → **Link to Git**
3. **Selecciona:** GitHub → `bleiydavo`
4. **Configuración:**
   - Build command: (vacío)
   - Publish directory: `.`
   - Deploy branch: `main`

### 4.2 Configurar Deploy Hooks (Opcional)

Para deploy manual:
1. **Netlify** → **Site settings** → **Build & deploy**
2. **Deploy hooks** → **Add deploy hook**
3. **Copia** la URL del hook

---

## 🚀 FLUJO DE TRABAJO COMPLETO

### Para hacer cambios:

```bash
# 1. Hacer cambios en tu código
# 2. Commit y push a GitHub
git add .
git commit -m "Descripción del cambio"
git push

# 3. Netlify detecta el cambio automáticamente
# 4. Deploy automático en 1-2 minutos
# 5. Cambios visibles en bleiydavo.com
```

---

## 📋 CONFIGURACIÓN FINAL

### URLs que tendrás:

1. **Dominio principal:** https://bleiydavo.com ✅
2. **www:** https://www.bleiydavo.com ✅
3. **Netlify:** https://bleiydavo.netlify.app ✅
4. **Firebase:** https://bleixenydavo.web.app ✅

### Configuración DNS en Namecheap:

```
@ (A Record) → IP de Netlify
www (CNAME) → bleiydavo.netlify.app
```

---

## 🔧 COMANDOS ÚTILES

### Verificar DNS:
```bash
# Verificar que apunta a Netlify
nslookup bleiydavo.com
dig bleiydavo.com
```

### Deploy manual:
```bash
# Si tienes Netlify CLI
netlify deploy --prod
```

---

## ⚠️ IMPORTANTE

### Antes de cambiar DNS:
1. ✅ **Asegúrate** que Netlify esté funcionando
2. ✅ **Verifica** que el sitio carga en la URL de Netlify
3. ✅ **Prueba** login y funcionalidades

### Después de cambiar DNS:
1. ⏰ **Espera** 5-60 minutos para propagación
2. 🔍 **Verifica** que https://bleiydavo.com funciona
3. 🔒 **Confirma** que HTTPS está activo
4. 🧪 **Prueba** todas las funcionalidades

---

## 🎯 RESULTADO FINAL

Tendrás:
- 🌐 **Dominio personalizado:** bleiydavo.com
- 🔒 **HTTPS automático** con certificado SSL
- ⚡ **Deploy automático** desde GitHub
- 🔄 **Sincronización** en tiempo real
- 📱 **CDN global** de Netlify

---

**¿Listo para configurar el dominio? Empezamos con Netlify.** 🚀
