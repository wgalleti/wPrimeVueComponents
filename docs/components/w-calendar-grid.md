# WCalendarGrid

Grade de horário **controlada** — um dia ou vários lado a lado — no desenho dos calendários de
mesa (Google Calendar, Notion Calendar): régua de horas, linha do "agora" na coluna de hoje,
eventos com a cor da categoria na borda e divididos em faixas quando se sobrepõem.

- **Clique num horário vazio** (`creatable`) emite `create` com o início no passo de
  `createStep` (30 min); passar o mouse mostra a prévia do horário.
- **Arrastar um evento** `draggable` emite `move` com o novo início no passo de `moveStep`
  (15 min). A grade **não muta `events`**: o consumidor grava, recarrega e devolve.
- **Cor é categoria, estado é forma.** `accent` tinge o evento; `state` muda o desenho:
  `done` esmaece, `missed` hachura, `canceled` risca e `attention` contorna com alerta — cada um
  com ícone, porque a cor nunca é o único sinal.
- A régua vai de `startHour` a `endHour` (7–20h) e **abre sozinha** se houver evento fora disso.
  Evento curto ganha altura mínima de `minEventMinutes` para o título caber.
- Altura da hora: `--w-calendar-hour-h` (3rem; no toque, `--w-touch-h`). A grade não rola por
  dentro — cresce com o expediente e a página rola.

Datas: `days` em `YYYY-MM-DD`; `start` dos eventos em ISO 8601 (ou `Date`); os emits devolvem
ISO **com o fuso local** (`2026-10-29T14:30:00-03:00`), pronto para o payload.

## API

<ApiTable name="WCalendarGrid" />

## Exemplo

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { WCalendarGrid } from '@wgalleti/primevue-components'
import type { CalendarEvent, CalendarMoveEvent } from '@wgalleti/primevue-components'

const props = defineProps<{ compromissos: Compromisso[]; semana: string[] }>()

const eventos = computed<CalendarEvent[]>(() =>
  props.compromissos.map((c) => ({
    id: c.id,
    start: c.inicio,
    minutes: 60,
    title: c.candidato_nome,
    subtitle: c.vaga_titulo,
    icon: 'pi pi-users',
    accent: 'var(--viz-2)',
    state: c.status === 'faltou' ? 'missed' : undefined,
    draggable: c.status === 'agendado',
    data: c,
  })),
)

async function remarcar({ event, start }: CalendarMoveEvent) {
  await api.post(`/compromissos/${event.id}/remarcar/`, { inicio: start })
  // recarrega — a grade só reflete o que receber
}
</script>

<template>
  <WCalendarGrid
    :days="semana"
    :events="eventos"
    creatable
    @create="({ start }) => abrirNovo(start)"
    @select="(e) => abrirDetalhe(e.data)"
    @move="remarcar"
  />
</template>
```

### Conteúdo próprio do evento

```vue
<WCalendarGrid :days="dias" :events="eventos">
  <template #event="{ event, short, time }">
    <strong>{{ event.title }}</strong>
    <small v-if="!short">{{ time }}</small>
  </template>
</WCalendarGrid>
```
