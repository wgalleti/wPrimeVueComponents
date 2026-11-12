<script setup lang="ts">
import { computed, ref } from 'vue'
import Button from 'primevue/button'
import { WCommandPalette } from '@wgalleti/primevue-components'
import type { PaletteItem } from '@wgalleti/primevue-components'

const itens: PaletteItem[] = [
  { id: 'i1', label: 'Imóveis', group: 'Cadastros', icon: 'pi pi-home', hint: 'dica' },
  { id: 'i2', label: 'Proprietários', group: 'Cadastros', icon: 'pi pi-home', hint: 'dica' },
  { id: 'i3', label: 'Corretores parceiros', group: 'Cadastros', icon: 'pi pi-home', hint: 'dica' },
  { id: 'i4', label: 'Cidades e bairros', group: 'Cadastros', icon: 'pi pi-home' },
  { id: 'i5', label: 'Tipos de imóvel', group: 'Cadastros', icon: 'pi pi-home' },
  { id: 'i6', label: 'Leads', group: 'Funil', icon: 'pi pi-users' },
  { id: 'i7', label: 'Visitas agendadas', group: 'Funil', icon: 'pi pi-users' },
  { id: 'i8', label: 'Propostas em negociação', group: 'Funil', icon: 'pi pi-users' },
  { id: 'i9', label: 'Contratos fechados', group: 'Funil', icon: 'pi pi-users' },
  { id: 'i10', label: 'Negócios perdidos', group: 'Funil', icon: 'pi pi-users' },
  { id: 'i11', label: 'Comissões a pagar', group: 'Financeiro', icon: 'pi pi-briefcase' },
  { id: 'i12', label: 'Configurações de comissão por corretor parceiro', group: 'Financeiro', icon: 'pi pi-briefcase' },
  { id: 'i13', label: 'Recebimentos', group: 'Financeiro', icon: 'pi pi-briefcase' },
  { id: 'i14', label: 'Repasses ao proprietário', group: 'Financeiro', icon: 'pi pi-briefcase' },
  { id: 'i15', label: 'Fluxo de caixa', group: 'Financeiro', icon: 'pi pi-briefcase' },
  { id: 'i16', label: 'Relatório de conversão', group: 'Relatórios', icon: 'pi pi-map' },
  { id: 'i17', label: 'Imóveis sem foto', group: 'Relatórios', icon: 'pi pi-map' },
  { id: 'i18', label: 'Leads por origem', group: 'Relatórios', icon: 'pi pi-map' },
  { id: 'i19', label: 'Desempenho da equipe', group: 'Relatórios', icon: 'pi pi-map' },
  { id: 'i20', label: 'Anúncios publicados', group: 'Relatórios', icon: 'pi pi-map' },
  { id: 'i21', label: 'Minha conta', group: 'Conta', icon: 'pi pi-building' },
  { id: 'i22', label: 'Usuários e permissões', group: 'Conta', icon: 'pi pi-building' },
  { id: 'i23', label: 'Notificações', group: 'Conta', icon: 'pi pi-building' },
  { id: 'i24', label: 'Integrações', group: 'Conta', icon: 'pi pi-building' },
  { id: 'i25', label: 'Plano e cobrança', group: 'Conta', icon: 'pi pi-building' },
]

const aberta = ref(false)
const recentes = ref<string[]>(['i12', 'i6'])
const ultimo = ref<PaletteItem | null>(null)

const nomeUltimo = computed(() => (ultimo.value ? `${ultimo.value.label} (${ultimo.value.group})` : 'nenhum ainda'))

function escolher(item: PaletteItem) {
  ultimo.value = item
  recentes.value = [item.id, ...recentes.value.filter((id) => id !== item.id)].slice(0, 5)
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div>
      <h1 class="text-xl font-bold">Paleta de comandos</h1>
      <p class="text-sm opacity-70">
        Abra com <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> ou <kbd>/</kbd> (fora de campos de
        texto). Busque sem acento: tente "comissao", "relatorio conversao" ou "funil".
      </p>
    </div>

    <div class="flex items-center gap-3">
      <Button label="Abrir paleta" icon="pi pi-search" @click="aberta = true" />
      <span class="text-sm">Último escolhido: <strong>{{ nomeUltimo }}</strong></span>
    </div>

    <p class="text-sm opacity-70">Recentes: {{ recentes.join(', ') }}</p>

    <WCommandPalette v-model:visible="aberta" :items="itens" :recent="recentes" @select="escolher" />
  </div>
</template>
