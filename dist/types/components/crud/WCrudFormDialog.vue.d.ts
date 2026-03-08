import type { FieldDef } from '@/types/crud';
type __VLS_Props = {
    visible: boolean;
    title: string;
    fields: FieldDef[];
    formData: Record<string, unknown>;
    isEditing: boolean;
    saving: boolean;
    disabled?: boolean;
    width?: string;
};
declare var __VLS_20: `field-${string}`, __VLS_21: {
    field: FieldDef;
    formData: Record<string, unknown>;
    isEditing: boolean;
    setFormField: (f: string, v: unknown) => void;
}, __VLS_24: `image-${string}`, __VLS_25: {
    field: FieldDef;
    formData: Record<string, unknown>;
}, __VLS_27: {
    saving: boolean;
    disabled: boolean;
};
type __VLS_Slots = {} & {
    [K in NonNullable<typeof __VLS_20>]?: (props: typeof __VLS_21) => any;
} & {
    [K in NonNullable<typeof __VLS_24>]?: (props: typeof __VLS_25) => any;
} & {
    footer?: (props: typeof __VLS_27) => any;
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
    disabled: boolean;
    width: string;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
