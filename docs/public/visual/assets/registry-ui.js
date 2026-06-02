/* ============================================================
   Registry — UI components
   ============================================================ */
(function () {
  const WC = window.WC;
  const REG = (window.WREG = window.WREG || []);

  const ICONS = ['pi pi-chart-bar', 'pi pi-dollar', 'pi pi-users', 'pi pi-shopping-cart', 'pi pi-box', 'pi pi-bolt', 'pi pi-check-circle', 'pi pi-exclamation-triangle'];

  REG.push({
    id: 'WKpiCard', slug: 'w-kpi-card', name: 'WKpiCard', cat: 'UI', icon: 'pi pi-chart-bar',
    source: 'components/ui/WKpiCard.vue',
    tagline: 'Cartão de indicador com ícone, tendência e estado de carregamento.',
    desc: 'Bloco de KPI individual. Mostra um rótulo, um valor de destaque, ícone com cor por severidade, badge de tendência e um skeleton de loading. Todas as seções têm slot para override.',
    importLine: "import { WKpiCard } from '@wgalleti/primevue-components'",
    preview: () => WC.kpiCard({ icon: 'pi pi-dollar', label: 'Receita', value: 'R$ 84.300', severity: 'success', trend: { value: '12%', direction: 'up' } }),
    playground: {
      maxw: 320,
      defaults: { label: 'Receita do mês', value: 'R$ 84.300', icon: 'pi pi-dollar', severity: 'success', hint: 'vs. R$ 75.200 em maio', trendValue: '12%', trendDir: 'up', loading: false },
      controls: [
        { key: 'label', type: 'text', label: 'label' },
        { key: 'value', type: 'text', label: 'value' },
        { key: 'icon', type: 'select', label: 'icon', options: ICONS },
        { key: 'severity', type: 'seg', label: 'severity', options: ['primary', 'success', 'warning', 'danger', 'info', 'neutral'] },
        { key: 'hint', type: 'text', label: 'hint' },
        { key: 'trendDir', type: 'seg', label: 'trend.direction', options: ['up', 'down', 'neutral', 'none'] },
        { key: 'trendValue', type: 'text', label: 'trend.value' },
        { key: 'loading', type: 'toggle', label: 'loading' },
      ],
      map: (v) => ({ ...v, trend: v.trendDir === 'none' ? null : { value: v.trendValue, direction: v.trendDir } }),
      render: (p) => WC.kpiCard(p),
    },
    props: [
      { name: 'label', type: 'string', req: true, desc: 'Rótulo do indicador.' },
      { name: 'value', type: 'string | number', req: true, desc: 'Valor de destaque.' },
      { name: 'icon', type: 'string', desc: 'Classe do ícone PrimeIcons.' },
      { name: 'hint', type: 'string', desc: 'Texto auxiliar abaixo do valor.' },
      { name: 'severity', type: "'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'", def: 'primary', desc: 'Cor do ícone.' },
      { name: 'trend', type: '{ value: string; direction?: "up"|"down"|"neutral" }', desc: 'Badge de variação.' },
      { name: 'loading', type: 'boolean', def: 'false', desc: 'Exibe skeleton.' },
    ],
    slots: [
      { name: 'icon', desc: 'Substitui o ícone padrão.' },
      { name: 'value', desc: 'Substitui a renderização do valor.' },
      { name: 'hint', desc: 'Conteúdo auxiliar customizado.' },
      { name: 'trend', desc: 'Badge de tendência customizado.' },
      { name: 'footer', desc: 'Rodapé do card (ex.: mini-gráfico).' },
    ],
    events: [],
    examples: [
      { title: 'Uso básico', lang: 'vue', code: `<WKpiCard
  label="Receita do mês"
  value="R$ 84.300"
  icon="pi pi-dollar"
  severity="success"
  :trend="{ value: '12%', direction: 'up' }"
/>` },
      { title: 'Com slot de rodapé', lang: 'vue', code: `<WKpiCard label="Pedidos" :value="1284" icon="pi pi-shopping-cart">
  <template #footer>
    <Sparkline :data="serie" />
  </template>
</WKpiCard>` },
    ],
  });

  REG.push({
    id: 'WKpiGrid', slug: 'w-kpi-grid', name: 'WKpiGrid', cat: 'UI', icon: 'pi pi-objects-column',
    source: 'components/ui/WKpiGrid.vue',
    tagline: 'Grade responsiva de KPIs a partir de uma lista de itens.',
    desc: 'Renderiza um array de KpiItem em uma grade de 2, 3 ou 4 colunas (colapsa para 1 no mobile). Aceita slot item para card totalmente customizado.',
    importLine: "import { WKpiGrid } from '@wgalleti/primevue-components'\nimport type { KpiItem } from '@wgalleti/primevue-components'",
    preview: () => WC.kpiGrid({ columns: 2, count: 2 }),
    playground: {
      maxw: 720, stretch: true,
      defaults: { columns: 4, count: 4, dense: false },
      controls: [
        { key: 'columns', type: 'seg', label: 'columns', options: [2, 3, 4] },
        { key: 'count', type: 'range', label: 'nº de itens', min: 1, max: 4 },
        { key: 'dense', type: 'toggle', label: 'dense' },
      ],
      render: (p) => WC.kpiGrid(p),
    },
    props: [
      { name: 'items', type: 'KpiItem[]', def: '[]', desc: 'Lista de indicadores.' },
      { name: 'columns', type: '2 | 3 | 4', def: '4', desc: 'Número de colunas.' },
      { name: 'dense', type: 'boolean', def: 'false', desc: 'Reduz o gap entre cards.' },
    ],
    slots: [{ name: 'item', desc: 'Override por item — recebe `{ item, index }`.' }],
    events: [],
    examples: [
      { title: 'Lista de KPIs', lang: 'vue', code: `<script setup lang="ts">
import type { KpiItem } from '@wgalleti/primevue-components'

const kpis: KpiItem[] = [
  { icon: 'pi pi-dollar', label: 'Receita', value: 'R$ 84.300', severity: 'success' },
  { icon: 'pi pi-shopping-cart', label: 'Pedidos', value: 1284, severity: 'primary' },
  { icon: 'pi pi-users', label: 'Clientes', value: 892, severity: 'info' },
]
</script>

<template>
  <WKpiGrid :items="kpis" :columns="3" />
</template>` },
    ],
  });

  REG.push({
    id: 'WStatusTag', slug: 'w-status-tag', name: 'WStatusTag', cat: 'UI', icon: 'pi pi-tag',
    source: 'components/ui/WStatusTag.vue',
    tagline: 'Tag de status com mapa pt-BR pronto (ativo, pendente, vencido…).',
    desc: 'Converte um valor de status em <Tag> com label e severidade. Já vem com um mapa padrão em português; passe `map` para sobrescrever ou estender.',
    importLine: "import { WStatusTag } from '@wgalleti/primevue-components'",
    preview: () => `<div style="display:flex;gap:.4rem;flex-wrap:wrap;justify-content:center">${['ativo', 'pendente', 'vencido', 'em_andamento'].map((v) => WC.statusTag({ value: v })).join('')}</div>`,
    playground: {
      maxw: 420,
      defaults: { value: 'ativo' },
      controls: [
        { key: 'value', type: 'select', label: 'value', options: Object.keys(WC.STATUS_MAP) },
      ],
      render: (p) => `<div style="display:flex;flex-direction:column;gap:1rem;align-items:center">
        ${WC.statusTag(p)}
        <div style="display:flex;gap:.4rem;flex-wrap:wrap;justify-content:center;max-width:360px">
          ${['ativo', 'inativo', 'pendente', 'confirmado', 'vencido', 'em_andamento', 'cancelado', 'pago'].map((v) => WC.statusTag({ value: v })).join('')}
        </div>
      </div>`,
    },
    props: [
      { name: 'value', type: 'string', req: true, desc: 'Chave do status (ex.: "ativo").' },
      { name: 'map', type: 'Record<string, { label; severity }>', desc: 'Mapa customizado de status → label/severidade.' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Mapa padrão', lang: 'vue', code: `<WStatusTag value="pendente" />
<WStatusTag value="vencido" />` },
      { title: 'Mapa customizado', lang: 'vue', code: `<WStatusTag
  :value="pedido.situacao"
  :map="{
    rascunho: { label: 'Rascunho', severity: 'secondary' },
    enviado:  { label: 'Enviado',  severity: 'info' },
    entregue: { label: 'Entregue', severity: 'success' },
  }"
/>` },
    ],
  });

  REG.push({
    id: 'WPageHeader', slug: 'w-page-header', name: 'WPageHeader', cat: 'UI', icon: 'pi pi-window-maximize',
    source: 'components/ui/WPageHeader.vue',
    tagline: 'Cabeçalho de página com título, subtítulo e ação principal.',
    desc: 'Cabeçalho simples para topos de tela: título + subtítulo à esquerda, botão de ação (ou slot actions) à direita.',
    importLine: "import { WPageHeader } from '@wgalleti/primevue-components'",
    preview: () => WC.pageHeader({ title: 'Produtos', subtitle: '248 itens cadastrados', actionLabel: 'Novo' }),
    playground: {
      maxw: 560, stretch: true,
      defaults: { title: 'Produtos', subtitle: '248 itens cadastrados', actionLabel: 'Novo', actionIcon: 'pi pi-plus' },
      controls: [
        { key: 'title', type: 'text', label: 'title' },
        { key: 'subtitle', type: 'text', label: 'subtitle' },
        { key: 'actionLabel', type: 'text', label: 'actionLabel' },
        { key: 'actionIcon', type: 'select', label: 'actionIcon', options: ['pi pi-plus', 'pi pi-upload', 'pi pi-download', 'pi pi-cog'] },
      ],
      render: (p) => WC.pageHeader(p),
    },
    props: [
      { name: 'title', type: 'string', req: true, desc: 'Título da página.' },
      { name: 'subtitle', type: 'string', desc: 'Subtítulo opcional.' },
      { name: 'actionLabel', type: 'string', desc: 'Texto do botão de ação.' },
      { name: 'actionIcon', type: 'string', desc: 'Ícone do botão.' },
    ],
    slots: [{ name: 'actions', desc: 'Ações customizadas à direita (substitui/complementa o botão).' }],
    events: [{ name: 'action', payload: '—', desc: 'Emitido ao clicar no botão de ação.' }],
    examples: [
      { title: 'Com ação', lang: 'vue', code: `<WPageHeader
  title="Produtos"
  subtitle="248 itens cadastrados"
  action-label="Novo"
  action-icon="pi pi-plus"
  @action="abrirCriacao"
/>` },
    ],
  });

  REG.push({
    id: 'WDetailHeader', slug: 'w-detail-header', name: 'WDetailHeader', cat: 'UI', icon: 'pi pi-chevron-left',
    source: 'components/ui/WDetailHeader.vue',
    tagline: 'Cabeçalho de detalhe com voltar, ícone, status e ações.',
    desc: 'Topo de telas de detalhe. Inclui botão voltar (vue-router), ícone, título/subtítulo, WStatusTag integrado e slot de ações.',
    importLine: "import { WDetailHeader } from '@wgalleti/primevue-components'",
    preview: () => WC.detailHeader({ title: 'Pedido #1042', subtitle: 'Açougue Central', icon: 'pi pi-receipt', status: 'confirmado' }),
    playground: {
      maxw: 620, stretch: true,
      defaults: { title: 'Pedido #1042', subtitle: 'Açougue Central · 02/06/2026', icon: 'pi pi-receipt', status: 'confirmado' },
      controls: [
        { key: 'title', type: 'text', label: 'title' },
        { key: 'subtitle', type: 'text', label: 'subtitle' },
        { key: 'icon', type: 'select', label: 'icon', options: ['pi pi-receipt', 'pi pi-box', 'pi pi-user', 'pi pi-file', 'none'] },
        { key: 'status', type: 'select', label: 'status', options: ['confirmado', 'pendente', 'cancelado', 'pago', 'none'] },
      ],
      map: (v) => ({ ...v, icon: v.icon === 'none' ? '' : v.icon, status: v.status === 'none' ? '' : v.status }),
      render: (p) => WC.detailHeader(p),
    },
    props: [
      { name: 'title', type: 'string', req: true, desc: 'Título do registro.' },
      { name: 'subtitle', type: 'string', desc: 'Subtítulo.' },
      { name: 'icon', type: 'string', desc: 'Ícone à esquerda.' },
      { name: 'status', type: 'string', desc: 'Status → renderiza WStatusTag.' },
      { name: 'statusMap', type: 'Record<string, {label; severity}>', desc: 'Mapa de status.' },
      { name: 'backRoute / backTo', type: 'string | RouteLocation', desc: 'Destino do botão voltar (default: router.back()).' },
    ],
    slots: [{ name: 'actions', desc: 'Ações à direita.' }],
    events: [], examples: [
      { title: 'Tela de detalhe', lang: 'vue', code: `<WDetailHeader
  title="Pedido #1042"
  subtitle="Açougue Central"
  icon="pi pi-receipt"
  :status="pedido.status"
  back-route="pedidos.lista"
>
  <template #actions>
    <Button icon="pi pi-pencil" label="Editar" outlined />
  </template>
</WDetailHeader>` },
    ],
  });

  REG.push({
    id: 'WEmptyState', slug: 'w-empty-state', name: 'WEmptyState', cat: 'UI', icon: 'pi pi-inbox',
    source: 'components/ui/WEmptyState.vue',
    tagline: 'Estado vazio centralizado com ícone, texto e CTA.',
    desc: 'Placeholder amigável para listas/áreas vazias: ícone em destaque, título, descrição e botão de ação opcional.',
    importLine: "import { WEmptyState } from '@wgalleti/primevue-components'",
    preview: () => WC.emptyState({ icon: 'pi pi-inbox', title: 'Nenhum pedido ainda', description: 'Crie o primeiro pedido para começar.' }),
    playground: {
      maxw: 480,
      defaults: { icon: 'pi pi-inbox', title: 'Nenhum pedido ainda', description: 'Os pedidos que você criar aparecerão aqui.', actionLabel: 'Criar pedido', actionIcon: 'pi pi-plus' },
      controls: [
        { key: 'icon', type: 'select', label: 'icon', options: ['pi pi-inbox', 'pi pi-search', 'pi pi-folder-open', 'pi pi-shopping-cart', 'pi pi-bell'] },
        { key: 'title', type: 'text', label: 'title' },
        { key: 'description', type: 'text', label: 'description' },
        { key: 'actionLabel', type: 'text', label: 'actionLabel' },
      ],
      render: (p) => WC.emptyState(p),
    },
    props: [
      { name: 'icon', type: 'string', req: true, desc: 'Ícone central.' },
      { name: 'title', type: 'string', req: true, desc: 'Título.' },
      { name: 'description', type: 'string', desc: 'Descrição.' },
      { name: 'actionLabel', type: 'string', desc: 'Texto do botão.' },
      { name: 'actionIcon', type: 'string', desc: 'Ícone do botão.' },
    ],
    slots: [], events: [{ name: 'action', payload: '—', desc: 'Clique no botão.' }],
    examples: [
      { title: 'Lista vazia', lang: 'vue', code: `<WEmptyState
  icon="pi pi-inbox"
  title="Nenhum pedido ainda"
  description="Crie o primeiro pedido para começar."
  action-label="Criar pedido"
  @action="novo"
/>` },
    ],
  });

  REG.push({
    id: 'WSectionHeader', slug: 'w-section-header', name: 'WSectionHeader', cat: 'UI', icon: 'pi pi-minus',
    source: 'components/ui/WSectionHeader.vue',
    tagline: 'Cabeçalho de seção com ícone, meta e ações.',
    desc: 'Divisor de seções dentro de uma página: ícone, título com slot de meta (tags, contadores), subtítulo e ações.',
    importLine: "import { WSectionHeader } from '@wgalleti/primevue-components'",
    preview: () => WC.sectionHeader({ icon: 'pi pi-list', title: 'Itens do pedido', meta: '5 itens', showActions: false }),
    playground: {
      maxw: 600, stretch: true,
      defaults: { icon: 'pi pi-list', title: 'Itens do pedido', subtitle: 'Produtos incluídos neste pedido', meta: '5 itens', compact: false, showActions: true },
      controls: [
        { key: 'icon', type: 'select', label: 'icon', options: ['pi pi-list', 'pi pi-box', 'pi pi-users', 'pi pi-cog', 'none'] },
        { key: 'title', type: 'text', label: 'title' },
        { key: 'subtitle', type: 'text', label: 'subtitle' },
        { key: 'meta', type: 'text', label: 'slot meta' },
        { key: 'compact', type: 'toggle', label: 'compact' },
        { key: 'showActions', type: 'toggle', label: 'slot actions' },
      ],
      map: (v) => ({ ...v, icon: v.icon === 'none' ? '' : v.icon }),
      render: (p) => WC.sectionHeader(p),
    },
    props: [
      { name: 'title', type: 'string', req: true, desc: 'Título da seção.' },
      { name: 'subtitle', type: 'string', desc: 'Subtítulo.' },
      { name: 'icon', type: 'string', desc: 'Ícone à esquerda.' },
      { name: 'compact', type: 'boolean', def: 'false', desc: 'Margem inferior reduzida.' },
    ],
    slots: [
      { name: 'icon', desc: 'Substitui o ícone.' },
      { name: 'meta', desc: 'Conteúdo ao lado do título (tags, contadores).' },
      { name: 'actions', desc: 'Ações à direita.' },
    ],
    events: [], examples: [
      { title: 'Seção com ações', lang: 'vue', code: `<WSectionHeader icon="pi pi-list" title="Itens do pedido">
  <template #meta><Tag value="5 itens" severity="secondary" /></template>
  <template #actions>
    <Button icon="pi pi-plus" label="Adicionar" size="small" outlined />
  </template>
</WSectionHeader>` },
    ],
  });

  REG.push({
    id: 'WInfoCard', slug: 'w-info-card', name: 'WInfoCard', cat: 'UI', icon: 'pi pi-id-card',
    source: 'components/ui/WInfoCard.vue',
    tagline: 'Cartão de resumo com pares rótulo/valor formatados.',
    desc: 'Exibe campos em grade 2 colunas com formatação automática (currency, date, datetime, number) via useFormatters. Ideal para resumos de registro.',
    importLine: "import { WInfoCard } from '@wgalleti/primevue-components'\nimport type { InfoField } from '@wgalleti/primevue-components'",
    preview: () => WC.infoCard({ title: 'Resumo', fields: [{ label: 'Cliente', value: 'Açougue Central' }, { label: 'Total', value: 'R$ 4.820,00' }] }),
    playground: {
      maxw: 520, stretch: true,
      defaults: { title: 'Resumo da nota' },
      controls: [{ key: 'title', type: 'text', label: 'title' }],
      render: (p) => WC.infoCard(p),
    },
    props: [
      { name: 'title', type: 'string', desc: 'Título do card.' },
      { name: 'fields', type: 'InfoField[]', req: true, desc: 'Pares `{ label, value, format? }`.' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Resumo formatado', lang: 'vue', code: `<script setup lang="ts">
import type { InfoField } from '@wgalleti/primevue-components'

const fields: InfoField[] = [
  { label: 'Cliente', value: nota.cliente },
  { label: 'CNPJ', value: nota.cnpj },
  { label: 'Total', value: nota.total, format: 'currency' },
  { label: 'Emissão', value: nota.data, format: 'date' },
]
</script>

<template>
  <WInfoCard title="Resumo da nota" :fields="fields" />
</template>` },
    ],
  });

  REG.push({
    id: 'WActionBar', slug: 'w-action-bar', name: 'WActionBar', cat: 'UI', icon: 'pi pi-bars',
    source: 'components/ui/WActionBar.vue',
    tagline: 'Barra de ações com slots primary / filters / secondary.',
    desc: 'Organiza grupos de ações com alinhamento configurável e empilhamento no mobile. Três slots: primary, filters e secondary.',
    importLine: "import { WActionBar } from '@wgalleti/primevue-components'",
    preview: () => WC.actionBar({ align: 'between' }),
    playground: {
      maxw: 620, stretch: true,
      defaults: { align: 'between' },
      controls: [{ key: 'align', type: 'seg', label: 'align', options: ['between', 'start', 'end'] }],
      render: (p) => WC.actionBar(p),
    },
    props: [
      { name: 'align', type: "'between' | 'start' | 'end'", def: 'between', desc: 'Alinhamento do conteúdo.' },
      { name: 'stackOnMobile', type: 'boolean', def: 'true', desc: 'Empilha no mobile.' },
    ],
    slots: [
      { name: 'primary / default', desc: 'Ações principais (esquerda).' },
      { name: 'filters', desc: 'Filtros no centro.' },
      { name: 'secondary', desc: 'Ações secundárias (direita).' },
    ],
    events: [], examples: [
      { title: 'Toolbar de página', lang: 'vue', code: `<WActionBar align="between">
  <template #primary>
    <Button icon="pi pi-plus" label="Novo lançamento" />
    <Button icon="pi pi-upload" label="Importar" outlined />
  </template>
  <template #secondary>
    <Button icon="pi pi-download" text />
  </template>
</WActionBar>` },
    ],
  });

  REG.push({
    id: 'WFormSection', slug: 'w-form-section', name: 'WFormSection', cat: 'UI', icon: 'pi pi-clone',
    source: 'components/ui/WFormSection.vue',
    tagline: 'Bloco de formulário com título, descrição e variantes.',
    desc: 'Agrupa campos sob um cabeçalho com título/descrição. Três variantes visuais: default, muted e outlined.',
    importLine: "import { WFormSection } from '@wgalleti/primevue-components'",
    preview: () => WC.formSection({ title: 'Dados de entrega', variant: 'default' }),
    playground: {
      maxw: 560, stretch: true,
      defaults: { title: 'Dados de entrega', description: 'Endereço para onde o pedido será enviado.', variant: 'default' },
      controls: [
        { key: 'title', type: 'text', label: 'title' },
        { key: 'description', type: 'text', label: 'description' },
        { key: 'variant', type: 'seg', label: 'variant', options: ['default', 'muted', 'outlined'] },
      ],
      render: (p) => WC.formSection(p),
    },
    props: [
      { name: 'title', type: 'string', req: true, desc: 'Título da seção.' },
      { name: 'description', type: 'string', desc: 'Descrição.' },
      { name: 'variant', type: "'default' | 'muted' | 'outlined'", def: 'default', desc: 'Estilo do container.' },
    ],
    slots: [
      { name: 'default', desc: 'Corpo da seção (campos).' },
      { name: 'actions', desc: 'Ações no cabeçalho.' },
    ],
    events: [], examples: [
      { title: 'Agrupando campos', lang: 'vue', code: `<WFormSection title="Dados de entrega" variant="muted">
  <div class="grid">
    <InputText v-model="form.logradouro" />
    <InputText v-model="form.bairro" />
  </div>
</WFormSection>` },
    ],
  });

  REG.push({
    id: 'WProgressFlow', slug: 'w-progress-flow', name: 'WProgressFlow', cat: 'UI', icon: 'pi pi-sitemap',
    source: 'components/ui/WProgressFlow.vue',
    tagline: 'Fluxo de etapas (stepper) horizontal ou vertical.',
    desc: 'Mostra um processo em etapas com estados done / current / pending derivados de currentStep. Orientação horizontal ou vertical, com slot por etapa.',
    importLine: "import { WProgressFlow } from '@wgalleti/primevue-components'",
    preview: () => WC.progressFlow({ orientation: 'vertical', currentStep: 'compra' }),
    playground: {
      maxw: 720, stretch: true,
      defaults: { currentStep: 'compra', orientation: 'horizontal' },
      controls: [
        { key: 'currentStep', type: 'seg', label: 'currentStep', options: ['orcamento', 'aprovacao', 'compra', 'recebimento'] },
        { key: 'orientation', type: 'seg', label: 'orientation', options: ['horizontal', 'vertical'] },
      ],
      render: (p) => WC.progressFlow(p),
    },
    props: [
      { name: 'steps', type: '{ key; label; description? }[]', req: true, desc: 'Etapas do fluxo.' },
      { name: 'currentStep', type: 'string', req: true, desc: 'Chave da etapa atual.' },
      { name: 'orientation', type: "'horizontal' | 'vertical'", def: 'horizontal', desc: 'Direção do fluxo.' },
    ],
    slots: [{ name: 'step', desc: 'Override de etapa — recebe `{ step, index, state }`.' }],
    events: [], examples: [
      { title: 'Stepper de compra', lang: 'vue', code: `<WProgressFlow
  :steps="[
    { key: 'orcamento', label: 'Orçamento' },
    { key: 'aprovacao', label: 'Aprovação' },
    { key: 'compra', label: 'Compra' },
    { key: 'recebimento', label: 'Recebimento' },
  ]"
  current-step="compra"
/>` },
    ],
  });
})();
