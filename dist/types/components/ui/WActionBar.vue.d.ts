type __VLS_Props = {
    align?: 'between' | 'start' | 'end';
    stackOnMobile?: boolean;
};
declare var __VLS_1: {}, __VLS_3: {}, __VLS_5: {}, __VLS_7: {};
type __VLS_Slots = {} & {
    primary?: (props: typeof __VLS_1) => any;
} & {
    default?: (props: typeof __VLS_3) => any;
} & {
    filters?: (props: typeof __VLS_5) => any;
} & {
    secondary?: (props: typeof __VLS_7) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    align: "between" | "start" | "end";
    stackOnMobile: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
