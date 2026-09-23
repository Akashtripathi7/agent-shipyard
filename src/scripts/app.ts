// Client behaviour for every page: saved progress, theme, quizzes, drills, reveals,
// copy buttons, the course drawer, search and keyboard shortcuts.
// Everything is stored in this browser under one key; export/import lives on the skills page.

type Store = {
  done: Record<string, true>;
  checks: Record<string, true>;
  notes: Record<string, string>;
  quiz: Record<string, number>;
  drills: Record<string, Record<string, string[]>>;
  revealed: Record<string, true>;
};

const KEY = 'shipyard:v1';
const empty = (): Store => ({ done: {}, checks: {}, notes: {}, quiz: {}, drills: {}, revealed: {} });

export function load(): Store {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    return { ...empty(), ...JSON.parse(raw) };
  } catch {
    return empty();
  }
}
let store = load();
function save() {
  try { localStorage.setItem(KEY, JSON.stringify(store)); } catch { /* storage blocked: progress stays in memory */ }
  window.dispatchEvent(new CustomEvent('shipyard:change'));
}

type Item = { s: string; h: string; t: string; sec: string; k: string; c: string[] };
const courseData: Item[] = (() => {
  try { return JSON.parse(document.getElementById('course-data')?.textContent || '[]'); } catch { return []; }
})();

/* ---------- Progress display ---------- */
function renderProgress() {
  const total = courseData.length;
  const done = courseData.filter((i) => store.done[i.s]).length;
  document.querySelectorAll<HTMLElement>('[data-progress-count]').forEach((el) => (el.textContent = `${done} of ${total}`));

  document.querySelectorAll<SVGElement>('[data-ring]').forEach((svg) => {
    const scope = svg.getAttribute('data-ring');
    const pool = scope === 'all' ? courseData : courseData.filter((i) => i.sec === scope);
    const d = pool.filter((i) => store.done[i.s]).length;
    const pct = pool.length ? d / pool.length : 0;
    const arc = svg.querySelector<SVGCircleElement>('[data-ring-arc]');
    const txt = svg.querySelector('[data-ring-text]');
    if (arc) {
      const c = Number(arc.getAttribute('stroke-dasharray'));
      arc.setAttribute('stroke-dashoffset', String(c * (1 - pct)));
    }
    if (txt) txt.textContent = `${Math.round(pct * 100)}%`;
  });

  document.querySelectorAll<HTMLElement>('[data-section-count]').forEach((el) => {
    const sec = el.getAttribute('data-section-count');
    const pool = courseData.filter((i) => i.sec === sec);
    el.textContent = `${pool.filter((i) => store.done[i.s]).length}/${pool.length}`;
  });

  document.querySelectorAll<HTMLElement>('.map-link[data-slug]').forEach((a) => {
    a.classList.toggle('is-done', !!store.done[a.dataset.slug!]);
  });

  document.querySelectorAll<HTMLButtonElement>('[data-complete]').forEach((btn) => {
    const on = !!store.done[btn.dataset.complete!];
    btn.setAttribute('aria-pressed', String(on));
    btn.classList.toggle('key--done', on);
    btn.classList.toggle('key--primary', !on);
    const label = btn.querySelector('[data-complete-label]');
    if (label) label.textContent = on ? 'Completed' : 'Mark complete';
  });

  // "Continue where you left off"
  document.querySelectorAll<HTMLAnchorElement>('[data-continue]').forEach((a) => {
    const nextUp = courseData.find((i) => !store.done[i.s]);
    if (nextUp) {
      a.href = nextUp.h;
      const t = a.querySelector('[data-continue-title]');
      if (t) t.textContent = nextUp.t;
    }
  });
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;

  const complete = target.closest<HTMLButtonElement>('[data-complete]');
  if (complete) {
    const slug = complete.dataset.complete!;
    if (store.done[slug]) delete store.done[slug];
    else store.done[slug] = true;
    save();
    renderProgress();
    return;
  }

  /* ---------- Quiz ---------- */
  const opt = target.closest<HTMLButtonElement>('.quiz .opt');
  if (opt) {
    const quiz = opt.closest<HTMLElement>('.quiz')!;
    if (quiz.classList.contains('is-revealed')) return;
    quiz.querySelectorAll('.opt').forEach((o) => o.classList.remove('is-picked'));
    opt.classList.add('is-picked');
    store.quiz[quiz.dataset.quiz!] = Number(opt.dataset.opt);
    save();
    return;
  }
  const revealQuiz = target.closest<HTMLButtonElement>('[data-reveal-quiz]');
  if (revealQuiz) {
    const quiz = revealQuiz.closest<HTMLElement>('.quiz')!;
    revealQuiz.hidden = true;
    showQuiz(quiz);
    store.revealed[`quiz:${quiz.dataset.quiz}`] = true;
    save();
    return;
  }

  /* ---------- Drill choices ---------- */
  const choice = target.closest<HTMLButtonElement>('.drill .choice');
  if (choice) {
    const field = choice.closest<HTMLElement>('.field')!;
    const drill = choice.closest<HTMLElement>('.drill')!;
    const multi = field.dataset.multi === 'true';
    if (!multi) field.querySelectorAll('.choice').forEach((c) => c.setAttribute('aria-pressed', 'false'));
    const on = choice.getAttribute('aria-pressed') !== 'true';
    choice.setAttribute('aria-pressed', String(multi ? on : true));
    const picked = Array.from(field.querySelectorAll<HTMLElement>('.choice[aria-pressed="true"]')).map((c) => c.dataset.choice!);
    const id = drill.dataset.drill!;
    store.drills[id] = { ...(store.drills[id] || {}), [field.dataset.field!]: picked };
    save();
    return;
  }

  /* ---------- Reveal ---------- */
  const rev = target.closest<HTMLButtonElement>('[data-reveal-btn]');
  if (rev) {
    const body = document.getElementById(rev.getAttribute('aria-controls')!);
    if (!body) return;
    const open = body.hidden;
    body.hidden = !open;
    rev.setAttribute('aria-expanded', String(open));
    rev.textContent = open ? 'Hide' : rev.dataset.label || rev.textContent || 'Show';
    return;
  }

  /* ---------- Copy ---------- */
  const copyPrompt = target.closest<HTMLButtonElement>('[data-copy-prompt]');
  if (copyPrompt) {
    const text = copyPrompt.closest('.prompt')?.querySelector<HTMLElement>('[data-prompt-text]')?.innerText.trim() || '';
    copyText(text, copyPrompt);
    return;
  }
  const copyCode = target.closest<HTMLButtonElement>('.copy-btn');
  if (copyCode) {
    const code = copyCode.parentElement?.querySelector('code')?.innerText || '';
    copyText(code, copyCode);
  }
});

function showQuiz(quiz: HTMLElement) {
  const answer = Number(quiz.dataset.answer);
  quiz.classList.add('is-revealed');
  quiz.querySelectorAll<HTMLElement>('.opt').forEach((o) => {
    const i = Number(o.dataset.opt);
    if (i === answer) o.classList.add('is-right');
    else if (o.classList.contains('is-picked')) o.classList.add('is-wrong');
  });
}

async function copyText(text: string, btn: HTMLButtonElement) {
  const old = btn.textContent;
  try {
    await navigator.clipboard.writeText(text);
    btn.textContent = 'Copied';
  } catch {
    btn.textContent = 'Press ⌘C';
  }
  setTimeout(() => (btn.textContent = old), 1400);
}

/* ---------- Restore saved state on load ---------- */
function restore() {
  document.querySelectorAll<HTMLTextAreaElement>('textarea[data-note]').forEach((ta) => {
    const k = ta.dataset.note!;
    if (store.notes[k]) ta.value = store.notes[k];
    let t: number | undefined;
    ta.addEventListener('input', () => {
      clearTimeout(t);
      t = window.setTimeout(() => { store.notes[k] = ta.value; save(); }, 400);
    });
  });

  document.querySelectorAll<HTMLInputElement>('input[data-check]').forEach((cb) => {
    const k = cb.dataset.check!;
    cb.checked = !!store.checks[k];
    cb.closest('label')?.classList.toggle('is-done', cb.checked);
    cb.addEventListener('change', () => {
      if (cb.checked) store.checks[k] = true;
      else delete store.checks[k];
      cb.closest('label')?.classList.toggle('is-done', cb.checked);
      save();
    });
  });

  document.querySelectorAll<HTMLElement>('.quiz[data-quiz]').forEach((quiz) => {
    const id = quiz.dataset.quiz!;
    const picked = store.quiz[id];
    if (picked !== undefined) quiz.querySelector(`.opt[data-opt="${picked}"]`)?.classList.add('is-picked');
    if (store.revealed[`quiz:${id}`]) {
      showQuiz(quiz);
      const b = quiz.querySelector<HTMLElement>('[data-reveal-quiz]');
      if (b) b.hidden = true;
    }
  });

  document.querySelectorAll<HTMLElement>('.drill[data-drill]').forEach((drill) => {
    const saved = store.drills[drill.dataset.drill!] || {};
    drill.querySelectorAll<HTMLElement>('.field').forEach((f) => {
      const picked = saved[f.dataset.field!] || [];
      f.querySelectorAll<HTMLElement>('.choice').forEach((c) => c.setAttribute('aria-pressed', String(picked.includes(c.dataset.choice!))));
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-reveal-btn]').forEach((b) => (b.dataset.label = b.textContent || ''));

  // Copy buttons on every code block
  document.querySelectorAll<HTMLPreElement>('.prose pre').forEach((pre) => {
    if (pre.querySelector('.copy-btn')) return;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'copy-btn';
    b.textContent = 'Copy';
    b.setAttribute('aria-label', 'Copy code');
    pre.appendChild(b);
  });

  // Tables scroll inside their own box on narrow screens
  document.querySelectorAll<HTMLTableElement>('.prose table').forEach((t) => {
    if (t.parentElement?.classList.contains('table-wrap')) return;
    const w = document.createElement('div');
    w.className = 'table-wrap';
    t.replaceWith(w);
    w.appendChild(t);
  });
}

/* ---------- Theme ---------- */
function currentTheme() {
  try { return localStorage.getItem('shipyard-theme') || 'dark'; } catch { return 'dark'; }
}
function applyThemeIcon() {
  const btn = document.getElementById('theme-btn');
  if (!btn) return;
  const mode = currentTheme();
  btn.querySelectorAll<SVGElement>('[data-icon]').forEach((i) => (i.hidden = i.dataset.icon !== mode));
  btn.setAttribute('aria-label', `Theme: ${mode}. Click to change.`);
}
document.getElementById('theme-btn')?.addEventListener('click', () => {
  const mode = currentTheme();
  const next = mode === 'dark' ? 'light' : mode === 'light' ? 'system' : 'dark';
  try { localStorage.setItem('shipyard-theme', next); } catch {}
  if (next === 'system') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', next);
  const isDark = next === 'dark' || (next === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.getElementById('theme-color')?.setAttribute('content', isDark ? '#0b1320' : '#f6f1e7');
  applyThemeIcon();
});

/* ---------- Drawer (phones and tablets) ---------- */
const drawerBtn = document.getElementById('drawer-btn');
const sidebar = document.getElementById('sidebar');
const scrim = document.getElementById('scrim');
function setDrawer(open: boolean) {
  sidebar?.classList.toggle('is-open', open);
  if (scrim) scrim.hidden = !open;
  drawerBtn?.setAttribute('aria-expanded', String(open));
  // Stop the page behind the drawer from scrolling under it.
  document.documentElement.classList.toggle('drawer-open', open);
}
drawerBtn?.addEventListener('click', () => setDrawer(!sidebar?.classList.contains('is-open')));
scrim?.addEventListener('click', () => setDrawer(false));
// Keep the current page visible in the map. This scrolls the sidebar itself:
// scrollIntoView would also scroll the window, because the sidebar is sticky,
// landing every lesson part-way down the page with its title off screen.
function centreCurrentInMap() {
  const current = document.querySelector<HTMLElement>('.map-link[aria-current="page"]');
  if (!current || !sidebar) return;
  const c = current.getBoundingClientRect();
  const s = sidebar.getBoundingClientRect();
  const want = sidebar.scrollTop + (c.top - s.top) - (sidebar.clientHeight - c.height) / 2;
  sidebar.scrollTop = Math.max(0, want);
}
// Run once now and again after load: web fonts settle late, and before they do
// the map is short enough that scrollTop clamps to 0.
centreCurrentInMap();
window.addEventListener('load', centreCurrentInMap);
if ((document as any).fonts?.ready) (document as any).fonts.ready.then(centreCurrentInMap);

/* ---------- Search (Pagefind, loaded on first use) ---------- */
const modal = document.getElementById('search-modal');
let searchLoaded = false;
async function openSearch() {
  if (!modal) return;
  modal.hidden = false;
  if (!searchLoaded) {
    searchLoaded = true;
    try {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = '/pagefind/pagefind-ui.css';
      document.head.appendChild(css);
      await new Promise<void>((res, rej) => {
        const s = document.createElement('script');
        s.src = '/pagefind/pagefind-ui.js';
        s.onload = () => res();
        s.onerror = () => rej();
        document.head.appendChild(s);
      });
      // @ts-expect-error PagefindUI is a global from the script above
      new window.PagefindUI({ element: '#search-ui', showSubResults: true, resetStyles: false, autofocus: true });
      const note = document.getElementById('search-note');
      if (note) note.innerHTML = 'Press <kbd>Esc</kbd> to close.';
    } catch {
      /* dev server: the note explains search works on the built site */
    }
  }
  setTimeout(() => modal.querySelector<HTMLInputElement>('input')?.focus(), 50);
}
function closeSearch() { if (modal) modal.hidden = true; }
document.getElementById('search-btn')?.addEventListener('click', openSearch);
modal?.addEventListener('click', (e) => { if (e.target === modal) closeSearch(); });

/* ---------- Keyboard shortcuts ---------- */
document.addEventListener('keydown', (e) => {
  const el = e.target instanceof Element ? e.target : null;
  const typing = el?.closest('input, textarea, select, [contenteditable="true"]');
  if (e.key === 'Escape') { closeSearch(); setDrawer(false); return; }
  if (typing || e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === '/') { e.preventDefault(); openSearch(); }
  else if (e.key === 'n') document.querySelector<HTMLAnchorElement>('[data-next]')?.click();
  else if (e.key === 'p') document.querySelector<HTMLAnchorElement>('[data-prev]')?.click();
});

/* ---------- On-this-page highlighting ---------- */
const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc a'));
if (tocLinks.length && 'IntersectionObserver' in window) {
  const byId = new Map(tocLinks.map((a) => [decodeURIComponent(a.hash.slice(1)), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const a = byId.get(en.target.id);
      if (!a) return;
      tocLinks.forEach((l) => l.classList.remove('is-active'));
      a.classList.add('is-active');
    });
  }, { rootMargin: '-15% 0px -75% 0px' });
  byId.forEach((_, id) => { const h = document.getElementById(id); if (h) io.observe(h); });
}

/* ---------- Keep tabs in sync ---------- */
window.addEventListener('storage', (e) => {
  if (e.key === KEY) { store = load(); renderProgress(); }
});

restore();
applyThemeIcon();
renderProgress();

// Exposed for the skills page (export/import and the competency map).
(window as unknown as { shipyard: unknown }).shipyard = {
  get: () => store,
  set: (s: Store) => { store = { ...empty(), ...s }; save(); renderProgress(); },
  data: courseData,
};
