# WTabBar

Barra de abas de **tela** (não confundir com as abas dentro de um markdown). Controlada:
só emite `update:modelValue` — quem decide o que renderizar é a página. Cada aba aceita
ícone e contador (`badge`), e a navegação por teclado segue o padrão ARIA de tablist
(←/→ circulam entre as abas habilitadas).

## API

<ApiTable name="WTabBar" />

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WTabBar } from '@wgalleti/primevue-components'
import type { TabItem } from '@wgalleti/primevue-components'

const aba = ref('documento')
const abas: TabItem[] = [
  { value: 'documento', label: 'Documento', icon: 'pi pi-file' },
  { value: 'tarefas', label: 'Tarefas', icon: 'pi pi-check-square', badge: '3/8' },
  { value: 'historico', label: 'Histórico', disabled: true },
]
</script>

<template>
  <WTabBar v-model="aba" :items="abas" aria-label="Seções da recomendação" />
  <div v-if="aba === 'documento'">...</div>
  <div v-else-if="aba === 'tarefas'">...</div>
</template>
```
