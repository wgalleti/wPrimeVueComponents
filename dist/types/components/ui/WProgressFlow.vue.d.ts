interface ProgressStep {
    key: string;
    label: string;
    description?: string;
}
type __VLS_Props = {
    steps: ProgressStep[];
    currentStep: string;
    orientation?: 'horizontal' | 'vertical';
};
declare var __VLS_1: {
    step: ProgressStep;
    index: number;
    state: string;
};
type __VLS_Slots = {} & {
    step?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    orientation: "horizontal" | "vertical";
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
