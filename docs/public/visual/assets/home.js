/* ============================================================
   Home page — catalog grid, stats, install, tokens
   ============================================================ */
(function () {
  const H = window.H;
  function init() {
    const reg = window.WREG || [];

    // ---- stats ----
    const comps = reg.filter((c) => c.cat !== 'Composables');
    const cmps = reg.filter((c) => c.cat === 'Composables');
    const set = (sel, v) => { const e = document.querySelector(sel); if (e) e.textContent = v; };
    set('[data-stat-total]', reg.length);
    set('[data-stat-comp]', comps.length);
    set('[data-stat-cmp]', cmps.length);

    // ---- catalog ----
    const host = document.querySelector('[data-catalog]');
    if (host) {
      const GROUPS = [
        { key: 'UI', label: 'Blocos de UI', desc: 'Cabeçalhos, cards, KPIs e estados — a camada visual reutilizável.' },
        { key: 'CRUD', label: 'CRUD', desc: 'Tabela, dialog e renderização — o núcleo de gestão de dados.' },
        { key: 'Formulário', label: 'Formulário', desc: 'Motor de formulários por schema e seleção de FK.' },
        { key: 'Composables', label: 'Composables', desc: 'A lógica: estado de CRUD, API, formatadores e feedback.' },
      ];
      let html = '';
      GROUPS.forEach((g, gi) => {
        const items = reg.filter((c) => c.cat === g.key);
        if (!items.length) return;
        html += `<section class="block" style="margin-top:${gi === 0 ? '1rem' : '3rem'}">
          <div class="block__head"><span class="block__num">${String(gi + 1).padStart(2, '0')}</span><h2>${g.label}</h2><span class="muted" style="font-size:.8rem;font-family:var(--font-mono)">${items.length}</span></div>
          <p class="block__sub">${g.desc}</p>
          <div class="cat-grid">
            ${items.map((c) => card(c)).join('')}
          </div>
        </section>`;
      });
      host.innerHTML = html;
    }

    function card(c) {
      let prev;
      try { prev = c.preview ? c.preview() : null; } catch (e) { prev = null; }
      const previewHTML = prev
        ? `<div class="pv" style="transform:scale(.82);transform-origin:center;max-width:100%">${prev}</div>`
        : `<div style="font-family:var(--font-mono);font-size:1.5rem;color:var(--accent);display:flex;align-items:center;gap:.5rem"><i class="${c.icon}"></i></div>`;
      const isC = c.cat === 'Composables';
      return `<a class="cat-card" href="c/${c.slug}.html">
        <div class="cat-card__preview">${previewHTML}</div>
        <div class="cat-card__body">
          <div class="cat-card__name">${isC ? '' : '<span class="px">&lt;</span>'}${c.name}${isC ? '<span class="px">()</span>' : '<span class="px"> /&gt;</span>'}</div>
          <div class="cat-card__desc">${c.tagline}</div>
          <div class="cat-card__foot">
            <span class="chip" style="padding:.18rem .5rem;font-size:.62rem"><i class="${c.icon}"></i> ${c.cat}</span>
            ${c.badge ? `<span class="chip chip--imp" style="padding:.18rem .5rem;font-size:.62rem">${c.badge}</span>` : ''}
          </div>
        </div>
      </a>`;
    }

    // ---- install code ----
    const ic = document.querySelector('[data-install-code]');
    if (ic) {
      ic.innerHTML = `<div style="display:grid;gap:1rem">
        ${H.codeBlock(`# instalar via git\nyarn add git+https://github.com/wgalleti/wPrimeVueComponents.git\nyarn add vue@^3.4 primevue@^4.0 dayjs@^1.11`, 'bash')}
        ${H.codeBlock(`import { WPrimeVuePlugin } from '@wgalleti/primevue-components'\nimport api from './plugins/axios'\n\napp.use(PrimeVue)\napp.use(ToastService)\napp.use(ConfirmationService)\napp.use(WPrimeVuePlugin, {\n  axios: api,\n  defaultPageSize: 20,\n  dateFormat: 'DD/MM/YYYY',\n  locale: 'pt-BR',\n})`, 'ts')}
      </div>`;
    }

    // ---- tokens ----
    const tk = document.querySelector('[data-tokens]');
    if (tk) {
      const swatch = (name, varName) => `<div style="border:1px solid var(--line);border-radius:12px;overflow:hidden;background:var(--surface)">
        <div style="height:64px;background:var(${varName})"></div>
        <div style="padding:.6rem .7rem"><div style="font-family:var(--font-mono);font-size:.72rem;font-weight:600">${name}</div><div style="font-family:var(--font-mono);font-size:.64rem;color:var(--muted)">${varName}</div></div>
      </div>`;
      tk.innerHTML = `
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:.75rem;margin-bottom:1.5rem">
          ${swatch('primary', '--p-primary-color')}
          ${swatch('success', '--p-green-500')}
          ${swatch('warning', '--p-yellow-500')}
          ${swatch('danger', '--p-red-500')}
          ${swatch('info', '--p-blue-500')}
          ${swatch('border', '--p-content-border-color')}
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem">
          <div class="surface-frame" style="border:1px solid var(--p-content-border-color);padding:1.25rem">
            <div class="sec-eyebrow" style="margin-bottom:.6rem">Display · Instrument Serif</div>
            <div style="font-family:var(--font-display);font-size:2.2rem;line-height:1">Picanha &amp; <em style="font-style:italic;color:var(--accent)">precisão</em></div>
          </div>
          <div class="surface-frame" style="border:1px solid var(--p-content-border-color);padding:1.25rem">
            <div class="sec-eyebrow" style="margin-bottom:.6rem">Mono · JetBrains Mono</div>
            <div style="font-family:var(--font-mono);font-size:.9rem;line-height:1.7"><span style="color:var(--accent)">const</span> crud = <span style="color:var(--accent)">useCrudManager</span>()</div>
          </div>
        </div>`;
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
