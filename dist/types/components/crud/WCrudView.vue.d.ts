import type { CrudManagerReturn, KpiItem } from '@/types/crud';
type __VLS_Props = {
    crud: CrudManagerReturn<any>;
    title: string;
    subtitle?: string;
    showSearch?: boolean;
    showHeader?: boolean;
    dialogWidth?: string;
    autoInit?: boolean;
    showKpi?: boolean;
    kpiIcon?: string;
    kpiLabel?: string;
    extraKpis?: KpiItem[];
    expandable?: boolean;
};
declare var __VLS_1: {}, __VLS_11: {}, __VLS_40: {}, __VLS_42: {}, __VLS_44: {}, __VLS_54: {}, __VLS_65: `column-${string}`, __VLS_66: {
    data: any;
    value: any;
}, __VLS_75: {
    data: any;
    crud: CrudManagerReturn<any>;
}, __VLS_85: {
    data: any;
}, __VLS_87: {
    crud: CrudManagerReturn<any>;
    dialogWidth: string;
}, __VLS_99: `field-${string}`, __VLS_100: {
    field: import("@/types/crud").FieldDef;
    formData: Record<string, unknown>;
    isEditing: boolean;
    setFormField: (f: string, v: unknown) => void;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_65>]?: (props: typeof __VLS_66) => any;
} & {
    [K in NonNullable<typeof __VLS_99>]?: (props: typeof __VLS_100) => any;
} & {
    'header-actions'?: (props: typeof __VLS_1) => any;
} & {
    'before-table'?: (props: typeof __VLS_11) => any;
} & {
    'toolbar-start'?: (props: typeof __VLS_40) => any;
} & {
    'toolbar-filters'?: (props: typeof __VLS_42) => any;
} & {
    'toolbar-actions'?: (props: typeof __VLS_44) => any;
} & {
    empty?: (props: typeof __VLS_54) => any;
} & {
    'row-actions'?: (props: typeof __VLS_75) => any;
} & {
    expansion?: (props: typeof __VLS_85) => any;
} & {
    'form-dialog'?: (props: typeof __VLS_87) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "row-expand": (data: unknown) => any;
    "row-collapse": (data: unknown) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onRow-expand"?: ((data: unknown) => any) | undefined;
    "onRow-collapse"?: ((data: unknown) => any) | undefined;
}>, {
    dialogWidth: string;
    showHeader: boolean;
    showSearch: boolean;
    autoInit: boolean;
    showKpi: boolean;
    kpiIcon: string;
    kpiLabel: string;
    extraKpis: KpiItem[];
    expandable: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
