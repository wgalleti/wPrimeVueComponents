import { FieldDef } from '../../types/crud';
type __VLS_Props = {
    fields: FieldDef[];
    formData: Record<string, unknown>;
    isEditing: boolean;
    disabled?: boolean;
};
declare function validateAll(): string[];
declare function clearErrors(): void;
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
    }) => any>>;
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {
    validateAll: typeof validateAll;
    clearErrors: typeof clearErrors;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:field": (field: string, value: unknown) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
}>, {
    disabled: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
