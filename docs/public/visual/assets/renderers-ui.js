/* ============================================================
   Live component renderers — UI group
   window.WC.<name>(props) -> HTML string  (faithful to src)
   ============================================================ */
(function () {
  const H = window.H;
  const WC = (window.WC = window.WC || {});

  // ---------- WKpiCard ----------
  WC.kpiCard = (p = {}) => {
    const sev = p.severity || 'primary';
    if (p.loading) {
      return `<article class="w-kpi-card">
        <div class="w-kpi-card__loading">
          <div class="p-skeleton p-skeleton--circle" style="width:2.75rem;height:2.75rem"></div>
          <div class="w-kpi-card__loading-content">
            <div class="p-skeleton" style="width:6rem;height:.75rem"></div>
            <div class="p-skeleton" style="width:7.5rem;height:1.5rem"></div>
            <div class="p-skeleton" style="width:5rem;height:.75rem"></div>
          </div>
        </div>
      </article>`;
    }
    const trend = p.trend
      ? `<div class="w-kpi-card__trend"><span class="w-kpi-card__trend-badge w-kpi-card__trend-badge--${p.trend.direction || 'neutral'}">${
          p.trend.direction === 'up' ? '↑ ' : p.trend.direction === 'down' ? '↓ ' : ''
        }${H.esc(p.trend.value)}</span></div>`
      : '';
    return `<article class="w-kpi-card w-kpi-card--${sev}">
      <div class="w-kpi-card__header">
        <div class="w-kpi-card__icon"><i class="${p.icon || 'pi pi-chart-bar'}"></i></div>
        ${trend}
      </div>
      <div class="w-kpi-card__content">
        <p class="w-kpi-card__label">${H.esc(p.label || 'Indicador')}</p>
        <div class="w-kpi-card__value">${H.esc(p.value != null ? p.value : '—')}</div>
        ${p.hint ? `<p class="w-kpi-card__hint">${H.esc(p.hint)}</p>` : ''}
      </div>
    </article>`;
  };

  // ---------- WKpiGrid ----------
  WC.kpiGrid = (p = {}) => {
    const cols = p.columns || 4;
    const items =
      p.items ||
      [
        { icon: 'pi pi-dollar', label: 'Receita', value: 'R$ 84.300', severity: 'success', trend: { value: '12%', direction: 'up' } },
        { icon: 'pi pi-shopping-cart', label: 'Pedidos', value: '1.284', severity: 'primary', trend: { value: '4%', direction: 'up' } },
        { icon: 'pi pi-users', label: 'Clientes', value: '892', severity: 'info' },
        { icon: 'pi pi-exclamation-triangle', label: 'Pendências', value: '7', severity: 'danger', trend: { value: '2%', direction: 'down' } },
      ].slice(0, p.count || 4);
    return `<div class="w-kpi-grid w-kpi-grid--cols-${cols}${p.dense ? ' w-kpi-grid--dense' : ''}">
      ${items.map((it) => WC.kpiCard(it)).join('')}
    </div>`;
  };

  // ---------- WStatusTag ----------
  const STATUS_MAP = {
    ativo: { label: 'Ativo', severity: 'success' }, ativa: { label: 'Ativa', severity: 'success' },
    inativo: { label: 'Inativo', severity: 'danger' }, inativa: { label: 'Inativa', severity: 'danger' },
    suspensa: { label: 'Suspensa', severity: 'warn' }, suspenso: { label: 'Suspenso', severity: 'warn' },
    cancelada: { label: 'Cancelada', severity: 'danger' }, cancelado: { label: 'Cancelado', severity: 'danger' },
    pendente: { label: 'Pendente', severity: 'warn' },
    confirmada: { label: 'Confirmada', severity: 'success' }, confirmado: { label: 'Confirmado', severity: 'success' },
    vencida: { label: 'Vencida', severity: 'danger' }, vencido: { label: 'Vencido', severity: 'danger' },
    concluido: { label: 'Concluído', severity: 'success' }, concluida: { label: 'Concluída', severity: 'success' },
    em_progresso: { label: 'Em Progresso', severity: 'info' }, em_andamento: { label: 'Em Andamento', severity: 'info' },
    expirado: { label: 'Expirado', severity: 'secondary' }, expirada: { label: 'Expirada', severity: 'secondary' },
    aberto: { label: 'Aberto', severity: 'info' }, aberta: { label: 'Aberta', severity: 'info' },
    fechado: { label: 'Fechado', severity: 'secondary' }, fechada: { label: 'Fechada', severity: 'secondary' },
    pago: { label: 'Pago', severity: 'success' }, paga: { label: 'Paga', severity: 'success' },
    inadimplente: { label: 'Inadimplente', severity: 'danger' },
  };
  WC.STATUS_MAP = STATUS_MAP;
  WC.statusTag = (p = {}) => {
    const info = STATUS_MAP[p.value] || { label: p.value || 'desconhecido', severity: 'secondary' };
    return H.tag(info.label, info.severity);
  };

  // ---------- WPageHeader ----------
  WC.pageHeader = (p = {}) => `<div class="w-page-header">
    <div class="w-page-header-content">
      <h2 class="w-page-header-title">${H.esc(p.title || 'Produtos')}</h2>
      ${p.subtitle ? `<p class="w-page-header-subtitle">${H.esc(p.subtitle)}</p>` : ''}
    </div>
    <div class="w-page-header-actions">
      ${p.actionLabel ? H.button({ label: p.actionLabel, icon: p.actionIcon || 'pi pi-plus' }) : ''}
    </div>
  </div>`;

  // ---------- WDetailHeader ----------
  WC.detailHeader = (p = {}) => `<div class="w-detail-header">
    <div class="w-detail-header-left">
      ${H.button({ icon: 'pi pi-arrow-left', text: true, rounded: true, severity: 'secondary' })}
      ${p.icon ? `<i class="${p.icon} w-detail-header-icon"></i>` : ''}
      <div class="w-detail-header-content">
        <h2 class="w-detail-header-title">${H.esc(p.title || 'Pedido #1042')}</h2>
        ${p.subtitle ? `<p class="w-detail-header-subtitle">${H.esc(p.subtitle)}</p>` : ''}
      </div>
      ${p.status ? WC.statusTag({ value: p.status }) : ''}
    </div>
    <div class="w-detail-header-actions">
      ${H.button({ icon: 'pi pi-pencil', label: 'Editar', outlined: true, severity: 'secondary', size: 'small' })}
      ${H.button({ icon: 'pi pi-print', text: true, severity: 'secondary' })}
    </div>
  </div>`;

  // ---------- WEmptyState ----------
  WC.emptyState = (p = {}) => `<div class="w-empty-state">
    <div class="w-empty-state-icon"><i class="${p.icon || 'pi pi-inbox'}"></i></div>
    <p class="w-empty-state-title">${H.esc(p.title || 'Nenhum registro')}</p>
    ${p.description ? `<p class="w-empty-state-description">${H.esc(p.description)}</p>` : ''}
    ${p.actionLabel ? `<div style="margin-top:.75rem">${H.button({ label: p.actionLabel, icon: p.actionIcon || 'pi pi-plus', size: 'small' })}</div>` : ''}
  </div>`;

  // ---------- WSectionHeader ----------
  WC.sectionHeader = (p = {}) => `<div class="w-section-header${p.compact ? ' w-section-header--compact' : ''}">
    <div class="w-section-header__main">
      ${p.icon ? `<div class="w-section-header__icon"><i class="${p.icon}"></i></div>` : ''}
      <div class="w-section-header__content">
        <div class="w-section-header__title-row">
          <h3 class="w-section-header__title">${H.esc(p.title || 'Itens do pedido')}</h3>
          ${p.meta ? H.tag(p.meta, 'secondary') : ''}
        </div>
        ${p.subtitle ? `<p class="w-section-header__subtitle">${H.esc(p.subtitle)}</p>` : ''}
      </div>
    </div>
    ${p.showActions !== false ? `<div class="w-section-header__actions">${H.button({ icon: 'pi pi-plus', label: 'Adicionar', size: 'small', outlined: true, severity: 'secondary' })}</div>` : ''}
  </div>`;

  // ---------- WInfoCard ----------
  WC.infoCard = (p = {}) => {
    const fields =
      p.fields ||
      [
        { label: 'Cliente', value: 'Açougue Central Ltda' },
        { label: 'CNPJ', value: '12.345.678/0001-90' },
        { label: 'Total', value: 'R$ 4.820,00' },
        { label: 'Emissão', value: '02/06/2026' },
      ];
    return `<div class="w-info-card">
      ${p.title ? `<h3 class="w-info-card-title">${H.esc(p.title)}</h3>` : ''}
      <div class="w-info-card-grid">
        ${fields
          .map(
            (f) => `<div class="w-info-card-field">
          <span class="w-info-card-label">${H.esc(f.label)}</span>
          <span class="w-info-card-value">${H.esc(f.value == null || f.value === '' ? '-' : f.value)}</span>
        </div>`
          )
          .join('')}
      </div>
    </div>`;
  };

  // ---------- WActionBar ----------
  WC.actionBar = (p = {}) => `<div class="w-action-bar w-action-bar--${p.align || 'between'}">
    <div class="w-action-bar__primary">
      ${H.button({ icon: 'pi pi-plus', label: 'Novo lançamento' })}
      ${H.button({ icon: 'pi pi-upload', label: 'Importar', outlined: true, severity: 'secondary' })}
    </div>
    ${
      p.align === 'between'
        ? `<div class="w-action-bar__secondary">${H.button({ icon: 'pi pi-download', text: true, severity: 'secondary' })}${H.button({ icon: 'pi pi-ellipsis-v', text: true, severity: 'secondary' })}</div>`
        : ''
    }
  </div>`;

  // ---------- WFormSection ----------
  WC.formSection = (p = {}) => `<section class="w-form-section w-form-section--${p.variant || 'default'}">
    <div class="w-form-section__header">
      <div class="w-form-section__content">
        <h3 class="w-form-section__title">${H.esc(p.title || 'Dados de entrega')}</h3>
        ${p.description ? `<p class="w-form-section__description">${H.esc(p.description)}</p>` : ''}
      </div>
      <div class="w-form-section__actions">${H.button({ icon: 'pi pi-map-marker', label: 'Usar CEP', size: 'small', text: true })}</div>
    </div>
    <div class="w-form-section__body">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem">
        <div><label class="w-crud-form-label">Logradouro</label><input class="p-inputtext" value="Rua das Palmeiras, 240"></div>
        <div><label class="w-crud-form-label">Bairro</label><input class="p-inputtext" value="Centro"></div>
      </div>
    </div>
  </section>`;

  // ---------- WProgressFlow ----------
  WC.progressFlow = (p = {}) => {
    const steps = p.steps || [
      { key: 'orcamento', label: 'Orçamento', description: 'Criado' },
      { key: 'aprovacao', label: 'Aprovação', description: 'Gerência' },
      { key: 'compra', label: 'Compra', description: 'Pedido emitido' },
      { key: 'recebimento', label: 'Recebimento', description: 'Conferência' },
    ];
    const current = p.currentStep || 'compra';
    const ci = steps.findIndex((s) => s.key === current);
    const state = (i) => (i < ci ? 'done' : i === ci ? 'current' : 'pending');
    return `<div class="w-progress-flow w-progress-flow--${p.orientation || 'horizontal'}">
      ${steps
        .map(
          (s, i) => `<div class="w-progress-flow__step w-progress-flow__step--${state(i)}">
        <div class="w-progress-flow__marker"><span>${state(i) === 'done' ? '<i class="pi pi-check" style="font-size:.75rem"></i>' : i + 1}</span></div>
        <div class="w-progress-flow__content">
          <p class="w-progress-flow__label">${H.esc(s.label)}</p>
          ${s.description ? `<p class="w-progress-flow__description">${H.esc(s.description)}</p>` : ''}
        </div>
      </div>`
        )
        .join('')}
    </div>`;
  };
})();
