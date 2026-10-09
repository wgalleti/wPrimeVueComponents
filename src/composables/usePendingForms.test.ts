import { describe, it, expect, beforeEach } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import {
  __resetPendingForms,
  listPendingForms,
  setPendingForm,
  usePendingForm,
} from './usePendingForms'

describe('usePendingForms', () => {
  beforeEach(() => __resetPendingForms())

  it('marca e desmarca fora de componente', () => {
    setPendingForm('pedido', true)
    expect(listPendingForms()).toEqual(['pedido'])
    setPendingForm('pedido', false)
    expect(listPendingForms()).toEqual([])
  })

  it('segue o valor sujo e sai do registro quando o escopo morre', async () => {
    const sujo = ref(false)
    const escopo = effectScope()
    escopo.run(() => usePendingForm(sujo, 'aluno'))
    expect(listPendingForms()).toEqual([])

    sujo.value = true
    await nextTick()
    expect(listPendingForms()).toEqual(['aluno'])

    escopo.stop()
    expect(listPendingForms()).toEqual([])
  })
})
