import type { FieldDef, ColumnDef } from '@/types/crud';
export interface ApiFieldMeta {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    max_length?: number;
    choices?: {
        value: string;
        label: string;
    }[];
    read_only?: boolean;
    endpoint?: string;
    option_label?: string;
    option_value?: string;
}
export declare function mapApiFieldToFieldDef(apiField: ApiFieldMeta): FieldDef;
export declare function mapApiFieldsToFieldDefs(apiFields: ApiFieldMeta[]): FieldDef[];
export declare function mapApiFieldToColumnDef(apiField: ApiFieldMeta): ColumnDef;
export declare function mapApiFieldsToColumnDefs(apiFields: ApiFieldMeta[], maxColumns?: number): ColumnDef[];
