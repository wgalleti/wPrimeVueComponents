import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-spinner',
  summary: 'Progresso de carregamento (determinado ou indeterminado). Meta e realizado é o WMeter.',
  examples: [
    { name: 'Determinado', props: { value: 60, label: 'Importando' } },
    { name: 'Indeterminado', props: { label: 'Carregando' } },
    { name: 'Filete', props: { size: 'strip', label: 'Carregando' } },
  ],
})
