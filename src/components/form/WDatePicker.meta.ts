import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-calendar',
  summary:
    'Campo de data pt-BR: exibe DD/MM/YYYY, salva YYYY-MM-DD, digitação com máscara (30051988 → 30/05/1988), F2 = hoje e prop autonow.',
  examples: [
    { name: 'Padrão', props: {} },
    { name: 'autonow (preenche hoje se null)', props: { autonow: true } },
    { name: 'Com hora (datetime)', props: { showTime: true } },
  ],
})
