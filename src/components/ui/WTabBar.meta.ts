import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-clone',
  summary:
    'Barra de abas de tela, controlada (v-model com o `value` da aba). Aceita ícone e contador por aba e navega com ←/→. Quem renderiza o conteúdo é a página.',
  examples: [
    {
      name: 'Documento e tarefas',
      props: {
        modelValue: 'documento',
        items: [
          { value: 'documento', label: 'Documento', icon: 'pi pi-file' },
          { value: 'tarefas', label: 'Tarefas', icon: 'pi pi-check-square', badge: '3/8' },
        ],
      },
    },
    {
      name: 'Com aba desabilitada',
      props: {
        modelValue: 'resumo',
        items: [
          { value: 'resumo', label: 'Resumo' },
          { value: 'itens', label: 'Itens', badge: 12 },
          { value: 'historico', label: 'Histórico', disabled: true },
        ],
      },
    },
  ],
})
