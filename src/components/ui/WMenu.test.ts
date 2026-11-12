// @vitest-environment jsdom
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { defineComponent, h, ref, shallowRef } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WMenu from './WMenu.vue'
import type { MenuMode } from '@/types/button'
import { W_TAB_HOST_KEY, type TabHostContext } from '@/types/routeTabs'

function criarHost(): { el: HTMLElement; contexto: TabHostContext } {
  const el = document.createElement('div')
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

async function abrir(mode: MenuMode, command = vi.fn(), contexto?: TabHostContext) {
  const items = [{ label: 'Duplicar', command }]
  const Host = defineComponent({
    setup() {
      const menu = ref<InstanceType<typeof WMenu> | null>(null)
      return () =>
        h('div', [
          h(
            'button',
            {
              class: 'gatilho',
              onClick: (e: Event) =>
                mode === 'popup' ? menu.value?.toggle(e) : menu.value?.show(e),
            },
            'abrir',
          ),
          h(WMenu, { ref: menu, items, mode }),
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
  window.matchMedia ??= vi.fn().mockReturnValue({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })
})

describe('WMenu', () => {
  it('popup: abre no pane da aba e o item executa o command', async () => {
    const { el, contexto } = criarHost()
    const command = vi.fn()
    await abrir('popup', command, contexto)
    const menu = el.querySelector('.p-menu')
    expect(menu?.classList.contains('w-tab-overlay')).toBe(true)
    ;(el.querySelector('.p-menu-item-link') as HTMLElement).click()
    expect(command).toHaveBeenCalledOnce()
  })

  it('context: ContextMenu no ponteiro, fora de abas cai no body', async () => {
    await abrir('context')
    expect(document.body.querySelector('.p-contextmenu')?.textContent).toContain('Duplicar')
  })

  it('toggle e show repassam o target ao PrimeVue', async () => {
    const Menu = (await import('primevue/menu')).default as unknown as {
      methods: { toggle: (...a: unknown[]) => void }
    }
    const spy = vi.spyOn(Menu.methods, 'toggle').mockImplementation(() => undefined)
    const w = mount(WMenu, { props: { items: [{ label: 'A' }] }, global: { plugins: [PrimeVue] } })
    const alvo = document.createElement('button')
    const ev = new Event('click')
    w.vm.toggle(ev, alvo)
    expect(spy).toHaveBeenCalledWith(ev, alvo)
    spy.mockRestore()
  })
})
