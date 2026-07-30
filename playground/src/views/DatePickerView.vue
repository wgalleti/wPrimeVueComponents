<script setup lang="ts">
import { ref } from 'vue'
import { WDatePicker } from '@wgalleti/primevue-components'

const d1 = ref<string | null>('2024-03-15')
const d2 = ref<string | null>(null) // autonow → preenche hoje no mount
const d3 = ref<string | null>(null) // datetime
const d4 = ref<string | null>(null) // com min/max
</script>

<template>
  <div class="flex flex-col gap-4 max-w-3xl">
    <div
      class="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-color leading-relaxed"
    >
      <div class="font-semibold mb-1 flex items-center gap-2">
        <i class="pi pi-calendar text-primary" /> WDatePicker — data pt-BR padronizada
      </div>
      <ul class="mt-1.5 flex flex-col gap-0.5">
        <li>• Exibe <b>DD/MM/YYYY</b>, salva <b>YYYY-MM-DD</b> (veja o valor emitido abaixo de cada campo).</li>
        <li>• Digite direto: <kbd>30051988</kbd> vira <b>30/05/1988</b> (máscara).</li>
        <li>• <kbd>F2</kbd> preenche a data de <b>hoje</b>. O ícone de calendário abre o seletor (Hoje / Limpar).</li>
        <li>• <b>autonow</b>: o 2º campo já vem preenchido com hoje (estava null no mount).</li>
      </ul>
    </div>

    <div class="grid grid-cols-2 gap-6">
      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium">Data (valor inicial 2024-03-15)</label>
        <WDatePicker v-model="d1" />
        <code class="text-xs text-muted-color">emit: {{ d1 ?? 'null' }}</code>
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium">autonow (null → hoje no mount)</label>
        <WDatePicker v-model="d2" autonow />
        <code class="text-xs text-muted-color">emit: {{ d2 ?? 'null' }}</code>
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium">Com hora (datetime)</label>
        <WDatePicker v-model="d3" show-time placeholder="dd/mm/aaaa hh:mm" />
        <code class="text-xs text-muted-color">emit: {{ d3 ?? 'null' }}</code>
      </div>

      <div class="flex flex-col gap-1">
        <label class="text-sm font-medium">Min 2024-01-01 / Max 2024-12-31</label>
        <WDatePicker v-model="d4" min-date="2024-01-01" max-date="2024-12-31" />
        <code class="text-xs text-muted-color">emit: {{ d4 ?? 'null' }}</code>
      </div>
    </div>
  </div>
</template>

<style scoped>
kbd {
  display: inline-block;
  padding: 0.05rem 0.4rem;
  font-size: 0.75rem;
  font-family: ui-monospace, monospace;
  border: 1px solid var(--p-surface-300, #cbd5e1);
  border-bottom-width: 2px;
  border-radius: 5px;
  background: var(--p-surface-0, #fff);
}
</style>
