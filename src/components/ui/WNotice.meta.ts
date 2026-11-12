import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-info-circle',
  summary: 'Aviso em linha com severidade, título opcional e botão de fechar.',
  examples: [
    {
      name: 'Informação',
      props: { severity: 'info', title: 'Dica' },
      slots: { default: 'O filtro vale para toda a lista.' },
    },
    {
      name: 'Perigo',
      props: { severity: 'danger', title: 'Não foi possível salvar' },
      slots: { default: 'Confira os campos em vermelho.' },
    },
    {
      name: 'Fechável',
      props: { severity: 'success', closable: true },
      slots: { default: 'Cadastro salvo.' },
    },
  ],
})
