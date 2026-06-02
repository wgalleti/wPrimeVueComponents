/* ============================================================
   Registry — Composables
   ============================================================ */
(function () {
  const WC = window.WC, WDEMO = window.WDEMO;
  const REG = (window.WREG = window.WREG || []);

  REG.push({
    id: 'useCrudManager', slug: 'use-crud-manager', name: 'useCrudManager', cat: 'Composables', icon: 'pi pi-cog', badge: 'core',
    source: 'composables/useCrudManager.ts',
    tagline: 'O cérebro do CRUD: estado, fetch, paginação, save e delete.',
    desc: 'Composable genérico que centraliza toda a lógica de um CRUD: lista paginada, busca com debounce, ordenação, formulário reativo, criar/editar/visualizar/excluir, toasts e confirmação. Devolve estado e métodos que o WCrudView consome via prop. Abaixo, a UI que ele aciona.',
    importLine: "import { useCrudManager } from '@wgalleti/primevue-components'",
    playground: { stretch: true, maxw: 880, defaults: { showKpi: true }, controls: [], mount: (el, p) => WDEMO.crudView(el, { title: 'Produtos', subtitle: 'gerenciado por useCrudManager', showKpi: true }) },
    params: [
      { name: 'config.endpoint', type: 'string', desc: 'Recurso REST / tabela do dataProvider.' },
      { name: 'config.columns', type: 'ColumnDef[]', desc: 'Colunas da tabela.' },
      { name: 'config.form', type: 'FieldDef[]', desc: 'Campos do formulário.' },
      { name: 'config.pageSize', type: 'number', desc: 'Itens por página.' },
      { name: 'config.canCreate / canEdit / canDelete', type: 'boolean', desc: 'Permissões de ação.' },
      { name: 'config.rowActions', type: 'RowAction<T>[]', desc: 'Ações custom por linha.' },
      { name: 'config.transformPayload', type: '(payload, isEditing) => payload', desc: 'Transforma o corpo antes de salvar.' },
      { name: 'config.onAfterSave / onAfterDelete', type: '(data) => void', desc: 'Hooks pós-operação.' },
    ],
    returns: [
      { name: 'items / loading / saving', type: 'Ref', desc: 'Estado da listagem.' },
      { name: 'pagination / sort / search', type: 'State', desc: 'Controle de página, ordenação e busca.' },
      { name: 'formData / dialogVisible / isEditing', type: 'Ref', desc: 'Estado do formulário.' },
      { name: 'init / fetchItems / refresh', type: '() => Promise', desc: 'Carregamento de dados.' },
      { name: 'openCreateDialog / openEditDialog / openViewDialog', type: '(item?) => void', desc: 'Abre o dialog.' },
      { name: 'save / confirmDelete', type: '() => Promise', desc: 'Persistência.' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Tipado com generic', lang: 'ts', code: `interface Produto { id: number; nome: string; preco: number }

const crud = useCrudManager<Produto>({
  endpoint: '/api/v1/produtos/',
  columns,
  form,
  pageSize: 20,
  transformPayload: (p) => ({ ...p, slug: slugify(p.nome) }),
  onAfterSave: (produto) => console.log('salvo', produto.id),
})

await crud.init()` },
    ],
  });

  REG.push({
    id: 'useApi', slug: 'use-api', name: 'useApi', cat: 'Composables', icon: 'pi pi-server',
    source: 'composables/useApi.ts',
    tagline: 'Fetch paginado low-level sobre o dataProvider ativo.',
    desc: 'Camada de acesso a dados de baixo nível usada pelo useCrudManager. Resolve listagens paginadas, parâmetros de query e a resposta no formato { data, page, page_size, rows }.',
    importLine: "import { useApi } from '@wgalleti/primevue-components'",
    playground: {
      maxw: 560, stretch: true, defaults: {}, controls: [],
      render: () => `<div class="surface-frame" style="border:1px solid var(--p-content-border-color);width:100%;max-width:540px;margin:0 auto;overflow:hidden">
        <div style="padding:.7rem 1rem;border-bottom:1px solid var(--p-content-border-color);font-family:var(--font-mono);font-size:.74rem;color:var(--p-text-muted-color)">GET <span style="color:var(--p-primary-color)">/api/v1/produtos/?page=1&page_size=20</span></div>
        <pre style="margin:0;padding:1rem;font-family:var(--font-mono);font-size:.74rem;line-height:1.7;color:var(--p-text-color)">{
  <span style="color:var(--p-blue-500)">"data"</span>: [ { "id": 1, "nome": "Picanha" }, … ],
  <span style="color:var(--p-blue-500)">"page"</span>: <span style="color:var(--p-primary-color)">1</span>,
  <span style="color:var(--p-blue-500)">"page_size"</span>: <span style="color:var(--p-primary-color)">20</span>,
  <span style="color:var(--p-blue-500)">"rows"</span>: <span style="color:var(--p-primary-color)">248</span>
}</pre>
      </div>`,
    },
    params: [
      { name: 'endpoint', type: 'string', desc: 'Recurso a consultar.' },
      { name: 'params', type: 'Record<string, unknown>', desc: 'Query params (page, search, ordering…).' },
    ],
    returns: [
      { name: 'fetch(params)', type: '() => Promise<PaginatedResponse<T>>', desc: 'Executa a listagem.' },
      { name: 'loading', type: 'Ref<boolean>', desc: 'Estado da requisição.' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Listagem paginada', lang: 'ts', code: `const { fetch, loading } = useApi<Produto>('/api/v1/produtos/')

const page = await fetch({ page: 1, page_size: 20, search: 'picanha' })
console.log(page.rows, page.data)` },
    ],
  });

  REG.push({
    id: 'useFormatters', slug: 'use-formatters', name: 'useFormatters', cat: 'Composables', icon: 'pi pi-percentage',
    source: 'composables/useFormatters.ts',
    tagline: 'Formatadores BR: moeda, número, data, CPF, CNPJ, telefone.',
    desc: 'Conjunto de formatadores e validadores localizados (pt-BR / BRL por padrão, configuráveis no plugin). Cacheia Intl.NumberFormat para performance. Veja as saídas reais abaixo.',
    importLine: "import { useFormatters } from '@wgalleti/primevue-components'",
    playground: { maxw: 560, stretch: true, defaults: {}, controls: [], mount: (el) => WDEMO.formatters(el) },
    params: [{ name: '—', type: '—', desc: 'Sem argumentos; lê locale/currency do plugin.' }],
    returns: [
      { name: 'formatCurrency(v)', type: '(number) => string', desc: 'R$ 1.234,56.' },
      { name: 'formatNumber(v, decimals?)', type: '(number) => string', desc: 'Número localizado.' },
      { name: 'formatPercent(v)', type: '(number) => string', desc: 'Percentual.' },
      { name: 'formatDate / formatDateTime', type: '(value) => string', desc: 'Datas via dayjs.' },
      { name: 'formatCpf / formatCnpj / formatCpfCnpj', type: '(string) => string', desc: 'Documentos mascarados.' },
      { name: 'formatTelefone', type: '(string) => string', desc: 'Telefone (10/11 dígitos).' },
      { name: 'validateCpf / validateCnpj / validateCpfCnpj', type: '(string) => string | null', desc: 'Validação (retorna mensagem ou null).' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Em um componente', lang: 'ts', code: `const { formatCurrency, formatDate, validateCpf } = useFormatters()

formatCurrency(84300)        // 'R$ 84.300,00'
formatDate('2026-06-02')     // '02/06/2026'
validateCpf('123.456.789-01') // 'CPF inválido.' | null` },
    ],
  });

  REG.push({
    id: 'useAppToast', slug: 'use-app-toast', name: 'useAppToast', cat: 'Composables', icon: 'pi pi-bell',
    source: 'composables/useAppToast.ts',
    tagline: 'Wrapper enxuto do Toast do PrimeVue.',
    desc: 'Atalhos para disparar toasts de sucesso, erro, aviso e informação com defaults sensatos. Clique nos botões para disparar.',
    importLine: "import { useAppToast } from '@wgalleti/primevue-components'",
    playground: { maxw: 480, defaults: {}, controls: [], mount: (el) => WDEMO.toastDemo(el) },
    params: [{ name: '—', type: '—', desc: 'Requer ToastService registrado no app.' }],
    returns: [
      { name: 'success(detail, summary?)', type: '() => void', desc: 'Toast de sucesso.' },
      { name: 'error(detail, summary?)', type: '() => void', desc: 'Toast de erro.' },
      { name: 'warn(detail, summary?)', type: '() => void', desc: 'Toast de aviso.' },
      { name: 'info(detail, summary?)', type: '() => void', desc: 'Toast informativo.' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Disparando toasts', lang: 'ts', code: `const toast = useAppToast()

toast.success('Produto salvo com sucesso')
toast.error('Falha ao conectar ao servidor')` },
    ],
  });

  REG.push({
    id: 'useAppConfirm', slug: 'use-app-confirm', name: 'useAppConfirm', cat: 'Composables', icon: 'pi pi-question-circle',
    source: 'composables/useAppConfirm.ts',
    tagline: 'Wrapper do ConfirmDialog com Promise.',
    desc: 'Abre uma confirmação e resolve uma Promise<boolean> conforme a escolha do usuário — ideal para "deseja realmente excluir?". Clique abaixo.',
    importLine: "import { useAppConfirm } from '@wgalleti/primevue-components'",
    playground: { maxw: 480, defaults: {}, controls: [], mount: (el) => WDEMO.confirmDemo(el) },
    params: [{ name: '—', type: '—', desc: 'Requer ConfirmationService no app.' }],
    returns: [
      { name: 'confirmDelete(options?)', type: '() => Promise<boolean>', desc: 'Confirmação de exclusão.' },
      { name: 'confirm(options)', type: '() => Promise<boolean>', desc: 'Confirmação genérica.' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Confirmar antes de excluir', lang: 'ts', code: `const confirm = useAppConfirm()

async function excluir(item) {
  if (await confirm.confirmDelete()) {
    await api.delete(item.id)
  }
}` },
    ],
  });

  REG.push({
    id: 'useApiError', slug: 'use-api-error', name: 'useApiError', cat: 'Composables', icon: 'pi pi-exclamation-triangle',
    source: 'composables/useApiError.ts',
    tagline: 'Extrai mensagens de erro no formato Django REST Framework.',
    desc: 'Normaliza erros vindos da API (DRF): { detail }, { campo: [erros] } ou string, devolvendo uma mensagem amigável e o mapa de erros por campo.',
    importLine: "import { useApiError, extractApiError } from '@wgalleti/primevue-components'",
    playground: {
      maxw: 560, stretch: true, defaults: {}, controls: [],
      render: () => `<div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;width:100%;max-width:540px;margin:0 auto;align-items:center">
        <div class="surface-frame" style="border:1px solid var(--p-content-border-color);padding:.8rem;font-family:var(--font-mono);font-size:.7rem;line-height:1.6">
          <div style="color:var(--p-text-muted-color);margin-bottom:.3rem">resposta 400</div>
          { <span style="color:var(--p-blue-500)">"cnpj"</span>: [<span style="color:#c2630b">"Já existe."</span>],<br>&nbsp;&nbsp;<span style="color:var(--p-blue-500)">"email"</span>: [<span style="color:#c2630b">"Inválido."</span>] }
        </div>
        <div style="display:flex;align-items:center;justify-content:center;color:var(--p-text-muted-color)"><i class="pi pi-arrow-right"></i></div>
        <div class="w-crud-form-field" style="grid-column:1 / -1">
          <label class="w-crud-form-label">CNPJ</label>
          <input class="p-inputtext" value="12.345.678/0001-90">
          <span class="w-crud-form-error">Já existe.</span>
        </div>
      </div>`,
    },
    params: [{ name: 'error', type: 'unknown', desc: 'Erro capturado (axios/fetch).' }],
    returns: [
      { name: 'message', type: 'string', desc: 'Mensagem amigável.' },
      { name: 'fieldErrors', type: 'Record<string, string>', desc: 'Erros por campo.' },
    ],
    slots: [], events: [],
    examples: [
      { title: 'Tratando erro de save', lang: 'ts', code: `try {
  await api.post('/produtos/', payload)
} catch (e) {
  const { message, fieldErrors } = extractApiError(e)
  toast.error(message)
  formErrors.value = fieldErrors
}` },
    ],
  });
})();
