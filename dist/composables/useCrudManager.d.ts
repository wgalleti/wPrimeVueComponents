import { CrudManagerConfig, CrudManagerReturn } from '../types/crud';
export declare function useCrudManager<T extends Record<string, unknown> = Record<string, unknown>>(config: CrudManagerConfig<T>): CrudManagerReturn<T>;
