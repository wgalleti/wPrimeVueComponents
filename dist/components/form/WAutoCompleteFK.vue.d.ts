import { FieldDef, ColumnDef } from '../../types/crud';
interface ColumnMeta {
    field: string;
    header: string;
}
/** Filtro em cascata já resolvido (nome do parâmetro + valor atual). */
interface DrilldownFilter {
    field: string;
    value: unknown;
    required?: boolean;
}
type __VLS_Props = {
    modelValue: string | number | Record<string, unknown> | null;
    endpoint: string;
    endpointParams?: Record<string, string | number | boolean>;
    /** Filtro(s) em cascata resolvido(s): aplicado(s) como parâmetro na busca. Com
     *  `required` (default true), a busca só ocorre quando o valor estiver preenchido. */
    drilldown?: DrilldownFilter | DrilldownFilter[];
    optionLabel?: string;
    optionValue?: string;
    placeholder?: string;
    /** Placeholder exibido enquanto uma cascata obrigatória não estiver preenchida. */
    blockedPlaceholder?: string;
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
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: Record<string, unknown> | null) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: Record<string, unknown> | null) => any) | undefined;
}>, {
    optionLabel: string;
    optionValue: string;
    placeholder: string;
    disabled: boolean;
    showClear: boolean;
    forceSelection: boolean;
    minLength: number;
    canCreate: boolean;
    canEdit: boolean;
    canDelete: boolean;
    dialogWidth: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
