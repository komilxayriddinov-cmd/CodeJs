/**
 * CodeJS - Professional Lesson Engine
 * 5-bosqichli mukammal professional dars tuzilishi:
 * 1. 📖 Mavzu haqida tushuntirish
 * 2. 💻 Sintaksis va kod namunalari
 * 3. 🌍 Real hayotdan misollar
 * 4. ⚙️ Kod qanday ishlashining izohi
 * 5. 📌 Dars oxirida xulosa
 */

const LessonEngine = {
  // Formatlash yordamchisi: Har bir darsni aynan talab qilingan 5 ta blokda shakllantiradi
  formatLesson(data) {
    const stepsHtml = (data.breakdown || []).map((step, idx) => `
      <div class="lesson-step-item">
        <span class="lesson-step-num">${idx + 1}-qadam:</span>
        <span class="lesson-step-text">${step}</span>
      </div>
    `).join('');

    const summaryItems = Array.isArray(data.summary) ? data.summary : [data.summary];
    const summaryHtml = `
      <ul class="lesson-summary-list">
        ${summaryItems.map(s => `<li>${s}</li>`).join('')}
      </ul>
    `;

    return `
      <div class="lesson-professional-wrapper">
        <!-- 1. MAVZU HAQIDA TUSHUNTIRISH -->
        <div class="lesson-section-card">
          <div class="lesson-sec-badge badge-theory">📖 1. Mavzu haqida tushuntirish</div>
          <div class="lesson-sec-body">
            ${data.explanation}
          </div>
        </div>

        <!-- 2. SINTAKSIS VA KOD NAMUNALARI -->
        <div class="lesson-section-card">
          <div class="lesson-sec-badge badge-syntax">💻 2. Sintaksis va kod namunalari</div>
          <div class="lesson-sec-body">
            ${data.syntax}
          </div>
        </div>

        <!-- 3. REAL HAYOTDAN MISOLLAR -->
        <div class="lesson-section-card">
          <div class="lesson-sec-badge badge-realworld">🌍 3. Real hayotdan misollar</div>
          <div class="lesson-sec-body">
            ${data.realWorld}
          </div>
        </div>

        <!-- 4. KOD QANDAY ISHLASHINING IZOHI -->
        <div class="lesson-section-card">
          <div class="lesson-sec-badge badge-breakdown">⚙️ 4. Kod qanday ishlashining izohi</div>
          <div class="lesson-sec-body">
            <div class="lesson-breakdown-steps">
              ${stepsHtml}
            </div>
          </div>
        </div>

        <!-- 5. DARS OXIRIDA XULOSA -->
        <div class="lesson-section-card">
          <div class="lesson-sec-badge badge-summary">📌 5. Dars xulosasi</div>
          <div class="lesson-sec-body">
            ${summaryHtml}
          </div>
        </div>
      </div>
    `;
  },

  // Maxsus tayyorlangan chuqur darslar bazasi
  database: {
    'html-01': {
      title: 'HTML nima? Kirish',
      badge: 'HTML Asoslari',
      difficulty: 'Oson',
      explanation: `
        <h4>Veb-sahifaning poydevori</h4>
        <p><b>HTML</b> (HyperText Markup Language — Gipermatnli belgilash tili) har qanday veb-saytning (Google, YouTube, CodeJS) tayanchi va suyak tuzilishidir.</p>
        <p>HTML dasturlash tili emas, balki sahifadagi matnlar, rasmlar, tugmalar va boshqa qismlarni brauzer qanday ko'rsatishi kerakligini belgilab beruvchi tildir.</p>
      `,
      syntax: `
        <h4>HTML hujjati asosiy andozasi:</h4>
        <pre>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;Mening birinchi sahifam&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;Salom, Dunyo!&lt;/h1&gt;
    &lt;p&gt;Bu mening birinchi veb-sahifam.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</pre>
      `,
      realWorld: `
        <p>Instagram profiliga kirganingizda profilingiz rasmi <code>&lt;img&gt;</code>, ismingiz <code>&lt;h1&gt;</code>, bio qismi <code>&lt;p&gt;</code> tegi orqali ko'rsatiladi. YouTube dagi video nomlari esa <code>&lt;h2&gt;</code> yoki <code>&lt;h3&gt;</code> teglarida joylashgan bo'ladi.</p>
      `,
      breakdown: [
        "<code>&lt;!DOCTYPE html&gt;</code> — brauzerga sahifa eng so'nggi HTML5 standartida ekanligini bildiradi.",
        "<code>&lt;html&gt;</code> — butun sahifaning bosh (ildiz) tegi bo'lib, hamma narsani o'rab turadi.",
        "<code>&lt;head&gt;</code> — sahifaning texnik ma'lumotlari (nomi, shriftlar, ulanadigan fayllar) joylashadigan qismi.",
        "<code>&lt;body&gt;</code> — foydalanuvchi ekranda ko'radigan barcha matnlar, rasmlar va tugmalar aynan shu yerga yoziladi."
      ],
      summary: [
        "HTML — dasturlash tili emas, veb-sahifa tuzilishini yaratuvchi belgilash tilidir.",
        "Barcha ko'rinadigan kontent faqat <code>&lt;body&gt;</code> ichiga yoziladi.",
        "Teglar odatda ochuvchi <code>&lt;tag&gt;</code> va yopuvchi <code>&lt;/tag&gt;</code> juftligidan iborat bo'ladi."
      ],
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
      explanation: `
        <h4>HTML elementlari tuzilishi</h4>
        <p>HTML da har bir narsa elementlardan iborat. Elementlar brauzerga kontentning mohiyatini bildiradi (bu tugmami, sarlavhami yoki oddiy xatboshimi).</p>
        <p>Aksariyat elementlar ochuvchi teg, kontent va yopuvchi tegdan tashkil topadi.</p>
      `,
      syntax: `
        <h4>Ochuvchi va yopuvchi teglar:</h4>
        <pre>&lt;p&gt;Bu oddiy paragraf matni&lt;/p&gt;
&lt;button class="btn"&gt;Meni bosing&lt;/button&gt;

&lt;!-- O'z-o'zidan yopiluvchi teglar (Self-closing): --&gt;
&lt;img src="rasm.jpg" alt="Rasm tavsifi" /&gt;
&lt;input type="text" placeholder="Ismingiz" /&gt;
&lt;br /&gt;</pre>
      `,
      realWorld: `
        <p>Telegram Web dasturida xabar yozish maydoni <code>&lt;input&gt;</code>, xabarni jo'natish esa <code>&lt;button&gt;</code> tegi yordamida yaratilgan. Chatdagi xabarlar esa <code>&lt;p&gt;</code> tegi ichida turadi.</p>
      `,
      breakdown: [
        "<code>&lt;button&gt;</code> — ochuvchi teg: elementning boshlanishini belgilaydi.",
        "<code>Meni bosing</code> — element kontenti: foydalanuvchi ekranda ko'radigan matn.",
        "<code>&lt;/button&gt;</code> — yopuvchi teg: elementning tugaganini ko'rsatuvchi majburiy qism.",
        "O'z-o'zidan yopiluvchi teglarda kontent bo'lmagani sababli yopuvchi teg talab qilinmaydi (masalan: <code>&lt;img&gt;</code>)."
      ],
      summary: [
        "Juft teglarning ochuvchisi ham, yopuvchisi ham bo'lishi shart.",
        "Teg ichiga xususiyat berish uchun atributlar (masalan: <code>class</code>, <code>id</code>) yoziladi.",
        "O'z-o'zidan yopiluvchi teglarga <code>&lt;img&gt;</code>, <code>&lt;input&gt;</code>, <code>&lt;br&gt;</code> kiradi."
      ],
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
      explanation: `
        <h4>Sarlavha ierarxiyasi va matnlar</h4>
        <p>HTML da 6 xil darajadagi sarlavha mavjud: <code>&lt;h1&gt;</code> dan <code>&lt;h6&gt;</code> gacha. <code>&lt;h1&gt;</code> eng muhim va eng katta, <code>&lt;h6&gt;</code> esa eng kichik hisoblanadi.</p>
        <p>Oddiy matnlar va xatboshilar uchun har doim <code>&lt;p&gt;</code> (paragraph) tegi ishlatiladi.</p>
      `,
      syntax: `
        <h4>Sarlavhalar va paragraflar namunasi:</h4>
        <pre>&lt;h1&gt;Katta Bosh Sarlavha (Sahifada 1 dona)&lt;/h1&gt;
&lt;h2&gt;Bo'lim sarlavhasi&lt;/h2&gt;
&lt;h3&gt;Kichik bo'limcha sarlavhasi&lt;/h3&gt;

&lt;p&gt;Bu oddiy paragraf. U matnni yangi qatordan boshlab, ustidan va ostidan bo'shliq qoldiradi.&lt;/p&gt;</pre>
      `,
      realWorld: `
        <p>Kun.uz yoki Daryo.uz yangiliklar saytida maqolaning katta nomi <code>&lt;h1&gt;</code>, maqola ichidagi kichik mavzular <code>&lt;h2&gt;</code>, yangilikning butun matni esa bir nechta <code>&lt;p&gt;</code> paragraflaridan iborat bo'ladi.</p>
      `,
      breakdown: [
        "<code>&lt;h1&gt;</code> — saytning asosiy mavzusi. SEO (Google qidiruvi) uchun har bir sahifada faqat 1 dona bo'lishi maqsadga muvofiq.",
        "<code>&lt;h2&gt; - &lt;h6&gt;</code> — ichki mavzular ierarxiyasini tartibga soladi.",
        "<code>&lt;p&gt;</code> — matnni avtomatik ravishda chiroyli qilib bloklaydi va o'qishni qulaylashtiradi."
      ],
      summary: [
        "Sarlavhani shunchaki matnni kattalashtirish uchun emas, ma'no va tuzilish uchun ishlating.",
        "Oddiy matnlarni har doim <code>&lt;p&gt;</code> tegi ichida yozish standart hisoblanadi."
      ],
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

    'html-04': {
      title: 'Havolalar (a tegi)',
      badge: 'HTML Asoslari',
      difficulty: 'Oson',
      explanation: `
        <h4>Sahifalarni bog'lovchi havolalar</h4>
        <p>Internetning eng qudratli kuchi — bu havolalar (links). Bitta sahifadan boshqasiga o'tish uchun <code>&lt;a&gt;</code> (anchor) tegi ishlatiladi.</p>
        <p>Havola qayerga olib borishini belgilash uchun uning <code>href</code> atributiga manzil kiritiladi.</p>
      `,
      syntax: `
        <h4>Havola tegi sintaksisi:</h4>
        <pre>&lt;!-- Boshqa saytga o'tish: --&gt;
&lt;a href="https://codejs.uz" target="_blank"&gt;CodeJS Saytiga o'tish&lt;/a&gt;

&lt;!-- Sayt ichidagi sahifaga o'tish: --&gt;
&lt;a href="about.html"&gt;Biz haqimizda&lt;/a&gt;</pre>
      `,
      realWorld: `
        <p>Instagram Stories dagi "Havola / Link" tugmasi, YouTube tavsifidagi do'stlar kanallari, Telegramdagi barcha bosiladigan ko'k yozuvlar aynan HTML dagi <code>&lt;a&gt;</code> tegi orqali ishlaydi.</p>
      `,
      breakdown: [
        "<code>&lt;a&gt;</code> — havola elementi.",
        "<code>href=\"...\"</code> — manzil (URL): bosilganda ochiladigan sayt yoki fayl yo'li.",
        "<code>target=\"_blank\"</code> — saytni yangi alohida tabda ochishni ta'minlaydi."
      ],
      summary: [
        "<code>href</code> atributisiz <code>&lt;a&gt;</code> tegi ishlamaydi.",
        "Foydalanuvchi saytingizdan chiqib ketmasligi uchun tashqi havolalarga <code>target=\"_blank\"</code> qo'shing."
      ],
      challenge: 'href="https://codejs.uz" manzilli va matni "CodeJS" bo\'lgan &lt;a&gt; havolasini yozing.',
      starterCode: `<!-- CodeJS ga havola yozing -->\n`,
      validator: (code) => {
        const c = code.toLowerCase();
        if (c.includes('<a') && c.includes('href="https://codejs.uz"') && c.includes('codejs') && c.includes('</a>')) {
          return { success: true };
        }
        return { success: false, error: '<a href="https://codejs.uz">CodeJS</a> kodini to\'g\'ri yozing.' };
      }
    },

    'css-01': {
      title: 'CSS nima? Stillash asoslari',
      badge: 'CSS Stillari',
      difficulty: 'Oson',
      explanation: `
        <h4>Veb-dizayn san'ati</h4>
        <p><b>CSS</b> (Cascading Style Sheets) — sahifaga chiroy, rang, shrift, soya va zamonaviy ko'rinish berish vositasidir.</p>
        <p>Agar HTML uyning g'ishti va poydevori bo'lsa, CSS uning bo'yog'i, eshiklari, oynalari va interyer dizaynidir.</p>
      `,
      syntax: `
        <h4>CSS qoidasi sintaksisi:</h4>
        <pre>h1 {
  color: #00d4ff;
  font-size: 32px;
  text-align: center;
}

.card {
  background-color: #141a2e;
  border-radius: 12px;
  padding: 20px;
}</pre>
      `,
      realWorld: `
        <p>Spotify ilovasining qora foni va yashil tugmalari, Netflix'ning mashhur qizil dizayni va kartochkalar ustiga sichqoncha borgandagi kattalashish animatsiyasi to'liq CSS orqali qilinadi.</p>
      `,
      breakdown: [
        "<code>h1</code> yoki <code>.card</code> — Selektor: aynan qaysi elementni bezamoqchi ekanligimizni ko'rsatadi.",
        "<code>color: #00d4ff;</code> — Xususiyat va qiymat: matn rangini neon moviy qilish.",
        "<code>{ ... }</code> — jingalak qavs ichida barcha stillar yoziladi va har bir satr <code>;</code> bilan tugaydi."
      ],
      summary: [
        "CSS qoidalarida xususiyat va qiymat o'rtasida ikki nuqta (<code>:</code>) qo'yiladi.",
        "Har bir stillash qatori oxirida nuqtali vergul (<code>;</code>) bo'lishi shart."
      ],
      challenge: '.title klassi uchun text rangini (color) "cyan" yoki "#00d4ff" qilib stillang.',
      starterCode: `.title {\n  /* Rangni (color) "cyan" qilib stillang */\n\n}`,
      validator: (code) => {
        const c = code.toLowerCase();
        if (c.includes('color:') && (c.includes('cyan') || c.includes('#00d4ff') || c.includes('rgb(0, 212, 255)'))) {
          return { success: true };
        }
        return { success: false, error: 'color: cyan; yoki color: #00d4ff; deb belgilang.' };
      }
    },

    'css-05': {
      title: 'Flexbox joylashuvi',
      badge: 'CSS Stillari',
      difficulty: 'O\'rta',
      explanation: `
        <h4>Moslashuvchan joylashuv (Flexbox)</h4>
        <p>Flexbox (Flexible Box Layout) elementlarni bir qatorda yoki ustunda tekis, teng va qulay joylashtirish uchun eng zamonaviy vositadir.</p>
        <p>U orqali elementlarni vertikal va gorizontal markazlashtirish bir necha soniyada bajariladi.</p>
      `,
      syntax: `
        <h4>Flexbox xususiyatlari:</h4>
        <pre>.navbar {
  display: flex;
  justify-content: space-between; /* Gorizontal tekislash */
  align-items: center;            /* Vertikal tekislash */
  gap: 16px;                      /* Elementlar orasidagi masofa */
}</pre>
      `,
      realWorld: `
        <p>Har qanday saytning yuqori menyusi (Navbar): chap tomonda Logo, o'rtada menyu tugmalari, o'ng tomonda esa "Kirish" tugmasi bir tekis gorizontal joylashishi aynan <code>display: flex</code> orqali qilinadi.</p>
      `,
      breakdown: [
        "<code>display: flex;</code> — ota elementni flex konteynerga aylantiradi.",
        "<code>justify-content: space-between;</code> — bolalarni chap va o'ng chetga suradi.",
        "<code>align-items: center;</code> — elementlarni vertikal o'qda markazga keltiradi.",
        "<code>gap: 16px;</code> — elementlar orasida bo'sh joy qoldiradi."
      ],
      summary: [
        "Markazlashtirish uchun: <code>justify-content: center; align-items: center;</code> eng qulay usul.",
        "Flexbox avtomatik ravishda bolalarni bitta qatorga joylaydi."
      ],
      challenge: '.container klassiga display: flex; va justify-content: center; xususiyatlarini bering.',
      starterCode: `.container {\n  /* display va justify-content bering */\n\n}`,
      validator: (code) => {
        const c = code.toLowerCase();
        if (c.includes('display: flex') && c.includes('justify-content: center')) {
          return { success: true };
        }
        return { success: false, error: 'display: flex; va justify-content: center; deb yozing.' };
      }
    },

    'js-basics-01': {
      title: 'JavaScript nima? Kirish',
      badge: 'JS Asoslari',
      difficulty: 'Oson',
      explanation: `
        <h4>Internetning harakatlantiruvchi kuchi</h4>
        <p><b>JavaScript</b> — veb-sahifalarga jon va interaktivlik bag'ishlovchi dasturlash tilidir.</p>
        <p>HTML sahifaning skeleti, CSS uning ko'rinishi bo'lsa, JavaScript insonning miyasi va harakatlaridir. Tugma bosilganda oyna ochilishi, animatsiyalar, hisob-kitoblar — hammasi JS orqali qilinadi.</p>
      `,
      syntax: `
        <h4>Konsolga ma'lumot chiqarish:</h4>
        <pre>// Konsolga xabar chiqarish
console.log("Salom, CodeJS!");

// Ekranga xabarnoma chiqarish
alert("Xush kelibsiz!");</pre>
      `,
      realWorld: `
        <p>Instagramda postga 2 marta bosganingizda qizil yurakcha chiqishi, YouTube da video sekundomeri yurishi yoki onlayn do'konda savatga mahsulot qo'shilganda savatdagi son o'zgarishi aynan JavaScript bilan amalga oshiriladi.</p>
      `,
      breakdown: [
        "<code>console</code> — brauzerdagi dasturchilar konsoli obyekti.",
        "<code>.log(...)</code> — berilgan matn yoki natijani konsolda ko'rsatish buyrug'i.",
        "<code>\"Salom, CodeJS!\"</code> — qo'shtirnoq ichidagi matn (String) turi hisoblanadi."
      ],
      summary: [
        "JavaScript to'g'ridan-to'g'ri brauzerda ishlaydi, qo'shimcha dastur talab qilmaydi.",
        "Natijani va xatolarni tekshirish uchun <code>console.log()</code> eng asosiy quroldir."
      ],
      challenge: 'console.log() orqali "Hello JS" so\'zini konsolga chiqaring.',
      starterCode: `// console.log() orqali "Hello JS" so'zini chiqaring:\n`,
      validator: (code) => {
        if (code.includes('console.log') && (code.includes('"Hello JS"') || code.includes("'Hello JS'") || code.includes('`Hello JS`'))) {
          return { success: true };
        }
        return { success: false, error: 'Iltimos, console.log("Hello JS"); ko\'rinishida yozing.' };
      }
    },

    'js-basics-02': {
      title: 'O\'zgaruvchilar (let, const)',
      badge: 'JS Asoslari',
      difficulty: 'Oson',
      explanation: `
        <h4>Ma'lumotlarni saqlash qutichalari</h4>
        <p>O'zgaruvchi (Variable) — dastur davomida ma'lumotlarni xotirada saqlash va ulardan qayta foydalanish uchun ishlatiladi.</p>
        <p>Zamonaviy JavaScript da o'zgaruvchilar <code>let</code> va <code>const</code> kalit so'zlari orqali e'lon qilinadi.</p>
      `,
      syntax: `
        <h4>let va const sintaksisi:</h4>
        <pre>// const — qiymati o'zgarmaydigan o'zgaruvchi:
const ism = "Komil";
const PI = 3.14;

// let — qiymati keyinchalik o'zgarishi mumkin:
let tangalar = 50;
tangalar = tangalar + 20; // Endi 70 bo'ldi</pre>
      `,
      realWorld: `
        <p>O'yinda o'yinchining tangalari soni <code>let coins = 100</code> vaqt o'tishi bilan o'zgarib boradi, lekin uning profil ID raqami <code>const userId = "U789"</code> butun o'yin davomida o'zgarmas bo'lib qoladi.</p>
      `,
      breakdown: [
        "<code>const</code> — qiymati qat'iy o'zgarmas o'zgaruvchi.",
        "<code>let</code> — kelajakda qiymatini yangilash mumkin bo'lgan o'zgaruvchi.",
        "<code>=</code> belgisi — qiymatni o'zlashtirish (o'ng tarafdagi qiymatni chap tarafdagi qutichaga solish) amali."
      ],
      summary: [
        "Doimo birinchi navbatda <code>const</code> ishlating.",
        "Faqat qiymati o'zgarishi aniq bo'lgandagina <code>let</code> dan foydalaning.",
        "Eski <code>var</code> dan zamonaviy kodda foydalanmaslik tavsiya etiladi."
      ],
      challenge: 'let score = 100; va const playerName = "Jasur"; o\'zgaruvchilarini e\'lon qiling.',
      starterCode: `// score va playerName o'zgaruvchilarini yozing:\n`,
      validator: (code) => {
        const c = code.replace(/\s+/g, ' ');
        if (c.includes('let score = 100') && (c.includes('const playername = "jasur"') || c.includes("const playername = 'jasur'"))) {
          return { success: true };
        }
        return { success: false, error: 'let score = 100; va const playerName = "Jasur"; deb yozing.' };
      }
    },

    'js-functions-01': {
      title: 'Funksiyalar va return',
      badge: 'Funksiyalar',
      difficulty: 'O\'rta',
      explanation: `
        <h4>Qayta ishlatiluvchi kod bloklari</h4>
        <p>Funksiya — ma'lum bir vazifani bajaruvchi mustaqil kod blokidir. Kodni har safar boshqatdan yozmasdan, funksiya nomi orqali istalgan joyda qayta ishlatish mumkin.</p>
        <p>Funksiyalar tashqaridan parametrlar qabul qiladi va <code>return</code> orqali natijani qaytaradi.</p>
      `,
      syntax: `
        <h4>Funksiya yaratish va chaqirish:</h4>
        <pre>function salomBer(ism) {
  return "Salom, " + ism + "!";
}

let xabar = salomBer("Sardor");
console.log(xabar); // Salom, Sardor!</pre>
      `,
      realWorld: `
        <p>Kalkulyatorda "Hisoblash" yoki bank ilovasida "Pul o'tkazish" tugmasini bosganingizda, orqa fonda tayyor <code>otkazmaQilish(summa, kartaRaqami)</code> funksiyasi ishga tushadi.</p>
      `,
      breakdown: [
        "<code>function</code> — yangi funksiya e'lon qilish kalit so'zi.",
        "<code>(ism)</code> — parametr: funksiya ishlashi uchun zarur bo'lgan xomashyo.",
        "<code>return</code> — funksiya hisoblab chiqqan natijasini tashqariga qaytarish buyrug'i."
      ],
      summary: [
        "Funksiyalar kod takrorlanishining oldini oladi (DRY qoidasi).",
        "<code>return</code> chaqirilgandan so'ng funksiya ishlashdan to'xtaydi."
      ],
      challenge: 'Ikkita son a va b ni qabul qilib, ularning yig\'indisini return qiluvchi qoshish(a, b) funksiyasini yozing.',
      starterCode: `function qoshish(a, b) {\n  // a va b yig'indisini return qiling\n\n}`,
      validator: (code) => {
        try {
          const fn = new Function(`${code}; return qoshish;`)();
          if (typeof fn === 'function' && fn(5, 7) === 12 && fn(10, 20) === 30) {
            return { success: true };
          }
        } catch (e) {
          return { success: false, error: 'Funksiya sintaksisida xatolik: ' + e.message };
        }
        return { success: false, error: 'qoshish(a, b) funksiyasi a + b ni return qilishi kerak.' };
      }
    }
  },

  // Boshqa barcha darslar uchun 5 bosqichli professional dinamik generator
  getLesson(catId, lessonNum, fallbackItem) {
    const key = `${catId}-${lessonNum}`;
    let lesson = this.database[key];

    if (lesson) {
      return {
        title: lesson.title,
        badge: lesson.badge,
        difficulty: lesson.difficulty,
        theoryHtml: this.formatLesson(lesson),
        challenge: lesson.challenge,
        starterCode: lesson.starterCode,
        validator: lesson.validator
      };
    }

    // Agar maxsus yozilmagan bo'lsa, mavzu bo'yicha 5-bosqichli professional dars generatsiya qilinadi
    const title = fallbackItem?.title || `Dars #${lessonNum}`;
    const desc = fallbackItem?.desc || 'Ushbu mavzuni o\'rganing';

    const generated = {
      explanation: `
        <h4>${title} haqida batafsil</h4>
        <p><b>${title}</b> — dasturlash va veb-ishlab chiqishda juda muhim o'rin tutadi. Ushbu mavzu orqali siz: <i>${desc}</i> ko'nikmasini chuqur o'zlashtirasiz.</p>
        <p>Har bir professional dasturchi kod yozish jarayonida ushbu usuldan doimiy ravishda foydalanadi.</p>
      `,
      syntax: `
        <h4>Amaliy sintaksis va kod namunasi:</h4>
        <pre>// ${title} uchun namuna:
const mavzu = "${title}";
console.log("Hozir o'rganilmoqda: " + mavzu);

// Vazifa va mantiqiy blok:
if (mavzu) {
  console.log("Dars muvaffaqiyatli o'zlashtirildi!");
}</pre>
      `,
      realWorld: `
        <p>Real veb-loyihalarda (masalan, Telegram Web, YouTube yoki onlayn platformalarda) <b>${title}</b> ma'lumotlarni saralash, foydalanuvchi interfeysini tezlashtirish va ishonchli ishlashni ta'minlash uchun xizmat qiladi.</p>
      `,
      breakdown: [
        `1. Dastlab kerakli o'zgaruvchi va parametrlar e'lon qilinadi.`,
        `2. Berilgan qiymat tekshirilib, mantiqiy amal bajariladi.`,
        `3. Natija foydalanuvchiga yoki konsolga chiqariladi.`
      ],
      summary: [
        `${title} qoidalariga doimo qat'iy amal qiling.`,
        `Kodingizni toza va tushunarli qilib yozish dasturlashning oltin qoidasidir.`,
        `Ushbu darsni yakunlab, amaliy topshiriq orqali bilimlarni mustahkamlang.`
      ]
    };

    return {
      title: title,
      badge: catId.toUpperCase(),
      difficulty: fallbackItem?.difficulty === 'hard' ? 'Qiyin' : fallbackItem?.difficulty === 'medium' ? 'O\'rta' : 'Oson',
      theoryHtml: this.formatLesson(generated),
      challenge: `console.log("${title}") buyrug'ini yozing va tekshiring.`,
      starterCode: `// ${title} bo'yicha topshiriq kodini yozing:\nconsole.log("${title}");\n`,
      validator: (code) => {
        if (code.includes('console.log')) {
          return { success: true };
        }
        return { success: false, error: 'Iltimos, kodda console.log(...) buyrug\'ini yozing.' };
      }
    };
  }
};

