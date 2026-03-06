import { FieldDef } from '../../types/crud';
type __VLS_Props = {
    visible: boolean;
    title: string;
    fields: FieldDef[];
    formData: Record<string, unknown>;
    isEditing: boolean;
    saving: boolean;
    width?: string;
};
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: Partial<Record<`field-${string}`, (_: {
        field: FieldDef;
        formData: Record<string, unknown>;
        isEditing: boolean;
        setFormField: (f: string, v: unknown) => void;
    }) => any>> & Partial<Record<`image-${string}`, (_: {
        field: FieldDef;
        formData: Record<string, unknown>;
    }) => any>> & {
        footer?(_: {
            saving: boolean;
        }): any;
    };
    refs: {};
    rootEl: any;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:visible": (value: boolean) => any;
    "update:field": (field: string, value: unknown) => any;
    save: () => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
    onSave?: (() => any) | undefined;
}>, {
    width: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
