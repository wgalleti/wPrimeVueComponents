import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-exclamation-circle',
  summary: 'Pontos de atenção de uma tela operacional: o que pede ação, com contagem e atalho.',
  examples: [
    {
      name: 'Base de alunos',
      props: {
        title: 'Atenção',
        subtitle: 'Itens que tendem a gerar suporte ou retrabalho.',
        items: [
          {
            key: 'sem_anamnese',
            icon: 'pi pi-heart',
            label: 'Sem anamnese',
            hint: 'Ficha de saúde pendente',
            value: 100,
            severity: 'danger',
          },
          {
            key: 'menores',
            icon: 'pi pi-shield',
            label: 'Menores sem responsável',
            hint: 'Regularização prioritária',
            value: 13,
            severity: 'warning',
          },
          {
            key: 'sem_telefone',
            icon: 'pi pi-phone',
            label: 'Sem telefone',
            value: 0,
            severity: 'neutral',
          },
        ],
      },
    },
    {
      name: 'Nada pendente',
      props: { title: 'Atenção', items: [] },
    },
  ],
})
