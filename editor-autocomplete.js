/**
 * CodeJS - VS Code Style IntelliSense & Autocomplete Engine
 * Brauzerda kod yozishni VS Code kabi qulay va tezkor qiluvchi tizim:
 * - HTML, CSS va JavaScript uchun aqlli takliflar (podskazkalar)
 * - Matn kiritish kursorining pastida aynan VS Code dizaynidagi popup
 * - Tab / Enter orqali tanlash, Yuqoriga / Pastga o'qlar orqali boshqarish
 * - Avtomatik qavslar va tirnoqlarni yopish () {} [] "" ''
 * - 2 bo'shliqli professional Tab chekinishi
 */

(function () {
  'use strict';

  // ─── 1. BAZAVIY TAKLIFLAR BAZASI (INTELLISENSE DICTIONARY) ─────────
  const JS_COMPLETIONS = [
    // Methods / Functions
    { label: 'console.log()', insertText: 'console.log($0);', kind: 'method', detail: 'log(data: any): void', doc: "Konsolga ma'lumot yoki natija chiqarish" },
    { label: 'console.error()', insertText: 'console.error($0);', kind: 'method', detail: 'error(message: any): void', doc: 'Konsolga qizil xatolik xabarini chiqarish' },
    { label: 'console.warn()', insertText: 'console.warn($0);', kind: 'method', detail: 'warn(message: any): void', doc: 'Konsolga ogohlantirish chiqarish' },
    { label: 'console.table()', insertText: 'console.table($0);', kind: 'method', detail: 'table(data: any): void', doc: "Ma'lumotlarni chiroyli jadval ko'rinishida chiqarish" },
    { label: 'console.clear()', insertText: 'console.clear();', kind: 'method', detail: 'clear(): void', doc: 'Konsolni tozalash' },

    // DOM API
    { label: 'document.getElementById()', insertText: "document.getElementById('$0')", kind: 'method', detail: 'getElementById(id: string): HTMLElement', doc: "Elementni ID bo'yicha topish" },
    { label: 'document.querySelector()', insertText: "document.querySelector('$0')", kind: 'method', detail: 'querySelector(selectors: string): Element', doc: 'CSS selektori bo\'yicha birinchi elementni topish' },
    { label: 'document.querySelectorAll()', insertText: "document.querySelectorAll('$0')", kind: 'method', detail: 'querySelectorAll(selectors: string): NodeList', doc: 'CSS selektori bo\'yicha barcha elementlarni topish' },
    { label: 'document.createElement()', insertText: "document.createElement('$0')", kind: 'method', detail: 'createElement(tagName: string): HTMLElement', doc: 'Yangi HTML element yaratish' },
    { label: 'addEventListener()', insertText: "addEventListener('$0', (e) => {\n  \n});", kind: 'method', detail: 'addEventListener(type, listener): void', doc: 'Hodisa tinglovchisini biriktirish (click, input, submit...)' },

    // Keywords
    { label: 'const', insertText: 'const $0 = ;', kind: 'keyword', detail: 'const name = value', doc: "O'zgarmas o'zgaruvchi e'lon qilish" },
    { label: 'let', insertText: 'let $0 = ;', kind: 'keyword', detail: 'let name = value', doc: "O'zgaruvchi e'lon qilish (blok doirasi)" },
    { label: 'var', insertText: 'var $0 = ;', kind: 'keyword', detail: 'var name = value', doc: "Eski uslubdagi o'zgaruvchi" },
    { label: 'function', insertText: 'function $0() {\n  \n}', kind: 'keyword', detail: 'function name(params) {}', doc: 'Funksiya yaratish' },
    { label: 'return', insertText: 'return $0;', kind: 'keyword', detail: 'return value', doc: 'Funksiyadan qiymat qaytarish' },
    { label: 'if', insertText: 'if ($0) {\n  \n}', kind: 'keyword', detail: 'if (condition) {}', doc: 'Shart operatori' },
    { label: 'else', insertText: 'else {\n  $0\n}', kind: 'keyword', detail: 'else {}', doc: 'Aks holda bloki' },
    { label: 'else if', insertText: 'else if ($0) {\n  \n}', kind: 'keyword', detail: 'else if (condition) {}', doc: "Qo'shimcha shart bloki" },
    { label: 'for', insertText: 'for (let i = 0; i < $0; i++) {\n  \n}', kind: 'snippet', detail: 'for (let i = 0; ...)', doc: 'Klassik for takrorlanish sikli' },
    { label: 'for of', insertText: 'for (const item of $0) {\n  \n}', kind: 'snippet', detail: 'for (const item of iterable)', doc: 'Massiv elementlari bo\'ylab sikl' },
    { label: 'while', insertText: 'while ($0) {\n  \n}', kind: 'keyword', detail: 'while (condition) {}', doc: 'Shartli sikl' },
    { label: 'async', insertText: 'async function $0() {\n  \n}', kind: 'keyword', detail: 'async function', doc: 'Asinxron funksiya' },
    { label: 'await', insertText: 'await $0', kind: 'keyword', detail: 'await promise', doc: 'Promiseni kutish' },
    { label: 'try catch', insertText: 'try {\n  $0\n} catch (error) {\n  console.error(error);\n}', kind: 'snippet', detail: 'try { ... } catch (e) { ... }', doc: 'Xatoliklarni tutib olish' },
    { label: 'class', insertText: 'class $0 {\n  constructor() {\n    \n  }\n}', kind: 'snippet', detail: 'class Name { constructor }', doc: 'Sinf (OOP) yaratish' },

    // Array methods
    { label: 'forEach()', insertText: 'forEach(($0) => {\n  \n})', kind: 'method', detail: 'forEach(callback): void', doc: 'Har bir element uchun funksiyani chaqirish' },
    { label: 'map()', insertText: 'map(($0) => {\n  return ;\n})', kind: 'method', detail: 'map(callback): Array', doc: "Elementlarni o'zgartirib yangi massiv qaytarish" },
    { label: 'filter()', insertText: 'filter(($0) => {\n  return ;\n})', kind: 'method', detail: 'filter(predicate): Array', doc: "Shartga mos elementlarni saralab olish" },
    { label: 'reduce()', insertText: 'reduce((acc, curr) => {\n  return acc + curr;\n}, $0)', kind: 'method', detail: 'reduce(callback, initial): any', doc: 'Barcha elementlarni bitta qiymatga jamlash' },
    { label: 'find()', insertText: 'find(($0) => {\n  return ;\n})', kind: 'method', detail: 'find(predicate): any', doc: 'Birinchi mos kelgan elementni topish' },
    { label: 'push()', insertText: 'push($0)', kind: 'method', detail: 'push(...items): number', doc: "Massiv oxiriga element qo'shish" },
    { label: 'pop()', insertText: 'pop()', kind: 'method', detail: 'pop(): any', doc: 'Massiv oxiridan elementni olib tashlash' },
    { label: 'includes()', insertText: 'includes($0)', kind: 'method', detail: 'includes(value): boolean', doc: 'Element mavjudligini tekshirish' },
    { label: 'slice()', insertText: 'slice($0)', kind: 'method', detail: 'slice(start, end): Array', doc: "Massivning qismini ko'chirib olish" },
    { label: 'splice()', insertText: 'splice($0, 1)', kind: 'method', detail: 'splice(start, deleteCount): Array', doc: "Elementlarni o'chirish yoki almashtirish" },
    { label: 'join()', insertText: "join('$0')", kind: 'method', detail: 'join(separator): string', doc: "Massivni satrga aylantirish" },

    // String methods
    { label: 'split()', insertText: "split('$0')", kind: 'method', detail: 'split(separator): string[]', doc: "Satrni massivga bo'lish" },
    { label: 'trim()', insertText: 'trim()', kind: 'method', detail: 'trim(): string', doc: 'Satr bosh va oxiridagi bo\'sh joylarni olib tashlash' },
    { label: 'toLowerCase()', insertText: 'toLowerCase()', kind: 'method', detail: 'toLowerCase(): string', doc: 'Kichik harflarga o\'tkazish' },
    { label: 'toUpperCase()', insertText: 'toUpperCase()', kind: 'method', detail: 'toUpperCase(): string', doc: 'Katta harflarga o\'tkazish' },
    { label: 'replace()', insertText: "replace('$0', '')", kind: 'method', detail: 'replace(search, replace): string', doc: 'Satr qismini almashtirish' },
    { label: 'replaceAll()', insertText: "replaceAll('$0', '')", kind: 'method', detail: 'replaceAll(search, replace): string', doc: 'Barcha mos qismlarni almashtirish' },

    // Objects & JSON
    { label: 'JSON.stringify()', insertText: 'JSON.stringify($0)', kind: 'method', detail: 'stringify(value): string', doc: "Obyektni JSON satriga aylantirish" },
    { label: 'JSON.parse()', insertText: 'JSON.parse($0)', kind: 'method', detail: 'parse(text): any', doc: "JSON satrini obyektga aylantirish" },

    // Timers
    { label: 'setTimeout()', insertText: 'setTimeout(() => {\n  $0\n}, 1000);', kind: 'snippet', detail: 'setTimeout(handler, timeout)', doc: 'Belgilangan vaqtdan so\'ng ishga tushirish' },
    { label: 'setInterval()', insertText: 'setInterval(() => {\n  $0\n}, 1000);', kind: 'snippet', detail: 'setInterval(handler, timeout)', doc: 'Har belgilangan vaqtda takrorlab turish' },

    // Networking
    { label: 'fetch()', insertText: "fetch('$0')\n  .then(res => res.json())\n  .then(data => {\n    console.log(data);\n  });", kind: 'snippet', detail: 'fetch(url).then(...)', doc: 'Serverga tarmoq so\'rovi yuborish' },

    // Math
    { label: 'Math.random()', insertText: 'Math.random()', kind: 'method', detail: 'random(): number', doc: '0 va 1 oralig\'ida tasodifiy son' },
    { label: 'Math.floor()', insertText: 'Math.floor($0)', kind: 'method', detail: 'floor(x: number): number', doc: 'Pastga qarab yaxlitlash' },
    { label: 'Math.round()', insertText: 'Math.round($0)', kind: 'method', detail: 'round(x: number): number', doc: 'Eng yaqin butun songa yaxlitlash' },
    { label: 'Math.ceil()', insertText: 'Math.ceil($0)', kind: 'method', detail: 'ceil(x: number): number', doc: 'Tepaga qarab yaxlitlash' },
    { label: 'Math.max()', insertText: 'Math.max($0)', kind: 'method', detail: 'max(...values): number', doc: 'Katta qiymatni topish' },
    { label: 'Math.min()', insertText: 'Math.min($0)', kind: 'method', detail: 'min(...values): number', doc: 'Kichik qiymatni topish' },

    // Dialogs & Storage
    { label: 'alert()', insertText: "alert('$0');", kind: 'method', detail: 'alert(message: string): void', doc: 'Xabar oynasini chiqarish' },
    { label: 'prompt()', insertText: "prompt('$0');", kind: 'method', detail: 'prompt(message): string', doc: "Foydalanuvchidan matn kiritishni so'rash" },
    { label: 'localStorage.setItem()', insertText: "localStorage.setItem('$0', JSON.stringify());", kind: 'method', detail: 'setItem(key, value): void', doc: 'Brauzer xotirasiga saqlash' },
    { label: 'localStorage.getItem()', insertText: "localStorage.getItem('$0')", kind: 'method', detail: 'getItem(key): string', doc: 'Brauzer xotirasidan olish' },

    // Element properties
    { label: 'innerHTML', insertText: 'innerHTML = `$0`;', kind: 'property', detail: 'innerHTML: string', doc: 'Elementning ichki HTML tarkibi' },
    { label: 'textContent', insertText: "textContent = '$0';", kind: 'property', detail: 'textContent: string', doc: 'Elementning faqat matn tarkibi' },
    { label: 'value', insertText: 'value', kind: 'property', detail: 'value: string', doc: 'Input yoki form qiymati' },
    { label: 'classList.add()', insertText: "classList.add('$0')", kind: 'method', detail: 'classList.add(...tokens)', doc: "CSS klass qo'shish" },
    { label: 'classList.remove()', insertText: "classList.remove('$0')", kind: 'method', detail: 'classList.remove(...tokens)', doc: "CSS klassni olib tashlash" },
    { label: 'classList.toggle()', insertText: "classList.toggle('$0')", kind: 'method', detail: 'classList.toggle(token)', doc: "CSS klassni almashtirib qo'yish (yoqish/o'chirish)" },
    { label: 'style', insertText: 'style.$0 = ;', kind: 'property', detail: 'style: CSSStyleDeclaration', doc: 'Inline CSS uslubini o\'zgartirish' }
  ];

  const HTML_COMPLETIONS = [
    { label: '<div>', insertText: '<div class="$0">\n  \n</div>', kind: 'tag', detail: '<div> blok elementi', doc: 'Universal konteyner bloki' },
    { label: '<button>', insertText: '<button onclick="$0"></button>', kind: 'tag', detail: '<button> tugmasi', doc: 'Bosiladigan interaktiv tugma' },
    { label: '<p>', insertText: '<p>$0</p>', kind: 'tag', detail: '<p> paragraf', doc: 'Matnli abzas' },
    { label: '<span>', insertText: '<span>$0</span>', kind: 'tag', detail: '<span> qator elementi', doc: 'Inline matn konteyneri' },
    { label: '<a>', insertText: '<a href="$0" target="_blank"></a>', kind: 'tag', detail: '<a> havola', doc: 'Boshqa sahifaga havola' },
    { label: '<h1>', insertText: '<h1>$0</h1>', kind: 'tag', detail: '<h1> Bosh sarlavha', doc: '1-darajali asosiy sarlavha' },
    { label: '<h2>', insertText: '<h2>$0</h2>', kind: 'tag', detail: '<h2> 2-darajali sarlavha', doc: 'Bo\'lim sarlavhasi' },
    { label: '<h3>', insertText: '<h3>$0</h3>', kind: 'tag', detail: '<h3> 3-darajali sarlavha', doc: 'Kichik sarlavha' },
    { label: '<input>', insertText: '<input type="text" placeholder="$0" />', kind: 'tag', detail: '<input> kiritish maydoni', doc: 'Matn yoki son kiritish maydoni' },
    { label: '<input:checkbox>', insertText: '<input type="checkbox" id="$0" />', kind: 'tag', detail: 'Checkbox tanlagich', doc: 'Belgilash katagi' },
    { label: '<input:number>', insertText: '<input type="number" min="0" value="$0" />', kind: 'tag', detail: 'Raqam kiritish', doc: 'Son kiritish maydoni' },
    { label: '<img />', insertText: '<img src="$0" alt="Rasm tavsifi" />', kind: 'tag', detail: '<img /> rasm tegi', doc: 'Rasm chiqarish' },
    { label: '<ul>', insertText: '<ul>\n  <li>$0</li>\n</ul>', kind: 'tag', detail: '<ul> tartibsiz ro\'yxat', doc: 'Nuqtali ro\'yxat' },
    { label: '<ol>', insertText: '<ol>\n  <li>$0</li>\n</ol>', kind: 'tag', detail: '<ol> raqamli ro\'yxat', doc: 'Raqamlangan ro\'yxat' },
    { label: '<li>', insertText: '<li>$0</li>', kind: 'tag', detail: '<li> ro\'yxat bandi', doc: 'Ro\'yxat elementi' },
    { label: '<table>', insertText: '<table border="1">\n  <tr>\n    <th>$0</th>\n  </tr>\n  <tr>\n    <td></td>\n  </tr>\n</table>', kind: 'tag', detail: '<table> jadval', doc: 'HTML jadvali' },
    { label: '<form>', insertText: '<form onsubmit="$0; return false;">\n  \n</form>', kind: 'tag', detail: '<form> shakl', doc: "Ma'lumot jo'natish shakli" },
    { label: '<label>', insertText: '<label for="$0"></label>', kind: 'tag', detail: '<label> yorliq', doc: 'Input uchun tushuntirish yorlig\'i' },
    { label: '<select>', insertText: '<select id="$0">\n  <option value="1">1-variant</option>\n</select>', kind: 'tag', detail: '<select> ochiladigan ro\'yxat', doc: 'Tanlov ro\'yxati' },
    { label: '<textarea>', insertText: '<textarea placeholder="$0"></textarea>', kind: 'tag', detail: '<textarea> ko\'p qatorli maydon', doc: 'Katta matn kiritish bloki' },
    { label: '<section>', insertText: '<section class="$0">\n  \n</section>', kind: 'tag', detail: '<section> bo\'lim', doc: 'Mavzuli bo\'lim' },
    { label: '<header>', insertText: '<header>\n  $0\n</header>', kind: 'tag', detail: '<header> bosh qism', doc: 'Sahifa yoki bo\'limning yuqori qismi' },
    { label: '<footer>', insertText: '<footer>\n  $0\n</footer>', kind: 'tag', detail: '<footer> quyi qism', doc: 'Sahifaning pastki qismi' },
    { label: '<style>', insertText: '<style>\n  $0\n</style>', kind: 'tag', detail: '<style> uslub bloki', doc: 'CSS kodlari bloki' },
    { label: '<script>', insertText: '<script>\n  $0\n</script>', kind: 'tag', detail: '<script> JS bloki', doc: 'JavaScript kodi bloki' },

    // Attributes
    { label: 'class=""', insertText: 'class="$0"', kind: 'property', detail: 'class atributi', doc: 'CSS klasslarini biriktirish' },
    { label: 'id=""', insertText: 'id="$0"', kind: 'property', detail: 'id atributi', doc: 'Noyob identifikator' },
    { label: 'style=""', insertText: 'style="$0"', kind: 'property', detail: 'style atributi', doc: 'Inline CSS uslublari' },
    { label: 'onclick=""', insertText: 'onclick="$0"', kind: 'property', detail: 'onclick hodisasi', doc: 'Tugma bosilganda bajariladigan kod' },
    { label: 'placeholder=""', insertText: 'placeholder="$0"', kind: 'property', detail: 'placeholder atributi', doc: 'Kiritish maydonidagi shaffof tushuntirish matni' }
  ];

  const CSS_COMPLETIONS = [
    { label: 'display: flex;', insertText: 'display: flex;\njustify-content: center;\nalign-items: center;', kind: 'snippet', detail: 'Flexbox konteyneri', doc: 'Elementlarni moslashuvchan tartiblash' },
    { label: 'display: grid;', insertText: 'display: grid;\ngrid-template-columns: repeat($0, 1fr);\ngap: 16px;', kind: 'snippet', detail: 'CSS Grid konteyneri', doc: 'Jadval shaklidagi zamonaviy tartib' },
    { label: 'display: block;', insertText: 'display: block;', kind: 'property', detail: 'display', doc: 'Blok element' },
    { label: 'display: none;', insertText: 'display: none;', kind: 'property', detail: 'display', doc: 'Elementni butunlay yashirish' },
    { label: 'justify-content: center;', insertText: 'justify-content: center;', kind: 'property', detail: 'justify-content', doc: "Gorizontal o'rtaga tekislash" },
    { label: 'justify-content: space-between;', insertText: 'justify-content: space-between;', kind: 'property', detail: 'justify-content', doc: 'Chetlarga teng taqsimlash' },
    { label: 'align-items: center;', insertText: 'align-items: center;', kind: 'property', detail: 'align-items', doc: "Vertikal o'rtaga tekislash" },
    { label: 'flex-direction: column;', insertText: 'flex-direction: column;', kind: 'property', detail: 'flex-direction', doc: 'Elementlarni ustun shaklida joylashtirish' },
    { label: 'gap:', insertText: 'gap: $0px;', kind: 'property', detail: 'gap', doc: 'Elementlar orasidagi masofa' },
    { label: 'background:', insertText: 'background: $0;', kind: 'property', detail: 'background', doc: 'Orqa fon rangi yoki gradiyenti' },
    { label: 'background-color:', insertText: 'background-color: $0;', kind: 'property', detail: 'background-color', doc: 'Orqa fon rangi' },
    { label: 'color:', insertText: 'color: $0;', kind: 'property', detail: 'color', doc: 'Matn rangi' },
    { label: 'font-size:', insertText: 'font-size: $0px;', kind: 'property', detail: 'font-size', doc: "Shrift o'lchami" },
    { label: 'font-family:', insertText: "font-family: 'Inter', sans-serif;", kind: 'property', detail: 'font-family', doc: 'Shrift oilasi' },
    { label: 'font-weight: bold;', insertText: 'font-weight: bold;', kind: 'property', detail: 'font-weight', doc: 'Qalin shrift' },
    { label: 'margin:', insertText: 'margin: $0;', kind: 'property', detail: 'margin', doc: 'Tashqi bo\'shliq' },
    { label: 'margin: 0 auto;', insertText: 'margin: 0 auto;', kind: 'property', detail: 'margin', doc: "Gorizontal o'rtaga qo'yish" },
    { label: 'padding:', insertText: 'padding: $0px;', kind: 'property', detail: 'padding', doc: 'Ichki bo\'shliq' },
    { label: 'border:', insertText: 'border: 1px solid $0;', kind: 'property', detail: 'border', doc: 'Hoshiya chizig\'i' },
    { label: 'border-radius:', insertText: 'border-radius: $0px;', kind: 'property', detail: 'border-radius', doc: 'Hoshiya burchaklarini yumaloqlash' },
    { label: 'border-radius: 50%;', insertText: 'border-radius: 50%;', kind: 'property', detail: 'Doira shakli', doc: 'Elementni doira qilish' },
    { label: 'width:', insertText: 'width: $0;', kind: 'property', detail: 'width', doc: "Element kengligi" },
    { label: 'height:', insertText: 'height: $0;', kind: 'property', detail: 'height', doc: "Element balandligi" },
    { label: 'position: relative;', insertText: 'position: relative;', kind: 'property', detail: 'position', doc: "Nisbiy joylashuv" },
    { label: 'position: absolute;', insertText: 'position: absolute;\ntop: $0;\nleft: 0;', kind: 'property', detail: 'position', doc: "Mutlaq joylashuv" },
    { label: 'position: fixed;', insertText: 'position: fixed;\ntop: 0;\nleft: 0;', kind: 'property', detail: 'position', doc: "Ekranga qotirilgan joylashuv" },
    { label: 'cursor: pointer;', insertText: 'cursor: pointer;', kind: 'property', detail: 'cursor', doc: "Kursorni qo'lcha shakliga o'tkazish" },
    { label: 'box-shadow:', insertText: 'box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);', kind: 'property', detail: 'box-shadow', doc: 'Soya effekti' },
    { label: 'transition:', insertText: 'transition: all 0.3s ease;', kind: 'property', detail: 'transition', doc: 'Silliq animatsion o\'tish' },
    { label: 'transform: scale();', insertText: 'transform: scale($0);', kind: 'property', detail: 'transform', doc: "Kattalashtirish yoki kichiklashtirish" },
    { label: 'text-align: center;', insertText: 'text-align: center;', kind: 'property', detail: 'text-align', doc: "Matnni o'rtaga tekislash" },
    { label: 'overflow: hidden;', insertText: 'overflow: hidden;', kind: 'property', detail: 'overflow', doc: "Toshgan qismini yashirish" },
    { label: 'z-index:', insertText: 'z-index: $0;', kind: 'property', detail: 'z-index', doc: 'Qatlam ustunligi' }
  ];

  // ─── 2. KURSOR KOORDINATALARINI ANIQLASH (CARET COORDINATES) ───────
  function getCaretCoordinates(element, position) {
    const properties = [
      'direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY',
      'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth',
      'borderStyle', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
      'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize',
      'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform',
      'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing', 'tabSize', 'MozTabSize'
    ];

    const isFirefox = window.mozInnerScreenX != null;
    const div = document.createElement('div');
    div.id = 'input-textarea-caret-position-mirror-div';
    document.body.appendChild(div);

    const style = div.style;
    const computed = window.getComputedStyle(element);

    style.whiteSpace = 'pre-wrap';
    if (element.nodeName !== 'INPUT') style.wordWrap = 'break-word';

    style.position = 'absolute';
    style.visibility = 'hidden';

    properties.forEach(prop => {
      style[prop] = computed[prop];
    });

    if (isFirefox) {
      if (element.scrollHeight > parseInt(computed.height)) style.overflowY = 'scroll';
    } else {
      style.overflow = 'hidden';
    }

    div.textContent = element.value.substring(0, position);
    const span = document.createElement('span');
    span.textContent = element.value.substring(position) || '.';
    div.appendChild(span);

    const coordinates = {
      top: span.offsetTop + parseInt(computed['borderTopWidth']),
      left: span.offsetLeft + parseInt(computed['borderLeftWidth']),
      height: parseInt(computed['lineHeight']) || 20
    };

    document.body.removeChild(div);
    return coordinates;
  }

  // ─── 3. INTELLISENSE CONTROLLER SINFI ──────────────────────────────
  class VsCodeIntelliSense {
    constructor(textarea, mode = 'js') {
      this.textarea = textarea;
      this.mode = mode; // 'js' | 'html' | 'css'
      this.box = null;
      this.list = null;
      this.currentSuggestions = [];
      this.selectedIndex = 0;
      this.isOpen = false;
      this.currentWord = '';
      this.wordStartPos = 0;

      this.init();
    }

    init() {
      this.createDom();
      this.bindEvents();
    }

    createDom() {
      // Wrapper/Parent nisbiy holatda bo'lishini ta'minlash
      const parent = this.textarea.parentElement;
      if (parent && window.getComputedStyle(parent).position === 'static') {
        parent.style.position = 'relative';
      }

      const box = document.createElement('div');
      box.className = 'vscode-intellisense-box';
      box.style.display = 'none';

      box.innerHTML = `
        <div class="vscode-intellisense-header">
          <span>VS Code IntelliSense</span>
          <span class="vscode-intellisense-mode">${this.mode.toUpperCase()}</span>
        </div>
        <div class="vscode-intellisense-list"></div>
        <div class="vscode-intellisense-footer">
          <span><b>Tab</b> yoki <b>Enter</b>: tanlash</span>
          <span><b>Esc</b>: yopish</span>
        </div>
      `;

      parent.appendChild(box);
      this.box = box;
      this.list = box.querySelector('.vscode-intellisense-list');
    }

    getCompletionsForMode() {
      if (this.mode === 'html') return HTML_COMPLETIONS;
      if (this.mode === 'css') return CSS_COMPLETIONS;
      return JS_COMPLETIONS;
    }

    bindEvents() {
      // 1. Matn kiritilganda takliflarni ko'rsatish
      this.textarea.addEventListener('input', () => {
        this.handleInput();
      });

      // 2. Tugmalar boshqaruvi (Tab, Enter, ArrowUp, ArrowDown, Esc, Qavslar)
      this.textarea.addEventListener('keydown', (e) => {
        this.handleKeyDown(e);
      });

      // 3. Tashqariga bosilganda yopish
      document.addEventListener('click', (e) => {
        if (this.isOpen && !this.box.contains(e.target) && e.target !== this.textarea) {
          this.close();
        }
      });

      // 4. Skroll bo'lganda yopish yoki qayta joylash
      this.textarea.addEventListener('scroll', () => {
        if (this.isOpen) {
          this.reposition();
        }
      });
    }

    handleInput() {
      const cursorPos = this.textarea.selectionStart;
      const textBefore = this.textarea.value.slice(0, cursorPos);

      // Kursor oldidagi joriy so'zni ajratib olish (harflar, raqamlar, nuqta, qavs, chiziqcha, kichik belgi)
      const match = textBefore.match(/([a-zA-Z0-9_\-\.<>:]+)$/);
      if (!match) {
        this.close();
        return;
      }

      const word = match[1];
      this.currentWord = word;
      this.wordStartPos = cursorPos - word.length;

      // Agar so'z 1 tadan kam bo'lsa yopamiz
      if (word.length < 1) {
        this.close();
        return;
      }

      // Takliflarni filtrlash
      const pool = this.getCompletionsForMode();
      const lowerWord = word.toLowerCase();

      const matched = pool.filter(item => {
        const lowerLabel = item.label.toLowerCase();
        return lowerLabel.startsWith(lowerWord) || lowerLabel.includes(lowerWord);
      });

      // Saralash: Boshidan boshlanganlari birinchi
      matched.sort((a, b) => {
        const aStart = a.label.toLowerCase().startsWith(lowerWord);
        const bStart = b.label.toLowerCase().startsWith(lowerWord);
        if (aStart && !bStart) return -1;
        if (!aStart && bStart) return 1;
        return a.label.localeCompare(b.label);
      });

      if (matched.length === 0) {
        this.close();
        return;
      }

      this.currentSuggestions = matched.slice(0, 9);
      this.selectedIndex = 0;
      this.renderList();
      this.open();
      this.reposition();
    }

    handleKeyDown(e) {
      // Agar takliflar oynasi ochiq bo'lsa
      if (this.isOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex + 1) % this.currentSuggestions.length;
          this.updateActiveItem();
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          this.selectedIndex = (this.selectedIndex - 1 + this.currentSuggestions.length) % this.currentSuggestions.length;
          this.updateActiveItem();
          return;
        }

        if (e.key === 'Tab' || e.key === 'Enter') {
          e.preventDefault();
          this.insertSelected();
          return;
        }

        if (e.key === 'Escape') {
          e.preventDefault();
          this.close();
          return;
        }
      }

      // Agar ochiq bo'lmasa, qulay dasturlash imkoniyatlari:
      // 1. Professional Tab bosilganda 2 bo'shliq qo'yish (fokus yo'qolmasligi uchun)
      if (e.key === 'Tab' && !e.shiftKey && !e.ctrlKey) {
        e.preventDefault();
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const val = this.textarea.value;
        this.textarea.value = val.substring(0, start) + '  ' + val.substring(end);
        this.textarea.selectionStart = this.textarea.selectionEnd = start + 2;
        this.textarea.dispatchEvent(new Event('input', { bubbles: true }));
        return;
      }

      // 2. Avtomatik qavslar va tirnoqlarni yopish
      const pairs = {
        '(': ')',
        '{': '}',
        '[': ']',
        '"': '"',
        "'": "'",
        '`': '`'
      };

      if (pairs[e.key]) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const val = this.textarea.value;
        const closing = pairs[e.key];

        // Agar matn belgilangan bo'lsa, uni qavs ichiga oladi
        if (start !== end) {
          e.preventDefault();
          const selectedText = val.substring(start, end);
          this.textarea.value = val.substring(0, start) + e.key + selectedText + closing + val.substring(end);
          this.textarea.selectionStart = start + 1;
          this.textarea.selectionEnd = end + 1;
          this.textarea.dispatchEvent(new Event('input', { bubbles: true }));
          return;
        } else {
          // Oddiy bosilganda qavsni yopib beradi va kursorni o'rtada qoldiradi
          e.preventDefault();
          this.textarea.value = val.substring(0, start) + e.key + closing + val.substring(end);
          this.textarea.selectionStart = this.textarea.selectionEnd = start + 1;
          this.textarea.dispatchEvent(new Event('input', { bubbles: true }));
          return;
        }
      }

      // 3. Agar kursor qavslar o'rtasida bo'lsa va Backspace bosilsa, ikkalasini o'chirish
      if (e.key === 'Backspace') {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        if (start === end && start > 0) {
          const charBefore = this.textarea.value[start - 1];
          const charAfter = this.textarea.value[start];
          if (
            (charBefore === '(' && charAfter === ')') ||
            (charBefore === '{' && charAfter === '}') ||
            (charBefore === '[' && charAfter === ']') ||
            (charBefore === '"' && charAfter === '"') ||
            (charBefore === "'" && charAfter === "'") ||
            (charBefore === '`' && charAfter === '`')
          ) {
            e.preventDefault();
            this.textarea.value = this.textarea.value.substring(0, start - 1) + this.textarea.value.substring(start + 1);
            this.textarea.selectionStart = this.textarea.selectionEnd = start - 1;
            this.textarea.dispatchEvent(new Event('input', { bubbles: true }));
            return;
          }
        }
      }
    }

    renderList() {
      const getIconHtml = (kind) => {
        switch (kind) {
          case 'method': return '<span class="vscode-icon-badge method">ƒ</span>';
          case 'keyword': return '<span class="vscode-icon-badge keyword">K</span>';
          case 'property': return '<span class="vscode-icon-badge property">P</span>';
          case 'snippet': return '<span class="vscode-icon-badge snippet">⚡</span>';
          case 'tag': return '<span class="vscode-icon-badge tag">&lt;&gt;</span>';
          default: return '<span class="vscode-icon-badge default">#</span>';
        }
      };

      this.list.innerHTML = this.currentSuggestions.map((item, idx) => {
        const isActive = (idx === this.selectedIndex);
        return `
          <div class="vscode-intellisense-item ${isActive ? 'active' : ''}" data-index="${idx}">
            <div class="vscode-intellisense-item-main">
              ${getIconHtml(item.kind)}
              <span class="vscode-intellisense-label">${this.escapeHtml(item.label)}</span>
            </div>
            <div class="vscode-intellisense-detail">${this.escapeHtml(item.detail || '')}</div>
          </div>
        `;
      }).join('');

      // Sichqoncha orqali bosilganda joylash
      this.list.querySelectorAll('.vscode-intellisense-item').forEach(el => {
        el.addEventListener('mousedown', (e) => {
          e.preventDefault(); // Fokusni textarea'da saqlab qolish
          const idx = parseInt(el.dataset.index, 10);
          this.selectedIndex = idx;
          this.insertSelected();
        });
      });
    }

    updateActiveItem() {
      const items = this.list.querySelectorAll('.vscode-intellisense-item');
      items.forEach((el, idx) => {
        if (idx === this.selectedIndex) {
          el.classList.add('active');
          el.scrollIntoView({ block: 'nearest' });
        } else {
          el.classList.remove('active');
        }
      });
    }

    reposition() {
      if (!this.isOpen) return;

      const cursorPos = this.textarea.selectionStart;
      const coords = getCaretCoordinates(this.textarea, cursorPos);

      const taRect = this.textarea.getBoundingClientRect();
      const parentRect = this.textarea.parentElement.getBoundingClientRect();

      // Parentga nisbatan koordinatalar
      let top = (taRect.top - parentRect.top) + (coords.top - this.textarea.scrollTop) + coords.height + 4;
      let left = (taRect.left - parentRect.left) + (coords.left - this.textarea.scrollLeft);

      // Chegaralardan chiqib ketmasligini ta'minlash
      const boxWidth = 320;
      const boxHeight = 220;

      if (left + boxWidth > parentRect.width - 10) {
        left = Math.max(10, parentRect.width - boxWidth - 16);
      }

      // Agar pastga sig'masa, kursor tepasida ko'rsatish
      if (top + boxHeight > parentRect.height && top > boxHeight) {
        top = top - boxHeight - coords.height - 8;
      }

      this.box.style.top = Math.max(0, top) + 'px';
      this.box.style.left = Math.max(0, left) + 'px';
    }

    insertSelected() {
      const item = this.currentSuggestions[this.selectedIndex];
      if (!item) return;

      const template = item.insertText;
      const start = this.wordStartPos;
      const end = this.textarea.selectionStart;
      const val = this.textarea.value;

      // Kursor joylashuvi $0 bormi?
      const cursorOffset = template.indexOf('$0');
      const cleanText = template.replace('$0', '');

      const newVal = val.substring(0, start) + cleanText + val.substring(end);
      this.textarea.value = newVal;

      const newCursorPos = (cursorOffset !== -1)
        ? start + cursorOffset
        : start + cleanText.length;

      this.textarea.selectionStart = this.textarea.selectionEnd = newCursorPos;
      this.textarea.focus();

      // O'zgarish hodisasini ishga tushirish (Playground output darhol ko'rinishi uchun)
      this.textarea.dispatchEvent(new Event('input', { bubbles: true }));

      this.close();
    }

    open() {
      this.box.style.display = 'flex';
      this.isOpen = true;
    }

    close() {
      this.box.style.display = 'none';
      this.isOpen = false;
      this.currentSuggestions = [];
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
  }

  // ─── 4. GLOBAL INISTSIYATSIYA VA TIZIMGA ULASH ──────────────────────
  function initCodeEditorIntelliSense() {
    const editors = [
      { id: 'editor-html', mode: 'html' },
      { id: 'editor-css', mode: 'css' },
      { id: 'editor-js', mode: 'js' },
      { id: 'lesson-challenge-code', mode: 'js' }
    ];

    editors.forEach(cfg => {
      const el = document.getElementById(cfg.id);
      if (el && !el._vsIntelliSense) {
        el._vsIntelliSense = new VsCodeIntelliSense(el, cfg.mode);
      }
    });

    console.log('⚡ CodeJS: VS Code IntelliSense va Autocomplete faollashtirildi!');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeEditorIntelliSense);
  } else {
    initCodeEditorIntelliSense();
  }

  window.initCodeEditorIntelliSense = initCodeEditorIntelliSense;
})();

