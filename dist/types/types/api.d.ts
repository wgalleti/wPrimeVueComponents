import type { Ref } from 'vue';
/**
 * Formato padrao de resposta paginada da API (DRF).
 */
export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    page_size: number;
    rows: number;
    extras?: Record<string, unknown>;
}
/**
 * Estado reativo de paginacao.
 */
export interface PaginationState {
    page: number;
    pageSize: number;
    rows: number;
    totalPages: number;
}
/**
 * Estado de ordenacao server-side.
 */
export interface SortState {
    field: string | null;
    order: 1 | -1 | 0;
}
/**
 * Opcoes do useApi composable.
 */
export interface UseApiOptions {
    endpoint: string;
    pageSize?: number;
    searchDebounce?: number;
}
/**
 * Retorno do useApi composable.
 */
export interface UseApiReturn<T> {
    items: Ref<T[]>;
    loading: Ref<boolean>;
    search: Ref<string>;
    pagination: PaginationState;
    extras: Ref<Record<string, unknown>>;
    sort: SortState;
    fetchItems(params?: Record<string, unknown>): Promise<void>;
    refresh(): Promise<void>;
    setSearch(value: string): void;
    setFilter(key: string, value: unknown): void;
    clearFilters(): void;
    onPage(event: {
        page: number;
        rows: number;
    }): void;
    onSort(event: {
        sortField: string;
        sortOrder: 1 | -1 | 0;
    }): void;
}
