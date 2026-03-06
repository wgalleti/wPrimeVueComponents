import { CrudManagerReturn, KpiItem } from '../../types/crud';
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
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<`column-${string}`, (_: {
        data: any;
        value: any;
    }) => any>> & Partial<Record<`field-${string}`, (_: {
        field: import('../../types/crud').FieldDef;
        formData: Record<string, unknown>;
        isEditing: boolean;
        setFormField: (f: string, v: unknown) => void;
    }) => any>> & {
        'header-actions'?(_: {}): any;
        'before-table'?(_: {}): any;
        'toolbar-start'?(_: {}): any;
        'toolbar-filters'?(_: {}): any;
        'toolbar-actions'?(_: {}): any;
        empty?(_: {}): any;
        'row-actions'?(_: {
            data: any;
            crud: CrudManagerReturn<any>;
        }): any;
        expansion?(_: {
            data: any;
        }): any;
        'form-dialog'?(_: {
            crud: CrudManagerReturn<any>;
            dialogWidth: string;
        }): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "row-expand": (data: unknown) => any;
    "row-collapse": (data: unknown) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
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
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
