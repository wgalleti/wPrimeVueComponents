// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { defineComponent, h, ref, shallowRef } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
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
})
