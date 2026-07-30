import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-calendar',
  summary: 'Seletor de intervalo de datas (período) — wrapper do DatePicker em modo range.',
  examples: [
    { name: 'Padrão', props: {} },
    { name: 'Sem barra de botões', props: { showButtonBar: false, placeholder: 'De — Até' } },
  ],
})
