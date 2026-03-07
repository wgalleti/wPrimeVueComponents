<script setup lang="ts">
import { computed } from 'vue'
import Tag from 'primevue/tag'

export interface StatusMapping {
  label: string
  severity: string
}

const props = withDefaults(
  defineProps<{
    value: string
    map?: Record<string, StatusMapping>
  }>(),
  {},
)

const defaultMap: Record<string, StatusMapping> = {
  ativo: { label: 'Ativo', severity: 'success' },
  ativa: { label: 'Ativa', severity: 'success' },
  inativo: { label: 'Inativo', severity: 'danger' },
  inativa: { label: 'Inativa', severity: 'danger' },
  suspensa: { label: 'Suspensa', severity: 'warn' },
  suspenso: { label: 'Suspenso', severity: 'warn' },
  cancelada: { label: 'Cancelada', severity: 'danger' },
  cancelado: { label: 'Cancelado', severity: 'danger' },
  pendente: { label: 'Pendente', severity: 'warn' },
  confirmada: { label: 'Confirmada', severity: 'success' },
  confirmado: { label: 'Confirmado', severity: 'success' },
  vencida: { label: 'Vencida', severity: 'danger' },
  vencido: { label: 'Vencido', severity: 'danger' },
  concluido: { label: 'Concluído', severity: 'success' },
  concluida: { label: 'Concluída', severity: 'success' },
  em_progresso: { label: 'Em Progresso', severity: 'info' },
  em_andamento: { label: 'Em Andamento', severity: 'info' },
  expirado: { label: 'Expirado', severity: 'secondary' },
  expirada: { label: 'Expirada', severity: 'secondary' },
  aberto: { label: 'Aberto', severity: 'info' },
  aberta: { label: 'Aberta', severity: 'info' },
  fechado: { label: 'Fechado', severity: 'secondary' },
  fechada: { label: 'Fechada', severity: 'secondary' },
  pago: { label: 'Pago', severity: 'success' },
  paga: { label: 'Paga', severity: 'success' },
  inadimplente: { label: 'Inadimplente', severity: 'danger' },
}

const statusInfo = computed(() => {
  const mapping = props.map ?? defaultMap
  return mapping[props.value] ?? { label: props.value, severity: 'secondary' }
})
</script>

<template>
  <Tag :value="statusInfo.label" :severity="statusInfo.severity as any" />
</template>
