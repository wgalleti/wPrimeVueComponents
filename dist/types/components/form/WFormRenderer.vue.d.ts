import type { FieldDef } from '@/types/crud';
type __VLS_Props = {
    fields: FieldDef[];
    formData: Record<string, unknown>;
    isEditing: boolean;
    disabled?: boolean;
};
declare function validateAll(): string[];
declare function clearErrors(): void;
declare var __VLS_2: `field-${string}`, __VLS_3: {
    field: FieldDef;
    formData: Record<string, unknown>;
    isEditing: boolean;
    setFormField: (f: string, v: unknown) => void;
}, __VLS_30: `image-${string}`, __VLS_31: {
    field: FieldDef;
    formData: Record<string, unknown>;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_2>]?: (props: typeof __VLS_3) => any;
} & {
    [K in NonNullable<typeof __VLS_30>]?: (props: typeof __VLS_31) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {
    validateAll: typeof validateAll;
    clearErrors: typeof clearErrors;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:field": (field: string, value: unknown) => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
}>, {
    disabled: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
