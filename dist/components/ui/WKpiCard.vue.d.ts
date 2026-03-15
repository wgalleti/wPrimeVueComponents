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
declare function __VLS_template(): {
    attrs: Partial<{}>;
    slots: {
        icon?(_: {}): any;
        trend?(_: {}): any;
        value?(_: {}): any;
        hint?(_: {}): any;
        footer?(_: {}): any;
    };
    refs: {};
    rootEl: HTMLElement;
};
type __VLS_TemplateResult = ReturnType<typeof __VLS_template>;
declare const __VLS_component: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLElement>;
declare const _default: __VLS_WithTemplateSlots<typeof __VLS_component, __VLS_TemplateResult["slots"]>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
