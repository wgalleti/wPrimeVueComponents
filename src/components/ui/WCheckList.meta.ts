import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-verified',
  summary: 'Lista de verificações de um documento, com contador N/M de quantas passaram.',
  examples: [
    {
      name: 'Verificações da recomendação',
      props: {
        title: 'Verificações',
        items: [
          { nivel: 'ok', label: 'Área distribuída bate com os talhões (260 ha)' },
          { nivel: 'warn', label: '1 lote(s) ainda sem cálculo' },
          { nivel: 'ok', label: 'Saldo de sementes suficiente para o tratamento' },
          { nivel: 'bad', label: 'Estoque insuficiente: CONGREGA, SALUZI' },
        ],
      },
    },
    {
      name: 'Tudo aprovado',
      props: {
        title: 'Verificações',
        items: [
          { nivel: 'ok', label: 'Área distribuída bate com os talhões' },
          { nivel: 'ok', label: 'Todos os lotes têm BAGs/ha calculado' },
        ],
      },
    },
    {
      name: 'Sem contador',
      props: {
        title: 'Pendências',
        showCount: false,
        items: [{ nivel: 'warn', label: 'Foto do solo não anexada' }],
      },
    },
  ],
})
