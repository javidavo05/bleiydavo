# 🔧 Solución: Configurar bleiydavo.com en Netlify

## ❌ PROBLEMA ACTUAL:
- `bleiydavo.com` no está en Netlify
- DNS apunta a una IP que no tiene sitio
- Necesitamos crear el sitio y configurar DNS

---

## ✅ SOLUCIÓN PASO A PASO:

### PASO 1: Crear Sitio en Netlify

1. **Ve a:** https://app.netlify.com/
2. **"New site from Git"**
3. **Selecciona:** GitHub
4. **Autoriza** Netlify si es necesario
5. **Busca:** `bleiydavo` (tu repo)
6. **Selecciona** el repositorio
7. **Configuración:**
   - Build command: (vacío)
   - Publish directory: `.`
8. **"Deploy site"**

### PASO 2: Obtener URL de Netlify

Después del deploy, Netlify te dará una URL como:
- `https://bleiydavo-123456.netlify.app`
- O `https://bleiydavo.netlify.app`

**¡Anota esta URL!**

### PASO 3: Agregar Dominio Personalizado

1. **En tu sitio de Netlify** → **"Domain settings"**
2. **"Add custom domain"**
3. **Ingresa:** `bleiydavo.com`
4. **Click:** "Verify"

### PASO 4: Netlify te dará las instrucciones DNS

Te mostrará algo como:
```
A Record: @ → 75.2.60.5
CNAME: www → bleiydavo.netlify.app
```

**¡Anota estos valores!**

### PASO 5: Configurar DNS en Namecheap

1. **Ve a:** https://www.namecheap.com/
2. **Login** → **"Domain List"**
3. **"Manage"** de `bleiydavo.com`
4. **"Advanced DNS"**

#### Configurar estos registros:

**Eliminar registros existentes:**
- Elimina cualquier A Record de `@`
- Elimina cualquier CNAME de `www`

**Agregar nuevos registros:**

```
Type: A Record
Host: @
Value: [IP que te dio Netlify]
TTL: Automatic

Type: CNAME Record
Host: www
Value: [subdomain que te dio Netlify]
TTL: Automatic
```

### PASO 6: Esperar Propagación

- ⏰ **Tiempo:** 5-60 minutos
- 🔍 **Verificar:** Netlify te dirá cuando esté listo
- ✅ **Estado:** "Verified" en Netlify

---

## 🎯 ALTERNATIVA RÁPIDA:

### Si quieres usar la URL de Netlify directamente:

1. **Crea el sitio** en Netlify (Paso 1)
2. **Usa la URL** que te dé Netlify temporalmente
3. **Configura el dominio** después

**URL temporal será algo como:**
- `https://bleiydavo-123456.netlify.app`

---

## 📋 CHECKLIST:

- [ ] Sitio creado en Netlify
- [ ] URL de Netlify funcionando
- [ ] Dominio agregado en Netlify
- [ ] DNS configurado en Namecheap
- [ ] Propagación DNS completada
- [ ] https://bleiydavo.com funcionando

---

## 🚀 EMPEZAR AHORA:

**PASO 1:** Ve a https://app.netlify.com/ y crea el sitio desde GitHub

**PASO 2:** Una vez que tengas la URL de Netlify, dime y te guío para configurar el DNS

---

**¿Listo para crear el sitio en Netlify?** 🚀
