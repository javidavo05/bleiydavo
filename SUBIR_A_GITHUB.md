# 🚀 Subir Proyecto a GitHub y Netlify

## ✅ PASO 1: Crear Repositorio en GitHub

### Opción A: Desde GitHub.com (Recomendado)

1. **Ve a:** https://github.com/new
2. **Nombre del repositorio:** `timeline-romantica`
3. **Descripción:** "Timeline romántica interactiva con Firebase - Desbloqueo mensual automático"
4. **Visibilidad:** Public (o Private si prefieres)
5. **NO marques:** "Add a README file" (ya tienes uno)
6. **NO marques:** "Add .gitignore" (ya tienes uno)
7. **Click:** "Create repository"

### Opción B: Desde Terminal (si tienes GitHub CLI)

```bash
gh repo create timeline-romantica --public --description "Timeline romántica interactiva con Firebase"
```

---

## ✅ PASO 2: Conectar y Subir

Después de crear el repo en GitHub, ejecuta estos comandos:

```bash
# Agregar el repositorio remoto (reemplaza TU_USUARIO)
git remote add origin https://github.com/TU_USUARIO/timeline-romantica.git

# Cambiar a rama main
git branch -M main

# Subir el código
git push -u origin main
```

**Reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub**

---

## ✅ PASO 3: Conectar con Netlify

### Opción A: Desde Netlify.com (Más Fácil)

1. **Ve a:** https://app.netlify.com/
2. **Click:** "New site from Git"
3. **Selecciona:** GitHub
4. **Autoriza** Netlify si es necesario
5. **Busca:** `timeline-romantica`
6. **Selecciona** el repositorio
7. **Configuración:**
   - **Build command:** (dejar vacío)
   - **Publish directory:** `.` (punto)
   - **Click:** "Deploy site"

### Opción B: Desde Terminal

```bash
# Login en Netlify
netlify login

# Inicializar el proyecto
netlify init

# Desplegar
netlify deploy --prod
```

---

## 🎯 CONFIGURACIÓN DE NETLIFY

### Variables de Entorno (Opcional)

Si quieres usar variables de entorno:

1. **Netlify Dashboard** → Tu sitio → **Site settings** → **Environment variables**
2. **Agregar:**
   - `FIREBASE_API_KEY` = tu API key
   - `FIREBASE_AUTH_DOMAIN` = tu auth domain
   - etc.

### Configuración de Build

En `netlify.toml` ya está configurado:
- ✅ Redirecciones a `index.html`
- ✅ Headers de caché
- ✅ Configuración de SPA

---

## 📋 CHECKLIST COMPLETO

### GitHub:
- [ ] Repositorio creado en GitHub
- [ ] Código subido con `git push`
- [ ] README visible en GitHub

### Netlify:
- [ ] Sitio conectado desde GitHub
- [ ] Deploy automático funcionando
- [ ] URL de Netlify funcionando
- [ ] Firebase funcionando en Netlify

### Verificación:
- [ ] https://tu-sitio.netlify.app funciona
- [ ] Login funciona
- [ ] Panel admin funciona
- [ ] Subir imágenes funciona

---

## 🔄 DESPLIEGUE AUTOMÁTICO

Una vez conectado:

- ✅ **Push a GitHub** → Deploy automático en Netlify
- ✅ **Cambios en Firebase** → Se reflejan en Netlify
- ✅ **Dos URLs funcionando:**
  - Firebase: https://bleixenydavo.web.app
  - Netlify: https://tu-sitio.netlify.app

---

## 🎉 RESULTADO FINAL

Tendrás:
1. **Repositorio en GitHub** con todo el código
2. **Deploy automático** en Netlify
3. **Dos sitios funcionando** (Firebase + Netlify)
4. **Control de versiones** con Git
5. **Backup completo** en la nube

---

## 📞 COMANDOS ÚTILES

```bash
# Ver estado
git status

# Agregar cambios
git add .
git commit -m "Descripción del cambio"
git push

# Ver logs de Netlify
netlify logs

# Abrir sitio en Netlify
netlify open
```

---

**¿Listo para crear el repo en GitHub?** 🚀
