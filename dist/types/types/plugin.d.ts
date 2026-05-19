import type { AxiosInstance } from 'axios';
import type { DataProvider } from './dataProvider';
export interface WPluginOptions {
    axios?: AxiosInstance;
    dataProvider?: DataProvider;
    defaultPageSize?: number;
    dateFormat?: string;
    dateTimeFormat?: string;
    locale?: string;
    currency?: string;
    registerComponents?: boolean;
}
export interface WPluginConfig {
    axios?: AxiosInstance;
    dataProvider: DataProvider;
    defaultPageSize: number;
    dateFormat: string;
    dateTimeFormat: string;
    locale: string;
    currency: string;
}
export declare const W_AXIOS_KEY: unique symbol;
export declare const W_DATA_PROVIDER_KEY: unique symbol;
export declare const W_CONFIG_KEY: unique symbol;
