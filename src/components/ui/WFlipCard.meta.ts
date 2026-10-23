import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-sync',
  summary:
    'Cartão de duas faces que vira por ação de quem consome: slots `front` e `back` com `{ flipped, flip }` no escopo e `v-model:flipped`. Só a face ativa é renderizada (a altura segue a face visível); meia-volta em rotateY, só opacidade com reduced-motion; o foco vai para `[data-w-flip-focus]` da face nova.',
  examples: [
    {
      name: 'Gráfico e dados',
      description:
        'Frente com o gráfico, verso com a tabela. Alterne `flipped` para ver a meia-volta; no app, o botão de cada face chama `flip()` do escopo.',
      props: { flipped: false },
      slots: {
        front:
          '<div><p>Arroba-boi — últimos 12 meses (gráfico)</p><Button label="Dados e fórmula" size="small" text data-w-flip-focus /></div>',
        back: '<div><p>Mês a mês: R$ 310,00 → R$ 334,50 (média móvel de 3 meses)</p><Button label="Voltar" size="small" text data-w-flip-focus /></div>',
      },
    },
    {
      name: 'Começando pelo verso',
      props: { flipped: true, labels: { front: 'Gráfico', back: 'Dados do gráfico' } },
      slots: {
        front: '<p>Frente</p>',
        back: '<p>Verso — aria-label "Dados do gráfico"</p>',
      },
    },
  ],
})
