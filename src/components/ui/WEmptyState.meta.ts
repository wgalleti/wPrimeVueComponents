import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-inbox',
  summary: 'Estado vazio com ícone, título, descrição e ação opcional.',
  examples: [
    {
      name: 'Sem registros',
      props: {
        icon: 'pi pi-inbox',
        title: 'Nenhum registro encontrado',
        description: 'Não há dados para exibir no momento.',
      },
    },
    {
      name: 'Com ação',
      props: {
        icon: 'pi pi-users',
        title: 'Nenhum cliente cadastrado',
        description: 'Comece adicionando seu primeiro cliente.',
        actionLabel: 'Novo cliente',
        actionIcon: 'pi pi-plus',
      },
    },
    {
      name: 'Busca vazia',
      props: {
        icon: 'pi pi-search',
        title: 'Nada encontrado',
        description: 'Tente ajustar os filtros da busca.',
      },
    },
  ],
})
