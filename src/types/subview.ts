import type { ComputedRef, Ref } from 'vue'
import type { FieldDef } from './field'
import type { CrudLabels } from './labels'

/**
 * CRUD de coleção-filha que vive em **estado local**, não num recurso REST.
 *
 * O `CrudManagerConfig` pressupõe um endpoint: cada linha grava sozinha, na hora. Há
 * telas em que isso não existe — o editor de documento, em que os filhos só vão ao
 * servidor quando o documento inteiro é salvo (um `POST .../salvar` que reconcilia as
 * coleções). Aí a linha não tem endereço próprio para gravar, e o array em memória é a
 * verdade até o salvamento.
 *
 * Este config descreve esse caso com a mesma gramática do outro: `form`, `labels`,
 * `createDefaults`, `transformPayload` significam exatamente o que significam lá.
 */
export interface SubviewCrudConfig<T> {
  /** De onde vêm as linhas — getter, para acompanhar a fonte reativa do dono. */
  rows: () => T[]
  /** Devolve o array inteiro já alterado. Quem grava (e decide persistir) é o dono. */
  onChange: (rows: T[]) => void
  form: FieldDef[]
  /** Nº de colunas do grid do form dialog (default 2, como no CRUD). */
  formColumns?: number
  /** Enter navega o form e submete no último campo. Default `true`. */
  keyboardNav?: boolean
  labels?: Partial<CrudLabels>
  canCreate?: boolean
  canEdit?: boolean
  canDelete?: boolean
  /** Valores que a linha nova nasce com (ex.: a classe padrão do insumo). */
  createDefaults?: () => Record<string, unknown>
  /** Última palavra sobre o que vai para o array — normalização, campos derivados. */
  transformPayload?: (payload: Record<string, unknown>, isEditing: boolean) => Record<string, unknown>
  /**
   * O que não pode repetir na coleção: um campo (`'produto'`) ou uma função que
   * monta a chave composta (`(i) => \`${i.produto}|${i.lote}\``).
   *
   * Existe porque a coleção-filha quase sempre tem essa regra do lado do servidor
   * (dois insumos do mesmo produto no mesmo lote não fazem sentido — é uma dose só),
   * e descobrir isso no 400 do salvamento é tarde: o usuário já preencheu tudo.
   * Linha com chave vazia não é comparada — quem cobra preenchimento é o `required`.
   */
  uniqueBy?: string | ((item: T) => unknown)
  /** O que se diz quando repete. Fale do que fazer, não só do erro. */
  uniqueMessage?: string
  /**
   * Como a linha vira form, ao abrir para editar ou duplicar — o inverso do
   * `transformPayload`. O que devolver sobrepõe o que foi lido do item.
   *
   * Existe por causa da FK denormalizada, que é a regra em listagem: a linha guarda
   * `produto` (id) e `produto_nome` (texto), enquanto o campo `fk` do form trabalha com
   * o objeto `{ id, descricao }`. Sem isto, abrir a edição mostraria o campo vazio.
   */
  toForm?: (item: T) => Record<string, unknown>
  onAfterSave?: (item: T, isEditing: boolean) => void
  onAfterDelete?: (item: T, index: number) => void
  /**
   * Toast a cada operação. Default `false`: em rascunho, cada linha dispararia um
   * aviso de "salvo" que ainda não é verdade — o documento só vai ao servidor depois.
   * O feedback é a linha aparecendo na tabela. Erro de validação avisa sempre.
   */
  toast?: boolean
}

export interface SubviewCrudReturn<T> {
  // state
  items: ComputedRef<T[]>
  saving: Ref<boolean>
  dialogVisible: Ref<boolean>
  editingItem: Ref<T | null>
  /** Índice da linha em edição, ou `-1` criando. É a identidade confiável aqui:
   *  linha recém-criada ainda não tem `id`. */
  editingIndex: Ref<number>
  formData: Record<string, unknown>

  // computed
  isEditing: ComputedRef<boolean>
  dialogTitle: ComputedRef<string>

  // methods
  openCreateDialog(): void
  openEditDialog(item: T, index: number): void
  openDuplicateDialog(item: T): void
  save(): T | null
  /** Pergunta antes de excluir — mesmo diálogo do CRUD (`useAppConfirm`). */
  confirmDelete(item: T, index: number): void
  /** Exclui sem perguntar, para quem controla a própria confirmação. */
  performDelete(index: number): void
  setFormField(field: string, value: unknown): void
  resetForm(): void

  // config
  labels: CrudLabels
  config: SubviewCrudConfig<T>
}
