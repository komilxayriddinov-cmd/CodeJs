// ═══════════════════════════════════════════════════════════════
// CODEJS — FIREBASE FIRESTORE BULUTLI MA'LUMOTLAR BAZASI
// ═══════════════════════════════════════════════════════════════

// Firebase konfiguratsiyasi uchun kalit
const FIREBASE_CONFIG_KEY = 'codejs_firebase_config';

// Standart Firebase konfiguratsiyasi (Firebase loyihangizdan olingan ma'lumotlar)
window.DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDTJzELmjak00B8sb7baioRhSat6Vkcn_I",
  authDomain: "codejs-678ae.firebaseapp.com",
  projectId: "codejs-678ae",
  storageBucket: "codejs-678ae.firebasestorage.app",
  messagingSenderId: "114212321736",
  appId: "1:114212321736:web:1a3c9deb55060dc7ff68fd",
  measurementId: "G-PWDN114PKN"
};

let db = null;
let isFirebaseConnected = false;
let isSyncingFromCloud = false;

// 1. Faol Firebase konfiguratsiyasini olish
function getFirebaseConfig() {
  try {
    const saved = localStorage.getItem(FIREBASE_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.apiKey && parsed.projectId) {
        return parsed;
      }
    }
  } catch (e) {}
  return window.DEFAULT_FIREBASE_CONFIG;
}

// 2. Firebase konfiguratsiyasini saqlash
function saveFirebaseConfig(cfg) {
  try {
    localStorage.setItem(FIREBASE_CONFIG_KEY, JSON.stringify(cfg));
    return true;
  } catch (e) {
    console.error('Konfiguratsiyani saqlashda xatolik:', e);
    return false;
  }
}

// 3. Firebase'ni ishga tushirish (Initialize)
function initFirebaseDatabase() {
  const config = getFirebaseConfig();

  if (!config || !config.apiKey || !config.projectId) {
    console.log('ℹ️ Firebase Firestore kalitlari kiritilmagan. Tizim mahalliy xotira (localStorage) rejimida ishlamoqda.');
    isFirebaseConnected = false;
    updateDatabaseStatusBadge();
    return false;
  }

  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK yuklanmagan.');
    isFirebaseConnected = false;
    updateDatabaseStatusBadge();
    return false;
  }

  try {
    if (!firebase.apps || !firebase.apps.length) {
      firebase.initializeApp(config);
    }
    db = firebase.firestore();
    isFirebaseConnected = true;
    console.log('🔥 Firebase Firestore muvaffaqiyatli ulandi! Loyiha:', config.projectId);
    updateDatabaseStatusBadge();

    // Bulutdagi ma'lumotlarni real vaqtda kuzatish (Realtime sync)
    listenToCloudUsers();
    return true;
  } catch (err) {
    console.error('Firebase ulanishida xatolik:', err);
    isFirebaseConnected = false;
    updateDatabaseStatusBadge();
    return false;
  }
}

// 4. Real-vaqtda Firestore'dagi 'users' to'plamini kuzatish (onSnapshot)
function listenToCloudUsers() {
  if (!db || !isFirebaseConnected) return;

  try {
    db.collection('users').onSnapshot((snapshot) => {
      // Agar bulut bo'sh bo'lsa va lokal foydalanuvchilar mavjud bo'lsa, ularni bulutga ko'chirish
      if (snapshot.empty) {
        const localUsers = typeof getUsers === 'function' ? getUsers() : [];
        if (localUsers.length > 0) {
          uploadLocalUsersToCloud();
        }
        return;
      }

      const cloudUsers = [];
      snapshot.forEach((doc) => {
        cloudUsers.push(doc.data());
      });

      if (cloudUsers.length > 0) {
        isSyncingFromCloud = true;
        try {
          // Mahalliy xotiraga yozish
          if (typeof USERS_KEY !== 'undefined') {
            localStorage.setItem(USERS_KEY, JSON.stringify(cloudUsers));
          }

          // Hozirgi kirgan foydalanuvchi ma'lumotlarini ham yangilash
          if (typeof getCurrentUser === 'function' && typeof CURRENT_USER_KEY !== 'undefined') {
            const current = getCurrentUser();
            if (current) {
              const updatedCurrent = cloudUsers.find(u => u.id === current.id || (u.email && current.email && u.email.toLowerCase() === current.email.toLowerCase()));
              if (updatedCurrent) {
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedCurrent));
                if (typeof updateAuthUI === 'function') updateAuthUI();
              }
            }
          }

          window.dispatchEvent(new CustomEvent('codejs:users-updated', { detail: cloudUsers }));
          if (typeof renderCommunityUsers === 'function') renderCommunityUsers();
          if (typeof renderUsersTable === 'function') renderUsersTable();
          if (typeof refreshDashboard === 'function') refreshDashboard();
        } catch (e) {
          console.error('Bulut ma\'lumotlarini sinxronlashda xatolik:', e);
        } finally {
          setTimeout(() => { isSyncingFromCloud = false; }, 300);
        }
      }
    }, (error) => {
      console.warn('Firestore onSnapshot xatoligi (Firestore Security Rules tekshirilishi kerak):', error);
    });
  } catch (e) {
    console.error('listenToCloudUsers xatoligi:', e);
  }
}

// 5. Bitta foydalanuvchini bulutga saqlash yoki yangilash
function syncUserToCloud(user) {
  if (!db || !isFirebaseConnected || isSyncingFromCloud || !user) return;
  try {
    const docId = user.id || ('user_' + (user.email ? user.email.replace(/[^a-zA-Z0-9]/g, '_') : Date.now()));
    db.collection('users').doc(docId).set(user, { merge: true })
      .catch((err) => {
        console.warn('Foydalanuvchini bulutga saqlashda xatolik:', err);
      });
  } catch (e) {
    console.error('syncUserToCloud xatoligi:', e);
  }
}

// 6. Foydalanuvchini bulutdan o'chirish
function deleteUserFromCloud(userId) {
  if (!db || !isFirebaseConnected || !userId) return;
  try {
    db.collection('users').doc(userId).delete()
      .catch((err) => {
        console.warn('Foydalanuvchini bulutdan o\'chirishda xatolik:', err);
      });
  } catch (e) {
    console.error('deleteUserFromCloud xatoligi:', e);
  }
}

// 7. Barcha mahalliy foydalanuvchilarni bulutga yuklash (Initial Migration)
function uploadLocalUsersToCloud() {
  if (!db || !isFirebaseConnected) return;
  try {
    const users = typeof getUsers === 'function' ? getUsers() : [];
    if (!users || users.length === 0) return;

    const batch = db.batch();
    users.forEach((user) => {
      const docId = user.id || ('user_' + (user.email ? user.email.replace(/[^a-zA-Z0-9]/g, '_') : Date.now()));
      const docRef = db.collection('users').doc(docId);
      batch.set(docRef, user, { merge: true });
    });

    batch.commit().then(() => {
      console.log('✅ Barcha foydalanuvchilar bulutli Firestore bazasiga yuklandi!');
      if (typeof showToast === 'function') {
        showToast('☁️ Ma\'lumotlar Firebase bulutiga muvaffaqiyatli saqlandi!');
      }
    }).catch((err) => {
      console.error('Batch commit xatoligi:', err);
    });
  } catch (e) {
    console.error('uploadLocalUsersToCloud xatoligi:', e);
  }
}

// Debounced barcha foydalanuvchilarni sinxronlash
let syncTimeout = null;
function syncAllUsersToCloudDebounced(users) {
  if (!db || !isFirebaseConnected || isSyncingFromCloud || !users) return;
  clearTimeout(syncTimeout);
  syncTimeout = setTimeout(() => {
    uploadLocalUsersToCloud();
  }, 1000);
}

// Holat ko'rsatkichini yangilash
function updateDatabaseStatusBadge() {
  const badges = document.querySelectorAll('.db-status-badge');
  badges.forEach((badge) => {
    if (isFirebaseConnected) {
      badge.innerHTML = '🟢 Firebase Firestore: Ulangan';
      badge.className = 'db-status-badge connected';
    } else {
      badge.innerHTML = '🟡 Mahalliy Xotira (Offline)';
      badge.className = 'db-status-badge offline';
    }
  });
}

// Sahifa yuklanganda ishga tushirish
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebaseDatabase);
} else {
  initFirebaseDatabase();
}

