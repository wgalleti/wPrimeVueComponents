import {
  defineComponent,
  h,
  onScopeDispose,
  provide,
  toRef,
  watch,
  type PropType,
  type Ref,
} from 'vue'
import { routeLocationKey } from 'vue-router'
import {
  W_TAB_HOST_KEY,
  type RouteTab,
  type RouteTabsApi,
  type TabHostContext,
} from '@/types/routeTabs'

/**
 * Pane de uma aba — interno do WTabViewport, não exportado no barrel.
 *
 * Faz os dois provides que dão à tela a ilusão de viver sozinha:
 * - `routeLocationKey` (a MESMA chave que o vue-router usa): o `useRoute()` da
 *   tela passa a injetar o snapshot congelado da aba, então um pane oculto
 *   nunca reage à navegação global.
 * - `W_TAB_HOST_KEY`: contexto para a tela pendurar dialogs no container da
 *   aba (`hostEl`), definir o título dinâmico e registrar hooks/guards.
 *
 * Os registros (guards/hooks) são desfeitos via `onScopeDispose` no escopo de
 * QUEM registrou — assim um `reload()` (remount) não acumula guard morto.
 */
export default defineComponent({
  name: 'WTabPane',
  props: {
    tab: { type: Object as PropType<RouteTab>, required: true },
    api: { type: Object as PropType<RouteTabsApi>, required: true },
    active: { type: Boolean, required: true },
    hostEl: { type: Object as PropType<Ref<HTMLElement | null>>, required: true },
  },
  setup(props) {
    const runtime = props.api.runtime(props.tab.key)
    if (!runtime) return () => null

    provide(routeLocationKey, runtime.route)

    function register(list: Array<() => unknown>, fn: () => unknown): void {
      list.push(fn)
      onScopeDispose(() => {
        const index = list.indexOf(fn)
        if (index !== -1) list.splice(index, 1)
      })
    }

    const host: TabHostContext = {
      hostEl: props.hostEl,
      active: toRef(props, 'active'),
      setTitle: (title) => props.api.setTitle(props.tab.key, title),
      onTabActivated: (fn) => register(runtime.activatedHooks, fn),
      onTabDeactivated: (fn) => register(runtime.deactivatedHooks, fn),
      registerCloseGuard: (guard) => register(runtime.closeGuards, guard),
    }
    provide(W_TAB_HOST_KEY, host)

    watch(
      () => props.active,
      (active) => {
        const hooks = active ? runtime.activatedHooks : runtime.deactivatedHooks
        for (const fn of [...hooks]) fn()
      },
    )

    return () =>
      runtime.component ? h(runtime.component, { ...runtime.props, key: props.tab.remount }) : null
  },
})
