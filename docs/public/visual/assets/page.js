/* ============================================================
   Component page builder — reads body[data-slug], finds the
   registry entry, renders header + playground + usage + API.
   ============================================================ */
(function () {
  const H = window.H;

  function chips(entry) {
    const out = [];
    out.push(`<span class="chip"><i class="pi pi-file"></i>${entry.source}</span>`);
    out.push(`<span class="chip"><i class="pi pi-box"></i>${entry.cat}</span>`);
    if (entry.badge) out.push(`<span class="chip chip--imp"><i class="pi pi-bookmark"></i>${entry.badge}</span>`);
    if (entry.slots && entry.slots.length) out.push(`<span class="chip"><i class="pi pi-clone"></i>${entry.slots.length} slots</span>`);
    return out.join('');
  }

  function apiTable(rows, kind) {
    if (!rows || !rows.length)
      return `<p class="muted" style="font-size:.86rem">Nenhum ${kind} público.</p>`;
    if (kind === 'prop') {
      return `<table class="apitable"><thead><tr><th>Prop</th><th>Tipo</th><th>Padrão</th><th>Descrição</th></tr></thead><tbody>
        ${rows.map((r) => `<tr>
          <td class="nm">${r.name}${r.req ? '<span class="req">*</span>' : ''}</td>
          <td class="ty">${H.esc(r.type)}</td>
          <td class="df">${r.def ? H.esc(r.def) : '—'}</td>
          <td class="ds">${r.desc}</td></tr>`).join('')}
      </tbody></table>`;
    }
    if (kind === 'slot') {
      return `<table class="apitable"><thead><tr><th>Slot</th><th>Descrição</th></tr></thead><tbody>
        ${rows.map((r) => `<tr><td class="nm">${r.name}</td><td class="ds">${r.desc}</td></tr>`).join('')}
      </tbody></table>`;
    }
    return `<table class="apitable"><thead><tr><th>Evento</th><th>Payload</th><th>Descrição</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td class="nm">${r.name}</td><td class="ty">${H.esc(r.payload)}</td><td class="ds">${r.desc}</td></tr>`).join('')}
    </tbody></table>`;
  }

  function genericTable(rows, head) {
    if (!rows || !rows.length) return `<p class="muted" style="font-size:.86rem">—</p>`;
    return `<table class="apitable"><thead><tr><th>${head}</th><th>Tipo</th><th>Descrição</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td class="nm">${r.name}</td><td class="ty">${H.esc(r.type)}</td><td class="ds">${r.desc}</td></tr>`).join('')}
    </tbody></table>`;
  }

  function controlHTML(c, val) {
    let inner = '';
    if (c.type === 'text') inner = `<input type="text" data-ck="${c.key}" value="${H.esc(val)}">`;
    else if (c.type === 'number') inner = `<input type="number" data-ck="${c.key}" value="${H.esc(val)}">`;
    else if (c.type === 'select')
      inner = `<select data-ck="${c.key}">${c.options.map((o) => `<option ${o === val ? 'selected' : ''}>${H.esc(o)}</option>`).join('')}</select>`;
    else if (c.type === 'seg')
      inner = `<div class="seg" data-seg="${c.key}">${c.options.map((o) => `<button data-v="${H.esc(o)}" class="${o == val ? 'is-on' : ''}">${H.esc(o)}</button>`).join('')}</div>`;
    else if (c.type === 'toggle')
      inner = `<div class="tog ${val ? 'is-on' : ''}" data-tog="${c.key}"><div class="tog__sw"></div></div>`;
    else if (c.type === 'range')
      inner = `<input type="range" data-ck="${c.key}" min="${c.min}" max="${c.max}" step="${c.step || 1}" value="${val}">`;

    const valDisplay = c.type === 'range' ? `<span class="ctrl__val" data-rangeval="${c.key}">${val}</span>` : '';
    const labelRight = c.type === 'toggle' ? '' : valDisplay;
    return `<div class="ctrl">
      <div class="ctrl__label"><span><code>${c.key}</code></span>${labelRight}</div>
      ${inner}
    </div>`;
  }

  function build(entry) {
    const pg = entry.playground || {};
    const stretch = pg.stretch ? ' stage__canvas--stretch' : '';
    const maxw = pg.maxw ? `style="max-width:${pg.maxw}px"` : '';

    const examplesHTML = (entry.examples || [])
      .map((ex) => `<div style="margin-bottom:1.2rem"><div class="block__head" style="margin-bottom:.6rem"><span class="block__num">—</span><h2 style="font-size:1.05rem">${H.esc(ex.title)}</h2></div>${H.codeBlock(ex.code, ex.lang || 'vue')}</div>`)
      .join('');

    const hasControls = pg.controls && pg.controls.length;

    const isComposable = entry.cat === 'Composables';
    const apiBlock = isComposable
      ? `<div class="block">
      <div class="block__head"><span class="block__num">03</span><h2>API</h2></div>
      <div style="margin-bottom:1.6rem"><div class="sec-eyebrow" style="margin-bottom:.7rem">Parâmetros</div>${genericTable(entry.params, 'Parâmetro')}</div>
      <div><div class="sec-eyebrow" style="margin-bottom:.7rem">Retorno</div>${genericTable(entry.returns, 'Retorno')}</div>
    </div>`
      : `<div class="block">
      <div class="block__head"><span class="block__num">03</span><h2>API</h2></div>
      <div style="margin-bottom:1.6rem"><div class="sec-eyebrow" style="margin-bottom:.7rem">Props</div>${apiTable(entry.props, 'prop')}</div>
      <div style="margin-bottom:1.6rem"><div class="sec-eyebrow" style="margin-bottom:.7rem">Slots</div>${apiTable(entry.slots, 'slot')}</div>
      <div><div class="sec-eyebrow" style="margin-bottom:.7rem">Eventos</div>${apiTable(entry.events, 'event')}</div>
    </div>`;

    return `
    <div class="cphead">
      <div class="cphead__cat">${entry.cat} · ${isComposable ? 'Composable' : 'Componente'}</div>
      <h1 class="cphead__title">${isComposable ? entry.name + '<span class="tag-prefix">()</span>' : '<span class="tag-prefix">&lt;</span>' + entry.name + '<span class="tag-prefix"> /&gt;</span>'}</h1>
      <p class="cphead__desc">${entry.desc}</p>
      <div class="cphead__meta">${chips(entry)}</div>
    </div>

    <div class="block">
      <div class="block__head"><span class="block__num">01</span><h2>${isComposable ? 'Demonstração' : 'Playground'}</h2></div>
      <p class="block__sub">${hasControls ? 'Ajuste as props ao lado e veja o componente reagir em tempo real.' : isComposable ? 'O que este composable aciona na interface.' : 'Pré-visualização ao vivo do componente.'}</p>
      <div class="${hasControls ? 'pg' : ''}">
        <div class="${hasControls ? 'pg__stage' : ''}">
          <div class="stage">
            <div class="stage__bar">
              <span class="stage__dot"></span><span class="stage__dot"></span><span class="stage__dot"></span>
              <span class="stage__title">preview · ${entry.name}</span>
              <div class="stage__tools">
                <button class="stage__tool" data-pg-reset><i class="pi pi-refresh"></i> reset</button>
              </div>
            </div>
            <div class="stage__canvas${stretch}">
              <div class="stage__inner pv" data-pg-out ${maxw}></div>
            </div>
          </div>
        </div>
        ${hasControls ? `<div class="pg__controls">
          <div class="pg__controls-title"><i class="pi pi-sliders-h"></i> Props</div>
          <div data-pg-controls></div>
        </div>` : ''}
      </div>
      ${entry.importLine ? `<div style="margin-top:1rem">${H.codeBlock(entry.importLine, 'ts')}</div>` : ''}
    </div>

    ${examplesHTML ? `<div class="block">
      <div class="block__head"><span class="block__num">02</span><h2>Uso</h2></div>
      ${examplesHTML}
    </div>` : ''}

    ${apiBlock}

    ${entry.note ? `<div class="callout"><i class="pi pi-info-circle"></i><div>${entry.note}</div></div>` : ''}
    `;
  }

  function wirePlayground(entry, root) {
    const pg = entry.playground || {};
    const out = root.querySelector('[data-pg-out]');
    const ctrlHost = root.querySelector('[data-pg-controls]');
    if (!out) return;
    const state = Object.assign({}, pg.defaults || {});

    function rerender() {
      const props = pg.map ? pg.map(Object.assign({}, state)) : Object.assign({}, state);
      if (pg.mount) { out.innerHTML = ''; pg.mount(out, props); }
      else out.innerHTML = pg.render ? pg.render(props) : (entry.preview ? entry.preview() : '');
    }

    if (ctrlHost && pg.controls) {
      ctrlHost.innerHTML = pg.controls.map((c) => controlHTML(c, state[c.key])).join('');
      // text / number / select / range
      ctrlHost.querySelectorAll('[data-ck]').forEach((inp) => {
        const key = inp.getAttribute('data-ck');
        const ev = inp.type === 'range' || inp.tagName === 'SELECT' ? 'input' : 'input';
        inp.addEventListener(ev, () => {
          let v = inp.value;
          if (inp.type === 'number' || inp.type === 'range') v = Number(v);
          state[key] = v;
          const rv = ctrlHost.querySelector(`[data-rangeval="${key}"]`);
          if (rv) rv.textContent = v;
          rerender();
        });
      });
      // segmented
      ctrlHost.querySelectorAll('[data-seg]').forEach((seg) => {
        const key = seg.getAttribute('data-seg');
        seg.addEventListener('click', (e) => {
          const b = e.target.closest('button'); if (!b) return;
          let v = b.getAttribute('data-v');
          if (!isNaN(Number(v)) && v.trim() !== '') v = Number(v);
          state[key] = v;
          seg.querySelectorAll('button').forEach((x) => x.classList.toggle('is-on', x === b));
          rerender();
        });
      });
      // toggles
      ctrlHost.querySelectorAll('[data-tog]').forEach((tg) => {
        const key = tg.getAttribute('data-tog');
        tg.addEventListener('click', () => {
          state[key] = !state[key];
          tg.classList.toggle('is-on', state[key]);
          rerender();
        });
      });
    }

    const resetBtn = root.querySelector('[data-pg-reset]');
    if (resetBtn) resetBtn.addEventListener('click', () => {
      Object.assign(state, pg.defaults || {});
      if (ctrlHost && pg.controls) {
        ctrlHost.innerHTML = pg.controls.map((c) => controlHTML(c, state[c.key])).join('');
        wirePlayground(entry, root); // re-wire (simple)
      }
      rerender();
    });

    rerender();
  }

  function init() {
    const slug = document.body.getAttribute('data-slug');
    const entry = (window.WREG || []).find((c) => c.slug === slug);
    const host = document.getElementById('page');
    if (!entry || !host) return;

    // crumbs
    const cr = document.querySelector('[data-crumbs]');
    if (cr) cr.innerHTML = `<a href="../index.html">Componentes</a><span class="sep">/</span><span class="muted">${entry.cat}</span><span class="sep">/</span><span class="cur">${entry.name}</span>`;
    document.title = `${entry.name} · wPrimeVueComponents`;

    host.innerHTML = build(entry);
    wirePlayground(entry, host);

    // prev / next nav
    const list = window.WREG;
    const idx = list.findIndex((c) => c.slug === slug);
    const prev = list[idx - 1], next = list[idx + 1];
    const nav = document.createElement('div');
    nav.style.cssText = 'display:flex;justify-content:space-between;gap:1rem;margin-top:4rem;border-top:1px solid var(--line);padding-top:1.5rem';
    nav.innerHTML = `
      ${prev ? `<a href="${prev.slug}.html" class="chip" style="padding:.6rem 1rem"><i class="pi pi-arrow-left"></i> ${prev.name}</a>` : '<span></span>'}
      ${next ? `<a href="${next.slug}.html" class="chip" style="padding:.6rem 1rem">${next.name} <i class="pi pi-arrow-right"></i></a>` : '<span></span>'}`;
    host.appendChild(nav);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
