/* ============================================================
   Live component renderers — CRUD + Form group
   ============================================================ */
(function () {
  const H = window.H;
  const WC = (window.WC = window.WC || {});

  // ---------- field input (shared by FormRenderer & FormDialog) ----------
  function chevron() { return '<span class="p-select__dropdown"><i class="pi pi-chevron-down"></i></span>'; }

  WC.formField = (f) => {
    const v = f.value;
    const ph = f.placeholder || '';
    let control = '';
    switch (f.type) {
      case 'switch':
        return `<div class="w-crud-form-switch">
          <div class="p-toggleswitch${f.value ? ' is-on' : ''}"><div class="p-toggleswitch__slider"></div></div>
          <span class="w-crud-form-switch-label">${H.esc(f.switchLabel || f.label)}</span>
        </div>`;
      case 'textarea':
        control = `<textarea class="p-inputtext" rows="${f.rows || 3}" placeholder="${H.esc(ph)}">${H.esc(v || '')}</textarea>`;
        break;
      case 'select':
      case 'fk':
      case 'autocomplete':
        control = `<div class="p-select"><span class="p-select__label${v ? '' : ' p-select__label--placeholder'}">${H.esc(v || ph || 'Selecione...')}</span>${chevron()}</div>`;
        break;
      case 'date':
      case 'datetime':
        control = `<div class="p-iconfield"><i class="p-inputicon pi pi-calendar"></i><input class="p-inputtext" style="padding-left:2.25rem" value="${H.esc(v || '')}" placeholder="${H.esc(ph || (f.type === 'datetime' ? 'DD/MM/AAAA HH:mm' : 'DD/MM/AAAA'))}"></div>`;
        break;
      case 'currency':
        control = `<input class="p-inputtext" value="${H.esc(v || 'R$ 0,00')}">`;
        break;
      case 'number':
        control = `<input class="p-inputtext" type="text" value="${H.esc(v != null ? v : '')}" placeholder="${H.esc(ph || '0')}">`;
        break;
      case 'color':
        control = `<div class="w-crud-form-color-row"><span class="p-colorpicker" style="background:${v || '#10b981'}"></span><input class="p-inputtext" value="${v || '#10b981'}" style="max-width:8rem"></div>`;
        break;
      case 'cpf_cnpj':
        control = `<input class="p-inputtext" value="${H.esc(v || '')}" placeholder="000.000.000-00">`;
        break;
      case 'mask':
        control = `<input class="p-inputtext" value="${H.esc(v || '')}" placeholder="${H.esc(f.mask || ph)}">`;
        break;
      case 'cep':
        control = `<div class="p-iconfield"><i class="p-inputicon pi pi-search"></i><input class="p-inputtext" style="padding-left:2.25rem" value="${H.esc(v || '')}" placeholder="00000-000"></div>`;
        break;
      case 'password':
        control = `<input class="p-inputtext" type="password" value="${v || '••••••••'}">`;
        break;
      case 'image':
        return `<div class="w-crud-form-field ${f.colSpan === 2 ? 'w-crud-form-col-full' : ''}">
          <label class="w-crud-form-label">${H.esc(f.label)}${f.required ? '<span class="w-crud-form-required">*</span>' : ''}</label>
          <div style="border:1.5px dashed var(--p-content-border-color);border-radius:10px;padding:1.4rem;text-align:center;color:var(--p-text-muted-color);font-size:.8rem;background:var(--p-content-hover-background)">
            <i class="pi pi-image" style="font-size:1.3rem;display:block;margin-bottom:.4rem"></i>Arraste uma imagem ou clique para enviar
          </div>
        </div>`;
      default:
        control = `<input class="p-inputtext" value="${H.esc(v || '')}" placeholder="${H.esc(ph)}">`;
    }
    const span = f.colSpan === 2 ? 'w-crud-form-col-full' : f.colSpan === 1 ? 'w-crud-form-col-half' : '';
    return `<div class="w-crud-form-field ${span}">
      <label class="w-crud-form-label">${H.esc(f.label)}${f.required ? '<span class="w-crud-form-required">*</span>' : ''}</label>
      ${control}
      ${f.error ? `<span class="w-crud-form-error">${H.esc(f.error)}</span>` : ''}
    </div>`;
  };

  // ---------- WFormRenderer ----------
  WC.formRenderer = (p = {}) => {
    const fields = p.fields || [
      { field: 'nome', label: 'Nome', type: 'text', required: true, value: 'Picanha Premium', colSpan: 2 },
      { field: 'sku', label: 'SKU', type: 'text', value: 'PIC-001' },
      { field: 'categoria', label: 'Categoria', type: 'select', value: 'Bovinos' },
      { field: 'preco', label: 'Preço', type: 'currency', value: 'R$ 79,90' },
      { field: 'estoque', label: 'Estoque', type: 'number', value: '128' },
      { field: 'validade', label: 'Validade', type: 'date', value: '12/06/2026' },
      { field: 'cor', label: 'Cor da etiqueta', type: 'color', value: '#ef4444' },
      { field: 'obs', label: 'Observações', type: 'textarea', colSpan: 2, value: 'Corte nobre, maturado 21 dias.' },
      { field: 'ativo', label: 'Produto ativo', type: 'switch', value: true },
    ];
    return `<div class="w-crud-form-fields">${fields.map(WC.formField).join('')}</div>`;
  };

  // ---------- WCrudFormDialog (static snapshot) ----------
  WC.formDialog = (p = {}) => {
    return `<div class="p-dialog" style="margin:0 auto">
      <div class="p-dialog-header">${H.esc(p.title || 'Novo Produto')}<button class="p-dialog-close"><i class="pi pi-times"></i></button></div>
      <div class="p-dialog-content">
        <form class="w-crud-form">
          ${WC.formRenderer({ fields: p.fields })}
          <div class="w-crud-form-footer">
            ${H.button({ label: 'Cancelar', text: true, severity: 'secondary' })}
            ${H.button({ label: p.isEditing ? 'Atualizar' : 'Salvar', icon: 'pi pi-check' })}
          </div>
        </form>
      </div>
    </div>`;
  };

  // ---------- WCrudColumnRenderer (type showcase) ----------
  WC.columnRenderer = (p = {}) => {
    const rows = [
      { type: 'text', label: 'text', val: 'Picanha Premium', cell: '<span style="font-size:.8125rem">Picanha Premium</span>' },
      { type: 'currency', label: 'currency', val: '79.9', cell: '<span style="font-weight:600;font-variant-numeric:tabular-nums;font-size:.8125rem">R$ 79,90</span>' },
      { type: 'number', label: 'number', val: '128', cell: '<span style="font-weight:600;font-variant-numeric:tabular-nums;font-size:.8125rem">128</span>' },
      { type: 'date', label: 'date', val: '2026-06-12', cell: '<span style="color:var(--p-text-muted-color);font-variant-numeric:tabular-nums;font-size:.8125rem">12/06/2026</span>' },
      { type: 'datetime', label: 'datetime', val: '...', cell: '<span style="color:var(--p-text-muted-color);font-variant-numeric:tabular-nums;font-size:.8125rem">12/06/2026 14:30</span>' },
      { type: 'boolean', label: 'boolean', val: 'true', cell: H.tag('Ativo', 'success') },
      { type: 'image', label: 'image', val: '...', cell: '<span style="display:inline-flex;width:2.25rem;height:2.25rem;border-radius:9px;background:linear-gradient(135deg,#10b981,#059669);box-shadow:inset 0 0 0 1px var(--p-content-border-color)"></span>' },
      { type: 'custom', label: 'tagValue / tagSeverity', val: '...', cell: H.tag('Estoque baixo', 'warn') },
      { type: 'null', label: 'valor nulo', val: 'null', cell: '<span style="color:var(--p-text-muted-color);font-size:.75rem">—</span>' },
    ];
    return `<div class="surface-frame" style="border:1px solid var(--p-content-border-color);overflow:hidden;width:100%;max-width:520px">
      <table class="p-datatable" style="width:100%"><tbody>
      ${rows
        .map(
          (r) => `<tr>
        <td style="padding:.6rem 1rem;border-bottom:1px solid var(--p-content-border-color)"><code style="font-family:var(--font-mono);font-size:.72rem;color:var(--p-primary-color)">${r.type}</code></td>
        <td style="padding:.6rem 1rem;border-bottom:1px solid var(--p-content-border-color)">${r.cell}</td>
      </tr>`
        )
        .join('')}
      </tbody></table>
    </div>`;
  };

  // ---------- WAutoCompleteFK (static) ----------
  WC.autoCompleteFK = (p = {}) => `<div style="width:100%;max-width:380px">
    <label class="w-crud-form-label">Fornecedor</label>
    <div class="w-autocompletefk">
      <div class="p-autocomplete" style="flex:1">
        <input class="p-inputtext" value="${H.esc(p.value || 'Frigorífico Vale Verde')}" placeholder="Buscar fornecedor...">
      </div>
      <button class="w-autocompletefk-trigger" title="Busca avançada"><i class="pi pi-search"></i></button>
    </div>
    <p style="font-size:.72rem;color:var(--p-text-muted-color);margin:.4rem 0 0">Digite para autocompletar ou abra a busca avançada com CRUD inline.</p>
  </div>`;

  // ---------- WCrudView (static full view) ----------
  const SAMPLE = [
    { nome: 'Picanha Premium', cat: 'Bovinos', preco: 'R$ 79,90', estoque: 128, status: 'ativo' },
    { nome: 'Costela Suína', cat: 'Suínos', preco: 'R$ 24,50', estoque: 64, status: 'ativo' },
    { nome: 'Filé de Frango', cat: 'Aves', preco: 'R$ 18,90', estoque: 12, status: 'pendente' },
    { nome: 'Linguiça Toscana', cat: 'Embutidos', preco: 'R$ 29,90', estoque: 0, status: 'inativo' },
    { nome: 'Maminha', cat: 'Bovinos', preco: 'R$ 56,00', estoque: 41, status: 'ativo' },
  ];
  WC.crudView = (p = {}) => {
    const showKpi = p.showKpi !== false;
    const rows = (p.rows || SAMPLE);
    return `<div class="w-crud" style="width:100%">
      <div class="w-crud-header">
        <div class="w-crud-header-content">
          <h1 class="w-crud-title">${H.esc(p.title || 'Produtos')}</h1>
          ${p.subtitle ? `<p class="w-crud-subtitle">${H.esc(p.subtitle)}</p>` : ''}
        </div>
        <div class="w-crud-header-actions">${H.button({ label: 'Novo', icon: 'pi pi-plus', attrs: ' data-crud-new' })}</div>
      </div>
      ${
        showKpi
          ? `<div class="w-crud-kpis">
        <div class="w-crud-kpi"><div class="w-crud-kpi-icon"><i class="pi pi-list"></i></div><div class="w-crud-kpi-content"><div class="w-crud-kpi-label">Total</div><div class="w-crud-kpi-value">248</div></div></div>
        <div class="w-crud-kpi"><div class="w-crud-kpi-icon w-crud-kpi-icon--success"><i class="pi pi-check-circle"></i></div><div class="w-crud-kpi-content"><div class="w-crud-kpi-label">Ativos</div><div class="w-crud-kpi-value">231</div></div></div>
        <div class="w-crud-kpi"><div class="w-crud-kpi-icon w-crud-kpi-icon--danger"><i class="pi pi-exclamation-circle"></i></div><div class="w-crud-kpi-content"><div class="w-crud-kpi-label">Sem estoque</div><div class="w-crud-kpi-value">6</div></div></div>
      </div>`
          : ''
      }
      <div class="w-crud-table">
        <div style="padding:.55rem .75rem;border-bottom:1px solid var(--p-content-border-color)">
          <div class="w-crud-toolbar"><div class="w-crud-toolbar-start">
            <div class="p-iconfield" style="width:18rem"><i class="p-inputicon pi pi-search"></i><input class="p-inputtext" placeholder="Buscar..."></div>
          </div></div>
        </div>
        <table class="p-datatable p-datatable--striped">
          <thead><tr>
            <th><span class="pv-th">Nome <i class="pv-sort pi pi-sort-alt"></i></span></th>
            <th>Categoria</th>
            <th class="text-right"><span class="pv-th">Preço</span></th>
            <th class="text-right"><span class="pv-th">Estoque</span></th>
            <th>Status</th>
            <th class="text-center" style="width:7rem">Ações</th>
          </tr></thead>
          <tbody>
          ${rows
            .map(
              (r) => `<tr>
            <td style="font-weight:500">${H.esc(r.nome)}</td>
            <td style="color:var(--p-text-muted-color)">${H.esc(r.cat)}</td>
            <td class="text-right" style="font-weight:600;font-variant-numeric:tabular-nums">${H.esc(r.preco)}</td>
            <td class="text-right" style="font-variant-numeric:tabular-nums">${r.estoque}</td>
            <td>${WC.statusTag({ value: r.status })}</td>
            <td class="text-center"><div class="w-crud-actions">
              ${H.button({ icon: 'pi pi-pencil', text: true, rounded: true, size: 'small', severity: 'secondary' })}
              ${H.button({ icon: 'pi pi-trash', text: true, rounded: true, size: 'small', severity: 'danger' })}
            </div></td>
          </tr>`
            )
            .join('')}
          </tbody>
        </table>
        <div class="p-paginator"><span class="p-paginator__current">Página 1 de 50</span>
          <button class="p-paginator__btn" disabled><i class="pi pi-chevron-left"></i></button>
          <button class="p-paginator__btn"><i class="pi pi-chevron-right"></i></button>
        </div>
      </div>
    </div>`;
  };

  // ---------- WImageCropper ----------
  WC.imageCropper = (p = {}) => {
    const circ = !!p.circular;
    const ar = p.aspectRatio || 1;
    const w = p.width || 168;
    const h = circ ? w : Math.round(w / ar);
    const shape = circ ? 'border-radius:50%' : 'border-radius:14px';
    const filled = p.filled;
    const photo = 'background:radial-gradient(circle at 32% 28%, #fde68a, transparent 42%), radial-gradient(circle at 70% 72%, #fb7185, transparent 46%), linear-gradient(135deg,#0ea5e9,#6366f1)';
    return `<div data-ic style="display:flex;flex-direction:column;gap:.85rem;align-items:center">
      <div data-ic-frame style="width:${w}px;height:${h}px;${shape};overflow:hidden;border:1px solid var(--p-content-border-color);${filled ? photo : 'background:var(--p-content-hover-background)'};display:flex;align-items:center;justify-content:center;color:${filled ? '#fff' : 'var(--p-text-muted-color)'};position:relative">
        ${filled ? '' : `<div style="text-align:center;font-size:.74rem"><i class="pi pi-image" style="font-size:1.6rem;display:block;margin-bottom:.3rem"></i>sem imagem</div>`}
      </div>
      <div style="display:flex;gap:.5rem">
        ${H.button({ icon: 'pi pi-upload', label: filled ? 'Trocar' : 'Enviar', size: 'small', outlined: true, severity: 'secondary', attrs: ' data-ic-pick' })}
        ${filled ? H.button({ icon: 'pi pi-trash', text: true, severity: 'danger', size: 'small', attrs: ' data-ic-remove' }) : ''}
      </div>
      <p style="font-size:.72rem;color:var(--p-text-muted-color);text-align:center">PNG/JPG · até 5MB · ${circ ? 'recorte circular (avatar)' : 'proporção ' + ar + ':1'}</p>
    </div>`;
  };
})();
