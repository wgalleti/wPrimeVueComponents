import type { FieldDef } from '@/types/crud';
type __VLS_Props = {
    visible: boolean;
    title: string;
    fields: FieldDef[];
    formData: Record<string, unknown>;
    isEditing: boolean;
    saving: boolean;
    width?: string;
};
declare var __VLS_11: `field-${string}`, __VLS_12: {
    field: FieldDef;
    formData: Record<string, unknown>;
    isEditing: boolean;
    setFormField: (f: string, v: unknown) => void;
}, __VLS_39: `image-${string}`, __VLS_40: {
    field: FieldDef;
    formData: Record<string, unknown>;
}, __VLS_157: {
    saving: boolean;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_11>]?: (props: typeof __VLS_12) => any;
} & {
    [K in NonNullable<typeof __VLS_39>]?: (props: typeof __VLS_40) => any;
} & {
    footer?: (props: typeof __VLS_157) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    "update:visible": (value: boolean) => any;
    "update:field": (field: string, value: unknown) => any;
    save: () => any;
}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:visible"?: ((value: boolean) => any) | undefined;
    "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
    onSave?: (() => any) | undefined;
}>, {
    width: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
