import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Layout',
  icon: 'pi pi-bars',
  summary:
    'Seções de um editor master-detail num acordeão único, várias abertas ao mesmo tempo. v-model = values das seções abertas (omitido = tudo aberto).',
  examples: [
    {
      name: 'Tudo aberto',
      description:
        'As seções são WSectionPanel no slot default; sem v-model todas nascem abertas e o usuário recolhe o que não interessa.',
      slots: {
        default: `<WSectionPanel value="dados" title="Dados da nota" description="Identificação, fornecedor, destino e totais." icon="pi pi-file">
  <p>Formulário do cabeçalho…</p>
</WSectionPanel>
<WSectionPanel value="itens" title="Itens" description="Produtos, lotes e quantidades." icon="pi pi-list" :count="3">
  <p>Grade de itens…</p>
</WSectionPanel>
<WSectionPanel value="analises" title="Análises" description="Histórico, da mais recente para a mais antiga." icon="pi pi-gauge" :count="0">
  <p>Linha do tempo…</p>
</WSectionPanel>`,
      },
    },
    {
      name: 'Controlado',
      description: 'Com v-model só as seções listadas ficam abertas.',
      props: { modelValue: ['itens'] },
      slots: {
        default: `<WSectionPanel value="dados" title="Dados da nota" icon="pi pi-file"><p>…</p></WSectionPanel>
<WSectionPanel value="itens" title="Itens" icon="pi pi-list" :count="3"><p>Grade de itens…</p></WSectionPanel>`,
      },
    },
  ],
})
