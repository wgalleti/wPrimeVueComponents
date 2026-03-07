type __VLS_Props = {
    title: string;
    subtitle?: string;
    icon?: string;
    backRoute?: string;
    backTo?: string | Record<string, unknown>;
    status?: string;
    statusMap?: Record<string, {
        label: string;
        severity: string;
    }>;
};
declare var __VLS_12: {};
type __VLS_Slots = {} & {
    actions?: (props: typeof __VLS_12) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
