<script setup lang="ts">
import { inject, provide, ref } from 'vue'
import Button from 'primevue/button'
import SelectButton from 'primevue/selectbutton'
import { W_DATA_PROVIDER_KEY, WSkeleton, useDelayedLoading } from '@wgalleti/primevue-components'
import type { DataProvider } from '@wgalleti/primevue-components'
import ProdutosCrud from './carregamento/ProdutosCrud.vue'

const latencias = [
  { label: '50 ms', value: 50 },
  { label: '400 ms', value: 400 },
  { label: '2 s', value: 2000 },
]
const latencia = ref(400)

// Provider do app embrulhado: só a listagem ganha latência, escolhida no seletor.
const base = inject<DataProvider>(W_DATA_PROVIDER_KEY)!
const comLatencia: DataProvider = {
  ...base,
  list: async (endpoint, params) => {
    await new Promise((r) => setTimeout(r, latencia.value))
    return base.list(endpoint, params)
  },
}
provide(W_DATA_PROVIDER_KEY, comLatencia)

const crudRef = ref<InstanceType<typeof ProdutosCrud> | null>(null)
const recarregar = () => crudRef.value?.crud.refresh()

// Bloco de chegada: simula uma carga própria com o mesmo composable.
const carregandoBloco = ref(false)
const { showSkeleton } = useDelayedLoading(carregandoBloco, { delay: 150 })
const rodada = ref(0)
function carregarBloco() {
  carregandoBloco.value = true
  setTimeout(() => {
    carregandoBloco.value = false
    rodada.value++
  }, latencia.value)
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div>
      <h1 class="text-xl font-bold">Carregamento suave</h1>
      <p class="text-sm opacity-70">
        O esqueleto só aparece se a carga passar de 150 ms (<code>useDelayedLoading</code>). Com
        50 ms nada pisca; com 400 ms ou 2 s entra o esqueleto. Alterne o modo escuro no menu.
      </p>
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <span class="text-sm font-medium">Latência</span>
      <SelectButton v-model="latencia" :options="latencias" option-label="label" option-value="value" :allow-empty="false" />
      <Button label="Recarregar" icon="pi pi-refresh" size="small" @click="recarregar" />
    </div>

    <ProdutosCrud ref="crudRef" />

    <div class="grid gap-4 md:grid-cols-3">
      <div>
        <p class="mb-2 text-xs font-semibold uppercase opacity-60">variant="rows"</p>
        <WSkeleton variant="rows" :count="4" />
      </div>
      <div>
        <p class="mb-2 text-xs font-semibold uppercase opacity-60">variant="card"</p>
        <WSkeleton variant="card" />
      </div>
      <div>
        <p class="mb-2 text-xs font-semibold uppercase opacity-60">variant="text"</p>
        <WSkeleton variant="text" :count="3" />
      </div>
    </div>

    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-3">
        <Button label="Carregar bloco" icon="pi pi-download" size="small" severity="secondary" @click="carregarBloco" />
        <span class="text-xs opacity-60">usa a mesma latência</span>
      </div>
      <WSkeleton v-if="showSkeleton" variant="card" />
      <div v-else-if="!carregandoBloco" :key="rodada" class="w-chegada rounded-lg border border-surface-300 dark:border-surface-700 p-4">
        Conteúdo carregado (rodada {{ rodada }}): entra com fade e leve subida (<code>.w-chegada</code>).
      </div>
    </div>
  </div>
</template>
