import type { ComputedRef, Ref } from 'vue';
import type { PaginationState, SortState } from './api';
export type ColumnType = 'text' | 'boolean' | 'date' | 'datetime' | 'number' | 'currency' | 'image' | 'custom';
export interface ColumnDef {
    field: string;
    header: string;
    type?: ColumnType;
    style?: string;
    align?: 'left' | 'center' | 'right';
    sortable?: boolean;
    format?: (value: unknown, rowData?: Record<string, unknown>) => string;
    visible?: boolean;
    decimals?: number;
    tagValue?: (value: unknown, rowData?: Record<string, unknown>) => string;
    tagSeverity?: (value: unknown, rowData?: Record<string, unknown>) => string;
}
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'currency' | 'date' | 'datetime' | 'select' | 'autocomplete' | 'fk' | 'switch' | 'textarea' | 'color' | 'cpf_cnpj' | 'mask' | 'image' | 'cep' | 'transfer';
export interface SelectOption {
    [key: string]: unknown;
}
/**
 * Filtro em cascata (drill-down) de um campo FK: torna a busca dependente do valor
 * de outro campo do formulário, aplicando-o como filtro na requisição à API.
 */
export interface FieldDependency {
    /** Campo do formulário cujo valor alimenta o filtro (ex.: 'unidade_producao'). */
    field: string;
    /** Nome do parâmetro enviado à API. Default: o próprio `field`. */
    param?: string;
    /** Se true, a busca só ocorre quando o valor de origem estiver preenchido
     *  (cascata obrigatória). Default: true. */
    required?: boolean;
}
export interface FieldDef {
    field: string;
    label: string;
    type?: FieldType;
    required?: boolean;
    /** Largura do campo no grid do form (ver `columns` do WFormRenderer):
     *  - omitido ou 'full' → linha inteira
     *  - 0.5 → metade da linha (independe do nº de colunas)
     *  - inteiro ≥ 1 → ocupa N colunas do grid (limitado ao total de colunas) */
    colSpan?: number | 'full';
    defaultValue?: unknown | (() => unknown);
    disabled?: boolean | ((formData: Record<string, unknown>, isEditing: boolean) => boolean);
    disabledOnEdit?: boolean;
    visible?: boolean | ((formData: Record<string, unknown>, isEditing: boolean) => boolean);
    placeholder?: string;
    validate?: (value: unknown) => string | null;
    autofocus?: boolean | 'create' | 'edit';
    options?: SelectOption[] | Ref<SelectOption[]>;
    optionLabel?: string;
    optionValue?: string;
    showClear?: boolean;
    /** For 'transfer' fields — option keys to match against when searching
     *  (defaults to [optionLabel]). */
    searchFields?: string[];
    endpoint?: string;
    endpointParams?: Record<string, string | number | boolean>;
    /** Filtro em cascata: torna esta FK dependente do valor de outro(s) campo(s) do
     *  formulário, aplicando-o(s) como filtro na busca da API (ex.: um "local" que só
     *  lista os da "unidade_producao" selecionada). Com `required` (default true), a
     *  busca só ocorre após o campo de origem estar preenchido. */
    dependsOn?: FieldDependency | FieldDependency[];
    /** Placeholder da FK enquanto uma cascata obrigatória (`dependsOn`) não estiver
     *  preenchida — ex.: "Selecione a unidade primeiro". */
    blockedPlaceholder?: string;
    crudFields?: FieldDef[];
    crudColumns?: ColumnDef[];
    min?: number;
    max?: number;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    prefix?: string;
    suffix?: string;
    /** For 'currency' fields — render WMoneyInput (digit entry filled from the
     *  right, like a calculator/POS) instead of the default InputNumber. */
    fillFromRight?: boolean;
    /** Fixed decimal places for 'currency' fillFromRight mode (default: 2). */
    decimals?: number;
    dateFormat?: string;
    hourFormat?: '12' | '24';
    mask?: string;
    rows?: number;
    switchLabel?: string;
    feedback?: boolean;
    accept?: string;
    /** For type 'cep' — maps ViaCEP response fields to form field names.
     *  Keys are ViaCEP response names (logradouro, bairro, localidade, uf, complemento).
     *  Values are the form field names to populate. Omit keys to skip fields. */
    cepFields?: {
        logradouro?: string;
        bairro?: string;
        localidade?: string;
        uf?: string;
        complemento?: string;
    };
    /** Optional visual grouping. Fields with the same group.id render together
     *  under a titled section. Ungrouped fields render in a default section at the top.
     *  `order` controls the display order of groups; defaults to the order of first occurrence. */
    fieldGroup?: {
        id: string;
        title: string;
        description?: string;
        order?: number;
        /** Nº de colunas do grid deste grupo — sobrepõe o `columns` do form. */
        columns?: number;
    };
}
export interface RowAction<T = Record<string, unknown>> {
    action: string;
    icon: string;
    tooltip?: string;
    severity?: 'secondary' | 'success' | 'info' | 'warn' | 'danger' | 'contrast';
    visible?: (data: T) => boolean;
    disabled?: (data: T) => boolean;
    handler?: (data: T) => void;
}
export interface CrudLabels {
    createTitle: string;
    editTitle: string;
    viewTitle?: string;
    createButton: string;
    saveButton: string;
    updateButton: string;
    cancelButton: string;
    deleteConfirmTitle: string;
    deleteConfirmMessage: string;
    searchPlaceholder: string;
    emptyMessage: string;
    successCreate: string;
    successUpdate: string;
    successDelete: string;
}
export declare const DEFAULT_CRUD_LABELS: CrudLabels;
export interface KpiItem {
    icon: string;
    label: string;
    value: string | number;
    color?: string;
    severity?: 'primary' | 'success' | 'warning' | 'danger' | 'info';
    hint?: string;
    loading?: boolean;
    trend?: {
        value: string;
        direction?: 'up' | 'down' | 'neutral';
    };
}
export interface CrudManagerConfig<T> {
    endpoint: string;
    columns: ColumnDef[];
    form: FieldDef[];
    /** Nº de colunas do grid do form dialog (default 2). Campos usam `colSpan`
     *  para ocupar frações do grid; grupos podem sobrepor via `fieldGroup.columns`. */
    formColumns?: number;
    pk?: string;
    pageSize?: number;
    searchDebounce?: number;
    /** When editing, send only the changed fields (diff) instead of the whole
     *  record. Defaults to `true`. Set `false` to always send the full payload. */
    partialUpdate?: boolean;
    /** After a successful create/update, re-fetch the current page so the list
     *  reflects the backend (derived fields, ordering) without losing pagination,
     *  search or filter position. Defaults to `true`. Set `false` to keep the
     *  optimistic in-place update instead. */
    refetchOnSave?: boolean;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    rowActions?: RowAction<T>[];
    filterParams?: () => Record<string, unknown>;
    transformPayload?: (payload: Record<string, unknown>, isEditing: boolean) => Record<string, unknown>;
    createDefaults?: () => Record<string, unknown>;
    onAfterSave?: (data: T, isEditing: boolean) => void;
    onAfterDelete?: (item: T) => void;
    labels?: Partial<CrudLabels>;
}
export interface CrudManagerReturn<T> {
    items: Ref<T[]>;
    extras: Ref<Record<string, unknown>>;
    loading: Ref<boolean>;
    saving: Ref<boolean>;
    search: Ref<string>;
    dialogVisible: Ref<boolean>;
    editingItem: Ref<T | null>;
    formData: Record<string, unknown>;
    pagination: PaginationState;
    sort: SortState;
    isEditing: ComputedRef<boolean>;
    isViewing: ComputedRef<boolean>;
    viewMode: Ref<boolean>;
    dialogTitle: ComputedRef<string>;
    isFirstPage: ComputedRef<boolean>;
    isLastPage: ComputedRef<boolean>;
    init(): Promise<void>;
    fetchItems(params?: Record<string, unknown>): Promise<void>;
    fetchAll(pageSize?: number): Promise<T[]>;
    refresh(): Promise<void>;
    setSearch(value: string): void;
    onSearch(event: Event): void;
    onPage(event: {
        page: number;
        rows: number;
    }): void;
    onSort(event: {
        sortField?: string | null;
        sortOrder?: 1 | -1 | 0 | null;
    }): void;
    openCreateDialog(): void;
    openEditDialog(item: T): void;
    openViewDialog(item: T): void;
    openDuplicateDialog(item: T): void;
    save(): Promise<T | null>;
    confirmDelete(item: T): void;
    setFormField(field: string, value: unknown): void;
    resetForm(): void;
    goToPage(page: number): void;
    firstPage(): void;
    lastPage(): void;
    config: CrudManagerConfig<T>;
}
