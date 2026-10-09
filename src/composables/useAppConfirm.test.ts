import { describe, it, expect, vi } from 'vitest'
import { createApp, ref } from 'vue'

const require = vi.fn()
vi.mock('primevue/useconfirm', () => ({ useConfirm: () => ({ require }) }))

import { useAppConfirm } from './useAppConfirm'
import { W_TAB_HOST_KEY, type TabHostContext } from '@/types/routeTabs'

function comAba(ativa: boolean) {
  const app = createApp({ render: () => null })
  const hostEl = ref({ id: 'pane' } as unknown as HTMLElement)
  app.provide(W_TAB_HOST_KEY, { hostEl, active: ref(ativa) } as unknown as TabHostContext)
  return { confirmar: app.runWithContext(() => useAppConfirm()), hostEl }
}

describe('useAppConfirm — âncora', () => {
  it('aba visível: pendura no painel da aba', () => {
    const { confirmar, hostEl } = comAba(true)
    void confirmar.confirmDiscard()
    expect(require.mock.lastCall?.[0].appendTo).toBe(hostEl.value)
  })

  it('aba oculta: vai para o body, senão ninguém vê', () => {
    const { confirmar } = comAba(false)
    void confirmar.confirmDiscard()
    expect(require.mock.lastCall?.[0].appendTo).toBe('body')
  })

  it('confirmDiscard resolve pela escolha e fechar sem escolher é continuar', async () => {
    const { confirmar } = comAba(true)
    const descartar = confirmar.confirmDiscard()
    require.mock.lastCall?.[0].accept()
    expect(await descartar).toBe(true)
    const continuar = confirmar.confirmDiscard()
    require.mock.lastCall?.[0].onHide()
    expect(await continuar).toBe(false)
  })
})
