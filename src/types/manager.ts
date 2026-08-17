import type { ComputedRef, Ref } from 'vue'
import type { PaginationState, SortState } from './api'
import type { ColumnDef } from './column'
import type { FieldDef } from './field'
import type { RowAction, BulkAction } from './action'
import type { CrudLabels } from './labels'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

export interface CrudManagerConfig<T> {
  endpoint: string
  columns: ColumnDef[]
  form: FieldDef[]
  /** Nº de colunas do grid do form dialog (default 2). Campos usam `colSpan`
   *  para ocupar frações do grid; grupos podem sobrepor via `fieldGroup.columns`. */
  formColumns?: number
  pk?: string
  pageSize?: number
  searchDebounce?: number
  /** When editing, send only the changed fields (diff) instead of the whole
   *  record. Defaults to `true`. Set `false` to always send the full payload. */
  partialUpdate?: boolean
  /** After a successful create/update, re-fetch the current page so the list
   *  reflects the backend (derived fields, ordering) without losing pagination,
   *  search or filter position. Defaults to `true`. Set `false` to keep the
   *  optimistic in-place update instead. */
  refetchOnSave?: boolean
  /** Antes de abrir o form de editar/visualizar/duplicar, busca o registro
   *  completo (`GET /:pk/`) em vez de usar a linha da lista. Necessário quando o
   *  serializer de list é enxuto (omite campos pesados — ex.: geometria): sem
   *  isso o form abriria com o campo vazio e um save poderia gravar essa
   *  ausência por cima do valor real. Defaults to `false`. */
  fetchDetailOnEdit?: boolean
  /** Modo de edição: 'dialog' (default — abre o form dialog) ou 'cell' (edição
   *  inline por célula, com PATCH só do campo alterado). */
  editMode?: 'cell' | 'dialog'
  /** Navegação por teclado no form dialog: foca o 1º campo ao abrir e o Enter
   *  pula para o próximo campo até o botão salvar (F2 abre a busca em FKs). */
  keyboardNav?: boolean
  canCreate?: boolean
  canEdit?: boolean
  canDelete?: boolean
  rowActions?: RowAction<T>[]
  /** Habilita seleção múltipla na tabela (checkbox + barra de ações em lote). */
  selectionMode?: 'multiple'
  /** Ações aplicadas ao conjunto selecionado, exibidas na barra de lote. */
  bulkActions?: BulkAction<T>[]
  filterParams?: () => Record<string, unknown>
  /** Pré-processa os dados a cada carga da lista, ANTES de virarem `items`. Recebe
   *  as linhas cruas da API e devolve o que a tela vai renderizar. Ponto único e
   *  reaproveitável para: agrupar (ex.: por NF, com avulsos individuais), enriquecer
   *  com campos derivados, reestruturar, ordenar. Sem ele, `items` = dados crus. */
  transformItems?: (rawItems: T[]) => T[]
  transformPayload?: (
    payload: Record<string, unknown>,
    isEditing: boolean,
  ) => Record<string, unknown>
  createDefaults?: () => Record<string, unknown>
  onAfterSave?: (data: T, isEditing: boolean) => void
  onAfterDelete?: (item: T) => void
  labels?: Partial<CrudLabels>
}

// ---------------------------------------------------------------------------
// Return
// ---------------------------------------------------------------------------

export interface CrudManagerReturn<T> {
  // state
  items: Ref<T[]>
  /** Itens marcados quando `selectionMode: 'multiple'`. */
  selectedItems: Ref<T[]>
  /** Filtros de coluna ativos (param → valor), enviados na requisição de `list`. */
  columnFilters: Record<string, unknown>
  extras: Ref<Record<string, unknown>>
  loading: Ref<boolean>
  saving: Ref<boolean>
  search: Ref<string>
  dialogVisible: Ref<boolean>
  editingItem: Ref<T | null>
  formData: Record<string, unknown>
  pagination: PaginationState
  sort: SortState

  // computed
  isEditing: ComputedRef<boolean>
  isViewing: ComputedRef<boolean>
  viewMode: Ref<boolean>
  dialogTitle: ComputedRef<string>
  isFirstPage: ComputedRef<boolean>
  isLastPage: ComputedRef<boolean>

  // methods
  init(): Promise<void>
  fetchItems(params?: Record<string, unknown>): Promise<void>
  fetchAll(pageSize?: number): Promise<T[]>
  refresh(): Promise<void>
  setSearch(value: string): void
  onSearch(event: Event): void
  onPage(event: { page: number; rows: number }): void
  onSort(event: { sortField?: string | null; sortOrder?: 1 | -1 | 0 | null }): void
  openCreateDialog(): void
  /** Abrem o form dialog. Síncronos no caminho comum; com `fetchDetailOnEdit`
   *  devolvem a Promise da busca do detail. */
  openEditDialog(item: T): void | Promise<void>
  openViewDialog(item: T): void | Promise<void>
  openDuplicateDialog(item: T): void | Promise<void>
  save(): Promise<T | null>
  /** Salva um único campo de um item (edição inline por célula) via PATCH. */
  updateField(item: T, field: string, value: unknown): Promise<void>
  confirmDelete(item: T): void
  /** Exclui o item sem o confirm de serviço — para quem controla a própria
   *  confirmação (ex.: WCrudView com o slot `delete-message`). */
  performDelete(item: T): Promise<void>
  setFormField(field: string, value: unknown): void
  resetForm(): void
  goToPage(page: number): void
  firstPage(): void
  lastPage(): void
  /** Limpa a seleção múltipla. */
  clearSelection(): void
  /** Define (ou remove, se vazio) um filtro de coluna e recarrega a lista. */
  setColumnFilter(param: string, value: unknown): void
  /** Limpa todos os filtros de coluna e recarrega a lista. */
  clearColumnFilters(): void

  // config
  config: CrudManagerConfig<T>
}
