<script setup lang="ts">
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/pt-br'
import type { ColumnDef, TagSeverity } from '@/types/column'
import { useFormatters } from '@/composables/useFormatters'

dayjs.extend(relativeTime)

defineProps<{
  column: ColumnDef
  value: unknown
  rowData: Record<string, unknown>
}>()

const { formatDate, formatDateTime, formatCurrency, formatNumber } = useFormatters()

// --- Boolean: rótulo e cor ---------------------------------------------
// `tagValue`/`tagSeverity` (funções) vencem; senão `trueLabel`/`falseLabel` e
// `trueSeverity`/`falseSeverity` (estáticos); default Ativo/Inativo, success/danger.
// Severidade `null` = sem tag: texto neutro (ex.: "—" para o `false` de um
// boolean que não é status, evitando a dupla negação "nao_exige → Inativo").

function boolLabel(column: ColumnDef, value: unknown, rowData: Record<string, unknown>) {
  if (column.tagValue) return column.tagValue(value, rowData)
  return value ? (column.trueLabel ?? 'Ativo') : (column.falseLabel ?? 'Inativo')
}

// --- Enum/status em qualquer tipo de coluna ---------------------------
// `tagValue`/`tagSeverity` numa coluna que não é boolean (status, tipo, fase)
// também viram tag: o rótulo vem do `tagValue` (ou `format`, ou o valor cru) e a
// cor do `tagSeverity` (default `secondary`).

function isTagColumn(column: ColumnDef) {
  return Boolean(column.tagValue || column.tagSeverity)
}

function tagLabel(column: ColumnDef, value: unknown, rowData: Record<string, unknown>) {
  if (column.tagValue) return column.tagValue(value, rowData)
  if (column.format) return column.format(value, rowData)
  return String(value)
}

function tagSeverity(
  column: ColumnDef,
  value: unknown,
  rowData: Record<string, unknown>,
): TagSeverity {
  return (column.tagSeverity?.(value, rowData) as TagSeverity | undefined) ?? 'secondary'
}

// --- Linha composta: identity / progress / relative --------------------
// `secondary` vale em qualquer tipo (campo ou função); `avatar` sem imagem cai
// nas iniciais do valor; `relative` mostra "há 3 dias" e guarda a data exata no
// tooltip e num texto oculto, para a linha continuar legível (e pesquisável).

function primaryText(column: ColumnDef, value: unknown, rowData: Record<string, unknown>) {
  return column.format ? column.format(value, rowData) : String(value)
}

function secondaryText(column: ColumnDef, rowData: Record<string, unknown>) {
  const s = column.secondary
  if (!s) return undefined
  const v = typeof s === 'string' ? rowData[s] : s(rowData)
  return v == null || v === '' ? undefined : String(v)
}

function avatarUrl(column: ColumnDef, rowData: Record<string, unknown>) {
  const a = column.avatar
  if (!a) return undefined
  const v = typeof a === 'string' ? rowData[a] : a(rowData)
  return v ? String(v) : undefined
}

function initials(text: string) {
  const partes = text.trim().split(/\s+/).filter(Boolean)
  return partes
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('')
}

function progressPct(column: ColumnDef, rowData: Record<string, unknown>) {
  const { of, total } = column.progress?.(rowData) ?? { of: 0, total: 0 }
  return total > 0 ? Math.min(100, Math.round((of / total) * 100)) : 0
}

function progressLabel(column: ColumnDef, value: unknown, rowData: Record<string, unknown>) {
  if (column.format) return column.format(value, rowData)
  const { of, total } = column.progress?.(rowData) ?? { of: 0, total: 0 }
  return `${of}/${total}`
}

function exactDate(value: unknown) {
  const s = String(value)
  return s.length > 10 ? formatDateTime(s) : formatDate(s)
}

function relativeText(column: ColumnDef, value: unknown, rowData: Record<string, unknown>) {
  if (column.format) return column.format(value, rowData)
  return dayjs(value as string).locale('pt-br').fromNow()
}

function isOverdue(column: ColumnDef, value: unknown) {
  return Boolean(column.dueDate) && dayjs(value as string).isBefore(dayjs())
}

function boolSeverity(
  column: ColumnDef,
  value: unknown,
  rowData: Record<string, unknown>,
): TagSeverity | null {
  if (column.tagSeverity) return column.tagSeverity(value, rowData) as TagSeverity
  if (value) return column.trueSeverity === undefined ? 'success' : column.trueSeverity
  return column.falseSeverity === undefined ? 'danger' : column.falseSeverity
}
</script>

<template>
  <span
    v-if="value == null || (value === '' && column.empty !== undefined)"
    class="w-cell-empty"
    :class="{ 'w-cell-empty--warn': column.emptySeverity === 'warn' }"
  >
    {{ column.empty ?? '—' }}
  </span>

  <template v-else-if="column.type === 'image'">
    <img :src="String(value)" :alt="column.header" class="w-cell-image" />
  </template>

  <span v-else-if="column.type === 'identity'" class="w-cell-identity">
    <Avatar
      :image="avatarUrl(column, rowData)"
      :label="avatarUrl(column, rowData) ? undefined : initials(primaryText(column, value, rowData))"
      shape="circle"
      class="w-cell-avatar"
      aria-hidden="true"
    />
    <span class="w-cell-identity__text">
      <span class="w-cell-identity__primary">{{ primaryText(column, value, rowData) }}</span>
      <span v-if="secondaryText(column, rowData)" class="w-cell-secondary">
        {{ secondaryText(column, rowData) }}
      </span>
    </span>
  </span>

  <span v-else-if="column.type === 'progress'" class="w-cell-progress">
    <span
      class="w-cell-progress__track"
      role="progressbar"
      :aria-valuenow="progressPct(column, rowData)"
      aria-valuemin="0"
      aria-valuemax="100"
      :aria-label="column.header"
    >
      <span class="w-cell-progress__fill" :style="{ '--w-progress': `${progressPct(column, rowData)}%` }" />
    </span>
    <span class="w-cell-progress__label">{{ progressLabel(column, value, rowData) }}</span>
  </span>

  <span
    v-else-if="column.type === 'relative'"
    v-tooltip.top="exactDate(value)"
    class="w-cell-relative"
    :class="{ 'w-cell-relative--due': isOverdue(column, value) }"
  >
    {{ relativeText(column, value, rowData) }}
    <span class="w-cell-relative__exact">{{ exactDate(value) }}</span>
  </span>

  <template v-else-if="column.type === 'boolean'">
    <span v-if="boolSeverity(column, value, rowData) === null" class="w-cell-neutral">
      {{ boolLabel(column, value, rowData) }}
    </span>
    <Tag
      v-else
      :value="boolLabel(column, value, rowData)"
      :severity="boolSeverity(column, value, rowData) as any"
      :class="['w-tag', `w-tag--${boolSeverity(column, value, rowData)}`]"
    />
  </template>

  <Tag
    v-else-if="isTagColumn(column)"
    :value="tagLabel(column, value, rowData)"
    :severity="tagSeverity(column, value, rowData) as any"
    :class="['w-tag', `w-tag--${tagSeverity(column, value, rowData)}`]"
  />

  <!-- `format` é o render próprio da célula e vence o formatador do tipo — é o que
       deixa uma coluna `currency` dizer "Grátis" ou uma `date` mostrar "hoje". -->
  <span v-else-if="column.type === 'date'" class="w-cell-date">
    {{ column.format ? column.format(value, rowData) : formatDate(value as string) }}
  </span>

  <span v-else-if="column.type === 'datetime'" class="w-cell-date">
    {{ column.format ? column.format(value, rowData) : formatDateTime(value as string) }}
  </span>

  <span v-else-if="column.type === 'currency'" class="w-cell-number">
    {{ column.format ? column.format(value, rowData) : formatCurrency(value as number) }}
  </span>

  <span v-else-if="column.type === 'number'" class="w-cell-number">
    {{
      column.format
        ? column.format(value, rowData)
        : formatNumber(value as number, column.decimals ?? 0)
    }}
  </span>

  <span v-else class="w-cell-text">
    {{ column.format ? column.format(value, rowData) : value }}
  </span>

  <!-- Segunda linha dos tipos simples; identity já desenha a sua ao lado do avatar. -->
  <span
    v-if="value != null && column.type !== 'identity' && secondaryText(column, rowData)"
    class="w-cell-secondary"
  >
    {{ secondaryText(column, rowData) }}
  </span>
</template>
