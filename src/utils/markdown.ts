/**
 * Renderer de markdown do design system — leitura em primeiro lugar.
 *
 * A referência é o Material for MkDocs: o texto puro continua legível, mas o
 * autor tem um vocabulário curto para DESTACAR (alertas), ORGANIZAR (passos,
 * cards, abas, detalhes) e ILUSTRAR (código com realce, diagramas mermaid).
 *
 * Duas sintaxes produzem o MESMO alerta, de propósito:
 *   `> [!DICA]` — estilo GitHub, sobrevive em qualquer visualizador de markdown
 *   `::: dica`  — estilo VitePress/MkDocs, aceita título próprio e conteúdo longo
 *
 * Segurança: `html: false` (markdown cru nunca injeta HTML) e todo o output
 * passa pelo DOMPurify antes do `v-html` — defesa em profundidade, porque o
 * conteúdo é escrito por usuários.
 */
import MdIt from 'markdown-it'
import type { MarkdownIt, StateCore, Token } from 'markdown-it'
import DOMPurify from 'dompurify'
import anchor from 'markdown-it-anchor'
import container from 'markdown-it-container'
import abbr from 'markdown-it-abbr'
import deflist from 'markdown-it-deflist'
import footnote from 'markdown-it-footnote'
import ins from 'markdown-it-ins'
import mark from 'markdown-it-mark'
import sub from 'markdown-it-sub'
import sup from 'markdown-it-sup'
import type { MarkdownHeading, MarkdownRenderResult } from '@/types/markdown'

/* ==========================================================
   Alertas — o vocabulário de destaque
   ========================================================== */

interface AlertSpec {
  /** Sufixo da classe CSS e do tom (`md-alert--dica`). */
  tone: string
  /** Título padrão, usado quando o autor não escreve um. */
  label: string
  icon: string
}

const ALERTS: Record<string, AlertSpec> = {
  nota: { tone: 'nota', label: 'Nota', icon: 'pi pi-info-circle' },
  dica: { tone: 'dica', label: 'Dica', icon: 'pi pi-lightbulb' },
  importante: { tone: 'importante', label: 'Importante', icon: 'pi pi-bookmark-fill' },
  atencao: { tone: 'atencao', label: 'Atenção', icon: 'pi pi-exclamation-triangle' },
  cuidado: { tone: 'cuidado', label: 'Cuidado', icon: 'pi pi-times-circle' },
  sucesso: { tone: 'sucesso', label: 'Feito', icon: 'pi pi-check-circle' },
  exemplo: { tone: 'exemplo', label: 'Exemplo', icon: 'pi pi-code' },
  resumo: { tone: 'resumo', label: 'Resumo', icon: 'pi pi-align-left' },
  pergunta: { tone: 'pergunta', label: 'Em aberto', icon: 'pi pi-question-circle' },
}

/** Apelidos aceitos (GitHub, VitePress e MkDocs) → chave canônica. */
const ALERT_ALIASES: Record<string, string> = {
  note: 'nota',
  info: 'nota',
  observacao: 'nota',
  tip: 'dica',
  hint: 'dica',
  sugestao: 'dica',
  important: 'importante',
  warning: 'atencao',
  warn: 'atencao',
  attention: 'atencao',
  aviso: 'atencao',
  caution: 'cuidado',
  danger: 'cuidado',
  error: 'cuidado',
  perigo: 'cuidado',
  success: 'sucesso',
  done: 'sucesso',
  feito: 'sucesso',
  example: 'exemplo',
  summary: 'resumo',
  abstract: 'resumo',
  tldr: 'resumo',
  question: 'pergunta',
  help: 'pergunta',
  duvida: 'pergunta',
}

/** minúsculas + sem acento — `ATENÇÃO`, `Atencao` e `atenção` são o mesmo. */
function normalizar(nome: string): string {
  return nome
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function resolverAlerta(nome: string): AlertSpec | null {
  const chave = normalizar(nome)
  return ALERTS[chave] ?? ALERTS[ALERT_ALIASES[chave]] ?? null
}

const escapar = new MdIt().utils.escapeHtml

function abrirAlerta(spec: AlertSpec, titulo?: string): string {
  const texto = titulo?.trim() || spec.label
  return (
    `<div class="md-alert md-alert--${spec.tone}">` +
    `<p class="md-alert__head"><i class="${spec.icon}" aria-hidden="true"></i>${escapar(texto)}</p>` +
    `<div class="md-alert__body">`
  )
}

const FECHAR_ALERTA = '</div></div>'

/* ==========================================================
   Realce de sintaxe — highlight.js carregado sob demanda
   ========================================================== */

type FuncaoRealce = (codigo: string, linguagem: string) => string

/** Só os idiomas que aparecem na documentação deste produto. */
const CARREGADORES: Record<string, () => Promise<{ default: unknown }>> = {
  bash: () => import('highlight.js/lib/languages/bash'),
  python: () => import('highlight.js/lib/languages/python'),
  javascript: () => import('highlight.js/lib/languages/javascript'),
  typescript: () => import('highlight.js/lib/languages/typescript'),
  json: () => import('highlight.js/lib/languages/json'),
  yaml: () => import('highlight.js/lib/languages/yaml'),
  sql: () => import('highlight.js/lib/languages/sql'),
  xml: () => import('highlight.js/lib/languages/xml'),
  css: () => import('highlight.js/lib/languages/css'),
  diff: () => import('highlight.js/lib/languages/diff'),
  ini: () => import('highlight.js/lib/languages/ini'),
  markdown: () => import('highlight.js/lib/languages/markdown'),
  dockerfile: () => import('highlight.js/lib/languages/dockerfile'),
}

const APELIDOS_LINGUAGEM: Record<string, string> = {
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  console: 'bash',
  terminal: 'bash',
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  py: 'python',
  jsonc: 'json',
  json5: 'json',
  dotenv: 'ini',
  env: 'ini',
  toml: 'ini',
  cfg: 'ini',
  yml: 'yaml',
  html: 'xml',
  htm: 'xml',
  vue: 'xml',
  svg: 'xml',
  md: 'markdown',
  psql: 'sql',
  postgres: 'sql',
  postgresql: 'sql',
  docker: 'dockerfile',
}

let realce: FuncaoRealce | null = null
let carregando: Promise<void> | null = null

/** Já dá para realçar? (evita re-render inútil quando o pacote já veio) */
export function realceDisponivel(): boolean {
  return realce !== null
}

/**
 * Carrega o highlight.js e os idiomas — sob demanda, uma única vez.
 * Enquanto não chega, o código aparece sem cores (nunca quebrado).
 */
export async function carregarRealce(): Promise<void> {
  if (realce || carregando) return carregando ?? undefined
  carregando = (async () => {
    const nucleo = (await import('highlight.js/lib/core')).default
    await Promise.all(
      Object.entries(CARREGADORES).map(async ([nome, carregar]) => {
        const modulo = await carregar()
        nucleo.registerLanguage(nome, modulo.default as never)
      }),
    )
    realce = (codigo, linguagem) => nucleo.highlight(codigo, { language: linguagem }).value
  })()
  await carregando
}

function normalizarLinguagem(info: string): string {
  const bruta = normalizar(info)
  return APELIDOS_LINGUAGEM[bruta] ?? bruta
}

/* ==========================================================
   Instância markdown-it
   ========================================================== */

/** Slug estável e sem acento para as âncoras (`## Não conformidade` → `nao-conformidade`). */
function slug(texto: string): string {
  return (
    normalizar(texto)
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-') || 'secao'
  )
}

const NOMES_CONTAINER = new Set([
  'detalhes',
  'details',
  'passos',
  'steps',
  'cards',
  'grade',
  'abas',
  'tabs',
  'aba',
  'tab',
])

const CONTAINER_RE = /^\s*([^\s]+)\s*(.*)$/

function criarRenderer(): MarkdownIt {
  const md = new MdIt({ html: false, linkify: true, typographer: false })

  md.use(abbr).use(deflist).use(footnote).use(ins).use(mark).use(sub).use(sup)

  md.use(anchor, {
    level: [2, 3, 4],
    slugify: slug,
    // Símbolo vazio de propósito: o "#" entra por CSS (`.md-anchor::after`),
    // então copiar o título não traz lixo junto.
    permalink: anchor.permalink.linkInsideHeader({
      symbol: '',
      class: 'md-anchor',
      placement: 'after',
      ariaHidden: true,
    }),
  })

  aplicarAlertas(md)
  aplicarContainers(md)
  aplicarTarefas(md)
  aplicarCodigo(md)
  aplicarTabelas(md)
  aplicarLinks(md)
  aplicarFiguras(md)

  return md
}

/** `> [!DICA] Título` — alerta com a sintaxe do GitHub (sobrevive fora do portal). */
function aplicarAlertas(md: MarkdownIt): void {
  md.core.ruler.after('block', 'lz_alerta', (state: StateCore) => {
    const tokens = state.tokens
    for (let i = 0; i < tokens.length; i += 1) {
      const abre = tokens[i]
      if (abre.type !== 'blockquote_open') continue

      const paragrafo = tokens[i + 1]
      const inline = tokens[i + 2]
      if (paragrafo?.type !== 'paragraph_open' || inline?.type !== 'inline') continue

      const marcador = /^\[!([^\]\n]+)\][ \t]*([^\n]*)\n?/.exec(inline.content)
      if (!marcador) continue

      const spec = resolverAlerta(marcador[1])
      if (!spec) continue

      const fecha = encontrarFechamento(tokens, i)
      if (!fecha) continue

      inline.content = inline.content.slice(marcador[0].length)
      abre.type = 'lz_alerta_open'
      abre.tag = 'div'
      abre.meta = { spec, titulo: marcador[2] }
      fecha.type = 'lz_alerta_close'
      fecha.tag = 'div'

      // `> [!DICA]` sozinho na primeira linha deixa um parágrafo vazio para trás.
      if (!inline.content.trim()) {
        tokens.splice(i + 1, 3)
      }
    }
    return true
  })

  md.renderer.rules.lz_alerta_open = (tokens, idx) => {
    const meta = tokens[idx].meta as { spec: AlertSpec; titulo?: string }
    return abrirAlerta(meta.spec, meta.titulo)
  }
  md.renderer.rules.lz_alerta_close = () => FECHAR_ALERTA
}

/** Fechamento do blockquote aberto em `inicio`, respeitando aninhamento. */
function encontrarFechamento(tokens: Token[], inicio: number): Token | null {
  let profundidade = 0
  for (let i = inicio; i < tokens.length; i += 1) {
    const token = tokens[i]
    if (token.type === 'blockquote_open') profundidade += 1
    else if (token.type === 'blockquote_close') {
      profundidade -= 1
      if (profundidade === 0) return token
    }
  }
  return null
}

/** `::: dica`, `::: passos`, `::: cards`, `::: abas` + `::: aba`, `::: detalhes`. */
function aplicarContainers(md: MarkdownIt): void {
  // A pilha casa o token de fechamento com o de abertura: o render roda em uma
  // passada síncrona, na ordem do documento.
  const pilha: string[] = []

  md.use(container, 'lz', {
    validate: (params: string) => {
      const partes = CONTAINER_RE.exec(params)
      if (!partes) return false
      const chave = normalizar(partes[1])
      return NOMES_CONTAINER.has(chave) || resolverAlerta(chave) !== null
    },
    render: (tokens: Token[], idx: number) => {
      const token = tokens[idx]
      if (token.nesting !== 1) {
        const chave = pilha.pop()
        if (chave === 'detalhes') return '</div></details>\n'
        if (chave === 'aba') return '</section>\n'
        if (chave === 'alerta') return `${FECHAR_ALERTA}\n`
        return '</div>\n'
      }

      const partes = CONTAINER_RE.exec(token.info) ?? ['', '', '']
      const chave = normalizar(partes[1])
      const titulo = partes[2]?.trim()

      if (chave === 'detalhes' || chave === 'details') {
        pilha.push('detalhes')
        return `<details class="md-details"><summary>${escapar(titulo || 'Detalhes')}</summary><div class="md-details__body">`
      }
      if (chave === 'passos' || chave === 'steps') {
        pilha.push('bloco')
        return '<div class="md-steps">'
      }
      if (chave === 'cards' || chave === 'grade') {
        pilha.push('bloco')
        return '<div class="md-cards">'
      }
      if (chave === 'abas' || chave === 'tabs') {
        pilha.push('bloco')
        return '<div class="md-tabs" data-md-tabs>'
      }
      if (chave === 'aba' || chave === 'tab') {
        pilha.push('aba')
        return `<section class="md-tabs__panel" data-md-tab="${escapar(titulo || 'Aba')}">`
      }

      const spec = resolverAlerta(chave)
      if (spec) {
        pilha.push('alerta')
        return abrirAlerta(spec, titulo)
      }

      pilha.push('bloco')
      return '<div>'
    },
  })
}

/** `- [ ]` / `- [x]` viram checkbox desabilitado (leitura; quem marca é a tarefa do projeto). */
function aplicarTarefas(md: MarkdownIt): void {
  md.core.ruler.after('inline', 'lz_tarefas', (state: StateCore) => {
    const tokens = state.tokens
    for (let i = 2; i < tokens.length; i += 1) {
      const inline = tokens[i]
      if (inline.type !== 'inline' || !inline.children?.length) continue
      if (tokens[i - 1].type !== 'paragraph_open' || tokens[i - 2].type !== 'list_item_open')
        continue
      const primeiro = inline.children[0]
      if (primeiro.type !== 'text') continue
      const marcado = /^\[([ xX])\]\s+/.exec(primeiro.content)
      if (!marcado) continue

      primeiro.content = primeiro.content.slice(marcado[0].length)
      const checkbox = new state.Token('html_inline', '', 0)
      checkbox.content = `<input type="checkbox" class="md-task__check" disabled${marcado[1] === ' ' ? '' : ' checked'}> `
      inline.children.unshift(checkbox)
      tokens[i - 2].attrJoin('class', 'md-task')
    }
    return true
  })
}

/** Bloco de código com barra (título + linguagem) e o gancho do botão copiar. */
function aplicarCodigo(md: MarkdownIt): void {
  md.renderer.rules.fence = (tokens, idx) => {
    const token = tokens[idx]
    const info = token.info.trim()
    const primeira = info.split(/\s+/)[0] ?? ''
    const linguagem = normalizarLinguagem(primeira)
    const titulo = /title="([^"]*)"/.exec(info)?.[1]

    if (linguagem === 'mermaid') {
      return (
        `<figure class="md-mermaid" data-md-mermaid>` +
        `<pre class="md-mermaid__fonte">${escapar(token.content)}</pre>` +
        (titulo ? `<figcaption>${escapar(titulo)}</figcaption>` : '') +
        `</figure>\n`
      )
    }

    const realcado =
      realce && CARREGADORES[linguagem] ? realce(token.content, linguagem) : escapar(token.content)

    const barra =
      titulo || primeira
        ? `<div class="md-code__bar">` +
          `<span class="md-code__title">${escapar(titulo ?? '')}</span>` +
          `<span class="md-code__lang">${escapar(primeira)}</span>` +
          `</div>`
        : ''

    return (
      `<div class="md-code" data-md-code>${barra}` +
      `<pre class="md-code__pre"><code class="hljs language-${escapar(linguagem)}">${realcado}</code></pre>` +
      `</div>\n`
    )
  }
}

/** Tabela larga rola sozinha, sem empurrar a página. */
function aplicarTabelas(md: MarkdownIt): void {
  const original = md.renderer.rules.table_open
  md.renderer.rules.table_open = (tokens, idx, options, env, self) =>
    `<div class="md-table">${original ? original(tokens, idx, options, env, self) : self.renderToken(tokens, idx, options)}`
  md.renderer.rules.table_close = (tokens, idx, options, env, self) =>
    `${self.renderToken(tokens, idx, options)}</div>`
}

/** Link externo abre em nova aba e se anuncia como externo. */
function aplicarLinks(md: MarkdownIt): void {
  const original = md.renderer.rules.link_open
  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const href = String(tokens[idx].attrGet('href') ?? '')
    if (/^https?:\/\//i.test(href)) {
      tokens[idx].attrSet('target', '_blank')
      tokens[idx].attrSet('rel', 'noopener noreferrer')
      tokens[idx].attrJoin('class', 'md-link-externo')
    }
    return original
      ? original(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)
  }
}

/** Imagem sozinha no parágrafo vira figura com legenda (o texto alternativo). */
function aplicarFiguras(md: MarkdownIt): void {
  md.core.ruler.after('inline', 'lz_figuras', (state: StateCore) => {
    const tokens = state.tokens
    for (let i = 1; i < tokens.length - 1; i += 1) {
      const inline = tokens[i]
      if (inline.type !== 'inline' || tokens[i - 1].type !== 'paragraph_open') continue
      const filhos = (inline.children ?? []).filter((filho) => filho.type !== 'softbreak')
      if (filhos.length !== 1 || filhos[0].type !== 'image') continue

      tokens[i - 1].tag = 'figure'
      tokens[i - 1].attrJoin('class', 'md-figure')
      tokens[i + 1].tag = 'figure'
      filhos[0].meta = { figura: true }
    }
    return true
  })

  const original = md.renderer.rules.image
  md.renderer.rules.image = (tokens, idx, options, env, self) => {
    const html = original
      ? original(tokens, idx, options, env, self)
      : self.renderToken(tokens, idx, options)
    const meta = tokens[idx].meta as { figura?: boolean } | undefined
    if (!meta?.figura) return html
    const legenda = tokens[idx].content?.trim()
    return legenda ? `${html}<figcaption>${escapar(legenda)}</figcaption>` : html
  }
}

/* ==========================================================
   API pública
   ========================================================== */

let instancia: MarkdownIt | null = null

function obterRenderer(): MarkdownIt {
  if (!instancia) instancia = criarRenderer()
  return instancia
}

/** Texto puro de um heading, para o índice (sem `**`, `` ` `` ou links). */
function textoDoTitulo(inline: Token): string {
  return (inline.children ?? [])
    .filter((filho) => filho.type === 'text' || filho.type === 'code_inline')
    .map((filho) => filho.content)
    .join('')
    .trim()
}

function coletarTitulos(tokens: Token[]): MarkdownHeading[] {
  const titulos: MarkdownHeading[] = []
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i]
    if (token.type !== 'heading_open') continue
    const nivel = Number(token.tag.slice(1))
    if (nivel < 2 || nivel > 3) continue
    const id = String(token.attrGet('id') ?? '')
    const inline = tokens[i + 1]
    if (!id || inline?.type !== 'inline') continue
    titulos.push({ id, text: textoDoTitulo(inline), level: nivel })
  }
  return titulos
}

/** Sanitiza o HTML do markdown (mantém âncoras, notas de rodapé e checkboxes). */
export function sanitizarMarkdown(html: string): string {
  return DOMPurify.sanitize(html, {
    ADD_ATTR: ['target', 'open', 'checked', 'disabled'],
  })
}

/**
 * Renderiza markdown para HTML sanitizado e devolve também o índice de títulos.
 *
 * O realce de sintaxe só aparece depois de `carregarRealce()` — chame antes (ou
 * re-renderize depois) para colorir o código.
 */
export function renderMarkdown(source: string): MarkdownRenderResult {
  const md = obterRenderer()
  const env: Record<string, unknown> = {}
  const tokens = md.parse(source ?? '', env)
  return {
    html: sanitizarMarkdown(md.renderer.render(tokens, md.options, env)),
    headings: coletarTitulos(tokens),
  }
}
