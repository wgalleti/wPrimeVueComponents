// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WMarkdownEditor from './WMarkdownEditor.vue'

function montar(modelValue = '', props: Record<string, unknown> = {}) {
  return mount(WMarkdownEditor, { props: { modelValue, ...props } })
}

function selecionar(w: ReturnType<typeof montar>, start: number, end: number) {
  const el = w.find('textarea').element as HTMLTextAreaElement
  el.selectionStart = start
  el.selectionEnd = end
}

function ultimoEmit(w: ReturnType<typeof montar>): string {
  const emitted = w.emitted('update:modelValue')
  expect(emitted).toBeTruthy()
  return emitted![emitted!.length - 1][0] as string
}

describe('WMarkdownEditor — edição', () => {
  it('digitar no textarea emite update:modelValue', async () => {
    const w = montar()
    await w.find('textarea').setValue('# oi')
    expect(ultimoEmit(w)).toBe('# oi')
  })

  it('negrito envolve a seleção com **', async () => {
    const w = montar('hello world')
    selecionar(w, 0, 5)
    await w.find('button[aria-label="Negrito"]').trigger('click')
    expect(ultimoEmit(w)).toBe('**hello** world')
  })

  it('itálico envolve a seleção com *', async () => {
    const w = montar('hello world')
    selecionar(w, 6, 11)
    await w.find('button[aria-label="Itálico"]').trigger('click')
    expect(ultimoEmit(w)).toBe('hello *world*')
  })

  it('negrito sem seleção insere placeholder', async () => {
    const w = montar('')
    selecionar(w, 0, 0)
    await w.find('button[aria-label="Negrito"]').trigger('click')
    expect(ultimoEmit(w)).toBe('**texto**')
  })

  it('heading prefixa a linha com ##', async () => {
    const w = montar('primeira\nsegunda')
    selecionar(w, 10, 10)
    await w.find('button[aria-label="Título (H2)"]').trigger('click')
    expect(ultimoEmit(w)).toBe('primeira\n## segunda')
  })

  it('lista prefixa cada linha da seleção', async () => {
    const w = montar('um\ndois')
    selecionar(w, 0, 7)
    await w.find('button[aria-label="Lista"]').trigger('click')
    expect(ultimoEmit(w)).toBe('- um\n- dois')
  })

  it('lista de tarefas prefixa com - [ ]', async () => {
    const w = montar('tarefa')
    selecionar(w, 0, 6)
    await w.find('button[aria-label="Lista de tarefas"]').trigger('click')
    expect(ultimoEmit(w)).toBe('- [ ] tarefa')
  })

  it('link envolve a seleção como [texto](url)', async () => {
    const w = montar('portal')
    selecionar(w, 0, 6)
    await w.find('button[aria-label="Link"]').trigger('click')
    expect(ultimoEmit(w)).toBe('[portal](url)')
  })

  it('código inline para seleção de uma linha, fence para multilinha', async () => {
    const w = montar('const a = 1')
    selecionar(w, 0, 11)
    await w.find('button[aria-label="Código"]').trigger('click')
    expect(ultimoEmit(w)).toBe('`const a = 1`')

    const w2 = montar('linha 1\nlinha 2')
    selecionar(w2, 0, 15)
    await w2.find('button[aria-label="Código"]').trigger('click')
    expect(ultimoEmit(w2)).toBe('```\nlinha 1\nlinha 2\n```')
  })

  it('disabled não formata nem emite', async () => {
    const w = montar('hello', { disabled: true })
    await w.find('button[aria-label="Negrito"]').trigger('click')
    expect(w.emitted('update:modelValue')).toBeFalsy()
  })
})

describe('WMarkdownEditor — preview', () => {
  it('modo tab alterna escrever/visualizar com aria-pressed', async () => {
    const w = montar('## Olá')
    const toggle = w.find('button[aria-label="Visualizar"]')
    expect(toggle.attributes('aria-pressed')).toBe('false')
    expect(w.find('textarea').exists()).toBe(true)
    expect(w.find('.w-markdown-view').exists()).toBe(false)

    await toggle.trigger('click')
    expect(toggle.attributes('aria-pressed')).toBe('true')
    expect(w.find('textarea').exists()).toBe(false)
    expect(w.find('.w-markdown-view h2').text()).toBe('Olá')
  })

  it('modo split mostra editor e preview lado a lado, sem toggle', () => {
    const w = montar('## Olá', { previewMode: 'split' })
    expect(w.find('textarea').exists()).toBe(true)
    expect(w.find('.w-markdown-view h2').text()).toBe('Olá')
    expect(w.find('button[aria-label="Visualizar"]').exists()).toBe(false)
  })
})
