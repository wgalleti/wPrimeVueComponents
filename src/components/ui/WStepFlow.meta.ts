import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-list-check',
  summary:
    'Container das etapas colapsáveis (coluna ou régua). v-model = número da etapa aberta (0 = todas fechadas).',
  examples: [
    {
      name: 'Etapa 1 aberta',
      description: 'As etapas são WStepSection no slot default; o flow desenha a coluna de badges.',
      props: { modelValue: 1 },
      slots: {
        default: `<WStepSection :step="1" title="Contexto e base de cálculo" summary="Fazenda Mafra · 260 ha">
  <p>Campos da etapa…</p>
  <template #footer><button>Continuar para as sementes</button></template>
</WStepSection>
<WStepSection :step="2" title="Sementes e lotes" :count="2" summary="260 ha · 20 BAGs · 14.000 kg" />
<WStepSection :step="3" title="Resumo para o TS" summary="Biológico 84,0 L · Químico 68,0 L" />`,
      },
    },
    {
      name: 'Todas fechadas',
      props: { modelValue: 0 },
      slots: {
        default: `<WStepSection :step="1" title="Contexto e base de cálculo" />
<WStepSection :step="2" title="Sementes e lotes" :count="2" />`,
      },
    },
    {
      name: 'Régua horizontal',
      description:
        'Os cabeçalhos viram uma régua no topo e o corpo da etapa ativa ocupa a largura inteira. As etapas anteriores à ativa aparecem com ✓. Abaixo de 768px cai para o empilhamento vertical.',
      props: { modelValue: 2, orientation: 'horizontal' },
      slots: {
        default: `<WStepSection :step="1" title="Contexto" summary="Fazenda Mafra · 260 ha" />
<WStepSection :step="2" title="Sementes e lotes" :count="2" summary="20 BAGs · 14.000 kg">
  <p>Corpo da etapa ativa, na largura inteira…</p>
</WStepSection>
<WStepSection :step="3" title="Resumo para o TS" />`,
      },
    },
  ],
})
