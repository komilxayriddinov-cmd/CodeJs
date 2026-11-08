/**
 * CodeJS - Professional Editor Tools & AI Assistant
 * - 📦 Tayyor Shablonlar (Calculator, To-do, Digital Clock, Tic-Tac-Toe, 3D Neon Card)
 * - 🤖 AI Kod Tahlilchisi va Xatolarni tuzatuvchi (Syntax, HTML, CSS, JS bugs fixer)
 * - 💾 Loyihalarni saqlash va boshqarish (LocalStorage Projects Manager)
 * - 🔗 Kodni havola (URL) orqali ulashish (Share Code via URL Hash)
 * - ✨ Kodni toza formatlash (Code Beautifier)
 * - 📟 Jonli Interaktiv Konsol (Console logs capture)
 * - ⛶ Katta ekran natijasi (Fullscreen Preview)
 */

const EditorTools = {
  consoleLogs: [],
  lastAnalysis: null,

  // ─── 1. TAYYOR SHABLONLAR (CODE TEMPLATES) ─────────────────────────
  templates: {
    calculator: {
      name: "Neon Kalkulyator",
      desc: "Chiroyli va to'liq ishlaydigan interaktiv kalkulyator",
      html: `<div class="calc-box">
  <div class="calc-screen" id="screen">0</div>
  <div class="calc-grid">
    <button class="btn op" onclick="clearScreen()">C</button>
    <button class="btn op" onclick="deleteChar()">⌫</button>
    <button class="btn op" onclick="appendOp('/')">÷</button>
    <button class="btn op" onclick="appendOp('*')">×</button>
    
    <button class="btn" onclick="appendNum('7')">7</button>
    <button class="btn" onclick="appendNum('8')">8</button>
    <button class="btn" onclick="appendNum('9')">9</button>
    <button class="btn op" onclick="appendOp('-')">-</button>
    
    <button class="btn" onclick="appendNum('4')">4</button>
    <button class="btn" onclick="appendNum('5')">5</button>
    <button class="btn" onclick="appendNum('6')">6</button>
    <button class="btn op" onclick="appendOp('+')">+</button>
    
    <button class="btn" onclick="appendNum('1')">1</button>
    <button class="btn" onclick="appendNum('2')">2</button>
    <button class="btn" onclick="appendNum('3')">3</button>
    <button class="btn eq" onclick="calculate()">=</button>
    
    <button class="btn zero" onclick="appendNum('0')">0</button>
    <button class="btn" onclick="appendNum('.')">.</button>
  </div>
</div>`,
      css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0e1a;
  font-family: 'Segoe UI', sans-serif;
}

.calc-box {
  background: #141a2e;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 212, 255, 0.2);
  border: 1px solid rgba(0, 212, 255, 0.3);
  width: 290px;
}

.calc-screen {
  background: #0a0e1a;
  color: #00d4ff;
  font-size: 32px;
  font-family: monospace;
  text-align: right;
  padding: 16px 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  border: 1px solid rgba(0, 212, 255, 0.2);
  overflow-x: auto;
  min-height: 40px;
}

.calc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.btn {
  background: #1e2846;
  border: none;
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  padding: 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn:hover {
  background: #2a375e;
  transform: translateY(-2px);
}

.btn:active {
  transform: translateY(0);
}

.btn.op {
  background: #2563eb;
  color: #fff;
}

.btn.op:hover {
  background: #1d4ed8;
}

.btn.eq {
  background: #00d4ff;
  color: #0a0e1a;
  font-weight: 800;
  grid-row: span 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn.eq:hover {
  background: #38bdf8;
  box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
}

.btn.zero {
  grid-column: span 2;
}`,
      js: `let currentExpr = '0';

function updateScreen() {
  document.getElementById('screen').textContent = currentExpr;
}

function appendNum(num) {
  if (currentExpr === '0' && num !== '.') {
    currentExpr = num;
  } else {
    currentExpr += num;
  }
  updateScreen();
}

function appendOp(op) {
  const lastChar = currentExpr.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    currentExpr = currentExpr.slice(0, -1) + op;
  } else {
    currentExpr += op;
  }
  updateScreen();
}

function clearScreen() {
  currentExpr = '0';
  updateScreen();
}

function deleteChar() {
  if (currentExpr.length <= 1) {
    currentExpr = '0';
  } else {
    currentExpr = currentExpr.slice(0, -1);
  }
  updateScreen();
}

function calculate() {
  try {
    currentExpr = String(Function('"use strict";return (' + currentExpr + ')')());
    console.log("Natija hisoblandi:", currentExpr);
  } catch (e) {
    currentExpr = 'Xatolik';
    console.error("Hisoblash xatosi:", e.message);
  }
  updateScreen();
}`
    },

    todo: {
      name: "To-Do List (Vazifalar)",
      desc: "Vazifa qo'shish, bajarilgan deb belgilash va o'chirish",
      html: `<div class="todo-app">
  <h2>📝 Mening Vazifalarim</h2>
  <div class="todo-input-row">
    <input type="text" id="todoInput" placeholder="Yangi vazifa yozing..." />
    <button onclick="addTodo()">Qo'shish</button>
  </div>
  <ul class="todo-list" id="todoList"></ul>
  <div class="todo-footer" id="todoCount">Vazifalar soni: 0</div>
</div>`,
      css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0e1a;
  font-family: 'Segoe UI', sans-serif;
  color: #fff;
}

.todo-app {
  background: #141a2e;
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 18px;
  padding: 28px;
  width: 360px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

h2 {
  margin-top: 0;
  text-align: center;
  color: #00d4ff;
  font-size: 22px;
}

.todo-input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  background: #0a0e1a;
  border: 1px solid rgba(0, 212, 255, 0.3);
  color: #fff;
  padding: 10px 14px;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
}

input:focus {
  border-color: #00d4ff;
  box-shadow: 0 0 10px rgba(0, 212, 255, 0.2);
}

button {
  background: #00d4ff;
  color: #0a0e1a;
  border: none;
  font-weight: 700;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 240px;
  overflow-y: auto;
}

.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1e2846;
  padding: 10px 14px;
  border-radius: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.todo-item.done span {
  text-decoration: line-through;
  opacity: 0.5;
}

.delete-btn {
  background: none;
  color: #f87171;
  font-size: 16px;
  padding: 0 4px;
  cursor: pointer;
}

.todo-footer {
  margin-top: 14px;
  text-align: right;
  font-size: 12px;
  color: #94a3b8;
}`,
      js: `let tasks = [
  { text: "HTML & CSS o'rganish", done: true },
  { text: "CodeJS da o'yin o'ynash", done: false }
];

function renderTasks() {
  const list = document.getElementById('todoList');
  list.innerHTML = '';
  tasks.forEach((t, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (t.done ? ' done' : '');
    li.innerHTML = \`
      <span onclick="toggleTask(\${index})">\${t.text}</span>
      <button class="delete-btn" onclick="deleteTask(\${index})">✕</button>
    \`;
    list.appendChild(li);
  });
  document.getElementById('todoCount').textContent = "Vazifalar soni: " + tasks.length;
}

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (text) {
    tasks.push({ text: text, done: false });
    input.value = '';
    renderTasks();
    console.log("Yangi vazifa qo'shildi:", text);
  }
}

function toggleTask(i) {
  tasks[i].done = !tasks[i].done;
  renderTasks();
}

function deleteTask(i) {
  const removed = tasks.splice(i, 1);
  renderTasks();
  console.log("O'chirildi:", removed[0].text);
}

renderTasks();`
    },

    clock: {
      name: "Raqamli Neon Soat",
      desc: "Real-vaqtda soniyalari bilan aylanuvchi zamonaviy soat",
      html: `<div class="clock-card">
  <div class="clock-title">O'ZBEKISTON VAQTI</div>
  <div class="clock-display" id="clockDisplay">00:00:00</div>
  <div class="clock-date" id="dateDisplay">Dushanba, 8-Noyabr</div>
</div>`,
      css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0e1a;
  font-family: 'Segoe UI', sans-serif;
}

.clock-card {
  background: #141a2e;
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 40px 60px;
  border-radius: 24px;
  text-align: center;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 212, 255, 0.2);
}

.clock-title {
  font-size: 13px;
  letter-spacing: 3px;
  color: #94a3b8;
  font-weight: 700;
  margin-bottom: 12px;
}

.clock-display {
  font-size: 56px;
  font-weight: 900;
  font-family: monospace;
  color: #00d4ff;
  text-shadow: 0 0 20px rgba(0, 212, 255, 0.6);
  margin-bottom: 8px;
}

.clock-date {
  color: #cbd5e1;
  font-size: 15px;
  font-weight: 500;
}`,
      js: `function updateClock() {
  const now = new Date();
  
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  
  document.getElementById('clockDisplay').textContent = \`\${h}:\${m}:\${s}\`;
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dateDisplay').textContent = now.toLocaleDateString('uz-UZ', options);
}

setInterval(updateClock, 1000);
updateClock();
console.log("Soat ishga tushirildi ⏰");`
    },

    tictactoe: {
      name: "X va O O'yini (Tic-Tac-Toe)",
      desc: "2 kishilik klassik strategik o'yin",
      html: `<div class="game-box">
  <h2>X va O O'yini</h2>
  <div class="turn-status" id="status">Navbat: <span style="color:#00d4ff;">X</span></div>
  <div class="board" id="board">
    <div class="cell" onclick="makeMove(0)"></div>
    <div class="cell" onclick="makeMove(1)"></div>
    <div class="cell" onclick="makeMove(2)"></div>
    <div class="cell" onclick="makeMove(3)"></div>
    <div class="cell" onclick="makeMove(4)"></div>
    <div class="cell" onclick="makeMove(5)"></div>
    <div class="cell" onclick="makeMove(6)"></div>
    <div class="cell" onclick="makeMove(7)"></div>
    <div class="cell" onclick="makeMove(8)"></div>
  </div>
  <button class="restart-btn" onclick="restartGame()">Qayta boshlash</button>
</div>`,
      css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0e1a;
  font-family: 'Segoe UI', sans-serif;
  color: #fff;
}

.game-box {
  background: #141a2e;
  border: 1px solid rgba(0, 212, 255, 0.25);
  border-radius: 20px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

h2 { margin-top: 0; color: #00d4ff; }
.turn-status { font-size: 16px; margin-bottom: 20px; font-weight: 700; }

.board {
  display: grid;
  grid-template-columns: repeat(3, 90px);
  grid-template-rows: repeat(3, 90px);
  gap: 10px;
  margin: 0 auto 20px auto;
}

.cell {
  background: #1e2846;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.2s;
}

.cell:hover { background: #29375e; transform: scale(1.05); }
.cell.x { color: #00d4ff; }
.cell.o { color: #f43f5e; }

.restart-btn {
  background: #00d4ff;
  color: #0a0e1a;
  border: none;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 8px;
  cursor: pointer;
}`,
      js: `let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

function makeMove(idx) {
  if (board[idx] || gameOver) return;
  board[idx] = currentPlayer;
  
  const cells = document.querySelectorAll('.cell');
  cells[idx].textContent = currentPlayer;
  cells[idx].classList.add(currentPlayer.toLowerCase());
  
  if (checkWinner()) {
    document.getElementById('status').innerHTML = \`🏆 G'olib: <span style="color:#22c55e;">\${currentPlayer}</span>!\`;
    gameOver = true;
    console.log("O'yin yakunlandi, g'olib:", currentPlayer);
    return;
  }
  
  if (!board.includes('')) {
    document.getElementById('status').textContent = "Durang! 🤝";
    gameOver = true;
    return;
  }
  
  currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
  const color = (currentPlayer === 'X') ? '#00d4ff' : '#f43f5e';
  document.getElementById('status').innerHTML = \`Navbat: <span style="color:\${color};">\${currentPlayer}</span>\`;
}

function checkWinner() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return wins.some(([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]);
}

function restartGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  gameOver = false;
  document.querySelectorAll('.cell').forEach(c => {
    c.textContent = '';
    c.className = 'cell';
  });
  document.getElementById('status').innerHTML = \`Navbat: <span style="color:#00d4ff;">X</span>\`;
}`
    },

    neoncard: {
      name: "3D Neon Karta",
      desc: "Zamonaviy CSS va JS 3D perspektivali karta effekti",
      html: `<div class="card-container" id="cardContainer">
  <div class="neon-card" id="card">
    <div class="badge">PRO DASTURCHI</div>
    <h1>CodeJS Student</h1>
    <p>JavaScript, HTML & CSS bo'yicha professional ta'lim platformasi.</p>
    <div class="stats-row">
      <div><b>150+</b><span>Dars</span></div>
      <div><b>99%</b><span>Natija</span></div>
      <div><b>Level 5</b><span>Daraja</span></div>
    </div>
  </div>
</div>`,
      css: `body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0a0e1a;
  font-family: 'Segoe UI', sans-serif;
  perspective: 1000px;
}

.neon-card {
  width: 320px;
  background: #141a2e;
  border-radius: 20px;
  padding: 32px;
  color: #fff;
  border: 1px solid rgba(0, 212, 255, 0.3);
  box-shadow: 0 20px 50px rgba(0,0,0,0.6), 0 0 25px rgba(0, 212, 255, 0.2);
  transition: transform 0.1s ease, box-shadow 0.2s ease;
  transform-style: preserve-3d;
}

.badge {
  display: inline-block;
  background: rgba(0, 212, 255, 0.15);
  color: #00d4ff;
  border: 1px solid rgba(0, 212, 255, 0.3);
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  margin-bottom: 16px;
}

h1 { margin: 0 0 10px 0; color: #fff; font-size: 24px; }
p { color: #94a3b8; font-size: 14px; line-height: 1.5; margin-bottom: 24px; }

.stats-row {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255,255,255,0.08);
  padding-top: 16px;
}

.stats-row div { text-align: center; }
.stats-row b { display: block; font-size: 18px; color: #00d4ff; }
.stats-row span { font-size: 12px; color: #94a3b8; }`,
      js: `const card = document.getElementById('card');

window.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const cardX = rect.left + rect.width / 2;
  const cardY = rect.top + rect.height / 2;
  
  const angleX = (e.clientY - cardY) / 12;
  const angleY = (cardX - e.clientX) / 12;
  
  card.style.transform = \`rotateX(\${angleX}deg) rotateY(\${angleY}deg)\`;
});

window.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

console.log("3D Neon karta faol!");`
    }
  },

  toggleTemplatesMenu() {
    const menu = document.getElementById('editor-templates-menu');
    if (!menu) return;
    menu.style.display = (menu.style.display === 'none' || !menu.style.display) ? 'block' : 'none';
  },

  loadTemplate(key) {
    const tmpl = this.templates[key];
    if (!tmpl) return;

    const htmlEl = document.getElementById('editor-html');
    const cssEl = document.getElementById('editor-css');
    const jsEl = document.getElementById('editor-js');

    if (htmlEl) htmlEl.value = tmpl.html;
    if (cssEl) cssEl.value = tmpl.css;
    if (jsEl) jsEl.value = tmpl.js;

    const menu = document.getElementById('editor-templates-menu');
    if (menu) menu.style.display = 'none';

    if (typeof runPlayground === 'function') {
      runPlayground();
    }
    if (typeof showToast === 'function') {
      showToast(`📦 "${tmpl.name}" shabloni yuklandi!`);
    }
  },

  // ─── 2. AI KOD TAHLILI VA XATOLARNI TUZATUVCHI ─────────────────────
  analyzeCode() {
    const htmlCode = document.getElementById('editor-html')?.value || '';
    const cssCode = document.getElementById('editor-css')?.value || '';
    const jsCode = document.getElementById('editor-js')?.value || '';

    const issues = [];
    let fixedHtml = htmlCode;
    let fixedCss = cssCode;
    let fixedJs = jsCode;

    // 1. HTML tahlili
    const pairedTags = ['div', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'button', 'ul', 'ol', 'li', 'a', 'b', 'strong', 'section'];
    pairedTags.forEach(tag => {
      const openMatches = htmlCode.match(new RegExp(`<${tag}(\\s[^>]*)?>`, 'gi')) || [];
      const closeMatches = htmlCode.match(new RegExp(`</${tag}>`, 'gi')) || [];
      if (openMatches.length > closeMatches.length) {
        const diff = openMatches.length - closeMatches.length;
        issues.push({
          lang: 'HTML',
          type: 'error',
          title: `Yopilmagan <${tag}> tegi`,
          desc: `Kodingizda ${openMatches.length} ta <${tag}> ochilgan, lekin faqat ${closeMatches.length} tasi yopilgan (${diff} ta </${tag}> yetishmayapti).`,
          advice: `Kodingiz oxiriga yoki kerakli blokdan keyin </${tag}> qo'shing.`
        });
        fixedHtml += `\n` + `</${tag}>`.repeat(diff);
      }
    });

    if (/<img(?![^>]*\bsrc=)[^>]*>/i.test(htmlCode)) {
      issues.push({
        lang: 'HTML',
        type: 'warning',
        title: "<img> tegi 'src' atributisiz",
        desc: "Rasm ko'rsatilishi uchun <img> tegida 'src' manzili bo'lishi shart.",
        advice: '<img src="rasm_manzili.jpg" alt="Rasm" /> ko\'rinishida yozing.'
      });
    }

    if (/\bcalss=/i.test(htmlCode)) {
      issues.push({
        lang: 'HTML',
        type: 'error',
        title: "Imloviy xato: 'calss' o'rniga 'class'",
        desc: "'calss' deb yozilgan, brauzer buni taniy olmaydi.",
        advice: "'class' deb to'g'irlang."
      });
      fixedHtml = fixedHtml.replace(/\bcalss=/gi, 'class=');
    }

    // 2. CSS tahlili
    const openBraces = (cssCode.match(/{/g) || []).length;
    const closeBraces = (cssCode.match(/}/g) || []).length;
    if (openBraces !== closeBraces) {
      issues.push({
        lang: 'CSS',
        type: 'error',
        title: "Qavslar mos kelmadi ({})",
        desc: `CSS da ${openBraces} ta '{' ochilgan, lekin ${closeBraces} ta '}' yopilgan.`,
        advice: "Har bir CSS selektor blokida ochilgan { va yopilgan } qavslarni tekshiring."
      });
      if (openBraces > closeBraces) {
        fixedCss += `\n` + `}`.repeat(openBraces - closeBraces);
      }
    }

    const cssTypoMap = [
      { wrong: /\bcolr\s*:/gi, right: 'color:', name: 'colr -> color' },
      { wrong: /\bwidht\s*:/gi, right: 'width:', name: 'widht -> width' },
      { wrong: /\bheigth\s*:/gi, right: 'height:', name: 'heigth -> height' },
      { wrong: /\bbackgorund\s*:/gi, right: 'background:', name: 'backgorund -> background' }
    ];
    cssTypoMap.forEach(item => {
      if (item.wrong.test(cssCode)) {
        issues.push({
          lang: 'CSS',
          type: 'warning',
          title: `Noto'g'ri xususiyat: ${item.name}`,
          desc: `CSS xususiyati xato yozilgan.`,
          advice: `Uni to'g'ri shaklga o'zgartiring.`
        });
        fixedCss = fixedCss.replace(item.wrong, item.right);
      }
    });

    // 3. JS tahlili
    try {
      new Function(jsCode);
    } catch (err) {
      issues.push({
        lang: 'JavaScript',
        type: 'error',
        title: "Sintaksis xatosi (SyntaxError)",
        desc: err.message,
        advice: "Koddagi nuqtali vergullar, qavslar yoki kalit so'zlarni qayta tekshiring."
      });
    }

    if (/\bcosnole\./g.test(jsCode)) {
      issues.push({
        lang: 'JavaScript',
        type: 'error',
        title: "Imloviy xato: 'cosnole' o'rniga 'console'",
        desc: "'cosnole.log' deb yozilgan, natijada 'cosnole is not defined' xatosi chiqadi.",
        advice: "'console.log' deb to'g'irlang."
      });
      fixedJs = fixedJs.replace(/\bcosnole\./g, 'console.');
    }

    if (/\bdocumnet\./g.test(jsCode)) {
      issues.push({
        lang: 'JavaScript',
        type: 'error',
        title: "Imloviy xato: 'documnet' o'rniga 'document'",
        desc: "'documnet' so'zi xato yozilgan.",
        advice: "'document' deb to'g'irlang."
      });
      fixedJs = fixedJs.replace(/\bdocumnet\./g, 'document.');
    }

    if (/\bgetelementbyid\(/g.test(jsCode)) {
      issues.push({
        lang: 'JavaScript',
        type: 'warning',
        title: "Katta-kichik harf xatosi: getElementById",
        desc: "JavaScript registrga sezgir (case-sensitive) hisoblanadi.",
        advice: "document.getElementById() ko'rinishida katta 'E', 'B', 'I' harflari bilan yozing."
      });
      fixedJs = fixedJs.replace(/\bgetelementbyid\(/g, 'getElementById(');
    }

    if (/\bif\s*\([^=!<>]=[^=]/g.test(jsCode)) {
      issues.push({
        lang: 'JavaScript',
        type: 'warning',
        title: "Shart ichida tenglashtirish operatori (=)",
        desc: "if (a = b) qiymatni o'zlashtiradi, tekshirish uchun esa '===' yoki '==' ishlatiladi.",
        advice: "Taqqoslash uchun '===' yoki '==' dan foydalaning."
      });
    }

    this.lastAnalysis = {
      issues,
      fixedHtml,
      fixedCss,
      fixedJs
    };

    this.showAnalysisModal(issues);
  },

  showAnalysisModal(issues) {
    let modal = document.getElementById('editor-ai-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'editor-ai-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const hasErrors = issues.length > 0;

    let contentHtml = '';
    if (!hasErrors) {
      contentHtml = `
        <div style="text-align:center; padding:20px 10px;">
          <div style="font-size:56px; margin-bottom:12px;">🎉</div>
          <h3 style="color:#22c55e; font-size:22px; margin-bottom:8px;">Kodingiz toza va xatosiz!</h3>
          <p style="color:#94a3b8; font-size:14px; max-width:440px; margin:0 auto 20px auto; line-height:1.6;">
            AI tahlilchi HTML teglari, CSS xususiyatlari va JavaScript sintaksisini to'liq tekshirib chiqdi. Hech qanday xatolik topilmadi.
          </p>
          <button class="btn btn-primary" onclick="EditorTools.closeAnalysisModal()" style="background:#00d4ff; color:#0a0e1a; font-weight:700;">
            Ajoyib, tushundim! 👍
          </button>
        </div>
      `;
    } else {
      const itemsHtml = issues.map((iss, i) => `
        <div style="background:#141a2e; border:1px solid ${iss.type === 'error' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(251, 191, 36, 0.4)'}; border-radius:10px; padding:14px; margin-bottom:10px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <span style="font-weight:700; color:${iss.type === 'error' ? '#ef4444' : '#fbbf24'}; font-size:15px;">
              ${iss.type === 'error' ? '❌' : '⚠️'} ${iss.title}
            </span>
            <span style="font-size:11px; background:rgba(0, 212, 255, 0.15); color:#00d4ff; padding:2px 8px; border-radius:100px; font-weight:700;">
              ${iss.lang}
            </span>
          </div>
          <div style="font-size:13px; color:#cbd5e1; margin-bottom:6px; line-height:1.4;">${iss.desc}</div>
          <div style="font-size:12px; color:#94a3b8; background:rgba(0,0,0,0.25); padding:6px 10px; border-radius:6px;">
            💡 <b>Maslahat:</b> ${iss.advice}
          </div>
        </div>
      `).join('');

      contentHtml = `
        <div style="padding:10px 0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div style="font-size:18px; font-weight:800; color:#00d4ff; display:flex; align-items:center; gap:8px;">
              <span>🤖</span> AI Kod Tahlilchisi
            </div>
            <span style="font-size:12px; background:rgba(239, 68, 68, 0.2); color:#f87171; padding:3px 10px; border-radius:100px; font-weight:700;">
              ${issues.length} ta xatolik topildi
            </span>
          </div>

          <div style="max-height:360px; overflow-y:auto; margin-bottom:16px; padding-right:4px;">
            ${itemsHtml}
          </div>

          <div style="display:flex; gap:10px; justify-content:flex-end;">
            <button class="btn btn-secondary" onclick="EditorTools.closeAnalysisModal()">Yopish</button>
            <button class="btn btn-primary" onclick="EditorTools.applyFixedCode()" style="background:#00d4ff; color:#0a0e1a; font-weight:700;">
              🪄 Xatolarni avtomatik to'g'rilash
            </button>
          </div>
        </div>
      `;
    }

    modal.innerHTML = `
      <div class="modal" style="max-width:540px; background:#0f1424; border:1px solid rgba(0, 212, 255, 0.3);">
        <button class="modal-close" onclick="EditorTools.closeAnalysisModal()">✕</button>
        ${contentHtml}
      </div>
    `;

    modal.style.display = 'flex';
  },

  closeAnalysisModal() {
    const modal = document.getElementById('editor-ai-modal');
    if (modal) modal.style.display = 'none';
  },

  applyFixedCode() {
    if (!this.lastAnalysis) return;
    const { fixedHtml, fixedCss, fixedJs } = this.lastAnalysis;

    const htmlEl = document.getElementById('editor-html');
    const cssEl = document.getElementById('editor-css');
    const jsEl = document.getElementById('editor-js');

    if (htmlEl) htmlEl.value = fixedHtml;
    if (cssEl) cssEl.value = fixedCss;
    if (jsEl) jsEl.value = fixedJs;

    this.closeAnalysisModal();
    if (typeof runPlayground === 'function') {
      runPlayground();
    }
    if (typeof showToast === 'function') {
      showToast("🪄 Xatoliklar avtomatik to'g'rilandi va ishga tushirildi!");
    }
  },

  // ─── 3. KODNI FORMATLASH (CODE BEAUTIFIER) ─────────────────────────
  formatCode() {
    const activeTab = window.activeTab || 'html';
    const textarea = document.getElementById('editor-' + activeTab);
    if (!textarea) return;

    let code = textarea.value;

    if (activeTab === 'html') {
      code = this.formatHtml(code);
    } else if (activeTab === 'css') {
      code = this.formatCss(code);
    } else if (activeTab === 'js') {
      code = this.formatJs(code);
    }

    textarea.value = code;
    if (typeof showToast === 'function') {
      showToast(`✨ ${activeTab.toUpperCase()} kodi formatlandi!`);
    }
  },

  formatHtml(html) {
    let formatted = '';
    let indent = 0;
    const tokens = html.replace(/>\s*</g, '><').split(/(?=<)|(?<=>)/);

    tokens.forEach(token => {
      if (!token.trim()) return;
      if (token.startsWith('</')) {
        indent = Math.max(0, indent - 1);
        formatted += '  '.repeat(indent) + token.trim() + '\n';
      } else if (token.startsWith('<') && !token.startsWith('<!') && !token.endsWith('/>')) {
        const isSelfClosing = /<(img|input|br|hr|meta|link)/i.test(token);
        formatted += '  '.repeat(indent) + token.trim() + '\n';
        if (!isSelfClosing) indent++;
      } else {
        formatted += '  '.repeat(indent) + token.trim() + '\n';
      }
    });

    return formatted.trim();
  },

  formatCss(css) {
    return css
      .replace(/\s*{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*}\s*/g, '\n}\n\n')
      .replace(/\n\s*\n\s*\n/g, '\n\n')
      .trim();
  },

  formatJs(js) {
    return js
      .replace(/{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n')
      .replace(/}\s*/g, '\n}\n')
      .trim();
  },

  // ─── 4. LOYIHALARNI SAQLASH VA BOSHQARISH (PROJECTS MANAGER) ───────
  getSavedProjects() {
    try {
      return JSON.parse(localStorage.getItem('codejs_saved_projects') || '[]');
    } catch (e) {
      return [];
    }
  },

  saveCurrentProject() {
    const name = prompt("Loyihangiz nomini kiriting:", "Mening Loyiham");
    if (!name || !name.trim()) return;

    const htmlCode = document.getElementById('editor-html')?.value || '';
    const cssCode = document.getElementById('editor-css')?.value || '';
    const jsCode = document.getElementById('editor-js')?.value || '';

    const projects = this.getSavedProjects();
    const newProj = {
      id: 'proj_' + Date.now(),
      name: name.trim(),
      html: htmlCode,
      css: cssCode,
      js: jsCode,
      updatedAt: new Date().toLocaleDateString('uz-UZ')
    };

    projects.unshift(newProj);
    localStorage.setItem('codejs_saved_projects', JSON.stringify(projects));

    if (typeof showToast === 'function') {
      showToast(`💾 "${newProj.name}" muvaffaqiyatli saqlandi!`);
    }
    this.openProjectsModal();
  },

  openProjectsModal() {
    let modal = document.getElementById('editor-projects-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'editor-projects-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    const projects = this.getSavedProjects();

    const listHtml = projects.length === 0 
      ? `<div style="text-align:center; padding:30px; color:#94a3b8;">Hozircha saqlangan loyihalar yo'q. "Joriy kodni saqlash" tugmasini bosing!</div>`
      : projects.map(p => `
        <div style="display:flex; justify-content:space-between; align-items:center; background:#141a2e; border:1px solid rgba(0,212,255,0.18); border-radius:10px; padding:12px 16px; margin-bottom:8px;">
          <div>
            <div style="font-weight:700; color:#fff; font-size:15px;">${p.name}</div>
            <div style="font-size:12px; color:#94a3b8;">Sana: ${p.updatedAt}</div>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-secondary" onclick="EditorTools.loadProject('${p.id}')" style="padding:6px 12px; font-size:12px; background:rgba(0,212,255,0.15); color:#00d4ff; border-color:#00d4ff;">
              Yuklash 📂
            </button>
            <button class="btn btn-secondary" onclick="EditorTools.deleteProject('${p.id}')" style="padding:6px 10px; font-size:12px; color:#f87171; border-color:rgba(239,68,68,0.3);">
              ✕
            </button>
          </div>
        </div>
      `).join('');

    modal.innerHTML = `
      <div class="modal" style="max-width:500px; background:#0f1424; border:1px solid rgba(0, 212, 255, 0.3);">
        <button class="modal-close" onclick="EditorTools.closeProjectsModal()">✕</button>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px;">
          <h3 style="margin:0; color:#00d4ff; font-size:20px;">📁 Mening Saqlangan Loyihalarim</h3>
        </div>

        <div style="max-height:300px; overflow-y:auto; margin-bottom:18px;">
          ${listHtml}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button class="btn btn-primary" onclick="EditorTools.saveCurrentProject()" style="background:#00d4ff; color:#0a0e1a; font-weight:700;">
            💾 Joriy kodni saqlash
          </button>
          <button class="btn btn-secondary" onclick="EditorTools.closeProjectsModal()">Yopish</button>
        </div>
      </div>
    `;

    modal.style.display = 'flex';
  },

  closeProjectsModal() {
    const modal = document.getElementById('editor-projects-modal');
    if (modal) modal.style.display = 'none';
  },

  loadProject(id) {
    const projects = this.getSavedProjects();
    const proj = projects.find(p => p.id === id);
    if (!proj) return;

    const htmlEl = document.getElementById('editor-html');
    const cssEl = document.getElementById('editor-css');
    const jsEl = document.getElementById('editor-js');

    if (htmlEl) htmlEl.value = proj.html;
    if (cssEl) cssEl.value = proj.css;
    if (jsEl) jsEl.value = proj.js;

    this.closeProjectsModal();
    if (typeof runPlayground === 'function') {
      runPlayground();
    }
    if (typeof showToast === 'function') {
      showToast(`📂 "${proj.name}" loyihasi ochildi!`);
    }
  },

  deleteProject(id) {
    if (!confirm("Haqiqatan ham bu loyihani o'chirmoqchimisiz?")) return;
    let projects = this.getSavedProjects();
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('codejs_saved_projects', JSON.stringify(projects));
    this.openProjectsModal();
    if (typeof showToast === 'function') {
      showToast("🗑️ Loyiha o'chirildi.");
    }
  },

  // ─── 5. KODNI HAVOLA (URL) ORQALI ULASHISH (SHARE VIA LINK) ────────
  shareCode() {
    const htmlCode = document.getElementById('editor-html')?.value || '';
    const cssCode = document.getElementById('editor-css')?.value || '';
    const jsCode = document.getElementById('editor-js')?.value || '';

    const payload = JSON.stringify({ h: htmlCode, c: cssCode, j: jsCode });
    const encoded = encodeURIComponent(btoa(unescape(encodeURIComponent(payload))));

    const shareUrl = window.location.origin + window.location.pathname + '#code=' + encoded;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        if (typeof showToast === 'function') {
          showToast("🔗 Havola nusxalandi! Do'stlaringizga yuboring.");
        } else {
          alert("Havola nusxalandi:\n" + shareUrl);
        }
      }).catch(() => {
        prompt("Kodingiz havolasi:", shareUrl);
      });
    } else {
      prompt("Kodingiz havolasi:", shareUrl);
    }
  },

  checkUrlSharedCode() {
    if (!window.location.hash.startsWith('#code=')) return;
    try {
      const raw = window.location.hash.slice(6);
      const decoded = decodeURIComponent(escape(atob(decodeURIComponent(raw))));
      const data = JSON.parse(decoded);

      if (data && (data.h !== undefined || data.c !== undefined || data.j !== undefined)) {
        const htmlEl = document.getElementById('editor-html');
        const cssEl = document.getElementById('editor-css');
        const jsEl = document.getElementById('editor-js');

        if (htmlEl && data.h !== undefined) htmlEl.value = data.h;
        if (cssEl && data.c !== undefined) cssEl.value = data.c;
        if (jsEl && data.j !== undefined) jsEl.value = data.j;

        setTimeout(() => {
          if (typeof runPlayground === 'function') runPlayground();
          const target = document.getElementById('muharrir');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
          if (typeof showToast === 'function') {
            showToast("🔗 Havoladagi kod muvaffaqiyatli yuklandi!");
          }
        }, 600);
      }
    } catch (e) {
      console.warn("Shared code URL parse failed:", e);
    }
  },

  // ─── 6. INTERAKTIV KONSOL DRAYVERI (CONSOLE LOG VIEWER) ────────────
  toggleConsole() {
    const drawer = document.getElementById('editor-console-drawer');
    const btn = document.getElementById('editor-console-btn');
    if (!drawer) return;

    const isOpen = (drawer.style.display === 'block');
    drawer.style.display = isOpen ? 'none' : 'block';
    if (btn) btn.classList.toggle('active', !isOpen);
  },

  clearConsole() {
    this.consoleLogs = [];
    const container = document.getElementById('editor-console-logs');
    if (container) {
      container.innerHTML = `<div class="editor-console-empty">Konsol tozalandi</div>`;
    }
  },

  addConsoleLog(type, text) {
    this.consoleLogs.push({ type, text, time: new Date().toLocaleTimeString() });
    const container = document.getElementById('editor-console-logs');
    if (!container) return;

    if (this.consoleLogs.length === 1) {
      container.innerHTML = '';
    }

    const item = document.createElement('div');
    item.className = `editor-log-line log-${type}`;
    item.innerHTML = `<span class="time">${new Date().toLocaleTimeString()}</span> <span class="content">${this.escapeHtml(text)}</span>`;
    container.appendChild(item);
    container.scrollTop = container.scrollHeight;
  },

  escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, m => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[m]);
  },

  // ─── 7. BUTUN EKRANDA KO'RISH (FULLSCREEN PREVIEW) ──────────────────
  openFullscreenPreview() {
    let overlay = document.getElementById('editor-fs-preview-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'editor-fs-preview-overlay';
      overlay.style.cssText = `
        position: fixed; inset: 0; z-index: 100000; background: #0a0e1a;
        display: flex; flex-direction: column;
      `;
      overlay.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 24px; background:#0f1424; border-bottom:1px solid rgba(0,212,255,0.2);">
          <div style="font-weight:700; color:#00d4ff; display:flex; align-items:center; gap:8px;">
            <span>📺</span> To'liq Ekran Natijasi
          </div>
          <button class="btn btn-secondary" onclick="EditorTools.closeFullscreenPreview()" style="padding:6px 16px; font-size:13px; color:#f87171; border-color:#ef4444;">
            ✕ Chiqish
          </button>
        </div>
        <iframe id="editor-fs-frame" style="flex:1; width:100%; height:100%; border:none; background:#ffffff;"></iframe>
      `;
      document.body.appendChild(overlay);
    }

    const htmlCode = document.getElementById('editor-html')?.value || '';
    const cssCode = document.getElementById('editor-css')?.value || '';
    const jsCode = document.getElementById('editor-js')?.value || '';

    const fsFrame = document.getElementById('editor-fs-frame');
    if (fsFrame) {
      const doc = fsFrame.contentDocument || fsFrame.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head><style>${cssCode}</style></head>
        <body>
          ${htmlCode}
          <script>${jsCode}<\/script>
        </body>
        </html>
      `);
      doc.close();
    }

    overlay.style.display = 'flex';
  },

  closeFullscreenPreview() {
    const overlay = document.getElementById('editor-fs-preview-overlay');
    if (overlay) overlay.style.display = 'none';
  }
};

// Sayt ochilganda URL dagi ulashilgan kodni tekshirish va tashqi bosishlarni boshqarish
window.addEventListener('DOMContentLoaded', () => {
  EditorTools.checkUrlSharedCode();

  document.addEventListener('click', (e) => {
    const menu = document.getElementById('editor-templates-menu');
    const btn = document.getElementById('editor-templates-btn');
    if (menu && menu.style.display === 'block') {
      if (!menu.contains(e.target) && !btn.contains(e.target)) {
        menu.style.display = 'none';
      }
    }
  });
});
