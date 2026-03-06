import { parseDate, toDateString, toDateTimeString } from '@/utils/dates';
import { formatCpf, formatCnpj, formatCpfCnpj, formatTelefone, validateCpf, validateCnpj, validateCpfCnpj } from '@/utils/masks';
export declare function useFormatters(): {
    formatCurrency: (value: number | null | undefined) => string;
    formatNumber: (value: number | null | undefined, decimals?: number) => string;
    formatDate: (value: string | Date | null | undefined, format?: string) => string;
    formatDateTime: (value: string | Date | null | undefined) => string;
    formatPercent: (value: number | null | undefined) => string;
    formatCpf: typeof formatCpf;
    formatCnpj: typeof formatCnpj;
    formatCpfCnpj: typeof formatCpfCnpj;
    formatTelefone: typeof formatTelefone;
    validateCpf: typeof validateCpf;
    validateCnpj: typeof validateCnpj;
    validateCpfCnpj: typeof validateCpfCnpj;
    parseDate: typeof parseDate;
    toDateString: typeof toDateString;
    toDateTimeString: typeof toDateTimeString;
};
