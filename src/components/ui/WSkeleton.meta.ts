import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-spinner',
  summary:
    'Esqueleto de chegada de dados (linhas de tabela, cartão, texto ou bloco com tamanho por token) sobre o Skeleton do PrimeVue; use com useDelayedLoading.',
  examples: [
    { name: 'Linhas de tabela', props: { variant: 'rows', count: 5 } },
    { name: 'Cartão', props: { variant: 'card' } },
    { name: 'Texto', props: { variant: 'text', count: 3 } },
    { name: 'Figura de painel', props: { variant: 'block', size: 'md' } },
    { name: 'Área de gráfico', props: { variant: 'block', size: 'lg' } },
  ],
})
