// @vitest-environment jsdom
import { describe, it, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import WCrudFormDialog from './WCrudFormDialog.vue'
import type { FieldDef } from '@/types/field'

const campos: FieldDef[] = [
  { field: 'nome', label: 'Nome', type: 'text', required: true },
  { field: 'valor', label: 'Valor', type: 'number' },
]

beforeAll(() => {
  if (!window.matchMedia) {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  }
})

function montar(slots: Record<string, string> = {}, props: Record<string, unknown> = {}) {
  return mount(WCrudFormDialog, {
    attachTo: document.body,
    props: {
      visible: true,
      title: 'Lançar',
      fields: campos,
      formData: { nome: '', valor: null },
      isEditing: false,
      saving: false,
      ...props,
    },
    slots,
    global: { plugins: [PrimeVue], stubs: { teleport: true } },
  })
}

describe('WCrudFormDialog — slot aside', () => {
  async function formDe(w: ReturnType<typeof montar>) {
    await w.vm.$nextTick()
    await w.vm.$nextTick()
    const form = document.body.querySelector('form.w-crud-form') as HTMLFormElement | null
    expect(form).not.toBeNull()
    return form as HTMLFormElement
  }

  it('sem #aside o form fica em uma coluna, sem painel', async () => {
    const w = montar()
    const form = await formDe(w)
    expect(form.classList.contains('w-crud-form--with-aside')).toBe(false)
    expect(form.querySelector('.w-crud-form-aside')).toBeNull()
    w.unmount()
  })

  it('com #aside o form vira duas colunas e o painel entra antes do rodapé', async () => {
    const w = montar({ aside: '<p class="painel">prévia</p>' }, { asideWidth: '24rem' })
    const form = await formDe(w)
    expect(form.classList.contains('w-crud-form--with-aside')).toBe(true)
    expect(form.style.getPropertyValue('--w-form-aside')).toBe('24rem')

    const filhos = Array.from(form.children).map((el) => el.className)
    expect(filhos).toEqual(['w-crud-form-main', 'w-crud-form-aside', 'w-crud-form-footer'])
    expect(form.querySelector('.w-crud-form-aside .painel')?.textContent).toBe('prévia')
    w.unmount()
  })

  it('#after-fields continua dentro da coluna dos campos', async () => {
    const w = montar({ 'after-fields': '<p class="resumo">resumo</p>', aside: '<p>x</p>' })
    const form = await formDe(w)
    expect(form.querySelector('.w-crud-form-main .resumo')).not.toBeNull()
    w.unmount()
  })
})

describe('WCrudFormDialog — required e slot field-*', () => {
  async function pronto(w: ReturnType<typeof montar>) {
    await w.vm.$nextTick()
    await w.vm.$nextTick()
    return document.body.querySelector('form.w-crud-form') as HTMLFormElement
  }

  it('required vazio barra o save e mostra o erro no campo', async () => {
    const w = montar()
    const form = await pronto(w)
    form.dispatchEvent(new Event('submit', { cancelable: true }))
    await w.vm.$nextTick()
    expect(w.emitted('save')).toBeUndefined()
    expect(form.querySelector('.w-crud-form-error')?.textContent).toContain('Nome é obrigatório')
    w.unmount()
  })

  it('campo montado por slot mostra o erro atravessando o diálogo', async () => {
    const w = montar({ 'field-nome': '<input class="meu" />' })
    const form = await pronto(w)
    form.dispatchEvent(new Event('submit', { cancelable: true }))
    await w.vm.$nextTick()
    expect(w.emitted('save')).toBeUndefined()
    expect(form.querySelectorAll('.w-crud-form-error--slot').length).toBe(1)
    w.unmount()
  })

  it('sem slot fornecido o conteúdo padrão continua e o erro não duplica', async () => {
    const w = montar()
    const form = await pronto(w)
    expect(form.querySelector('input')).not.toBeNull()
    form.dispatchEvent(new Event('submit', { cancelable: true }))
    await w.vm.$nextTick()
    expect(form.querySelectorAll('.w-crud-form-error').length).toBe(1)
    expect(form.querySelector('.w-crud-form-error--slot')).toBeNull()
    w.unmount()
  })
})
