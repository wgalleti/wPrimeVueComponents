import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Layout',
  icon: 'pi pi-window-minimize',
  summary:
    'Uma seção do WSectionAccordion: ícone tonal, título, frase, contagem e chevron no cabeçalho; corpo colapsável que fica montado.',
  examples: [
    {
      name: 'Com contagem',
      description: 'Fora de um WSectionAccordion a seção é um card colapsável avulso (estado local).',
      props: {
        value: 'itens',
        title: 'Itens',
        description: 'Produtos, lotes e quantidades. Fechar a nota dá entrada de cada item no estoque.',
        icon: 'pi pi-list',
        count: 4,
      },
      slots: { default: '<p>Grade de itens…</p>' },
    },
    {
      name: 'Com ações',
      props: {
        value: 'amostras',
        title: 'Amostras',
        description: 'Amostras vinculadas aos itens.',
        icon: 'pi pi-gauge',
        count: 0,
      },
      slots: {
        default: '<p>Sem amostras.</p>',
        actions: '<button>Vincular amostra</button>',
      },
    },
  ],
})
