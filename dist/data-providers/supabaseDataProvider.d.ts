import { DataProvider } from '../types/dataProvider';
type SupabaseResult<T> = {
    data: T | null;
    error: {
        message: string;
        code?: string;
        details?: string;
        hint?: string;
    } | null;
    count?: number | null;
};
type SupabaseFilterBuilder<T> = PromiseLike<SupabaseResult<T>> & {
    select(columns?: string, options?: {
        count?: 'exact' | 'planned' | 'estimated';
    }): SupabaseFilterBuilder<T>;
    eq(column: string, value: unknown): SupabaseFilterBuilder<T>;
    ilike(column: string, pattern: string): SupabaseFilterBuilder<T>;
    or(filters: string): SupabaseFilterBuilder<T>;
    order(column: string, options?: {
        ascending?: boolean;
    }): SupabaseFilterBuilder<T>;
    range(from: number, to: number): SupabaseFilterBuilder<T>;
    single(): Promise<SupabaseResult<T>>;
};
type SupabaseTable = {
    select<T = unknown>(columns?: string, options?: {
        count?: 'exact' | 'planned' | 'estimated';
    }): SupabaseFilterBuilder<T>;
    insert<T = unknown>(payload: unknown): SupabaseFilterBuilder<T>;
    update<T = unknown>(payload: unknown): SupabaseFilterBuilder<T>;
    delete<T = unknown>(): SupabaseFilterBuilder<T>;
};
export interface SupabaseDataProviderClient {
    from(table: string): SupabaseTable;
}
export interface SupabaseResourceConfig {
    table: string;
    pk?: string;
    select?: string;
    searchFields?: string[];
    defaultOrdering?: string;
    defaultFilters?: Record<string, unknown>;
    softDelete?: boolean | Record<string, unknown>;
    mapListItem?: (item: Record<string, unknown>) => Record<string, unknown>;
    mapPayload?: (payload: Record<string, unknown>, operation: 'create' | 'update') => Record<string, unknown>;
}
export interface CreateSupabaseDataProviderOptions {
    client: SupabaseDataProviderClient;
    resources?: Record<string, SupabaseResourceConfig | string>;
    defaultSelect?: string;
    allowedTables?: string[];
}
export declare function createSupabaseDataProvider(options: CreateSupabaseDataProviderOptions): DataProvider;
export {};
