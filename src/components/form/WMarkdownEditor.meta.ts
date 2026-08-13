import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-pen-to-square',
  summary:
    'Editor de markdown com toolbar (negrito, itálico, H2, listas, link, código, destaque, passos, tabela, marcação), cola rápida da sintaxe no botão "?" e preview via WMarkdownView. Com `maxHeight` vira moldura fixa e os painéis rolam por dentro.',
  examples: [
    {
      name: 'Modo tab (escrever/visualizar)',
      props: {
        modelValue:
          '## Anotações\n\nEscreva em **markdown** e alterne para o preview.\n\n> [!DICA]\n> O botão "?" abre a cola da sintaxe.\n\n- [ ] Primeira tarefa',
        placeholder: 'Escreva em markdown...',
      },
    },
    {
      name: 'Modo split (lado a lado)',
      props: {
        modelValue: '## Lado a lado\n\nO preview acompanha a digitação.',
        previewMode: 'split',
        minHeight: '240px',
      },
    },
    {
      name: 'Desabilitado',
      props: { modelValue: 'Conteúdo *bloqueado*.', disabled: true, minHeight: '160px' },
    },
  ],
  controls: {
    modelValue: { type: 'textarea' },
    previewMode: { type: 'select', options: ['tab', 'split'] },
  },
})
