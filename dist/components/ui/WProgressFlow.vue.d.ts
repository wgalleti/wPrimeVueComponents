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
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        step?(_: {
            step: ProgressStep;
            index: number;
            state: string;
        }): any;
    };
    refs: {};
    rootEl: HTMLDivElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    orientation: "horizontal" | "vertical";
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
