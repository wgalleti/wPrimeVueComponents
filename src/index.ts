// Styles — importar no app: import '@wgalleti/primevue-components/style.css'
import './assets/crud.css'

// Plugin
export { WPrimeVuePlugin } from './plugin'

// Components
export {
  WCrudView,
  WCrudFormDialog,
  WCrudColumnRenderer,
  WEditableTable,
  WAutoCompleteFK,
  WFormRenderer,
  WDatePicker,
  WDateRange,
  // Estes dois existiam em `./components` mas faltavam neste barrel: quem
  // importava da raiz (o caminho documentado no COMPONENTS.md) não os enxergava.
  WFileUpload,
  WImageCropper,
  WMoneyInput,
  WTransferList,
  WTreeSelect,
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
  WStepFlow,
  WStepSection,
  WCheckList,
  WMapSelect,
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
  useDateInput,
} from './composables'
export type { DateValueFormat } from './composables'

// Data providers
export { createAxiosDataProvider, createSupabaseDataProvider } from './data-providers'

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
  EditableColumnDef,
  EditableColumnEditor,
  EditableRow,
  CheckListItem,
  CheckListLevel,
  MapSelectFeature,
  MapSelectGeometry,
  MapSelectId,
  MapSelectPolygonStyle,
  MapSelectPosition,
  RowAction,
  CrudLabels,
  KpiItem,
  CrudManagerConfig,
  CrudManagerReturn,
  WPluginOptions,
  WPluginConfig,
  DataProvider,
  DataProviderListParams,
  DataProviderListResponse,
  DataProviderRequestConfig,
  DataProviderResponse,
} from './types'

export type { StatusMapping } from './components/ui/WStatusTag.vue'
export type { InfoField } from './components/ui/WInfoCard.vue'
export type { StepFlowContext, StepFlowOrientation } from './utils/stepFlow'
export { W_STEP_FLOW_KEY } from './utils/stepFlow'
export type {
  CreateSupabaseDataProviderOptions,
  SupabaseDataProviderClient,
  SupabaseResourceConfig,
} from './data-providers'

export { DEFAULT_CRUD_LABELS, W_AXIOS_KEY, W_CONFIG_KEY, W_DATA_PROVIDER_KEY } from './types'

// Utils
export type { ApiFieldMeta } from './utils/fieldMapper'
export {
  mapApiFieldToFieldDef,
  mapApiFieldsToFieldDefs,
  mapApiFieldToColumnDef,
  mapApiFieldsToColumnDefs,
} from './utils/fieldMapper'
export type { ToCsvOptions } from './utils/csv'
export { toCsv, downloadCsv } from './utils/csv'
export type {
  TreeSelectId,
  TreeSelectOption,
  TreeSelectNode,
  TreeSelectionKeys,
  TreeSelectionState,
} from './utils/treeSelect'
