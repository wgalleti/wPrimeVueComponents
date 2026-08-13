<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { carregarRealce, realceDisponivel, renderMarkdown } from '@/utils/markdown'
import { enhanceMarkdown, renderizarDiagramas } from '@/utils/markdownEnhance'
import type { MarkdownHeading } from '@/types/markdown'

/**
 * Leitor de markdown rico — a tela de leitura do design system.
 *
 * Além do markdown padrão (títulos, listas, tabelas, citações), entende o
 * vocabulário de documentação do produto: alertas (`> [!DICA]` ou `::: dica`),
 * passos, cards, abas, blocos colapsáveis, notas de rodapé, código com realce e
 * botão de copiar, e diagramas ```mermaid.
 *
 * Sempre sanitizado (DOMPurify) antes do `v-html` — o conteúdo vem de usuários.
 */
const props = withDefaults(
  defineProps<{
    /** Markdown cru a renderizar. */
    source: string
    /** Mensagem exibida quando `source` está vazio. */
    emptyText?: string
  }>(),
  {
    emptyText: 'Sem conteúdo',
  },
)

const emit = defineEmits<{
  /** Títulos (`##`/`###`) do documento — alimenta um índice lateral. */
  headings: [MarkdownHeading[]]
}>()

const raiz = ref<HTMLElement | null>(null)
/** Vira `true` quando o highlight.js termina de carregar — dispara o re-render. */
const realcePronto = ref(realceDisponivel())

const resultado = computed(() => {
  // Dependência proposital: o realce chega depois e o HTML precisa ser refeito.
  void realcePronto.value
  return renderMarkdown(props.source ?? '')
})

const html = computed(() => resultado.value.html)
const isEmpty = computed(() => !props.source || !props.source.trim())

watch(resultado, (valor) => emit('headings', valor.headings), { immediate: true })
watch(html, () => void nextTick(() => enhanceMarkdown(raiz.value)))

/** Diagramas usam as cores do tema — redesenha quando o portal troca claro/escuro. */
let observador: MutationObserver | null = null

function observarTema(): void {
  if (typeof MutationObserver === 'undefined') return
  observador = new MutationObserver(() => void renderizarDiagramas(raiz.value!, true))
  observador.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
}

onMounted(async () => {
  await nextTick()
  await enhanceMarkdown(raiz.value)
  observarTema()
  if (!realcePronto.value) {
    await carregarRealce()
    realcePronto.value = true
  }
})

onBeforeUnmount(() => observador?.disconnect())
</script>

<template>
  <div v-if="isEmpty" class="w-markdown-view w-markdown-view--empty">{{ emptyText }}</div>
  <!-- eslint-disable-next-line vue/no-v-html — output sanitizado pelo DOMPurify -->
  <div v-else ref="raiz" class="w-markdown-view" v-html="html" />
</template>
