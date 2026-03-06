import { UseApiReturn } from '../types/api';
export interface UseApiOptions {
    endpoint: string;
    pageSize?: number;
    searchDebounce?: number;
    immediate?: boolean;
}
export declare function useApi<T = Record<string, unknown>>(options: UseApiOptions): UseApiReturn<T>;
