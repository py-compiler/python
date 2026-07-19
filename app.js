/**
 * Online Python IDE - Engine & Command System (!1, !2, ...)
 * Fully Functional Compiler, Layouts, Sharing, Undo/Redo & Interactive input()
 */

document.addEventListener('DOMContentLoaded', () => {

  let INITIAL_PYTHON_CODE = `# Добро пожаловать в Online Python IDE!
# Вы можете писать любой Python-код здесь и запускать его кнопкой "Run" (или Ctrl+Enter).

# Пример интерактивного ввода:
name = input("Как тебя зовут? (Введите имя во всплывающем окне): ")
print(f"Привет, {name}!")

# Простой цикл:
print("\\nДавай посчитаем:")
for i in range(1, 4):
    print(f"  Цифра: {i}")

print("\\nКомпилятор готов к работе!")
`;

  // Parse shareable code parameter if present
  const urlParams = new URLSearchParams(window.location.search);
  const codeParam = urlParams.get('code');
  if (codeParam) {
    try {
      const decodedCode = atob(codeParam);
      if (decodedCode) {
        INITIAL_PYTHON_CODE = decodedCode;
      }
    } catch (e) {
      console.error("Failed to decode shared code parameter.", e);
    }
  }

  const DEFAULT_SNIPPETS = {
  "!1": {
    "label": "Snippet 1",
    "text": "import random\nn = random.randint(100, 999)\ns = sum(map(int, str(n)))\nprint(n, s % 5 == 0)\ninput()"
  },
  "!2": {
    "label": "Snippet 2",
    "text": "n = int(input(\"Введите зарплату: \"))\nif n <= 6000:\n    h = 0.1\nelif n <= 10000:\n    h = 0.15\nelif n <= 15000:\n    h = 0.17\nelse:\n    h = 0.2\n    z = n * h\n    print(f\"Налог: {z}\")\n    print(f\"Итого: {n - z}\")\n    input()"
  },
  "!3": {
    "label": "Snippet 3",
    "text": "n = int(input(\"Введите сумму: \"))\nif n <= 5000:\n    h = 0.05\nelif n <= 15000:\n    h = 0.12\nelif n <= 25000:\n    h = 0.2\nelse:\n    h = 0.3\n    z = n * h\n    print(f\"Скидка: {z}\")\n    print(f\"Итого: {n - z}\")\n    input()"
  },
  "!4": {
    "label": "Snippet 4",
    "text": "import random\nn = int(input(\"Введите размер массива: \"))\na = [random.randint(1, 25) for _ in range(n)]\neven = [x for x in a if x % 2 == 0]\ns = sum(even)\np = 1\nfor x in even:\n    p *= x\n    print(a, s, p)\n    input()"
  },
  "!5": {
    "label": "Snippet 5",
    "text": "n = int(input(\"Введите время(час): \"))\nif n < 0 or n > 23:\n    print(\"Ошибка\")\nelif 4 <= n < 10:\n    print(\"Доброе утро\")\nelif 10 <= n < 16:\n    print(\"Добрый день\")\nelif 16 <= n < 21:\n    print(\"Добрый вечер\")\nelse:\n    print(\"Доброй ночи\")\n    input()"
  },
  "!6": {
    "label": "Snippet 6",
    "text": "import random\nn = random.randint(100, 999)\ns = sum(map(int, str(n)))\nprint(n, 10 <= s <= 99)\ninput()"
  },
  "!7": {
    "label": "Snippet 7",
    "text": "a = int(input(\"Математика: \"))\nb = int(input(\"Русскиий язык: \"))\nc = int(input(\"Информатика: \"))\nd = int(input(\"Физика: \"))\nres1 = a + b + c + d\navg = res1 / 4\nif min(a, b, c, d) >= 3:\n    if avg >= 4.5:\n        print(5000)\n    elif avg >= 4:\n        print(2500)\n    else:\n        print(0)\nelse:\n    print(0)\ninput()"
  },
  "!8": {
    "label": "Snippet 8",
    "text": "import random\nn = int(input(\"Введите размер массива: \"))\na = [random.randint(-100, 100) for _ in range(n)]\npos = [x for x in a if x > 0]\nprint(a, len(pos), sum(pos)/len(pos))\ninput()"
  },
  "!9": {
    "label": "Snippet 9",
    "text": "import random\nn = int(input(\"Введите размер массива: \"))\na = [random.randint(-50, 50) for _ in range(n)]\notvet = [x for x in a if x < 0]\nprint(a, max(otvet) if otvet else \"net\")\ninput()"
  },
  "!!10": {
    "label": "Snippet 10",
    "text": "n = int(input())\na = [list(map(int, input().split())) for _ in range(n)]\nprint(sum(a[i][i] for i in range(n)))\ninput()"
  },
  "!!11": {
    "label": "Snippet 11",
    "text": "# Bilet 11\nimport random\nn = int(input(\"Введите размер массива: \"))\na = [random.randint(0, 50) for _ in range(n)]\ni_max = a.index(max(a))\ni_min = a.index(min(a))\na[i_max], a[i_min] = a[i_min], a[i_max]\nprint(a)\ninput()"
  },
  "!!12": {
    "label": "Snippet 12",
    "text": "a = float(input(\"Введите первое число: \"))\nc = input(\"Введите знак: \")\nb = float(input(\"Введите второе число: \"))\nif c == \"+\":\n    print(a + b)\nelif c == \"-\":\n    print(a - b)\nelif c == \"*\":\n    print(a * b)\nelif c == \"/\":\n    print(a / b)\nelse:\n    print(\"Вы ввели неправильный знак!\")\n    input()"
  },
  "!!13": {
    "label": "Snippet 13",
    "text": "import random\nn = int(input(\"Введите размер массива: \"))\na = [random.randint(1, 100) for _ in range(n)]\np = len([x for x in a if x % 7 == 0 and x % 5 != 0 and x % 3 != 0])\nprint(a, p)\ninput()"
  },
  "!!14": {
    "label": "Snippet 14",
    "text": "a = float(input(\"Введите первое число: \"))\nc = input(\"Введите знак (**, //, %): \")\nb = float(input(\"Введите второе число: \"))\nif c == \"**\":\n    print(a ** b)\nelif c == \"//\":\n    print(a // b)\nelif c == \"%\":\n    print(a % b)\nelse:\n    print(\"Вы ввели неправильный знак!\")\n    input()"
  },
  "!!15": {
    "label": "Snippet 15",
    "text": "n = int(input())\na = [list(map(int, input().split())) for _ in range(n)]\nfor i in range(n):\n    a[i][i] = 7\n    print(*a, sep=\"\\n\")\n    input()"
  },
  "!!16": {
    "label": "Snippet 16",
    "text": "s = \"программирование\"\nprint(s[2])\nprint(s[-2])\nprint(s[:5])\nprint(s[:-2])\nprint(s[::2])\nprint(s[1::2])\nprint(s[::-1])\nprint(s[::-2])\nprint(len(s))\ninput()"
  },
  "!!17": {
    "label": "Snippet 17",
    "text": "import random\nn = int(input(\"Введите размер массива: \"))\na = [random.randint(0, 25) for _ in range(n)]\neven = [x for x in a if x % 2 == 0]\nprint(a, len(even), sum(even)/len(even))\ninput()"
  },
  "!!18": {
    "label": "Snippet 18",
    "text": "a = int(input(\"Математика: \"))\nb = int(input(\"История\"))\nc = int(input(\"Русский язык\"))\nd = int(input(\"Информатика\"))\nf = int(input(\"Физика\"))\nres1 = a + b + c + d + f\navg = res1 / 5\nif min(a, b, c, d, f) >= 3:\n    if avg >= 4.5:\n        print(3000)\n    elif avg >= 4:\n        print(1500)\n    else:\n        print(0)\nelse:\n    print(0)\ninput()"
  },
  "!!19": {
    "label": "Snippet 19",
    "text": "n = int(input(\"Введите сумму продажи: \"))\nif n <= 8000:\n    p = 0.7\nelif n <= 16000:\n    p = 0.14\nelif n <= 26000:\n    p = 0.2\nelse:\n    p = 0.27\n    z = n * p\n    print(f\"Скидка: {z}\")\n    print(f\"Сумма с вычетом скидки: {n - z}\")\n    input()"
  },
  "!!20": {
    "label": "Snippet 20",
    "text": "a = int(input())\nb = int(input())\nwhile a >= b:\n    a -= b\n    print(a)"
  },
  "!!21": {
    "label": "Snippet 21",
    "text": "n = int(input(\"Введите размер зарплаты: \"))\nif n <= 8000:\n    p = 0.12\nelif n <= 15000:\n    p = 0.15\nelif n <= 20000:\n    p = 0.18\nelse:\n    p = 0.2\n    z = n * p\n    print(f\"Зарплата: {n}\")\n    print(f\"Налог: {z}\")\n    print(f\"Зарплата с вычетом налога: {n - z}\")\n    input()"
  },
  "!!22": {
    "label": "Snippet 22",
    "text": "import random\nn = int(input())\na = [random.randint(25, 85) for _ in range(n)]\nodd = [x for x in a if x % 2 != 0]\ns = sum(odd)\np = 1\nfor x in odd:\n    p *= x\n    print(a, s, p)\n    input()"
  },
  "!!23": {
    "label": "Snippet 23",
    "text": "n = int(input())\nif n < 3:\n    print(\"Ошибка\")\nelif n == 3:\n    print(\"треугольник\")\nelif n == 4:\n    print(\"четырехугольник\")\nelif n == 5:\n    print(\"пятиугольник\")\nelif n == 6:\n    print(\"шестиугольник\")\nelif n == 7:\n    print(\"семиугольник\")\nelif n == 8:\n    print(\"восьмиугольник\")\nelse:\n    print(\"многоугольник\")\n    input()"
  },
  "!!24": {
    "label": "Snippet 24",
    "text": "m = int(input())\nif m in [12, 1, 2]:\n    print(\"зима\")\nelif m in [3, 4, 5]:\n    print(\"весна\")\nelif m in [6, 7, 8]:\n    print(\"лето\")\nelif m in [9, 10, 11]:\n    print(\"осень\")\nelse:\n    print(\"Ошибка\")\n    input()"
  }
};

  // State
  let snippets = loadSnippets();
  let tabs = [
    { id: 'main-py', title: 'main.py', content: INITIAL_PYTHON_CODE, active: true }
  ];
  let activeTabId = 'main-py';

  // History Stack for Undo/Redo
  let historyStack = [];
  let historyIndex = -1;

  // DOM Elements
  const textarea = document.getElementById('editor-textarea');
  const gutter = document.getElementById('editor-gutter');
  const footerPos = document.getElementById('footer-pos');
  const editorTabs = document.getElementById('editor-tabs');

  const terminalScreen = document.getElementById('terminal-screen');
  const promptRow = document.getElementById('prompt-row');
  const runBtn = document.getElementById('run-btn');

  const btnClearOut = document.getElementById('btn-clear-out');
  const btnCopyOut = document.getElementById('btn-copy-out');
  const btnDownloadOut = document.getElementById('btn-download-out');

  const snippetsModal = document.getElementById('snippets-modal');
  const snippetsBtn = document.getElementById('snippets-btn');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const snippetsListView = document.getElementById('snippets-list-view');

  function loadSnippets() {
    const saved = localStorage.getItem('online_py_snippets');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return Object.assign({}, DEFAULT_SNIPPETS, parsed);
      } catch (e) {}
    }
    return Object.assign({}, DEFAULT_SNIPPETS);
  }

  function saveSnippets() {
    localStorage.setItem('online_py_snippets', JSON.stringify(snippets));
    renderSnippetsList();
  }

  function getActiveTab() {
    return tabs.find(t => t.id === activeTabId);
  }

  function initEditor() {
    const tab = getActiveTab();
    if (tab) {
      textarea.value = tab.content;
      updateEditorDisplay();
    }
    renderTabs();
    renderSnippetsList();
    saveHistoryState();
  }

  function updateEditorDisplay() {
    const text = textarea.value;
    const tab = getActiveTab();
    if (tab) tab.content = text;

    // Line Numbers Gutter
    const lines = text.split('\n');
    const { line: curLine } = getCaretPosition();

    let gutterHTML = '';
    for (let i = 1; i <= lines.length; i++) {
      const isActive = i === curLine ? ' active' : '';
      gutterHTML += `<div class="gutter-line${isActive}">${i}</div>`;
    }
    gutter.innerHTML = gutterHTML;

    updateCaretStatus();
  }

  function getCaretPosition() {
    const pos = textarea.selectionStart;
    const text = textarea.value;
    const lines = text.substring(0, pos).split('\n');
    return {
      line: lines.length,
      col: lines[lines.length - 1].length + 1
    };
  }

  function updateCaretStatus() {
    const { line, col } = getCaretPosition();
    footerPos.textContent = `Line ${line}, Column ${col}`;
  }

  // ==========================================================================
  // Undo / Redo History Core
  // ==========================================================================
  function saveHistoryState() {
    if (historyIndex >= 0 && historyStack[historyIndex].content === textarea.value && historyStack[historyIndex].tabId === activeTabId) {
      return;
    }
    // Truncate future states if we performed undoes
    historyStack = historyStack.slice(0, historyIndex + 1);
    historyStack.push({
      tabId: activeTabId,
      content: textarea.value,
      cursorStart: textarea.selectionStart,
      cursorEnd: textarea.selectionEnd
    });
    historyIndex = historyStack.length - 1;
  }

  document.getElementById('undo-editor')?.addEventListener('click', () => {
    if (historyIndex > 0) {
      historyIndex--;
      const state = historyStack[historyIndex];
      if (activeTabId !== state.tabId) {
        switchTab(state.tabId);
      }
      textarea.value = state.content;
      textarea.selectionStart = state.cursorStart;
      textarea.selectionEnd = state.cursorEnd;
      updateEditorDisplay();
    }
  });

  document.getElementById('redo-editor')?.addEventListener('click', () => {
    if (historyIndex < historyStack.length - 1) {
      historyIndex++;
      const state = historyStack[historyIndex];
      if (activeTabId !== state.tabId) {
        switchTab(state.tabId);
      }
      textarea.value = state.content;
      textarea.selectionStart = state.cursorStart;
      textarea.selectionEnd = state.cursorEnd;
      updateEditorDisplay();
    }
  });

  // ==========================================================================
  // Command Snippet Expansion (!1, !2, !3... and ?!1, ?!!10 human mode)
  // ==========================================================================
  let isHumanTypingActive = false;
  let isCapsLockActive = true;

  function updateCapsLockState(e) {
    if (e && typeof e.getModifierState === 'function') {
      isCapsLockActive = e.getModifierState('CapsLock');
    }
  }

  window.addEventListener('keydown', (e) => {
    updateCapsLockState(e);
    if (e.key === 'CapsLock') {
      isCapsLockActive = !isCapsLockActive;
    }
    if (e.key === 'Escape') {
      isHumanTypingActive = false; // Emergency cancel human typing
    }
  }, true);

  window.addEventListener('keyup', updateCapsLockState, true);
  window.addEventListener('mousemove', updateCapsLockState, true);
  window.addEventListener('mousedown', updateCapsLockState, true);
  window.addEventListener('click', updateCapsLockState, true);

  function checkSnippetTrigger() {
    if (isHumanTypingActive) return;
    const text = textarea.value;
    const pos = textarea.selectionStart;
    const textBefore = text.substring(0, pos);
    const match = textBefore.match(/(\??)(!!\d+|!\d+)$/);

    if (match) {
      const isSlowHuman = match[1] === '?';
      const triggerKey = match[2];
      if (snippets[triggerKey]) {
        expandSnippet(triggerKey, match.index, pos, isSlowHuman);
      }
    }
  }

  function expandSnippet(triggerKey, matchIndex, endPos, isSlowHuman = false) {
    const snippet = snippets[triggerKey];
    if (!snippet) return;

    if (isSlowHuman) {
      typeSnippetHumanLike(snippet.text, matchIndex, endPos);
    } else {
      const fullText = textarea.value;
      const snippetText = snippet.text;

      textarea.value = fullText.substring(0, matchIndex) + snippetText + fullText.substring(endPos);
      
      const newPos = matchIndex + snippetText.length;
      textarea.selectionStart = newPos;
      textarea.selectionEnd = newPos;

      updateEditorDisplay();
      saveHistoryState();
    }
  }

  async function typeSnippetHumanLike(snippetText, matchIndex, endPos) {
    if (isHumanTypingActive) return;
    isHumanTypingActive = true;
    isCapsLockActive = true; // Initialize to active upon triggering command

    // Erase trigger command (?!1 or ?!!10)
    const fullText = textarea.value;
    const textAfter = fullText.substring(endPos);
    let curText = fullText.substring(0, matchIndex);

    textarea.value = curText + textAfter;
    let currentPos = matchIndex;
    textarea.selectionStart = currentPos;
    textarea.selectionEnd = currentPos;
    updateEditorDisplay();

    const sleep = (ms) => new Promise(res => setTimeout(res, ms));

    const chars = snippetText.split('');
    let isPrevSpace = false;

    for (let i = 0; i < chars.length; i++) {
      // CapsLock Control: Pause typing if CapsLock is turned off
      while (!isCapsLockActive && isHumanTypingActive) {
        await sleep(40);
      }
      if (!isHumanTypingActive) break;

      // Detection of editor clear / reset during typing:
      // If editor was cleared (empty) after typing began (i > 3)
      if (i > 3 && textarea.value.trim() === '') {
        matchIndex = 0;
        currentPos = 0;
        textarea.value = '';
        updateEditorDisplay();
        i = -1; // Reset loop to start from beginning (i = 0)
        await sleep(500); // Brief pause before restarting
        continue;
      }

      const ch = chars[i];

      // Hesitation before typing digits (0-9) or special symbols ()(!?.,:[]{}='"+-*%/<>#)
      if (/[0-9]/.test(ch)) {
        await sleep(Math.floor(Math.random() * 450) + 350); // 350-800ms hesitation before numbers
      } else if (/[()!?:\$,\[\]{}='"+\-*%\/<>#]/.test(ch)) {
        await sleep(Math.floor(Math.random() * 500) + 400); // 400-900ms hesitation before special symbols
      }

      // Simulated Typo Chance (10% chance for alphabetic letters)
      const isAlpha = /[a-zA-Zа-яА-Я]/.test(ch);
      if (isAlpha && Math.random() < 0.10) {
        // Type wrong character
        const wrongChar = String.fromCharCode(ch.charCodeAt(0) + (Math.random() > 0.5 ? 1 : -1));
        textarea.value = textarea.value.substring(0, currentPos) + wrongChar + textarea.value.substring(currentPos);
        currentPos++;
        textarea.selectionStart = currentPos;
        textarea.selectionEnd = currentPos;
        updateEditorDisplay();
        
        await sleep(Math.floor(Math.random() * 300) + 350); // 350-650ms pause realizing mistake

        // Backspace wrong character
        textarea.value = textarea.value.substring(0, currentPos - 1) + textarea.value.substring(currentPos);
        currentPos--;
        textarea.selectionStart = currentPos;
        textarea.selectionEnd = currentPos;
        updateEditorDisplay();

        await sleep(Math.floor(Math.random() * 250) + 250); // 250-500ms pause before correcting
      }

      // Type actual character
      textarea.value = textarea.value.substring(0, currentPos) + ch + textarea.value.substring(currentPos);
      currentPos++;
      textarea.selectionStart = currentPos;
      textarea.selectionEnd = currentPos;

      updateEditorDisplay();
      textarea.scrollTop = textarea.scrollHeight; // Auto-scroll as typing progresses

      // Dynamic Human Delay Calculations (2x Slower, realistic pace)
      let delay = Math.floor(Math.random() * 200) + 160; // default 160-360ms per char

      if (ch === '\n') {
        delay = Math.floor(Math.random() * 1600) + 1200; // newline pause 1.2s - 2.8s
        isPrevSpace = false;
      } else if (ch === ' ') {
        if (isPrevSpace) {
          delay = Math.floor(Math.random() * 80) + 80; // indent space 80-160ms
        } else {
          delay = Math.floor(Math.random() * 160) + 180;
          isPrevSpace = true;
        }
      } else {
        isPrevSpace = false;
      }

      await sleep(delay);
    }

    saveHistoryState();
    isHumanTypingActive = false;
  }

  // Block manual keyboard typing while human script auto-typing is active
  textarea.addEventListener('beforeinput', (e) => {
    if (isHumanTypingActive) {
      e.preventDefault();
    }
  });

  textarea.addEventListener('input', () => {
    if (isHumanTypingActive) return;
    updateEditorDisplay();
    checkSnippetTrigger();
    saveHistoryState();
  });

  textarea.addEventListener('keyup', updateCaretStatus);
  textarea.addEventListener('click', updateCaretStatus);

  textarea.addEventListener('scroll', () => {
    gutter.scrollTop = textarea.scrollTop;
  });

  textarea.addEventListener('keydown', (e) => {
    if (isHumanTypingActive) {
      // Allow browser shortcuts (F1-F12, Shift+F5, Ctrl/Alt/Meta hotkeys, CapsLock, Escape)
      if (
        e.key.startsWith('F') ||
        e.ctrlKey ||
        e.altKey ||
        e.metaKey ||
        e.key === 'CapsLock' ||
        e.key === 'Escape'
      ) {
        return;
      }
      e.preventDefault();
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const pos = textarea.selectionStart;
      const text = textarea.value;

      const textBefore = text.substring(0, pos);
      const match = textBefore.match(/(\??)(!!\d+|!\d+)$/);
      if (match && snippets[match[2]]) {
        expandSnippet(match[2], match.index, pos, match[1] === '?');
        return;
      }

      // 4 Spaces Indentation
      textarea.value = text.substring(0, pos) + '    ' + text.substring(textarea.selectionEnd);
      textarea.selectionStart = textarea.selectionEnd = pos + 4;
      updateEditorDisplay();
      saveHistoryState();
    }

    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      runPythonCode();
    }
  });

  // ==========================================================================
  // Python Code Runner & Terminal Console (Pyodide WASM Compiler Integration)
  // ==========================================================================
  let pyodideInstance = null;
  let isPyodideLoading = false;

  // Make prompt user globally available for Pyodide bridge
  window.promptUser = function(promptText) {
    return prompt(promptText || "Input:") || "";
  };

  async function loadPyodideCompiler() {
    if (pyodideInstance) return pyodideInstance;
    if (isPyodideLoading) return null;

    isPyodideLoading = true;
    appendToTerminal("[System] Loading Python 3.12 WebAssembly environment...", "info");

    // Wait for loadPyodide CDN script to load asynchronously
    let checkAttempts = 0;
    while (typeof loadPyodide === 'undefined') {
      checkAttempts++;
      if (checkAttempts > 100) { // Timeout after 10 seconds
        appendToTerminal("[System] Error: loadPyodide script failed to load. Please check your internet connection and reload.", "error");
        isPyodideLoading = false;
        return null;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try {
      pyodideInstance = await loadPyodide({
        stdout: (text) => {
          appendToTerminal(text, 'output');
        },
        stderr: (text) => {
          appendToTerminal(text, 'error');
        }
      });
      appendToTerminal("[System] Python environment loaded successfully! Ready to run code.", "info");
      isPyodideLoading = false;
      return pyodideInstance;
    } catch (err) {
      appendToTerminal("[System] Error loading Python environment: " + err.message, "error");
      isPyodideLoading = false;
      return null;
    }
  }

  // Load compiler early on startup
  loadPyodideCompiler();

  runBtn.addEventListener('click', runPythonCode);

  async function runPythonCode() {
    const code = textarea.value;
    clearTerminal();

    appendToTerminal(`$ python main.py`, 'welcome');

    const pyodide = await loadPyodideCompiler();
    if (!pyodide) {
      appendToTerminal("\n[System] Compiler is still loading. Please wait a few seconds and try again.", "info");
      return;
    }

    // Set Command Line Arguments
    const argsInput = document.getElementById('input_arguments').value.trim();
    const argsArray = argsInput ? argsInput.split(/\s+/) : [];

    try {
      // Overwrite input() with dynamic browser prompt bridge
      await pyodide.runPythonAsync(`
import builtins
import js
import sys

sys.argv = ['main.py'] + ${JSON.stringify(argsArray)}

def web_input(prompt_msg=""):
    if prompt_msg:
        print(prompt_msg, end="", flush=True)
    user_val = js.promptUser(prompt_msg)
    print(user_val)
    return user_val

builtins.input = web_input
`);

      // Run user script
      await pyodide.runPythonAsync(code);
      appendToTerminal(`\n...Program finished successfully`, 'info');
    } catch (err) {
      appendToTerminal(err.message, 'error');
    }
  }

  function appendToTerminal(text, type = 'output') {
    const div = document.createElement('div');
    div.className = `term-line term-${type}`;
    div.textContent = text;
    terminalScreen.insertBefore(div, promptRow);
    terminalScreen.scrollTop = terminalScreen.scrollHeight;
  }

  function clearTerminal() {
    const lines = terminalScreen.querySelectorAll('.term-line');
    lines.forEach(line => line.remove());
  }

  btnClearOut.addEventListener('click', clearTerminal);

  btnCopyOut.addEventListener('click', () => {
    const text = Array.from(terminalScreen.querySelectorAll('.term-line'))
      .map(el => el.textContent).join('\n');
    navigator.clipboard.writeText(text);
    alert('Terminal output copied!');
  });

  btnDownloadOut.addEventListener('click', () => {
    const text = Array.from(terminalScreen.querySelectorAll('.term-line'))
      .map(el => el.textContent).join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'python_output.txt';
    a.click();
  });

  // Re-start / Reset Terminal VM variables
  document.getElementById('start-term')?.addEventListener('click', async () => {
    const pyodide = await loadPyodideCompiler();
    if (!pyodide) return;
    clearTerminal();
    appendToTerminal("[System] Restarting Python interactive session...", "info");
    try {
      await pyodide.runPythonAsync(`
for name in list(globals().keys()):
    if not name.startswith('_') and name not in ['sys', 'builtins', 'js', 'web_input']:
        del globals()[name]
`);
      appendToTerminal("[System] Interactive session restarted. Workspace cleared.", "info");
    } catch (e) {
      appendToTerminal("Restart failed: " + e.message, "error");
    }
  });

  // Expand / Collapse terminal height
  document.getElementById('term-expand')?.addEventListener('click', () => {
    document.querySelector('.terminal-pane')?.classList.toggle('expanded');
  });

  // ==========================================================================
  // Layout and Navigation controls
  // ==========================================================================
  document.getElementById('toggle-split')?.addEventListener('click', () => {
    const ws = document.getElementById('workspace');
    const editor = document.querySelector('.editor-pane');
    if (!ws || !editor) return;
    if (ws.style.flexDirection === 'column') {
      ws.style.flexDirection = 'row';
      editor.style.borderRight = '1px solid var(--border-color)';
      editor.style.borderBottom = 'none';
    } else {
      ws.style.flexDirection = 'column';
      editor.style.borderRight = 'none';
      editor.style.borderBottom = '1px solid var(--border-color)';
    }
  });

  // Change theme (Light / Dark)
  document.getElementById('toggle-theme')?.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
  });

  // Share code link generator (creates a base64 encoded url hash)
  document.getElementById('share-btn')?.addEventListener('click', () => {
    const code = textarea.value;
    const base64Code = btoa(unescape(encodeURIComponent(code)));
    const shareUrl = `${location.origin}${location.pathname}?code=${base64Code}`;
    navigator.clipboard.writeText(shareUrl);
    alert("Shareable link copied to clipboard! Share it with anyone.");
  });

  // Interactive local variable debugger
  document.getElementById('debug-btn')?.addEventListener('click', () => {
    const code = textarea.value;
    clearTerminal();
    appendToTerminal(`$ python -m pdb main.py`, 'welcome');
    appendToTerminal(`[Debugger] Entering interactive state inspection...`, 'info');
    
    setTimeout(async () => {
      const pyodide = await loadPyodideCompiler();
      if (!pyodide) return;

      try {
        await pyodide.runPythonAsync(code);
        await pyodide.runPythonAsync(`
print("\\n--- LOCAL VARIABLES INSPECTOR ---")
inspect_count = 0
for k, v in list(globals().items()):
    if not k.startswith('_') and k not in ['sys', 'builtins', 'js', 'web_input', 'welcome_message']:
        print(f"  {k} = {repr(v)}")
        inspect_count += 1
if inspect_count == 0:
    print("  (No variables declared yet)")
print("---------------------------------\\n")
`);
      } catch (err) {
        appendToTerminal(err.message, 'error');
      }
    }, 100);
  });

  // Support link opens paypal payment
  document.getElementById('support-btn')?.addEventListener('click', () => {
    window.open("https://www.paypal.com/ncp/payment/MM2G8KYNN2AL6", "_blank");
  });

  document.getElementById('btn-learn')?.addEventListener('click', () => {
    window.open("https://learn.online-python.com/", "_blank");
  });

  document.getElementById('btn-try-ide')?.addEventListener('click', () => {
    window.open("https://www.onlineide.pro/", "_blank");
  });

  // ==========================================================================
  // Tab Management
  // ==========================================================================
  function renderTabs() {
    if (!editorTabs) return;
    editorTabs.innerHTML = '';
    tabs.forEach(tab => {
      const li = document.createElement('li');
      li.className = `tab ${tab.active ? 'active' : ''}`;
      li.dataset.tabId = tab.id;
      li.innerHTML = `
        <span class="tab-label">${tab.title}</span>
        <span class="tab-close">&times;</span>
      `;
      
      li.addEventListener('click', (e) => {
        if (e.target.classList.contains('tab-close')) {
          e.stopPropagation();
          closeTab(tab.id);
        } else {
          switchTab(tab.id);
        }
      });
      editorTabs.appendChild(li);
    });

    const addBtnLi = document.createElement('li');
    addBtnLi.id = 'new_file_btn';
    addBtnLi.style.display = 'flex';
    addBtnLi.style.alignItems = 'center';
    addBtnLi.innerHTML = `<button type="button" class="add-tab-btn" id="create_tab" title="New File"><i class="fas fa-plus"></i></button>`;
    addBtnLi.querySelector('#create_tab')?.addEventListener('click', () => {
      const fileName = prompt("Enter new Python file name:", `file_${tabs.length + 1}.py`);
      if (fileName) {
        let cleanName = fileName.trim();
        if (!cleanName.endsWith('.py')) cleanName += '.py';
        createNewTab(cleanName, `# Code for ${cleanName}\n`);
      }
    });
    editorTabs.appendChild(addBtnLi);
  }

  function switchTab(id) {
    // Save current active tab text
    const curTab = getActiveTab();
    if (curTab) curTab.content = textarea.value;

    tabs.forEach(t => t.active = (t.id === id));
    activeTabId = id;
    
    const nextTab = getActiveTab();
    if (nextTab) {
      textarea.value = nextTab.content;
      updateEditorDisplay();
    }
    renderTabs();
  }

  function createNewTab(title, content) {
    tabs.forEach(t => t.active = false);
    const newId = 'tab-' + Date.now();
    tabs.push({ id: newId, title, content, active: true });
    activeTabId = newId;
    initEditor();
  }

  function closeTab(id) {
    if (tabs.length === 1) return;
    tabs = tabs.filter(t => t.id !== id);
    if (activeTabId === id) {
      activeTabId = tabs[tabs.length - 1].id;
      tabs[tabs.length - 1].active = true;
    }
    initEditor();
  }

  // ==========================================================================
  // Modal / Snippets Controls
  // ==========================================================================
  function openSnippetsModal() {
    snippetsModal?.classList.add('active');
    renderSnippetsList();
  }

  function closeSnippetsModal() {
    snippetsModal?.classList.remove('active');
  }

  snippetsBtn?.addEventListener('click', openSnippetsModal);
  modalCloseBtn?.addEventListener('click', closeSnippetsModal);

  document.getElementById('btn-save-snippet')?.addEventListener('click', () => {
    let key = document.getElementById('new-cmd-key').value.trim();
    const label = document.getElementById('new-cmd-label').value.trim() || 'Custom Python Command';
    const text = document.getElementById('new-cmd-text').value;

    if (!key) return alert('Enter trigger (e.g. !1)');
    if (!key.startsWith('!')) key = '!' + key;
    if (!text) return alert('Enter text or code');

    snippets[key] = { label, text };
    saveSnippets();

    document.getElementById('new-cmd-key').value = `!${Object.keys(snippets).length + 1}`;
    document.getElementById('new-cmd-label').value = '';
    document.getElementById('new-cmd-text').value = '';
  });

  document.getElementById('btn-reset-snippets')?.addEventListener('click', () => {
    if (confirm('Reset all snippet commands to default (!1, !2, !3, !4)?')) {
      localStorage.removeItem('online_py_snippets');
      snippets = { ...DEFAULT_SNIPPETS };
      saveSnippets();
      renderSnippetsList();
    }
  });

  function renderSnippetsList() {
    if (!snippetsListView) return;
    snippetsListView.innerHTML = '';
    Object.keys(snippets).forEach(key => {
      const item = snippets[key];
      const div = document.createElement('div');
      div.className = 'snippet-row';
      div.innerHTML = `
        <div>
          <span class="badge-key">${key}</span>
          <strong style="color:#fff;">${item.label}</strong>
          <div class="preview-code">${escapeHtml(item.text)}</div>
        </div>
        <button class="btn-del" data-key="${key}">Delete</button>
      `;
      div.querySelector('.btn-del')?.addEventListener('click', () => {
        delete snippets[key];
        saveSnippets();
      });
      snippetsListView.appendChild(div);
    });
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  // File Handlers
  const fileInput = document.getElementById('file-input');
  document.getElementById('open_file')?.addEventListener('click', () => fileInput?.click());

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        createNewTab(file.name, evt.target.result);
      };
      reader.readAsText(file);
    }
  });

  document.getElementById('save_file')?.addEventListener('click', () => {
    const blob = new Blob([textarea.value], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = document.querySelector('.tab-label')?.textContent || 'main.py';
    a.click();
  });

  document.getElementById('reset_code')?.addEventListener('click', () => {
    if (confirm('Reset editor code?')) {
      textarea.value = INITIAL_PYTHON_CODE;
      updateEditorDisplay();
      clearTerminal();
      saveHistoryState();
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target === snippetsModal) closeSnippetsModal();
  });

  initEditor();
});
