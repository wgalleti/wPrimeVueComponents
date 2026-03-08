import { ComputedRef, Ref } from 'vue';
import { PaginationState, SortState } from './api';
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
export type FieldType = 'text' | 'email' | 'password' | 'number' | 'currency' | 'date' | 'datetime' | 'select' | 'autocomplete' | 'fk' | 'switch' | 'textarea' | 'color' | 'cpf_cnpj' | 'mask' | 'image';
export interface SelectOption {
    [key: string]: unknown;
}
export interface FieldDef {
    field: string;
    label: string;
    type?: FieldType;
    required?: boolean;
    colSpan?: number;
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
    endpoint?: string;
    crudFields?: FieldDef[];
    crudColumns?: ColumnDef[];
    min?: number;
    max?: number;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    prefix?: string;
    suffix?: string;
    dateFormat?: string;
    hourFormat?: '12' | '24';
    mask?: string;
    rows?: number;
    switchLabel?: string;
    feedback?: boolean;
    accept?: string;
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
}
export interface CrudManagerConfig<T> {
    endpoint: string;
    columns: ColumnDef[];
    form: FieldDef[];
    pk?: string;
    pageSize?: number;
    searchDebounce?: number;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    rowActions?: RowAction<T>[];
    filterParams?: () => Record<string, unknown>;
    transformPayload?: (payload: Record<string, unknown>, isEditing: boolean) => Record<string, unknown>;
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
    save(): Promise<T | null>;
    confirmDelete(item: T): void;
    setFormField(field: string, value: unknown): void;
    resetForm(): void;
    goToPage(page: number): void;
    firstPage(): void;
    lastPage(): void;
    config: CrudManagerConfig<T>;
}
