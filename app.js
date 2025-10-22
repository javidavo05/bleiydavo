// Variables globales
let currentUser = null;
let currentUserRole = null;

// Variables para textos personalizables
let cardTexts = {
    openTitle: 'Aventura Disponible',
    openMessage: 'Haz clic en "Ver Detalles" para descubrir la aventura',
    closedTitle: 'Espera a este 23',
    closedMessage: 'para vivir la siguiente aventura'
};

// Elementos DOM
const loginScreen = document.getElementById('loginScreen');
const timelineScreen = document.getElementById('timelineScreen');
const adminScreen = document.getElementById('adminScreen');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const timeline = document.getElementById('timeline');
const monthModal = document.getElementById('monthModal');

// Event Listeners
document.addEventListener('DOMContentLoaded', init);

function init() {
    // Verificar estado de autenticación
    auth.onAuthStateChanged(user => {
        if (user) {
            handleAuthenticatedUser(user);
        } else {
            showScreen('loginScreen');
        }
    });

    // Login form
    loginForm.addEventListener('submit', handleLogin);

    // Logout buttons
    document.getElementById('logoutBtn').addEventListener('click', logout);
    document.getElementById('logoutAdminBtn').addEventListener('click', logout);

    // Admin panel
    document.getElementById('adminBtn').addEventListener('click', () => showScreen('adminScreen'));
    document.getElementById('backToTimelineBtn').addEventListener('click', () => showScreen('timelineScreen'));

    // Modal
    document.querySelector('.close').addEventListener('click', closeModal);
    window.addEventListener('click', (e) => {
        if (e.target === monthModal) closeModal();
    });

    // Admin form
    document.getElementById('monthEditForm').addEventListener('submit', saveMonthData);
    document.getElementById('photoUpload').addEventListener('change', handlePhotoUpload);

    // Admin menu
    document.getElementById('monthsBtn').addEventListener('click', () => showAdminSection('months'));
    document.getElementById('settingsBtn').addEventListener('click', () => showAdminSection('settings'));

    // Background settings
    document.getElementById('backgroundUpload').addEventListener('change', handleBackgroundUpload);
    document.getElementById('removeBackground').addEventListener('click', removeBackground);
    document.getElementById('useCustomBg').addEventListener('change', toggleCustomBackground);

    // Login background settings
    document.getElementById('loginBackgroundUpload').addEventListener('change', handleLoginBackgroundUpload);
    document.getElementById('removeLoginBackground').addEventListener('click', removeLoginBackground);

    // Debug upload
    document.getElementById('testUpload').addEventListener('click', testImageUpload);
    
    // Event listeners para preview
    document.getElementById('previewTimeline').addEventListener('click', () => previewTimeline('normal'));
    document.getElementById('previewLocked').addEventListener('click', () => previewTimeline('locked'));
    document.getElementById('previewUnlocked').addEventListener('click', () => previewTimeline('unlocked'));
    
    // Event listeners para editor de textos
    document.getElementById('saveTextSettings').addEventListener('click', saveTextSettings);

    // Inicializar datos en Firestore si no existen
    initializeFirestoreData();
    
    // Inicializar animaciones de scroll
    initScrollAnimations();
}

// Función para animaciones de scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observar todas las cards de meses
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            document.querySelectorAll('.month-card').forEach(card => {
                observer.observe(card);
            });
        }, 100);
    });
}

// Autenticación
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    loginError.textContent = '';
    loginError.style.display = 'none';

    // Validar que se ingresó usuario y contraseña
    if (!username || !password) {
        loginError.textContent = '⚠️ Por favor ingresa usuario y contraseña';
        loginError.style.display = 'block';
        return;
    }

    // Verificar que el usuario existe en el sistema
    if (!USERS[username]) {
        loginError.textContent = '❌ Usuario no válido. Usa: jvallejo o bvega';
        loginError.style.display = 'block';
        return;
    }

    try {
        const email = USERS[username].email;
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error('Error de login:', error);
        
        // Mensajes de error específicos según el código de error
        switch (error.code) {
            case 'auth/invalid-credential':
            case 'auth/wrong-password':
                loginError.textContent = '🔑 Contraseña incorrecta. Verifica tu contraseña e intenta de nuevo.';
                break;
            
            case 'auth/user-not-found':
                loginError.textContent = '❌ Usuario no encontrado. Asegúrate de haber creado el usuario en Firebase Authentication.';
                break;
            
            case 'auth/too-many-requests':
                loginError.textContent = '🚫 Demasiados intentos fallidos. Espera unos minutos o prueba en modo incógnito.';
                break;
            
            case 'auth/network-request-failed':
                loginError.textContent = '🌐 Error de conexión. Verifica tu internet e intenta de nuevo.';
                break;
            
            case 'auth/invalid-email':
                loginError.textContent = '❌ Email inválido. Contacta al administrador.';
                break;
            
            case 'auth/user-disabled':
                loginError.textContent = '🚫 Esta cuenta ha sido deshabilitada. Contacta al administrador.';
                break;
            
            default:
                loginError.textContent = `❌ Error: ${error.message}`;
        }
        
        loginError.style.display = 'block';
    }
}

function handleAuthenticatedUser(user) {
    currentUser = user;
    
    // Determinar rol del usuario
    for (let username in USERS) {
        if (USERS[username].email === user.email) {
            currentUserRole = USERS[username].role;
            document.getElementById('userDisplay').textContent = USERS[username].displayName;
            break;
        }
    }

    // Mostrar botón admin si es administrador
    if (currentUserRole === 'admin') {
        document.getElementById('adminBtn').style.display = 'inline-block';
        loadAdminPanel();
    }

    showScreen('timelineScreen');
    loadTimeline();
}

function logout() {
    auth.signOut();
    currentUser = null;
    currentUserRole = null;
    showScreen('loginScreen');
    loginForm.reset();
}

// Gestión de pantallas
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Timeline
async function loadTimeline() {
    timeline.innerHTML = '';
    const now = new Date();

    for (let monthData of TIMELINE_MONTHS) {
        const monthCard = await createMonthCard(monthData, now);
        timeline.appendChild(monthCard);
    }
}

async function createMonthCard(monthData, now) {
    const isUnlocked = now >= monthData.unlockDate;
    const isPast = now >= monthData.unlockDate;
    const isAdmin = currentUserRole === 'admin';
    
    const card = document.createElement('div');
    card.className = `month-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    
    // Obtener datos del mes desde Firestore
    const monthDoc = await db.collection('months').doc(monthData.id).get();
    const monthContent = monthDoc.exists ? monthDoc.data() : {
        title: '',
        instructions: '',
        photos: []
    };

            card.innerHTML = `
                <div class="month-header">
                    <h3>${monthData.month} ${monthData.year}</h3>
                    <div class="day-badge">23</div>
                </div>
                <div class="month-content">
                    ${isUnlocked ? `
                        <div class="adventure-status">
                            <div class="status-icon">✅</div>
                            <h4 class="status-title">${cardTexts.openTitle}</h4>
                            <p class="status-message">${cardTexts.openMessage}</p>
                        </div>
                        ${monthContent.photos && monthContent.photos.length > 0 ? `
                            <div class="memories-section">
                                <h5>📸 Fotos de recuerdo:</h5>
                                <div class="photo-album preview" id="album-${monthData.id}">
                                    ${monthContent.photos.slice(0, 3).map((photo, index) => `
                                        <div class="photo-slot">
                                            <img src="${photo}" alt="Foto de recuerdo" onclick="openPhotoModal(${index}, ${JSON.stringify(monthContent.photos).replace(/"/g, '&quot;')}, '${monthData.month} ${monthData.year}')">
                                        </div>
                                    `).join('')}
                                    ${monthContent.photos.length > 3 ? `
                                        <button class="expand-gallery-btn" onclick="expandGallery('${monthData.id}', ${JSON.stringify(monthContent.photos).replace(/"/g, '&quot;')})">
                                            +${monthContent.photos.length - 3} más
                                        </button>
                                    ` : ''}
                                </div>
                            </div>
                        ` : ''}
                    ` : `
                        <div class="locked-adventure">
                            <div class="locked-instructions">
                                <div class="lock-icon">🔒</div>
                                <h4 class="locked-title">${cardTexts.closedTitle}</h4>
                                <p class="locked-message">${cardTexts.closedMessage}</p>
                            </div>
                        </div>
                    `}
                </div>
                ${isUnlocked || isAdmin ? `<button class="btn-view" data-month-id="${monthData.id}">Ver Detalles</button>` : ''}
            `;

    // Agregar evento para ver detalles
    const viewBtn = card.querySelector('.btn-view');
    if (viewBtn) {
        viewBtn.addEventListener('click', () => showMonthModal(monthData.id, monthContent, monthData.month, monthData.year));
    }

    return card;
}

function showMonthModal(monthId, monthContent, monthName, year) {
    const modal = document.getElementById('monthModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPhotos = document.getElementById('modalPhotos');
    
    // Configurar título
    modalTitle.textContent = `${monthName} ${year}`;
    
    // Configurar campos de detalles
    document.getElementById('modalAdventureTitle').textContent = monthContent.adventureTitle || 'Aventura especial del mes';
    document.getElementById('modalClothingType').textContent = monthContent.clothingType || 'Vestimenta cómoda y elegante';
    document.getElementById('modalLocation').textContent = monthContent.location || 'Lugar especial por confirmar';
    document.getElementById('modalPickupTime').textContent = monthContent.pickupTime || 'Hora por confirmar';
    document.getElementById('modalObservations').textContent = monthContent.observations || 'Detalles especiales para esta aventura';
    
    // Configurar galería de fotos
    modalPhotos.innerHTML = '';
    if (monthContent.photos && monthContent.photos.length > 0) {
        monthContent.photos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-gallery-item';
            photoItem.innerHTML = `<img src="${photo}" alt="Foto de recuerdo" onclick="openPhotoModal(${index}, ${JSON.stringify(monthContent.photos).replace(/"/g, '&quot;')}, '${monthName} ${year}')">`;
            modalPhotos.appendChild(photoItem);
        });
    } else {
        // Mostrar placeholders si no hay fotos
        for (let i = 0; i < 6; i++) {
            const placeholder = document.createElement('div');
            placeholder.className = 'photo-placeholder';
            placeholder.textContent = ['📸', '📷', '🖼️', '✨', '💫', '🌟'][i];
            modalPhotos.appendChild(placeholder);
        }
    }
    
    // Mostrar modal
    modal.classList.add('show');
    
    // Limpiar event listeners anteriores
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = null;
    modal.onclick = null;
    
    // Event listeners para cerrar modal
    closeBtn.onclick = () => {
        modal.classList.remove('show');
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    };
    
    // Cerrar con ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
}

function showMonthDetails(monthId, monthContent) {
    const monthInfo = TIMELINE_MONTHS.find(m => m.id === monthId);
    
    document.getElementById('modalTitle').textContent = 
        `${monthInfo.month} ${monthInfo.year} - ${monthContent.title || 'Sin título'}`;
    document.getElementById('modalInstructions').textContent = 
        monthContent.instructions || 'No hay instrucciones disponibles';
    
    const gallery = document.getElementById('modalGallery');
    gallery.innerHTML = '';
    
    if (monthContent.photos && monthContent.photos.length > 0) {
        monthContent.photos.forEach(photoUrl => {
            const img = document.createElement('img');
            img.src = photoUrl;
            img.alt = 'Foto del mes';
            gallery.appendChild(img);
        });
    } else {
        gallery.innerHTML = '<p class="no-photos">No hay fotos disponibles para este mes</p>';
    }
    
    monthModal.style.display = 'block';
}

function closeModal() {
    monthModal.style.display = 'none';
}

// Panel de Administración
function loadAdminPanel() {
    const monthList = document.getElementById('monthList');
    monthList.innerHTML = '';

    TIMELINE_MONTHS.forEach(monthData => {
        const monthItem = document.createElement('div');
        monthItem.className = 'month-item';
        monthItem.textContent = `${monthData.month} ${monthData.year}`;
        monthItem.dataset.monthId = monthData.id;
        
        monthItem.addEventListener('click', () => loadMonthEditor(monthData.id));
        monthList.appendChild(monthItem);
    });

    // Cargar el primer mes por defecto
    if (TIMELINE_MONTHS.length > 0) {
        loadMonthEditor(TIMELINE_MONTHS[0].id);
    }

    // Cargar configuración de fondo
    loadBackgroundSettings();
    loadLoginBackgroundSettings();
    loadTextSettings();
}

// Mostrar sección del admin
function showAdminSection(section) {
    // Actualizar botones
    document.querySelectorAll('.admin-menu-btn').forEach(btn => btn.classList.remove('active'));
    if (section === 'months') {
        document.getElementById('monthsBtn').classList.add('active');
        document.getElementById('monthList').style.display = 'block';
        document.getElementById('settingsPanel').style.display = 'none';
    } else {
        document.getElementById('settingsBtn').classList.add('active');
        document.getElementById('monthList').style.display = 'none';
        document.getElementById('settingsPanel').style.display = 'block';
    }
}

// Cargar configuración de fondo
async function loadBackgroundSettings() {
    try {
        const settingsDoc = await db.collection('settings').doc('background').get();
        if (settingsDoc.exists) {
            const settings = settingsDoc.data();
            document.getElementById('useCustomBg').checked = settings.useCustomBg || false;
            
            if (settings.backgroundImage) {
                document.body.style.setProperty('--custom-bg-image', `url(${settings.backgroundImage})`);
                if (settings.useCustomBg) {
                    document.body.classList.add('custom-bg');
                }
            }
        }
    } catch (error) {
        console.error('Error cargando configuración de fondo:', error);
    }
}

// Manejar subida de imagen de fondo
async function handleBackgroundUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
        showMessage('Subiendo imagen de fondo...', 'info');
        
        // Subir a Storage
        const timestamp = Date.now();
        const fileName = `backgrounds/${timestamp}_${file.name}`;
        const storageRef = storage.ref().child(fileName);
        
        await storageRef.put(file);
        const downloadUrl = await storageRef.getDownloadURL();

        // Guardar en Firestore
        await db.collection('settings').doc('background').set({
            backgroundImage: downloadUrl,
            useCustomBg: true,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Aplicar inmediatamente
        document.body.style.setProperty('--custom-bg-image', `url(${downloadUrl})`);
        document.body.classList.add('custom-bg');
        document.getElementById('useCustomBg').checked = true;

        showMessage('Imagen de fondo actualizada correctamente', 'success');
        
    } catch (error) {
        console.error('Error subiendo imagen de fondo:', error);
        showMessage('Error al subir imagen de fondo', 'error');
    }
}

// Eliminar fondo personalizado
async function removeBackground() {
    try {
        await db.collection('settings').doc('background').update({
            useCustomBg: false,
            backgroundImage: null,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        document.body.classList.remove('custom-bg');
        document.body.style.removeProperty('--custom-bg-image');
        document.getElementById('useCustomBg').checked = false;
        document.getElementById('backgroundUpload').value = '';

        showMessage('Fondo personalizado eliminado', 'success');
        
    } catch (error) {
        console.error('Error eliminando fondo:', error);
        showMessage('Error al eliminar fondo', 'error');
    }
}

// Toggle fondo personalizado
async function toggleCustomBackground(e) {
    const useCustom = e.target.checked;
    
    try {
        await db.collection('settings').doc('background').update({
            useCustomBg: useCustom,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        if (useCustom) {
            document.body.classList.add('custom-bg');
        } else {
            document.body.classList.remove('custom-bg');
        }

        showMessage(`Fondo personalizado ${useCustom ? 'activado' : 'desactivado'}`, 'success');
        
    } catch (error) {
        console.error('Error actualizando configuración:', error);
        showMessage('Error al actualizar configuración', 'error');
    }
}

// Cargar configuración de fondo de login
async function loadLoginBackgroundSettings() {
    try {
        const settingsDoc = await db.collection('settings').doc('loginBackground').get();
        if (settingsDoc.exists) {
            const settings = settingsDoc.data();
            if (settings.loginBackgroundImage) {
                document.documentElement.style.setProperty('--login-bg-image', `url(${settings.loginBackgroundImage})`);
            }
        }
    } catch (error) {
        console.error('Error cargando configuración de fondo de login:', error);
    }
}

// Manejar subida de imagen de fondo de login
async function handleLoginBackgroundUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
        showMessage('Subiendo imagen de fondo de login...', 'info');
        
        // Subir a Storage
        const timestamp = Date.now();
        const fileName = `login-backgrounds/${timestamp}_${file.name}`;
        const storageRef = storage.ref().child(fileName);
        
        await storageRef.put(file);
        const downloadUrl = await storageRef.getDownloadURL();

        // Guardar en Firestore
        await db.collection('settings').doc('loginBackground').set({
            loginBackgroundImage: downloadUrl,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        // Aplicar inmediatamente
        document.documentElement.style.setProperty('--login-bg-image', `url(${downloadUrl})`);

        showMessage('Imagen de fondo de login actualizada correctamente', 'success');
        
    } catch (error) {
        console.error('Error subiendo imagen de fondo de login:', error);
        showMessage('Error al subir imagen de fondo de login', 'error');
    }
}

// Eliminar fondo de login
async function removeLoginBackground() {
    try {
        await db.collection('settings').doc('loginBackground').update({
            loginBackgroundImage: null,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        document.documentElement.style.removeProperty('--login-bg-image');
        document.getElementById('loginBackgroundUpload').value = '';

        showMessage('Fondo de login eliminado', 'success');
        
    } catch (error) {
        console.error('Error eliminando fondo de login:', error);
        showMessage('Error al eliminar fondo de login', 'error');
    }
}

// Función de debug para probar subida de imágenes
async function testImageUpload() {
    const fileInput = document.getElementById('debugUpload');
    const debugInfo = document.getElementById('debugInfo');
    
    if (!fileInput.files[0]) {
        showDebugInfo('❌ No se seleccionó ningún archivo', 'error');
        return;
    }

    const file = fileInput.files[0];
    showDebugInfo('🧪 INICIANDO PRUEBA DE SUBIDA...\n', 'info');
    
    try {
        // 1. Verificar autenticación
        showDebugInfo('✅ Paso 1: Verificando autenticación...\n', 'info');
        const user = auth.currentUser;
        if (!user) {
            showDebugInfo('❌ Error: Usuario no autenticado', 'error');
            return;
        }
        showDebugInfo(`✅ Usuario autenticado: ${user.email}\n`, 'success');

        // 2. Verificar permisos de Storage
        showDebugInfo('✅ Paso 2: Verificando permisos de Storage...\n', 'info');
        
        // 3. Crear referencia de Storage
        showDebugInfo('✅ Paso 3: Creando referencia de Storage...\n', 'info');
        const timestamp = Date.now();
        const fileName = `debug-test/${timestamp}_${file.name}`;
        const storageRef = storage.ref().child(fileName);
        showDebugInfo(`✅ Referencia creada: ${fileName}\n`, 'success');

        // 4. Verificar tamaño de archivo
        showDebugInfo('✅ Paso 4: Verificando archivo...\n', 'info');
        showDebugInfo(`📁 Nombre: ${file.name}\n`, 'info');
        showDebugInfo(`📏 Tamaño: ${(file.size / 1024 / 1024).toFixed(2)} MB\n`, 'info');
        showDebugInfo(`📄 Tipo: ${file.type}\n`, 'info');

        // 5. Intentar subir archivo
        showDebugInfo('✅ Paso 5: Subiendo archivo...\n', 'info');
        const uploadTask = storageRef.put(file);
        
        // Monitorear progreso
        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                showDebugInfo(`📤 Progreso: ${progress.toFixed(1)}%\n`, 'info');
            },
            (error) => {
                showDebugInfo(`❌ Error durante subida: ${error.code}\n`, 'error');
                showDebugInfo(`❌ Mensaje: ${error.message}\n`, 'error');
                showDebugInfo(`❌ Detalles: ${JSON.stringify(error, null, 2)}\n`, 'error');
            },
            async () => {
                try {
                    showDebugInfo('✅ Paso 6: Obteniendo URL de descarga...\n', 'info');
                    const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
                    showDebugInfo(`✅ URL obtenida: ${downloadUrl}\n`, 'success');
                    
                    showDebugInfo('✅ Paso 7: Probando acceso a la URL...\n', 'info');
                    const response = await fetch(downloadUrl);
                    if (response.ok) {
                        showDebugInfo('✅ ¡ARCHIVO SUBIDO EXITOSAMENTE!\n', 'success');
                        showDebugInfo(`🔗 URL: ${downloadUrl}\n`, 'success');
                        
                        // Limpiar archivo de prueba
                        showDebugInfo('🧹 Limpiando archivo de prueba...\n', 'info');
                        await storageRef.delete();
                        showDebugInfo('✅ Archivo de prueba eliminado\n', 'success');
                    } else {
                        showDebugInfo(`❌ Error accediendo a URL: ${response.status}\n`, 'error');
                    }
                } catch (urlError) {
                    showDebugInfo(`❌ Error obteniendo URL: ${urlError.message}\n`, 'error');
                }
            }
        );

    } catch (error) {
        showDebugInfo(`❌ ERROR GENERAL: ${error.code}\n`, 'error');
        showDebugInfo(`❌ Mensaje: ${error.message}\n`, 'error');
        showDebugInfo(`❌ Stack: ${error.stack}\n`, 'error');
    }
}

// Función para mostrar información de debug
function showDebugInfo(message, type = 'info') {
    const debugInfo = document.getElementById('debugInfo');
    debugInfo.textContent += message;
    debugInfo.className = `debug-info show ${type}`;
    debugInfo.scrollTop = debugInfo.scrollHeight;
}

// Función para preview del timeline
async function previewTimeline(mode) {
    const now = new Date();
    const timelineContainer = document.getElementById('timeline');
    
    // Limpiar timeline actual
    timelineContainer.innerHTML = '';
    
    for (const monthData of TIMELINE_MONTHS) {
        let shouldShow = true;
        
        if (mode === 'locked') {
            shouldShow = now < monthData.unlockDate;
        } else if (mode === 'unlocked') {
            shouldShow = now >= monthData.unlockDate;
        }
        
        if (shouldShow) {
            const card = await createMonthCard(monthData, now);
            timelineContainer.appendChild(card);
        }
    }
    
    // Reinicializar animaciones
    initScrollAnimations();
    
    // Mostrar mensaje de preview
    const message = mode === 'locked' ? '🔒 Mostrando solo meses bloqueados' : 
                   mode === 'unlocked' ? '✅ Mostrando solo meses desbloqueados' : 
                   '👁️ Mostrando timeline normal';
    showMessage(message, 'info');
}

// Función para cargar configuraciones de textos
async function loadTextSettings() {
    try {
        const settingsDoc = await db.collection('settings').doc('cardTexts').get();
        if (settingsDoc.exists) {
            const settings = settingsDoc.data();
            cardTexts = {
                openTitle: settings.openTitle || 'Aventura Disponible',
                openMessage: settings.openMessage || 'Haz clic en "Ver Detalles" para descubrir la aventura',
                closedTitle: settings.closedTitle || 'Espera a este 23',
                closedMessage: settings.closedMessage || 'para vivir la siguiente aventura'
            };
            
            // Actualizar campos en el admin panel si existen
            const openTitleEl = document.getElementById('openCardTitle');
            const openMessageEl = document.getElementById('openCardMessage');
            const closedTitleEl = document.getElementById('closedCardTitle');
            const closedMessageEl = document.getElementById('closedCardMessage');
            
            if (openTitleEl) openTitleEl.value = cardTexts.openTitle;
            if (openMessageEl) openMessageEl.value = cardTexts.openMessage;
            if (closedTitleEl) closedTitleEl.value = cardTexts.closedTitle;
            if (closedMessageEl) closedMessageEl.value = cardTexts.closedMessage;
        }
    } catch (error) {
        console.error('Error cargando configuraciones de textos:', error);
    }
}

// Función para guardar configuraciones de textos
async function saveTextSettings() {
    try {
        const newTexts = {
            openTitle: document.getElementById('openCardTitle').value,
            openMessage: document.getElementById('openCardMessage').value,
            closedTitle: document.getElementById('closedCardTitle').value,
            closedMessage: document.getElementById('closedCardMessage').value
        };
        
        // Validar que no estén vacíos
        if (!newTexts.openTitle.trim() || !newTexts.openMessage.trim() || 
            !newTexts.closedTitle.trim() || !newTexts.closedMessage.trim()) {
            showMessage('Todos los campos son obligatorios', 'error');
            return;
        }
        
        await db.collection('settings').doc('cardTexts').set({
            ...newTexts,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        
        // Actualizar variables globales
        cardTexts = newTexts;
        
        showMessage('Textos guardados correctamente', 'success');
        
        // Recargar timeline para aplicar cambios
        if (currentUserRole === 'admin') {
            loadTimeline();
        }
    } catch (error) {
        console.error('Error guardando configuraciones de textos:', error);
        showMessage('Error al guardar textos: ' + error.message, 'error');
    }
}

// Función para expandir la galería de fotos
function expandGallery(monthId, allPhotos) {
    const album = document.getElementById(`album-${monthId}`);
    if (!album) return;
    
    // Si ya está expandido, contraer
    if (album.classList.contains('expanded')) {
        album.classList.remove('expanded');
        album.classList.add('preview');
        album.innerHTML = `
            ${allPhotos.slice(0, 3).map(photo => `
                <div class="photo-slot">
                    <img src="${photo}" alt="Foto de recuerdo">
                </div>
            `).join('')}
            <button class="expand-gallery-btn" onclick="expandGallery('${monthId}', ${JSON.stringify(allPhotos).replace(/"/g, '&quot;')})">
                +${allPhotos.length - 3} más
            </button>
        `;
    } else {
        // Expandir mostrando todas las fotos
        album.classList.remove('preview');
        album.classList.add('expanded');
        album.innerHTML = `
            ${allPhotos.map((photo, index) => `
                <div class="photo-slot">
                    <img src="${photo}" alt="Foto de recuerdo" onclick="openPhotoModal(${index}, ${JSON.stringify(allPhotos).replace(/"/g, '&quot;')}, '${monthId}')">
                </div>
            `).join('')}
            <button class="expand-gallery-btn" onclick="expandGallery('${monthId}', ${JSON.stringify(allPhotos).replace(/"/g, '&quot;')})">
                Ver menos
            </button>
        `;
    }
}

// Variables globales para el modal de fotos
let currentPhotoIndex = 0;
let currentPhotos = [];

// Función para abrir el modal de fotos
function openPhotoModal(photoIndex, photos, monthName) {
    currentPhotos = photos;
    currentPhotoIndex = photoIndex;
    
    const modal = document.getElementById('photoModal');
    const modalImage = document.getElementById('photoModalImage');
    const modalTitle = document.getElementById('photoModalTitle');
    const photoCounter = document.getElementById('photoCounter');
    
    // Configurar imagen
    modalImage.src = photos[photoIndex];
    modalTitle.textContent = `${monthName} - Foto ${photoIndex + 1}`;
    photoCounter.textContent = `${photoIndex + 1} de ${photos.length}`;
    
    // Mostrar modal
    modal.classList.add('show');
    
    // Event listeners para cerrar modal
    const closeBtn = modal.querySelector('.close');
    closeBtn.onclick = () => modal.classList.remove('show');
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    };
    
    // Cerrar con ESC
    const handleEsc = (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.removeEventListener('keydown', handleEsc);
        }
    };
    document.addEventListener('keydown', handleEsc);
    
    // Event listeners para navegación
    document.getElementById('prevPhoto').onclick = () => navigatePhoto(-1);
    document.getElementById('nextPhoto').onclick = () => navigatePhoto(1);
    
    // Navegación con teclado
    const handleKeyNav = (e) => {
        if (modal.classList.contains('show')) {
            if (e.key === 'ArrowLeft') navigatePhoto(-1);
            if (e.key === 'ArrowRight') navigatePhoto(1);
        }
    };
    document.addEventListener('keydown', handleKeyNav);
}

// Función para navegar entre fotos
function navigatePhoto(direction) {
    currentPhotoIndex += direction;
    
    // Verificar límites
    if (currentPhotoIndex < 0) currentPhotoIndex = currentPhotos.length - 1;
    if (currentPhotoIndex >= currentPhotos.length) currentPhotoIndex = 0;
    
    // Actualizar imagen y contador
    const modalImage = document.getElementById('photoModalImage');
    const photoCounter = document.getElementById('photoCounter');
    const modalTitle = document.getElementById('photoModalTitle');
    
    modalImage.src = currentPhotos[currentPhotoIndex];
    photoCounter.textContent = `${currentPhotoIndex + 1} de ${currentPhotos.length}`;
    modalTitle.textContent = `Foto ${currentPhotoIndex + 1}`;
    
    // Actualizar estado de botones
    updateNavigationButtons();
}

// Función para actualizar botones de navegación
function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevPhoto');
    const nextBtn = document.getElementById('nextPhoto');
    
    // Solo deshabilitar si hay una foto
    if (currentPhotos.length <= 1) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

async function loadMonthEditor(monthId) {
    // Destacar mes seleccionado
    document.querySelectorAll('.month-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`[data-month-id="${monthId}"]`).classList.add('active');

    // Cargar datos del mes
    const monthDoc = await db.collection('months').doc(monthId).get();
    const monthData = monthDoc.exists ? monthDoc.data() : {
        title: '',
        instructions: '',
        photos: []
    };

    document.getElementById('editMonthId').value = monthId;
    document.getElementById('editTitle').value = monthData.title || '';
    document.getElementById('editAdventureTitle').value = monthData.adventureTitle || '';
    document.getElementById('editClothingType').value = monthData.clothingType || '';
    document.getElementById('editLocation').value = monthData.location || '';
    document.getElementById('editPickupTime').value = monthData.pickupTime || '';
    document.getElementById('editObservations').value = monthData.observations || '';
    document.getElementById('editInstructions').value = monthData.instructions || '';

    // Mostrar fotos existentes
    displayExistingPhotos(monthData.photos || []);
}

function displayExistingPhotos(photos) {
    const preview = document.getElementById('photoPreview');
    preview.innerHTML = '';

    photos.forEach((photoUrl, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.className = 'photo-preview-item';
        photoDiv.innerHTML = `
            <img src="${photoUrl}" alt="Foto ${index + 1}">
            <button type="button" class="delete-photo" data-photo-url="${photoUrl}">×</button>
        `;
        
        photoDiv.querySelector('.delete-photo').addEventListener('click', function() {
            deletePhoto(photoUrl);
        });
        
        preview.appendChild(photoDiv);
    });
}

async function deletePhoto(photoUrl) {
    const monthId = document.getElementById('editMonthId').value;
    
    try {
        // Eliminar de Storage
        const photoRef = storage.refFromURL(photoUrl);
        await photoRef.delete();

        // Actualizar Firestore
        const monthDoc = await db.collection('months').doc(monthId).get();
        const photos = monthDoc.data().photos || [];
        const updatedPhotos = photos.filter(url => url !== photoUrl);

        await db.collection('months').doc(monthId).update({
            photos: updatedPhotos
        });

        // Recargar editor
        loadMonthEditor(monthId);
        showMessage('Foto eliminada correctamente', 'success');
    } catch (error) {
        console.error('Error al eliminar foto:', error);
        showMessage('Error al eliminar foto', 'error');
    }
}

async function handlePhotoUpload(e) {
    const files = Array.from(e.target.files);
    const monthId = document.getElementById('editMonthId').value;
    
    if (files.length === 0) return;

    showMessage('Subiendo fotos...', 'info');

    try {
        const uploadPromises = files.map(file => uploadPhoto(file, monthId));
        const photoUrls = await Promise.all(uploadPromises);

        // Obtener fotos existentes
        const monthDoc = await db.collection('months').doc(monthId).get();
        const existingPhotos = monthDoc.exists && monthDoc.data().photos ? monthDoc.data().photos : [];

        // Agregar nuevas fotos
        const allPhotos = [...existingPhotos, ...photoUrls];

        await db.collection('months').doc(monthId).update({
            photos: allPhotos
        });

        // Recargar editor
        loadMonthEditor(monthId);
        showMessage('Fotos subidas correctamente', 'success');
        
        // Limpiar input
        e.target.value = '';
    } catch (error) {
        console.error('Error al subir fotos:', error);
        showMessage('Error al subir fotos', 'error');
    }
}

async function uploadPhoto(file, monthId) {
    const timestamp = Date.now();
    const fileName = `${monthId}/${timestamp}_${file.name}`;
    const storageRef = storage.ref().child(`photos/${fileName}`);
    
    await storageRef.put(file);
    const downloadUrl = await storageRef.getDownloadURL();
    
    return downloadUrl;
}

async function saveMonthData(e) {
    e.preventDefault();
    
    const monthId = document.getElementById('editMonthId').value;
    const title = document.getElementById('editTitle').value;
    const adventureTitle = document.getElementById('editAdventureTitle').value;
    const clothingType = document.getElementById('editClothingType').value;
    const location = document.getElementById('editLocation').value;
    const pickupTime = document.getElementById('editPickupTime').value;
    const observations = document.getElementById('editObservations').value;
    const instructions = document.getElementById('editInstructions').value;

    try {
        // Obtener fotos actuales
        const monthDoc = await db.collection('months').doc(monthId).get();
        const currentPhotos = monthDoc.exists && monthDoc.data().photos ? monthDoc.data().photos : [];

        await db.collection('months').doc(monthId).set({
            title: title,
            adventureTitle: adventureTitle,
            clothingType: clothingType,
            location: location,
            pickupTime: pickupTime,
            observations: observations,
            instructions: instructions,
            photos: currentPhotos,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });

        showMessage('Cambios guardados correctamente', 'success');
        
        // Actualizar timeline si está visible
        if (timelineScreen.classList.contains('active')) {
            loadTimeline();
        }
    } catch (error) {
        console.error('Error al guardar:', error);
        showMessage('Error al guardar cambios', 'error');
    }
}

function showMessage(message, type) {
    const messageEl = document.getElementById('saveMessage');
    messageEl.textContent = message;
    messageEl.className = type === 'success' ? 'success-message' : 'error-message';
    messageEl.style.display = 'block';

    setTimeout(() => {
        messageEl.style.display = 'none';
    }, 3000);
}

// Inicializar datos en Firestore
async function initializeFirestoreData() {
    for (let monthData of TIMELINE_MONTHS) {
        const monthDoc = await db.collection('months').doc(monthData.id).get();
        
        if (!monthDoc.exists) {
            await db.collection('months').doc(monthData.id).set({
                title: '',
                instructions: '',
                photos: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    }
}

