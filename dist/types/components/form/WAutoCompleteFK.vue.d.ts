import type { FieldDef, ColumnDef } from '@/types/crud';
interface ColumnMeta {
    field: string;
    header: string;
}
type __VLS_Props = {
    modelValue: string | number | Record<string, unknown> | null;
    endpoint: string;
    optionLabel?: string;
    optionValue?: string;
    placeholder?: string;
    disabled?: boolean;
    showClear?: boolean;
    forceSelection?: boolean;
    columns?: ColumnMeta[];
    minLength?: number;
    dialogHeader?: string;
    canCreate?: boolean;
    canEdit?: boolean;
    canDelete?: boolean;
    crudFields?: FieldDef[];
    crudColumns?: ColumnDef[];
    dialogWidth?: string;
};
declare const _default: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:modelValue": (value: Record<string, unknown> | null) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: Record<string, unknown> | null) => any) | undefined;
}>, {
    placeholder: string;
    optionLabel: string;
    optionValue: string;
    disabled: boolean;
    showClear: boolean;
    forceSelection: boolean;
    minLength: number;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    dialogWidth: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
export default _default;
