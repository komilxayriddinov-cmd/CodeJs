// ═══════════════════════════════════════════════════════════════
// CODEHOOT — CODEJS JONLI MULTIPLAYER VIKTORINA (KAHOOT USLUBIDA)
// 20 tagacha o'quvchi bir vaqtda jonli o'ynay oladigan multiplayer tizim
// ═══════════════════════════════════════════════════════════════

// ─── 1. SAVOLLAR BAZASI (KATEGORIYALAR) ─────────────────────────
const CODEHOOT_QUESTIONS = {
  // 1. DAVLATLAR BAYROQLARI (DUNYO DAVLATLARI VA QIZIQARLI SAVOLLAR)
  flags: [
    {
      q: "Bu qaysi davlatning davlat bayrog'i?",
      flagCode: "uz",
      flagEmoji: "🇺🇿",
      options: ["O'zbekiston", "Qozog'iston", "Turkmaniston", "Tojikiston"],
      correct: 0,
      hint: "Moviy, oq, yashil chiziqlar va yarim oy hamda 12 ta yulduz."
    },
    {
      q: "Ushbu bayroq qaysi qardosh davlatga tegishli?",
      flagCode: "tr",
      flagEmoji: "🇹🇷",
      options: ["Ozarbayjon", "Turkiya", "Tunis", "Singapur"],
      correct: 1,
      hint: "Qizil fonda oq hilol va yulduz."
    },
    {
      q: "Bu qaysi davlatning bayrog'i?",
      flagCode: "kz",
      flagEmoji: "🇰🇿",
      options: ["Qirg'iziston", "Mo'g'uliston", "Qozog'iston", "Ukraina"],
      correct: 2,
      hint: "Moviy fonda oltin quyosh, burgut va milliy naqsh."
    },
    {
      q: "Ushbu mashhur 'Yulduzlar va chiziqlar' (Stars and Stripes) qaysi davlat bayrog'i?",
      flagCode: "us",
      flagEmoji: "🇺🇸",
      options: ["Buyuk Britaniya", "Kanada", "Avstraliya", "AQSH"],
      correct: 3,
      hint: "50 ta yulduz va 13 ta oq-qizil chiziqlar."
    },
    {
      q: "Kunchiqar mamlakat — bu qaysi davlat bayrog'i?",
      flagCode: "jp",
      flagEmoji: "🇯🇵",
      options: ["Yaponiya", "Janubiy Koreya", "Xitoy", "Vetnam"],
      correct: 0,
      hint: "Oq fonda qizil dumaloq quyosh tasviri."
    },
    {
      q: "Bu qaysi Yevropa davlatining bayrog'i (qora, qizil, sariq)?",
      flagCode: "de",
      flagEmoji: "🇩🇪",
      options: ["Belgiya", "Germaniya", "Avstriya", "Niderlandiya"],
      correct: 1,
      hint: "Avtomobilsozlik vatani va Yevropaning eng yirik iqtisodiyoti."
    },
    {
      q: "Ushbu 'Union Jack' bayrog'i qaysi davlatga tegishli?",
      flagCode: "gb",
      flagEmoji: "🇬🇧",
      options: ["Avstraliya", "Yangi Zelandiya", "Buyuk Britaniya", "Islandiya"],
      correct: 2,
      hint: "Angliya, Shotlandiya va Shimoliy Irlandiya xochlari birlashmasi."
    },
    {
      q: "Futbol vatani va 5 karra jahon chempioni bo'lgan davlat bayrog'i:",
      flagCode: "br",
      flagEmoji: "🇧🇷",
      options: ["Argentina", "Urugvay", "Ispaniya", "Braziliya"],
      correct: 3,
      hint: "Yashil fonda sariq romb va 'Ordem e Progresso' shiori."
    },
    {
      q: "Qizil chinor (zarang) bargi qaysi davlat bayrog'ida tasvirlangan?",
      flagCode: "ca",
      flagEmoji: "🇨🇦",
      options: ["Kanada", "Shveysariya", "Daniya", "Norvegiya"],
      correct: 0,
      hint: "Shimoliy Amerikadagi ikkinchi eng katta davlat."
    },
    {
      q: "Bu qaysi Lotin Amerikasi davlati bayrog'i (quyosh tasviri bilan)?",
      flagCode: "ar",
      flagEmoji: "🇦🇷",
      options: ["Chili", "Argentina", "Kolumbiya", "Peru"],
      correct: 1,
      hint: "Lionel Messi va Diego Maradona vatani."
    },
    {
      q: "Ushbu bayroq qaysi Kavkazorti davlatiga tegishli?",
      flagCode: "az",
      flagEmoji: "🇦🇿",
      options: ["Gruziya", "Turkiya", "Ozarbayjon", "Turkmaniston"],
      correct: 2,
      hint: "Moviy, qizil, yashil chiziqlar va sakkiz qirrali yulduz."
    },
    {
      q: "Moviy, oq va qizil vertikal chiziqli 'Trikolor' qaysi davlat bayrog'i?",
      flagCode: "fr",
      flagEmoji: "🇫🇷",
      options: ["Italiya", "Rossiya", "Niderlandiya", "Fransiya"],
      correct: 3,
      hint: "Eyfel minorasi va Parij joylashgan mamlakat."
    },
    {
      q: "Markazida 'Yin va Yang' (Taegeuk) belgisi bo'lgan bayroq qaysi davlatniki?",
      flagCode: "kr",
      flagEmoji: "🇰🇷",
      options: ["Janubiy Koreya", "Yaponiya", "Tailand", "Singapur"],
      correct: 0,
      hint: "K-pop, Samsung va IT texnologiyalar yurti."
    },
    {
      q: "Yashil, oq va qizil vertikal chiziqlardan iborat ushbu bayroq:",
      flagCode: "it",
      flagEmoji: "🇮🇹",
      options: ["Meksika", "Italiya", "Irlandiya", "Vengriya"],
      correct: 1,
      hint: "Pitsa, Kolizey va Venetsiya vatani."
    },
    {
      q: "Qizil fonda sariq beshta yulduz tasvirlangan bayroq:",
      flagCode: "cn",
      flagEmoji: "🇨🇳",
      options: ["Vetnam", "Shimoliy Koreya", "Xitoy", "Singapur"],
      correct: 2,
      hint: "Dunyoning eng yirik ishlab chiqaruvchi davlati."
    },
    {
      q: "Piramidalar va Nil daryosi joylashgan ushbu davlat bayrog'i qaysi?",
      flagCode: "eg",
      flagEmoji: "🇪🇬",
      options: ["Iroq", "Suriya", "Yaman", "Misr"],
      correct: 3,
      hint: "Qizil, oq, qora chiziqlar va Salohiddin burguti."
    },
    {
      q: "Yashil fonda 'Kalimai Shahodat' va qilich tasvirlangan bayroq:",
      flagCode: "sa",
      flagEmoji: "🇸🇦",
      options: ["Saudiya Arabistoni", "BAA", "Qatar", "Ummon"],
      correct: 0,
      hint: "Makka va Madina shaharlari joylashgan mamlakat."
    },
    {
      q: "Markazida ko'k 'Ashoka Chakra' aravasi g'ildiragi bo'lgan bayroq:",
      flagCode: "in",
      flagEmoji: "🇮🇳",
      options: ["Pokiston", "Hindiston", "Bangladesh", "Shri-Lanka"],
      correct: 1,
      hint: "Dunyo aholisi soni bo'yicha eng yuqori o'rindagi davlat."
    },
    {
      q: "Qizil-sariq chiziqlar va markazida gerb tasvirlangan Yevropa davlati:",
      flagCode: "es",
      flagEmoji: "es",
      options: ["Portugaliya", "Italiya", "Ispaniya", "Gretsiya"],
      correct: 2,
      hint: "Real Madrid, Barselona va flamenko vatani."
    },
    {
      q: "Dunyodagi yagona TO'RTBURCHAK BO'LMAGAN (uchburchakli) davlat bayrog'i qaysi?",
      flagCode: "np",
      flagEmoji: "🇳🇵",
      options: ["Butan", "Shveysariya", "Vatikan", "Nepal"],
      correct: 3,
      hint: "Everest cho'qqisi joylashgan tog'li mamlakat."
    },
    {
      q: "Qizil fonda oq simmetrik xoch tasvirlangan ushbu kvadrat bayroq:",
      flagCode: "ch",
      flagEmoji: "🇨🇭",
      options: ["Shveysariya", "Daniya", "Shvetsiya", "Avstriya"],
      correct: 0,
      hint: "Banklar, alp tog'lari va mashhur soatlar mamlakati."
    },
    {
      q: "Moviy fonda sariq Skandinaviya xochi qaysi davlatga tegishli?",
      flagCode: "se",
      flagEmoji: "🇸🇪",
      options: ["Finlyandiya", "Shvetsiya", "Norvegiya", "Daniya"],
      correct: 1,
      hint: "Volvo, IKEA va Spotify vatani."
    },
    {
      q: "Markazida qanotli burgut va ilon ushlagan kaktus gerbi bo'lgan bayroq:",
      flagCode: "mx",
      flagEmoji: "🇲🇽",
      options: ["Kolumbiya", "Peru", "Meksika", "Venesuela"],
      correct: 2,
      hint: "Atsteklar madaniyati va takos taomi yurti."
    },
    {
      q: "Moviy fonda oq-ko'k chiziqlar va oq xoch tasvirlangan antik davlat:",
      flagCode: "gr",
      flagEmoji: "🇬🇷",
      options: ["Kipr", "Isroil", "Malta", "Gretsiya"],
      correct: 3,
      hint: "Olimpiada o'yinlari va qadimgi falsafa beshigi."
    },
    {
      q: "Qizil, oq va ko'k gorizontal chiziqli ushbu bayroq qaysi davlatniki?",
      flagCode: "ru",
      flagEmoji: "🇷🇺",
      options: ["Rossiya", "Slovakiya", "Sloveniya", "Serbiya"],
      correct: 0,
      hint: "Hududi bo'yicha dunyodagi eng katta davlat."
    }
  ],

  // 2. JAVASCRIPT VA DASTURLASH
  javascript: [
    {
      q: "JavaScript-da 'typeof NaN' nimani qaytaradi?",
      code: "console.log(typeof NaN);",
      options: ["'number'", "'NaN'", "'undefined'", "'object'"],
      correct: 0,
      hint: "Garchi 'Not a Number' bo'lsa-da, u raqam turiga kiradi."
    },
    {
      q: "Ushbu kodning natijasi nima bo'ladi: 2 + '2' - 1 ?",
      code: "console.log(2 + '2' - 1);",
      options: ["21", "22", "3", "NaN"],
      correct: 0,
      hint: "2 + '2' -> '22', keyin esa ayirish amali satrni raqamga aylantiradi: '22' - 1 = 21."
    },
    {
      q: "Qaysi kalit so'z o'zgarmas (qayta qiymat berib bo'lmaydigan) o'zgaruvchi yaratadi?",
      options: ["var", "let", "const", "static"],
      correct: 2,
      hint: "Constant so'zining qisqartmasi."
    },
    {
      q: "Massivning oxiriga yangi element qo'shish uchun qaysi metod ishlatiladi?",
      code: "const arr = [1, 2];\narr.???(3);",
      options: ["pop()", "shift()", "unshift()", "push()"],
      correct: 3,
      hint: "Oxiriga qo'shadi va yangi uzunlikni qaytaradi."
    },
    {
      q: "JavaScript-da [] == false ifodasi qanday natija beradi?",
      code: "console.log([] == false);",
      options: ["true", "false", "undefined", "TypeError"],
      correct: 0,
      hint: "Bo'sh massiv avval '' (bo'sh satr)ga, so'ngra 0 ga aylanadi: 0 == 0 -> true."
    },
    {
      q: "Qaysi operator qat'iy tenglikni (turlarni taqqoslab) tekshiradi?",
      options: ["==", "===", "=", "!="],
      correct: 1,
      hint: "Uchta tenglik belgisi qiymat va ma'lumot turini tekshiradi."
    },
    {
      q: "Quyidagi kod konsolga nimani chiqaradi?",
      code: "console.log(typeof null);",
      options: ["'null'", "'undefined'", "'object'", "'boolean'"],
      correct: 2,
      hint: "Bu JavaScript-ning ilk versiyalaridan qolgan mashhur tarixiy xatolikdir."
    },
    {
      q: "Massivdagi barcha elementlarni birma-bir aylanib chiqish uchun qaysi metod ishlatiladi?",
      options: ["concat()", "slice()", "trim()", "forEach()"],
      correct: 3,
      hint: "Har bir element uchun berilgan funksiyani bajaradi."
    },
    {
      q: "Asinxron kod bilan ishlashda qaysi yangi sintaksis qulaylik beradi?",
      options: ["async / await", "try / catch", "import / export", "if / else"],
      correct: 0,
      hint: "Promise-lar ustida sinxron ko'rinishda ishlash imkonini beradi."
    },
    {
      q: "Satrni butun songa aylantirish uchun qaysi global funksiya ishlatiladi?",
      code: "parseInt('42px');",
      options: ["toString()", "parseInt()", "Math.floor()", "Number.isInteger()"],
      correct: 1,
      hint: "Satrning boshidagi raqamlarni tahlil qilib son qaytaradi."
    },
    {
      q: "JSON obyektini matnga aylantirish uchun qaysi metod ishlatiladi?",
      code: "const obj = { x: 1 };",
      options: ["JSON.parse()", "JSON.toText()", "JSON.stringify()", "JSON.encode()"],
      correct: 2,
      hint: "Obyektni qatorga (string) aylantiradi."
    },
    {
      q: "Qaysi massiv metodi berilgan shartga mos yangi filtrlangan massiv qaytaradi?",
      options: ["map()", "reduce()", "find()", "filter()"],
      correct: 3,
      hint: "True qaytargan elementlarni yangi massivga yig'adi."
    }
  ],

  // 3. HTML VA CSS VEB-DIZAYN
  web: [
    {
      q: "HTML sahifaning eng asosiy sarlovha tegi qaysi?",
      options: ["<h1>", "<head>", "<header>", "<title>"],
      correct: 0,
      hint: "Qidiruv tizimlari (SEO) uchun eng muhim birinchi darajali sarlovha."
    },
    {
      q: "CSS-da elementlarni moslashuvchan (flex) qator yoki ustunga joylash uchun nima yoziladi?",
      code: ".container { display: ???; }",
      options: ["block", "flex", "grid", "inline"],
      correct: 1,
      hint: "Flexbox modelini faollashtiradi."
    },
    {
      q: "Flexbox-da elementlarni asosiy o'q (main axis) bo'ylab o'rtaga tekislash uchun qaysi xususiyat kerak?",
      options: ["align-items", "align-content", "justify-content: center", "text-align"],
      correct: 2,
      hint: "justify-content qatori bo'ylab o'rtaga qo'yadi."
    },
    {
      q: "Giperhavola (link) yaratish uchun HTML-da qaysi teg ishlatiladi?",
      options: ["<link>", "<href>", "<button>", "<a>"],
      correct: 3,
      hint: "'Anchor' so'zining bosh harfi."
    },
    {
      q: "CSS-da elementning ichki sohasini (kontent va chegara orasidagi masofa) nima belgilaydi?",
      options: ["padding", "margin", "border", "gap"],
      correct: 0,
      hint: "Ichki masofa (padding), tashqi masofa (margin)."
    },
    {
      q: "HTML5-da mustaqil yangilik yoki maqola blog posti uchun qaysi semantik teg ishlatiladi?",
      options: ["<section>", "<article>", "<aside>", "<div>"],
      correct: 1,
      hint: "Mustaqil tarqatilishi mumkin bo'lgan kontent uchun."
    },
    {
      q: "Elementni ekranning bir joyida qotirib qo'yish (skroll qilinganda ham joyidan qimirlamaslik) uchun:",
      code: "position: ???;",
      options: ["absolute", "relative", "fixed", "sticky"],
      correct: 2,
      hint: "Brauzer oynasiga (viewport) nisbatan qotiriladi."
    },
    {
      q: "HTML-da rasm qo'yish tegi qaysi?",
      options: ["<picture>", "<photo>", "<src>", "<img>"],
      correct: 3,
      hint: "Image so'zining qisqartmasi bo'lib, src atributiga ega."
    }
  ],

  // 4. IT, TEXNOLOGIYA VA MANTIQ
  it_logic: [
    {
      q: "1 Bayt (Byte) necha Bitdan (Bit) iborat?",
      options: ["8 bit", "16 bit", "4 bit", "1024 bit"],
      correct: 0,
      hint: "Kompyuter xotirasidagi standart o'lchov birligi."
    },
    {
      q: "Ikkilik sanoq sistemasida (Binary) qaysi raqamlar ishlatiladi?",
      options: ["1 va 2", "0 va 1", "0 dan 9 gacha", "0 dan 7 gacha"],
      correct: 1,
      hint: "Kompyuter mikrosxemalari faqat elektr signali bor (1) yoki yo'q (0) holatini tushunadi."
    },
    {
      q: "Kodni versiyalash va jamoa bilan ishlash uchun dunyoda eng mashhur tizim qaysi?",
      options: ["Docker", "Linux", "Git", "Figma"],
      correct: 2,
      hint: "Linus Torvalds tomonidan yaratilgan va GitHub bu tizimga tayanadi."
    },
    {
      q: "Kompyuterning asosiy 'miyasi' va hisoblash markazi hisoblangan qurilma qaysi?",
      options: ["RAM", "SSD", "GPU", "CPU (Protsessor)"],
      correct: 3,
      hint: "Central Processing Unit."
    },
    {
      q: "Internetda veb-sahifalarni xavfsiz (shifrlangan) uzatish protokoli qaysi?",
      options: ["HTTPS", "HTTP", "FTP", "SMTP"],
      correct: 0,
      hint: "Oxiridagi 'S' harfi 'Secure' so'zini bildiradi."
    },
    {
      q: "SQL qanday ma'lumotlar bilan ishlash uchun mo'ljallangan til?",
      options: ["Fayllar tizimi", "Relyatsion ma'lumotlar bazasi", "Grafik dizayn", "Veb-brauzer"],
      correct: 1,
      hint: "Structured Query Language jadvallardan iborat bazalarda ishlaydi."
    },
    {
      q: "Ochiq kodli (Open Source) eng mashhur operatsion tizim yadrosi qaysi?",
      options: ["Windows", "macOS", "Linux", "DOS"],
      correct: 2,
      hint: "Serverlar va Android tizimining negizida yotadi."
    },
    {
      q: "Veb-sahifaning brauzerda ko'rinadigan struktura daraxti qanday ataladi?",
      options: ["API", "CSSOM", "JSON", "DOM (Document Object Model)"],
      correct: 3,
      hint: "JavaScript aynan shu daraxt orqali HTML elementlarini o'zgartiradi."
    }
  ]
};

// ─── 2. SOUND EFFECTS (WEB AUDIO API SINTIZATORI) ──────────────
// Hech qanday tashqi audio fayllar kerak emas, barcha ovozlar brauzerda hosil bo'ladi
class CodehootAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch(e) {}
  }

  // Countdown tick
  playTick() {
    this.playTone(880, 'triangle', 0.08, 0.06);
  }

  // Answer selected click
  playClick() {
    this.playTone(520, 'sine', 0.12, 0.1);
  }

  // Correct answer chime (xushxabar akkordi)
  playCorrect() {
    if (!this.enabled) return;
    try {
      this.init();
      setTimeout(() => this.playTone(523.25, 'triangle', 0.2, 0.12), 0);   // C5
      setTimeout(() => this.playTone(659.25, 'triangle', 0.2, 0.12), 120); // E5
      setTimeout(() => this.playTone(783.99, 'triangle', 0.2, 0.12), 240); // G5
      setTimeout(() => this.playTone(1046.50, 'triangle', 0.4, 0.15), 360); // C6
    } catch(e) {}
  }

  // Wrong answer buzz
  playWrong() {
    if (!this.enabled) return;
    try {
      this.init();
      setTimeout(() => this.playTone(280, 'sawtooth', 0.25, 0.12), 0);
      setTimeout(() => this.playTone(220, 'sawtooth', 0.35, 0.12), 150);
    } catch(e) {}
  }

  // Celebration fanfare (G'oliblik sharafi)
  playFanfare() {
    if (!this.enabled) return;
    try {
      this.init();
      const notes = [523, 659, 784, 1046, 784, 1046];
      const times = [0, 150, 300, 450, 650, 800];
      notes.forEach((n, idx) => {
        setTimeout(() => this.playTone(n, 'triangle', 0.3, 0.15), times[idx]);
      });
    } catch(e) {}
  }
}

const codehootSound = new CodehootAudio();


// ─── 3. CODEHOOT TIZIM BOSHQARUVI VA HOLAT (STATE) ──────────────
const Codehoot = {
  // Game state
  role: null,            // 'host' | 'player' | 'solo'
  roomPin: null,         // 6-digit string
  roomId: null,          // 'room_123456'
  roomUnsubscribe: null, // Firestore onSnapshot unsubscription
  
  // Player info
  playerId: null,        // unique player key
  playerName: '',
  playerAvatar: '',
  playerScore: 0,
  playerStreak: 0,
  hasAnsweredCurrent: false,

  // Host/Game config
  category: 'flags',
  timePerQuestion: 20,
  questionCount: 10,
  
  // Game session runtime
  questions: [],
  currentIndex: 0,
  timerInterval: null,
  timerSecondsLeft: 0,
  roomData: null,        // Local cache of room state
  
  // Local fallback if Firebase is offline
  isLocalMode: false,
  localPlayers: {},

  // AI Bots for testing / Solo play
  BOT_NAMES: [
    { name: "Jasur Pro", avatar: "assets/memes/meme-1.jpg" },
    { name: "Madina IT", avatar: "assets/memes/meme-15.jpg" },
    { name: "Sardor Dev", avatar: "assets/memes/meme-6.jpg" },
    { name: "Laylo Code", avatar: "assets/memes/meme-16.jpg" },
    { name: "Bobur Senior", avatar: "assets/memes/meme-2.jpg" },
    { name: "Zuhra Tech", avatar: "assets/memes/meme-18.jpg" },
    { name: "Otabek QA", avatar: "assets/memes/meme-10.jpg" },
    { name: "Dilorom UX", avatar: "assets/memes/meme-20.jpg" }
  ],

  // Initsiyatsiya
  init() {
    this.playerId = 'p_' + Math.random().toString(36).substring(2, 9);
    console.log('🎮 Codehoot jonli o\'yin tizimi tayyor!');
  },

  // Modalni ochish
  open() {
    codehootSound.init();
    const modal = document.getElementById('codehoot-modal');
    if (modal) {
      modal.classList.add('active');
      modal.classList.add('open');
      this.showScreen('welcome');
      
      // Agar tizimga kirgan bo'lsa, ma'lumotlarni to'ldiramiz
      const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
      const nickInput = document.getElementById('codehoot-player-nickname');
      if (user && nickInput && !nickInput.value) {
        nickInput.value = user.username || user.name || '';
      }
    }
  },

  // Modalni yopish
  close() {
    this.cleanup();
    const modal = document.getElementById('codehoot-modal');
    if (modal) {
      modal.classList.remove('active');
      modal.classList.remove('open');
    }
  },

  cleanup() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.roomUnsubscribe) {
      try { this.roomUnsubscribe(); } catch(e) {}
      this.roomUnsubscribe = null;
    }
  },

  // Ekranlarni almashtirish
  showScreen(screenId) {
    const screens = [
      'welcome', 'host-create', 'host-lobby', 'player-join', 'player-lobby',
      'game-question', 'reveal-screen', 'leaderboard-screen', 'podium-screen'
    ];
    screens.forEach(s => {
      const el = document.getElementById(`codehoot-${s}`);
      if (el) el.style.display = (s === screenId) ? 'block' : 'none';
    });
  },

  // Savollar to'plamini shakllantirish
  getQuestionsForCategory(cat, count) {
    let pool = [];
    if (cat === 'all') {
      Object.keys(CODEHOOT_QUESTIONS).forEach(k => {
        pool = pool.concat(CODEHOOT_QUESTIONS[k]);
      });
    } else {
      pool = (CODEHOOT_QUESTIONS[cat] || CODEHOOT_QUESTIONS.flags).slice();
    }
    // Aralashtirish (Fisher-Yates)
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(count, pool.length));
  },

  // ─── 4. XONA YARATISH (HOST / O'QITUVCHI) ─────────────────────
  openHostCreate() {
    this.role = 'host';
    this.showScreen('host-create');
  },

  createRoom() {
    const catSelect = document.getElementById('codehoot-host-category');
    const qCountSelect = document.getElementById('codehoot-host-count');
    const timeSelect = document.getElementById('codehoot-host-time');

    this.category = catSelect ? catSelect.value : 'flags';
    this.questionCount = qCountSelect ? parseInt(qCountSelect.value, 10) : 10;
    this.timePerQuestion = timeSelect ? parseInt(timeSelect.value, 10) : 20;

    // 6 xonali tasodifiy PIN
    this.roomPin = Math.floor(100000 + Math.random() * 900000).toString();
    this.roomId = 'room_' + this.roomPin;
    this.questions = this.getQuestionsForCategory(this.category, this.questionCount);
    this.currentIndex = 0;

    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    const hostName = user ? (user.username || user.name) : "O'qituvchi";
    const hostAvatar = (user && user.avatar) ? user.avatar : "assets/memes/meme-6.jpg";

    const initialRoomState = {
      pin: this.roomPin,
      hostId: this.playerId,
      hostName: hostName,
      hostAvatar: hostAvatar,
      category: this.category,
      timePerQuestion: this.timePerQuestion,
      questionCount: this.questions.length,
      questions: this.questions,
      status: 'lobby', // 'lobby' | 'question' | 'reveal' | 'leaderboard' | 'finished'
      currentQuestionIndex: 0,
      questionStartTime: 0,
      players: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    this.roomData = initialRoomState;

    // PIN kodni ekranda ko'rsatish
    const pinDisplay = document.getElementById('codehoot-lobby-pin');
    if (pinDisplay) pinDisplay.textContent = this.roomPin.slice(0, 3) + ' ' + this.roomPin.slice(3);

    // Firestore ga yozish
    if (typeof db !== 'undefined' && db && isFirebaseConnected) {
      this.isLocalMode = false;
      db.collection('kahoot_rooms').doc(this.roomId).set(initialRoomState)
        .then(() => {
          this.listenToRoom(this.roomId);
        })
        .catch(err => {
          console.warn('Firestore xatolik, lokal rejimda davom etiladi:', err);
          this.isLocalMode = true;
          this.renderHostLobbyPlayers();
        });
    } else {
      this.isLocalMode = true;
      this.localPlayers = {};
    }

    this.showScreen('host-lobby');
    this.renderHostLobbyPlayers();
  },

  // Test uchun AI botlarni qo'shish
  addTestBots(count = 3) {
    if (!this.roomData) return;
    const currentCount = Object.keys(this.roomData.players || {}).length;
    const toAdd = Math.min(count, 20 - currentCount);

    for (let i = 0; i < toAdd; i++) {
      const bot = this.BOT_NAMES[(currentCount + i) % this.BOT_NAMES.length];
      const botId = 'bot_' + Math.random().toString(36).substring(2, 7);
      
      const newBot = {
        id: botId,
        name: bot.name,
        avatar: bot.avatar,
        score: 0,
        streak: 0,
        isBot: true,
        lastAnswer: null,
        lastAnswerCorrect: false
      };

      if (this.isLocalMode || !isFirebaseConnected) {
        if (!this.roomData.players) this.roomData.players = {};
        this.roomData.players[botId] = newBot;
      } else {
        const update = {};
        update[`players.${botId}`] = newBot;
        db.collection('kahoot_rooms').doc(this.roomId).update(update);
      }
    }

    if (this.isLocalMode || !isFirebaseConnected) {
      this.renderHostLobbyPlayers();
    }
  },

  // ─── 5. XONAGA QO'SHILISH (PLAYER / O'QUVCHI) ──────────────────
  openPlayerJoin() {
    this.role = 'player';
    this.showScreen('player-join');
  },

  joinRoom() {
    const pinInput = document.getElementById('codehoot-join-pin');
    const nickInput = document.getElementById('codehoot-player-nickname');

    const pin = pinInput ? pinInput.value.replace(/\s+/g, '').trim() : '';
    let nickname = nickInput ? nickInput.value.trim() : '';

    if (!pin || pin.length < 6) {
      alert("Iltimos, 6 xonali to'g'ri o'yin PIN kodini kiriting!");
      return;
    }

    const user = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (!nickname) {
      nickname = user ? (user.username || user.name) : ("O'quvchi_" + Math.floor(Math.random() * 900 + 100));
    }

    this.roomPin = pin;
    this.roomId = 'room_' + pin;
    this.playerName = nickname;
    this.playerAvatar = (user && user.avatar) ? user.avatar : "assets/memes/meme-1.jpg";
    this.playerScore = 0;
    this.playerStreak = 0;

    // Firestore orqali qidirish
    if (typeof db !== 'undefined' && db && isFirebaseConnected) {
      db.collection('kahoot_rooms').doc(this.roomId).get().then(doc => {
        if (!doc.exists) {
          alert("Bunday PIN kodli xona topilmadi! O'qituvchidan PIN kodni so'rang.");
          return;
        }

        const data = doc.data();
        const playerCount = Object.keys(data.players || {}).length;
        if (playerCount >= 20) {
          alert("Kechirasiz, xona to'ldi (maksimal 20 ta o'quvchi)!");
          return;
        }

        const newPlayer = {
          id: this.playerId,
          name: this.playerName,
          avatar: this.playerAvatar,
          score: 0,
          streak: 0,
          joinedAt: Date.now(),
          lastAnswer: null,
          lastAnswerCorrect: false
        };

        const update = {};
        update[`players.${this.playerId}`] = newPlayer;

        db.collection('kahoot_rooms').doc(this.roomId).update(update).then(() => {
          this.listenToRoom(this.roomId);
          this.showScreen('player-lobby');
          this.updatePlayerLobbyUI();
        });
      }).catch(err => {
        alert("Xonaga ulanishda xatolik: " + err.message);
      });
    } else {
      // Local rejim (agar bir brauzerda sinovdan o'tkazilayotgan bo'lsa)
      if (this.roomData && this.roomData.pin === pin) {
        this.roomData.players[this.playerId] = {
          id: this.playerId,
          name: this.playerName,
          avatar: this.playerAvatar,
          score: 0,
          streak: 0
        };
        this.showScreen('player-lobby');
        this.updatePlayerLobbyUI();
      } else {
        alert("Xona topilmadi yoki internetga ulanish mavjud emas!");
      }
    }
  },

  updatePlayerLobbyUI() {
    const nameEl = document.getElementById('codehoot-player-lobby-name');
    const avEl = document.getElementById('codehoot-player-lobby-avatar');
    if (nameEl) nameEl.textContent = this.playerName;
    if (avEl) {
      if (typeof getAvatarHtml === 'function') {
        avEl.innerHTML = getAvatarHtml(this.playerAvatar);
      } else {
        avEl.textContent = '👤';
      }
    }
  },

  // ─── 6. FIRESTORE REALTIME TINGLASH (ONSNAPSHOT) ───────────────
  listenToRoom(roomId) {
    if (this.roomUnsubscribe) this.roomUnsubscribe();

    this.roomUnsubscribe = db.collection('kahoot_rooms').doc(roomId).onSnapshot(doc => {
      if (!doc.exists) return;
      const data = doc.data();
      this.handleRoomUpdate(data);
    }, err => {
      console.error('Codehoot xona kuzatuvida xatolik:', err);
    });
  },

  // Xona holati yangilanganda barcha o'yinchilarda bajariladigan reaksiya
  handleRoomUpdate(data) {
    const prevStatus = this.roomData ? this.roomData.status : null;
    const prevIndex = this.roomData ? this.roomData.currentQuestionIndex : -1;
    this.roomData = data;
    this.questions = data.questions || [];
    this.currentIndex = data.currentQuestionIndex || 0;

    // 1. Lobby holatida o'yinchilarni yangilash
    if (data.status === 'lobby') {
      if (this.role === 'host') {
        this.renderHostLobbyPlayers();
      }
    }

    // 2. Yangi savol boshlanganda
    if (data.status === 'question') {
      if (prevStatus !== 'question' || prevIndex !== data.currentQuestionIndex) {
        this.startQuestionView(data.currentQuestionIndex, data.questionStartTime, data.timePerQuestion);
      } else {
        // Host uchun javoblar sonini yangilash
        this.updateAnswersCountDisplay();
      }
    }

    // 3. Savol natijasi e'lon qilinganda (Reveal)
    if (data.status === 'reveal' && prevStatus !== 'reveal') {
      this.showRevealView();
    }

    // 4. Reyting / Leaderboard ko'rsatilganda
    if (data.status === 'leaderboard' && prevStatus !== 'leaderboard') {
      this.showLeaderboardView();
    }

    // 5. O'yin tugaganda (Podium)
    if (data.status === 'finished' && prevStatus !== 'finished') {
      this.showPodiumView();
    }
  },

  // ─── 7. HOST: LOBBY O'YINCHILARINI CHIQARISH ───────────────────
  renderHostLobbyPlayers() {
    const container = document.getElementById('codehoot-lobby-players-grid');
    const countBadge = document.getElementById('codehoot-lobby-count');
    const startBtn = document.getElementById('codehoot-host-start-btn');
    if (!container) return;

    const players = Object.values((this.roomData && this.roomData.players) || this.localPlayers || {});
    if (countBadge) countBadge.textContent = `${players.length} / 20 o'quvchi`;

    if (startBtn) {
      // Kamida 1 ta o'yinchi bo'lsa yoki o'qituvchi yolg'iz o'zi sinamoqchi bo'lsa ham ruxsat
      startBtn.disabled = false;
      startBtn.style.opacity = '1';
      startBtn.style.cursor = 'pointer';
    }

    if (players.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align:center; padding: 30px; color: var(--text-muted);">
          <div style="font-size:32px; margin-bottom:10px; animation: pulse 1.5s infinite;">⏳</div>
          O'quvchilar qo'shilishini kuting... PIN kod: <b style="color:var(--accent-cyan);">${this.roomPin}</b>
        </div>
      `;
      return;
    }

    container.innerHTML = players.map(p => {
      const avHtml = typeof getAvatarHtml === 'function' ? getAvatarHtml(p.avatar) : '👤';
      return `
        <div class="codehoot-lobby-chip animate-pop">
          <div class="codehoot-chip-av">${avHtml}</div>
          <span class="codehoot-chip-name">${this.escapeHtml(p.name)}</span>
        </div>
      `;
    }).join('');
  },

  // ─── 8. O'YINNI BOSHLASH VA BOSHQARISH (HOST) ──────────────────
  startGame() {
    if (this.questions.length === 0) {
      this.questions = this.getQuestionsForCategory(this.category, this.questionCount);
    }
    this.sendQuestion(0);
  },

  sendQuestion(index) {
    this.currentIndex = index;
    const now = Date.now();
    const update = {
      status: 'question',
      currentQuestionIndex: index,
      questionStartTime: now,
      updatedAt: now
    };

    // O'yinchilarning joriy savol javoblarini tozalash
    if (this.roomData && this.roomData.players) {
      Object.keys(this.roomData.players).forEach(pId => {
        update[`players.${pId}.lastAnswer`] = null;
        update[`players.${pId}.lastAnswerCorrect`] = false;
        update[`players.${pId}.lastAnswerTime`] = 0;
      });
    }

    if (this.isLocalMode || !isFirebaseConnected) {
      this.roomData.status = 'question';
      this.roomData.currentQuestionIndex = index;
      this.roomData.questionStartTime = now;
      this.startQuestionView(index, now, this.timePerQuestion);
      this.simulateBotAnswers();
    } else {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  // Botlarning javob berishini simulyatsiya qilish
  simulateBotAnswers() {
    if (!this.roomData || !this.roomData.players) return;
    const curQ = this.questions[this.currentIndex];
    if (!curQ) return;

    Object.values(this.roomData.players).forEach(p => {
      if (!p.isBot) return;
      // Botlar 2 - 8 soniya ichida javob beradi
      const delay = Math.floor(Math.random() * 6000 + 2000);
      setTimeout(() => {
        if (this.roomData.status !== 'question') return;
        // 75% ehtimol bilan to'g'ri javob beradi
        const isCorrect = Math.random() < 0.75;
        const answerIdx = isCorrect ? curQ.correct : (curQ.correct + 1) % 4;
        const speedPoints = Math.max(300, Math.round(1000 - (delay / 10)));
        const addedScore = isCorrect ? speedPoints : 0;

        if (this.isLocalMode || !isFirebaseConnected) {
          p.lastAnswer = answerIdx;
          p.lastAnswerCorrect = isCorrect;
          if (isCorrect) {
            p.score = (p.score || 0) + addedScore;
            p.streak = (p.streak || 0) + 1;
          } else {
            p.streak = 0;
          }
          this.updateAnswersCountDisplay();
        } else {
          const update = {};
          update[`players.${p.id}.lastAnswer`] = answerIdx;
          update[`players.${p.id}.lastAnswerCorrect`] = isCorrect;
          if (isCorrect) {
            update[`players.${p.id}.score`] = firebase.firestore.FieldValue.increment(addedScore);
            update[`players.${p.id}.streak`] = firebase.firestore.FieldValue.increment(1);
          } else {
            update[`players.${p.id}.streak`] = 0;
          }
          db.collection('kahoot_rooms').doc(this.roomId).update(update);
        }
      }, delay);
    });
  },

  // ─── 9. SAVOL EKRANI (QUESTION VIEW) ──────────────────────────
  startQuestionView(index, startTime, duration) {
    this.hasAnsweredCurrent = false;
    this.showScreen('game-question');

    const curQ = this.questions[index];
    if (!curQ) return;

    // Savol matni va raqami
    const qNumEl = document.getElementById('codehoot-q-current-num');
    const qTotalEl = document.getElementById('codehoot-q-total-num');
    const qTextEl = document.getElementById('codehoot-q-text');
    const mediaContainer = document.getElementById('codehoot-q-media');

    if (qNumEl) qNumEl.textContent = (index + 1);
    if (qTotalEl) qTotalEl.textContent = this.questions.length;
    if (qTextEl) qTextEl.textContent = curQ.q;

    // Bayroq yoki kod namoyishi
    if (mediaContainer) {
      if (curQ.flagCode) {
        mediaContainer.style.display = 'flex';
        mediaContainer.innerHTML = `
          <div class="codehoot-flag-box">
            <img src="https://flagcdn.com/w320/${curQ.flagCode}.png" 
                 alt="Bayroq" 
                 class="codehoot-flag-img"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';" />
            <div class="codehoot-flag-fallback" style="display:none; font-size:72px;">${curQ.flagEmoji || '🏳️'}</div>
          </div>
        `;
      } else if (curQ.code) {
        mediaContainer.style.display = 'flex';
        mediaContainer.innerHTML = `
          <div class="codehoot-code-snippet">
            <pre><code>${this.escapeHtml(curQ.code)}</code></pre>
          </div>
        `;
      } else {
        mediaContainer.style.display = 'none';
        mediaContainer.innerHTML = '';
      }
    }

    // 4 ta javob tugmalari
    const optionsGrid = document.getElementById('codehoot-answers-grid');
    if (optionsGrid) {
      const shapes = ['🔺', '🔷', '🟡', '🟩'];
      const colors = ['red', 'blue', 'yellow', 'green'];
      
      optionsGrid.innerHTML = curQ.options.map((opt, i) => `
        <button class="codehoot-answer-btn btn-${colors[i]}" 
                onclick="Codehoot.handlePlayerAnswer(${i})" 
                id="codehoot-btn-${i}">
          <span class="codehoot-shape">${shapes[i]}</span>
          <span class="codehoot-opt-text">${this.escapeHtml(opt)}</span>
        </button>
      `).join('');
    }

    // Holat ko'rsatkichi (kutish matnini yashirish)
    const feedbackBox = document.getElementById('codehoot-player-feedback');
    if (feedbackBox) feedbackBox.style.display = 'none';

    // Javob berganlar hisoblagichi
    this.updateAnswersCountDisplay();

    // Taymerni ishga tushirish
    this.startCountdownTimer(duration || this.timePerQuestion);
  },

  // Qancha o'yinchi javob berganini ko'rsatish
  updateAnswersCountDisplay() {
    const el = document.getElementById('codehoot-answers-count-badge');
    if (!el || !this.roomData) return;
    const players = Object.values(this.roomData.players || {});
    const answered = players.filter(p => p.lastAnswer !== null && p.lastAnswer !== undefined).length;
    el.textContent = `${answered} / ${players.length} javob berdi`;

    // Agar hamma o'quvchilar javob berib bo'lgan bo'lsa va host bo'lsak, vaqtdan oldin to'xtatish
    if (this.role === 'host' && players.length > 0 && answered === players.length) {
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerSecondsLeft = 0;
      setTimeout(() => this.revealQuestionResult(), 600);
    }
  },

  // Taymerni hisoblash
  startCountdownTimer(duration) {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerSecondsLeft = duration;
    
    const timeDisplay = document.getElementById('codehoot-timer-num');
    const barFill = document.getElementById('codehoot-timer-progress');
    
    if (timeDisplay) timeDisplay.textContent = this.timerSecondsLeft;
    if (barFill) barFill.style.width = '100%';

    this.timerInterval = setInterval(() => {
      this.timerSecondsLeft--;
      if (timeDisplay) timeDisplay.textContent = Math.max(0, this.timerSecondsLeft);
      if (barFill) {
        const pct = Math.max(0, (this.timerSecondsLeft / duration) * 100);
        barFill.style.width = pct + '%';
        if (pct < 25) {
          barFill.style.background = '#ef4444';
        } else if (pct < 50) {
          barFill.style.background = '#f59e0b';
        } else {
          barFill.style.background = 'var(--accent-cyan)';
        }
      }

      // Ovozli tick
      if (this.timerSecondsLeft <= 5 && this.timerSecondsLeft > 0) {
        codehootSound.playTick();
      }

      if (this.timerSecondsLeft <= 0) {
        clearInterval(this.timerInterval);
        if (this.role === 'host') {
          this.revealQuestionResult();
        }
      }
    }, 1000);
  },

  // ─── 10. O'QUVCHI JAVOBNI BOSGANDA ────────────────────────────
  handlePlayerAnswer(index) {
    if (this.hasAnsweredCurrent) return;
    this.hasAnsweredCurrent = true;
    codehootSound.playClick();

    // Barcha tugmalarni muzlatish, tanlanganni belgilash
    for (let i = 0; i < 4; i++) {
      const btn = document.getElementById(`codehoot-btn-${i}`);
      if (btn) {
        btn.disabled = true;
        if (i === index) {
          btn.classList.add('selected');
        } else {
          btn.style.opacity = '0.35';
        }
      }
    }

    const curQ = this.questions[this.currentIndex];
    const isCorrect = (index === curQ.correct);
    
    // Ball hisoblash: tezkorlikka qarab 500 dan 1000 gacha ball
    const speedRatio = Math.max(0.1, this.timerSecondsLeft / this.timePerQuestion);
    const addedScore = isCorrect ? Math.round(500 + 500 * speedRatio) : 0;
    
    if (isCorrect) {
      this.playerScore += addedScore;
      this.playerStreak++;
    } else {
      this.playerStreak = 0;
    }

    // Feedback ko'rsatish
    const feedbackBox = document.getElementById('codehoot-player-feedback');
    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.innerHTML = `
        <div style="font-size:16px; font-weight:600; color:var(--accent-cyan);">
          ✓ Javob qabul qilindi! Natijani kuting...
        </div>
      `;
    }

    // Ma'lumotlarni yuborish
    if (this.isLocalMode || !isFirebaseConnected) {
      if (this.roomData && this.roomData.players && this.roomData.players[this.playerId]) {
        const p = this.roomData.players[this.playerId];
        p.lastAnswer = index;
        p.lastAnswerCorrect = isCorrect;
        p.score = this.playerScore;
        p.streak = this.playerStreak;
      }
      this.updateAnswersCountDisplay();
    } else {
      const update = {};
      update[`players.${this.playerId}.lastAnswer`] = index;
      update[`players.${this.playerId}.lastAnswerCorrect`] = isCorrect;
      if (isCorrect) {
        update[`players.${this.playerId}.score`] = firebase.firestore.FieldValue.increment(addedScore);
        update[`players.${this.playerId}.streak`] = firebase.firestore.FieldValue.increment(1);
      } else {
        update[`players.${this.playerId}.streak`] = 0;
      }
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  // ─── 11. SAVOL NATIJASINI E'LON QILISH (REVEAL) ───────────────
  revealQuestionResult() {
    const update = {
      status: 'reveal',
      updatedAt: Date.now()
    };
    if (this.isLocalMode || !isFirebaseConnected) {
      this.roomData.status = 'reveal';
      this.showRevealView();
    } else {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  showRevealView() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.showScreen('reveal-screen');

    const curQ = this.questions[this.currentIndex];
    if (!curQ) return;

    // To'g'ri javob matni
    const correctAnsText = document.getElementById('codehoot-reveal-correct-text');
    if (correctAnsText) {
      correctAnsText.textContent = curQ.options[curQ.correct];
    }

    // O'yinchining o'z natijasi
    const personalResult = document.getElementById('codehoot-reveal-personal');
    if (personalResult) {
      const myPlayerData = (this.roomData && this.roomData.players && this.roomData.players[this.playerId]) || null;
      const isCorrect = myPlayerData ? myPlayerData.lastAnswerCorrect : false;

      if (isCorrect) {
        codehootSound.playCorrect();
        personalResult.innerHTML = `
          <div class="codehoot-banner correct animate-pop">
            <span style="font-size:36px;">🎉</span>
            <div>
              <div style="font-size:20px; font-weight:700;">Barakalla! To'g'ri javob!</div>
              <div style="font-size:14px; opacity:0.9;">Seriya: 🔥 ${this.playerStreak} ta ketma-ket</div>
            </div>
          </div>
        `;
      } else {
        codehootSound.playWrong();
        personalResult.innerHTML = `
          <div class="codehoot-banner wrong animate-pop">
            <span style="font-size:36px;">😢</span>
            <div>
              <div style="font-size:20px; font-weight:700;">Noto'g'ri javob!</div>
              <div style="font-size:14px; opacity:0.9;">To'g'ri javob: <b>${this.escapeHtml(curQ.options[curQ.correct])}</b></div>
            </div>
          </div>
        `;
      }
    }

    // Javoblar taqsimoti statistikasi (barcha o'quvchilar qaysi javobni tanladi)
    const statsContainer = document.getElementById('codehoot-reveal-stats');
    if (statsContainer && this.roomData && this.roomData.players) {
      const counts = [0, 0, 0, 0];
      const players = Object.values(this.roomData.players);
      players.forEach(p => {
        if (p.lastAnswer !== null && p.lastAnswer !== undefined && p.lastAnswer >= 0 && p.lastAnswer < 4) {
          counts[p.lastAnswer]++;
        }
      });

      const maxCount = Math.max(1, ...counts);
      const shapes = ['🔺', '🔷', '🟡', '🟩'];
      const colors = ['#e21b3c', '#1368ce', '#d89e00', '#26890c'];

      statsContainer.innerHTML = counts.map((cnt, i) => {
        const heightPct = Math.round((cnt / maxCount) * 100);
        const isThisCorrect = (i === curQ.correct);
        return `
          <div class="codehoot-bar-col ${isThisCorrect ? 'is-correct' : ''}">
            <div class="codehoot-bar-count">${cnt}</div>
            <div class="codehoot-bar-track">
              <div class="codehoot-bar-fill" style="height:${heightPct}%; background:${colors[i]};"></div>
            </div>
            <div class="codehoot-bar-label">${shapes[i]} ${isThisCorrect ? '✓' : ''}</div>
          </div>
        `;
      }).join('');
    }

    // Host uchun "Reytingni ko'rish" tugmasini faollashtirish
    const hostNextBtn = document.getElementById('codehoot-reveal-next-btn');
    if (hostNextBtn) {
      hostNextBtn.style.display = (this.role === 'host') ? 'inline-flex' : 'none';
    }
  },

  // ─── 12. REYTING / LEADERBOARD EKRANI ─────────────────────────
  showLeaderboard() {
    const update = {
      status: 'leaderboard',
      updatedAt: Date.now()
    };
    if (this.isLocalMode || !isFirebaseConnected) {
      this.roomData.status = 'leaderboard';
      this.showLeaderboardView();
    } else {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  showLeaderboardView() {
    this.showScreen('leaderboard-screen');

    const listEl = document.getElementById('codehoot-leaderboard-list');
    if (!listEl || !this.roomData || !this.roomData.players) return;

    // Ball bo'yicha saralash
    const players = Object.values(this.roomData.players).sort((a, b) => (b.score || 0) - (a.score || 0));

    listEl.innerHTML = players.slice(0, 10).map((p, rank) => {
      const isMe = (p.id === this.playerId);
      const avHtml = typeof getAvatarHtml === 'function' ? getAvatarHtml(p.avatar) : '👤';
      const medal = rank === 0 ? '🥇' : rank === 1 ? '🥈' : rank === 2 ? '🥉' : `${rank + 1}`;

      return `
        <div class="codehoot-rank-item ${isMe ? 'is-me' : ''}">
          <div class="codehoot-rank-badge">${medal}</div>
          <div class="codehoot-rank-avatar">${avHtml}</div>
          <div class="codehoot-rank-name">${this.escapeHtml(p.name)} ${isMe ? '<b>(Siz)</b>' : ''}</div>
          <div class="codehoot-rank-score">${p.score || 0} ball</div>
        </div>
      `;
    }).join('');

    // Host uchun "Keyingi savol" yoki "Natijalar" tugmasi
    const nextBtn = document.getElementById('codehoot-lb-next-btn');
    if (nextBtn) {
      if (this.role === 'host') {
        nextBtn.style.display = 'inline-flex';
        const isLast = (this.currentIndex >= this.questions.length - 1);
        nextBtn.textContent = isLast ? "🏆 G'oliblarni e'lon qilish" : "Keyingi savol →";
      } else {
        nextBtn.style.display = 'none';
      }
    }
  },

  // Host: Keyingi savolga o'tish yoki yakunlash
  advanceToNextQuestion() {
    if (this.currentIndex >= this.questions.length - 1) {
      this.finishGame();
    } else {
      this.sendQuestion(this.currentIndex + 1);
    }
  },

  // ─── 13. O'YIN YAKUNI VA SHOHSUPA (PODIUM) ─────────────────────
  finishGame() {
    const update = {
      status: 'finished',
      updatedAt: Date.now()
    };
    if (this.isLocalMode || !isFirebaseConnected) {
      this.roomData.status = 'finished';
      this.showPodiumView();
    } else {
      db.collection('kahoot_rooms').doc(this.roomId).update(update);
    }
  },

  showPodiumView() {
    this.showScreen('podium-screen');
    codehootSound.playFanfare();

    if (!this.roomData || !this.roomData.players) return;
    const players = Object.values(this.roomData.players).sort((a, b) => (b.score || 0) - (a.score || 0));

    const p1 = players[0];
    const p2 = players[1];
    const p3 = players[2];

    const podiumContainer = document.getElementById('codehoot-podium-cards');
    if (podiumContainer) {
      const renderPodiumStep = (p, rank, height, medal, coins) => {
        if (!p) return '<div class="codehoot-podium-slot empty"></div>';
        const avHtml = typeof getAvatarHtml === 'function' ? getAvatarHtml(p.avatar) : '👤';
        return `
          <div class="codehoot-podium-step rank-${rank} animate-slide-up" style="--h:${height}px;">
            <div class="codehoot-podium-player">
              <div class="codehoot-podium-medal">${medal}</div>
              <div class="codehoot-podium-av">${avHtml}</div>
              <div class="codehoot-podium-name">${this.escapeHtml(p.name)}</div>
              <div class="codehoot-podium-score">${p.score || 0} ball</div>
              <div class="codehoot-podium-reward">+${coins} 🪙</div>
            </div>
            <div class="codehoot-podium-pillar" style="height:${height}px;">
              <span class="pillar-num">${rank}</span>
            </div>
          </div>
        `;
      };

      podiumContainer.innerHTML = `
        <div class="codehoot-podium-wrapper">
          ${renderPodiumStep(p2, 2, 140, '🥈', 50)}
          ${renderPodiumStep(p1, 1, 190, '🥇', 100)}
          ${renderPodiumStep(p3, 3, 100, '🥉', 30)}
        </div>
      `;
    }

    // Foydalanuvchiga tangalar mukofotini taqdim etish
    const currentUser = typeof getCurrentUser === 'function' ? getCurrentUser() : null;
    if (currentUser) {
      const myRank = players.findIndex(p => p.id === this.playerId);
      let earnedCoins = 15; // Ishtirok uchun
      if (myRank === 0) earnedCoins = 100;
      else if (myRank === 1) earnedCoins = 50;
      else if (myRank === 2) earnedCoins = 30;

      if (typeof addCoins === 'function') {
        addCoins(earnedCoins, `Codehoot viktorinasida ${myRank >= 0 ? (myRank + 1) + "-o'rin" : "ishtirok"}`);
      }

      const rewardNotice = document.getElementById('codehoot-my-reward-notice');
      if (rewardNotice) {
        rewardNotice.innerHTML = `
          <div style="background: rgba(251, 191, 36, 0.15); border: 1px solid rgba(251, 191, 36, 0.4); border-radius: 12px; padding: 12px 20px; display:inline-flex; align-items:center; gap:10px; margin-top:20px;">
            <span style="font-size:24px;">🪙</span>
            <div style="text-align:left;">
              <div style="font-size:14px; color:var(--accent-yellow); font-weight:700;">Tabriklaymiz! Hisobingizga +${earnedCoins} Coin qo'shildi!</div>
              <div style="font-size:12px; color:var(--text-muted);">Sizning o'rningiz: ${myRank >= 0 ? (myRank + 1) : '-'} | Ball: ${this.playerScore}</div>
            </div>
          </div>
        `;
      }
    }
  },

  // Yordamchi: HTML belgilarni xavfsiz qilish
  escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
};

// Global doiraga eksport qilish
window.Codehoot = Codehoot;
window.openCodehoot = () => Codehoot.open();
window.closeCodehoot = () => Codehoot.close();

// DOM tayyor bo'lganda ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
  Codehoot.init();
});
