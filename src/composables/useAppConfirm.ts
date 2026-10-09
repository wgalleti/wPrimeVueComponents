import { useConfirm } from 'primevue/useconfirm'
import { useTabHost } from '@/types/routeTabs'

export function useAppConfirm() {
  const confirm = useConfirm()
  // Dentro da navegação por abas, o confirm pendura no pane da própria aba
  // (some e volta com ela); fora de abas, o body de sempre. O ConfirmDialog
  // global continua único — só a âncora muda, por confirmação.
  const tabHost = useTabHost()
  // Aba oculta (fechar outras, limite de abas, X numa aba que não é a visível): o painel dela
  // está escondido, então a confirmação vai para o body — senão ninguém a vê e a aba não fecha.
  const appendTo = () =>
    tabHost && !tabHost.active.value ? 'body' : (tabHost?.hostEl.value ?? 'body')

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

  /**
   * Pergunta antes de descartar alteração não salva. Resolve `true` para descartar; fechar o
   * diálogo sem escolher conta como continuar editando.
   */
  function confirmDiscard(
    message = 'Há alterações não salvas. Descartar e fechar?',
    header = 'Alterações não salvas',
  ): Promise<boolean> {
    return new Promise((resolve) => {
      let respondido = false
      const responder = (descartar: boolean) => {
        if (respondido) return
        respondido = true
        resolve(descartar)
      }
      confirm.require({
        appendTo: appendTo(),
        message,
        header,
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Continuar editando',
        rejectProps: { severity: 'secondary', text: true },
        acceptLabel: 'Descartar',
        acceptProps: { severity: 'danger' },
        accept: () => responder(true),
        reject: () => responder(false),
        onHide: () => responder(false),
      })
    })
  }

  return { confirmDelete, confirmAction, confirmDiscard }
}
