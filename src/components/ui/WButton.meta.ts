import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'UI',
  icon: 'pi pi-stop',
  summary:
    'Botão da suíte sobre o Button do PrimeVue: papel (primary, secondary, ghost, danger) e tamanho (sm, md) no lugar de severity/text/outlined soltos; loading sem mudar a largura, RouterLink por `to` e só-ícone com nome acessível obrigatório.',
  examples: [
    { name: 'Primário', props: { label: 'Salvar', icon: 'pi pi-check' } },
    {
      name: 'Secundário',
      props: { label: 'Exportar', icon: 'pi pi-download', variant: 'secondary' },
    },
    { name: 'Ghost', props: { label: 'Cancelar', variant: 'ghost' } },
    { name: 'Destrutivo', props: { label: 'Excluir', icon: 'pi pi-trash', variant: 'danger' } },
    { name: 'Carregando', props: { label: 'Salvando', loading: true } },
    {
      name: 'Só ícone, pequeno',
      props: {
        icon: 'pi pi-pencil',
        iconOnly: true,
        ariaLabel: 'Editar',
        variant: 'ghost',
        size: 'sm',
      },
    },
  ],
})
