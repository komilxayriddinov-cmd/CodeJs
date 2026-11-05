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
        const data = doc.data() || {};
        data._docId = doc.id;
        if (!data.id) data.id = doc.id;
        cloudUsers.push(data);
      });

      if (cloudUsers.length > 0) {
        isSyncingFromCloud = true;
        try {
          const localUsers = typeof getUsers === 'function' ? getUsers() : [];
          const current = (typeof getCurrentUser === 'function' && typeof CURRENT_USER_KEY !== 'undefined') ? getCurrentUser() : null;

          // Bulut ma'lumotlarini mahalliy xaridlar bilan xavfsiz birlashtirish:
          const mergedUsers = cloudUsers.map(cu => {
            const localU = localUsers.find(lu => lu.id === cu.id || (lu.email && cu.email && lu.email.toLowerCase() === cu.email.toLowerCase()));
            if (!localU) return cu;

            const res = Object.assign({}, localU, cu);
            // Xaridlarni birlashtirish (hech bir narsa o'chib ketmasligi uchun):
            const combinedInv = new Set([...(cu.inventory || []), ...(localU.inventory || [])]);
            res.inventory = Array.from(combinedInv);
            if (!res.equippedAvatar && localU.equippedAvatar) res.equippedAvatar = localU.equippedAvatar;
            if (!res.equippedFrame && localU.equippedFrame) res.equippedFrame = localU.equippedFrame;
            if (!res.equippedTitle && localU.equippedTitle) res.equippedTitle = localU.equippedTitle;

            // Agar mahalliy foydalanuvchida yangi avatar yoki xarid bo'lsa, bulutga ham sinxronlash
            if ((localU.inventory && localU.inventory.length > (cu.inventory ? cu.inventory.length : 0)) ||
                (localU.equippedAvatar && !cu.equippedAvatar)) {
              syncUserToCloud(res);
            }
            return res;
          });

          // Mahalliyda bor, ammo bulutda hali yo'q yangi foydalanuvchilarni ham qo'shish
          localUsers.forEach(lu => {
            if (!mergedUsers.some(mu => mu.id === lu.id || (mu.email && lu.email && mu.email.toLowerCase() === lu.email.toLowerCase()))) {
              mergedUsers.push(lu);
              syncUserToCloud(lu);
            }
          });

          // Mahalliy xotiraga yozish
          if (typeof USERS_KEY !== 'undefined') {
            localStorage.setItem(USERS_KEY, JSON.stringify(mergedUsers));
          }

          // Hozirgi kirgan foydalanuvchi ma'lumotlarini ham yangilash
          if (current) {
            const matchedCurrent = mergedUsers.find(u => u.id === current.id || (u.email && current.email && u.email.toLowerCase() === current.email.toLowerCase()));
            if (matchedCurrent) {
              const finalCurrent = Object.assign({}, current, matchedCurrent);
              const inv = new Set([...(matchedCurrent.inventory || []), ...(current.inventory || [])]);
              finalCurrent.inventory = Array.from(inv);
              if (!finalCurrent.equippedAvatar && current.equippedAvatar) finalCurrent.equippedAvatar = current.equippedAvatar;
              if (!finalCurrent.equippedFrame && current.equippedFrame) finalCurrent.equippedFrame = current.equippedFrame;
              if (!finalCurrent.equippedTitle && current.equippedTitle) finalCurrent.equippedTitle = current.equippedTitle;

              localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(finalCurrent));
              if (typeof updateAuthUI === 'function') updateAuthUI();
            }
          }

          window.dispatchEvent(new CustomEvent('codejs:users-updated', { detail: mergedUsers }));
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
      console.warn('Firestore onSnapshot xatoligi:', error);
      if (error && (error.code === 'permission-denied' || (error.message && error.message.includes('permission')))) {
        console.error('DIAGNOSTIKA: Firebase Firestore Rules yopiq (PERMISSION_DENIED). Firestore Rules bo\'limida "allow read, write: if true;" deb yozib Publish tugmasini bosing.');
        updateDatabaseStatusBadge('permission-denied');
      }
    });
  } catch (e) {
    console.error('listenToCloudUsers xatoligi:', e);
  }
}

// 5. Bitta foydalanuvchini bulutga saqlash yoki yangilash
function syncUserToCloud(user) {
  if (!db || !isFirebaseConnected || !user) return;
  try {
    const docId = user._docId || user.id || ('user_' + (user.email ? user.email.replace(/[^a-zA-Z0-9]/g, '_') : Date.now()));
    const payload = Object.assign({}, user);
    delete payload._docId;
    return db.collection('users').doc(docId).set(payload, { merge: true })
      .then(() => {
        console.log('✅ Firestore yangilandi:', docId, payload.name, 'tangalar:', payload.coins);
      })
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
    const users = typeof getUsers === 'function' ? getUsers() : [];
    const target = users.find(u => u.id === userId || u._docId === userId);
    const docId = target && target._docId ? target._docId : userId;
    db.collection('users').doc(docId).delete()
      .catch((err) => {
        console.warn('Foydalanuvchini bulutdan o\'chirishda xatolik:', err);
      });
  } catch (e) {
    console.error('deleteUserFromCloud xatoligi:', e);
  }
}

// 7. Barcha mahalliy foydalanuvchilarni bulutga yuklash (Initial Migration)
function uploadLocalUsersToCloud() {
  if (!db || !isFirebaseConnected || isSyncingFromCloud) return;
  try {
    const users = typeof getUsers === 'function' ? getUsers() : [];
    if (!users || users.length === 0) return;

    const batch = db.batch();
    users.forEach((user) => {
      const docId = user._docId || user.id || ('user_' + (user.email ? user.email.replace(/[^a-zA-Z0-9]/g, '_') : Date.now()));
      const docRef = db.collection('users').doc(docId);
      const payload = Object.assign({}, user);
      delete payload._docId;
      batch.set(docRef, payload, { merge: true });
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
function updateDatabaseStatusBadge(errCode) {
  const badges = document.querySelectorAll('.db-status-badge');
  badges.forEach((badge) => {
    if (errCode === 'permission-denied') {
      badge.innerHTML = '🔴 Baza yopiq (Rules: if true kerak)';
      badge.className = 'db-status-badge offline';
      badge.style.color = '#f38ba8';
      badge.style.background = 'rgba(243, 139, 168, 0.15)';
      badge.style.borderColor = 'rgba(243, 139, 168, 0.35)';
      return;
    }
    if (isFirebaseConnected) {
      badge.innerHTML = '🟢 Firebase Firestore: Ulangan';
      badge.className = 'db-status-badge connected';
      badge.style.color = '#10b981';
      badge.style.background = 'rgba(16, 185, 129, 0.15)';
      badge.style.borderColor = 'rgba(16, 185, 129, 0.35)';
    } else {
      badge.innerHTML = '🟡 Mahalliy Xotira (Offline)';
      badge.className = 'db-status-badge offline';
      badge.style.color = '#f59e0b';
      badge.style.background = 'rgba(245, 158, 11, 0.15)';
      badge.style.borderColor = 'rgba(245, 158, 11, 0.35)';
    }
  });
}

// Sahifa yuklanganda ishga tushirish
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFirebaseDatabase);
} else {
  initFirebaseDatabase();
}

