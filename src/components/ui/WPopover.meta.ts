import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-comment',
  summary:
    'Popover do PrimeVue ancorado na navegação por abas (o mesmo motivo do WDialog): dentro de uma aba pendura no pane dela e some com a aba; fora, body. Passthrough total; abre por ref com toggle(event)/show/hide.',
  examples: [
    {
      name: 'Conteúdo do painel',
      description: 'Abre por ref: `pop.value.toggle($event)` no clique do gatilho.',
      slots: { default: '<p>Conteúdo do popover — ancorado no pane da aba atual.</p>' },
    },
  ],
})
