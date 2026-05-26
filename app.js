// ============================================================
// AMIGO — app.js  (with Language Support)
// ============================================================

// ────────────────────────────────────────────────────────────
// TRANSLATIONS
// This object holds all the text for each language.
// To add a new language, copy one block and translate the values.
// ────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    dir: 'ltr',
    greeting: 'Hello',
    todayFocus: "Today's focus",
    noTasksToday: 'No tasks due today — enjoy your day!',
    addPlaceholder: 'Tell Amigo something… e.g. Math quiz on Monday',
    addBtn: 'Add ↗',
    chipAssignment: 'Assignment due today',
    chipQuiz: 'Quiz on Monday',
    chipMids: 'Mids next week',
    chipFinal: 'Final exam',
    today: 'Today',
    upcoming: 'Upcoming',
    nothingDueToday: 'Nothing due today.',
    noUpcoming: 'No upcoming tasks yet.',
    settingsSaved: 'Settings saved!',
    saved: 'Saved! Amigo has it organized.',
    whatType: 'what type is this?',
    whichSubject: 'Which subject?',
    subjectPlaceholder: 'e.g. Physics, OOP, Calculus...',
    priority: 'Priority?',
    dueDate: 'Due date?',
    duePlaceholder: 'e.g. Today, 24/05/2026, 24may2026...',
    addNote: 'Add a note? (optional)',
    notePlaceholder: 'e.g. Chapter 3, pages 10-20...',
    next: 'Next',
    saveBtn: 'Save ↗',
    skip: 'Skip',
    cancel: 'Cancel',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    assignment: 'Assignment',
    quiz: 'Quiz',
    mids: 'Mids',
    final: 'Final',
    presentation: 'Presentation',
    notice: 'Notice',
    nothingHereYet: 'Nothing here yet.',
    noTasksYet: 'No tasks yet.',
    noFoldersYet: 'No folders yet — create one above!',
    noResultsFound: 'No results found.',
    noRemindersYet: 'No reminders yet — click a date to add one!',
    noUpcomingReminders: 'No upcoming reminders this month.',
  },
  ur: {
    dir: 'rtl',
    greeting: 'ہیلو',
    todayFocus: 'آج کا فوکس',
    noTasksToday: 'آج کوئی کام نہیں — دن اچھا گزارو!',
    addPlaceholder: 'امیگو کو بتاؤ… مثلاً پیر کو ریاضی کا کوئز',
    addBtn: 'شامل کریں ↗',
    chipAssignment: 'آج اسائنمنٹ جمع',
    chipQuiz: 'پیر کو کوئز',
    chipMids: 'اگلے ہفتے مڈز',
    chipFinal: 'فائنل امتحان',
    today: 'آج',
    upcoming: 'آنے والا',
    nothingDueToday: 'آج کچھ نہیں۔',
    noUpcoming: 'ابھی کوئی کام نہیں۔',
    settingsSaved: 'سیٹنگز محفوظ ہو گئیں!',
    saved: 'محفوظ! امیگو نے ترتیب دے دی۔',
    whatType: 'یہ کیا ہے؟',
    whichSubject: 'کون سا مضمون؟',
    subjectPlaceholder: 'مثلاً فزکس، OOP، حساب...',
    priority: 'ترجیح؟',
    dueDate: 'آخری تاریخ؟',
    duePlaceholder: 'مثلاً آج، 24/05/2026...',
    addNote: 'نوٹ شامل کریں؟ (اختیاری)',
    notePlaceholder: 'مثلاً باب 3، صفحات 10-20...',
    next: 'اگلا',
    saveBtn: 'محفوظ کریں ↗',
    skip: 'چھوڑیں',
    cancel: 'منسوخ',
    high: 'زیادہ',
    medium: 'درمیانہ',
    low: 'کم',
    assignment: 'اسائنمنٹ',
    quiz: 'کوئز',
    mids: 'مڈ ٹرم',
    final: 'فائنل',
    presentation: 'پریزنٹیشن',
    notice: 'نوٹس',
    nothingHereYet: 'ابھی کچھ نہیں۔',
    noTasksYet: 'ابھی کوئی کام نہیں۔',
    noFoldersYet: 'کوئی فولڈر نہیں — اوپر سے بنائیں!',
    noResultsFound: 'کوئی نتیجہ نہیں ملا۔',
    noRemindersYet: 'کوئی یاددہانی نہیں — تاریخ پر کلک کریں!',
    noUpcomingReminders: 'اس مہینے کوئی آنے والی یاددہانی نہیں۔',
  },
  ar: {
    dir: 'rtl',
    greeting: 'مرحباً',
    todayFocus: 'تركيز اليوم',
    noTasksToday: 'لا مهام اليوم — استمتع بيومك!',
    addPlaceholder: 'أخبر أميغو… مثلاً اختبار رياضيات يوم الاثنين',
    addBtn: 'أضف ↗',
    chipAssignment: 'واجب اليوم',
    chipQuiz: 'اختبار الاثنين',
    chipMids: 'منتصف الفصل الأسبوع القادم',
    chipFinal: 'الامتحان النهائي',
    today: 'اليوم',
    upcoming: 'القادم',
    nothingDueToday: 'لا شيء اليوم.',
    noUpcoming: 'لا مهام قادمة بعد.',
    settingsSaved: 'تم حفظ الإعدادات!',
    saved: 'تم الحفظ! رتّب أميغو كل شيء.',
    whatType: 'ما نوع هذا؟',
    whichSubject: 'أي مادة؟',
    subjectPlaceholder: 'مثلاً فيزياء، برمجة، رياضيات...',
    priority: 'الأولوية؟',
    dueDate: 'تاريخ الاستحقاق؟',
    duePlaceholder: 'مثلاً اليوم، 24/05/2026...',
    addNote: 'إضافة ملاحظة؟ (اختياري)',
    notePlaceholder: 'مثلاً الفصل 3، الصفحات 10-20...',
    next: 'التالي',
    saveBtn: 'حفظ ↗',
    skip: 'تخطي',
    cancel: 'إلغاء',
    high: 'عالية',
    medium: 'متوسطة',
    low: 'منخفضة',
    assignment: 'واجب',
    quiz: 'اختبار',
    mids: 'منتصف الفصل',
    final: 'نهائي',
    presentation: 'عرض',
    notice: 'إشعار',
    nothingHereYet: 'لا شيء هنا بعد.',
    noTasksYet: 'لا مهام بعد.',
    noFoldersYet: 'لا مجلدات بعد — أنشئ واحداً أعلاه!',
    noResultsFound: 'لا نتائج.',
    noRemindersYet: 'لا تذكيرات — انقر على تاريخ لإضافة واحد!',
    noUpcomingReminders: 'لا تذكيرات قادمة هذا الشهر.',
  },
  fr: {
    dir: 'ltr',
    greeting: 'Bonjour',
    todayFocus: "Focus d'aujourd'hui",
    noTasksToday: "Aucune tâche aujourd'hui — profitez de votre journée!",
    addPlaceholder: 'Dites à Amigo… ex: Quiz de maths lundi',
    addBtn: 'Ajouter ↗',
    chipAssignment: "Devoir aujourd'hui",
    chipQuiz: 'Quiz lundi',
    chipMids: 'Partiels la semaine prochaine',
    chipFinal: 'Examen final',
    today: "Aujourd'hui",
    upcoming: 'À venir',
    nothingDueToday: "Rien à faire aujourd'hui.",
    noUpcoming: 'Aucune tâche à venir.',
    settingsSaved: 'Paramètres sauvegardés!',
    saved: 'Sauvegardé! Amigo a tout organisé.',
    whatType: 'quel type est-ce?',
    whichSubject: 'Quelle matière?',
    subjectPlaceholder: 'ex: Physique, Programmation, Maths...',
    priority: 'Priorité?',
    dueDate: 'Date limite?',
    duePlaceholder: "ex: Aujourd'hui, 24/05/2026...",
    addNote: 'Ajouter une note? (optionnel)',
    notePlaceholder: 'ex: Chapitre 3, pages 10-20...',
    next: 'Suivant',
    saveBtn: 'Sauvegarder ↗',
    skip: 'Passer',
    cancel: 'Annuler',
    high: 'Haute',
    medium: 'Moyenne',
    low: 'Basse',
    assignment: 'Devoir',
    quiz: 'Quiz',
    mids: 'Partiel',
    final: 'Final',
    presentation: 'Présentation',
    notice: 'Avis',
    nothingHereYet: 'Rien ici pour l\'instant.',
    noTasksYet: 'Pas encore de tâches.',
    noFoldersYet: 'Aucun dossier — créez-en un ci-dessus!',
    noResultsFound: 'Aucun résultat.',
    noRemindersYet: 'Aucun rappel — cliquez sur une date!',
    noUpcomingReminders: 'Aucun rappel ce mois-ci.',
  },
  zh: {
    dir: 'ltr',
    greeting: '你好',
    todayFocus: '今日重点',
    noTasksToday: '今天没有任务 — 好好享受吧！',
    addPlaceholder: '告诉Amigo… 例如：周一数学测验',
    addBtn: '添加 ↗',
    chipAssignment: '今天作业到期',
    chipQuiz: '周一测验',
    chipMids: '下周期中考试',
    chipFinal: '期末考试',
    today: '今天',
    upcoming: '即将到来',
    nothingDueToday: '今天没有到期任务。',
    noUpcoming: '暂无即将到来的任务。',
    settingsSaved: '设置已保存！',
    saved: '已保存！Amigo已整理好。',
    whatType: '这是什么类型？',
    whichSubject: '哪个科目？',
    subjectPlaceholder: '例如：物理、编程、数学...',
    priority: '优先级？',
    dueDate: '截止日期？',
    duePlaceholder: '例如：今天、24/05/2026...',
    addNote: '添加备注？（可选）',
    notePlaceholder: '例如：第3章，第10-20页...',
    next: '下一步',
    saveBtn: '保存 ↗',
    skip: '跳过',
    cancel: '取消',
    high: '高',
    medium: '中',
    low: '低',
    assignment: '作业',
    quiz: '测验',
    mids: '期中',
    final: '期末',
    presentation: '演示',
    notice: '通知',
    nothingHereYet: '暂无内容。',
    noTasksYet: '暂无任务。',
    noFoldersYet: '暂无文件夹 — 在上方创建一个！',
    noResultsFound: '未找到结果。',
    noRemindersYet: '暂无提醒 — 点击日期添加！',
    noUpcomingReminders: '本月暂无即将到来的提醒。',
  },
  es: {
    dir: 'ltr',
    greeting: 'Hola',
    todayFocus: 'Enfoque de hoy',
    noTasksToday: 'No hay tareas hoy — ¡disfruta el día!',
    addPlaceholder: 'Dile a Amigo… ej: Quiz de Matemáticas el lunes',
    addBtn: 'Agregar ↗',
    chipAssignment: 'Tarea para hoy',
    chipQuiz: 'Quiz el lunes',
    chipMids: 'Parciales la próxima semana',
    chipFinal: 'Examen final',
    today: 'Hoy',
    upcoming: 'Próximo',
    nothingDueToday: 'Nada para hoy.',
    noUpcoming: 'No hay tareas próximas.',
    settingsSaved: '¡Configuración guardada!',
    saved: '¡Guardado! Amigo lo organizó todo.',
    whatType: '¿qué tipo es esto?',
    whichSubject: '¿Qué materia?',
    subjectPlaceholder: 'ej: Física, Programación, Matemáticas...',
    priority: '¿Prioridad?',
    dueDate: '¿Fecha límite?',
    duePlaceholder: 'ej: Hoy, 24/05/2026...',
    addNote: '¿Agregar nota? (opcional)',
    notePlaceholder: 'ej: Capítulo 3, páginas 10-20...',
    next: 'Siguiente',
    saveBtn: 'Guardar ↗',
    skip: 'Omitir',
    cancel: 'Cancelar',
    high: 'Alta',
    medium: 'Media',
    low: 'Baja',
    assignment: 'Tarea',
    quiz: 'Quiz',
    mids: 'Parcial',
    final: 'Final',
    presentation: 'Presentación',
    notice: 'Aviso',
    nothingHereYet: 'Nada aquí todavía.',
    noTasksYet: 'Sin tareas aún.',
    noFoldersYet: 'Sin carpetas — ¡crea una arriba!',
    noResultsFound: 'Sin resultados.',
    noRemindersYet: 'Sin recordatorios — ¡haz clic en una fecha!',
    noUpcomingReminders: 'Sin recordatorios este mes.',
  },
};

// ────────────────────────────────────────────────────────────
// LANGUAGE HELPER
// Call t('key') anywhere to get the translated text
// ────────────────────────────────────────────────────────────
function getLang() {
  return localStorage.getItem('amigo_lang') || 'en';
}
function t(key) {
  const lang = getLang();
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || TRANSLATIONS['en'][key] || key;
}

// Apply language direction and update visible UI text
function applyLanguage(lang) {
  const langData = TRANSLATIONS[lang] || TRANSLATIONS['en'];

  // Set text direction (RTL for Urdu/Arabic)
  document.documentElement.dir = langData.dir;

  // Update greeting
  const name = localStorage.getItem('amigo_name') || 'Student';
  const greetingEl = document.querySelector('.greeting h2');
  if (greetingEl) greetingEl.textContent = `${langData.greeting}, ${name} 👋`;

  // Update AI bar placeholder
  const aiInput = document.getElementById('aiInput');
  if (aiInput) aiInput.placeholder = langData.addPlaceholder;

  // Update Add button
  const addBtn = document.getElementById('addBtn');
  if (addBtn) addBtn.textContent = langData.addBtn;

  // Update chips
  const chips = document.querySelectorAll('.chip');
  const chipKeys = ['chipAssignment', 'chipQuiz', 'chipMids', 'chipFinal'];
  chips.forEach((chip, i) => {
    if (chipKeys[i]) chip.textContent = langData[chipKeys[i]];
  });

  // Update section titles
  const todayTitle = document.querySelector('#section-home .upcoming-section:first-of-type .section-title');
  if (todayTitle) todayTitle.textContent = langData.today;
  const upcomingTitle = document.querySelector('#section-home .upcoming-section:last-of-type .section-title');
  if (upcomingTitle) upcomingTitle.textContent = langData.upcoming;

  // Update focus card title
  const focusTitle = document.querySelector('.focus-title');
  if (focusTitle) focusTitle.textContent = langData.todayFocus;

  // Update empty states currently visible in the DOM
  const focusEmpty = document.querySelector('#focusItems .focus-empty');
  if (focusEmpty) focusEmpty.textContent = langData.noTasksToday;

  const todayEmpty = document.querySelector('#todayList .focus-empty');
  if (todayEmpty) todayEmpty.textContent = langData.nothingDueToday;

  const taskEmpty = document.querySelector('#taskList .focus-empty');
  if (taskEmpty) taskEmpty.textContent = langData.noUpcoming;
}

// ────────────────────────────────────────────────────────────
// ITEMS (tasks) — stored in localStorage
// ────────────────────────────────────────────────────────────
let items = JSON.parse(localStorage.getItem('amigo_items') || '[]');
let flowData = {};
let flowStep = 0;

// Show today's date in the topbar and focus card
const now = new Date();
document.getElementById('topDate').textContent = now.toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
document.getElementById('focusDate').textContent = now.toLocaleDateString('en-US', {
  day: 'numeric', month: 'short', year: 'numeric'
});

// Render all saved items on page load
items.forEach(item => renderItem(item));
sortList('taskList');
['assignment','quiz','mids','presentation','final','notice'].forEach(type => sortList('list-' + type));
updateCounts();

// ────────────────────────────────────────────────────────────
// SETTINGS — load saved values on page load
// ────────────────────────────────────────────────────────────
const savedName    = localStorage.getItem('amigo_name');
const savedPic     = localStorage.getItem('amigo_pic');
const savedUni     = localStorage.getItem('amigo_uni');
const savedProgram = localStorage.getItem('amigo_program');
const savedLang    = localStorage.getItem('amigo_lang') || 'en';

if (savedName) {
  // Use the translation greeting so it respects saved language from the start
  const greetingWord = (TRANSLATIONS[savedLang] || TRANSLATIONS['en']).greeting;
  document.querySelector('.greeting h2').textContent    = `${greetingWord}, ${savedName} 👋`;
  document.querySelector('.profile-info p').textContent = savedName;
  document.querySelector('.avatar').textContent         = savedName.charAt(0).toUpperCase();
  const el = document.getElementById('nameInput');
  if (el) el.value = savedName;
}
if (savedPic) applyProfilePic(savedPic);
if (savedUni) {
  const el = document.getElementById('uniInput');
  if (el) el.value = savedUni;
}
if (savedProgram) {
  const el = document.getElementById('programInput');
  if (el) el.value = savedProgram;
}
if (savedUni && savedProgram) {
  document.querySelector('.profile-info span').textContent = savedUni + ' · ' + savedProgram;
}

// Load saved language into the dropdown and apply it
const langDropdown = document.getElementById('languageInput');
if (langDropdown) langDropdown.value = savedLang;
applyLanguage(savedLang);

// ────────────────────────────────────────────────────────────
// NAVIGATION
// ────────────────────────────────────────────────────────────
function setNav(el, section) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
  const target = document.getElementById('section-' + section);
  if (target) target.style.display = 'block';
}

// ────────────────────────────────────────────────────────────
// AI FLOW — the step-by-step task adding process
// ────────────────────────────────────────────────────────────
function setInput(val) {
  document.getElementById('aiInput').value = val;
  document.getElementById('aiInput').focus();
}
document.getElementById('aiInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') organizePrompt();
});

function organizePrompt() {
  const text = document.getElementById('aiInput').value.trim();
  if (!text) return;
  flowData = { raw: text };
  const flow = document.getElementById('aiFlow');
  flow.innerHTML = `
    <div class="ai-question">"${text}" — ${t('whatType')}</div>
    <div class="ai-options">
      <button class="ai-opt" onclick="pickType('assignment')">${t('assignment')}</button>
      <button class="ai-opt" onclick="pickType('quiz')">${t('quiz')}</button>
      <button class="ai-opt" onclick="pickType('mids')">${t('mids')}</button>
      <button class="ai-opt" onclick="pickType('final')">${t('final')}</button>
      <button class="ai-opt" onclick="pickType('presentation')">${t('presentation')}</button>
      <button class="ai-opt" onclick="pickType('notice')">${t('notice')}</button>
      <button class="ai-opt" onclick="cancelFlow()">${t('cancel')}</button>
    </div>`;
}

function cancelFlow() {
  document.getElementById('aiFlow').innerHTML = '';
  document.getElementById('aiInput').value   = '';
}

function pickType(type) {
  flowData.type = type;
  flowStep = 2;
  showFlowStep();
}

function showFlowStep() {
  const flow = document.getElementById('aiFlow');
  if (flowStep === 2) {
    flow.innerHTML = `
      <div class="ai-question">${t('whichSubject')}</div>
      <div style="display:flex;gap:8px;margin-top:6px;">
        <input id="subjectInput" class="ai-input" style="border:0.5px solid #b8c9e0;border-radius:8px;padding:7px 12px;flex:1;" placeholder="${t('subjectPlaceholder')}" />
        <button class="ai-send" onclick="pickSubject()">${t('next')}</button>
      </div>`;
    setTimeout(() => document.getElementById('subjectInput').focus(), 100);
    document.getElementById('subjectInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') pickSubject();
    });
  } else if (flowStep === 3) {
    flow.innerHTML = `
      <div class="ai-question">${t('priority')}</div>
      <div class="ai-options">
        <button class="ai-opt" onclick="pickPriority('High')">${t('high')}</button>
        <button class="ai-opt" onclick="pickPriority('Medium')">${t('medium')}</button>
        <button class="ai-opt" onclick="pickPriority('Low')">${t('low')}</button>
      </div>`;
  } else if (flowStep === 4) {
    flow.innerHTML = `
      <div class="ai-question">${t('dueDate')}</div>
      <div style="display:flex;gap:8px;margin-top:6px;">
        <input id="dateInput" class="ai-input" style="border:0.5px solid #b8c9e0;border-radius:8px;padding:7px 12px;flex:1;" placeholder="${t('duePlaceholder')}" />
        <button class="ai-send" onclick="pickDue()">${t('next')}</button>
      </div>`;
    setTimeout(() => document.getElementById('dateInput').focus(), 100);
    document.getElementById('dateInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') pickDue();
    });
  } else if (flowStep === 5) {
    flow.innerHTML = `
      <div class="ai-question">${t('addNote')}</div>
      <div style="display:flex;gap:8px;margin-top:6px;">
        <input id="noteInput" class="ai-input" style="border:0.5px solid #b8c9e0;border-radius:8px;padding:7px 12px;flex:1;" placeholder="${t('notePlaceholder')}" />
        <button class="ai-send" onclick="pickNote()">${t('saveBtn')}</button>
      </div>
      <div style="margin-top:6px;">
        <button class="ai-opt" onclick="pickNote()">${t('skip')}</button>
      </div>`;
    setTimeout(() => document.getElementById('noteInput').focus(), 100);
    document.getElementById('noteInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') pickNote();
    });
  }
}

function pickSubject() {
  const val = document.getElementById('subjectInput').value.trim();
  if (!val) return;
  flowData.subject = val;
  flowStep = 3;
  showFlowStep();
}
function pickPriority(p) {
  flowData.priority = p;
  flowStep = 4;
  showFlowStep();
}
function pickDue() {
  const val = document.getElementById('dateInput').value.trim();
  if (!val) return;
  flowData.due = val;
  flowStep = 5;
  showFlowStep();
}
function pickNote() {
  const input = document.getElementById('noteInput');
  flowData.note = input ? input.value.trim() : '';
  saveItem();
}

// ────────────────────────────────────────────────────────────
// DATE HELPERS
// ────────────────────────────────────────────────────────────
function normalizeDate(due) {
  const d = due.toLowerCase().trim().replace(/\s+/g, '');
  const months = {
    jan:0, feb:1, mar:2, apr:3, may:4, jun:5, jul:6, aug:7, sep:8, oct:9, nov:10, dec:11,
    january:0, february:1, march:2, april:3, june:5, july:6, august:7,
    september:8, october:9, november:10, december:11
  };
  for (const [name, idx] of Object.entries(months)) {
    if (d.includes(name)) {
      const withoutMonth = d.replace(name, '');
      const nums = withoutMonth.match(/\d+/g);
      if (nums) {
        const parts = nums.join('').match(/(\d{1,2})(\d{4})|(\d{4})(\d{1,2})/);
        if (parts) {
          const day  = parseInt(parts[1] || parts[4]);
          const year = parseInt(parts[2] || parts[3]);
          return new Date(year, idx, day);
        }
        if (nums.length === 2) return new Date(parseInt(nums[1]), idx, parseInt(nums[0]));
      }
    }
  }
  return null;
}

function isToday(due) {
  const d = due.toLowerCase().trim().replace(/\s+/g, '');
  if (d.includes('today') || d.includes('tonight') || d.includes('aaj')) return true;
  const today     = new Date();
  const dd        = String(today.getDate()).padStart(2, '0');
  const d2        = String(today.getDate());
  const mm        = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy      = String(today.getFullYear());
  const months    = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  const monthName = months[today.getMonth()];
  const formats   = [
    dd+'/'+mm+'/'+yyyy, mm+'/'+dd+'/'+yyyy, yyyy+'-'+mm+'-'+dd,
    d2+monthName+yyyy,  dd+monthName+yyyy,  monthName+d2+yyyy, monthName+dd+yyyy,
  ];
  if (formats.some(f => d.includes(f))) return true;
  const normalized = normalizeDate(due);
  if (normalized) {
    return normalized.getDate()     === today.getDate() &&
           normalized.getMonth()    === today.getMonth() &&
           normalized.getFullYear() === today.getFullYear();
  }
  return false;
}

function parseDate(due) {
  const d = due.toLowerCase().trim();
  if (d.includes('today') || d.includes('tonight') || d.includes('aaj')) return new Date();
  if (d.includes('tomorrow')) {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t;
  }
  const normalized = normalizeDate(due);
  if (normalized && !isNaN(normalized)) return normalized;
  const parsed = new Date(due);
  if (!isNaN(parsed)) return parsed;
  const parts = due.split('/');
  if (parts.length === 3) return new Date(parts[2], parts[1] - 1, parts[0]);
  return new Date(9999, 0, 1);
}

// ────────────────────────────────────────────────────────────
// SAVE & RENDER ITEMS
// ────────────────────────────────────────────────────────────
function saveItem() {
  const item = {
    id:       Date.now(),
    title:    flowData.raw,
    type:     flowData.type,
    subject:  flowData.subject,
    priority: flowData.priority,
    due:      flowData.due,
    note:     flowData.note || ''
  };
  items.push(item);
  localStorage.setItem('amigo_items', JSON.stringify(items));
  document.getElementById('aiFlow').innerHTML = '';
  document.getElementById('aiInput').value   = '';
  document.getElementById('aiStatus').textContent = t('saved');
  setTimeout(() => document.getElementById('aiStatus').textContent = '', 2500);
  renderItem(item);
  sortList('taskList');
  sortList('list-' + item.type);
  updateCounts();
}

function renderItem(item) {
  if (isToday(item.due)) {
    addToFocus(item);
    addToList('todayList', item);
  } else {
    addToList('taskList', item);
  }
  addToList('list-' + item.type, item);
}

function sortList(listId) {
  const list = document.getElementById(listId);
  if (!list) return;
  const cards = Array.from(list.querySelectorAll('.task-item'));
  cards.sort((a, b) => {
    const dueA = a.querySelector('.task-due') ? a.querySelector('.task-due').textContent : '';
    const dueB = b.querySelector('.task-due') ? b.querySelector('.task-due').textContent : '';
    return parseDate(dueA) - parseDate(dueB);
  });
  cards.forEach(c => list.appendChild(c));
}

function updateCounts() {
  const c = { assignment:0, quiz:0, presentation:0, final:0, mids:0 };
  items.forEach(i => { if (c[i.type] !== undefined) c[i.type]++; });
  document.getElementById('sc-assign').textContent = c.assignment;
  document.getElementById('sc-quiz').textContent   = c.quiz;
  document.getElementById('sc-pres').textContent   = c.presentation;
  document.getElementById('sc-final').textContent  = c.final;
  document.getElementById('nb-assign').textContent = c.assignment;
  document.getElementById('nb-quiz').textContent   = c.quiz;
  document.getElementById('nb-mids').textContent   = c.mids;
}

// ────────────────────────────────────────────────────────────
// ICON HELPERS
// ────────────────────────────────────────────────────────────
function iconClass(type) {
  const map = { quiz:'ti-quiz', presentation:'ti-pres', final:'ti-final', notice:'ti-notice', mids:'ti-final' };
  return map[type] || 'ti-assign';
}
function iconName(type) {
  const map = { quiz:'ti-pencil', presentation:'ti-presentation', final:'ti-certificate', notice:'ti-bell', mids:'ti-writing' };
  return map[type] || 'ti-file-text';
}
function urgencyClass(p) {
  if (p === 'High')   return 'u-high';
  if (p === 'Medium') return 'u-med';
  return 'u-low';
}
function dotColor(p) {
  if (p === 'High')   return 'dot-red';
  if (p === 'Medium') return 'dot-amber';
  return 'dot-blue';
}
function tagClass(p) {
  if (p === 'High')   return 'tag-high';
  if (p === 'Medium') return 'tag-med';
  return 'tag-low';
}

// ────────────────────────────────────────────────────────────
// LIST & FOCUS CARD RENDERING
// ────────────────────────────────────────────────────────────
function addToList(listId, item) {
  const list = document.getElementById(listId);
  if (!list) return;
  const empty = list.querySelector('.focus-empty');
  if (empty) empty.remove();
  const div = document.createElement('div');
  div.className = 'task-item';
  div.setAttribute('data-id', item.id);
  div.innerHTML = `
    <div class="task-icon ${iconClass(item.type)}"><i class="ti ${iconName(item.type)}"></i></div>
    <div class="task-info">
      <div class="task-title">${item.title}</div>
      <div class="task-sub">${item.subject}${item.note ? ' — ' + item.note : ''}</div>
    </div>
    <span class="task-due">${item.due}</span>
    <span class="urgency ${urgencyClass(item.priority)}">${item.priority}</span>
    <button class="del-reminder" onclick="deleteItem(${item.id})" title="Delete">
      <i class="ti ti-trash"></i>
    </button>`;
  list.appendChild(div);
}

function deleteItem(id) {
  items = items.filter(i => i.id !== id);
  localStorage.setItem('amigo_items', JSON.stringify(items));
  document.querySelectorAll('[data-id="' + id + '"]').forEach(el => el.remove());
  updateCounts();

  // Restore translated empty messages to lists that are now empty
  const allLists = ['todayList','taskList','list-assignment','list-quiz','list-mids','list-presentation','list-final','list-notice'];
  allLists.forEach(listId => {
    const list = document.getElementById(listId);
    if (list && list.querySelectorAll('.task-item').length === 0) {
      list.innerHTML = `<div class="focus-empty" style="color:#94A3B8;">${t('nothingHereYet')}</div>`;
    }
  });

  // Also check the focus card
  const focus = document.getElementById('focusItems');
  if (focus && focus.querySelectorAll('.focus-item').length === 0) {
    focus.innerHTML = `<div class="focus-empty">${t('noTasksToday')}</div>`;
  }
}

function addToFocus(item) {
  const focus = document.getElementById('focusItems');
  const empty = focus.querySelector('.focus-empty');
  if (empty) empty.remove();
  const div = document.createElement('div');
  div.className = 'focus-item';
  div.setAttribute('data-id', item.id);
  div.innerHTML = `
    <div class="focus-dot ${dotColor(item.priority)}"></div>
    <span class="focus-item-text">${item.title} — ${item.subject}</span>
    <span class="focus-item-tag ${tagClass(item.priority)}">${item.priority}</span>`;
  focus.appendChild(div);
}

// ============================================================
// FOLDERS & UPLOADS
// ============================================================
let folders = JSON.parse(localStorage.getItem('amigo_folders') || '[]');
function saveFolders() {
  const meta = folders.map(f => ({
    id:    f.id,
    name:  f.name,
    files: f.files.map(({ name, key, size, uploadedAt }) => ({ name, key, size, uploadedAt }))
  }));
  localStorage.setItem('amigo_folders', JSON.stringify(meta));
}

// ── IndexedDB helpers ────────────────────────────────────────
function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('amigo_files_db', 1);
    req.onupgradeneeded = e => e.target.result.createObjectStore('files', { keyPath: 'key' });
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = () => reject(req.error);
  });
}
async function saveFileToDB(key, dataUrl) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readwrite');
    tx.objectStore('files').put({ key, dataUrl });
    tx.oncomplete = resolve;
    tx.onerror    = () => reject(tx.error);
  });
}
async function getFileFromDB(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction('files', 'readonly');
    const req = tx.objectStore('files').get(key);
    req.onsuccess = () => resolve(req.result ? req.result.dataUrl : null);
    req.onerror   = () => reject(req.error);
  });
}
async function deleteFileFromDB(key) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('files', 'readwrite');
    tx.objectStore('files').delete(key);
    tx.oncomplete = resolve;
    tx.onerror    = () => reject(tx.error);
  });
}

// ── Folder CRUD ──────────────────────────────────────────────
function createFolder() {
  const input = document.getElementById('folderNameInput');
  const name  = input.value.trim();
  if (!name) return;
  const folder = { id: Date.now(), name, files: [] };
  folders.push(folder);
  saveFolders();
  input.value = '';
  const container = document.getElementById('folderList');
  const empty     = container.querySelector('.focus-empty');
  if (empty) empty.remove();
  renderFolder(folder);
}

function renderFolder(folder) {
  const container = document.getElementById('folderList');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'folder-card';
  div.setAttribute('data-folder-id', folder.id);
  div.innerHTML = `
    <div class="folder-header" onclick="toggleFolder(${folder.id})" style="cursor:pointer;">
      <div style="display:flex;align-items:center;gap:8px;">
        <i class="ti ti-folder" id="ficon-${folder.id}" style="font-size:18px;color:#1a3a6b;"></i>
        <span class="folder-name">${folder.name}</span>
        <span class="folder-count" id="fcount-${folder.id}">${folder.files.length} file${folder.files.length !== 1 ? 's' : ''}</span>
      </div>
      <div style="display:flex;gap:6px;align-items:center;">
        <label class="ai-send" style="cursor:pointer;padding:6px 12px;font-size:12px;display:flex;align-items:center;gap:4px;" onclick="event.stopPropagation()">
          <i class="ti ti-upload"></i> Upload
          <input type="file" multiple style="display:none" onchange="handleUpload(this, ${folder.id})">
        </label>
        <button class="del-reminder" onclick="event.stopPropagation(); deleteFolder(${folder.id})" title="Delete folder">
          <i class="ti ti-trash"></i>
        </button>
        <i class="ti ti-chevron-down" id="fchev-${folder.id}" style="font-size:14px;color:#64748B;transition:transform 0.2s;"></i>
      </div>
    </div>
    <div class="folder-files" id="files-${folder.id}" style="display:none;"></div>`;
  container.appendChild(div);
  folder.files.forEach(f => renderFile(folder.id, f));
}

// ── File helpers ─────────────────────────────────────────────
function getFileIcon(filename) {
  const ext = filename.split('.').pop().toLowerCase();
  if (['jpg','jpeg','png','gif','webp','svg','bmp','ico'].includes(ext)) return 'ti-photo';
  if (ext === 'pdf')                                                      return 'ti-file-type-pdf';
  if (['mp4','mov','webm','avi','mkv'].includes(ext))                     return 'ti-video';
  if (['mp3','wav','ogg','m4a','flac'].includes(ext))                     return 'ti-music';
  if (['doc','docx'].includes(ext))                                       return 'ti-file-word';
  if (['ppt','pptx'].includes(ext))                                       return 'ti-presentation';
  if (['xls','xlsx','csv'].includes(ext))                                 return 'ti-table';
  if (['zip','rar','7z','tar','gz'].includes(ext))                        return 'ti-file-zip';
  if (['js','ts','py','html','css','json','cpp','c','java','php'].includes(ext)) return 'ti-code';
  if (['txt','md'].includes(ext))                                         return 'ti-notes';
  return 'ti-file';
}
function formatBytes(bytes) {
  if (!bytes || bytes === 0) return '—';
  if (bytes < 1024)          return bytes + ' B';
  if (bytes < 1024 * 1024)   return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
function renderFile(folderId, fileData) {
  const list = document.getElementById('files-' + folderId);
  if (!list) return;
  const icon     = getFileIcon(fileData.name);
  const size     = formatBytes(fileData.size);
  const safeName = fileData.name.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const div     = document.createElement('div');
  div.className = 'file-item';
  div.setAttribute('data-file-name', fileData.name);
  div.innerHTML = `
    <i class="ti ${icon}" style="font-size:16px;color:#1a3a6b;flex-shrink:0;"></i>
    <div style="flex:1;min-width:0;">
      <div style="font-size:13px;color:#0F172A;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${fileData.name}</div>
      <div style="font-size:11px;color:#94A3B8;margin-top:1px;">${size}</div>
    </div>
    <button class="del-reminder" onclick="openFile('${safeName}', ${folderId})" title="Open">
      <i class="ti ti-eye"></i>
    </button>
    <button class="del-reminder" onclick="deleteFile('${safeName}', ${folderId})" title="Delete">
      <i class="ti ti-trash"></i>
    </button>`;
  list.appendChild(div);
}

// ── Upload ───────────────────────────────────────────────────
function handleUpload(input, folderId) {
  const folder   = folders.find(f => f.id === folderId);
  if (!folder) return;
  const MAX_MB    = 200;
  const MAX_BYTES = MAX_MB * 1024 * 1024;
  const status    = document.getElementById('aiStatus');
  Array.from(input.files).forEach(file => {
    if (file.size > MAX_BYTES) {
      alert(`"${file.name}" exceeds the ${MAX_MB}MB limit.`);
      return;
    }
    if (status) status.textContent = `Uploading "${file.name}"...`;
    const reader = new FileReader();
    reader.onload = async function(e) {
      const key      = `file_${folderId}_${Date.now()}_${file.name}`;
      await saveFileToDB(key, e.target.result);
      const fileData = { name: file.name, key, size: file.size, uploadedAt: Date.now() };
      folder.files.push(fileData);
      saveFolders();
      renderFile(folderId, fileData);
      updateFolderCount(folderId);
      document.getElementById('files-' + folderId).style.display = 'block';
      const chev = document.getElementById('fchev-' + folderId);
      if (chev) chev.style.transform = 'rotate(180deg)';
      if (status) {
        status.textContent = `"${file.name}" uploaded!`;
        setTimeout(() => status.textContent = '', 2500);
      }
    };
    reader.readAsDataURL(file);
  });
  input.value = '';
}

// ── Open file ────────────────────────────────────────────────
async function openFile(fileName, folderId) {
  const folder = folders.find(f => f.id === folderId);
  if (!folder) return;
  const fileData = folder.files.find(f => f.name === fileName);
  if (!fileData) return;
  const dataUrl = await getFileFromDB(fileData.key);
  if (!dataUrl) {
    alert('File not found. It may have been cleared by the browser.');
    return;
  }
  const ext     = fileName.split('.').pop().toLowerCase();
  const isImage = ['jpg','jpeg','png','gif','webp','svg','bmp'].includes(ext);
  const isPdf   = ext === 'pdf';
  const isVideo = ['mp4','mov','webm','avi'].includes(ext);
  const isAudio = ['mp3','wav','ogg','m4a','flac'].includes(ext);
  const isText  = ['txt','md','json','js','ts','py','html','css','csv','php','c','cpp','java'].includes(ext);
  if (isText) {
    const content = atob(dataUrl.split(',')[1]);
    const win = window.open('', '_blank');
    win.document.write(`<!DOCTYPE html><html><head><title>${fileName}</title>
      <style>*{box-sizing:border-box;margin:0;padding:0}body{background:#0f172a;padding:24px;font-family:Inter,sans-serif}
      pre{background:#1e293b;color:#e2e8f0;padding:20px;border-radius:10px;font-size:13px;line-height:1.7;white-space:pre-wrap;word-break:break-word}
      h3{color:rgba(255,255,255,0.5);font-size:13px;font-weight:400;margin-bottom:16px}</style>
      </head><body><h3>${fileName}</h3>
      <pre>${content.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
      </body></html>`);
    win.document.close();
    return;
  }
  const res     = await fetch(dataUrl);
  const blob    = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  if (isPdf || isImage || isVideo || isAudio) {
    window.open(blobUrl, '_blank');
    setTimeout(() => URL.revokeObjectURL(blobUrl), 60000);
    return;
  }
  const a  = document.createElement('a');
  a.href     = blobUrl;
  a.download = fileName;
  a.click();
  setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
}

// ── Delete file ──────────────────────────────────────────────
async function deleteFile(fileName, folderId) {
  if (!confirm(`Delete "${fileName}"?`)) return;
  const folder   = folders.find(f => f.id === folderId);
  if (!folder) return;
  const fileData = folder.files.find(f => f.name === fileName);
  if (fileData && fileData.key) await deleteFileFromDB(fileData.key);
  folder.files = folder.files.filter(f => f.name !== fileName);
  saveFolders();
  const list = document.getElementById('files-' + folderId);
  if (list) {
    const item = list.querySelector(`[data-file-name="${fileName}"]`);
    if (item) item.remove();
  }
  updateFolderCount(folderId);
}

// ── Delete folder ────────────────────────────────────────────
async function deleteFolder(folderId) {
  const folder = folders.find(f => f.id === folderId);
  if (!folder) return;
  if (!confirm(`Delete folder "${folder.name}" and all its files?`)) return;
  for (const f of folder.files) {
    if (f.key) await deleteFileFromDB(f.key);
  }
  folders = folders.filter(f => f.id !== folderId);
  saveFolders();
  const card = document.querySelector(`[data-folder-id="${folderId}"]`);
  if (card) card.remove();
  const container = document.getElementById('folderList');
  if (container && container.querySelectorAll('.folder-card').length === 0) {
    container.innerHTML = `<div class="focus-empty" style="color:#94A3B8;">${t('noFoldersYet')}</div>`;
  }
}

function updateFolderCount(folderId) {
  const folder = folders.find(f => f.id === folderId);
  const el     = document.getElementById('fcount-' + folderId);
  if (folder && el) el.textContent = folder.files.length + ' file' + (folder.files.length !== 1 ? 's' : '');
}

function toggleFolder(folderId) {
  const files  = document.getElementById('files-' + folderId);
  const chev   = document.getElementById('fchev-' + folderId);
  const icon   = document.getElementById('ficon-' + folderId);
  const isOpen = files.style.display === 'block';
  files.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  if (icon) icon.className = `ti ${isOpen ? 'ti-folder' : 'ti-folder-open'} ` + icon.className.split(' ').slice(2).join(' ');
}

folders.forEach(f => renderFolder(f));

// ============================================================
// TO-DO
// ============================================================
let todos = JSON.parse(localStorage.getItem('amigo_todos') || '[]');
function addTodo() {
  const input = document.getElementById('todoInput');
  const text  = input.value.trim();
  if (!text) return;
  input.value = '';
  const todo = { id: Date.now(), text, done: false };
  todos.push(todo);
  localStorage.setItem('amigo_todos', JSON.stringify(todos));
  renderTodoItem(todo);
}
function renderTodoItem(todo) {
  const list  = document.getElementById('todoList');
  const empty = list.querySelector('.focus-empty');
  if (empty) empty.remove();
  const div   = document.createElement('div');
  div.className = 'todo-item';
  div.id        = 'todo-item-' + todo.id;
  div.innerHTML = `
    <input type="checkbox" class="todo-check" ${todo.done ? 'checked' : ''} onchange="toggleTodo(this,${todo.id})"/>
    <span class="todo-text ${todo.done ? 'done' : ''}" id="todo-${todo.id}">${todo.text}</span>
    <button class="del-reminder" onclick="deleteTodo(${todo.id})"><i class="ti ti-trash"></i></button>`;
  list.appendChild(div);
}
function toggleTodo(checkbox, id) {
  document.getElementById('todo-' + id).classList.toggle('done', checkbox.checked);
  const todo = todos.find(td => td.id === id);
  if (todo) todo.done = checkbox.checked;
  localStorage.setItem('amigo_todos', JSON.stringify(todos));
}
function deleteTodo(id) {
  todos = todos.filter(td => td.id !== id);
  localStorage.setItem('amigo_todos', JSON.stringify(todos));
  const item = document.getElementById('todo-item-' + id);
  if (item) item.remove();
  const list = document.getElementById('todoList');
  if (list && list.querySelectorAll('.todo-item').length === 0) {
    list.innerHTML = `<div class="focus-empty" style="color:#94A3B8;">${t('noTasksYet')}</div>`;
  }
}
todos.forEach(td => renderTodoItem(td));
const todoListEl = document.getElementById('todoList');
if (todoListEl && todos.length > 0) {
  const empty = todoListEl.querySelector('.focus-empty');
  if (empty) empty.remove();
}

// ============================================================
// SETTINGS
// ============================================================
function saveSettings() {
  const name    = document.getElementById('nameInput').value.trim();
  const uni     = document.getElementById('uniInput')      ? document.getElementById('uniInput').value.trim()      : '';
  const program = document.getElementById('programInput')  ? document.getElementById('programInput').value.trim()  : '';
  const lang    = document.getElementById('languageInput') ? document.getElementById('languageInput').value        : 'en';

  // Save and apply language first so t() and greeting use the new lang
  localStorage.setItem('amigo_lang', lang);

  if (name) {
    // Use the newly selected language's greeting word
    const greetingWord = (TRANSLATIONS[lang] || TRANSLATIONS['en']).greeting;
    document.querySelector('.greeting h2').textContent    = `${greetingWord}, ${name} 👋`;
    document.querySelector('.profile-info p').textContent = name;
    document.querySelector('.avatar').textContent         = name.charAt(0).toUpperCase();
    const sd = document.getElementById('settingsNameDisplay');
    if (sd) sd.textContent = name;
    localStorage.setItem('amigo_name', name);
  }

  if (uni)     localStorage.setItem('amigo_uni', uni);
  if (program) localStorage.setItem('amigo_program', program);
  if (uni && program) {
    document.querySelector('.profile-info span').textContent = uni + ' · ' + program;
  }

  applyLanguage(lang);

  document.getElementById('aiStatus').textContent = t('settingsSaved');
  setTimeout(() => document.getElementById('aiStatus').textContent = '', 2000);
  setNav(document.querySelector('.nav-item'), 'home');
}

function uploadProfilePic(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = async function(e) {
    const src = e.target.result;
    try {
      await saveFileToDB('amigo_profile_pic', src);
    } catch(err) {
      console.warn('IndexedDB failed, falling back to localStorage');
      localStorage.setItem('amigo_pic', src);
    }
    applyProfilePic(src);
  };
  reader.readAsDataURL(file);
}

function applyProfilePic(src) {
  const display = document.getElementById('profilePicDisplay');
  const avatar  = document.querySelector('.avatar');
  if (display) display.innerHTML = `<img src="${src}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
  if (avatar)  avatar.innerHTML  = `<img src="${src}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
}

// ============================================================
// CALENDAR
// ============================================================
let calDate      = new Date();
let selectedDate = null;
let reminders    = JSON.parse(localStorage.getItem('amigo_reminders') || '[]');

function renderCalendar() {
  const year        = calDate.getFullYear();
  const month       = calDate.getMonth();
  document.getElementById('calMonthLabel').textContent = calDate.toLocaleDateString('en-US', { month:'long', year:'numeric' });
  const grid        = document.getElementById('calGrid');
  grid.innerHTML    = '';
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();
  const today       = new Date();
  const eventDates  = new Set();
  items.forEach(item => {
    const d = parseDate(item.due);
    if (d.getFullYear() === year && d.getMonth() === month) eventDates.add(d.getDate());
  });
  reminders.forEach(r => {
    const d = new Date(r.date);
    if (d.getFullYear() === year && d.getMonth() === month) eventDates.add(d.getDate());
  });
  for (let i = firstDay - 1; i >= 0; i--) {
    const cell = document.createElement('div');
    cell.className   = 'cal-cell other-month';
    cell.textContent = daysInPrev - i;
    grid.appendChild(cell);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement('div');
    cell.className   = 'cal-cell';
    cell.textContent = d;
    if (d === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.classList.add('today');
    }
    if (eventDates.has(d)) cell.classList.add('has-event');
    const dateStr = year + '-' + String(month + 1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
    cell.onclick = () => openReminderModal(dateStr);
    grid.appendChild(cell);
  }
  const remaining = (grid.children.length % 7 === 0) ? 0 : 7 - (grid.children.length % 7);
  for (let d = 1; d <= remaining; d++) {
    const cell = document.createElement('div');
    cell.className   = 'cal-cell other-month';
    cell.textContent = d;
    grid.appendChild(cell);
  }
}

function changeMonth(dir) {
  calDate.setMonth(calDate.getMonth() + dir);
  renderCalendar();
}
function openReminderModal(dateStr) {
  selectedDate = dateStr;
  const label  = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric' });
  document.getElementById('selectedDateLabel').textContent = label;
  document.getElementById('reminderModal').style.display  = 'block';
  document.getElementById('reminderTitle').focus();
}
function closeReminderModal() {
  document.getElementById('reminderModal').style.display = 'none';
  document.getElementById('reminderTitle').value         = '';
}
function saveReminder() {
  const title = document.getElementById('reminderTitle').value.trim();
  const type  = document.getElementById('reminderType').value;
  const time  = document.getElementById('reminderTime').value;
  if (!title) return;
  const reminder = { id: Date.now(), title, type, date: selectedDate, time: time || '08:00' };
  reminders.push(reminder);
  localStorage.setItem('amigo_reminders', JSON.stringify(reminders));
  closeReminderModal();
  renderReminderList();
  renderCalendar();
  scheduleNotification(reminder);
  updateNotifBadge();
}
function renderReminderList() {
  const list = document.getElementById('reminderList');
  list.innerHTML = '';
  if (reminders.length === 0) {
    list.innerHTML = `<div class="focus-empty">${t('noRemindersYet')}</div>`;
    document.getElementById('reminderCount').textContent = '0 reminders';
    return;
  }
  const sorted = [...reminders].sort((a, b) => new Date(a.date) - new Date(b.date));
  document.getElementById('reminderCount').textContent = sorted.length + ' reminder' + (sorted.length > 1 ? 's' : '');
  sorted.forEach(r => {
    const div       = document.createElement('div');
    div.className   = 'task-item';
    const dateLabel = new Date(r.date + 'T00:00:00').toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
    div.innerHTML   = `
      <div class="task-icon ${iconClass(r.type)}"><i class="ti ${iconName(r.type)}"></i></div>
      <div class="task-info">
        <div class="task-title">${r.title}</div>
        <div class="task-sub">${r.type} — ${r.time}</div>
      </div>
      <span class="task-due">${dateLabel}</span>
      <button class="del-reminder" onclick="deleteReminder(${r.id})"><i class="ti ti-trash"></i></button>`;
    list.appendChild(div);
  });
}
function deleteReminder(id) {
  reminders = reminders.filter(r => r.id !== id);
  localStorage.setItem('amigo_reminders', JSON.stringify(reminders));
  renderReminderList();
  renderCalendar();
  updateNotifBadge();
}
function scheduleNotification(reminder) {
  if (!('Notification' in window)) return;
  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') return;
    const [hours, minutes] = reminder.time.split(':').map(Number);
    const notifTime        = new Date(reminder.date + 'T00:00:00');
    notifTime.setHours(hours, minutes, 0, 0);
    const delay = notifTime.getTime() - Date.now();
    if (delay <= 0) return;
    setTimeout(() => new Notification('Amigo Reminder', { body: reminder.title, icon: '/favicon.ico' }), delay);
  });
}
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}
renderCalendar();
renderReminderList();

// ============================================================
// SEARCH
// ============================================================
function toggleSearch() {
  const panel  = document.getElementById('searchPanel');
  const isOpen = panel.style.display === 'block';
  panel.style.display = isOpen ? 'none' : 'block';
  if (!isOpen) setTimeout(() => document.getElementById('searchInput').focus(), 100);
  document.getElementById('notifPanel').style.display = 'none';
}
function doSearch() {
  const query   = document.getElementById('searchInput').value.trim().toLowerCase();
  const results = document.getElementById('searchResults');
  results.innerHTML = '';
  if (!query) return;
  const matches = items.filter(i =>
    i.title.toLowerCase().includes(query)   ||
    i.subject.toLowerCase().includes(query) ||
    i.type.toLowerCase().includes(query)    ||
    (i.note && i.note.toLowerCase().includes(query))
  );
  if (matches.length === 0) {
    results.innerHTML = `<div class="focus-empty" style="color:#94A3B8;">${t('noResultsFound')}</div>`;
    return;
  }
  matches.forEach(item => {
    const div     = document.createElement('div');
    div.className = 'task-item';
    div.style.background = '#fff';
    div.innerHTML = `
      <div class="task-icon ${iconClass(item.type)}"><i class="ti ${iconName(item.type)}"></i></div>
      <div class="task-info">
        <div class="task-title">${item.title}</div>
        <div class="task-sub">${item.subject} — ${item.type}</div>
      </div>
      <span class="task-due">${item.due}</span>
      <span class="urgency ${urgencyClass(item.priority)}">${item.priority}</span>`;
    results.appendChild(div);
  });
}

// ============================================================
// NOTIFICATIONS
// ============================================================
function toggleNotifications() {
  const panel  = document.getElementById('notifPanel');
  const isOpen = panel.style.display === 'block';
  panel.style.display = isOpen ? 'none' : 'block';
  document.getElementById('searchPanel').style.display = 'none';
  if (!isOpen) renderNotifPanel();
}
function getUpcomingReminders() {
  const now        = new Date();
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  return reminders.filter(r => {
    const d = new Date(r.date + 'T00:00:00');
    return d >= now && d <= endOfMonth;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
}
function renderNotifPanel() {
  const list     = document.getElementById('notifList');
  const upcoming = getUpcomingReminders();
  list.innerHTML  = '';
  if (upcoming.length === 0) {
    list.innerHTML = `<div class="focus-empty" style="padding:16px;color:#94A3B8;">${t('noUpcomingReminders')}</div>`;
    return;
  }
  upcoming.forEach(r => {
    const div       = document.createElement('div');
    div.className   = 'task-item';
    const dateLabel = new Date(r.date + 'T00:00:00').toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric' });
    div.innerHTML   = `
      <div class="task-icon ${iconClass(r.type)}"><i class="ti ${iconName(r.type)}"></i></div>
      <div class="task-info">
        <div class="task-title">${r.title}</div>
        <div class="task-sub">${dateLabel} at ${r.time}</div>
      </div>`;
    list.appendChild(div);
  });
}
function updateNotifBadge() {
  const badge = document.getElementById('notifBadge');
  const count = getUpcomingReminders().length;
  if (count > 0) {
    badge.style.display = 'block';
    badge.textContent   = count;
  } else {
    badge.style.display = 'none';
  }
}
document.addEventListener('click', e => {
  const notifPanel  = document.getElementById('notifPanel');
  const searchPanel = document.getElementById('searchPanel');
  if (!e.target.closest('#notifPanel')  && !e.target.closest('.icon-btn')) notifPanel.style.display  = 'none';
  if (!e.target.closest('#searchPanel') && !e.target.closest('.icon-btn')) searchPanel.style.display = 'none';
});
updateNotifBadge();

// ============================================================
// AUTH HANDLERS
// ============================================================
function switchTab(tab) {
  document.getElementById('form-login').style.display  = tab === 'login'  ? 'block' : 'none';
  document.getElementById('form-signup').style.display = tab === 'signup' ? 'block' : 'none';
  document.getElementById('tab-login').style.background  = tab === 'login'  ? '#fff' : 'transparent';
  document.getElementById('tab-signup').style.background = tab === 'signup' ? '#fff' : 'transparent';
  document.getElementById('tab-login').style.color  = tab === 'login'  ? '#0F172A' : '#64748B';
  document.getElementById('tab-signup').style.color = tab === 'signup' ? '#0F172A' : '#64748B';
}
async function handleLogin() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const errEl    = document.getElementById('loginError');
  errEl.style.display = 'none';
  if (!email || !password) {
    errEl.textContent = 'fill in everything bestie 🙏';
    errEl.style.display = 'block';
    return;
  }
  errEl.textContent = 'signing you in...';
  errEl.style.color = '#1a3a6b';
  errEl.style.background = '#e8eef7';
  errEl.style.display = 'block';
  const error = await signInWithEmail(email, password);
  if (error) {
    errEl.textContent = 'wrong email or password 😬';
    errEl.style.color = '#EF4444';
    errEl.style.background = '#FEE2E2';
    errEl.style.display = 'block';
    return;
  }
  initAuth();
}
async function handleSignup() {
  const name     = document.getElementById('signupName').value.trim();
  const email    = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const errEl    = document.getElementById('signupError');
  const sucEl    = document.getElementById('signupSuccess');
  errEl.style.display = 'none';
  sucEl.style.display = 'none';
  if (!name || !email || !password) {
    errEl.textContent = 'fill in everything bestie 🙏';
    errEl.style.display = 'block';
    return;
  }
  if (password.length < 6) {
    errEl.textContent = 'password too short — at least 6 chars 🔐';
    errEl.style.display = 'block';
    return;
  }
  errEl.textContent = 'creating your account...';
  errEl.style.color = '#1a3a6b';
  errEl.style.background = '#e8eef7';
  errEl.style.display = 'block';
  const error = await signUpWithEmail(email, password, name);
  if (error) {
    errEl.textContent = error;
    errEl.style.color = '#EF4444';
    errEl.style.background = '#FEE2E2';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';
  sucEl.textContent = 'account created! check your email to confirm ✅';
  sucEl.style.display = 'block';
}
async function handleForgotPassword() {
  const email = document.getElementById('loginEmail').value.trim();
  const errEl = document.getElementById('loginError');
  if (!email) {
    errEl.textContent = 'enter your email first 📧';
    errEl.style.color = '#EF4444';
    errEl.style.background = '#FEE2E2';
    errEl.style.display = 'block';
    return;
  }
  const { error } = await _supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'https://amigo-lilac.vercel.app'
  });
  if (error) {
    errEl.textContent = 'something went wrong 😬';
    errEl.style.color = '#EF4444';
    errEl.style.background = '#FEE2E2';
    errEl.style.display = 'block';
    return;
  }
  errEl.textContent = 'reset link sent! check your email 📩';
  errEl.style.color = '#16A34A';
  errEl.style.background = '#DCFCE7';
  errEl.style.display = 'block';
}

// ============================================================
// FEEDBACK / EMAILJS
// ============================================================
emailjs.init('82oFX8G_FfVMfS3Uj');
async function sendFeedback() {
  const name    = document.getElementById('feedbackName').value.trim();
  const email   = document.getElementById('feedbackEmail').value.trim();
  const message = document.getElementById('feedbackMessage').value.trim();
  const status  = document.getElementById('feedbackStatus');
  if (!name || !email || !message) {
    status.textContent = 'fill in everything bestie 🙏';
    status.style.background = '#FEE2E2';
    status.style.color = '#DC2626';
    status.style.display = 'block';
    return;
  }
  status.textContent = 'sending...';
  status.style.background = '#e8eef7';
  status.style.color = '#1a3a6b';
  status.style.display = 'block';
  try {
    await emailjs.send('service_64oaeq2', 'template_mf8v8kh', {
      from_name:  name,
      from_email: email,
      message:    message
    });
    status.textContent = 'sent! we got it and will get back to you 🙌';
    status.style.background = '#DCFCE7';
    status.style.color = '#16A34A';
    document.getElementById('feedbackName').value    = '';
    document.getElementById('feedbackEmail').value   = '';
    document.getElementById('feedbackMessage').value = '';
  } catch (err) {
    status.textContent = 'something went wrong 😬 try again';
    status.style.background = '#FEE2E2';
    status.style.color = '#DC2626';
  }
}