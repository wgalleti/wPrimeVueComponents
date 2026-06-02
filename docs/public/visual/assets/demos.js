/* ============================================================
   Interactive demos — mount(el, props) attaches a working
   instance (open dialogs, toasts, autocomplete panels).
   window.WDEMO
   ============================================================ */
(function () {
  const H = window.H;
  const WC = window.WC;
  const WDEMO = (window.WDEMO = {});

  function toastWrap(el) {
    let w = el.querySelector('.p-toast-wrap');
    if (!w) { w = H.node('<div class="p-toast-wrap"></div>'); el.appendChild(w); }
    return w;
  }
  function fireToast(el, { severity = 'success', title = 'Pronto', detail = '' } = {}) {
    const icons = { success: 'pi pi-check-circle', error: 'pi pi-times-circle', warn: 'pi pi-exclamation-triangle', info: 'pi pi-info-circle' };
    const t = H.node(`<div class="p-toast p-toast--${severity}">
      <i class="p-toast__icon ${icons[severity]}"></i>
      <div><div class="p-toast__title">${H.esc(title)}</div>${detail ? `<div class="p-toast__detail">${H.esc(detail)}</div>` : ''}</div>
    </div>`);
    toastWrap(el).appendChild(t);
    setTimeout(() => { t.style.transition = 'opacity .3s, transform .3s'; t.style.opacity = '0'; t.style.transform = 'translateX(1rem)'; setTimeout(() => t.remove(), 300); }, 2600);
  }
  WDEMO.fireToast = fireToast;

  function dialogMask(el, html) {
    const mask = H.node(`<div class="p-dialog-mask">${html}</div>`);
    el.appendChild(mask);
    requestAnimationFrame(() => mask.classList.add('is-open'));
    const close = () => { mask.classList.remove('is-open'); setTimeout(() => mask.remove(), 220); };
    mask.addEventListener('click', (e) => { if (e.target === mask) close(); });
    mask.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', close));
    return { mask, close };
  }
  WDEMO.dialogMask = dialogMask;

  // ---------- WCrudView (interactive) ----------
  WDEMO.crudView = (el, props = {}) => {
    el.style.position = 'relative';
    el.innerHTML = WC.crudView(props);
    const open = (title, isEditing) => {
      const { close } = dialogMask(el, WC.formDialog({ title, isEditing }));
      const dlg = el.querySelector('.p-dialog');
      dlg.querySelectorAll('.w-crud-form-footer .p-button')[0]?.setAttribute('data-close', '');
      const saveBtn = dlg.querySelectorAll('.w-crud-form-footer .p-button')[1];
      saveBtn?.addEventListener('click', () => { close(); fireToast(el, { title: isEditing ? 'Registro atualizado' : 'Registro criado', detail: 'Produto salvo com sucesso.' }); });
      dlg.querySelector('.p-dialog-close')?.setAttribute('data-close', '');
    };
    el.querySelector('[data-crud-new]')?.addEventListener('click', () => open('Novo Produto', false));
    el.querySelectorAll('.w-crud-actions .p-button--danger').forEach((b) =>
      b.addEventListener('click', () => {
        const { close } = dialogMask(el, `<div class="p-dialog p-confirm">
          <div class="p-confirm__body"><i class="p-confirm__icon pi pi-exclamation-triangle"></i>
          <div><div class="p-confirm__title">Confirmar Exclusão</div><div class="p-confirm__message">Deseja realmente excluir este registro?</div></div></div>
          <div class="p-confirm__footer">${H.button({ label: 'Cancelar', text: true, severity: 'secondary', attrs: ' data-close' })}${H.button({ label: 'Excluir', icon: 'pi pi-trash', severity: 'danger', attrs: ' data-del' })}</div>
        </div>`);
        el.querySelector('[data-del]')?.addEventListener('click', () => { close(); fireToast(el, { severity: 'success', title: 'Registro excluído' }); });
      })
    );
    el.querySelectorAll('.w-crud-actions .p-button--secondary').forEach((b) =>
      b.addEventListener('click', () => open('Editar Produto', true))
    );
  };

  // ---------- WCrudFormDialog (toggle open) ----------
  WDEMO.formDialog = (el, props = {}) => {
    el.style.position = 'relative';
    el.style.minHeight = '120px';
    el.innerHTML = `<div style="text-align:center">${H.button({ label: 'Abrir formulário', icon: 'pi pi-external-link', attrs: ' data-open' })}</div>`;
    const openDlg = () => {
      const { close } = dialogMask(el, WC.formDialog({ title: props.title || 'Novo Produto', isEditing: props.isEditing }));
      const dlg = el.querySelector('.p-dialog');
      dlg.querySelector('.p-dialog-close')?.setAttribute('data-close', '');
      dlg.querySelectorAll('.w-crud-form-footer .p-button')[0]?.setAttribute('data-close', '');
      dlg.querySelectorAll('.w-crud-form-footer .p-button')[1]?.addEventListener('click', () => { close(); fireToast(el, { title: 'Salvo!', detail: 'Formulário enviado.' }); });
    };
    el.querySelector('[data-open]').addEventListener('click', openDlg);
    if (props.autoOpen) openDlg();
  };

  // ---------- WAutoCompleteFK (interactive panel + modal) ----------
  const SUPPLIERS = ['Frigorífico Vale Verde', 'Distribuidora Sul Carnes', 'Friboi Atacado', 'Casa de Carnes Bom Boi', 'Cooperativa Agropecuária', 'Marfrig Distribuição'];
  WDEMO.autoComplete = (el, props = {}) => {
    el.style.position = 'relative';
    el.innerHTML = WC.autoCompleteFK(props);
    const input = el.querySelector('.p-autocomplete .p-inputtext');
    const acWrap = el.querySelector('.p-autocomplete');
    let panel;
    function closePanel() { if (panel) { panel.remove(); panel = null; } }
    input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      const hits = SUPPLIERS.filter((s) => s.toLowerCase().includes(q));
      closePanel();
      if (!q || !hits.length) return;
      panel = H.node(`<div class="p-autocomplete__panel">${hits.map((s) => `<div class="p-autocomplete__option">${H.esc(s)}</div>`).join('')}</div>`);
      acWrap.appendChild(panel);
      panel.querySelectorAll('.p-autocomplete__option').forEach((o) =>
        o.addEventListener('click', () => { input.value = o.textContent; closePanel(); })
      );
    });
    document.addEventListener('click', (e) => { if (!el.contains(e.target)) closePanel(); });

    // advanced search modal
    el.querySelector('.w-autocompletefk-trigger').addEventListener('click', () => {
      const rows = SUPPLIERS.slice(0, 5).map((s, i) => `<tr><td style="font-weight:500">${H.esc(s)}</td><td style="color:var(--p-text-muted-color)">${(12345678 + i)}/0001-9${i}</td><td class="text-center"><div class="w-crud-actions">${H.button({ icon: 'pi pi-check', text: true, rounded: true, size: 'small', attrs: ' data-pick' })}</div></td></tr>`).join('');
      const { close } = dialogMask(el, `<div class="p-dialog" style="width:560px">
        <div class="p-dialog-header">Buscar Fornecedor<button class="p-dialog-close" data-close><i class="pi pi-times"></i></button></div>
        <div class="p-dialog-content">
          <div class="w-autocompletefk-toolbar">
            <div class="p-iconfield w-autocompletefk-toolbar-search"><i class="p-inputicon pi pi-search"></i><input class="p-inputtext" placeholder="Buscar fornecedor..."></div>
            <div class="w-autocompletefk-toolbar-actions">${H.button({ icon: 'pi pi-plus', label: 'Novo', size: 'small' })}</div>
          </div>
          <div class="surface-frame" style="border:1px solid var(--p-content-border-color);overflow:hidden">
            <table class="p-datatable p-datatable--striped"><thead><tr><th>Razão social</th><th>CNPJ</th><th class="text-center" style="width:4rem"></th></tr></thead><tbody>${rows}</tbody></table>
          </div>
        </div>
      </div>`);
      el.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => { input.value = b.closest('tr').querySelector('td').textContent; close(); }));
    });
  };

  // ---------- Composable demos ----------
  WDEMO.toastDemo = (el) => {
    el.style.position = 'relative'; el.style.minHeight = '120px';
    el.innerHTML = `<div style="display:flex;gap:.5rem;flex-wrap:wrap;justify-content:center">
      ${H.button({ label: 'success', icon: 'pi pi-check', severity: 'success', attrs: ' data-t="success"' })}
      ${H.button({ label: 'info', icon: 'pi pi-info-circle', severity: 'info', attrs: ' data-t="info"' })}
      ${H.button({ label: 'warn', icon: 'pi pi-exclamation-triangle', severity: 'warn', attrs: ' data-t="warn"' })}
      ${H.button({ label: 'error', icon: 'pi pi-times', severity: 'danger', attrs: ' data-t="error"' })}
    </div>`;
    const msgs = {
      success: ['Sucesso', 'Operação concluída com sucesso.'],
      info: ['Informação', 'Novos dados disponíveis.'],
      warn: ['Atenção', 'Verifique os campos destacados.'],
      error: ['Erro', 'Não foi possível salvar o registro.'],
    };
    el.querySelectorAll('[data-t]').forEach((b) => b.addEventListener('click', () => {
      const s = b.getAttribute('data-t'); fireToast(el, { severity: s, title: msgs[s][0], detail: msgs[s][1] });
    }));
  };

  WDEMO.confirmDemo = (el) => {
    el.style.position = 'relative'; el.style.minHeight = '120px';
    el.innerHTML = `<div style="text-align:center">${H.button({ label: 'Excluir registro', icon: 'pi pi-trash', severity: 'danger', attrs: ' data-open' })}</div>`;
    el.querySelector('[data-open]').addEventListener('click', () => {
      const { close } = dialogMask(el, `<div class="p-dialog p-confirm">
        <div class="p-confirm__body"><i class="p-confirm__icon pi pi-exclamation-triangle"></i>
        <div><div class="p-confirm__title">Confirmar Exclusão</div><div class="p-confirm__message">Deseja realmente excluir este registro? Essa ação não pode ser desfeita.</div></div></div>
        <div class="p-confirm__footer">${H.button({ label: 'Cancelar', text: true, severity: 'secondary', attrs: ' data-close' })}${H.button({ label: 'Excluir', icon: 'pi pi-check', severity: 'danger', attrs: ' data-yes' })}</div>
      </div>`);
      el.querySelector('[data-yes]').addEventListener('click', () => { close(); fireToast(el, { title: 'Excluído', detail: 'Registro removido.' }); });
    });
  };

  WDEMO.formatters = (el) => {
    el.style.width = '100%';
    const rows = [
      ['formatCurrency(84300)', 'R$ 84.300,00'],
      ['formatNumber(1234.5, 2)', '1.234,50'],
      ['formatPercent(12.5)', '12,50%'],
      ['formatDate("2026-06-02")', '02/06/2026'],
      ['formatDateTime("2026-06-02T14:30")', '02/06/2026 14:30'],
      ['formatCpf("12345678901")', '123.456.789-01'],
      ['formatCnpj("12345678000190")', '12.345.678/0001-90'],
      ['formatTelefone("11987654321")', '(11) 98765-4321'],
    ];
    el.innerHTML = `<div class="surface-frame" style="border:1px solid var(--p-content-border-color);overflow:hidden;width:100%;max-width:560px;margin:0 auto">
      <table class="p-datatable"><tbody>${rows.map(([a, b]) => `<tr>
        <td style="padding:.6rem 1rem;border-bottom:1px solid var(--p-content-border-color)"><code style="font-family:var(--font-mono);font-size:.74rem;color:var(--p-primary-color)">${H.esc(a)}</code></td>
        <td style="padding:.6rem 1rem;border-bottom:1px solid var(--p-content-border-color);text-align:right;font-weight:600;font-variant-numeric:tabular-nums">${H.esc(b)}</td>
      </tr>`).join('')}</tbody></table>
    </div>`;
  };

  // ---------- WImageCropper (interactive) ----------
  WDEMO.imageCropper = (el, props = {}) => {
    el.style.position = 'relative';
    function paint(state) {
      el.innerHTML = WC.imageCropper(Object.assign({}, props, state));
      el.querySelector('[data-ic-pick]')?.addEventListener('click', openCrop);
      el.querySelector('[data-ic-remove]')?.addEventListener('click', () => paint({ filled: false }));
    }
    function openCrop() {
      const circ = !!props.circular;
      const stencil = circ ? 'border-radius:50%' : 'border-radius:8px';
      const { close } = WDEMO.dialogMask(el, `<div class="p-dialog" style="width:420px">
        <div class="p-dialog-header">Recortar imagem<button class="p-dialog-close" data-close><i class="pi pi-times"></i></button></div>
        <div class="p-dialog-content">
          <div style="position:relative;width:100%;height:240px;border-radius:10px;overflow:hidden;background:radial-gradient(circle at 32% 28%, #fde68a, transparent 42%), radial-gradient(circle at 70% 72%, #fb7185, transparent 46%), linear-gradient(135deg,#0ea5e9,#6366f1)">
            <div style="position:absolute;inset:0;box-shadow:0 0 0 9999px rgba(0,0,0,.45);${stencil};width:170px;height:170px;margin:auto;top:0;bottom:0;left:0;right:0;border:2px solid #fff"></div>
          </div>
          <div style="display:flex;align-items:center;gap:.6rem;margin-top:1rem">
            <i class="pi pi-search-minus" style="color:var(--p-text-muted-color)"></i>
            <input type="range" min="1" max="3" step="0.1" value="1.4" style="flex:1;accent-color:var(--p-primary-color)">
            <i class="pi pi-search-plus" style="color:var(--p-text-muted-color)"></i>
          </div>
          <div class="w-crud-form-footer" style="border-top:none;margin-top:.5rem">
            ${H.button({ label: 'Cancelar', text: true, severity: 'secondary', attrs: ' data-close' })}
            ${H.button({ label: 'Aplicar recorte', icon: 'pi pi-check', attrs: ' data-ic-apply' })}
          </div>
        </div>
      </div>`);
      el.querySelector('[data-ic-apply]')?.addEventListener('click', () => { close(); paint({ filled: true }); WDEMO.fireToast(el, { title: 'Imagem aplicada', detail: 'Recorte confirmado.' }); });
    }
    paint({ filled: !!props.filled });
  };
})();
