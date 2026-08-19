// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import { shallowRef } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WDialog from './WDialog.vue'
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

async function montar(contexto?: TabHostContext, attrs: Record<string, unknown> = {}) {
  const wrapper = mount(WDialog, {
    attrs: { visible: true, header: 'Título', ...attrs },
    slots: { default: '<p class="conteudo">corpo</p>' },
    global: {
      plugins: [PrimeVue],
      provide: contexto ? { [W_TAB_HOST_KEY as symbol]: contexto } : {},
    },
    attachTo: document.body,
  })
  await flushPromises()
  return wrapper
}

beforeEach(() => {
  document.body.innerHTML = ''
})

describe('WDialog — âncora por aba', () => {
  it('dentro de uma aba, pendura no pane dela (não no body)', async () => {
    const { el, contexto } = criarHost()
    await montar(contexto)
    expect(el.querySelector('.p-dialog')).toBeTruthy()
    expect(el.querySelector('.conteudo')?.textContent).toBe('corpo')
  })

  it('fora de abas, cai no body como o Dialog de sempre', async () => {
    await montar()
    const dialog = document.body.querySelector('.p-dialog')
    expect(dialog).toBeTruthy()
    expect(dialog?.closest('.pane-da-aba')).toBeNull()
  })

  it('append-to explícito do consumidor vence o default', async () => {
    const { el, contexto } = criarHost()
    const outro = document.createElement('div')
    outro.className = 'outro-alvo'
    document.body.appendChild(outro)
    await montar(contexto, { appendTo: outro })
    expect(outro.querySelector('.p-dialog')).toBeTruthy()
    expect(el.querySelector('.p-dialog')).toBeNull()
  })

  it('repassa eventos do Dialog (fechar emite update:visible)', async () => {
    const { contexto } = criarHost()
    const recebidos: unknown[] = []
    await montar(contexto, { 'onUpdate:visible': (v: unknown) => recebidos.push(v) })
    const fechar = document.querySelector('.p-dialog-close-button') as HTMLElement
    expect(fechar).toBeTruthy()
    fechar.click()
    expect(recebidos).toEqual([false])
  })
})
