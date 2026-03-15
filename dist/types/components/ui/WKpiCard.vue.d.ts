type __VLS_Props = {
    label: string;
    value: string | number;
    icon?: string;
    hint?: string;
    severity?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';
    trend?: {
        value: string;
        direction?: 'up' | 'down' | 'neutral';
    };
    loading?: boolean;
};
declare var __VLS_17: {}, __VLS_19: {}, __VLS_21: {}, __VLS_23: {}, __VLS_25: {};
type __VLS_Slots = {} & {
    icon?: (props: typeof __VLS_17) => any;
} & {
    trend?: (props: typeof __VLS_19) => any;
} & {
    value?: (props: typeof __VLS_21) => any;
} & {
    hint?: (props: typeof __VLS_23) => any;
} & {
    footer?: (props: typeof __VLS_25) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
