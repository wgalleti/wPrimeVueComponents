import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-clone',
  summary:
    'Painéis da navegação por abas: mantém cada aba montada num wrapper v-show (estado e dialogs sobrevivem à troca), congela a rota por pane e fornece o contexto useTabHost. Substitui o RouterView do layout. Sem exemplo estático: precisa de um router vivo.',
})
