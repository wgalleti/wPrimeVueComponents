/* ============================================================
   Doc chrome — theme, sidebar, search, copy, mobile menu
   Runs on every page. Reads window.WREG (registry).
   ============================================================ */
(function () {
  // ---------- Theme ----------
  const THEME_KEY = 'wdocs-theme';
  function applyTheme(t) {
    document.documentElement.classList.toggle('dark', t === 'dark');
    document.querySelectorAll('[data-theme-icon]').forEach((el) => {
      el.className = t === 'dark' ? 'pi pi-sun' : 'pi pi-moon';
    });
  }
  let theme = localStorage.getItem(THEME_KEY) || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(theme);
  window.WTHEME = {
    get: () => theme,
    toggle() {
      theme = theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, theme);
      applyTheme(theme);
      window.dispatchEvent(new CustomEvent('wtheme', { detail: theme }));
    },
  };

  // ---------- Groups order ----------
  const GROUPS = [
    { key: 'Começar', icon: 'pi pi-bookmark' },
    { key: 'UI', icon: 'pi pi-objects-column' },
    { key: 'CRUD', icon: 'pi pi-table' },
    { key: 'Formulário', icon: 'pi pi-pencil' },
    { key: 'Composables', icon: 'pi pi-code' },
  ];

  // ---------- Build sidebar ----------
  function buildSidebar() {
    const reg = window.WREG || [];
    const host = document.querySelector('[data-nav]');
    if (!host) return;
    const activeSlug = document.body.getAttribute('data-slug') || '';
    const base = document.body.getAttribute('data-base') || '';

    let html = '';
    // intro links (static)
    html += `<div class="nav__group">
      <div class="nav__label"><i class="pi pi-bookmark"></i> Começar</div>
      ${navLink(base + 'index.html', 'pi pi-compass', 'Visão geral', activeSlug === 'index')}
      ${navLink(base + 'guia.html', 'pi pi-book', 'Guia & Setup', activeSlug === 'guia')}
      ${navLink(base + 'guia.html#migracao', 'pi pi-arrow-right-arrow-left', 'Migração', false)}
      ${navLink(base + 'index.html#tokens', 'pi pi-palette', 'Design tokens', false)}
    </div>`;

    html += `<div class="nav__group">
      <div class="nav__label"><i class="pi pi-wrench"></i> Ferramentas</div>
      <a class="nav__item${activeSlug === 'schema' ? ' is-active' : ''}" href="${base}playground.html" data-search="schema playground builder"><i class="ico pi pi-bolt"></i><span class="nm">Schema Playground</span><span class="badge soon">novo</span></a>
    </div>`;

    GROUPS.slice(1).forEach((g) => {
      const items = reg.filter((c) => c.cat === g.key);
      if (!items.length) return;
      html += `<div class="nav__group"><div class="nav__label"><i class="${g.icon}"></i> ${g.key} <span class="ct">${items.length}</span></div>`;
      items.forEach((c) => {
        const active = c.slug === activeSlug;
        const badge = c.badge ? `<span class="badge ${c.badgeKind || ''}">${c.badge}</span>` : '';
        html += `<a class="nav__item${active ? ' is-active' : ''}" href="${base}c/${c.slug}.html" data-search="${(c.name + ' ' + (c.tagline || '')).toLowerCase()}">
          <span class="nm">${c.name}</span>${badge}</a>`;
      });
      html += `</div>`;
    });
    host.innerHTML = html;

    function navLink(href, icon, label, active) {
      return `<a class="nav__item${active ? ' is-active' : ''}" href="${href}" data-search="${label.toLowerCase()}"><i class="ico ${icon}"></i><span class="nm">${label}</span></a>`;
    }
  }

  // ---------- Search filter ----------
  function wireSearch() {
    const input = document.querySelector('[data-nav-search]');
    if (!input) return;
    input.addEventListener('input', () => {
      const q = input.value.trim().toLowerCase();
      document.querySelectorAll('[data-nav] .nav__item').forEach((a) => {
        const hit = !q || (a.getAttribute('data-search') || '').includes(q);
        a.style.display = hit ? '' : 'none';
      });
      document.querySelectorAll('[data-nav] .nav__group').forEach((g) => {
        const any = [...g.querySelectorAll('.nav__item')].some((a) => a.style.display !== 'none');
        g.style.display = any ? '' : 'none';
      });
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  // ---------- Copy buttons (delegated) ----------
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const code = btn.closest('.code')?.querySelector('code');
    if (!code) return;
    navigator.clipboard.writeText(code.innerText).then(() => {
      btn.classList.add('copied');
      const span = btn.querySelector('span');
      const prev = span ? span.textContent : '';
      if (span) span.textContent = 'Copiado!';
      btn.querySelector('i').className = 'pi pi-check';
      setTimeout(() => {
        btn.classList.remove('copied');
        if (span) span.textContent = prev || 'Copiar';
        btn.querySelector('i').className = 'pi pi-copy';
      }, 1500);
    });
  });

  // ---------- Theme toggle buttons ----------
  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-theme-toggle]')) window.WTHEME.toggle();
    if (e.target.closest('[data-menu-btn]')) document.querySelector('.sidebar')?.classList.toggle('is-open');
  });

  // ---------- Tabs (delegated) ----------
  document.addEventListener('click', (e) => {
    const tab = e.target.closest('[data-tab]');
    if (!tab) return;
    const wrap = tab.closest('[data-tabs]');
    const id = tab.getAttribute('data-tab');
    wrap.querySelectorAll('[data-tab]').forEach((t) => t.classList.toggle('is-on', t === tab));
    // panes may live inside [data-tabs] OR as siblings — scope to the parent container
    const scope = wrap.parentElement || wrap;
    scope.querySelectorAll('[data-pane]').forEach((p) => p.classList.toggle('is-on', p.getAttribute('data-pane') === id));
  });

  document.addEventListener('DOMContentLoaded', () => {
    buildSidebar();
    wireSearch();
  });
  // also build immediately if WREG already loaded
  if (window.WREG) { buildSidebar(); }
  window.WBUILD_SIDEBAR = buildSidebar;
})();
