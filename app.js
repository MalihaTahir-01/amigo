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
  // Update AI bar placeholder and button
  const aiInput = document.getElementById('aiInput');
  if (aiInput) aiInput.placeholder = langData.addPlaceholder;
  // Update chips
  const chips = document.querySelectorAll('.chip');
  const chipKeys = ['chipAssignment', 'chipQuiz', 'chipMids', 'chipFinal'];
  const chipActions = ['Assignment due today', 'Quiz on Monday', 'Mids next week', 'Final exam on 10 June'];
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
  // Update empty states
  const focusEmpty = document.querySelector('#focusItems .focus-empty');
  if (focusEmpty) focusEmpty.textContent = langData.noTasksToday;
}
// ────────────────────────────────────────────────────────────
// ITEMS (tasks) — stored in localStorage
// ────────────────────────────────────────────────────────────
let items = JSON.parse(localStorage.getItem('amigo_items') || '[]');
let flowData = {};
let flowStep = 0;
// One-time migration: tasks saved before the date-resolution fix may still hold
// raw relative text ("today", "tomorrow", "monday"...) as their due date instead
// of an absolute YYYY-MM-DD. Normalize those now so they sort/expire correctly.
const isoDateRe = /^\d{4}-\d{2}-\d{2}$/;
let itemsMigrated = false;
items.forEach(item => {
  if (item.due && !isoDateRe.test(item.due)) {
    item.due = localDateStr(parseDate(item.due));
    itemsMigrated = true;
  }
});
if (itemsMigrated) localStorage.setItem('amigo_items', JSON.stringify(items));
// Show today's date in the topbar
const now = new Date();
document.getElementById('topDate').textContent = now.toLocaleDateString('en-US', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
const focusDateEl = document.getElementById('focusDate');
if (focusDateEl) focusDateEl.textContent = now.toLocaleDateString('en-US', {
  day: 'numeric', month: 'short', year: 'numeric'
});
// Remove any tasks whose (now-absolute) due date has already passed, then render the rest
expireOldTasks();
if (itemsMigrated) saveUserData();
// Render all saved items on page load
items.forEach(item => renderItem(item));
sortList('taskList');
['assignment','quiz','mids','presentation','final','notice'].forEach(type => sortList('list-' + type));
updateCounts();
// ────────────────────────────────────────────────────────────
// SETTINGS — load saved values on page load
// ────────────────────────────────────────────────────────────
const savedName    = localStorage.getItem('amigo_name');
const savedPic     = localStorage.getItem('amigo_pic_cache');
const savedUni     = localStorage.getItem('amigo_uni');
const savedProgram = localStorage.getItem('amigo_program');
const savedLang    = localStorage.getItem('amigo_lang') || 'en';
if (savedName) {
  document.querySelector('.greeting h2').textContent    = `Hello, ${savedName} 👋`;
  document.querySelector('.profile-info p').textContent = savedName;
  document.querySelector('.avatar').textContent         = savedName.charAt(0).toUpperCase();
  const el = document.getElementById('nameInput');
  if (el) el.value = savedName;
}
if (savedPic) applyProfilePic(savedPic);
// The cached URL above may be expired (signed URLs last 1 hour) or this may
// be a device that's never had it cached at all — fetch a fresh one from
// cloud storage in the background so the real picture shows up either way.
getFileUrlFromCloud('amigo_profile_pic').then(url => {
  if (url) { applyProfilePic(url); localStorage.setItem('amigo_pic_cache', url); }
});
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
  // Remove active class from all nav items
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  // Hide all sections, then show the selected one
  document.querySelectorAll('.page-section').forEach(s => s.style.display = 'none');
  const target = document.getElementById('section-' + section);
  if (target) target.style.display = 'block';
}
// Used by the mobile header's settings shortcut icon — finds the actual
// Settings nav-item so it gets highlighted the same way a normal tap would.
function goToSettingsFromHeader() {
  const settingsNav = document.querySelector('.nav-item[onclick*="settings"]');
  if (settingsNav) setNav(settingsNav, 'settings');
}
// ────────────────────────────────────────────────────────────
// AI FLOW — real AI parsing (calls /api/parse-task), with the old
// scripted button flow kept as an automatic fallback if the AI call fails
// ────────────────────────────────────────────────────────────
function setInput(val) {
  const el = document.getElementById('aiInput');
  if (!el) return;
  el.value = val;
  el.focus();
}
const homeAiInput = document.getElementById('aiInput');
if (homeAiInput) homeAiInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') organizePrompt();
});
async function organizePrompt() {
  const text = document.getElementById('aiInput').value.trim();
  if (!text) return;
  flowData = { raw: text };
  const flow = document.getElementById('aiFlow');
  flow.innerHTML = `<div class="ai-question">"${text}" — reading this...</div>`;
  try {
    const res = await fetch('/api/parse-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) {
      let detail = '';
      try { detail = (await res.json()).error || ''; } catch (e) {}
      throw new Error(`AI service unavailable (${res.status}) ${detail}`);
    }
    const parsed = await res.json();
    if (!parsed || !parsed.type) throw new Error('AI response missing fields');
    flowData.type     = parsed.type;
    flowData.subject  = parsed.subject;
    flowData.priority = parsed.priority;
    flowData.due      = parsed.due; // already an absolute YYYY-MM-DD from the server, or null if it genuinely wasn't stated
    flowData.note     = parsed.note || '';
    if (!flowData.due) {
      askForMissingDue('aiFlow');
    } else {
      showAIReview('aiFlow');
    }
  } catch (err) {
    console.warn('AI parsing failed, falling back to manual flow:', err);
    startManualFlow(text);
  }
}
// Shown only when the AI understood everything except the date — asks for
// just that one thing instead of re-running the whole manual flow. Once
// answered, continues on to the normal editable review (which already has
// everything else pre-filled) so nothing else needs to be re-entered.
function askForMissingDue(targetId) {
  targetId = targetId || 'aiFlow';
  const flow = document.getElementById(targetId);
  flow.innerHTML = `
    <div class="ai-question">Got the rest — just need the date. When is this ${escapeAttr(t(flowData.type) || flowData.type)} due?</div>
    <div class="ai-flow-row">
      <input id="missingDue-${targetId}" type="date" class="ai-input-boxed" value="${localDateStr(new Date())}" />
      <button class="ai-send" onclick="confirmMissingDue('${targetId}')">Continue</button>
    </div>`;
  setTimeout(() => { const el = document.getElementById('missingDue-' + targetId); if (el) el.focus(); }, 0);
}
function confirmMissingDue(targetId) {
  targetId = targetId || 'aiFlow';
  const val = document.getElementById('missingDue-' + targetId).value;
  flowData.due = val || localDateStr(new Date());
  showAIReview(targetId);
}
// Editable review step shown after a successful AI parse — nothing is saved
// until the person confirms, so a wrong AI guess never silently goes in.
function escapeAttr(s) {
  return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
}
function showAIReview(targetId) {
  targetId = targetId || 'aiFlow';
  const flow = document.getElementById(targetId);
  const isEdit = !!flowData.editId;
  const lockedType = flowData.lockedType;
  flow.innerHTML = `
    <div class="ai-question">${isEdit ? 'Edit the details and save:' : 'Got it — check the details and save:'}</div>
    <div class="ai-flow-row">
      <select id="reviewType-${targetId}" class="reminder-select" ${lockedType ? 'disabled' : ''}>
        <option value="assignment">${t('assignment')}</option>
        <option value="quiz">${t('quiz')}</option>
        <option value="mids">${t('mids')}</option>
        <option value="final">${t('final')}</option>
        <option value="presentation">${t('presentation')}</option>
        <option value="notice">${t('notice')}</option>
      </select>
    </div>
    <div class="ai-flow-row">
      <input id="reviewSubject-${targetId}" class="ai-input-boxed" placeholder="${t('subjectPlaceholder')}" value="${escapeAttr(flowData.subject || '')}" />
    </div>
    <div class="ai-options" id="reviewPriorityOpts-${targetId}">
      <button type="button" class="ai-opt" onclick="setReviewPriority('High','${targetId}')" data-p="High">${t('high')}</button>
      <button type="button" class="ai-opt" onclick="setReviewPriority('Medium','${targetId}')" data-p="Medium">${t('medium')}</button>
      <button type="button" class="ai-opt" onclick="setReviewPriority('Low','${targetId}')" data-p="Low">${t('low')}</button>
    </div>
    <div class="ai-flow-row">
      <input id="reviewDue-${targetId}" type="date" class="ai-input-boxed" value="${escapeAttr(flowData.due || '')}" />
    </div>
    <div class="ai-flow-row">
      <input id="reviewNote-${targetId}" class="ai-input-boxed" placeholder="${t('notePlaceholder')}" value="${escapeAttr(flowData.note || '')}" />
      <button class="ai-send" onclick="confirmAIReview('${targetId}')">${isEdit ? 'Save changes' : t('saveBtn')}</button>
    </div>`;
  document.getElementById('reviewType-' + targetId).value = lockedType || flowData.type || 'assignment';
  setReviewPriority(flowData.priority || 'Medium', targetId);
}
function setReviewPriority(p, targetId) {
  targetId = targetId || 'aiFlow';
  flowData.priority = p;
  document.querySelectorAll('#reviewPriorityOpts-' + targetId + ' .ai-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.p === p);
  });
}
function confirmAIReview(targetId) {
  targetId = targetId || 'aiFlow';
  flowData.type    = flowData.lockedType || document.getElementById('reviewType-' + targetId).value;
  flowData.subject = document.getElementById('reviewSubject-' + targetId).value.trim() || 'General';
  flowData.due     = document.getElementById('reviewDue-' + targetId).value || flowData.due;
  flowData.note    = document.getElementById('reviewNote-' + targetId).value.trim();
  if (!flowData.priority) flowData.priority = 'Medium';
  saveItem(targetId);
}
// ────────────────────────────────────────────────────────────
// QUICK ADD (folder "+" buttons) & EDIT — reuse the same AI parse +
// editable review flow as the home input bar, just inside a small modal.
// ────────────────────────────────────────────────────────────
function openQuickAddModal(lockedType) {
  const existing = document.getElementById('quickAddModal');
  if (existing) existing.remove();
  const isEdit = !!flowData.editId;
  const modal = document.createElement('div');
  modal.id = 'quickAddModal';
  modal.className = 'task-detail-overlay';
  modal.innerHTML = `
    <div class="task-detail-sheet">
      <div class="task-detail-handle"></div>
      <div class="ai-question quick-add-title">${isEdit ? 'Edit task' : 'Add a task'}</div>
      ${isEdit ? '' : `
      <div class="ai-input-row quick-add-input-row">
        <i class="ti ti-sparkles ai-sparkle-icon"></i>
        <input class="ai-input" id="quickAddInput" placeholder="e.g. ${lockedType ? t(lockedType) + ' — chapter 4, due Tuesday' : 'Math quiz on Monday'}" />
        <button class="ai-send" onclick="quickAddOrganize('${lockedType || ''}')">Add ↗</button>
      </div>`}
      <div id="quickAddFlow" class="ai-flow"></div>
      <button class="task-detail-btn task-detail-btn-close quick-add-close" onclick="document.getElementById('quickAddModal').remove()">Close</button>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);

  if (isEdit) {
    showAIReview('quickAddFlow');
  } else {
    flowData = { lockedType: lockedType || null };
    setTimeout(() => {
      const el = document.getElementById('quickAddInput');
      if (!el) return;
      el.focus();
      el.addEventListener('keydown', e => { if (e.key === 'Enter') quickAddOrganize(lockedType || ''); });
    }, 50);
  }
}
async function quickAddOrganize(lockedType) {
  const input = document.getElementById('quickAddInput');
  const text = input ? input.value.trim() : '';
  if (!text) return;
  flowData = { raw: text, lockedType: lockedType || null };
  const flow = document.getElementById('quickAddFlow');
  flow.innerHTML = `<div class="ai-question">"${text}" — reading this...</div>`;
  try {
    const res = await fetch('/api/parse-task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('AI service unavailable (' + res.status + ')');
    const parsed = await res.json();
    if (!parsed || !parsed.type) throw new Error('AI response missing fields');
    flowData.type     = lockedType || parsed.type;
    flowData.subject  = parsed.subject;
    flowData.priority = parsed.priority;
    flowData.due      = parsed.due; // null if genuinely not stated — handled below
    flowData.note     = parsed.note || '';
  } catch (err) {
    console.warn('Quick-add AI parse failed, opening blank editable form:', err);
    // Don't lose what they typed — land on the same editable review with
    // sensible defaults so they can just fill in the blanks and save.
    flowData.type     = lockedType || 'assignment';
    flowData.subject  = '';
    flowData.priority = 'Medium';
    flowData.due      = localDateStr(new Date());
    flowData.note     = '';
  }
  if (!flowData.due) {
    askForMissingDue('quickAddFlow');
  } else {
    showAIReview('quickAddFlow');
  }
}
// Opens the quick-add modal pre-filled with an existing item's data, in edit mode
function openEditItem(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  flowData = {
    editId:   item.id,
    raw:      item.title,
    type:     item.type,
    subject:  item.subject,
    priority: item.priority,
    due:      item.due,
    note:     item.note || ''
  };
  openQuickAddModal();
}
// ────────────────────────────────────────────────────────────
// MANUAL FLOW — fallback only, used when the AI call fails
// (kept fully intact so the app still works if the API key isn't set yet)
// ────────────────────────────────────────────────────────────
function startManualFlow(text) {
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
// Shows the correct step in the task-adding flow
function showFlowStep() {
  const flow = document.getElementById('aiFlow');
  if (flowStep === 2) {
    // Step 2: Ask for subject
    flow.innerHTML = `
      <div class="ai-question">${t('whichSubject')}</div>
      <div class="ai-flow-row">
        <input id="subjectInput" class="ai-input-boxed" placeholder="${t('subjectPlaceholder')}" />
        <button class="ai-send" onclick="pickSubject()">${t('next')}</button>
      </div>`;
    setTimeout(() => document.getElementById('subjectInput').focus(), 100);
    document.getElementById('subjectInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') pickSubject();
    });
  } else if (flowStep === 3) {
    // Step 3: Ask for priority
    flow.innerHTML = `
      <div class="ai-question">${t('priority')}</div>
      <div class="ai-options">
        <button class="ai-opt" onclick="pickPriority('High')">${t('high')}</button>
        <button class="ai-opt" onclick="pickPriority('Medium')">${t('medium')}</button>
        <button class="ai-opt" onclick="pickPriority('Low')">${t('low')}</button>
      </div>`;
  } else if (flowStep === 4) {
    // Step 4: Ask for due date
    flow.innerHTML = `
      <div class="ai-question">${t('dueDate')}</div>
      <div class="ai-flow-row">
        <input id="dateInput" class="ai-input-boxed" placeholder="${t('duePlaceholder')}" />
        <button class="ai-send" onclick="pickDue()">${t('next')}</button>
      </div>`;
    setTimeout(() => document.getElementById('dateInput').focus(), 100);
    document.getElementById('dateInput').addEventListener('keydown', e => {
      if (e.key === 'Enter') pickDue();
    });
  } else if (flowStep === 5) {
    // Step 5: Optional note
    flow.innerHTML = `
      <div class="ai-question">${t('addNote')}</div>
      <div class="ai-flow-row">
        <input id="noteInput" class="ai-input-boxed" placeholder="${t('notePlaceholder')}" />
        <button class="ai-send" onclick="pickNote()">${t('saveBtn')}</button>
      </div>
      <div class="ai-flow-skip">
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
// Converts text like "24may2026" into a proper Date object
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
// Is this ISO due date exactly tomorrow?
function isTomorrow(due) {
  if (!due) return false;
  const t = new Date(); t.setDate(t.getDate() + 1);
  return due === localDateStr(t);
}
// Is this item overdue (due date in the past, and not completed)?
function isOverdueItem(item) {
  if (!item.due || item.completed) return false;
  return item.due < localDateStr(new Date());
}
function daysOverdue(due) {
  const todayD = new Date(localDateStr(new Date()));
  const dueD   = new Date(due);
  return Math.max(1, Math.round((todayD - dueD) / 86400000));
}
// Checks if a due date string means today
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
// Converts a due date string to a Date object for sorting
function parseDate(due) {
  if (!due) return new Date(9999, 0, 1);
  const d = due.toLowerCase().trim();

  if (d.includes('today') || d.includes('tonight') || d.includes('aaj')) return new Date();

  if (d.includes('tomorrow')) {
    const t = new Date(); t.setDate(t.getDate() + 1); return t;
  }

  // "next week" / "next month"
  if (d.includes('next week')) {
    const t = new Date(); t.setDate(t.getDate() + 7); return t;
  }
  if (d.includes('next month')) {
    const t = new Date(); t.setMonth(t.getMonth() + 1); return t;
  }

  // Day names: "monday", "on monday", "this monday"
  const dayNames = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
  for (let i = 0; i < dayNames.length; i++) {
    if (d.includes(dayNames[i])) {
      const today = new Date();
      const todayDay = today.getDay();
      let diff = i - todayDay;
      if (diff <= 0) diff += 7; // always next occurrence
      const t = new Date();
      t.setDate(today.getDate() + diff);
      return t;
    }
  }

  // Try normalizeDate (handles "24may2026", "24/05/2026" etc)
  const normalized = normalizeDate(due);
  if (normalized && !isNaN(normalized)) return normalized;

  // Try DD/MM/YYYY
  const parts = due.split('/');
  if (parts.length === 3) {
    const attempt = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    if (!isNaN(attempt)) return attempt;
  }

  // Try native Date parse as last resort
  const parsed = new Date(due);
  if (!isNaN(parsed)) return parsed;

  return new Date(9999, 0, 1);
}

// ────────────────────────────────────────────────────────────
// SAVE & RENDER ITEMS
// ────────────────────────────────────────────────────────────
function saveItem(targetId) {
  targetId = targetId || 'aiFlow';
  // Resolve whatever the person typed ("today", "tomorrow", "24 may", "monday"...)
  // into an absolute calendar date ONCE, at save time. Without this, a task saved
  // as "today" would keep re-evaluating as "today" forever, since parseDate()/isToday()
  // re-read the raw word fresh every render — it never actually expires.
  const resolvedDue = localDateStr(parseDate(flowData.due));

  if (flowData.editId) {
    // ── EDIT MODE: update the existing item in place ──
    const idx = items.findIndex(i => i.id === flowData.editId);
    if (idx !== -1) {
      items[idx] = {
        ...items[idx],
        type:     flowData.type,
        subject:  flowData.subject,
        priority: flowData.priority,
        due:      resolvedDue,
        note:     flowData.note || ''
      };
      localStorage.setItem('amigo_items', JSON.stringify(items));
      saveUserData();
      refreshItemDOM(items[idx]);
    }
  } else {
    // ── CREATE MODE: brand new item ──
    const item = {
      id:       Date.now(),
      title:    flowData.raw,
      type:     flowData.type,
      subject:  flowData.subject,
      priority: flowData.priority,
      due:      resolvedDue,
      note:     flowData.note || '',
      completed: false
    };
    items.push(item);
    localStorage.setItem('amigo_items', JSON.stringify(items));
    saveUserData();
    renderItem(item);
    sortList('taskList');
    sortList('list-' + item.type);
  }

  updateCounts();

  // Clear whichever input surface this came from
  const flow = document.getElementById(targetId);
  if (flow) flow.innerHTML = '';
  if (targetId === 'aiFlow') {
    const input = document.getElementById('aiInput');
    if (input) input.value = '';
  }
  const quickModal = document.getElementById('quickAddModal');
  if (quickModal) quickModal.remove();

  showToast(t('saved'));
  flowData = {};
}
// Removes an item's existing DOM cards everywhere and re-renders it fresh —
// used after an edit, since due date/type/priority all affect which
// list(s) the card belongs in and how it's sorted.
// ============================================================
// GLOBAL TOAST — see the CSS comment above this rule for why this exists
// ============================================================
let toastTimer = null;
function showToast(message, isError) {
  const el = document.getElementById('toast');
  if (!el) { console.log('[toast]', message); return; }
  el.textContent = message;
  el.className = 'toast show' + (isError ? ' toast-error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { el.classList.remove('show'); }, 3000);
}
function refreshItemDOM(item) {
  document.querySelectorAll('[data-id="' + item.id + '"]').forEach(el => el.remove());
  renderItem(item);
  sortList('taskList');
  sortList('list-' + item.type);
}
function renderItem(item) {
  if (isToday(item.due)) {
    addToFocus(item);
    addToList('todayList', item);
  } else if (isTomorrow(item.due)) {
    // Home's "Upcoming" is intentionally narrow — only tomorrow, not the whole week.
    addToList('taskList', item);
  }
  addToList('list-' + item.type, item);
  renderHomeStats();
}
// Sort a task list by due date (earliest first)
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
// Update the count badges in the sidebar and each Tasks block header
function updateCounts() {
  const c = { assignment:0, quiz:0, presentation:0, final:0, mids:0, notice:0 };
  items.forEach(i => { if (c[i.type] !== undefined && !i.completed) c[i.type]++; });
  Object.keys(c).forEach(type => {
    const badge = document.getElementById('tbc-' + type);
    if (badge) badge.textContent = c[type] + ' loaded';
  });
  const total = c.assignment + c.quiz + c.presentation + c.final + c.mids + c.notice;
  const nbTasks = document.getElementById('nb-tasks');
  if (nbTasks) nbTasks.textContent = total;
  renderHomeStats();
}
// Home page stat row: Due today / This week / Overdue / Completed
function renderHomeStats() {
  const elToday = document.getElementById('stat-due-today');
  const elWeek  = document.getElementById('stat-this-week');
  const elOver  = document.getElementById('stat-overdue');
  const elDone  = document.getElementById('stat-completed');
  if (!elToday && !elWeek && !elOver && !elDone) return;

  const todayStr = localDateStr(new Date());
  const weekEnd  = new Date(); weekEnd.setDate(weekEnd.getDate() + 7);
  const weekEndStr = localDateStr(weekEnd);

  let dueToday = 0, thisWeek = 0, overdue = 0, completed = 0;
  items.forEach(i => {
    if (i.completed) { completed++; return; }
    if (!i.due) return;
    if (i.due === todayStr) dueToday++;
    if (i.due >= todayStr && i.due <= weekEndStr) thisWeek++;
    if (i.due < todayStr) overdue++;
  });

  if (elToday) elToday.textContent = dueToday;
  if (elWeek)  elWeek.textContent  = thisWeek;
  if (elOver)  elOver.textContent  = overdue;
  if (elDone)  elDone.textContent  = completed;
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
function showTaskDetail(item) {
  const existing = document.getElementById('taskDetailModal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'taskDetailModal';
  modal.className = 'task-detail-overlay';
  modal.innerHTML = `
    <div class="task-detail-sheet">
      <div class="task-detail-handle"></div>
      <div class="task-detail-head">
        <div class="task-icon task-icon-lg ${iconClass(item.type)}">
          <i class="ti ${iconName(item.type)}"></i>
        </div>
        <div>
          <div class="task-detail-title">${item.title}</div>
          <div class="task-detail-subject">${item.subject}</div>
        </div>
      </div>
      <div class="task-detail-info">
        <div class="task-detail-info-row">
          <span class="task-detail-info-label">Type</span>
          <span class="task-detail-info-value">${item.type}</span>
        </div>
        <div class="task-detail-info-row">
          <span class="task-detail-info-label">Due</span>
          <span class="task-detail-info-value">${item.due}</span>
        </div>
        <div class="task-detail-info-row">
          <span class="task-detail-info-label">Priority</span>
          <span class="urgency urgency-sm ${urgencyClass(item.priority)}">${item.priority}</span>
        </div>
        ${item.note ? `<div class="task-detail-info-row">
          <span class="task-detail-info-label">Note</span>
          <span class="task-detail-info-value">${item.note}</span>
        </div>` : ''}
      </div>
      <div class="task-detail-actions">
        <button onclick="document.getElementById('taskDetailModal').remove()" class="task-detail-btn task-detail-btn-close">Close</button>
        <button onclick="document.getElementById('taskDetailModal').remove();openEditItem(${item.id});" class="task-detail-btn task-detail-btn-edit">Edit</button>
        <button onclick="deleteItem(${item.id});document.getElementById('taskDetailModal').remove();" class="task-detail-btn task-detail-btn-delete">Delete</button>
      </div>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}
function addToList(listId, item) {
  const list = document.getElementById(listId);
  if (!list) return;
  // Remove the "empty" placeholder if it exists (list empty-states use
  // focus-empty-light, the home focus card uses focus-empty — match both)
  const empty = list.querySelector('.focus-empty, .focus-empty-light');
  if (empty) empty.remove();
  const div = document.createElement('div');
  div.className = 'task-item';
  div.setAttribute('data-id', item.id);
  div.style.cursor = 'pointer';
  div.addEventListener('click', e => {
    if (e.target.closest('.del-reminder') || e.target.closest('.edit-reminder')) return;
    showTaskDetail(item);
  });
  const overdue = isOverdueItem(item);
  const dueLabel = item.completed
    ? 'Done'
    : (overdue ? 'Overdue ' + daysOverdue(item.due) + 'd' : item.due);
  if (item.completed) div.classList.add('task-item-done');
  div.innerHTML = `
    <div class="item-checkbox ${item.completed ? 'checked' : ''}" onclick="event.stopPropagation(); toggleItemComplete(${item.id})"><i class="ti ti-check"></i></div>
    <div class="task-icon ${iconClass(item.type)}"><i class="ti ${iconName(item.type)}"></i></div>
    <div class="task-info">
      <div class="task-title">${item.title}</div>
      <div class="task-sub">${item.subject}${item.note ? ' — ' + item.note : ''}</div>
    </div>
    <span class="task-due ${overdue ? 'task-due-overdue' : ''}">${dueLabel}</span>
    <span class="urgency ${urgencyClass(item.priority)}">${item.priority}</span>
    <button class="edit-reminder" onclick="openEditItem(${item.id})" title="Edit">
      <i class="ti ti-edit"></i>
    </button>
    <button class="del-reminder" onclick="deleteItem(${item.id})" title="Delete">
      <i class="ti ti-trash"></i>
    </button>`;
  list.appendChild(div);
}
// Toggle an item's completed state — this is now the ONLY way an overdue
// item leaves the "needs attention" state. Nothing auto-deletes anymore.
function toggleItemComplete(id) {
  const item = items.find(i => i.id === id);
  if (!item) return;
  item.completed = !item.completed;
  localStorage.setItem('amigo_items', JSON.stringify(items));
  saveUserData();
  refreshItemDOM(item);
  updateCounts();
}
function deleteItem(id) {
  items = items.filter(i => i.id !== id);
  localStorage.setItem('amigo_items', JSON.stringify(items));
  saveUserData();
  // Remove all cards with this id from the DOM
  document.querySelectorAll('[data-id="' + id + '"]').forEach(el => el.remove());
  updateCounts();
  // Add "empty" message back to any list that is now empty
  const allLists = ['todayList','taskList','list-assignment','list-quiz','list-mids','list-presentation','list-final','list-notice'];
  allLists.forEach(listId => {
    const list = document.getElementById(listId);
    if (list && list.querySelectorAll('.task-item').length === 0) {
      list.innerHTML = '<div class="focus-empty focus-empty-light">Nothing here yet.</div>';
    }
  });
  // Also check the focus card
  const focus = document.getElementById('focusItems');
  if (focus && focus.querySelectorAll('.focus-item').length === 0) {
    focus.innerHTML = `<div class="focus-empty">${t('noTasksToday')}</div>`;
  }
  updateNotifBadge();
  if (document.getElementById('notifPanel').style.display === 'block') {
    renderNotifPanel();
  }
  updateNotifBadge();
  if (document.getElementById('notifPanel').style.display === 'block') {
    renderNotifPanel();
  }
}
function addToFocus(item) {
  const focus = document.getElementById('focusItems');
  if (!focus) return;
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
// Files are stored in IndexedDB (supports large files).
// Folder names/metadata are stored in localStorage.
// ============================================================
let folders = JSON.parse(localStorage.getItem('amigo_folders') || '[]');
function saveFolders() {
  // Only save metadata (not file contents) to localStorage
  const meta = folders.map(f => ({
    id:    f.id,
    name:  f.name,
    files: f.files.map(({ name, key, size, uploadedAt }) => ({ name, key, size, uploadedAt }))
  }));
  localStorage.setItem('amigo_folders', JSON.stringify(meta));
}
// ── Supabase Storage helpers ─────────────────────────────────
// NOTE: files used to live only in this browser's IndexedDB — a local
// per-device store. Only the folder/file NAMES synced to the cloud, never
// the actual file bytes, which is why a file uploaded on one device could
// never be opened on another, and why browsers occasionally evicted it
// entirely after a period of inactivity. Files now go straight into a
// private Supabase Storage bucket ("user-files"), scoped per-account by a
// path like "<your-user-id>/<key>" — the same storage every device reads
// from, and nothing a browser can silently clear.
async function getCurrentUserId() {
  const { data } = await _supabase.auth.getSession();
  return data.session ? data.session.user.id : null;
}
async function uploadFileToCloud(key, file) {
  const userId = await getCurrentUserId();
  if (!userId) throw new Error('Not signed in');
  const { error } = await _supabase.storage
    .from('user-files')
    .upload(`${userId}/${key}`, file, { upsert: true });
  if (error) throw error;
}
async function getFileUrlFromCloud(key) {
  const userId = await getCurrentUserId();
  if (!userId) return null;
  const { data, error } = await _supabase.storage
    .from('user-files')
    .createSignedUrl(`${userId}/${key}`, 3600); // valid 1 hour, generated fresh each open
  if (error) return null;
  return data.signedUrl;
}
async function deleteFileFromCloud(key) {
  const userId = await getCurrentUserId();
  if (!userId) return;
  await _supabase.storage.from('user-files').remove([`${userId}/${key}`]);
}
// ── Folder CRUD ──────────────────────────────────────────────
function createFolder() {
  const input = document.getElementById('folderNameInput');
  const name  = input.value.trim();
  if (!name) return;
  const folder = { id: Date.now(), name, files: [] };
  folders.push(folder);
  saveFolders();
  saveUserData();
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
    <div class="folder-header" onclick="toggleFolder(${folder.id})">
      <div class="folder-header-left">
        <i class="ti ti-folder folder-icon" id="ficon-${folder.id}"></i>
        <span class="folder-name">${folder.name}</span>
        <span class="folder-count" id="fcount-${folder.id}">${folder.files.length} file${folder.files.length !== 1 ? 's' : ''}</span>
      </div>
      <div class="folder-header-right">
        <label class="ai-send folder-upload-btn" onclick="event.stopPropagation()">
          <i class="ti ti-upload"></i> Upload
          <input type="file" multiple style="display:none" onchange="handleUpload(this, ${folder.id})">
        </label>
        <button class="del-reminder" onclick="event.stopPropagation(); deleteFolder(${folder.id})" title="Delete folder">
          <i class="ti ti-trash"></i>
        </button>
        <i class="ti ti-chevron-down folder-chevron" id="fchev-${folder.id}"></i>
      </div>
    </div>
    <div class="folder-files" id="files-${folder.id}" style="display:none;"></div>`;
  container.appendChild(div);
  // Render any files that were previously saved in this folder
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
    <i class="ti ${icon} file-icon"></i>
    <div class="file-info">
      <div class="file-name">${fileData.name}</div>
      <div class="file-size">${size}</div>
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
  // Supabase's free tier caps individual uploads at 50MB (Pro removes this
  // cap) — matching that here so you get a clear message before uploading,
  // instead of the bucket silently rejecting a bigger file after the fact.
  const MAX_MB    = 50;
  const MAX_BYTES = MAX_MB * 1024 * 1024;
  Array.from(input.files).forEach(async file => {
    if (file.size > MAX_BYTES) {
      alert(`"${file.name}" exceeds the ${MAX_MB}MB limit.`);
      return;
    }
    showToast(`Uploading "${file.name}"...`);
    try {
      const key = `file_${folderId}_${Date.now()}_${file.name}`;
      await uploadFileToCloud(key, file);
      const fileData = { name: file.name, key, size: file.size, uploadedAt: Date.now() };
      folder.files.push(fileData);
      saveFolders();
      saveUserData();
      renderFile(folderId, fileData);
      updateFolderCount(folderId);
      // Auto-open the folder after upload
      document.getElementById('files-' + folderId).style.display = 'block';
      const chev = document.getElementById('fchev-' + folderId);
      if (chev) chev.style.transform = 'rotate(180deg)';
      showToast(`"${file.name}" uploaded — available on all your devices now!`);
    } catch (err) {
      console.error('Upload failed:', err);
      showToast(`Couldn't upload "${file.name}" — ${err.message || 'check your connection and try again'}.`, true);
    }
  });
  input.value = '';
}
// ── Open file ────────────────────────────────────────────────
async function openFile(fileName, folderId) {
  const folder = folders.find(f => f.id === folderId);
  if (!folder) return;
  const fileData = folder.files.find(f => f.name === fileName);
  if (!fileData) return;
  const url = await getFileUrlFromCloud(fileData.key);
  if (!url) {
    alert("Couldn't reach that file — check your connection and try again.");
    return;
  }
  const ext     = fileName.split('.').pop().toLowerCase();
  const isText  = ['txt','md','json','js','ts','py','html','css','csv','php','c','cpp','java'].includes(ext);
  if (isText) {
    const content = await (await fetch(url)).text();
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
  // Signed URLs work directly as real HTTP links — images/PDFs/video/audio
  // open inline, everything else triggers a normal browser download.
  const ext2Known = ['jpg','jpeg','png','gif','webp','svg','bmp','pdf','mp4','mov','webm','avi','mp3','wav','ogg','m4a','flac'];
  if (ext2Known.includes(ext)) {
    window.open(url, '_blank');
  } else {
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  }
}
// ── Delete file ──────────────────────────────────────────────
async function deleteFile(fileName, folderId) {
  if (!confirm(`Delete "${fileName}"?`)) return;
  const folder   = folders.find(f => f.id === folderId);
  if (!folder) return;
  const fileData = folder.files.find(f => f.name === fileName);
  if (fileData && fileData.key) await deleteFileFromCloud(fileData.key);
  folder.files = folder.files.filter(f => f.name !== fileName);
  saveFolders();
  saveUserData();
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
    if (f.key) await deleteFileFromCloud(f.key);
  }
  folders = folders.filter(f => f.id !== folderId);
  saveFolders();
  saveUserData();
  const card = document.querySelector(`[data-folder-id="${folderId}"]`);
  if (card) card.remove();
  const container = document.getElementById('folderList');
  if (container && container.querySelectorAll('.folder-card').length === 0) {
    container.innerHTML = '<div class="focus-empty focus-empty-light">No folders yet — create one above!</div>';
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

// Accordion for the merged Tasks page — click a header (Assignments/Quizzes/
// Mids/Presentations/Finals/Notices) to expand or collapse that block's list.
function toggleTaskBlock(type) {
  const list = document.getElementById('list-' + type);
  const chev = document.getElementById('tchev-' + type);
  if (!list) return;
  const isOpen = list.style.display === 'block';
  list.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
}
// ============================================================
// TIMETABLE
// Multiple named schedule folders (University, Job, Internship, etc.),
// each holding its own list of classes/shifts. Same folder-card visual
// pattern as Uploads, just holding structured class data instead of files.
// ============================================================
const WEEKDAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
let scheduleFolders = JSON.parse(localStorage.getItem('amigo_schedule_folders') || '[]');
let ttImportPending = []; // classes extracted by AI import, pending review before saving
function saveScheduleFolders() {
  localStorage.setItem('amigo_schedule_folders', JSON.stringify(scheduleFolders));
  if (typeof renderLiveClassWidget === 'function') renderLiveClassWidget();
}
// ── Schedule folder CRUD ─────────────────────────────────────
function createScheduleFolder() {
  const input = document.getElementById('scheduleFolderNameInput');
  const name  = input.value.trim();
  if (!name) return;
  const folder = { id: Date.now(), name, classes: [] };
  scheduleFolders.push(folder);
  saveScheduleFolders();
  saveUserData();
  input.value = '';
  const container = document.getElementById('scheduleFolderList');
  const empty = container.querySelector('.focus-empty-light');
  if (empty) empty.remove();
  renderScheduleFolder(folder);
}
function renderScheduleFolder(folder) {
  const container = document.getElementById('scheduleFolderList');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'folder-card';
  div.setAttribute('data-schedule-folder-id', folder.id);
  div.innerHTML = `
    <div class="folder-header" onclick="toggleScheduleFolder(${folder.id})">
      <div class="folder-header-left">
        <i class="ti ti-calendar-time folder-icon" id="sficon-${folder.id}"></i>
        <span class="folder-name">${escapeAttr(folder.name)}</span>
        <span class="folder-count" id="sfcount-${folder.id}">${folder.classes.length} class${folder.classes.length !== 1 ? 'es' : ''}</span>
      </div>
      <div class="folder-header-right">
        <button class="ai-send folder-upload-btn" onclick="event.stopPropagation(); openAddClassModal(${folder.id})">
          <i class="ti ti-plus"></i> Add Class
        </button>
        <button class="del-reminder" onclick="event.stopPropagation(); deleteScheduleFolder(${folder.id})" title="Delete schedule">
          <i class="ti ti-trash"></i>
        </button>
        <i class="ti ti-chevron-down folder-chevron" id="sfchev-${folder.id}"></i>
      </div>
    </div>
    <div class="folder-files" id="sfclasses-${folder.id}" style="display:none;"></div>`;
  container.appendChild(div);
  renderScheduleClasses(folder.id);
}
function toggleScheduleFolder(folderId) {
  const list = document.getElementById('sfclasses-' + folderId);
  const chev = document.getElementById('sfchev-' + folderId);
  const icon = document.getElementById('sficon-' + folderId);
  if (!list) return;
  const isOpen = list.style.display === 'block';
  list.style.display = isOpen ? 'none' : 'block';
  if (chev) chev.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  if (icon) icon.className = `ti ${isOpen ? 'ti-calendar-time' : 'ti-calendar-time'} folder-icon`;
}
function deleteScheduleFolder(folderId) {
  const folder = scheduleFolders.find(f => f.id === folderId);
  if (!folder) return;
  if (!confirm(`Delete schedule "${folder.name}" and all its classes?`)) return;
  scheduleFolders = scheduleFolders.filter(f => f.id !== folderId);
  saveScheduleFolders();
  saveUserData();
  const card = document.querySelector(`[data-schedule-folder-id="${folderId}"]`);
  if (card) card.remove();
  const container = document.getElementById('scheduleFolderList');
  if (container && container.querySelectorAll('.folder-card').length === 0) {
    container.innerHTML = '<div class="focus-empty-light">No schedules yet — create one above!</div>';
  }
}
// ── Classes within a schedule folder, grouped by weekday ────
function renderScheduleClasses(folderId) {
  const folder = scheduleFolders.find(f => f.id === folderId);
  const list   = document.getElementById('sfclasses-' + folderId);
  if (!folder || !list) return;
  list.innerHTML = '';
  if (folder.classes.length === 0) {
    list.innerHTML = '<div class="focus-empty-light">No classes yet — tap "Add Class" above.</div>';
    return;
  }
  if (folder.mode === 'dated') {
    renderDatedScheduleClasses(folder, list);
    return;
  }
  WEEKDAYS.forEach(day => {
    const dayClasses = folder.classes
      .filter(c => c.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    if (dayClasses.length === 0) return;
    const header = document.createElement('div');
    header.className = 'schedule-day-header';
    header.textContent = day;
    list.appendChild(header);
    dayClasses.forEach(cls => list.appendChild(renderClassRow(folderId, cls)));
  });
}
// For date-based schedules (exam datesheets, one-time events): group by the
// actual calendar date, walk every day from the earliest to the latest date
// present — including days with nothing scheduled, which show explicitly
// rather than just being skipped — so it reads like "Monday, this date:
// these are the exams... Tuesday, this date: nothing on this day."
function renderDatedScheduleClasses(folder, list) {
  const dated = folder.classes.filter(c => c.date);
  if (dated.length === 0) {
    list.innerHTML = '<div class="focus-empty-light">No dated entries yet.</div>';
    return;
  }
  const byDate = {};
  dated.forEach(c => { (byDate[c.date] = byDate[c.date] || []).push(c); });
  const sortedDates = Object.keys(byDate).sort();
  const cursor = new Date(sortedDates[0] + 'T00:00:00');
  const last = new Date(sortedDates[sortedDates.length - 1] + 'T00:00:00');
  while (cursor <= last) {
    const iso = localDateStr(cursor);
    const weekday = WEEKDAYS[(cursor.getDay() + 6) % 7];
    const displayDate = cursor.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
    const header = document.createElement('div');
    header.className = 'schedule-day-header';
    header.textContent = `${weekday}, ${displayDate}`;
    list.appendChild(header);
    const entries = (byDate[iso] || []).sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
    if (entries.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'focus-empty-light';
      empty.textContent = 'No classes or exams on this day.';
      list.appendChild(empty);
    } else {
      entries.forEach(cls => list.appendChild(renderClassRow(folder.id, cls)));
    }
    cursor.setDate(cursor.getDate() + 1);
  }
}
function renderClassRow(folderId, cls) {
  const div = document.createElement('div');
  div.className = 'task-item';
  div.setAttribute('data-class-id', cls.id);
  const sub = [formatTimeRange(cls.startTime, cls.endTime), cls.room, cls.teacher].filter(Boolean).join(' — ');
  div.innerHTML = `
    <div class="task-icon"><i class="ti ti-clock"></i></div>
    <div class="task-info">
      <div class="task-title">${escapeAttr(cls.subject)}</div>
      <div class="task-sub">${sub}</div>
    </div>
    <button class="edit-reminder" onclick="openEditClassModal(${folderId}, ${cls.id})" title="Edit"><i class="ti ti-edit"></i></button>
    <button class="del-reminder" onclick="deleteClass(${folderId}, ${cls.id})" title="Delete"><i class="ti ti-trash"></i></button>`;
  return div;
}
function formatTime12(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return h12 + ':' + String(m).padStart(2, '0') + ' ' + period;
}
function formatTimeRange(start, end) {
  return formatTime12(start) + ' – ' + formatTime12(end);
}
// ── Add / Edit class modal ───────────────────────────────────
function openAddClassModal(folderId) {
  openClassModal(folderId, null);
}
function openEditClassModal(folderId, classId) {
  openClassModal(folderId, classId);
}
function openClassModal(folderId, classId) {
  const folder = scheduleFolders.find(f => f.id === folderId);
  if (!folder) return;
  const isDated = folder.mode === 'dated';
  const existing = classId ? folder.classes.find(c => c.id === classId) : null;
  const vals = existing || { subject: '', day: WEEKDAYS[0], date: localDateStr(new Date()), startTime: '09:00', endTime: '10:00', teacher: '', room: '' };

  const modal = document.createElement('div');
  modal.id = 'classModal';
  modal.className = 'task-detail-overlay';
  modal.innerHTML = `
    <div class="task-detail-sheet">
      <div class="task-detail-handle"></div>
      <div class="ai-question quick-add-title">${existing ? 'Edit class' : 'Add a class'}</div>

      <div class="settings-field">
        <label class="settings-label">Subject</label>
        <input id="clsSubject" class="ai-input-boxed" type="text" placeholder="e.g. Physics" value="${escapeAttr(vals.subject)}" />
      </div>
      <div class="settings-field">
        ${isDated
          ? `<label class="settings-label">Date</label>
             <input id="clsDate" class="ai-input-boxed" type="date" value="${vals.date || localDateStr(new Date())}" />`
          : `<label class="settings-label">Day</label>
             <select id="clsDay" class="reminder-select">
               ${WEEKDAYS.map(d => `<option value="${d}" ${d === vals.day ? 'selected' : ''}>${d}</option>`).join('')}
             </select>`}
      </div>
      <div class="ai-flow-row">
        <div class="settings-field" style="flex:1;">
          <label class="settings-label">Start time</label>
          <input id="clsStart" class="ai-input-boxed" type="time" value="${vals.startTime}" />
        </div>
        <div class="settings-field" style="flex:1;">
          <label class="settings-label">End time</label>
          <input id="clsEnd" class="ai-input-boxed" type="time" value="${vals.endTime}" />
        </div>
      </div>
      <div class="settings-field">
        <label class="settings-label">Teacher (optional)</label>
        <input id="clsTeacher" class="ai-input-boxed" type="text" placeholder="e.g. Dr. Ahmed" value="${escapeAttr(vals.teacher || '')}" />
      </div>
      <div class="settings-field">
        <label class="settings-label">Room (optional)</label>
        <input id="clsRoom" class="ai-input-boxed" type="text" placeholder="e.g. Room 204" value="${escapeAttr(vals.room || '')}" />
      </div>

      <div class="ai-flow-row" style="margin-top:4px;">
        <button class="task-detail-btn task-detail-btn-close" onclick="document.getElementById('classModal').remove()">Cancel</button>
        <button class="ai-send" onclick="saveClass(${folderId}, ${classId || 'null'})">${existing ? 'Save changes' : 'Add'}</button>
      </div>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}
function saveClass(folderId, classId) {
  const folder = scheduleFolders.find(f => f.id === folderId);
  if (!folder) return;
  const subject = document.getElementById('clsSubject').value.trim();
  if (!subject) return;
  const isDated = folder.mode === 'dated';
  const dateVal = isDated ? (document.getElementById('clsDate').value || localDateStr(new Date())) : null;
  const data = {
    subject,
    day:       isDated ? WEEKDAYS[(new Date(dateVal + 'T00:00:00').getDay() + 6) % 7] : document.getElementById('clsDay').value,
    date:      dateVal,
    startTime: document.getElementById('clsStart').value || '09:00',
    endTime:   document.getElementById('clsEnd').value || '10:00',
    teacher:   document.getElementById('clsTeacher').value.trim(),
    room:      document.getElementById('clsRoom').value.trim(),
  };
  if (classId) {
    const idx = folder.classes.findIndex(c => c.id === classId);
    if (idx !== -1) folder.classes[idx] = { ...folder.classes[idx], ...data };
  } else {
    folder.classes.push({ id: Date.now(), ...data });
  }
  saveScheduleFolders();
  saveUserData();
  renderScheduleClasses(folderId);
  updateScheduleFolderCount(folderId);
  const modal = document.getElementById('classModal');
  if (modal) modal.remove();
}
function deleteClass(folderId, classId) {
  const folder = scheduleFolders.find(f => f.id === folderId);
  if (!folder) return;
  if (!confirm('Delete this class from the schedule?')) return;
  folder.classes = folder.classes.filter(c => c.id !== classId);
  saveScheduleFolders();
  saveUserData();
  renderScheduleClasses(folderId);
  updateScheduleFolderCount(folderId);
}
function updateScheduleFolderCount(folderId) {
  const folder = scheduleFolders.find(f => f.id === folderId);
  const el = document.getElementById('sfcount-' + folderId);
  if (folder && el) el.textContent = folder.classes.length + ' class' + (folder.classes.length !== 1 ? 'es' : '');
}
// ── AI Timetable Import — upload a photo/PDF/Excel of a real timetable and
// let Gemini pull out the classes, reviewed and editable before anything saves ──
function openTimetableImportModal() {
  const existing = document.getElementById('timetableImportModal');
  if (existing) existing.remove();
  ttImportPending = [];
  const folderOptions = scheduleFolders.map(f => `<option value="${f.id}">${escapeAttr(f.name)}</option>`).join('');
  const modal = document.createElement('div');
  modal.id = 'timetableImportModal';
  modal.className = 'task-detail-overlay';
  modal.innerHTML = `
    <div class="task-detail-sheet">
      <div class="task-detail-handle"></div>
      <div class="ai-question quick-add-title">Import timetable with AI</div>

      <div class="settings-field">
        <label class="settings-label">Import into</label>
        <select id="ttImportTarget" class="reminder-select" onchange="document.getElementById('ttImportNewNameRow').style.display = this.value==='__new__' ? 'flex' : 'none';">
          ${folderOptions}
          <option value="__new__" ${scheduleFolders.length === 0 ? 'selected' : ''}>+ New schedule…</option>
        </select>
      </div>
      <div class="settings-field" id="ttImportNewNameRow" style="${scheduleFolders.length === 0 ? '' : 'display:none;'}">
        <label class="settings-label">New schedule name</label>
        <input id="ttImportNewName" class="ai-input-boxed" type="text" placeholder="e.g. University Timetable" />
      </div>
      <div class="settings-field">
        <label class="settings-label">Photo, PDF, or Excel file of the timetable</label>
        <input id="ttImportFile" class="ai-input-boxed" type="file" accept="image/*,.pdf,.xlsx,.xls,.csv" />
      </div>
      <div class="settings-field">
        <label class="settings-label">Optional — narrow it down</label>
        <input id="ttImportCommand" class="ai-input-boxed" type="text" placeholder="e.g. only my Monday classes, or BSAI section 3" />
      </div>

      <div class="ai-flow-row" style="margin-top:4px;">
        <button class="task-detail-btn task-detail-btn-close" onclick="document.getElementById('timetableImportModal').remove()">Cancel</button>
        <button class="ai-send" onclick="runTimetableImport()">Import</button>
      </div>
      <div id="ttImportFlow" class="ai-flow"></div>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
}
function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result || '';
      const comma = result.indexOf(',');
      resolve(comma !== -1 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.readAsDataURL(file);
  });
}
function readSpreadsheetAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = new Uint8Array(reader.result);
        const wb = XLSX.read(data, { type: 'array' });
        let text = '';
        wb.SheetNames.forEach(name => {
          text += `Sheet: ${name}\n` + XLSX.utils.sheet_to_csv(wb.Sheets[name]) + '\n\n';
        });
        resolve(text);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Could not read the file'));
    reader.readAsArrayBuffer(file);
  });
}
async function runTimetableImport() {
  const fileInput = document.getElementById('ttImportFile');
  const file = fileInput.files[0];
  const command = document.getElementById('ttImportCommand').value.trim();
  const flow = document.getElementById('ttImportFlow');
  if (!file) { flow.innerHTML = '<div class="ai-question">Pick a photo, PDF, or Excel file first.</div>'; return; }

  flow.innerHTML = '<div class="ai-question">Reading the timetable — this can take up to a minute for a full page of classes…</div>';
  await attemptTimetableImport(file, command, flow);
}
async function attemptTimetableImport(file, command, flow) {
  try {
    const isSpreadsheet = /\.(xlsx|xls|csv)$/i.test(file.name) ||
      (file.type && (file.type.includes('sheet') || file.type === 'text/csv' || file.type === 'application/vnd.ms-excel'));
    let body;
    if (isSpreadsheet) {
      body = { command, textContent: await readSpreadsheetAsText(file) };
    } else {
      body = { command, mimeType: file.type || 'application/octet-stream', fileBase64: await readFileAsBase64(file) };
    }
    const res = await fetch('/api/parse-timetable', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      let detail = '';
      try { detail = (await res.json()).error || ''; } catch (e) {}
      throw new Error(`AI service unavailable (${res.status}) ${detail}`);
    }
    const data = await res.json();
    const classes = Array.isArray(data.classes) ? data.classes : [];
    if (classes.length === 0) {
      flow.innerHTML = `<div class="ai-question">Couldn't find any classes in that file${data.note ? ' — ' + escapeAttr(data.note) : ''}. Try a clearer photo, or add classes manually.</div>`;
      return;
    }
    ttImportPending = classes.map((c, i) => ({ ...c, _tempId: 'tt' + i }));
    renderTimetableImportReview(data.note || '');
  } catch (err) {
    console.error('Timetable import failed:', err);
    // Store the file/command so "Try again" doesn't require re-picking the file —
    // Google's API being briefly overloaded shouldn't cost the person a re-upload.
    window._lastTtImportRetry = () => attemptTimetableImport(file, command, flow);
    flow.innerHTML = `
      <div class="ai-question">Couldn't read that file (${escapeAttr(err.message)}).</div>
      <div class="ai-flow-row">
        <button class="ai-send" onclick="window._lastTtImportRetry()">Try again</button>
      </div>`;
  }
}
function renderTimetableImportReview(note) {
  const flow = document.getElementById('ttImportFlow');
  if (!flow) return;
  const isDated = ttImportPending.some(c => c.date);
  if (isDated) {
    ttImportPending.sort((a, b) => (a.date || '').localeCompare(b.date || '') || (a.startTime || '').localeCompare(b.startTime || ''));
  }
  const rowsHtml = ttImportPending.map(c => `
    <div class="task-item" data-tt-temp-id="${c._tempId}">
      <div class="task-info" style="flex:1;">
        <div class="ai-flow-row">
          <input class="ai-input-boxed" style="flex:2;" value="${escapeAttr(c.subject)}" onchange="updateTtImportField('${c._tempId}','subject',this.value)" />
          ${isDated
            ? `<input class="ai-input-boxed" type="date" value="${c.date || localDateStr(new Date())}" onchange="updateTtImportField('${c._tempId}','date',this.value)" />`
            : `<select class="reminder-select" onchange="updateTtImportField('${c._tempId}','day',this.value)">
                 ${WEEKDAYS.map(d => `<option value="${d}" ${d === c.day ? 'selected' : ''}>${d}</option>`).join('')}
               </select>`}
        </div>
        <div class="ai-flow-row">
          <input class="ai-input-boxed" type="time" value="${c.startTime}" onchange="updateTtImportField('${c._tempId}','startTime',this.value)" />
          <input class="ai-input-boxed" type="time" value="${c.endTime}" onchange="updateTtImportField('${c._tempId}','endTime',this.value)" />
        </div>
        <div class="ai-flow-row">
          <input class="ai-input-boxed" placeholder="Teacher" value="${escapeAttr(c.teacher || '')}" onchange="updateTtImportField('${c._tempId}','teacher',this.value)" />
          <input class="ai-input-boxed" placeholder="Room" value="${escapeAttr(c.room || '')}" onchange="updateTtImportField('${c._tempId}','room',this.value)" />
        </div>
      </div>
      <button class="del-reminder" onclick="removeTtImportRow('${c._tempId}')" title="Remove"><i class="ti ti-trash"></i></button>
    </div>`).join('');
  flow.innerHTML = `
    <div class="ai-question">${note ? escapeAttr(note) + ' — ' : ''}Found ${ttImportPending.length} class${ttImportPending.length !== 1 ? 'es' : ''}${isDated ? ' (shown by exact date)' : ''}. Review and edit before adding:</div>
    <div id="ttImportRows">${rowsHtml}</div>
    <div class="ai-flow-row" style="margin-top:4px;">
      <button class="ai-send" onclick="confirmTimetableImport()">Add ${ttImportPending.length} Class${ttImportPending.length !== 1 ? 'es' : ''}</button>
    </div>`;
}
function updateTtImportField(tempId, field, value) {
  const row = ttImportPending.find(c => c._tempId === tempId);
  if (row) {
    row[field] = value;
    if (field === 'date' && value) {
      // keep "day" in sync with whatever date the person just typed/edited
      row.day = WEEKDAYS[(new Date(value + 'T00:00:00').getDay() + 6) % 7];
    }
  }
}
function removeTtImportRow(tempId) {
  ttImportPending = ttImportPending.filter(c => c._tempId !== tempId);
  if (ttImportPending.length === 0) {
    const flow = document.getElementById('ttImportFlow');
    if (flow) flow.innerHTML = '<div class="ai-question">No classes left — pick a file again to re-import, or close this and add classes manually.</div>';
    return;
  }
  renderTimetableImportReview('');
}
function confirmTimetableImport() {
  if (ttImportPending.length === 0) return;
  const targetSelect = document.getElementById('ttImportTarget');
  let folderId;
  if (targetSelect.value === '__new__') {
    const name = document.getElementById('ttImportNewName').value.trim();
    if (!name) { alert('Enter a name for the new schedule.'); return; }
    const folder = { id: Date.now(), name, classes: [] };
    scheduleFolders.push(folder);
    folderId = folder.id;
    const container = document.getElementById('scheduleFolderList');
    const empty = container && container.querySelector('.focus-empty-light');
    if (empty) empty.remove();
    renderScheduleFolder(folder);
  } else {
    folderId = Number(targetSelect.value);
  }
  const folder = scheduleFolders.find(f => f.id === folderId);
  if (!folder) return;
  // If most of what we're importing has real calendar dates (an exam
  // datesheet, a one-time event schedule, etc.) mark this folder as
  // date-based so it displays grouped by actual day, not a recurring
  // weekly grid — but never downgrade a folder that's already dated.
  const datedCount = ttImportPending.filter(c => c.date).length;
  if (folder.mode !== 'dated' && datedCount > 0 && datedCount >= ttImportPending.length / 2) {
    folder.mode = 'dated';
  }
  ttImportPending.forEach((c, i) => {
    folder.classes.push({
      id: Date.now() + i,
      subject: (c.subject || 'Untitled').trim(),
      day: WEEKDAYS.includes(c.day) ? c.day : WEEKDAYS[0],
      date: /^\d{4}-\d{2}-\d{2}$/.test(c.date) ? c.date : null,
      startTime: c.startTime || '09:00',
      endTime: c.endTime || '10:00',
      teacher: (c.teacher || '').trim(),
      room: (c.room || '').trim()
    });
  });
  saveScheduleFolders();
  saveUserData();
  renderScheduleClasses(folderId);
  updateScheduleFolderCount(folderId);
  ttImportPending = [];
  const modal = document.getElementById('timetableImportModal');
  if (modal) modal.remove();
}
// Load saved schedules on page boot
scheduleFolders.forEach(f => renderScheduleFolder(f));
// Load saved folders on page boot
folders.forEach(f => renderFolder(f));

// ============================================================
// LIVE CLASS WIDGET (homepage) — shows the class happening right now,
// or the next one coming up today, pulled straight from the Timetable.
// ============================================================
function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return (h * 60) + m;
}
function formatTimeRange(start, end) {
  const fmt = (t) => {
    const [h, m] = t.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12 = (h % 12) === 0 ? 12 : (h % 12);
    return `${h12}:${String(m).padStart(2, '0')} ${period}`;
  };
  return `${fmt(start)} – ${fmt(end)}`;
}
// Every class scheduled for today, across all Timetable folders, sorted by start time.
// NOTE: this used to decide "does this match today" per FOLDER (folder.mode ===
// 'dated' vs weekly), which meant one dated entry in a folder (e.g. an
// AI-imported datesheet that included a specific date on a few rows) could
// make the whole folder "dated" — silently hiding every ordinary recurring
// weekly class in it. Now it checks each class individually instead.
function getTodayClassEntries() {
  const today = new Date();
  const todayStr = localDateStr(today);
  const todayWeekday = WEEKDAYS[(today.getDay() + 6) % 7];
  const entries = [];
  scheduleFolders.forEach(folder => {
    (folder.classes || []).forEach(c => {
      if (!c.startTime || !c.endTime) return;
      const matchesToday = c.date ? (c.date === todayStr) : (c.day === todayWeekday);
      if (matchesToday) entries.push(c);
    });
  });
  entries.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  return entries;
}
function renderLiveClassWidget() {
  const zone = document.getElementById('liveClassZone');
  if (!zone) return;

  // No timetable set up at all yet — prompt instead of showing nothing.
  if (scheduleFolders.length === 0) {
    zone.innerHTML = `
      <div class="next-class-card next-class-cta" onclick="setNav(document.querySelector('.nav-item[onclick*=timetable]'),'timetable')">
        <i class="ti ti-calendar-plus"></i>
        <span>Add your Timetable to see your live class here</span>
      </div>`;
    return;
  }

  const entries = getTodayClassEntries();
  if (entries.length === 0) {
    zone.innerHTML = `<div class="next-class-card next-class-done"><i class="ti ti-calendar-off"></i> No classes scheduled today</div>`;
    return;
  }

  const now = new Date();
  const nowMin = (now.getHours() * 60) + now.getMinutes();
  const current = entries.find(c => timeToMinutes(c.startTime) <= nowMin && nowMin < timeToMinutes(c.endTime));
  const next = entries.find(c => timeToMinutes(c.startTime) > nowMin);

  let mainHtml = '';
  if (current) {
    const total   = timeToMinutes(current.endTime) - timeToMinutes(current.startTime);
    const elapsed = nowMin - timeToMinutes(current.startTime);
    const pct     = Math.max(0, Math.min(100, Math.round((elapsed / total) * 100)));
    mainHtml = `
      <div class="live-class-card">
        <div class="live-class-top">
          <span class="live-class-badge"><span class="live-dot"></span> LIVE NOW</span>
          <span class="live-class-time">${formatTimeRange(current.startTime, current.endTime)}</span>
        </div>
        <div class="live-class-subject">${escapeAttr(current.subject)}</div>
        <div class="live-class-meta">
          ${current.room ? `<span><i class="ti ti-map-pin"></i> ${escapeAttr(current.room)}</span>` : ''}
          ${current.teacher ? `<span><i class="ti ti-user"></i> ${escapeAttr(current.teacher)}</span>` : ''}
        </div>
        <div class="live-class-progress-track"><div class="live-class-progress-fill" style="width:${pct}%"></div></div>
      </div>`;
  } else if (next) {
    const mins    = timeToMinutes(next.startTime) - nowMin;
    const hrs     = Math.floor(mins / 60);
    const remMins = mins % 60;
    const countdown = hrs > 0 ? `in ${hrs}h ${remMins}m` : `in ${remMins}m`;
    mainHtml = `
      <div class="next-class-card">
        <div class="next-class-label"><i class="ti ti-clock"></i> Next class ${countdown}</div>
        <div class="next-class-row">
          <span class="next-class-subject">${escapeAttr(next.subject)}</span>
          <span class="next-class-time">${formatTimeRange(next.startTime, next.endTime)}</span>
        </div>
        ${next.room ? `<div class="next-class-room"><i class="ti ti-map-pin"></i> ${escapeAttr(next.room)}</div>` : ''}
      </div>`;
  } else {
    mainHtml = `<div class="next-class-card next-class-done"><i class="ti ti-circle-check"></i> No more classes today — you're free 🎉</div>`;
  }

  const stripHtml = entries.length > 1 ? entries.map(c => {
    const isNow = current && c === current;
    return `<div class="class-chip ${isNow ? 'class-chip-now' : ''}">
      <span class="class-chip-time">${formatTimeRange(c.startTime, c.endTime)}</span>
      <span class="class-chip-subject">${escapeAttr(c.subject)}</span>
    </div>`;
  }).join('') : '';

  zone.innerHTML = mainHtml + (stripHtml ? `<div class="today-classes-strip">${stripHtml}</div>` : '');
}
renderLiveClassWidget();
setInterval(renderLiveClassWidget, 30000);
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
  saveUserData();
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
  saveUserData();
}
function deleteTodo(id) {
  todos = todos.filter(td => td.id !== id);
  localStorage.setItem('amigo_todos', JSON.stringify(todos));
  saveUserData();
  const item = document.getElementById('todo-item-' + id);
  if (item) item.remove();
  const list = document.getElementById('todoList');
  if (list && list.querySelectorAll('.todo-item').length === 0) {
    list.innerHTML = '<div class="focus-empty focus-empty-light">No tasks yet.</div>';
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
  const uni     = document.getElementById('uniInput')     ? document.getElementById('uniInput').value.trim()     : '';
  const program = document.getElementById('programInput') ? document.getElementById('programInput').value.trim() : '';
  const lang    = document.getElementById('languageInput') ? document.getElementById('languageInput').value : 'en';
  // Save name
  if (name) {
    document.querySelector('.greeting h2').textContent    = `Hello, ${name} 👋`;
    document.querySelector('.profile-info p').textContent = name;
    document.querySelector('.avatar').textContent         = name.charAt(0).toUpperCase();
    const sd = document.getElementById('settingsNameDisplay');
    if (sd) sd.textContent = name;
    localStorage.setItem('amigo_name', name);
  }
  // Save university and program
  if (uni)     localStorage.setItem('amigo_uni', uni);
  if (program) localStorage.setItem('amigo_program', program);
  if (uni && program) {
    document.querySelector('.profile-info span').textContent = uni + ' · ' + program;
  }
  // Save and apply language
  localStorage.setItem('amigo_lang', lang);
  applyLanguage(lang);
  saveUserData();
  showToast(t('settingsSaved'));
  setNav(document.querySelector('.nav-item'), 'home');
}
function uploadProfilePic(input) {
  const file = input.files[0];
  if (!file) return;
  // Instant local preview while the real upload happens in the background
  const reader = new FileReader();
  reader.onload = e => applyProfilePic(e.target.result);
  reader.readAsDataURL(file);
  // NOTE: this used to save to IndexedDB under a key that was never actually
  // read back on page load (a pre-existing bug on top of the IndexedDB
  // device-locking issue) — the picture would vanish on refresh or another
  // device. It now uploads to the same cloud storage as regular files, and
  // a small local cache is kept just for an instant paint before that
  // finishes loading.
  uploadFileToCloud('amigo_profile_pic', file)
    .then(() => getFileUrlFromCloud('amigo_profile_pic'))
    .then(url => { if (url) localStorage.setItem('amigo_pic_cache', url); })
    .catch(err => console.error('Profile picture upload failed:', err));
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
  // Collect dates that have tasks or reminders
  items.forEach(item => {
    const d = parseDate(item.due);
    if (d.getFullYear() === year && d.getMonth() === month) eventDates.add(d.getDate());
  });
  reminders.forEach(r => {
    const d = new Date(r.date);
    if (d.getFullYear() === year && d.getMonth() === month) eventDates.add(d.getDate());
  });
  // Fill in previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const cell = document.createElement('div');
    cell.className   = 'cal-cell other-month';
    cell.textContent = daysInPrev - i;
    grid.appendChild(cell);
  }
  // Fill in this month's days
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
  // Fill in next month's leading days to complete the last row
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
  saveUserData();
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
    list.innerHTML = '<div class="focus-empty">No reminders yet — click a date to add one!</div>';
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
  saveUserData();
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
    results.innerHTML = '<div class="focus-empty focus-empty-light">No results found.</div>';
    return;
  }
  matches.forEach(item => {
    const div     = document.createElement('div');
    div.className = 'task-item';
    div.style.background = 'var(--color-surface)';
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
// NOTIFICATIONS — fixed & color-coded
// ============================================================

// Single definition of localDateStr (removes the duplicate that caused silent overwrite bugs)
function localDateStr(date) {
  return date.getFullYear() + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    String(date.getDate()).padStart(2, '0');
}

function getAllNotifItems() {
  const storedItems     = JSON.parse(localStorage.getItem('amigo_items')     || '[]');
  const storedReminders = JSON.parse(localStorage.getItem('amigo_reminders') || '[]');

  const todayStr = localDateStr(new Date());
  const all = [];

  // Only today's tasks
  storedItems.forEach(item => {
    if (isToday(item.due)) {
      all.push({
        id: item.id + '_due',
        title: item.title,
        type: item.type,
        subject: item.subject,
        source: 'task',
        date: todayStr,
        time: '08:00'
      });
    }
  });

  // Only today's reminders from calendar
  storedReminders.forEach(r => {
    if (r.date === todayStr) {
      all.push({
        id: r.id,
        title: r.title,
        type: r.type,
        date: todayStr,
        time: r.time || '08:00',
        source: 'reminder'
      });
    }
  });

  return all;
}

function toggleNotifications() {
  // Always re-read fresh from storage — fixes mobile stale-state
  items     = JSON.parse(localStorage.getItem('amigo_items')     || '[]');
  reminders = JSON.parse(localStorage.getItem('amigo_reminders') || '[]');

  const panel  = document.getElementById('notifPanel');
  const isOpen = panel.style.display === 'block';
  panel.style.display = isOpen ? 'none' : 'block';
  document.getElementById('searchPanel').style.display = 'none';
  if (!isOpen) renderNotifPanel();
}

function renderNotifPanel() {
  const list = document.getElementById('notifList');
  const all  = getAllNotifItems();
  list.innerHTML = '';

  if (all.length === 0) {
    list.innerHTML = '<div class="notif-empty">nothing due today 🎉<br><small>enjoy your day!</small></div>';
    return;
  }

  const todayStr      = localDateStr(new Date());
  const todayItems    = all.filter(n => n.date === todayStr);
  const upcomingItems = all.filter(n => n.date > todayStr);

  if (todayItems.length > 0) {
    const hdr = document.createElement('div');
    hdr.className   = 'notif-section-hdr today-hdr';
    hdr.textContent = 'Today';
    list.appendChild(hdr);
    todayItems.forEach(n => list.appendChild(buildNotifCard(n, 'today')));
  }

  if (upcomingItems.length > 0) {
    const hdr = document.createElement('div');
    hdr.className   = 'notif-section-hdr upcoming-hdr';
    hdr.textContent = 'Next 30 Days';
    list.appendChild(hdr);
    upcomingItems.forEach(n => list.appendChild(buildNotifCard(n, 'upcoming')));
  }
}

function buildNotifCard(n, period) {
  const div     = document.createElement('div');
  const isToday = period === 'today';

  const dateLabel = new Date(n.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric'
  });

  const subText = n.source === 'task'
    ? `${n.subject || ''} — ${n.label}${isToday ? '' : ' · ' + (n.rawDue || dateLabel)}`
    : `${n.type} — ${isToday ? n.time : dateLabel + ' at ' + n.time}`;

  div.className = 'notif-card ' + (isToday ? 'today' : 'upcoming');

  div.innerHTML = `
    <div class="notif-icon">
      <i class="ti ${iconName(n.type)}"></i>
    </div>
    <div class="notif-body">
      <div class="notif-title">${n.title}</div>
      <div class="notif-sub">${subText}</div>
    </div>
    ${isToday
      ? `<span class="notif-date-badge today-badge">TODAY</span>`
      : `<span class="notif-date-badge upcoming-badge">${dateLabel}</span>`
    }`;

  return div;
}

function updateNotifBadge() {
  const count = getAllNotifItems().length;
  const badge = document.getElementById('notifBadge');
  const dot   = document.getElementById('notifDot');

  if (count > 0) {
    if (badge) { badge.style.display = 'block'; badge.textContent = count > 9 ? '9+' : count; }
    if (dot)   dot.style.display = 'block';
  } else {
    if (badge) badge.style.display = 'none';
    if (dot)   dot.style.display   = 'none';
  }
}

function removePastItems() {
  const todayStr = localDateStr(new Date());
  reminders = reminders.filter(r => r.date >= todayStr);
  localStorage.setItem('amigo_reminders', JSON.stringify(reminders));
}

// NOTE: this used to permanently delete any task whose due date had passed —
// both locally and in Supabase, with no undo. That was a real data-loss bug.
// It no longer deletes anything. Overdue tasks stay visible everywhere with a
// red "Overdue Nd" label (see addToList) until the person marks them complete
// or deletes them manually. This function now just re-runs the render pass so
// labels/lists reflect the current day (used at startup and at midnight).
function expireOldTasks() {
  document.querySelectorAll('.task-item').forEach(el => el.remove());
  const focus = document.getElementById('focusItems');
  if (focus) focus.innerHTML = '';
  items.forEach(item => renderItem(item));
  sortList('taskList');
  ['assignment','quiz','mids','presentation','final','notice'].forEach(type => sortList('list-' + type));
  updateCounts();
}

function scheduleMidnightCleanup() {
  const now       = new Date();
  const midnight  = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
  const msUntil   = midnight - now;
  setTimeout(() => {
    removePastItems();
    expireOldTasks();
    renderReminderList();
    renderCalendar();
    updateNotifBadge();
    scheduleMidnightCleanup();
  }, msUntil);
}

removePastItems();
scheduleMidnightCleanup();
updateNotifBadge();


// Close panels when clicking anywhere outside them
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
  document.getElementById('tab-login').classList.toggle('active', tab === 'login');
  document.getElementById('tab-signup').classList.toggle('active', tab === 'signup');
}
async function handleLogin() {
  const email    = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  const errEl    = document.getElementById('loginError');
  errEl.classList.remove('show');
  if (!email || !password) {
    errEl.textContent = 'fill in everything bestie 🙏';
    errEl.className = 'auth-msg auth-msg-error show';
    return;
  }
  errEl.textContent = 'signing you in...';
  errEl.className = 'auth-msg auth-msg-info show';
  const error = await signInWithEmail(email, password);
  if (error) {
    errEl.textContent = 'wrong email or password 😬';
    errEl.className = 'auth-msg auth-msg-error show';
    return;
  }
  errEl.textContent = 'signed in — loading your data...';
  errEl.className = 'auth-msg auth-msg-info show';
  // NOTE: this used to call initAuth() again, which quietly refreshed
  // localStorage in the background but never told the already-rendered page
  // to redraw itself — app.js's task/todo/reminder arrays were only ever read
  // ONCE, at initial script load (before login, when they were empty). That's
  // why data only ever showed up after a manual browser refresh. Reloading
  // here runs the whole index.html -> initAuth() -> load app.js sequence
  // fresh, this time with the session already active, so it picks up the
  // real data on the very first render.
  window.location.reload();
}
async function handleSignup() {
  const name     = document.getElementById('signupName').value.trim();
  const email    = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const errEl    = document.getElementById('signupError');
  const sucEl    = document.getElementById('signupSuccess');
  errEl.classList.remove('show');
  sucEl.classList.remove('show');

  if (!name || !email || !password) {
    errEl.textContent = 'fill in everything bestie 🙏';
    errEl.className   = 'auth-msg auth-msg-error show';
    return;
  }
  if (password.length < 6) {
    errEl.textContent = 'password too short — at least 6 chars 🔐';
    errEl.className   = 'auth-msg auth-msg-error show';
    return;
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    errEl.textContent = 'that email doesn\'t look right 📧';
    errEl.className   = 'auth-msg auth-msg-error show';
    return;
  }

  errEl.textContent = 'creating your account...';
  errEl.className   = 'auth-msg auth-msg-info show';

  const result = await signUpWithEmail(email, password, name);

  if (result === 'AUTO_LOGIN') return;

  if (result !== null) {
    errEl.textContent = result;
    errEl.className   = 'auth-msg auth-msg-error show';
    return;
  }

  errEl.classList.remove('show');
  sucEl.textContent = 'account created! check your email to confirm ✅';
  sucEl.className   = 'auth-msg auth-msg-success show';
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
    status.className   = 'feedback-status show msg-error';
    return;
  }
  status.textContent = 'sending...';
  status.className   = 'feedback-status show msg-info';
  try {
    await emailjs.send('service_64oaeq2', 'template_mf8v8kh', {
      from_name:  name,
      from_email: email,
      message:    message
    });
    status.textContent = 'sent! we got it and will get back to you 🙌';
    status.className   = 'feedback-status show msg-success';
    document.getElementById('feedbackName').value    = '';
    document.getElementById('feedbackEmail').value   = '';
    document.getElementById('feedbackMessage').value = '';
  } catch (err) {
    status.textContent = 'something went wrong 😬 try again';
    status.className   = 'feedback-status show msg-error';
  }
}
// ============================================================
// NOTES — simple sticky notes, saved per-user (synced inside
// the existing "settings" jsonb field, no new DB column needed)
// ============================================================
let notes = JSON.parse(localStorage.getItem('amigo_notes') || '[]');
const NOTE_COLORS = ['note-amber', 'note-teal', 'note-pink', 'note-blue'];

function renderNotes() {
  const board = document.getElementById('notesBoard');
  if (!board) return;
  const addTile = board.querySelector('.sticky-new');
  board.querySelectorAll('.sticky').forEach(el => el.remove());
  notes.forEach((note, idx) => {
    const div = document.createElement('div');
    div.className = 'sticky ' + NOTE_COLORS[idx % NOTE_COLORS.length];
    div.innerHTML = `
      <div class="sticky-head">
        <div class="sticky-title">${escapeAttr(note.title)}</div>
        <div class="sticky-del" onclick="event.stopPropagation(); deleteNote(${note.id})"><i class="ti ti-x"></i></div>
      </div>
      <div class="sticky-body">${escapeAttr(note.body)}</div>`;
    div.addEventListener('click', () => openNoteModal(note.id));
    if (addTile) board.insertBefore(div, addTile);
    else board.appendChild(div);
  });
}
function saveNotes() {
  localStorage.setItem('amigo_notes', JSON.stringify(notes));
  saveUserData();
}
function openNoteModal(editId) {
  const existing = document.getElementById('noteModal');
  if (existing) existing.remove();
  const editing = editId ? notes.find(n => n.id === editId) : null;
  const modal = document.createElement('div');
  modal.id = 'noteModal';
  modal.className = 'task-detail-overlay';
  modal.innerHTML = `
    <div class="task-detail-sheet">
      <div class="task-detail-handle"></div>
      <div class="ai-question quick-add-title">${editing ? 'Edit note' : 'New note'}</div>
      <div class="ai-flow-row"><input id="noteTitleInput" class="ai-input-boxed" placeholder="Title" value="${editing ? escapeAttr(editing.title) : ''}" /></div>
      <div class="ai-flow-row"><textarea id="noteBodyInput" class="ai-input-boxed" rows="4" placeholder="Write your note...">${editing ? editing.body : ''}</textarea></div>
      <div class="ai-flow-row">
        ${editing ? `<button class="ai-opt" onclick="deleteNote(${editing.id})">Delete</button>` : ''}
        <button class="ai-send" onclick="saveNoteFromModal(${editing ? editing.id : 'null'})">${editing ? 'Save changes' : 'Save note'}</button>
      </div>
      <button class="task-detail-btn task-detail-btn-close quick-add-close" onclick="document.getElementById('noteModal').remove()">Close</button>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
  setTimeout(() => { const el = document.getElementById('noteTitleInput'); if (el) el.focus(); }, 0);
}
function saveNoteFromModal(editId) {
  const title = document.getElementById('noteTitleInput').value.trim();
  const body  = document.getElementById('noteBodyInput').value.trim();
  if (!title && !body) { document.getElementById('noteModal').remove(); return; }
  if (editId) {
    const note = notes.find(n => n.id === editId);
    if (note) { note.title = title || 'Untitled'; note.body = body; }
  } else {
    notes.push({ id: Date.now(), title: title || 'Untitled', body });
  }
  saveNotes();
  renderNotes();
  document.getElementById('noteModal').remove();
}
function deleteNote(id) {
  notes = notes.filter(n => n.id !== id);
  saveNotes();
  renderNotes();
  const modal = document.getElementById('noteModal');
  if (modal) modal.remove();
}
renderNotes();

// ============================================================
// FOCUS TIMER — ephemeral, not persisted (a live countdown only)
// ============================================================
let timerSeconds = 25 * 60;
let timerTotal   = 25 * 60;
let timerRunning = false;
let timerInterval = null;
function formatTimerTime(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) {
    return h + ':' + (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
  }
  return (m < 10 ? '0' : '') + m + ':' + (sec < 10 ? '0' : '') + sec;
}
function renderTimerDisplay() {
  const el = document.getElementById('bigTimer');
  if (el) el.textContent = formatTimerTime(timerSeconds);
}
function setTimerPreset(btn, mins) {
  document.querySelectorAll('.preset-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  if (mins === 'custom') {
    openCustomTimerModal();
    return;
  }
  applyTimerLength(mins, btn);
}
function applyTimerLength(mins, btn) {
  clearInterval(timerInterval);
  timerRunning = false;
  const startBtn = document.getElementById('timerStartBtn');
  if (startBtn) startBtn.textContent = 'Start';
  timerSeconds = mins * 60;
  timerTotal   = mins * 60;
  renderTimerDisplay();
}
function openCustomTimerModal() {
  const existing = document.getElementById('customTimerModal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'customTimerModal';
  modal.className = 'task-detail-overlay';
  modal.innerHTML = `
    <div class="task-detail-sheet">
      <div class="task-detail-handle"></div>
      <div class="ai-question quick-add-title">Custom timer length</div>
      <div class="ai-flow-row custom-timer-row">
        <input id="customTimerHours" type="number" min="0" max="23" value="0" class="ai-input-boxed" />
        <span class="custom-timer-unit">hrs</span>
        <input id="customTimerMinutes" type="number" min="0" max="59" value="30" class="ai-input-boxed" />
        <span class="custom-timer-unit">min</span>
      </div>
      <div class="ai-flow-row">
        <button class="ai-send" onclick="confirmCustomTimer()">Set timer</button>
      </div>
      <button class="task-detail-btn task-detail-btn-close quick-add-close" onclick="document.getElementById('customTimerModal').remove()">Cancel</button>
    </div>`;
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
  document.body.appendChild(modal);
  setTimeout(() => { const el = document.getElementById('customTimerHours'); if (el) el.focus(); }, 0);
}
function confirmCustomTimer() {
  const h = parseInt(document.getElementById('customTimerHours').value, 10) || 0;
  const m = parseInt(document.getElementById('customTimerMinutes').value, 10) || 0;
  const totalMins = (h * 60) + m;
  if (totalMins <= 0) { alert('Enter at least 1 minute.'); return; }
  applyTimerLength(totalMins, document.querySelector('.preset-btn:last-child'));
  document.getElementById('customTimerModal').remove();
}
function toggleTimer() {
  const btn = document.getElementById('timerStartBtn');
  timerRunning = !timerRunning;
  if (timerRunning) {
    btn.textContent = 'Pause';
    timerInterval = setInterval(() => {
      if (timerSeconds > 0) {
        timerSeconds--;
        renderTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerRunning = false;
        btn.textContent = 'Start';
      }
    }, 1000);
  } else {
    btn.textContent = 'Start';
    clearInterval(timerInterval);
  }
}
function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  timerSeconds = timerTotal;
  const btn = document.getElementById('timerStartBtn');
  if (btn) btn.textContent = 'Start';
  renderTimerDisplay();
}

// ============================================================
// DARK MODE + NOTIFICATION PREFERENCE TOGGLES (Settings)
// ============================================================
function applyDarkMode(on) {
  document.documentElement.setAttribute('data-theme', on ? 'dark' : 'light');
  localStorage.setItem('amigo_darkmode', on ? '1' : '0');
}
function toggleDarkModeSwitch(el) {
  const on = !el.classList.contains('on');
  el.classList.toggle('on', on);
  applyDarkMode(on);
  saveUserData();
}
function toggleNotifPrefSwitch(el) {
  const on = !el.classList.contains('on');
  el.classList.toggle('on', on);
  localStorage.setItem('amigo_notifpref', on ? '1' : '0');
  saveUserData();
}
// Apply saved dark-mode preference on load, and reflect both toggles' visual state
(function initToggleStates() {
  const dark = localStorage.getItem('amigo_darkmode') === '1';
  applyDarkMode(dark);
  const darkSwitch = document.getElementById('darkModeSwitch');
  if (darkSwitch) darkSwitch.classList.toggle('on', dark);
  const notifOn = localStorage.getItem('amigo_notifpref') !== '0';
  const notifSwitch = document.getElementById('notifPrefSwitch');
  if (notifSwitch) notifSwitch.classList.toggle('on', notifOn);
})();

// ============================================================
// TASKS PAGE — type filter dropdown
// ============================================================
function filterTaskBlocks(value) {
  document.querySelectorAll('#section-tasks .task-block').forEach(block => {
    block.style.display = (value === 'all' || block.dataset.type === value) ? '' : 'none';
  });
}

// ============================================================
// MOBILE "MORE" DRAWER — holds Uploads/Calendar/Timer/Feedback/Settings
// on small screens so the bottom tab bar isn't crowded with 9+ icons
// ============================================================
function toggleMobileDrawer() {
  document.getElementById('mobileDrawer').classList.toggle('open');
  document.getElementById('mobileDrawerOverlay').classList.toggle('open');
}
function closeMobileDrawer() {
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('mobileDrawerOverlay').classList.remove('open');
}