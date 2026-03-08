import { AxiosInstance } from 'axios';
export interface WPluginOptions {
    axios: AxiosInstance;
    defaultPageSize?: number;
    dateFormat?: string;
    dateTimeFormat?: string;
    locale?: string;
    currency?: string;
    registerComponents?: boolean;
}
export interface WPluginConfig {
    axios: AxiosInstance;
    defaultPageSize: number;
    dateFormat: string;
    dateTimeFormat: string;
    locale: string;
    currency: string;
}
export declare const W_AXIOS_KEY: unique symbol;
export declare const W_CONFIG_KEY: unique symbol;
