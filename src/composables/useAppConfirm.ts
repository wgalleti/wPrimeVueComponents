import { useConfirm } from 'primevue/useconfirm'

export function useAppConfirm() {
  const confirm = useConfirm()

  function confirmDelete(onAccept: () => void, message = 'Deseja realmente excluir este registro?') {
    confirm.require({
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

  function confirmAction(
    message: string,
    onAccept: () => void,
    header = 'Confirmação',
  ) {
    confirm.require({
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
