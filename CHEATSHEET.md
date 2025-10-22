# 🚀 Cheatsheet - Referencia Rápida

## 📝 Credenciales de Acceso

### Administrador
```
Usuario: jvallejo
Email: jvallejo@timeline.com
Contraseña: [la que configuraste]
```

### Visor
```
Usuario: bvega
Email: bvega@timeline.com
Contraseña: [la que configuraste]
```

---

## ⚡ Comandos Firebase

### Desplegar sitio
```bash
firebase deploy
```

### Solo hosting
```bash
firebase deploy --only hosting
```

### Ver logs
```bash
firebase functions:log
```

### Abrir consola
```bash
firebase open
```

---

## 📂 Archivos Importantes

| Archivo | Para qué sirve |
|---------|----------------|
| `firebase-config.js` | Credenciales de Firebase (¡EDITAR PRIMERO!) |
| `firestore.rules` | Copiar a Firebase Console → Firestore → Rules |
| `storage.rules` | Copiar a Firebase Console → Storage → Rules |
| `index.html` | Página principal (no editar si no sabes HTML) |
| `app.js` | Lógica del sitio (funcionalidades) |
| `styles.css` | Colores y diseño |

---

## 🎯 Tareas Comunes

### Agregar contenido a un mes
1. Login como `jvallejo`
2. Click "Panel Admin"
3. Seleccionar mes
4. Editar título/instrucciones/fotos
5. "Guardar Cambios"

### Subir fotos
1. En Panel Admin, selecciona el mes
2. Click "📁 Seleccionar Fotos"
3. Elige una o varias fotos
4. Espera a que suban
5. Aparecerán en la lista

### Eliminar fotos
1. En Panel Admin, en la vista previa de fotos
2. Click en la **X roja** de la foto
3. Confirma (se elimina de Storage también)

### Ver como lo ve el visor
1. Cierra sesión
2. Login como `bvega`
3. Verás solo los meses desbloqueados

---

## 🔧 Configuración Inicial (Primera Vez)

```bash
# 1. Obtener credenciales de Firebase Console
# 2. Editar firebase-config.js

# 3. Firestore
# Firebase Console → Firestore → Rules → Copiar firestore.rules

# 4. Storage  
# Firebase Console → Storage → Rules → Copiar storage.rules

# 5. Authentication
# Firebase Console → Authentication → Users → Agregar:
#    - jvallejo@timeline.com
#    - bvega@timeline.com

# 6. Abrir index.html en navegador
```

---

## 📅 Meses y Fechas

```
Agosto 2025      → 23 ago 2025, 00:00
Septiembre 2025  → 23 sep 2025, 00:00
Octubre 2025     → 23 oct 2025, 00:00
Noviembre 2025   → 23 nov 2025, 00:00
Diciembre 2025   → 23 dic 2025, 00:00
Enero 2026       → 23 ene 2026, 00:00
Febrero 2026     → 23 feb 2026, 00:00
Marzo 2026       → 23 mar 2026, 00:00
Abril 2026       → 23 abr 2026, 00:00
Mayo 2026        → 23 may 2026, 00:00
Junio 2026       → 23 jun 2026, 00:00
Julio 2026       → 23 jul 2026, 00:00
Agosto 2026      → 23 ago 2026, 00:00
```

---

## 🆘 Solución de Problemas

### "Firebase is not defined"
→ Verifica que `firebase-config.js` tenga credenciales reales

### "Permission denied" al subir foto
→ Verifica que Storage rules estén publicadas
→ Verifica que estés logueado como `jvallejo`

### No puedo iniciar sesión
→ Verifica que el usuario exista en Authentication
→ Verifica el email exacto: `jvallejo@timeline.com`

### Los meses no se guardan
→ Verifica que Firestore rules estén publicadas
→ Abre consola (F12) y revisa errores

### Página en blanco
→ Abre consola (F12) → Tab Console → Lee el error
→ Usualmente es problema de credenciales en firebase-config.js

---

## 🎨 Personalización

### Cambiar colores
Edita `styles.css` líneas 9-20:
```css
:root {
    --primary-color: #6366f1;    /* Color primario */
    --accent-color: #ec4899;      /* Color de acento */
    --bg-color: #0f172a;          /* Color de fondo */
    ...
}
```

### Cambiar día de desbloqueo
Edita `firebase-config.js` líneas 33-45:
```javascript
unlockDate: new Date(2025, 7, 23, 0, 0, 0)
//                           mes ^^  día ^^
// Cambiar el 23 por otro día
```

### Agregar más meses
Edita `firebase-config.js`, agrega al array `TIMELINE_MONTHS`:
```javascript
{ 
  id: 'sep2026', 
  month: 'Septiembre', 
  year: 2026, 
  unlockDate: new Date(2026, 8, 23, 0, 0, 0) 
}
```

---

## 📊 URLs Útiles

### Firebase Console
```
https://console.firebase.google.com/
```

### Tu sitio (después de deploy)
```
https://[TU-PROYECTO].web.app
o
https://[TU-PROYECTO].firebaseapp.com
```

### Firebase Docs
```
https://firebase.google.com/docs
```

---

## 💾 Respaldo de Contenido

### Exportar Firestore
Firebase Console → Firestore → Herramientas → Exportar

### Descargar fotos
Firebase Console → Storage → Seleccionar carpeta → Download

### Backup local
Mantén copias de:
- Todas las fotos originales
- Un documento con títulos e instrucciones

---

## 🔍 Debug

### Abrir consola del navegador
```
Windows/Linux: F12
Mac: Cmd + Option + I
```

### Ver errores
Console tab → Buscar líneas en rojo

### Ver datos de Firestore
Application tab → IndexedDB → firestore

### Ver estado de auth
Console → Escribe: `firebase.auth().currentUser`

---

## 📱 Testing

### Probar en móvil (desde PC)
1. F12 → Toggle device toolbar
2. Selecciona iPhone o Android
3. Prueba la interfaz

### Probar diferentes usuarios
1. Abre ventana de incógnito
2. Login como otro usuario
3. Compara comportamiento

---

## ✅ Checklist de Lanzamiento

Antes de compartir el sitio, verifica:

- [ ] `firebase-config.js` tiene credenciales reales
- [ ] Reglas de Firestore publicadas
- [ ] Reglas de Storage publicadas
- [ ] Usuarios creados en Authentication
- [ ] Imagen de login agregada (opcional)
- [ ] Contenido de al menos el primer mes preparado
- [ ] Probado como admin
- [ ] Probado como visor
- [ ] Sitio desplegado con `firebase deploy`

---

## 🎯 Tips Pro

1. **Prepara con anticipación:** Sube todo el contenido de los 13 meses antes
2. **Optimiza fotos:** Usa herramientas como TinyPNG antes de subir
3. **Usa saltos de línea:** En instrucciones, presiona Enter para mejor formato
4. **Prueba fechas:** Cambia temporalmente una fecha para testear desbloqueo
5. **Mantén backup:** Guarda copias de fotos importantes

---

## 📞 ¿Necesitas Ayuda?

Consulta estos documentos en orden:

1. `INICIO_RAPIDO.md` - Primeros 5 minutos
2. `INSTRUCCIONES_CONFIGURACION.md` - Paso a paso detallado
3. `README.md` - Documentación completa
4. `RESUMEN_PROYECTO.md` - Visión general del proyecto
5. `CHEATSHEET.md` - Esta guía (referencia rápida)

---

**🎉 ¡Todo listo! Comienza con INICIO_RAPIDO.md**

