import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-window-maximize',
  summary:
    'Barra da navegação por abas de rota (estilo browser/ERP), par do WTabViewport. Fecha (X, botão do meio); menu com recarregar/fechar outras/todas pelo botão direito ou pelo ⋮ da aba; aba ativa com o fundo da página, emendada no painel; ícone sempre na cor da aba (fixa via RouteTabMeta.color, senão derivada do grupo ou da chave); a faixa não rola: as abas que não cabem vão para o menu "Mais (n)" e a ativa fica sempre à vista; com scopeByGroup no useRouteTabs desenha só as abas do grupo ativo, sem rótulo de grupo. O estado vem do useRouteTabs via prop — sem exemplo estático: precisa de um router vivo.',
})
