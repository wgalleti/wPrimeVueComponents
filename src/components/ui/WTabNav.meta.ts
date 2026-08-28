import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-window-maximize',
  summary:
    'Barra da navegação por abas de rota (estilo browser/ERP), par do WTabViewport. Fecha (X, botão do meio); menu com recarregar/fechar outras/todas pelo botão direito ou pelo ⋮ da aba; cor por grupo (fixa via RouteTabMeta.color ou derivada do nome) só em acentos; overflow com rolagem. O estado vem do useRouteTabs via prop — sem exemplo estático: precisa de um router vivo.',
})
