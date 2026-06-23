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
    viewToggle?: boolean;
    defaultView?: 'table' | 'cards';
    cardFields?: number;
};
declare var __VLS_1: {}, __VLS_11: {}, __VLS_40: {}, __VLS_42: {}, __VLS_44: {}, __VLS_70: {}, __VLS_81: `column-${string}`, __VLS_82: {
    data: any;
    value: any;
}, __VLS_99: {
    data: any;
    crud: CrudManagerReturn<any>;
}, __VLS_101: {
    data: any;
}, __VLS_119: {}, __VLS_121: {}, __VLS_123: {}, __VLS_149: {}, __VLS_152: `column-${string}`, __VLS_153: {
    data: any;
    value: any;
}, __VLS_166: {
    data: any;
    crud: CrudManagerReturn<any>;
}, __VLS_176: {
    crud: CrudManagerReturn<any>;
    dialogWidth: string;
}, __VLS_188: `field-${string}`, __VLS_189: {
    field: import("@/types/crud").FieldDef;
    formData: Record<string, unknown>;
    isEditing: boolean;
    setFormField: (f: string, v: unknown) => void;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_81>]?: (props: typeof __VLS_82) => any;
} & {
    [K in NonNullable<typeof __VLS_152>]?: (props: typeof __VLS_153) => any;
} & {
    [K in NonNullable<typeof __VLS_188>]?: (props: typeof __VLS_189) => any;
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
    empty?: (props: typeof __VLS_70) => any;
} & {
    'row-actions'?: (props: typeof __VLS_99) => any;
} & {
    expansion?: (props: typeof __VLS_101) => any;
} & {
    'toolbar-start'?: (props: typeof __VLS_119) => any;
} & {
    'toolbar-filters'?: (props: typeof __VLS_121) => any;
} & {
    'toolbar-actions'?: (props: typeof __VLS_123) => any;
} & {
    empty?: (props: typeof __VLS_149) => any;
} & {
    'row-actions'?: (props: typeof __VLS_166) => any;
} & {
    'form-dialog'?: (props: typeof __VLS_176) => any;
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
    viewToggle: boolean;
    defaultView: "table" | "cards";
    cardFields: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
