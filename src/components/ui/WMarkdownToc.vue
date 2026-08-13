<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import type { MarkdownHeading } from '@/types/markdown'

/**
 * Índice do documento ("Nesta página") com marcação da seção em leitura.
 *
 * Os títulos vêm do evento `headings` do WMarkdownView. Cada `##` vira um grupo
 * que **recolhe seus `###`** — assim o índice fica curto mesmo em documento
 * longo — e o grupo da seção que está sendo lida abre sozinho.
 *
 * A altura é presa à do contexto e a rolagem, quando sobra conteúdo, acontece
 * sem barra visível: o índice não pode competir com a rolagem da página.
 */
const props = withDefaults(
  defineProps<{
    /** Títulos do documento (evento `headings` do WMarkdownView). */
    headings: MarkdownHeading[]
    title?: string
    /** Abaixo disso o índice não aparece (documento curto não precisa). */
    minHeadings?: number
    /** Mostra o campo que filtra os títulos. */
    searchable?: boolean
    /** Teto da lista — o índice se ajusta à altura disponível. */
    maxHeight?: string
  }>(),
  {
    title: 'Nesta página',
    minHeadings: 2,
    searchable: false,
    maxHeight: 'calc(100vh - 14rem)',
  },
)

interface Grupo {
  titulo: MarkdownHeading
  filhos: MarkdownHeading[]
}

const ativo = ref('')
const termo = ref('')
/**
 * Id do único `##` aberto — acordeão. Tudo começa fechado e nada abre sozinho:
 * abrir seção é decisão do leitor, não efeito colateral da rolagem.
 */
const aberto = ref<string | null>(null)
let observador: IntersectionObserver | null = null

/** `##` viram grupos; `###` (e abaixo) entram como filhos do grupo anterior. */
const grupos = computed<Grupo[]>(() => {
  const saida: Grupo[] = []
  for (const titulo of props.headings) {
    if (titulo.level <= 2 || !saida.length) saida.push({ titulo, filhos: [] })
    else saida[saida.length - 1].filhos.push(titulo)
  }
  return saida
})

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/** Com filtro, sobram os grupos que casam (ou que têm filho que casa). */
const visiveis = computed<Grupo[]>(() => {
  const busca = normalizar(termo.value.trim())
  if (!busca) return grupos.value
  return grupos.value
    .map((grupo) => ({
      titulo: grupo.titulo,
      filhos: grupo.filhos.filter((filho) => normalizar(filho.text).includes(busca)),
    }))
    .filter((grupo) => grupo.filhos.length || normalizar(grupo.titulo.text).includes(busca))
})

const filtrando = computed(() => termo.value.trim().length > 0)

function expandido(grupo: Grupo): boolean {
  return filtrando.value || aberto.value === grupo.titulo.id
}

function alternar(grupo: Grupo): void {
  aberto.value = aberto.value === grupo.titulo.id ? null : grupo.titulo.id
}

function observar(): void {
  observador?.disconnect()
  if (typeof IntersectionObserver === 'undefined') return
  observador = new IntersectionObserver(
    (entradas) => {
      const visivel = entradas.find((entrada) => entrada.isIntersecting)
      if (visivel) ativo.value = visivel.target.id
    },
    // Faixa de leitura: o título "ativo" é o que está no topo da tela.
    { rootMargin: '-88px 0px -70% 0px', threshold: 0 },
  )
  props.headings.forEach((titulo) => {
    const elemento = document.getElementById(titulo.id)
    if (elemento) observador?.observe(elemento)
  })
}

function ir(id: string): void {
  const elemento = document.getElementById(id)
  if (!elemento) return
  ativo.value = id
  elemento.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

watch(
  () => props.headings,
  () => void nextTick(observar),
  { immediate: true },
)

onBeforeUnmount(() => observador?.disconnect())
</script>

<template>
  <nav v-if="headings.length >= minHeadings" class="w-md-toc" aria-label="Índice do documento">
    <p class="w-md-toc__titulo">{{ title }}</p>

    <div v-if="searchable" class="w-md-toc__busca">
      <i class="pi pi-search" aria-hidden="true" />
      <input
        v-model="termo"
        type="search"
        placeholder="Filtrar seções"
        aria-label="Filtrar seções"
      />
    </div>

    <div class="w-md-toc__corpo" :style="{ maxHeight }">
      <ul class="w-md-toc__lista">
        <li v-for="grupo in visiveis" :key="grupo.titulo.id" class="w-md-toc__grupo">
          <div
            class="w-md-toc__item w-md-toc__item--n2"
            :class="{ 'w-md-toc__item--ativo': ativo === grupo.titulo.id }"
          >
            <button
              v-if="grupo.filhos.length"
              type="button"
              class="w-md-toc__chevron"
              :aria-expanded="expandido(grupo)"
              :aria-label="`Mostrar seções de ${grupo.titulo.text}`"
              @click="alternar(grupo)"
            >
              <i
                :class="expandido(grupo) ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
                aria-hidden="true"
              />
            </button>
            <span v-else class="w-md-toc__chevron w-md-toc__chevron--vazio" aria-hidden="true" />
            <a :href="`#${grupo.titulo.id}`" @click.prevent="ir(grupo.titulo.id)">
              {{ grupo.titulo.text }}
            </a>
          </div>

          <ul v-if="expandido(grupo)" class="w-md-toc__lista">
            <li
              v-for="filho in grupo.filhos"
              :key="filho.id"
              class="w-md-toc__item w-md-toc__item--n3"
              :class="{ 'w-md-toc__item--ativo': ativo === filho.id }"
            >
              <a :href="`#${filho.id}`" @click.prevent="ir(filho.id)">{{ filho.text }}</a>
            </li>
          </ul>
        </li>
      </ul>

      <p v-if="filtrando && !visiveis.length" class="w-md-toc__vazio">Nenhuma seção encontrada</p>
    </div>
  </nav>
</template>
