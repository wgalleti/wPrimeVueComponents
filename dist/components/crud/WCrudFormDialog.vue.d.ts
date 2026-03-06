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
    refs: {
        rendererRef: ({
            $: import('vue').ComponentInternalInstance;
            $data: {};
            $props: {
                readonly fields: FieldDef[];
                readonly formData: Record<string, unknown>;
                readonly isEditing: boolean;
                readonly disabled?: boolean | undefined;
                readonly "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
            } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
            $attrs: {
                [x: string]: unknown;
            };
            $refs: {
                [x: string]: unknown;
            };
            $slots: Readonly<{
                [name: string]: import('vue').Slot<any> | undefined;
            }>;
            $root: import('vue').ComponentPublicInstance | null;
            $parent: import('vue').ComponentPublicInstance | null;
            $host: Element | null;
            $emit: (event: "update:field", field: string, value: unknown) => void;
            $el: HTMLDivElement;
            $options: import('vue').ComponentOptionsBase<Readonly<{
                fields: FieldDef[];
                formData: Record<string, unknown>;
                isEditing: boolean;
                disabled?: boolean;
            }> & Readonly<{
                "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
            }>, {
                validateAll: () => string[];
                clearErrors: () => void;
            }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
                "update:field": (field: string, value: unknown) => any;
            }, string, {
                disabled: boolean;
            }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
                beforeCreate?: (() => void) | (() => void)[];
                created?: (() => void) | (() => void)[];
                beforeMount?: (() => void) | (() => void)[];
                mounted?: (() => void) | (() => void)[];
                beforeUpdate?: (() => void) | (() => void)[];
                updated?: (() => void) | (() => void)[];
                activated?: (() => void) | (() => void)[];
                deactivated?: (() => void) | (() => void)[];
                beforeDestroy?: (() => void) | (() => void)[];
                beforeUnmount?: (() => void) | (() => void)[];
                destroyed?: (() => void) | (() => void)[];
                unmounted?: (() => void) | (() => void)[];
                renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
                errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
            };
            $forceUpdate: () => void;
            $nextTick: typeof import('vue').nextTick;
            $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
        } & Readonly<{
            disabled: boolean;
        }> & Omit<Readonly<{
            fields: FieldDef[];
            formData: Record<string, unknown>;
            isEditing: boolean;
            disabled?: boolean;
        }> & Readonly<{
            "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
        }>, "disabled" | "validateAll" | "clearErrors"> & import('vue').ShallowUnwrapRef<{
            validateAll: () => string[];
            clearErrors: () => void;
        }> & {} & import('vue').ComponentCustomProperties & {} & {
            $slots: Partial<Record<`field-${string}`, (_: {
                field: FieldDef;
                formData: Record<string, unknown>;
                isEditing: boolean;
                setFormField: (f: string, v: unknown) => void;
            }) => any>> & Partial<Record<`image-${string}`, (_: {
                field: FieldDef;
                formData: Record<string, unknown>;
            }) => any>>;
        }) | null;
    };
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
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {
    rendererRef: ({
        $: import('vue').ComponentInternalInstance;
        $data: {};
        $props: {
            readonly fields: FieldDef[];
            readonly formData: Record<string, unknown>;
            readonly isEditing: boolean;
            readonly disabled?: boolean | undefined;
            readonly "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
        } & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps;
        $attrs: {
            [x: string]: unknown;
        };
        $refs: {
            [x: string]: unknown;
        };
        $slots: Readonly<{
            [name: string]: import('vue').Slot<any> | undefined;
        }>;
        $root: import('vue').ComponentPublicInstance | null;
        $parent: import('vue').ComponentPublicInstance | null;
        $host: Element | null;
        $emit: (event: "update:field", field: string, value: unknown) => void;
        $el: HTMLDivElement;
        $options: import('vue').ComponentOptionsBase<Readonly<{
            fields: FieldDef[];
            formData: Record<string, unknown>;
            isEditing: boolean;
            disabled?: boolean;
        }> & Readonly<{
            "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
        }>, {
            validateAll: () => string[];
            clearErrors: () => void;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
            "update:field": (field: string, value: unknown) => any;
        }, string, {
            disabled: boolean;
        }, {}, string, {}, import('vue').GlobalComponents, import('vue').GlobalDirectives, string, import('vue').ComponentProvideOptions> & {
            beforeCreate?: (() => void) | (() => void)[];
            created?: (() => void) | (() => void)[];
            beforeMount?: (() => void) | (() => void)[];
            mounted?: (() => void) | (() => void)[];
            beforeUpdate?: (() => void) | (() => void)[];
            updated?: (() => void) | (() => void)[];
            activated?: (() => void) | (() => void)[];
            deactivated?: (() => void) | (() => void)[];
            beforeDestroy?: (() => void) | (() => void)[];
            beforeUnmount?: (() => void) | (() => void)[];
            destroyed?: (() => void) | (() => void)[];
            unmounted?: (() => void) | (() => void)[];
            renderTracked?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            renderTriggered?: ((e: import('vue').DebuggerEvent) => void) | ((e: import('vue').DebuggerEvent) => void)[];
            errorCaptured?: ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: import('vue').ComponentPublicInstance | null, info: string) => boolean | void)[];
        };
        $forceUpdate: () => void;
        $nextTick: typeof import('vue').nextTick;
        $watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, import('@vue/reactivity').OnCleanup]) => any : (...args: [any, any, import('@vue/reactivity').OnCleanup]) => any, options?: import('vue').WatchOptions): import('vue').WatchStopHandle;
    } & Readonly<{
        disabled: boolean;
    }> & Omit<Readonly<{
        fields: FieldDef[];
        formData: Record<string, unknown>;
        isEditing: boolean;
        disabled?: boolean;
    }> & Readonly<{
        "onUpdate:field"?: ((field: string, value: unknown) => any) | undefined;
    }>, "disabled" | "validateAll" | "clearErrors"> & import('vue').ShallowUnwrapRef<{
        validateAll: () => string[];
        clearErrors: () => void;
    }> & {} & import('vue').ComponentCustomProperties & {} & {
        $slots: Partial<Record<`field-${string}`, (_: {
            field: FieldDef;
            formData: Record<string, unknown>;
            isEditing: boolean;
            setFormField: (f: string, v: unknown) => void;
        }) => any>> & Partial<Record<`image-${string}`, (_: {
            field: FieldDef;
            formData: Record<string, unknown>;
        }) => any>>;
    }) | null;
}, any>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
