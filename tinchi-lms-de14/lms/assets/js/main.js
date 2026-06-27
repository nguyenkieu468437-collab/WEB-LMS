/* =========================================================
   main.js — Logic dùng chung cho toàn bộ trang LMS
   ========================================================= */

/* ---------- Mobile nav toggle ---------- */
(function initMobileNav(){
  const btn = document.getElementById('nav-toggle');
  const nav = document.getElementById('mobile-nav');
  const closeBtn = document.getElementById('nav-close');
  const overlay = document.getElementById('nav-overlay');
  if(!btn || !nav) return;

  function open(){
    nav.classList.add('open');
    overlay?.classList.remove('hidden');
    btn.setAttribute('aria-expanded', 'true');
    nav.querySelector('a')?.focus();
  }
  function close(){
    nav.classList.remove('open');
    overlay?.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
  }
  btn.addEventListener('click', () => nav.classList.contains('open') ? close() : open());
  closeBtn?.addEventListener('click', close);
  overlay?.addEventListener('click', close);
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') close(); });
})();

/* ---------- Toast helper ---------- */
function showToast(message, tone = 'success'){
  const toast = document.getElementById('toast');
  if(!toast) return;
  const toneColor = tone === 'success' ? 'var(--ink-green)' : 'var(--clay)';
  toast.style.borderColor = toneColor;
  toast.querySelector('#toast-text').textContent = message;
  toast.classList.add('show');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

/* ---------- Generic accordion ---------- */
function initAccordionGroup(containerSelector){
  document.querySelectorAll(containerSelector).forEach(container => {
    container.addEventListener('click', (e) => {
      const trigger = e.target.closest('.accordion-trigger');
      if(!trigger || !container.contains(trigger)) return;
      const panel = document.getElementById(trigger.getAttribute('aria-controls'));
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      if(panel){
        panel.style.maxHeight = expanded ? '0px' : panel.scrollHeight + 'px';
      }
    });
  });
}

/* ---------- LocalStorage helpers: tiến độ học tập ---------- */
const LMS_STORE = {
  PROGRESS_KEY: 'lms_progress_v1',     // { courseId: [lessonId, ...] }
  ENROLL_KEY: 'lms_enrollments_v1',    // [courseId, ...]
  SESSION_KEY: 'lms_session_v1',       // { name, email }

  getProgress(){
    try{ return JSON.parse(localStorage.getItem(this.PROGRESS_KEY)) || {}; }
    catch(e){ return {}; }
  },
  setProgress(data){
    localStorage.setItem(this.PROGRESS_KEY, JSON.stringify(data));
  },
  markLessonComplete(courseId, lessonId){
    const data = this.getProgress();
    if(!data[courseId]) data[courseId] = [];
    if(!data[courseId].includes(lessonId)) data[courseId].push(lessonId);
    this.setProgress(data);
    this.enroll(courseId);
  },
  isLessonComplete(courseId, lessonId){
    const data = this.getProgress();
    return !!(data[courseId] && data[courseId].includes(lessonId));
  },
  getEnrollments(){
    try{ return JSON.parse(localStorage.getItem(this.ENROLL_KEY)) || []; }
    catch(e){ return []; }
  },
  enroll(courseId){
    const list = this.getEnrollments();
    if(!list.includes(courseId)){
      list.push(courseId);
      localStorage.setItem(this.ENROLL_KEY, JSON.stringify(list));
    }
  },
  getSession(){
    try{ return JSON.parse(localStorage.getItem(this.SESSION_KEY)); }
    catch(e){ return null; }
  },
  setSession(session){
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  },
  clearSession(){
    localStorage.removeItem(this.SESSION_KEY);
  }
};

/* ---------- Reflect login state in header ---------- */
(function reflectSession(){
  const session = LMS_STORE.getSession();
  const slot = document.getElementById('auth-slot');
  if(!slot) return;
  if(session){
    slot.innerHTML = `
      <a href="progress.html" class="text-sm font-medium text-[var(--ink-green)] hover:underline">Xin chào, ${session.name.split(' ')[0]}</a>
      <button id="logout-btn" class="ml-3 text-sm text-[var(--clay)] hover:underline">Đăng xuất</button>
    `;
    document.getElementById('logout-btn')?.addEventListener('click', () => {
      LMS_STORE.clearSession();
      showToast('Đã đăng xuất.');
      setTimeout(() => location.reload(), 700);
    });
  }
})();

/* ---------- Footer year ---------- */
document.querySelectorAll('.current-year').forEach(el => el.textContent = new Date().getFullYear());
