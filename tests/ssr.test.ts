// @vitest-environment node
import { describe, it, expect } from 'vitest'
import { createSSRApp, defineComponent, h } from 'vue'
import { renderToString } from '@vue/server-renderer'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
// Pelo barrel público: um módulo que toque `window` ao ser importado já quebra aqui.
import {
  WPrimeVuePlugin,
  WButton,
  WDialog,
  WSegmented,
  WEmptyState,
  WSkeleton,
  WNotice,
  WStatusTag,
  WMoneyInput,
  WDatePicker,
  WPopover,
  WMenu,
  WProgress,
  useApi,
  useBreakpoint,
} from '@/index'

/** Monta `root` num app SSR como um Nuxt faria: PrimeVue + serviços + plugin SEM provedor. */
function render(root: ReturnType<typeof defineComponent>) {
  const app = createSSRApp(root)
  app.use(PrimeVue)
  app.use(ToastService)
  app.use(ConfirmationService)
  app.use(WPrimeVuePlugin)
  return renderToString(app)
}

describe('SSR (node, sem window)', () => {
  it('o ambiente não tem window', () => {
    expect(typeof window).toBe('undefined')
    expect(typeof document).toBe('undefined')
  })

  it('renderiza os componentes de vitrine sem provedor de dados', async () => {
    const Vitrine = defineComponent({
      setup: () => () =>
        h('main', [
          h(WButton, { label: 'Reservar' }),
          h(WDialog, { visible: true, header: 'Reserva' }, { default: () => 'corpo' }),
          h(WSegmented, {
            modelValue: 'a',
            options: [
              { label: 'A', value: 'a' },
              { label: 'B', value: 'b' },
            ],
          }),
          h(WEmptyState, { title: 'Nada por aqui' }),
          h(WSkeleton),
          h(WNotice, { severity: 'info' }, { default: () => 'aviso' }),
          h(WStatusTag, { value: 'Ativo' }),
          h(WMoneyInput, { modelValue: 12.5 }),
          h(WDatePicker, { modelValue: '2026-11-13' }),
          h(WPopover, null, { default: () => 'pop' }),
          h(WMenu, { model: [{ label: 'Item' }], popup: true }),
          h(WProgress, { value: 40 }),
        ]),
    })

    const html = await render(Vitrine)
    expect(html).toContain('Reservar')
    expect(html).toContain('Nada por aqui')
    expect(html).toContain('aviso')
  })

  it('useBreakpoint responde o layout de mesa no servidor', async () => {
    let bp: ReturnType<typeof useBreakpoint> | undefined
    const Comp = defineComponent({
      setup() {
        bp = useBreakpoint()
        return () => h('div')
      },
    })
    await render(Comp)
    expect(bp!.isDesktop.value).toBe(true)
    expect(bp!.isPaisagem.value).toBe(true)
    expect(bp!.isRetrato.value).toBe(false)
    expect(bp!.isCelular.value).toBe(false)
    expect(bp!.isToque.value).toBe(false)
  })

  it('sem provedor, useApi acusa a falta e diz como configurar', async () => {
    const Comp = defineComponent({
      setup() {
        useApi({ endpoint: 'produtos' })
        return () => h('div')
      },
    })
    await expect(render(Comp)).rejects.toThrow(/WPrimeVuePlugin com "axios" ou "dataProvider"/)
  })
})
