// Styles — importar no app: import '@wgalleti/primevue-components/style.css'
import './assets/crud.css'

// Plugin
export { WPrimeVuePlugin } from './plugin'

// Components
export {
  WCrudView,
  WCrudFormDialog,
  WCrudColumnRenderer,
  WAutoCompleteFK,
  WFormRenderer,
  WStatusTag,
  WPageHeader,
  WDetailHeader,
  WEmptyState,
  WInfoCard,
  WKpiCard,
  WKpiGrid,
  WSectionHeader,
  WFormSection,
  WActionBar,
  WProgressFlow,
} from './components'

// Composables
export {
  useCrudManager,
  useApi,
  useAppToast,
  useAppConfirm,
  useApiError,
  extractApiError,
  useFormatters,
} from './composables'

// Types
export type {
  PaginatedResponse,
  PaginationState,
  SortState,
  UseApiOptions,
  UseApiReturn,
  ColumnDef,
  ColumnType,
  FieldDef,
  FieldType,
  SelectOption,
  RowAction,
  CrudLabels,
  KpiItem,
  CrudManagerConfig,
  CrudManagerReturn,
  WPluginOptions,
  WPluginConfig,
} from './types'

export type { StatusMapping } from './components/ui/WStatusTag.vue'
export type { InfoField } from './components/ui/WInfoCard.vue'

export { DEFAULT_CRUD_LABELS, W_AXIOS_KEY, W_CONFIG_KEY } from './types'

// Utils
export type { ApiFieldMeta } from './utils/fieldMapper'
export {
  mapApiFieldToFieldDef,
  mapApiFieldsToFieldDefs,
  mapApiFieldToColumnDef,
  mapApiFieldsToColumnDefs,
} from './utils/fieldMapper'
