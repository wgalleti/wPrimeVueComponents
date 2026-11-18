import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-spinner',
  summary:
    'Indicador de carregamento: a imagem animada da marca (opção `loader` do plugin) ou, sem ela, um anel neutro em CSS.',
  examples: [
    { name: 'Médio', props: { size: 'md' } },
    { name: 'Pequeno', props: { size: 'sm', label: 'Atualizando' } },
    { name: 'Grande', props: { size: 'lg' } },
    { name: 'Véu sobre o cartão', props: { overlay: true } },
    { name: 'Com atraso e tempo mínimo', props: { loading: true } },
  ],
})
