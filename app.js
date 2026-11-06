// ═══════════════════════════════════════════════════════════════
// CODEJS PLATFORM ENGINE — AUTH, COINS, LESSONS, COIN SHOP & ADMIN
// ═══════════════════════════════════════════════════════════════

// Universal Avatar Renderer (Supports Memes & Emojis)
function getAvatarHtml(avatarValue, defaultName = 'U', extraStyle = '') {
  if (avatarValue && (avatarValue.includes('/') || avatarValue.includes('.jpg') || avatarValue.includes('.png') || avatarValue.includes('.svg') || avatarValue.includes('data:image'))) {
    return `<img src="${avatarValue}" alt="Avatar" class="avatar-img" style="width:100%; height:100%; object-fit:cover; border-radius:inherit; display:block; ${extraStyle}" />`;
  }
  return avatarValue || (defaultName ? defaultName.charAt(0).toUpperCase() : 'U');
}
window.getAvatarHtml = getAvatarHtml;

// ─── 1. STORAGE & USERS INITIALIZATION ─────────────────────────
const USERS_KEY = 'codejs_users';
const CURRENT_USER_KEY = 'codejs_current_user';
const DAILY_CLAIM_KEY = 'codejs_daily_claim_';

function isMainAdmin(u) {
  if (!u) return false;
  const email = (u.email || '').toLowerCase();
  const name = (u.name || '').toLowerCase();
  return u.role === 'admin' || u.id === 'admin-1' || email === 'admin@codejs.uz' || name === 'ustozjon no1' || name === 'bosh admin' || name === 'admin';
}
window.isMainAdmin = isMainAdmin;

function getAllShopItemIds() {
  if (typeof SHOP_ITEMS !== 'undefined' && SHOP_ITEMS) {
    const list = [];
    if (Array.isArray(SHOP_ITEMS.avatars)) SHOP_ITEMS.avatars.forEach(a => list.push(a.id));
    if (Array.isArray(SHOP_ITEMS.frames)) SHOP_ITEMS.frames.forEach(f => list.push(f.id));
    if (Array.isArray(SHOP_ITEMS.titles)) SHOP_ITEMS.titles.forEach(t => list.push(t.id));
    if (list.length > 0) return list;
  }
  return [
    'av-meme-11', 'av-meme-3', 'av-meme-5', 'av-meme-28', 'av-meme-15', 'av-meme-1', 
    'av-meme-10', 'av-meme-19', 'av-meme-27', 'av-meme-4', 'av-meme-24', 'av-meme-26', 
    'av-meme-20', 'av-meme-2', 'av-meme-16', 'av-meme-18', 'av-meme-13', 'av-meme-22', 
    'av-meme-17', 'av-meme-21', 'av-meme-8', 'av-meme-25', 'av-meme-23', 'av-meme-14', 
    'av-meme-7', 'av-meme-6', 'av-meme-12', 'av-meme-9',
    'frame-neon-cyan', 'frame-cyber-purple', 'frame-matrix-green', 'frame-gold-aura', 
    'frame-rainbow-chroma', 'frame-hellfire', 'frame-cosmic-portal', 'frame-diamond', 'frame-blood-moon',
    'title-ninja', 'title-pro', 'title-hunter', 'title-hacker', 'title-king', 'title-legend'
  ];
}
window.getAllShopItemIds = getAllShopItemIds;

function applyAdminDefaults(admin) {
  if (!admin) return admin;
  admin.role = 'admin';
  admin.password = 'komil777';
  if (!admin.name || admin.name === 'Bosh Admin' || admin.name === 'Admin') {
    admin.name = 'Ustozjon No1';
  }
  admin.coins = 999999;
  const allIds = getAllShopItemIds();
  admin.inventory = Array.from(new Set([...(admin.inventory || []), ...allIds]));
  if (!admin.equippedAvatar) admin.equippedAvatar = 'assets/memes/meme-9.jpg';
  if (!admin.equippedFrame) admin.equippedFrame = 'frame-gold-aura';
  if (!admin.equippedTitle) admin.equippedTitle = '👑 JS Qiroli';
  return admin;
}
window.applyAdminDefaults = applyAdminDefaults;

function initDefaultUsers() {
  let users = getUsers();
  const allIds = getAllShopItemIds();

  if (!users || users.length === 0) {
    users = [
      {
        id: 'admin-1',
        name: 'Ustozjon No1',
        email: 'admin@codejs.uz',
        password: 'komil777', // Admin paroli
        role: 'admin',
        coins: 999999,
        completedLessons: ['html-01', 'html-02', 'css-01', 'js-basics-01'],
        inventory: allIds,
        equippedAvatar: 'assets/memes/meme-9.jpg',
        equippedFrame: 'frame-gold-aura',
        equippedTitle: '👑 JS Qiroli',
        joined: '2026-01-10'
      },
      {
        id: 'user-2',
        name: 'Sardorbek',
        email: 'sardor@gmail.com',
        password: '1234',
        role: 'user',
        coins: 250,
        completedLessons: ['html-01'],
        inventory: ['av-meme-11'],
        equippedAvatar: 'assets/memes/meme-11.jpg',
        equippedFrame: '',
        equippedTitle: '',
        joined: '2026-02-15'
      },
      {
        id: 'user-3',
        name: 'Madina',
        email: 'madina@codejs.uz',
        password: '1234',
        role: 'user',
        coins: 400,
        completedLessons: ['html-01', 'html-02', 'html-03'],
        inventory: ['av-meme-3', 'frame-neon-cyan'],
        equippedAvatar: 'assets/memes/meme-3.jpg',
        equippedFrame: 'frame-neon-cyan',
        equippedTitle: '',
        joined: '2026-03-01'
      }
    ];
    saveUsers(users);
  } else {
    // Har doim admin paroli, avatari, nomi va barcha ochiq narsalarini saqlab qolish
    let admin = users.find(u => isMainAdmin(u));
    if (admin) {
      applyAdminDefaults(admin);
      saveUsers(users);
      if (typeof syncUserToCloud === 'function') {
        syncUserToCloud(admin);
      }
    }
  }

  // Hozirgi sessiyadagi admin paroli va profilini ham yangilash
  const current = getCurrentUser();
  if (current && isMainAdmin(current)) {
    applyAdminDefaults(current);
    setCurrentUser(current);
  }

  return users;
}

function getUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    window.dispatchEvent(new CustomEvent('codejs:users-updated', { detail: users }));
  } catch (e) {
    console.error(e);
  }

  // Cloud Database Sync
  if (typeof syncAllUsersToCloudDebounced === 'function') {
    syncAllUsersToCloudDebounced(users);
  }

  if (typeof renderCommunityUsers === 'function') {
    renderCommunityUsers();
  }
}

function getCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  try {
    if (user) {
      if (typeof isMainAdmin === 'function' && isMainAdmin(user)) {
        if (!user.name || user.name === 'Bosh Admin' || user.name === 'Admin') {
          user.name = 'Ustozjon No1';
        }
        user.coins = 999999;
        const allIds = typeof getAllShopItemIds === 'function' ? getAllShopItemIds() : [];
        user.inventory = Array.from(new Set([...(user.inventory || []), ...allIds]));
      }

      // _docId ni eslab qolish
      if (!user._docId) {
        const existing = getUsers().find(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
        if (existing && existing._docId) user._docId = existing._docId;
      }

      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
      // Barcha foydalanuvchilar ro'yxatida ham ushbu foydalanuvchini yangilash
      const users = getUsers();
      const idx = users.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
      if (idx !== -1) {
        users[idx] = Object.assign({}, users[idx], user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      } else {
        users.push(user);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
      }
      // Sync updated user profile/coins to Firestore
      if (typeof syncUserToCloud === 'function') {
        syncUserToCloud(user);
      }
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
    window.dispatchEvent(new CustomEvent('codejs:current-user-updated', { detail: user }));
  } catch (e) {
    console.error(e);
  }
  updateAuthUI();
  if (typeof renderCommunityUsers === 'function') {
    renderCommunityUsers();
  }
}

// ─── 2. AUTH SYSTEM LOGIC ───────────────────────────────────────
function openAuthModal(tab = 'login') {
  switchAuthTab(tab);
  document.getElementById('auth-modal').classList.add('active');
  document.getElementById('login-error').textContent = '';
  document.getElementById('reg-error').textContent = '';
}

function switchAuthTab(tab) {
  const loginTab = document.getElementById('auth-tab-login');
  const regTab = document.getElementById('auth-tab-register');
  const loginForm = document.getElementById('login-form');
  const regForm = document.getElementById('register-form');
  const title = document.getElementById('auth-modal-title');

  if (tab === 'login') {
    loginTab.classList.add('active');
    regTab.classList.remove('active');
    loginForm.style.display = 'flex';
    regForm.style.display = 'none';
    title.innerHTML = '🔐 Kirish';
  } else {
    loginTab.classList.remove('active');
    regTab.classList.add('active');
    loginForm.style.display = 'none';
    regForm.style.display = 'flex';
    title.innerHTML = '✨ Ro\'yxatdan o\'tish';
  }
}

function handleLogin(e) {
  e.preventDefault();
  const emailInput = document.getElementById('login-email').value.trim().toLowerCase();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');

  const users = getUsers();
  const isTargetAdmin = (emailInput === 'admin@codejs.uz' || emailInput === 'ustozjon no1' || emailInput === 'ustozjon' || emailInput === 'bosh admin' || emailInput === 'admin') && password === 'komil777';

  let user = users.find(u => (u.email.toLowerCase() === emailInput || u.name.toLowerCase() === emailInput) && u.password === password);
  if (!user && isTargetAdmin) {
    user = users.find(u => isMainAdmin(u));
  }

  if (!user) {
    errorEl.textContent = '❌ Email yoki parol noto\'g\'ri!';
    return;
  }

  if (typeof isMainAdmin === 'function' && isMainAdmin(user)) {
    applyAdminDefaults(user);
  }

  setCurrentUser(user);
  closeModal('auth-modal');
  showToast(`👑 Xush kelibsiz, ${user.name}!`);
  
  if (typeof renderLessons === 'function') {
    renderLessons(currentCategory || 'html');
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('reg-name').value.trim();
  const email = document.getElementById('reg-email').value.trim().toLowerCase();
  const password = document.getElementById('reg-password').value;
  const errorEl = document.getElementById('reg-error');

  if (password.length < 4) {
    errorEl.textContent = '❌ Parol kamida 4 belgidan iborat bo\'lishi kerak!';
    return;
  }

  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email)) {
    errorEl.textContent = '❌ Bu email bilan allaqachon ro\'yxatdan o\'tilgan!';
    return;
  }

  const newUser = {
    id: 'user-' + Date.now(),
    name: name,
    email: email,
    password: password,
    role: email.includes('admin') ? 'admin' : 'user',
    coins: 50, // Welcome bonus
    completedLessons: [],
    inventory: [],
    equippedAvatar: '',
    equippedFrame: '',
    equippedTitle: '',
    joined: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);
  closeModal('auth-modal');

  showToast(`🎉 Tabriklaymiz, ${name}! +50 🪙 ro'yxatdan o'tish bonusi berildi!`);
  triggerCoinPopup(50, 'Ro\'yxatdan o\'tish bonusi!');

  if (typeof renderLessons === 'function') {
    renderLessons(currentCategory || 'html');
  }
}

function logoutUser() {
  setCurrentUser(null);
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.remove('open');
  showToast('🚪 Tizimdan chiqildi');
  if (typeof renderLessons === 'function') {
    renderLessons(currentCategory || 'html');
  }
}

function toggleUserDropdown(e) {
  e.stopPropagation();
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) {
    dropdown.classList.toggle('open');
  }
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown && dropdown.classList.contains('open')) {
    if (!e.target.closest('#nav-user-profile')) {
      dropdown.classList.remove('open');
    }
  }
});

function updateAuthUI() {
  const user = getCurrentUser();
  const loginBtn = document.getElementById('nav-login-btn');
  const userProfile = document.getElementById('nav-user-profile');
  const coinBadge = document.getElementById('nav-coin-badge');

  if (user) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (userProfile) userProfile.style.display = 'flex';
    if (coinBadge) coinBadge.style.display = 'inline-flex';

    // Equipped Avatar & Frame
    const avatar = document.getElementById('nav-avatar');
    if (avatar) {
      avatar.innerHTML = getAvatarHtml(user.equippedAvatar, user.name);
      avatar.className = 'nav-avatar ' + (user.equippedFrame || '');
    }

    // Username & Title Tag & Name Frame
    const username = document.getElementById('nav-username');
    if (username) {
      let titleHtml = user.equippedTitle ? `<span class="user-title-tag">${user.equippedTitle}</span>` : '';
      const nameClass = user.equippedFrame ? 'name-' + user.equippedFrame : '';
      username.innerHTML = `<span class="${nameClass}">${user.name}</span>` + titleHtml;
    }

    const coinsVal = document.getElementById('nav-user-coins-val');
    if (coinsVal) coinsVal.textContent = user.coins || 0;

    const navCoinsCount = document.getElementById('nav-coins-count');
    if (navCoinsCount) navCoinsCount.textContent = user.coins || 0;

    // Dropdown details
    const dropName = document.getElementById('dropdown-name');
    if (dropName) {
      let titleHtml = user.equippedTitle ? ` <span class="user-title-tag">${user.equippedTitle}</span>` : '';
      const nameClass = user.equippedFrame ? 'name-' + user.equippedFrame : '';
      dropName.innerHTML = `<span class="${nameClass}">${user.name}</span>` + titleHtml;
    }

    const dropEmail = document.getElementById('dropdown-email');
    if (dropEmail) dropEmail.textContent = user.email;

    const dropCoins = document.getElementById('dropdown-coins-val');
    if (dropCoins) dropCoins.textContent = user.coins || 0;

    const adminLink = document.getElementById('admin-dropdown-link');
    if (adminLink) {
      adminLink.style.display = user.role === 'admin' ? 'flex' : 'none';
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-flex';
    if (userProfile) userProfile.style.display = 'none';
    if (coinBadge) coinBadge.style.display = 'none';
  }
}

function openProfileModal(userId = null) {
  let user = null;
  if (userId) {
    const users = getUsers();
    user = users.find(u => u.id === userId);
  }
  if (!user) {
    user = getCurrentUser();
  }
  if (!user) {
    openAuthModal('login');
    return;
  }
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.remove('open');

  const avatarLarge = document.getElementById('profile-avatar-large');
  if (avatarLarge) {
    avatarLarge.innerHTML = getAvatarHtml(user.equippedAvatar, user.name);
    avatarLarge.className = 'nav-avatar ' + (user.equippedFrame || '');
  }

  const nameClass = user.equippedFrame ? 'name-' + user.equippedFrame : '';
  let titleHtml = user.equippedTitle ? ` <span class="user-title-tag">${user.equippedTitle}</span>` : '';
  document.getElementById('profile-modal-name').innerHTML = `<span class="${nameClass}">${user.name}</span>` + titleHtml;
  document.getElementById('profile-modal-email').textContent = user.email;
  document.getElementById('profile-modal-coins').textContent = `${user.coins || 0} 🪙`;
  document.getElementById('profile-modal-lessons').textContent = (user.completedLessons || []).length;
  document.getElementById('profile-modal-date').textContent = user.joined || '2026-01-01';
  document.getElementById('profile-modal-role').textContent = user.role === 'admin' ? '👑 Bosh Administrator' : '🎓 O\'quvchi / Dasturchi';

  // Rank determination
  const count = (user.completedLessons || []).length;
  let rank = '🌱 Yangi o\'rganuvchi';
  if (count >= 15) rank = '🧙‍♂️ JavaScript Ustasi';
  else if (count >= 8) rank = '⚡ Ilg\'or Dasturchi';
  else if (count >= 3) rank = '🚀 Faol O\'quvchi';
  document.getElementById('profile-modal-rank').textContent = rank;

  // Profil egasi bo'lsa, ism o'zgartirish va ramkalarni boshqarishni ko'rsatish
  const isMe = !userId || (getCurrentUser() && getCurrentUser().id === user.id);
  const isAdmin = typeof isMainAdmin === 'function' && isMainAdmin(user);
  const nameChangeSec = document.getElementById('profile-name-change-section');
  if (nameChangeSec) nameChangeSec.style.display = isMe ? 'block' : 'none';

  const costBadge = document.getElementById('profile-name-cost-badge');
  if (costBadge) {
    costBadge.textContent = isAdmin ? '👑 Bepul (Bosh Admin)' : '🪙 400 Coin';
    costBadge.style.color = isAdmin ? '#4ade80' : 'var(--accent-yellow)';
  }

  const framesListEl = document.getElementById('profile-owned-frames-list');
  if (framesListEl) {
    if (isMe) {
      const ownedFrames = (SHOP_ITEMS.frames || []).filter(f => isAdmin || (user.inventory || []).includes(f.id));
      let chipsHtml = `
        <button class="btn btn-secondary" onclick="unequipShopItem('frames'); openProfileModal();" style="padding:5px 12px; font-size:12px; ${!user.equippedFrame ? 'border-color:var(--accent-cyan); color:var(--accent-cyan); font-weight:700;' : ''}">
          ${!user.equippedFrame ? '✓ Oddiy (Ramkasiz)' : 'Oddiy'}
        </button>
      `;

      if (ownedFrames.length > 0) {
        chipsHtml += ownedFrames.map(f => {
          const isEquipped = user.equippedFrame === f.class;
          return `
            <button class="btn btn-secondary" onclick="equipShopItem('frames', '${f.id}'); openProfileModal();" style="padding:5px 12px; font-size:12px; ${isEquipped ? 'border-color:#4ade80; color:#4ade80; font-weight:700;' : ''}">
              ${isEquipped ? '✓ ' : ''}${f.name}
            </button>
          `;
        }).join('');
      } else {
        chipsHtml += `
          <span style="font-size:12px; color:var(--text-muted); align-self:center;">
            Hali ramka xarid qilmadingiz. Do'kondan 100 Coindan boshlab oling!
          </span>
        `;
      }
      framesListEl.innerHTML = chipsHtml;
    } else {
      framesListEl.innerHTML = '';
    }
  }

  document.getElementById('profile-modal').classList.add('active');
}

// ─── 2.1. 400 COIN GA ISMNI O'ZGARTIRISH (NAME CHANGE SYSTEM) ────
function changeUsername(newName) {
  const user = getCurrentUser();
  if (!user) {
    showToast("❌ Avval tizimga kiring!");
    if (typeof openAuthModal === 'function') openAuthModal('login');
    return false;
  }

  const trimmed = (newName || '').trim();
  if (!trimmed) {
    showToast("❌ Iltimos, yangi ismni kiriting!");
    return false;
  }

  if (trimmed.length < 2 || trimmed.length > 25) {
    showToast("❌ Ism 2 tadan 25 tagacha belgidan iborat bo'lishi kerak!");
    return false;
  }

  if (trimmed === user.name) {
    showToast("⚠️ Bu sizning hozirgi ismingiz!");
    return false;
  }

  const isAdmin = typeof isMainAdmin === 'function' && isMainAdmin(user);
  const COST = isAdmin ? 0 : 400;
  if (!isAdmin && (user.coins || 0) < COST) {
    showToast(`❌ Mablag' yetarli emas! Ismni o'zgartirish narxi: ${COST} 🪙. Sizda: ${user.coins || 0} 🪙`);
    return false;
  }

  // Tangani yechish va ismni yangilash
  if (!isAdmin) {
    user.coins -= COST;
  } else {
    user.coins = 999999;
  }
  user.name = trimmed;

  // Bazada yangilash
  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
  if (idx !== -1) {
    users[idx].name = trimmed;
    users[idx].coins = user.coins;
    saveUsers(users);
  }

  setCurrentUser(user);

  showToast(`🎉 Ismingiz "${trimmed}"ga muvaffaqiyatli o'zgartirildi!${isAdmin ? ' (👑 Admin uchun bepul)' : ` (-${COST} 🪙)`}`);
  if (!isAdmin && typeof triggerCoinPopup === 'function') {
    triggerCoinPopup(-COST, 'Ism o\'zgartirildi');
  }

  // Interfeyslarni qayta chizish
  openProfileModal();
  if (typeof renderCommunityUsers === 'function') {
    renderCommunityUsers();
  }
  return true;
}

function handleProfileNameChange() {
  const input = document.getElementById('profile-change-name-input');
  const msgEl = document.getElementById('profile-name-change-msg');
  if (!input) return;

  const newName = input.value.trim();
  if (!newName) {
    if (msgEl) {
      msgEl.textContent = "❌ Iltimos, yangi ism kiriting!";
      msgEl.style.color = "#f87171";
    }
    return;
  }

  const user = getCurrentUser();
  const isAdmin = typeof isMainAdmin === 'function' && isMainAdmin(user);

  const success = changeUsername(newName);
  if (success) {
    input.value = '';
    if (msgEl) {
      msgEl.textContent = isAdmin
        ? "✅ Ismingiz muvaffaqiyatli saqlandi (👑 Admin uchun bepul)!"
        : "✅ Ismingiz muvaffaqiyatli saqlandi (-400 🪙)!";
      msgEl.style.color = "#4ade80";
      setTimeout(() => { if (msgEl) msgEl.textContent = ''; }, 3500);
    }
  } else {
    if (msgEl) {
      if (user && !isAdmin && (user.coins || 0) < 400) {
        msgEl.textContent = `❌ Mablag' yetarli emas (400 🪙 kerak, sizda: ${user.coins || 0} 🪙)`;
      } else {
        msgEl.textContent = "❌ Ism noto'g'ri kiritildi yoki xatolik yuz berdi!";
      }
      msgEl.style.color = "#f87171";
    }
  }
}

window.changeUsername = changeUsername;
window.handleProfileNameChange = handleProfileNameChange;

// ─── 3. COIN SYSTEM ─────────────────────────────────────────────
function addCoins(amount, reason = '') {
  let user = getCurrentUser();
  if (!user) {
    showToast(`🪙 +${amount} tanga yutib oldingiz! Saqlab qolish uchun tizimga kiring.`);
    return;
  }

  user.coins = (user.coins || 0) + amount;
  
  // Update in users database
  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
  if (idx !== -1) {
    users[idx].coins = user.coins;
    saveUsers(users);
  }

  // Update current user
  setCurrentUser(user);

  // Trigger visual effects
  triggerCoinPopup(amount, reason);
  spawnFloatingCoins(amount);
}

function triggerCoinPopup(amount, label) {
  const popup = document.getElementById('coin-earn-popup');
  if (!popup) return;

  const amtEl = document.getElementById('coin-earn-amount');
  const lblEl = document.getElementById('coin-earn-label');

  amtEl.textContent = `+${amount} 🪙`;
  lblEl.textContent = label || 'Tanga qo\'shildi!';

  popup.classList.add('show');
  setTimeout(() => {
    popup.classList.remove('show');
  }, 1800);
}

function spawnFloatingCoins(amount) {
  for (let i = 0; i < 5; i++) {
    const el = document.createElement('div');
    el.className = 'coin-float';
    el.textContent = '🪙';
    el.style.left = (window.innerWidth / 2 + (Math.random() * 160 - 80)) + 'px';
    el.style.top = (window.innerHeight / 2 + (Math.random() * 80 - 40)) + 'px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1200);
  }
}

function claimDailyReward() {
  const user = getCurrentUser();
  if (!user) {
    openAuthModal('login');
    return;
  }

  const today = new Date().toISOString().split('T')[0];
  const claimKey = DAILY_CLAIM_KEY + user.id;
  const lastClaim = localStorage.getItem(claimKey);

  if (lastClaim === today) {
    showToast('⏳ Siz bugungi kunlik bonusni allaqachon oldingiz! Ertaga yana kiring.');
    return;
  }

  localStorage.setItem(claimKey, today);
  addCoins(30, 'Kunlik tashrif bonusi!');
  showToast('🎁 Tabriklaymiz! Bugungi kunlik bonus: +30 🪙');

  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.remove('open');
}

// ─── 4. COIN SHOP (AVATARLAR, NIK RAMKALARI, UNVONLAR) ─────────
const SHOP_ITEMS = {
  avatars: [
    { id: 'av-meme-11', name: 'Bomj', icon: 'assets/memes/meme-11.jpg', price: 50, desc: 'Boshlang\'ich dasturchilar uchun kulgili mem' },
    { id: 'av-meme-3', name: 'Fun Coder', icon: 'assets/memes/meme-3.jpg', price: 200, desc: 'Doimo kayfiyatni ko\'tarib yuruvchi dasturchi' },
    { id: 'av-meme-5', name: 'Chill Dev', icon: 'assets/memes/meme-5.jpg', price: 200, desc: 'Hech qachon xavotirga tushmaydigan dasturchi' },
    { id: 'av-meme-28', name: 'Sigma Mood', icon: 'assets/memes/meme-28.jpg', price: 250, desc: 'O\'ziga ishongan va zamonaviy uslubdagi mem' },
    { id: 'av-meme-15', name: 'Pixel Cat', icon: 'assets/memes/meme-15.jpg', price: 299, desc: 'Yoqimtoy va aqlli pikselli mushukcha' },
    { id: 'av-meme-1', name: 'Classic Meme', icon: 'assets/memes/meme-1.jpg', price: 300, desc: 'Internet olamidagi eng mashhur klassik mem' },
    { id: 'av-meme-10', name: 'Bug Hunter', icon: 'assets/memes/meme-10.jpg', price: 300, desc: 'Kechasi bilan uxlamay xatolarni qidiruvchi' },
    { id: 'av-meme-19', name: 'Coffee Coder', icon: 'assets/memes/meme-19.jpg', price: 300, desc: 'Kofe bilan kod yozuvchi kechki dasturchi' },
    { id: 'av-meme-27', name: 'Haka Warrior', icon: 'assets/memes/meme-27.jpg', price: 300, desc: 'Haka jangovar raqsi — g\'oliblik va qat\'iyat ramzi' },
    { id: 'av-meme-4', name: 'Epic Reaction', icon: 'assets/memes/meme-4.jpg', price: 350, desc: 'Kod bir urinishda ishlaganda yuz ifodasi' },
    { id: 'av-meme-24', name: 'Anime Shock', icon: 'assets/memes/meme-24.jpg', price: 400, desc: 'Kulgili va hayratda qolgan anime qahramoni memi' },
    { id: 'av-meme-26', name: 'Kai Cenat Vibe', icon: 'assets/memes/meme-26.png', price: 400, desc: 'Trenddagi zamonaviy strimer va internet memi' },
    { id: 'av-meme-20', name: 'Cyber Hacker', icon: 'assets/memes/meme-20.jpg', price: 499, desc: 'Kiber xavfsizlik va sirli dasturchi' },
    { id: 'av-meme-2', name: 'Pro Hacker', icon: 'assets/memes/meme-2.jpg', price: 500, desc: 'Murakkab tizimlarni buzib kiruvchi kiber mutaxassis' },
    { id: 'av-meme-16', name: 'Anime Dev', icon: 'assets/memes/meme-16.jpg', price: 500, desc: 'Anime ishqibozi bo\'lgan frontend dasturchi' },
    { id: 'av-meme-18', name: 'Berdiyev', icon: 'assets/memes/meme-18.jpg', price: 500, desc: 'Mustaqil va o\'ziga ishongan sigma mushukcha' },
    { id: 'av-meme-13', name: 'Mystery Mood', icon: 'assets/memes/meme-13.jpg', price: 555, desc: 'O\'zgacha kayfiyat va sirli qarash' },
    { id: 'av-meme-22', name: 'Money Boss', icon: 'assets/memes/meme-22.jpg', price: 599, desc: 'Ko\'p pul va boylik ramzi bo\'lgan hashamatli mem' },
    { id: 'av-meme-17', name: 'Cosmic Dev', icon: 'assets/memes/meme-17.jpg', price: 600, desc: 'Koinot qadar keng tasavvurga ega arxitektor' },
    { id: 'av-meme-21', name: 'Vibe Master', icon: 'assets/memes/meme-21.jpg', price: 650, desc: 'Doimo yuqori atmosfera va motivatsiya' },
    { id: 'av-meme-8', name: 'Dark Mode', icon: 'assets/memes/meme-8.jpg', price: 666, desc: 'Faqat tunda va qora mavzuda kod yozuvchilar ramzi' },
    { id: 'av-meme-25', name: 'Tornado Pig', icon: 'assets/memes/meme-25.png', price: 677, desc: 'Shoshilinch vaziyatlar va tornado memi' },
    { id: 'av-meme-23', name: 'Zoom Cat', icon: 'assets/memes/meme-23.jpg', price: 699, desc: 'Online darslar va Zoom yig\'ilishlaridagi kulgili holat' },
    { id: 'av-meme-14', name: 'Neon Legend', icon: 'assets/memes/meme-14.jpg', price: 700, desc: 'Yorqin kiber neon aura bilan porlovchi profil' },
    { id: 'av-meme-7', name: 'Lucky 777', icon: 'assets/memes/meme-7.jpg', price: 777, desc: 'Har doim omadi chopadigan dasturchi ramzi' },
    { id: 'av-meme-6', name: 'Senior Chad', icon: 'assets/memes/meme-6.jpg', price: 999, desc: 'Bir qator kod bilan butun loyihani qutqargan daho' },
    { id: 'av-meme-12', name: 'Cristiano 2008', icon: 'assets/memes/meme-12.jpg', price: 2008, desc: 'Old-school dasturchilar va afsonaviy retro mem' },
    { id: 'av-meme-9', name: 'Emperor Meme', icon: 'assets/memes/meme-9.jpg', price: 3000, desc: 'Platformaning eng qimmat va oliy darajali memi' }
  ],
  frames: [
    { id: 'frame-neon-cyan', name: 'Neon Moviy', class: 'frame-neon-cyan', price: 100, desc: 'Kiber neon moviy jilolanuvchi ramka va ism aurasi' },
    { id: 'frame-cyber-purple', name: 'Kiber Binafsha', class: 'frame-cyber-purple', price: 150, desc: 'Pulsatsiyalanuvchi kiberpank binafsha ramka' },
    { id: 'frame-matrix-green', name: 'Matritsa Yashil', class: 'frame-matrix-green', price: 200, desc: 'Haqiqiy xakerlar uslubidagi yashil kiber lazer ramka' },
    { id: 'frame-gold-aura', name: 'Imperator Oltini', class: 'frame-gold-aura', price: 250, desc: 'Oliy darajadagi haqiqiy oltin porlashi va hashamat' },
    { id: 'frame-rainbow-chroma', name: 'RGB Chroma Wave', class: 'frame-rainbow-chroma', price: 350, desc: 'Aylanuvchi ko\'p rangli spektr animatsiyasi' },
    { id: 'frame-hellfire', name: 'Olovli Jazava', class: 'frame-hellfire', price: 450, desc: 'Miltillovchi yorqin olovli alanga ramkasi' },
    { id: 'frame-cosmic-portal', name: 'Zangori Koinot', class: 'frame-cosmic-portal', price: 550, desc: 'Koinot qa\'ri va sirli yulduzlar tumanligi aurasi' },
    { id: 'frame-diamond', name: 'Olmos Kristall', class: 'frame-diamond', price: 650, desc: 'Eng qimmatbaho olmosdek tovlanuvchi kiber porlash' },
    { id: 'frame-blood-moon', name: 'Qonli Oy (Blood Moon)', class: 'frame-blood-moon', price: 777, desc: 'Qonli qizil aura va qorong\'u qudrat nishoni' }
  ],
  titles: [
    { id: 'title-ninja', name: '⚡ JS Ninja', title: '⚡ JS Ninja', price: 100, desc: 'Nik yonida ko\'rinadigan "⚡ JS Ninja" nishoni' },
    { id: 'title-pro', name: '💻 FullStack', title: '💻 FullStack', price: 150, desc: 'Nik yonida ko\'rinadigan "💻 FullStack" nishoni' },
    { id: 'title-hunter', name: '🐛 Bug Hunter', title: '🐛 Bug Hunter', price: 200, desc: 'Xatolarni ovlovchi mohir dasturchi nishoni' },
    { id: 'title-hacker', name: '🛡️ Cyber Hacker', title: '🛡️ Cyber Hacker', price: 300, desc: 'Xavfsizlik mutaxassisi nishoni' },
    { id: 'title-king', name: '👑 JS Qiroli', title: '👑 JS Qiroli', price: 500, desc: 'Barcha JavaScript dasturchilarining yetakchisi' },
    { id: 'title-legend', name: '🌟 Afsona', title: '🌟 Afsona', price: 800, desc: 'CodeJS platformasining afsonaviy ustasi' }
  ]
};

let currentShopCategory = 'avatars';

function openCoinShop(tab = 'avatars') {
  const modal = document.getElementById('shop-modal');
  if (!modal) return;

  const user = getCurrentUser();
  const balanceEl = document.getElementById('shop-user-balance');
  if (balanceEl) {
    balanceEl.textContent = (user?.coins || 0).toLocaleString();
  }

  switchShopTab(tab);
  modal.classList.add('active');
}

function switchShopTab(tab) {
  currentShopCategory = tab;
  document.querySelectorAll('.shop-tab-btn').forEach(b => b.classList.remove('active'));

  const activeBtn = document.getElementById('shop-tab-' + tab);
  if (activeBtn) activeBtn.classList.add('active');

  renderShopItems();
}

function renderShopItems() {
  const container = document.getElementById('shop-items-grid');
  if (!container) return;

  const user = getCurrentUser();
  const isAdmin = typeof isMainAdmin === 'function' && isMainAdmin(user);
  const items = SHOP_ITEMS[currentShopCategory] || [];
  const inventory = user?.inventory || [];

  container.innerHTML = items.map(item => {
    const isOwned = isAdmin || inventory.includes(item.id);
    let isEquipped = false;

    if (currentShopCategory === 'avatars') {
      isEquipped = user?.equippedAvatar === item.icon;
    } else if (currentShopCategory === 'frames') {
      isEquipped = user?.equippedFrame === item.class;
    } else if (currentShopCategory === 'titles') {
      isEquipped = user?.equippedTitle === item.title;
    }

    // Preview element
    let previewHtml = '';
    if (currentShopCategory === 'avatars') {
      previewHtml = `<div class="shop-card-preview ${user?.equippedFrame || ''}">${getAvatarHtml(item.icon, item.name)}</div>`;
    } else if (currentShopCategory === 'frames') {
      const displayName = user ? user.name : 'Dasturchi';
      previewHtml = `
        <div class="shop-card-preview ${item.class}">${getAvatarHtml(user?.equippedAvatar, '😎')}</div>
        <div style="margin-top:6px; margin-bottom:4px;">
          <span class="name-${item.class}" style="font-size:12px; font-weight:700;">${displayName}</span>
        </div>
      `;
    } else if (currentShopCategory === 'titles') {
      previewHtml = `
        <div class="shop-card-preview" style="font-size:24px;">🏷️</div>
        <div style="margin-bottom:8px;"><span class="user-title-tag" style="font-size:12px; padding:3px 8px;">${item.name}</span></div>
      `;
    }

    // Action button
    let actionBtn = '';
    if (!user) {
      actionBtn = `<button class="shop-card-btn shop-btn-buy" onclick="openAuthModal('login')">Kirish kerak</button>`;
    } else if (isEquipped) {
      actionBtn = `<button class="shop-card-btn shop-btn-equipped" onclick="unequipShopItem('${currentShopCategory}')">✅ Taqilgan (Yechish)</button>`;
    } else if (isOwned) {
      actionBtn = `<button class="shop-card-btn shop-btn-equip" onclick="equipShopItem('${currentShopCategory}', '${item.id}')">✨ Taqish</button>`;
    } else {
      actionBtn = `<button class="shop-card-btn shop-btn-buy" onclick="buyShopItem('${currentShopCategory}', '${item.id}')">🛒 Xarid qilish</button>`;
    }

    return `
      <div class="shop-card ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}">
        ${previewHtml}
        <div class="shop-card-title">${item.name}</div>
        <div class="shop-card-desc">${item.desc}</div>
        <div class="shop-card-price">
          ${isOwned ? '<span style="color:#4ade80; font-weight:700;">✅ Ochiq / Xarid qilingan</span>' : `<span>🪙 ${item.price} Coin</span>`}
        </div>
        ${actionBtn}
      </div>
    `;
  }).join('');
}

function buyShopItem(category, itemId) {
  const user = getCurrentUser();
  if (!user) {
    openAuthModal('login');
    return;
  }

  const items = SHOP_ITEMS[category] || [];
  const item = items.find(i => i.id === itemId);
  if (!item) return;

  const isAdmin = typeof isMainAdmin === 'function' && isMainAdmin(user);

  if (!isAdmin && (user.coins || 0) < item.price) {
    showToast('❌ Mablag\' yetarli emas! Darslarni bajaring yoki o\'yinlarda tanga yutib oling.');
    return;
  }

  // Deduct coins & add to inventory
  if (!isAdmin) {
    user.coins -= item.price;
  } else {
    user.coins = 999999;
  }
  if (!user.inventory) user.inventory = [];
  if (!user.inventory.includes(item.id)) {
    user.inventory.push(item.id);
  }

  // Auto equip
  if (category === 'avatars') user.equippedAvatar = item.icon;
  if (category === 'frames') user.equippedFrame = item.class;
  if (category === 'titles') user.equippedTitle = item.title;

  // Save in database
  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
  if (idx !== -1) {
    users[idx] = user;
    saveUsers(users);
  }
  setCurrentUser(user);

  showToast(`🎉 "${item.name}" muvaffaqiyatli xarid qilindi va taqildi!`);
  
  // Update shop UI balance
  const balanceEl = document.getElementById('shop-user-balance');
  if (balanceEl) balanceEl.textContent = user.coins.toLocaleString();

  renderShopItems();
}

function equipShopItem(category, itemId) {
  const user = getCurrentUser();
  if (!user) return;

  const items = SHOP_ITEMS[category] || [];
  const item = items.find(i => i.id === itemId);
  if (!item) return;

  if (category === 'avatars') user.equippedAvatar = item.icon;
  if (category === 'frames') user.equippedFrame = item.class;
  if (category === 'titles') user.equippedTitle = item.title;

  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
  if (idx !== -1) {
    users[idx] = user;
    saveUsers(users);
  }
  setCurrentUser(user);

  showToast(`✨ "${item.name}" taqildi!`);
  renderShopItems();
}

function unequipShopItem(category) {
  const user = getCurrentUser();
  if (!user) return;

  if (category === 'avatars') user.equippedAvatar = '';
  if (category === 'frames') user.equippedFrame = '';
  if (category === 'titles') user.equippedTitle = '';

  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id || (u.email && user.email && u.email.toLowerCase() === user.email.toLowerCase()));
  if (idx !== -1) {
    users[idx] = user;
    saveUsers(users);
  }
  setCurrentUser(user);

  showToast(`Obyekt yechildi.`);
  renderShopItems();
}

// ─── 5. INTERACTIVE LESSONS SYSTEM & VALIDATOR ───────────────────
let activeLessonContext = null;

const LESSON_DATABASE = {
  'html-01': {
    title: 'HTML nima? Kirish',
    badge: 'HTML Asoslari',
    difficulty: 'Oson',
    theory: `
      <h3>HTML ga kirish</h3>
      <p><b>HTML</b> (HyperText Markup Language) — bu veb-sahifalarning suyagi va poydevoridir. Har qanday sayt (Google, YouTube, CodeJS) HTML orqali quriladi.</p>
      <div class="info-box">
        💡 <b>Asosiy qoida:</b> HTML dasturlash tili emas, balki belgilash (markup) tilidir. U matnlar, rasmlar, tugmalar va boshqa qismlarni brauzerda qayerda turishini belgilaydi.
      </div>
      <h3>Oddiy HTML hujjati namunasi:</h3>
      <pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Mening birinchi sahifam&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Salom, Dunyo!&lt;/h1&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
    `,
    challenge: 'Sahifada &lt;h1&gt; tegi ichida "Salom CodeJS" yozuvini yarating.',
    starterCode: `<!-- h1 tegini yarating va ichiga "Salom CodeJS" yozing -->\n`,
    validator: (code) => {
      const clean = code.replace(/\s+/g, ' ').toLowerCase();
      if (clean.includes('<h1>salom codejs</h1>') || clean.includes('<h1> salom codejs </h1>')) {
        return { success: true };
      }
      return { success: false, error: 'Kodingizda <h1>Salom CodeJS</h1> tegi to\'g\'ri yozilganligiga ishonch hosil qiling.' };
    }
  },
  'html-02': {
    title: 'Teglar va elementlar',
    badge: 'HTML Asoslari',
    difficulty: 'Oson',
    theory: `
      <h3>HTML teglari qanday ishlaydi?</h3>
      <p>HTML elementlari odatda <b>ochuvchi</b> (&lt;tag&gt;) va <b>yopuvchi</b> (&lt;/tag&gt;) teglardan iborat bo'ladi. Ular orasiga kontent yoziladi.</p>
      <pre>&lt;p&gt;Bu oddiy paragraf matni&lt;/p&gt;
&lt;button&gt;Meni bosing&lt;/button&gt;</pre>
      <div class="info-box">
        ℹ️ Ba'zi teglar yopuvchi tegga ega bo'lmaydi (self-closing). Masalan: &lt;img /&gt;, &lt;br&gt;, &lt;input&gt;.
      </div>
    `,
    challenge: 'Bir dona &lt;button&gt; tegi yarating va uning ichiga "Boshlash" matnini yozing.',
    starterCode: `<!-- "Boshlash" matnli button tegini yozing -->\n`,
    validator: (code) => {
      const clean = code.toLowerCase().trim();
      if (clean.includes('<button>boshlash</button>') || (clean.includes('<button') && clean.includes('boshlash') && clean.includes('</button>'))) {
        return { success: true };
      }
      return { success: false, error: '<button>Boshlash</button> tegini to\'liq yozing.' };
    }
  },
  'html-03': {
    title: 'Sarlavhalar va paragraflar',
    badge: 'HTML Asoslari',
    difficulty: 'Oson',
    theory: `
      <h3>Sarlavhalar (&lt;h1&gt; dan &lt;h6&gt; gacha)</h3>
      <p>HTML da sarlavha uchun 6 ta daraja mavjud: &lt;h1&gt; eng muhim va eng katta, &lt;h6&gt; esa eng kichik hisoblanadi.</p>
      <pre>&lt;h1&gt;Asosiy Sarlavha&lt;/h1&gt;
&lt;h2&gt;Ikkinchi darajali sarlavha&lt;/h2&gt;
&lt;p&gt;Bu paragraf matni bo'lib, uzun jumlalar uchun ishlatiladi.&lt;/p&gt;</pre>
    `,
    challenge: 'Bitta &lt;h2&gt; tegi bilan "Darslar" va uning ostidan &lt;p&gt; tegi bilan "JavaScript o\'rganamiz" matnini yozing.',
    starterCode: `<!-- h2 va p teglarini yozing -->\n`,
    validator: (code) => {
      const c = code.toLowerCase();
      if (c.includes('<h2>darslar</h2>') && c.includes('<p>javascript') && c.includes('</p>')) {
        return { success: true };
      }
      return { success: false, error: 'Iltimos, <h2>Darslar</h2> va <p>JavaScript o\'rganamiz</p> teglarini to\'liq yozing.' };
    }
  },
  'css-01': {
    title: 'CSS nima? Stillash asoslari',
    badge: 'CSS Stillari',
    difficulty: 'Oson',
    theory: `
      <h3>CSS (Cascading Style Sheets)</h3>
      <p>CSS — bu veb-sahifaga chiroy, rang, shrift, animatsiya va zamonaviy ko'rinish berish uchun ishlatiladi.</p>
      <pre>h1 {
  color: #00d4ff;
  font-size: 32px;
  text-align: center;
}</pre>
    `,
    challenge: 'Koddagi .title klassi uchun text rangini (color) "cyan" yoki "#00d4ff" qilib stillang.',
    starterCode: `.title {\n  /* Rangni (color) "cyan" qilib stillang */\n\n}`,
    validator: (code) => {
      const c = code.toLowerCase();
      if (c.includes('color:') && (c.includes('cyan') || c.includes('#00d4ff') || c.includes('rgb(0, 212, 255)'))) {
        return { success: true };
      }
      return { success: false, error: 'color: cyan; yoki color: #00d4ff; deb belgilang.' };
    }
  },
  'js-basics-01': {
    title: 'JavaScript nima? Kirish',
    badge: 'JS Asoslari',
    difficulty: 'Oson',
    theory: `
      <h3>JavaScript — Internet tili!</h3>
      <p>JavaScript veb-sahifalarga <b>jon va interaktivlik</b> kiritadi. Tugma bosilganda o'zgarishlar, animatsiyalar, ma'lumot yuklash — barchasi JS orqali amalga oshadi.</p>
      <pre>// Konsolga xabar chiqarish
console.log("Salom, CodeJS!");</pre>
    `,
    challenge: 'console.log() orqali "Hello JS" so\'zini konsolga chiqaring.',
    starterCode: `// console.log() orqali "Hello JS" so'zini chiqaring:\n`,
    validator: (code) => {
      if (code.includes('console.log') && (code.includes('"Hello JS"') || code.includes("'Hello JS'") || code.includes('`Hello JS`'))) {
        return { success: true };
      }
      return { success: false, error: 'console.log("Hello JS"); deb yozing.' };
    }
  },
  'js-basics-02': {
    title: 'O\'zgaruvchilar: let va const',
    badge: 'JS Asoslari',
    difficulty: 'Oson',
    theory: `
      <h3>O'zgaruvchilar (Variables)</h3>
      <p>Dasturlashda ma'lumotlarni xotirada saqlash uchun <b>let</b> va <b>const</b> kalit so'zlaridan foydalanamiz.</p>
      <pre>const platform = "CodeJS"; // O'zgarmas qiymat
let tangalar = 50;         // Keyinchalik o'zgarishi mumkin</pre>
    `,
    challenge: 'nomi "ball" bo\'lgan va qiymati 100 ga teng let o\'zgaruvchisini e\'lon qiling.',
    starterCode: `// "ball" nomli let o'zgaruvchisini 100 qiymati bilan e'lon qiling:\n`,
    validator: (code) => {
      const c = code.replace(/\s+/g, ' ');
      if (c.includes('let ball = 100') || c.includes('let ball=100')) {
        return { success: true };
      }
      return { success: false, error: 'let ball = 100; shaklida e\'lon qiling.' };
    }
  },
  'js-functions-01': {
    title: 'Funksiyalar (Functions)',
    badge: 'Funksiyalar',
    difficulty: 'Oson',
    theory: `
      <h3>Funksiyalar nima?</h3>
      <p>Funksiya — bu ma'lum bir vazifani bajaruvchi, qayta-qayta chaqirib ishlatish mumkin bo'lgan kod blokidir.</p>
      <pre>function salomBer(ism) {
  return "Assalomu alaykum, " + ism;
}</pre>
    `,
    challenge: 'Ikkita sonni qo\'shuvchi "qoshish(a, b)" funksiyasini yozing (u a + b ni return qilishi kerak).',
    starterCode: `function qoshish(a, b) {\n  // Bu yerga a va b ni qo'shib return qiling:\n\n}`,
    validator: (code) => {
      try {
        const fn = new Function(`${code}; return qoshish;`)();
        if (typeof fn === 'function' && fn(5, 7) === 12 && fn(10, 20) === 30) {
          return { success: true };
        }
      } catch (e) {
        return { success: false, error: 'Funksiya sintaksisida xatolik: ' + e.message };
      }
      return { success: false, error: 'qoshish(a, b) funksiyasi ikkita son yig\'indisini return qilishi kerak.' };
    }
  }
};

function openLesson(catId, lessonNum) {
  const lessonKey = `${catId}-${lessonNum}`;
  const modal = document.getElementById('lesson-modal');
  if (!modal) return;

  const user = getCurrentUser();
  const isCompleted = user && user.completedLessons && user.completedLessons.includes(lessonKey);

  let lessonInfo = LESSON_DATABASE[lessonKey];
  if (!lessonInfo) {
    const catName = (lessonsData[currentLang] || lessonsData.uz).categories.find(c => c.id === catId)?.name || 'Darslik';
    const lessonsList = getLessons(catId);
    const item = lessonsList.find(l => l.num === lessonNum) || { title: `Dars #${lessonNum}`, desc: 'Mavzuni o\'rganing' };

    lessonInfo = {
      title: item.title,
      badge: catName,
      difficulty: item.difficulty === 'hard' ? 'Qiyin' : item.difficulty === 'medium' ? 'O\'rta' : 'Oson',
      theory: `
        <h3>${item.title} haqida</h3>
        <p>${item.desc}. Ushbu mavzuni o'rganish orqali siz dasturlash ko'nikmalaringizni mustahkamlaysiz.</p>
        <div class="info-box">
          💡 <b>Muhim eslatma:</b> Har bir dars amaliyot orqali yaxshi o'zlashtiriladi. Pastdagi topshiriqni bajaring va 20 🪙 CodeJS tangasini qo'lga kiriting!
        </div>
        <pre>// Namuna kod:
const mavzu = "${item.title}";
console.log(mavzu + " darsi muvaffaqiyatli bajarildi!");</pre>
      `,
      challenge: `console.log("${item.title}") buyrug'ini yozing va tekshiring.`,
      starterCode: `// ${item.title} uchun topshiriq kodini yozing:\n\n`,
      validator: (code) => {
        if (code.includes('console.log')) {
          return { success: true };
        }
        return { success: false, error: 'Iltimos, kodda console.log(...) buyrug\'ini yozing.' };
      }
    };
  }

  activeLessonContext = {
    key: lessonKey,
    catId: catId,
    lessonNum: lessonNum,
    info: lessonInfo
  };

  document.getElementById('lesson-cat-badge').textContent = lessonInfo.badge;
  document.getElementById('lesson-modal-title').textContent = `#${lessonNum} — ${lessonInfo.title}`;
  document.getElementById('lesson-modal-content').innerHTML = lessonInfo.theory;
  document.getElementById('lesson-challenge-desc').innerHTML = lessonInfo.challenge;
  document.getElementById('lesson-challenge-code').value = lessonInfo.starterCode;

  const progressFill = document.getElementById('lesson-detail-progress');
  const statusText = document.getElementById('lesson-detail-status');
  const resultBox = document.getElementById('lesson-challenge-result');
  resultBox.className = 'lesson-challenge-result';
  resultBox.style.display = 'none';

  if (isCompleted) {
    progressFill.style.width = '100%';
    statusText.textContent = '✅ Tugallangan';
    statusText.style.color = 'var(--accent-green)';
  } else {
    progressFill.style.width = '20%';
    statusText.textContent = '⏳ Tugallanmagan (+20 🪙)';
    statusText.style.color = 'var(--text-muted)';
  }

  modal.classList.add('active');
}

function checkCurrentLesson() {
  if (!activeLessonContext) return;

  const code = document.getElementById('lesson-challenge-code').value;
  const resultBox = document.getElementById('lesson-challenge-result');
  const validator = activeLessonContext.info.validator;

  const outcome = validator(code);

  if (outcome.success) {
    resultBox.className = 'lesson-challenge-result success';
    resultBox.innerHTML = `🎉 <b>Ajoyib! Topshiriq to'g'ri bajarildi!</b><br>Siz darsni muvaffaqiyatli yakunladingiz.`;
    resultBox.style.display = 'block';

    let user = getCurrentUser();
    if (user) {
      if (!user.completedLessons) user.completedLessons = [];
      const alreadyDone = user.completedLessons.includes(activeLessonContext.key);

      if (!alreadyDone) {
        user.completedLessons.push(activeLessonContext.key);
        const users = getUsers();
        const idx = users.findIndex(u => u.id === user.id);
        if (idx !== -1) {
          users[idx].completedLessons = user.completedLessons;
          saveUsers(users);
        }
        setCurrentUser(user);

        addCoins(20, 'Dars topshirig\'i uchun!');
        showToast('🌟 +20 CodeJS tangasi hisobingizga qo\'shildi!');
      }
    } else {
      showToast('🎉 Topshiriq to\'g\'ri! Tangalarni saqlash uchun tizimga kiring.');
    }

    document.getElementById('lesson-detail-progress').style.width = '100%';
    const statusText = document.getElementById('lesson-detail-status');
    statusText.textContent = '✅ Tugallangan';
    statusText.style.color = 'var(--accent-green)';

    if (typeof renderLessons === 'function') {
      renderLessons(activeLessonContext.catId);
    }
  } else {
    resultBox.className = 'lesson-challenge-result error';
    resultBox.innerHTML = `❌ <b>Xatolik yuz berdi:</b><br>${outcome.error || 'Qaytadan tekshirib ko\'ring.'}`;
    resultBox.style.display = 'block';
  }
}

function resetLessonCode() {
  if (activeLessonContext) {
    document.getElementById('lesson-challenge-code').value = activeLessonContext.info.starterCode;
    const resultBox = document.getElementById('lesson-challenge-result');
    resultBox.style.display = 'none';
  }
}

// ─── 6. RE-RENDER LESSONS OVERRIDE ──────────────────────────────
window.renderLessonsWithAuth = function(catId) {
  const container = document.getElementById('lessons-grid');
  if (!container) return;

  const lessons = getLessons(catId);
  const user = getCurrentUser();
  const completed = user?.completedLessons || [];

  const diffLabels = {
    uz: { easy: 'Oson', medium: "O'rta", hard: 'Qiyin' },
    en: { easy: 'Easy', medium: 'Medium', hard: 'Hard' },
    ru: { easy: 'Легко', medium: 'Средне', hard: 'Сложно' },
  };

  container.innerHTML = lessons.map(l => {
    const isDone = completed.includes(`${catId}-${l.num}`);
    return `
      <div class="lesson-card ${isDone ? 'completed' : ''}" onclick="openLesson('${catId}', '${l.num}')" style="cursor:pointer;" title="Darsni boshlash">
        <div class="lesson-card-num">#${l.num}</div>
        <div class="lesson-card-title">${l.title}</div>
        <div class="lesson-card-desc">${l.desc}</div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px;">
          <span class="lesson-card-difficulty difficulty-${l.difficulty}">
            ${l.difficulty === 'easy' ? '🟢' : l.difficulty === 'medium' ? '🟡' : '🔴'}
            ${(diffLabels[currentLang] || diffLabels.uz)[l.difficulty]}
          </span>
          <span style="font-size:12px; color:var(--accent-yellow); font-weight:700;">
            ${isDone ? '✅ Bajarilgan' : '🪙 +20'}
          </span>
        </div>
      </div>
    `;
  }).join('');
};

// ─── 7. INITIALIZE ENGINE ON DOM READY & STORAGE SYNC ───────────
function bootAppEngine() {
  initDefaultUsers();
  updateAuthUI();

  if (typeof renderLessons !== 'undefined') {
    renderLessons = window.renderLessonsWithAuth;
    if (typeof currentCategory !== 'undefined') {
      renderLessons(currentCategory || 'html');
    }
  }
  if (typeof renderCommunityUsers === 'function') {
    renderCommunityUsers();
  }
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', bootAppEngine);
} else {
  bootAppEngine();
}

window.addEventListener('storage', (e) => {
  if (e.key === USERS_KEY || e.key === CURRENT_USER_KEY) {
    updateAuthUI();
    if (typeof renderCommunityUsers === 'function') {
      renderCommunityUsers();
    }
  }
});
