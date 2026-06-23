type __VLS_Props = {
    /** Numeric model — the real value sent to the API (e.g. 1234.56). */
    modelValue: number | null;
    /** Fixed decimal places (default: 2). */
    decimals?: number;
    /** Show a "R$" prefix. Ignored when `prefix` is set. */
    currency?: boolean;
    /** Custom leading addon (overrides `currency`). */
    prefix?: string;
    /** Trailing addon. */
    suffix?: string;
    /** Display locale for grouping/decimal separators (default: 'pt-BR'). */
    locale?: string;
    disabled?: boolean;
    placeholder?: string;
    invalid?: boolean;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: number | null) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:modelValue"?: ((value: number | null) => any) | undefined;
}>, {
    currency: boolean;
    disabled: boolean;
    decimals: number;
    locale: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
export default _default;
