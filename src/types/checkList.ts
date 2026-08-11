/** Nível de uma verificação: aprovado, aviso, impeditivo. */
export type CheckListLevel = 'ok' | 'warn' | 'bad'

/** Uma linha do WCheckList. */
export interface CheckListItem {
  nivel: CheckListLevel
  label: string
}
