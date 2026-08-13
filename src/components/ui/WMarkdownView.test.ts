// @vitest-environment jsdom
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import WMarkdownView from './WMarkdownView.vue'

function montar(source: string, props: Record<string, unknown> = {}) {
  return mount(WMarkdownView, { props: { source, ...props } })
}

describe('WMarkdownView — render', () => {
  it('renderiza markdown básico (heading, negrito, lista)', () => {
    const w = montar('## Título\n\nTexto **forte**.\n\n- item 1\n- item 2')
    expect(w.find('h2').text()).toBe('Título')
    expect(w.find('strong').text()).toBe('forte')
    expect(w.findAll('li')).toHaveLength(2)
  })

  it('renderiza tabelas', () => {
    const w = montar('| A | B |\n| --- | --- |\n| 1 | 2 |')
    expect(w.find('table').exists()).toBe(true)
    expect(w.findAll('th')).toHaveLength(2)
    expect(w.find('td').text()).toBe('1')
  })

  it('linkifica URLs soltas', () => {
    const w = montar('Veja https://example.com/plano')
    expect(w.find('a').attributes('href')).toBe('https://example.com/plano')
  })

  it('task list vira checkbox desabilitado (readonly)', () => {
    const w = montar('- [ ] pendente\n- [x] feita')
    const checks = w.findAll('input[type="checkbox"]')
    expect(checks).toHaveLength(2)
    expect(checks[0].attributes('disabled')).toBeDefined()
    expect(checks[0].element as HTMLInputElement).toHaveProperty('checked', false)
    expect((checks[1].element as HTMLInputElement).checked).toBe(true)
    expect(w.text()).toContain('pendente')
    expect(w.text()).not.toContain('[ ]')
  })
})

describe('WMarkdownView — vocabulário de documentação', () => {
  it('`> [!DICA]` vira alerta com título padrão e o marcador some do texto', () => {
    const w = montar('> [!DICA]\n> Use a unidade antes da safra.')
    const alerta = w.find('.md-alert')
    expect(alerta.exists()).toBe(true)
    expect(alerta.classes()).toContain('md-alert--dica')
    expect(alerta.find('.md-alert__head').text()).toBe('Dica')
    expect(alerta.text()).toContain('Use a unidade antes da safra.')
    expect(w.text()).not.toContain('[!DICA]')
    expect(w.find('blockquote').exists()).toBe(false)
  })

  it('alerta aceita título próprio, acento e apelido em inglês', () => {
    expect(montar('> [!ATENÇÃO] Só o criador edita\n> texto').find('.md-alert__head').text()).toBe(
      'Só o criador edita',
    )
    expect(montar('> [!warning]\n> texto').find('.md-alert').classes()).toContain(
      'md-alert--atencao',
    )
  })

  it('marcador desconhecido continua sendo citação normal', () => {
    const w = montar('> [!QUALQUER]\n> texto')
    expect(w.find('.md-alert').exists()).toBe(false)
    expect(w.find('blockquote').exists()).toBe(true)
  })

  it('`::: dica` produz o mesmo alerta que `> [!DICA]`', () => {
    const w = montar('::: dica Sugestão\nConteúdo do bloco.\n:::')
    expect(w.find('.md-alert--dica').exists()).toBe(true)
    expect(w.find('.md-alert__head').text()).toBe('Sugestão')
    expect(w.find('.md-alert__body').text()).toContain('Conteúdo do bloco.')
  })

  it('`::: tip` e `::: warning` (VitePress) seguem funcionando', () => {
    expect(montar('::: tip\nok\n:::').find('.md-alert--dica').exists()).toBe(true)
    expect(montar('::: warning\nok\n:::').find('.md-alert--atencao').exists()).toBe(true)
  })

  it('passos, cards, detalhes e abas geram a estrutura esperada', () => {
    const passos = montar('::: passos\n1. Primeiro\n2. Segundo\n:::')
    expect(passos.findAll('.md-steps ol > li')).toHaveLength(2)

    const cards = montar('::: cards\n- **A** — um\n- **B** — dois\n:::')
    expect(cards.findAll('.md-cards li')).toHaveLength(2)

    const detalhes = montar('::: detalhes Como calcular\nconteúdo\n:::')
    expect(detalhes.find('details.md-details summary').text()).toBe('Como calcular')

    const abas = montar('::: abas\n::: aba API\nback\n:::\n::: aba Portal\nfront\n:::\n:::')
    const paineis = abas.findAll('.md-tabs__panel')
    expect(paineis).toHaveLength(2)
    expect(paineis[0].attributes('data-md-tab')).toBe('API')
  })

  it('código ganha barra com linguagem/título e o gancho de cópia', () => {
    const w = montar('```python title="services/projeto.py"\nx = 1\n```')
    expect(w.find('[data-md-code]').exists()).toBe(true)
    expect(w.find('.md-code__title').text()).toBe('services/projeto.py')
    expect(w.find('.md-code__lang').text()).toBe('python')
    expect(w.find('code').classes()).toContain('language-python')
  })

  it('bloco mermaid vira figura de diagrama, preservando a fonte', () => {
    const w = montar('```mermaid\ngraph TD; A-->B;\n```')
    expect(w.find('[data-md-mermaid]').exists()).toBe(true)
    expect(w.find('.md-mermaid__fonte').text()).toContain('A-->B')
  })

  it('destaque, tabela rolável e link externo', () => {
    expect(montar('texto ==marcado==').find('mark').text()).toBe('marcado')
    expect(montar('| A |\n| --- |\n| 1 |').find('.md-table table').exists()).toBe(true)
    const externo = montar('[fora](https://example.com)').find('a')
    expect(externo.attributes('target')).toBe('_blank')
    expect(externo.attributes('rel')).toContain('noopener')
  })

  it('títulos ganham id e são emitidos para o índice', () => {
    const w = montar('## Não conformidade\n\ntexto\n\n### Detalhe\n\ntexto')
    expect(w.find('h2').attributes('id')).toBe('nao-conformidade')
    const emitido = w.emitted('headings')?.at(-1)?.[0] as { id: string; level: number }[]
    expect(emitido).toEqual([
      { id: 'nao-conformidade', text: 'Não conformidade', level: 2 },
      { id: 'detalhe', text: 'Detalhe', level: 3 },
    ])
  })
})

describe('WMarkdownView — sanitização', () => {
  it('<script> nunca vira elemento', () => {
    const w = montar('antes\n\n<script>alert(1)</script>\n\ndepois')
    expect(w.element.querySelector('script')).toBeNull()
    expect(w.html()).not.toContain('<script')
  })

  it('event handlers inline não passam', () => {
    const w = montar('<img src=x onerror=alert(1)>')
    expect(w.element.querySelector('[onerror]')).toBeNull()
  })

  it('links javascript: são bloqueados', () => {
    const w = montar('[clique](javascript:alert(1))')
    const a = w.element.querySelector('a')
    expect(a?.getAttribute('href') ?? '').not.toContain('javascript:')
  })
})

describe('WMarkdownView — vazio', () => {
  it('source vazio mostra o emptyText default', () => {
    const w = montar('')
    expect(w.find('.w-markdown-view--empty').text()).toBe('Sem conteúdo')
  })

  it('source só com espaços conta como vazio, com emptyText custom', () => {
    const w = montar('   \n  ', { emptyText: 'Nada aqui' })
    expect(w.find('.w-markdown-view--empty').text()).toBe('Nada aqui')
  })
})
