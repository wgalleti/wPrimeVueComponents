// @vitest-environment jsdom
import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { defineComponent, h, nextTick, ref } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import Dialog from 'primevue/dialog'
import ConfirmDialog from 'primevue/confirmdialog'
import { patchDialogEscapeStack, isTopOverlay, visibleOverlays } from './dialogEscapeStack'

beforeAll(() => {
  // O patch precisa preceder a criação das instâncias — como no install() do plugin.
  patchDialogEscapeStack()
  patchDialogEscapeStack() // idempotente
})

const montados: VueWrapper[] = []
afterEach(() => {
  montados.splice(0).forEach((w) => w.unmount())
  document.body.innerHTML = ''
})

const semStubDeTransition = { stubs: { transition: false } }

function esc() {
  document.dispatchEvent(new KeyboardEvent('keydown', { code: 'Escape', bubbles: true }))
}

/** Dois Dialogs irmãos, `visible` controlado por refs, teleport real no body. */
function montarPilha(opts: { appendToOculto?: boolean } = {}) {
  const fundo = ref(true)
  const topo = ref(true)
  // Simula o pane de uma aba inativa (v-show): já no DOM, oculto, antes do mount.
  let paneOculto: HTMLElement | null = null
  if (opts.appendToOculto) {
    paneOculto = document.createElement('div')
    paneOculto.style.display = 'none'
    document.body.appendChild(paneOculto)
  }
  const Host = defineComponent({
    setup() {
      return () => [
        h(
          Dialog,
          {
            visible: fundo.value,
            'onUpdate:visible': (v: boolean) => (fundo.value = v),
            header: 'Fundo',
            modal: true,
          },
          () => 'fundo',
        ),
        h(
          Dialog,
          {
            visible: topo.value,
            'onUpdate:visible': (v: boolean) => (topo.value = v),
            header: 'Topo',
            modal: true,
            appendTo: paneOculto ?? 'body',
          },
          () => 'topo',
        ),
      ]
    },
  })
  const w = mount(Host, {
    attachTo: document.body,
    global: { plugins: [PrimeVue], ...semStubDeTransition },
  })
  montados.push(w)
  return { w, fundo, topo }
}

/** O Dialog liga o keydown e o z-index no `onEnter` do Transition — roda no próximo frame. */
async function ticks() {
  await nextTick()
  await new Promise((r) => setTimeout(r, 30))
}

describe('patchDialogEscapeStack', () => {
  it('um dialog só: Esc fecha (comportamento nativo)', async () => {
    const fundo = ref(true)
    const w = mount(
      defineComponent({
        setup: () => () =>
          h(Dialog, {
            visible: fundo.value,
            'onUpdate:visible': (v: boolean) => (fundo.value = v),
            header: 'Só',
          }),
      }),
      { attachTo: document.body, global: { plugins: [PrimeVue], ...semStubDeTransition } },
    )
    montados.push(w)
    await ticks()
    expect(visibleOverlays()).toHaveLength(1)
    esc()
    await ticks()
    expect(fundo.value).toBe(false)
  })

  it('dois dialogs empilhados: Esc fecha só o do topo, o próximo Esc fecha o de baixo', async () => {
    const { fundo, topo } = montarPilha()
    await ticks()
    const abertos = visibleOverlays()
    expect(abertos).toHaveLength(2)
    expect(isTopOverlay(abertos[1])).toBe(true)
    expect(isTopOverlay(abertos[0])).toBe(false)

    esc()
    await ticks()
    expect(topo.value).toBe(false)
    expect(fundo.value).toBe(true)

    // O de cima já saiu do DOM — agora é a vez do de baixo.
    esc()
    await ticks()
    expect(fundo.value).toBe(false)
  })

  it('dialog pendurado num pane oculto (aba inativa) não conta na pilha', async () => {
    const { fundo, topo } = montarPilha({ appendToOculto: true })
    await ticks()
    expect(visibleOverlays()).toHaveLength(1)

    esc()
    await ticks()
    // O visível é o "fundo" — é ele que fecha. O oculto não recebe o Esc como topo.
    expect(fundo.value).toBe(false)
    expect(topo.value).toBe(true)
  })

  it('ConfirmDialog sobre um Dialog: Esc fecha só o confirm', async () => {
    const fundo = ref(true)
    const Host = defineComponent({
      setup: () => () => [
        h(
          Dialog,
          {
            visible: fundo.value,
            'onUpdate:visible': (v: boolean) => (fundo.value = v),
            header: 'Form',
            modal: true,
          },
          () => 'form',
        ),
        h(ConfirmDialog),
      ],
    })
    const w = mount(Host, {
      attachTo: document.body,
      global: { plugins: [PrimeVue, ConfirmationService], ...semStubDeTransition },
    })
    montados.push(w)
    await ticks()
    const confirm = w.vm.$confirm as { require: (o: Record<string, unknown>) => void }
    let ocultou = false
    confirm.require({ message: 'Descartar?', onHide: () => (ocultou = true) })
    await ticks()
    expect(visibleOverlays()).toHaveLength(2)

    esc()
    await ticks()
    expect(ocultou).toBe(true)
    expect(fundo.value).toBe(true)
    await ticks()
    expect(visibleOverlays()).toHaveLength(1)

    esc()
    await ticks()
    expect(fundo.value).toBe(false)
  })
})
