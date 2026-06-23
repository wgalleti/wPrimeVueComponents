import type { ColumnDef } from '@/types/crud';
export interface ToCsvOptions {
    /** Field separator (default: ';' — friendly to pt-BR Excel). */
    separator?: string;
}
/**
 * Serialize rows into a CSV string respecting the given (visible) columns.
 * Uses the column `format` callback when present, prepends a UTF-8 BOM so
 * Excel renders accents correctly, and defaults to `;` as the separator.
 */
export declare function toCsv(rows: Record<string, unknown>[], columns: ColumnDef[], options?: ToCsvOptions): string;
/** Trigger a browser download of a CSV string. */
export declare function downloadCsv(csv: string, filename?: string): void;
