// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { defineComponent, h, ref, shallowRef } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import Popover from 'primevue/popover'
import WPopover from './WPopover.vue'
import { W_TAB_HOST_KEY, type TabHostContext } from '@/types/routeTabs'

function criarHost(): { el: HTMLElement; contexto: TabHostContext } {
  const el = document.createElement('div')
  el.className = 'pane-da-aba'
  document.body.appendChild(el)
  const contexto: TabHostContext = {
    hostEl: shallowRef<HTMLElement | null>(el),
    active: shallowRef(true),
    setTitle: () => undefined,
    onTabActivated: () => undefined,
    onTabDeactivated: () => undefined,
    registerCloseGuard: () => undefined,
  }
  return { el, contexto }
}

async function abrir(contexto?: TabHostContext) {
  const Host = defineComponent({
    setup() {
      const pop = ref<InstanceType<typeof WPopover> | null>(null)
      return () =>
        h('div', [
          h('button', { class: 'gatilho', onClick: (e: Event) => pop.value?.toggle(e) }, 'abrir'),
          h(WPopover, { ref: pop }, { default: () => h('p', { class: 'conteudo' }, 'corpo') }),
        ])
    },
  })
  const w = mount(Host, {
    attachTo: document.body,
    global: {
      plugins: [PrimeVue],
      provide: contexto ? { [W_TAB_HOST_KEY as symbol]: contexto } : {},
    },
  })
  await w.find('.gatilho').trigger('click')
  await flushPromises()
  return w
}

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('WPopover — âncora por aba', () => {
  it('dentro de uma aba, pendura no pane e grava o deslocamento do pane', async () => {
    const { el, contexto } = criarHost()
    await abrir(contexto)
    const pop = el.querySelector('.p-popover')
    expect(pop?.classList.contains('w-tab-overlay')).toBe(true)
    expect(el.querySelector('.conteudo')?.textContent).toBe('corpo')
    expect(el.style.getPropertyValue('--w-overlay-shift-x')).toMatch(/px$/)
  })

  it('fora de abas, cai no body', async () => {
    await abrir()
    expect(document.body.querySelector('.p-popover .conteudo')).toBeTruthy()
  })

  it('toggle de novo fecha', async () => {
    const w = await abrir()
    await w.find('.gatilho').trigger('click')
    await flushPromises()
    expect(document.body.querySelector('.p-popover')).toBeNull()
  })

  it('sem alignOverlay interno do PrimeVue, abre sem TypeError', async () => {
    const mixin = {
      mounted(this: Record<string, unknown>) {
        if ('alignOverlay' in this) this.alignOverlay = undefined
      },
    }
    const erros: unknown[] = []
    const w = mount(WPopover, {
      attachTo: document.body,
      global: {
        plugins: [PrimeVue],
        mixins: [mixin],
        config: { errorHandler: (e) => erros.push(e) },
      },
      slots: { default: () => h('p', { class: 'conteudo' }, 'corpo') },
    })
    await flushPromises()
    const alvo = document.createElement('button')
    document.body.appendChild(alvo)
    w.vm.toggle(new Event('click'), alvo)
    await flushPromises()
    const interno = w.findComponent(Popover).vm as unknown as { alignOverlay?: () => void }
    expect(() => interno.alignOverlay?.()).not.toThrow()
    expect(erros).toEqual([])
    expect(document.body.querySelector('.p-popover .conteudo')).toBeTruthy()
  })
})
