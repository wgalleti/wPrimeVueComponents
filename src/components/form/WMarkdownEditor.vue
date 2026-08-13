<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import WMarkdownView from '../ui/WMarkdownView.vue'

/**
 * Editor de markdown com toolbar mínima e preview (reutiliza o WMarkdownView).
 * A área de edição é um `<textarea>` monospace nativo — Tab mantém o
 * comportamento de foco padrão (a11y). As ações da toolbar inserem a sintaxe
 * na posição do cursor/seleção.
 */
const props = withDefaults(
  defineProps<{
    /** Markdown cru (v-model). */
    modelValue: string
    disabled?: boolean
    placeholder?: string
    /** Altura mínima da área de edição/preview. */
    minHeight?: string
    /**
     * Altura máxima da área de edição/preview. Com valor, o editor vira moldura
     * fixa e cada painel rola por dentro — as ações do formulário seguem
     * visíveis por mais longo que fique o documento.
     */
    maxHeight?: string
    /** 'tab' alterna escrever/visualizar; 'split' mostra lado a lado. */
    previewMode?: 'tab' | 'split'
  }>(),
  {
    disabled: false,
    minHeight: '320px',
    maxHeight: 'none',
    previewMode: 'tab',
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const previewing = ref(false)

const isSplit = computed(() => props.previewMode === 'split')
const showTextarea = computed(() => isSplit.value || !previewing.value)
const showPreview = computed(() => isSplit.value || previewing.value)

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value)
}

/** Aplica `next` e restaura foco + seleção no textarea. */
function apply(next: string, selectionStart: number, selectionEnd: number) {
  emit('update:modelValue', next)
  nextTick(() => {
    const el = textareaRef.value
    if (!el) return
    el.focus()
    el.setSelectionRange(selectionStart, selectionEnd)
  })
}

/** Envolve a seleção com `before`/`after` (ex.: negrito = **seleção**). */
function surround(before: string, after = before, placeholder = 'texto') {
  const el = textareaRef.value
  if (!el || props.disabled) return
  const value = props.modelValue ?? ''
  const start = el.selectionStart
  const end = el.selectionEnd
  const selected = value.slice(start, end) || placeholder
  const next = value.slice(0, start) + before + selected + after + value.slice(end)
  apply(next, start + before.length, start + before.length + selected.length)
}

/** Prefixa cada linha da seleção (heading, listas). */
function prefixLines(prefix: string | ((index: number) => string)) {
  const el = textareaRef.value
  if (!el || props.disabled) return
  const value = props.modelValue ?? ''
  const start = el.selectionStart
  const end = el.selectionEnd
  const lineStart = value.lastIndexOf('\n', start - 1) + 1
  const lineEndRaw = value.indexOf('\n', end)
  const lineEnd = lineEndRaw === -1 ? value.length : lineEndRaw
  const block = value.slice(lineStart, lineEnd)
  const prefixed = block
    .split('\n')
    .map((line, i) => (typeof prefix === 'function' ? prefix(i) : prefix) + line)
    .join('\n')
  const next = value.slice(0, lineStart) + prefixed + value.slice(lineEnd)
  apply(next, lineStart, lineStart + prefixed.length)
}

function actionBold() {
  surround('**')
}

function actionItalic() {
  surround('*')
}

function actionHeading() {
  prefixLines('## ')
}

function actionList() {
  prefixLines('- ')
}

function actionTaskList() {
  prefixLines('- [ ] ')
}

function actionLink() {
  const el = textareaRef.value
  if (!el || props.disabled) return
  const value = props.modelValue ?? ''
  const start = el.selectionStart
  const end = el.selectionEnd
  const selected = value.slice(start, end) || 'texto'
  const next = `${value.slice(0, start)}[${selected}](url)${value.slice(end)}`
  // Deixa "url" selecionado, pronto para colar o endereço.
  const urlStart = start + selected.length + 3
  apply(next, urlStart, urlStart + 3)
}

function actionCode() {
  const el = textareaRef.value
  if (!el || props.disabled) return
  const selected = (props.modelValue ?? '').slice(el.selectionStart, el.selectionEnd)
  if (selected.includes('\n')) surround('```\n', '\n```', 'código')
  else surround('`', '`', 'código')
}

/**
 * Insere um bloco em linha própria. No modelo, `$` marca o trecho que fica
 * selecionado depois (ou onde entra o texto que já estava selecionado).
 */
function inserirBloco(modelo: string, exemplo: string) {
  const el = textareaRef.value
  if (!el || props.disabled) return
  const value = props.modelValue ?? ''
  const start = el.selectionStart
  const end = el.selectionEnd
  const alvo = value.slice(start, end) || exemplo
  const corpo = modelo.replace('$', alvo)
  const antes = value.slice(0, start)
  // Bloco precisa de linha em branco antes para o markdown reconhecer.
  const respiro = !antes || antes.endsWith('\n\n') ? '' : antes.endsWith('\n') ? '\n' : '\n\n'
  const next = `${antes}${respiro}${corpo}\n${value.slice(end)}`
  const posicao = antes.length + respiro.length + corpo.indexOf(alvo)
  apply(next, posicao, posicao + alvo.length)
}

function actionAlert() {
  inserirBloco('> [!DICA]\n> $', 'Escreva aqui a sugestão')
}

function actionSteps() {
  inserirBloco('::: passos\n1. $\n2. Próximo passo\n:::', 'Primeiro passo')
}

function actionTable() {
  inserirBloco('| Coluna | Coluna |\n| --- | --- |\n| $ | valor |', 'valor')
}

function actionHighlight() {
  surround('==', '==', 'destaque')
}

function togglePreview() {
  previewing.value = !previewing.value
}

const ajudaAberta = ref(false)

/** Cola rápida do vocabulário — o autor não precisa decorar a sintaxe. */
const ajuda: { sintaxe: string; efeito: string }[] = [
  { sintaxe: '## Título', efeito: 'Seção (entra no índice lateral)' },
  { sintaxe: '> [!DICA] Título', efeito: 'Destaque: dica, nota, importante, atenção, cuidado' },
  { sintaxe: '::: passos … :::', efeito: 'Procedimento numerado' },
  { sintaxe: '::: cards … :::', efeito: 'Lista em cartões' },
  { sintaxe: '::: aba Título', efeito: 'Conteúdo em abas (blocos seguidos)' },
  { sintaxe: '::: detalhes Título', efeito: 'Bloco que abre e fecha' },
  { sintaxe: '==destaque==', efeito: 'Texto marcado' },
  { sintaxe: '- [ ] tarefa', efeito: 'Checklist' },
  { sintaxe: '```python title="arquivo.py"', efeito: 'Código com realce e cópia' },
  { sintaxe: '```mermaid', efeito: 'Diagrama de fluxo' },
]

interface ToolDef {
  /** Ícone PrimeIcons OU glyph textual (PrimeIcons não tem bold/itálico). */
  icon?: string
  glyph?: string
  label: string
  run: () => void
}

const tools: ToolDef[] = [
  { glyph: 'B', label: 'Negrito', run: actionBold },
  { glyph: 'I', label: 'Itálico', run: actionItalic },
  { icon: 'pi pi-hashtag', label: 'Título (H2)', run: actionHeading },
  { icon: 'pi pi-list', label: 'Lista', run: actionList },
  { icon: 'pi pi-check-square', label: 'Lista de tarefas', run: actionTaskList },
  { icon: 'pi pi-link', label: 'Link', run: actionLink },
  { icon: 'pi pi-code', label: 'Código', run: actionCode },
  { icon: 'pi pi-info-circle', label: 'Destaque', run: actionAlert },
  { icon: 'pi pi-sort-numeric-down', label: 'Passos', run: actionSteps },
  { icon: 'pi pi-table', label: 'Tabela', run: actionTable },
  { icon: 'pi pi-pencil', label: 'Marcar texto', run: actionHighlight },
]
</script>

<template>
  <div class="w-markdown-editor" :class="{ 'w-markdown-editor--split': isSplit }">
    <div class="w-markdown-editor__toolbar" role="toolbar" aria-label="Formatação markdown">
      <button
        v-for="tool in tools"
        :key="tool.label"
        type="button"
        class="w-markdown-editor__tool"
        :aria-label="tool.label"
        :title="tool.label"
        :disabled="disabled || (!isSplit && previewing)"
        @click="tool.run()"
      >
        <i v-if="tool.icon" :class="tool.icon" aria-hidden="true" />
        <span
          v-else
          class="w-markdown-editor__glyph"
          :class="{
            'w-markdown-editor__glyph--bold': tool.glyph === 'B',
            'w-markdown-editor__glyph--italic': tool.glyph === 'I',
          }"
          aria-hidden="true"
        >
          {{ tool.glyph }}
        </span>
      </button>

      <button
        type="button"
        class="w-markdown-editor__tool w-markdown-editor__tool--ajuda"
        :class="{ 'w-markdown-editor__tool--active': ajudaAberta }"
        aria-label="Sintaxe disponível"
        title="Sintaxe disponível"
        :aria-pressed="ajudaAberta"
        @click="ajudaAberta = !ajudaAberta"
      >
        <i class="pi pi-question-circle" aria-hidden="true" />
      </button>

      <button
        v-if="!isSplit"
        type="button"
        class="w-markdown-editor__tool w-markdown-editor__tool--preview"
        :class="{ 'w-markdown-editor__tool--active': previewing }"
        aria-label="Visualizar"
        title="Visualizar"
        :aria-pressed="previewing"
        @click="togglePreview"
      >
        <i :class="previewing ? 'pi pi-pencil' : 'pi pi-eye'" aria-hidden="true" />
      </button>
    </div>

    <dl v-if="ajudaAberta" class="w-markdown-editor__ajuda">
      <template v-for="linha in ajuda" :key="linha.sintaxe">
        <dt>{{ linha.sintaxe }}</dt>
        <dd>{{ linha.efeito }}</dd>
      </template>
    </dl>

    <div class="w-markdown-editor__body" :style="{ minHeight, maxHeight }">
      <textarea
        v-if="showTextarea"
        ref="textareaRef"
        class="w-markdown-editor__textarea"
        :value="modelValue"
        :disabled="disabled"
        :placeholder="placeholder"
        spellcheck="false"
        @input="onInput"
      />
      <WMarkdownView
        v-if="showPreview"
        class="w-markdown-editor__preview"
        :source="modelValue"
        empty-text="Nada para visualizar"
      />
    </div>
  </div>
</template>
