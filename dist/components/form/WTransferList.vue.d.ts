type Id = string | number;
type Item = Record<string, unknown>;
type __VLS_Props = {
    /** Full pool of available records. */
    source: Item[];
    /** Currently selected ids (v-model:selected). */
    selected: Id[];
    /** Field used as the record id (default: 'id'). */
    trackBy?: string;
    /** Field used for the visible label (default: 'nome'). */
    optionLabel?: string;
    /** Fields to match when searching (default: [optionLabel]). */
    searchFields?: string[];
    disabled?: boolean;
};
declare const _default: import('vue').DefineComponent<__VLS_Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:selected": (ids: Id[]) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_Props> & Readonly<{
    "onUpdate:selected"?: ((ids: Id[]) => any) | undefined;
}>, {
    optionLabel: string;
    selected: Id[];
    trackBy: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, HTMLDivElement>;
export default _default;
