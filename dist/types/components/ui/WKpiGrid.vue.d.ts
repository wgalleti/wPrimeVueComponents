import type { KpiItem } from '@/types/crud';
type __VLS_Props = {
    items?: KpiItem[];
    columns?: 2 | 3 | 4;
    dense?: boolean;
};
declare var __VLS_1: {
    key: number;
    item: KpiItem;
    index: number;
};
type __VLS_Slots = {} & {
    item?: (props: typeof __VLS_1) => any;
};
declare const __VLS_component: import("vue").DefineComponent<__VLS_Props, {}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<__VLS_Props> & Readonly<{}>, {
    columns: 2 | 3 | 4;
    items: KpiItem[];
    dense: boolean;
}, {}, {}, {}, string, import("vue").ComponentProvideOptions, false, {}, any>;
declare const _default: __VLS_WithSlots<typeof __VLS_component, __VLS_Slots>;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
