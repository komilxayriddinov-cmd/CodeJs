// ═══════════════════════════════════════════════════════════════
// CODEJS PLATFORM ENGINE — AUTH, COINS, LESSONS, COIN SHOP & ADMIN
// ═══════════════════════════════════════════════════════════════

// ─── 1. STORAGE & USERS INITIALIZATION ─────────────────────────
const USERS_KEY = 'codejs_users';
const CURRENT_USER_KEY = 'codejs_current_user';
const DAILY_CLAIM_KEY = 'codejs_daily_claim_';

function initDefaultUsers() {
  let users = getUsers();
  if (!users || users.length === 0) {
    users = [
      {
        id: 'admin-1',
        name: 'Bosh Admin',
        email: 'admin@codejs.uz',
        password: 'komil777', // Admin paroli
        role: 'admin',
        coins: 1500,
        completedLessons: ['html-01', 'html-02', 'css-01', 'js-basics-01'],
        inventory: ['av-crown', 'frame-gold-aura', 'title-king'],
        equippedAvatar: '👑',
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
        inventory: ['av-rocket'],
        equippedAvatar: '🚀',
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
        inventory: ['av-cat', 'frame-neon-cyan'],
        equippedAvatar: '🐱',
        equippedFrame: 'frame-neon-cyan',
        equippedTitle: '',
        joined: '2026-03-01'
      }
    ];
    saveUsers(users);
  } else {
    // Har doim admin parolini komil777 bilan sinxronlash
    const admin = users.find(u => u.email === 'admin@codejs.uz');
    if (admin) {
      admin.password = 'komil777';
      saveUsers(users);
    }
  }

  // Hozirgi sessiyadagi admin parolini ham yangilash
  const current = getCurrentUser();
  if (current && current.email === 'admin@codejs.uz') {
    current.password = 'komil777';
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
  } catch (e) {
    console.error(e);
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
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (e) {
    console.error(e);
  }
  updateAuthUI();
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
  const user = users.find(u => (u.email.toLowerCase() === emailInput || u.name.toLowerCase() === emailInput) && u.password === password);

  if (!user) {
    errorEl.textContent = '❌ Email yoki parol noto\'g\'ri!';
    return;
  }

  setCurrentUser(user);
  closeModal('auth-modal');
  showToast(`👋 Xush kelibsiz, ${user.name}!`);
  
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
      avatar.textContent = user.equippedAvatar || user.name.charAt(0).toUpperCase();
      avatar.className = 'nav-avatar ' + (user.equippedFrame || '');
    }

    // Username & Title Tag
    const username = document.getElementById('nav-username');
    if (username) {
      let titleHtml = user.equippedTitle ? `<span class="user-title-tag">${user.equippedTitle}</span>` : '';
      username.innerHTML = user.name + titleHtml;
    }

    const coinsVal = document.getElementById('nav-user-coins-val');
    if (coinsVal) coinsVal.textContent = user.coins || 0;

    const navCoinsCount = document.getElementById('nav-coins-count');
    if (navCoinsCount) navCoinsCount.textContent = user.coins || 0;

    // Dropdown details
    const dropName = document.getElementById('dropdown-name');
    if (dropName) {
      let titleHtml = user.equippedTitle ? ` <span class="user-title-tag">${user.equippedTitle}</span>` : '';
      dropName.innerHTML = user.name + titleHtml;
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

function openProfileModal() {
  const user = getCurrentUser();
  if (!user) {
    openAuthModal('login');
    return;
  }
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.remove('open');

  const avatarLarge = document.getElementById('profile-avatar-large');
  if (avatarLarge) {
    avatarLarge.textContent = user.equippedAvatar || user.name.charAt(0).toUpperCase();
    avatarLarge.className = 'nav-avatar ' + (user.equippedFrame || '');
  }

  let titleHtml = user.equippedTitle ? ` <span class="user-title-tag">${user.equippedTitle}</span>` : '';
  document.getElementById('profile-modal-name').innerHTML = user.name + titleHtml;
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

  document.getElementById('profile-modal').classList.add('active');
}

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
  const idx = users.findIndex(u => u.id === user.id);
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
  addCoins(50, 'Kunlik tashrif bonusi!');
  showToast('🎁 Tabriklaymiz! Bugungi kunlik bonus: +50 🪙');

  const dropdown = document.getElementById('user-dropdown');
  if (dropdown) dropdown.classList.remove('open');
}

// ─── 4. COIN SHOP (AVATARLAR, NIK RAMKALARI, UNVONLAR) ─────────
const SHOP_ITEMS = {
  avatars: [
    { id: 'av-rocket', name: 'Rocket Coder', icon: '🚀', price: 50, desc: 'Tezkor va shijoatli dasturchilar uchun' },
    { id: 'av-ninja', name: 'Shadow Ninja', icon: '🥷', price: 80, desc: 'Xatolarni yashirincha yo\'q qiluvchi ninja' },
    { id: 'av-mage', name: 'JS Sehrgari', icon: '🧙‍♂️', price: 100, desc: 'Murakkab algoritmlarni sehrlay oladigan ustoz' },
    { id: 'av-robot', name: 'AI Android', icon: '🤖', price: 120, desc: 'Sun\'iy intellekt va neyron tarmoqlar bilimdoni' },
    { id: 'av-gamer', name: 'Retro Gamer', icon: '👾', price: 150, desc: '8-bit pikselli kodlar va retro o\'yinlar ishqibozi' },
    { id: 'av-fox', name: 'Cyber Fox', icon: '🦊', price: 180, desc: 'Chaqqon va o\'tkir zehnli kiber tulki' },
    { id: 'av-dragon', name: 'Ajdaho Egasi', icon: '🐉', price: 220, desc: 'Qudratli backend va arxitektura afsungari' },
    { id: 'av-lion', name: 'Oltin Sher', icon: '🦁', price: 260, desc: 'Guruh yetakchisi va Team Lead ramzi' },
    { id: 'av-lightning', name: 'Yashin Xudosi', icon: '⚡', price: 300, desc: 'Kodlarni sekundiga 100 qatordan yozuvchi tezkor daho' },
    { id: 'av-skull', name: 'Cyber Skull', icon: '💀', price: 350, desc: 'Xavfsizlik va oq xakerlar uchun' },
    { id: 'av-cat', name: 'Kiber Mushukcha', icon: '🐱', price: 400, desc: 'Yoqimtoy ammo juda kuchli frontendchi' },
    { id: 'av-alien', name: 'Koinot Mehmoni', icon: '👽', price: 450, desc: 'Boshqa sayyoralik ilg\'or arxitektor' },
    { id: 'av-crown', name: 'CodeJS Qiroli', icon: '👑', price: 500, desc: 'CodeJS platformasining eng oliy o\'quvchisi' }
  ],
  frames: [
    { id: 'frame-neon-cyan', name: 'Neon Moviy', class: 'frame-neon-cyan', price: 100, desc: 'Kiber neon moviy jilolanuvchi ramka' },
    { id: 'frame-cyber-purple', name: 'Kiber Binafsha', class: 'frame-cyber-purple', price: 150, desc: 'Pulsatsiyalanuvchi kiberpank binafsha aura' },
    { id: 'frame-gold-aura', name: 'Imperator Oltini', class: 'frame-gold-aura', price: 250, desc: 'Haqiqiy oltin porlashi va hashamat' },
    { id: 'frame-rainbow-chroma', name: 'RGB Chroma Wave', class: 'frame-rainbow-chroma', price: 350, desc: 'Aylanuvchi ko\'p rangli spektr animatsiyasi' },
    { id: 'frame-hellfire', name: 'Olovli Jazava', class: 'frame-hellfire', price: 450, desc: 'Miltillovchi yorqin olovli alanga ramkasi' },
    { id: 'frame-diamond', name: 'Olmos Kristall', class: 'frame-diamond', price: 600, desc: 'Eng qimmatbaho olmosdek tovlanuvchi porlash' }
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
  const items = SHOP_ITEMS[currentShopCategory] || [];
  const inventory = user?.inventory || [];

  container.innerHTML = items.map(item => {
    const isOwned = inventory.includes(item.id);
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
      previewHtml = `<div class="shop-card-preview ${user?.equippedFrame || ''}">${item.icon}</div>`;
    } else if (currentShopCategory === 'frames') {
      previewHtml = `<div class="shop-card-preview ${item.class}">${user?.equippedAvatar || '😎'}</div>`;
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
    } else if (!isOwned) {
      actionBtn = `<button class="shop-card-btn shop-btn-buy" onclick="buyShopItem('${currentShopCategory}', '${item.id}')">🛒 Xarid qilish</button>`;
    } else if (isEquipped) {
      actionBtn = `<button class="shop-card-btn shop-btn-equipped" onclick="unequipShopItem('${currentShopCategory}')">✅ Taqilgan (Yechish)</button>`;
    } else {
      actionBtn = `<button class="shop-card-btn shop-btn-equip" onclick="equipShopItem('${currentShopCategory}', '${item.id}')">✨ Taqish</button>`;
    }

    return `
      <div class="shop-card ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''}">
        ${previewHtml}
        <div class="shop-card-title">${item.name}</div>
        <div class="shop-card-desc">${item.desc}</div>
        <div class="shop-card-price">
          ${isOwned ? '<span>✅ Xarid qilingan</span>' : `<span>🪙 ${item.price} Coin</span>`}
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

  if ((user.coins || 0) < item.price) {
    showToast('❌ Mablag\' yetarli emas! Darslarni bajaring yoki o\'yinlarda tanga yutib oling.');
    return;
  }

  // Deduct coins & add to inventory
  user.coins -= item.price;
  if (!user.inventory) user.inventory = [];
  user.inventory.push(item.id);

  // Auto equip
  if (category === 'avatars') user.equippedAvatar = item.icon;
  if (category === 'frames') user.equippedFrame = item.class;
  if (category === 'titles') user.equippedTitle = item.title;

  // Save in database
  const users = getUsers();
  const idx = users.findIndex(u => u.id === user.id);
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
  const idx = users.findIndex(u => u.id === user.id);
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
  const idx = users.findIndex(u => u.id === user.id);
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
    starterCode: `<!-- h1 tegini yozing -->\n<h1>Salom CodeJS</h1>`,
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
    starterCode: `<button>Boshlash</button>`,
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
    starterCode: `<h2>Darslar</h2>\n<p>JavaScript o'rganamiz</p>`,
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
    starterCode: `.title {\n  color: cyan;\n}`,
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
    starterCode: `console.log("Hello JS");`,
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
    starterCode: `let ball = 100;`,
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
    starterCode: `function qoshish(a, b) {\n  return a + b;\n}`,
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
      starterCode: `console.log("${item.title}");`,
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

// ─── 7. INITIALIZE ENGINE ON DOM READY ──────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  initDefaultUsers();
  updateAuthUI();

  if (typeof renderLessons !== 'undefined') {
    renderLessons = window.renderLessonsWithAuth;
    renderLessons(currentCategory || 'html');
  }
});
