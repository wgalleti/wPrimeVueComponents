/* ============================================================
   Schema Playground — edit FieldDef[]/ColumnDef[] and watch
   WCrudView + WFormRenderer + generated code react live.
   ============================================================ */
(function () {
  const H = window.H, WC = window.WC;

  const TYPES = ['text', 'number', 'currency', 'date', 'select', 'switch', 'cpf_cnpj', 'cep', 'textarea', 'color', 'image'];

  let state = [
    { field: 'nome', label: 'Nome', type: 'text', required: true, colSpan: 2, table: true, form: true },
    { field: 'sku', label: 'SKU', type: 'text', required: false, colSpan: 1, table: true, form: true },
    { field: 'categoria', label: 'Categoria', type: 'select', required: false, colSpan: 1, table: true, form: true },
    { field: 'preco', label: 'Preço', type: 'currency', required: false, colSpan: 1, table: true, form: true },
    { field: 'estoque', label: 'Estoque', type: 'number', required: false, colSpan: 1, table: true, form: true },
    { field: 'validade', label: 'Validade', type: 'date', required: false, colSpan: 1, table: false, form: true },
    { field: 'ativo', label: 'Ativo', type: 'switch', required: false, colSpan: 2, table: true, form: true },
  ];

  // ---------- sample data ----------
  const TXT = { nome: ['Picanha Premium', 'Costela Suína', 'Filé de Frango', 'Maminha'], sku: ['PIC-001', 'COS-014', 'FRA-220', 'MAM-009'] };
  function sample(f, i) {
    switch (f.type) {
      case 'currency': return ['R$ 79,90', 'R$ 24,50', 'R$ 18,90', 'R$ 56,00'][i];
      case 'number': return [128, 64, 12, 41][i];
      case 'date': return ['12/06/2026', '03/07/2026', '28/06/2026', '15/06/2026'][i];
      case 'switch': return [true, true, false, true][i];
      case 'select': return ['Bovinos', 'Suínos', 'Aves', 'Bovinos'][i];
      case 'cpf_cnpj': return ['123.456.789-01', '12.345.678/0001-90', '987.654.321-00', '11.222.333/0001-44'][i];
      case 'cep': return ['01310-100', '20040-002', '80010-010', '90010-150'][i];
      case 'color': return ['#ef4444', '#10b981', '#3b82f6', '#eab308'][i];
      default: return (TXT[f.field] || ['Item A', 'Item B', 'Item C', 'Item D'])[i];
    }
  }
  function colType(t) { return t === 'switch' ? 'boolean' : ['currency', 'number', 'date'].includes(t) ? t : 'text'; }

  // ---------- table ----------
  function buildTable() {
    const cols = state.filter((f) => f.table);
    if (!cols.length)
      return `<div class="w-crud-table">${WC.emptyState({ icon: 'pi pi-table', title: 'Nenhuma coluna', description: 'Marque ao menos um campo como coluna no construtor.' })}</div>`;
    const cell = (f, i) => {
      const v = sample(f, i), ct = colType(f.type);
      if (ct === 'boolean') return WC.statusTag({ value: v ? 'ativo' : 'inativo' });
      if (ct === 'currency') return `<span style="font-weight:600;font-variant-numeric:tabular-nums">${v}</span>`;
      if (ct === 'number') return `<span style="font-variant-numeric:tabular-nums">${v}</span>`;
      if (ct === 'date') return `<span style="color:var(--p-text-muted-color);font-variant-numeric:tabular-nums">${v}</span>`;
      return `<span>${H.esc(v)}</span>`;
    };
    const align = (f) => (['currency', 'number'].includes(colType(f.type)) ? ' class="text-right"' : '');
    return `<div class="w-crud" style="width:100%">
      <div class="w-crud-header"><div class="w-crud-header-content"><h1 class="w-crud-title">Produtos</h1><p class="w-crud-subtitle">gerado a partir do seu schema</p></div>
      <div class="w-crud-header-actions">${H.button({ label: 'Novo', icon: 'pi pi-plus' })}</div></div>
      <div class="w-crud-table">
        <div style="padding:.55rem .75rem;border-bottom:1px solid var(--p-content-border-color)"><div class="w-crud-toolbar"><div class="w-crud-toolbar-start">
          <div class="p-iconfield" style="width:16rem"><i class="p-inputicon pi pi-search"></i><input class="p-inputtext" placeholder="Buscar..."></div>
        </div></div></div>
        <table class="p-datatable p-datatable--striped"><thead><tr>
          ${cols.map((f) => `<th${align(f)}><span class="pv-th">${H.esc(f.label)}</span></th>`).join('')}
          <th class="text-center" style="width:6rem">Ações</th>
        </tr></thead><tbody>
        ${[0, 1, 2, 3].map((i) => `<tr>${cols.map((f) => `<td${align(f)}${f.field === 'nome' ? ' style="font-weight:500"' : ''}>${cell(f, i)}</td>`).join('')}
          <td class="text-center"><div class="w-crud-actions">${H.button({ icon: 'pi pi-pencil', text: true, rounded: true, size: 'small', severity: 'secondary' })}${H.button({ icon: 'pi pi-trash', text: true, rounded: true, size: 'small', severity: 'danger' })}</div></td>
        </tr>`).join('')}
        </tbody></table>
        <div class="p-paginator"><span class="p-paginator__current">Página 1 de 12</span><button class="p-paginator__btn" disabled><i class="pi pi-chevron-left"></i></button><button class="p-paginator__btn"><i class="pi pi-chevron-right"></i></button></div>
      </div>
    </div>`;
  }

  // ---------- form ----------
  function buildForm() {
    const fields = state.filter((f) => f.form);
    if (!fields.length) return WC.emptyState({ icon: 'pi pi-pencil', title: 'Nenhum campo', description: 'Marque ao menos um campo como formulário.' });
    const withValues = fields.map((f) => Object.assign({}, f, { value: f.type === 'switch' ? true : sample(f, 0) }));
    return `<div class="surface-frame" style="border:1px solid var(--p-content-border-color);padding:1.25rem;width:100%">${WC.formRenderer({ fields: withValues })}</div>`;
  }

  // ---------- code ----------
  function buildCode() {
    const cols = state.filter((f) => f.table).map((f) => {
      const t = colType(f.type);
      return `  { field: '${f.field}', header: '${f.label}'${t !== 'text' ? `, type: '${t}'` : ''} },`;
    }).join('\n');
    const form = state.filter((f) => f.form).map((f) => {
      const parts = [`field: '${f.field}'`, `label: '${f.label}'`];
      if (f.type !== 'text') parts.push(`type: '${f.type}'`);
      if (f.required) parts.push('required: true');
      if (f.colSpan === 2) parts.push('colSpan: 2');
      return `  { ${parts.join(', ')} },`;
    }).join('\n');
    const code = `import type { ColumnDef, FieldDef } from '@wgalleti/primevue-components'\n\nconst columns: ColumnDef[] = [\n${cols}\n]\n\nconst form: FieldDef[] = [\n${form}\n]\n\nconst crud = useCrudManager({ endpoint: '/api/v1/produtos/', columns, form })`;
    return H.codeBlock(code, 'ts');
  }

  // ---------- builder panel ----------
  function buildBuilder() {
    return state.map((f, i) => `<div class="sb-row" data-i="${i}">
      <div class="sb-row__top">
        <input class="sb-inp sb-inp--label" data-k="label" value="${H.esc(f.label)}" placeholder="Label">
        <button class="sb-del" data-del title="Remover"><i class="pi pi-times"></i></button>
      </div>
      <div class="sb-row__grid">
        <input class="sb-inp" data-k="field" value="${H.esc(f.field)}" placeholder="field">
        <select class="sb-inp" data-k="type">${TYPES.map((t) => `<option ${t === f.type ? 'selected' : ''}>${t}</option>`).join('')}</select>
      </div>
      <div class="sb-row__flags">
        <label class="sb-flag${f.table ? ' is-on' : ''}" data-flag="table"><i class="pi pi-table"></i> coluna</label>
        <label class="sb-flag${f.form ? ' is-on' : ''}" data-flag="form"><i class="pi pi-pencil"></i> form</label>
        <label class="sb-flag${f.required ? ' is-on' : ''}" data-flag="required"><i class="pi pi-asterisk"></i> obrig.</label>
        <label class="sb-flag${f.colSpan === 2 ? ' is-on' : ''}" data-flag="colSpan"><i class="pi pi-arrows-h"></i> full</label>
      </div>
    </div>`).join('');
  }

  function renderPreview() {
    const root = document.getElementById('sp');
    root.querySelector('[data-pane="tabela"]').innerHTML = `<div class="stage"><div class="stage__bar"><span class="stage__dot"></span><span class="stage__dot"></span><span class="stage__dot"></span><span class="stage__title">WCrudView</span></div><div class="stage__canvas stage__canvas--stretch"><div class="stage__inner pv">${buildTable()}</div></div></div>`;
    root.querySelector('[data-pane="form"]').innerHTML = `<div class="stage"><div class="stage__bar"><span class="stage__dot"></span><span class="stage__dot"></span><span class="stage__dot"></span><span class="stage__title">WFormRenderer</span></div><div class="stage__canvas stage__canvas--stretch"><div class="stage__inner pv">${buildForm()}</div></div></div>`;
    root.querySelector('[data-pane="schema"]').innerHTML = buildCode();
  }

  function wireBuilder() {
    const host = document.getElementById('sp-builder');
    host.innerHTML = buildBuilder();
    host.querySelectorAll('.sb-row').forEach((row) => {
      const i = +row.getAttribute('data-i');
      row.querySelectorAll('[data-k]').forEach((inp) => {
        const k = inp.getAttribute('data-k');
        inp.addEventListener('input', () => {
          state[i][k] = inp.value;
          if (k === 'type') { renderPreview(); }
          else renderPreview();
        });
      });
      row.querySelectorAll('[data-flag]').forEach((fl) => {
        const k = fl.getAttribute('data-flag');
        fl.addEventListener('click', () => {
          if (k === 'colSpan') state[i].colSpan = state[i].colSpan === 2 ? 1 : 2;
          else state[i][k] = !state[i][k];
          fl.classList.toggle('is-on');
          renderPreview();
        });
      });
      row.querySelector('[data-del]').addEventListener('click', () => { state.splice(i, 1); wireBuilder(); renderPreview(); });
    });
    renderPreview();
  }

  function init() {
    const host = document.getElementById('page');
    if (!host) return;
    host.innerHTML = `
      <div class="cphead">
        <div class="cphead__cat">Ferramentas · Interativo</div>
        <h1 class="cphead__title">Schema Playground</h1>
        <p class="cphead__desc">Toda a biblioteca é dirigida por <code style="font-family:var(--font-mono);font-size:.9em">ColumnDef[]</code> e <code style="font-family:var(--font-mono);font-size:.9em">FieldDef[]</code>. Monte um schema no construtor e veja a tabela, o formulário e o código TypeScript se atualizarem ao vivo.</p>
      </div>
      <div class="sp" id="sp">
        <div class="sp__builder">
          <div class="pg__controls-title"><i class="pi pi-sliders-h"></i> Construtor de schema</div>
          <div id="sp-builder"></div>
          <button class="sp__add" data-add><i class="pi pi-plus"></i> Adicionar campo</button>
        </div>
        <div class="sp__preview">
          <div class="tabs" data-tabs>
            <button class="tab is-on" data-tab="tabela">Tabela</button>
            <button class="tab" data-tab="form">Formulário</button>
            <button class="tab" data-tab="schema">Schema (TS)</button>
          </div>
          <div class="tabpane is-on" data-pane="tabela"></div>
          <div class="tabpane" data-pane="form"></div>
          <div class="tabpane" data-pane="schema"></div>
        </div>
      </div>`;

    document.querySelector('[data-crumbs]').innerHTML = `<a href="index.html">Componentes</a><span class="sep">/</span><span class="muted">Ferramentas</span><span class="sep">/</span><span class="cur">Schema Playground</span>`;

    document.querySelector('[data-add]').addEventListener('click', () => {
      const n = state.length + 1;
      state.push({ field: 'campo_' + n, label: 'Campo ' + n, type: 'text', required: false, colSpan: 1, table: true, form: true });
      wireBuilder();
    });

    wireBuilder();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
