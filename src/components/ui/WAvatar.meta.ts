import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-user',
  summary:
    'Avatar de pessoa: foto ou iniciais sobre uma cor estável do nome; vazio vira o ícone de pessoa.',
  examples: [
    { name: 'Iniciais', props: { name: 'Maria da Silva' } },
    { name: 'Pequeno', props: { name: 'Carlos', size: 'sm' } },
    { name: 'Sem pessoa', props: { name: null } },
  ],
})
