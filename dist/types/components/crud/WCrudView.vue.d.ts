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
    actionRail?: boolean;
    contextMenu?: boolean;
    showPrint?: boolean;
    exportCsv?: boolean;
    csvFilename?: string;
    csvScope?: 'all' | 'page';
    csvPageSize?: number;
};
declare var __VLS_1: {}, __VLS_11: {}, __VLS_43: {}, __VLS_45: {}, __VLS_47: {}, __VLS_81: {}, __VLS_92: `column-${string}`, __VLS_93: {
    data: any;
    value: any;
}, __VLS_110: {
    data: any;
    crud: CrudManagerReturn<any>;
}, __VLS_112: {
    data: any;
}, __VLS_130: {}, __VLS_132: {}, __VLS_134: {}, __VLS_168: {}, __VLS_171: `column-${string}`, __VLS_172: {
    data: any;
    value: any;
}, __VLS_185: {
    data: any;
    crud: CrudManagerReturn<any>;
}, __VLS_211: {
    selected: Record<string, unknown> | null;
    crud: CrudManagerReturn<any>;
}, __VLS_235: {
    crud: CrudManagerReturn<any>;
    dialogWidth: string;
}, __VLS_247: `field-${string}`, __VLS_248: {
    field: import("@/types/crud").FieldDef;
    formData: Record<string, unknown>;
    isEditing: boolean;
    setFormField: (f: string, v: unknown) => void;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_92>]?: (props: typeof __VLS_93) => any;
} & {
    [K in NonNullable<typeof __VLS_171>]?: (props: typeof __VLS_172) => any;
} & {
    [K in NonNullable<typeof __VLS_247>]?: (props: typeof __VLS_248) => any;
} & {
    'header-actions'?: (props: typeof __VLS_1) => any;
} & {
    'before-table'?: (props: typeof __VLS_11) => any;
} & {
    'toolbar-start'?: (props: typeof __VLS_43) => any;
} & {
    'toolbar-filters'?: (props: typeof __VLS_45) => any;
} & {
    'toolbar-actions'?: (props: typeof __VLS_47) => any;
} & {
    empty?: (props: typeof __VLS_81) => any;
} & {
    'row-actions'?: (props: typeof __VLS_110) => any;
} & {
    expansion?: (props: typeof __VLS_112) => any;
} & {
    'toolbar-start'?: (props: typeof __VLS_130) => any;
} & {
    'toolbar-filters'?: (props: typeof __VLS_132) => any;
} & {
    'toolbar-actions'?: (props: typeof __VLS_134) => any;
} & {
    empty?: (props: typeof __VLS_168) => any;
} & {
    'row-actions'?: (props: typeof __VLS_185) => any;
} & {
    'rail-actions'?: (props: typeof __VLS_211) => any;
} & {
    'form-dialog'?: (props: typeof __VLS_235) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "row-expand": (data: unknown) => any;
    "row-collapse": (data: unknown) => any;
    print: (data: Record<string, unknown>) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onRow-expand"?: ((data: unknown) => any) | undefined;
    "onRow-collapse"?: ((data: unknown) => any) | undefined;
    onPrint?: ((data: Record<string, unknown>) => any) | undefined;
}>, {
    dialogWidth: string;
    contextMenu: boolean;
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
    actionRail: boolean;
    showPrint: boolean;
    exportCsv: boolean;
    csvFilename: string;
    csvScope: "all" | "page";
    csvPageSize: number;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
