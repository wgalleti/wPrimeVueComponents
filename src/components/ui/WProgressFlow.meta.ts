import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-directions',
  summary: 'Fluxo de progresso em etapas (horizontal/vertical) destacando a etapa atual.',
  examples: [
    {
      name: 'Horizontal',
      props: {
        currentStep: 'pagamento',
        steps: [
          { key: 'carrinho', label: 'Carrinho' },
          { key: 'pagamento', label: 'Pagamento' },
          { key: 'envio', label: 'Envio' },
          { key: 'concluido', label: 'Concluído' },
        ],
      },
    },
    {
      name: 'Vertical',
      props: {
        orientation: 'vertical',
        currentStep: 'analise',
        steps: [
          { key: 'envio', label: 'Envio', description: 'Documentos enviados' },
          { key: 'analise', label: 'Análise', description: 'Em avaliação' },
          { key: 'aprovado', label: 'Aprovado', description: 'Cadastro liberado' },
        ],
      },
    },
  ],
})
