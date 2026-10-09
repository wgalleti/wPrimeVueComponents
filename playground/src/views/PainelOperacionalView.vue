<script setup lang="ts">
import { computed, ref } from 'vue'
import { WAttentionList, WKpiGrid } from '@wgalleti/primevue-components'
import type { AttentionItem, KpiItem } from '@wgalleti/primevue-components'

// Painel operacional com dado feio: rótulo longo, zero, número grande, linha só de informação.
const filtro = ref<string | null>(null)

const kpis = computed<KpiItem[]>(() =>
  [
    {
      key: 'todos',
      icon: 'pi pi-users',
      label: 'Alunos',
      value: 1284,
      hint: '97% da base está ativa',
    },
    {
      key: 'ativos',
      icon: 'pi pi-check-circle',
      label: 'Ativos',
      value: 1246,
      severity: 'success' as const,
    },
    {
      key: 'trancados',
      icon: 'pi pi-lock',
      label: 'Trancados por motivo médico ou viagem longa',
      value: 0,
      severity: 'neutral' as const,
    },
    {
      key: 'inadimplentes',
      icon: 'pi pi-exclamation-triangle',
      label: 'Inadimplentes',
      value: 38,
      severity: 'danger' as const,
      hint: 'R$ 12.480,00 em aberto',
    },
  ].map((k) => ({
    ...k,
    active: k.key === 'todos' ? filtro.value === null : filtro.value === k.key,
  })),
)

const atencao = computed<AttentionItem[]>(() =>
  [
    {
      key: 'sem_anamnese',
      icon: 'pi pi-heart',
      label: 'Sem anamnese',
      hint: 'Ficha de saúde pendente',
      value: 100,
      severity: 'danger' as const,
    },
    {
      key: 'menores',
      icon: 'pi pi-shield',
      label: 'Menores de idade sem responsável cadastrado na academia',
      hint: 'Regularização prioritária antes da próxima graduação',
      value: 13,
      severity: 'warning' as const,
    },
    {
      icon: 'pi pi-sitemap',
      label: 'Jiu-Jitsu',
      hint: 'Só informação: sem ação',
      value: '9 faixas',
    },
    { key: 'sem_telefone', icon: 'pi pi-phone', label: 'Sem telefone', value: 0 },
  ].map((a) => ({ ...a, active: a.key != null && a.key === filtro.value })),
)

function aplicar(chave?: string) {
  filtro.value = !chave || chave === 'todos' || chave === filtro.value ? null : chave
}
</script>

<template>
  <div class="painel">
    <h1>Painel operacional</h1>
    <p>
      Filtro aplicado: <strong>{{ filtro ?? 'nenhum' }}</strong>
    </p>
    <div class="painel__resumo">
      <WKpiGrid :items="kpis" dense @item-click="({ item }) => aplicar(item.key)" />
      <WAttentionList
        title="Atenção"
        subtitle="O que pede ação primeiro fica no topo."
        :items="atencao"
        @item-click="({ item }) => aplicar(item.key)"
      />
    </div>
    <WAttentionList
      title="Sem pendências"
      :items="[]"
      empty-message="Nada pedindo atenção agora."
    />
  </div>
</template>

<style scoped>
.painel {
  display: flex;
  flex-direction: column;
  gap: var(--w-space-6);
  padding: var(--w-space-6);
}

.painel__resumo {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: var(--w-space-4);
  align-items: start;
}

@media (max-width: 839px) {
  .painel__resumo {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
