import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-window-maximize',
  summary:
    'Dialog do PrimeVue ancorado na navegação por abas: dentro de uma aba pendura no pane dela (some e volta com a aba sem fechar; morre com ela), fora de abas cai no body. Passthrough total de props, eventos e slots — use no lugar de importar Dialog direto.',
  examples: [
    {
      name: 'Uso básico (drop-in do Dialog)',
      description:
        'Passthrough do Dialog: mesmas props/eventos/slots; a âncora é resolvida sozinha.',
      props: { visible: true, header: 'Detalhes', modal: true },
      slots: { default: '<p>Conteúdo do dialog — ancorado no pane da aba atual.</p>' },
    },
  ],
})
