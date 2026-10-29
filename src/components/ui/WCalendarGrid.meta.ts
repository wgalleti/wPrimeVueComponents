import { defineComponentMeta } from '@/types/componentMeta'

const hoje = new Date()
const dia = (offset: number) => {
  const d = new Date(hoje)
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}
const semana = Array.from({ length: 7 }, (_, i) => dia(i - ((hoje.getDay() + 6) % 7)))
const em = (d: string, hhmm: string) => `${d}T${hhmm}:00`

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-calendar-clock',
  summary:
    'Grade de horário controlada (dia ou semana) no desenho dos calendários de mesa: régua de horas, linha do "agora", eventos com cor de categoria (`accent`) divididos em faixas quando se sobrepõem, e estado por forma (`done`, `missed`, `canceled`, `attention`). Clique no vazio emite `create`; arrastar evento `draggable` emite `move` — a grade não muta `events`.',
  examples: [
    {
      name: 'Semana com sobreposição',
      props: {
        days: semana,
        creatable: true,
        events: [
          { id: 1, start: em(semana[0], '09:00'), minutes: 60, title: 'Ana Souza', subtitle: 'Analista', icon: 'pi pi-users', accent: 'var(--w-viz-2)', draggable: true },
          { id: 2, start: em(semana[0], '09:30'), minutes: 15, title: 'Bruno Lima', icon: 'pi pi-phone', accent: 'var(--w-viz-1)', state: 'done' },
          { id: 3, start: em(semana[2], '14:00'), minutes: 90, title: 'Carla Dias', subtitle: 'Teste prático', icon: 'pi pi-pencil', accent: 'var(--w-viz-4)', state: 'missed' },
          { id: 4, start: em(semana[3], '10:00'), minutes: 60, title: 'Diego Alves', icon: 'pi pi-user', accent: 'var(--w-viz-3)', state: 'attention' },
        ],
      },
    },
    {
      name: 'Um dia, vazio',
      props: { days: [dia(0)], events: [], creatable: true },
    },
  ],
})
