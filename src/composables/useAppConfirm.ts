import { useConfirm } from 'primevue/useconfirm'
import { useTabHost } from '@/types/routeTabs'

export function useAppConfirm() {
  const confirm = useConfirm()
  // Dentro da navegação por abas, o confirm pendura no pane da própria aba
  // (some e volta com ela); fora de abas, o body de sempre. O ConfirmDialog
  // global continua único — só a âncora muda, por confirmação.
  const tabHost = useTabHost()
  const appendTo = () => tabHost?.hostEl.value ?? 'body'

  function confirmDelete(
    onAccept: () => void,
    message = 'Deseja realmente excluir este registro?',
  ) {
    confirm.require({
      appendTo: appendTo(),
      message,
      header: 'Confirmar Exclusão',
      icon: 'pi pi-trash',
      rejectLabel: 'Cancelar',
      rejectProps: {
        severity: 'secondary',
        text: true,
      },
      acceptLabel: 'Excluir',
      acceptProps: {
        severity: 'danger',
      },
      accept: onAccept,
    })
  }

  function confirmAction(message: string, onAccept: () => void, header = 'Confirmação') {
    confirm.require({
      appendTo: appendTo(),
      message,
      header,
      icon: 'pi pi-question-circle',
      rejectLabel: 'Cancelar',
      rejectProps: {
        severity: 'secondary',
        text: true,
      },
      acceptLabel: 'Confirmar',
      accept: onAccept,
    })
  }

  return { confirmDelete, confirmAction }
}
