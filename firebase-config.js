// Configuración de Firebase
// ✅ Credenciales configuradas automáticamente para el proyecto bleixenydavo
const firebaseConfig = {
    apiKey: "AIzaSyBy3ypEbOc6CxqDZmi6tocYtWij2AWahNM",
    authDomain: "bleixenydavo.firebaseapp.com",
    projectId: "bleixenydavo",
    storageBucket: "bleixenydavo.firebasestorage.app",
    messagingSenderId: "632091719397",
    appId: "1:632091719397:web:336428c4d758393282860c"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Referencias a los servicios
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Configuración de usuarios
const USERS = {
    'jvallejo': {
        email: 'jvallejo@bleiydavo.com',
        role: 'admin',
        displayName: 'Javier Vallejo'
    },
    'bvega': {
        email: 'bvega@bleiydavo.com',
        role: 'viewer',
        displayName: 'Bvega'
    }
};

// Meses de la timeline (Agosto 2025 - Agosto 2026)
const TIMELINE_MONTHS = [
    { id: 'ago2025', month: 'Agosto', year: 2025, unlockDate: new Date(2025, 7, 23, 0, 0, 0) },
    { id: 'sep2025', month: 'Septiembre', year: 2025, unlockDate: new Date(2025, 8, 23, 0, 0, 0) },
    { id: 'oct2025', month: 'Octubre', year: 2025, unlockDate: new Date(2025, 9, 23, 0, 0, 0) },
    { id: 'nov2025', month: 'Noviembre', year: 2025, unlockDate: new Date(2025, 10, 23, 0, 0, 0) },
    { id: 'dic2025', month: 'Diciembre', year: 2025, unlockDate: new Date(2025, 11, 23, 0, 0, 0) },
    { id: 'ene2026', month: 'Enero', year: 2026, unlockDate: new Date(2026, 0, 23, 0, 0, 0) },
    { id: 'feb2026', month: 'Febrero', year: 2026, unlockDate: new Date(2026, 1, 23, 0, 0, 0) },
    { id: 'mar2026', month: 'Marzo', year: 2026, unlockDate: new Date(2026, 2, 23, 0, 0, 0) },
    { id: 'abr2026', month: 'Abril', year: 2026, unlockDate: new Date(2026, 3, 23, 0, 0, 0) },
    { id: 'may2026', month: 'Mayo', year: 2026, unlockDate: new Date(2026, 4, 23, 0, 0, 0) },
    { id: 'jun2026', month: 'Junio', year: 2026, unlockDate: new Date(2026, 5, 23, 0, 0, 0) },
    { id: 'jul2026', month: 'Julio', year: 2026, unlockDate: new Date(2026, 6, 23, 0, 0, 0) },
    { id: 'ago2026', month: 'Agosto', year: 2026, unlockDate: new Date(2026, 7, 23, 0, 0, 0) }
];

