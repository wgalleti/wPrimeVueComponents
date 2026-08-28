import { computed, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import type { SubviewCrudConfig, SubviewCrudReturn } from '@/types/subview'
import type { CrudLabels } from '@/types/labels'
import { DEFAULT_CRUD_LABELS } from '@/types/labels'
import { useAppToast } from './useAppToast'
import { useAppConfirm } from './useAppConfirm'
import {
  convertFormRecord,
  getFieldDefaults,
  loadItemIntoRecord,
  validateFormRecord,
} from '@/utils/formRecord'

/**
 * O CRUD do `WCrudSubview`: mesma experiência do `useCrudManager`, sobre um array.
 *
 * Nada aqui é assíncrono e nada fala com a rede — `save` e `performDelete` devolvem o
 * array novo pelo `onChange` e acabou. O dono do estado decide o que fazer com isso
 * (num editor de documento, tipicamente marcar como sujo e gravar o documento inteiro).
 *
 * O array recebido nunca é mutado: toda operação devolve um array novo, para o
 * consumidor poder comparar referência e saber que mudou.
 */
export function useSubviewCrud<T extends Record<string, unknown> = Record<string, unknown>>(
  config: SubviewCrudConfig<T>,
): SubviewCrudReturn<T> {
  const {
    rows,
    onChange,
    form: formFields,
    createDefaults = undefined,
    transformPayload = undefined,
    uniqueBy = undefined,
    uniqueMessage = 'Este item já está na lista.',
    toForm = undefined,
    onAfterSave = undefined,
    onAfterDelete = undefined,
    toast: comToast = false,
  } = config

  const labels: CrudLabels = { ...DEFAULT_CRUD_LABELS, ...config.labels }
  const toast = useAppToast()
  const { confirmDelete: confirmDeleteDialog } = useAppConfirm()

  const items = computed(() => rows() ?? [])
  // Existe para o WCrudFormDialog, que espera a ref de um manager que grava na rede.
  // Aqui a gravação é síncrona, então nunca sai de `false`.
  const saving = ref(false)
  const dialogVisible = ref(false)
  const editingItem = ref<T | null>(null) as Ref<T | null>
  const editingIndex = ref(-1)
  const formData = reactive<Record<string, unknown>>({})

  const defaults = getFieldDefaults(formFields)
  for (const key of Object.keys(defaults)) {
    formData[key] = defaults[key]
  }

  const isEditing = computed(() => editingIndex.value >= 0)
  const dialogTitle = computed(() => (isEditing.value ? labels.editTitle : labels.createTitle))

  function resetForm(): void {
    const defs = getFieldDefaults(formFields)
    for (const key of Object.keys(defs)) {
      formData[key] = defs[key]
    }
  }

  function setFormField(field: string, value: unknown): void {
    formData[field] = value
  }

  function aplicarCreateDefaults(): void {
    if (!createDefaults) return
    for (const [key, val] of Object.entries(createDefaults())) {
      formData[key] = val
    }
  }

  function openCreateDialog(): void {
    editingItem.value = null
    editingIndex.value = -1
    resetForm()
    aplicarCreateDefaults()
    dialogVisible.value = true
  }

  function carregarNoForm(item: T): void {
    loadItemIntoRecord(item, formFields, formData)
    if (!toForm) return
    for (const [key, val] of Object.entries(toForm(item))) {
      formData[key] = val
    }
  }

  function openEditDialog(item: T, index: number): void {
    editingItem.value = item
    editingIndex.value = index
    carregarNoForm(item)
    dialogVisible.value = true
  }

  function openDuplicateDialog(item: T): void {
    editingItem.value = null
    editingIndex.value = -1
    resetForm()
    carregarNoForm(item)
    // createDefaults sobrepõe o que veio da cópia (ex.: a FK do pai atual).
    aplicarCreateDefaults()
    dialogVisible.value = true
  }

  /** Chave de unicidade da linha, ou `undefined` quando não há o que comparar. */
  function chaveUnica(item: T): string | undefined {
    if (!uniqueBy) return undefined
    const valor = typeof uniqueBy === 'function' ? uniqueBy(item) : item[uniqueBy]
    if (valor === null || valor === undefined || valor === '') return undefined
    return String(valor)
  }

  function save(): T | null {
    const erro = validateFormRecord(formFields, formData, isEditing.value)
    if (erro) {
      toast.error(erro)
      return null
    }

    let payload = convertFormRecord(formData, formFields)

    // createDefaults é prefill, não override: só completa o que ficou vazio, para não
    // desfazer a escolha do usuário num campo que nasceu preenchido.
    if (!isEditing.value && createDefaults) {
      for (const [key, value] of Object.entries(createDefaults())) {
        const atual = payload[key]
        if (atual === undefined || atual === null || atual === '') {
          payload[key] = value
        }
      }
    }

    if (transformPayload) {
      payload = transformPayload(payload, isEditing.value)
    }

    const anterior = items.value
    const indice = editingIndex.value
    const editando = indice >= 0
    // A linha editada preserva o que não está no form (id, campos derivados que o
    // servidor devolveu): o form conhece só os campos que ele mesmo edita.
    const item = (editando ? { ...anterior[indice], ...payload } : { ...payload }) as T

    // Duplicidade: comparada contra as OUTRAS linhas — editar a própria linha sem
    // mexer na chave não pode acusar conflito consigo mesma.
    const chave = chaveUnica(item)
    if (chave !== undefined && anterior.some((linha, i) => i !== indice && chaveUnica(linha) === chave)) {
      toast.error(uniqueMessage)
      return null
    }

    const proximo = editando
      ? anterior.map((linha, i) => (i === indice ? item : linha))
      : [...anterior, item]
    onChange(proximo)

    if (comToast) {
      toast.success(editando ? labels.successUpdate : labels.successCreate)
    }
    onAfterSave?.(item, editando)

    dialogVisible.value = false
    editingItem.value = null
    editingIndex.value = -1
    return item
  }

  function performDelete(index: number): void {
    const anterior = items.value
    const item = anterior[index]
    if (item === undefined) return

    onChange(anterior.filter((_, i) => i !== index))

    if (comToast) toast.success(labels.successDelete)
    onAfterDelete?.(item, index)
  }

  function confirmDelete(item: T, index: number): void {
    confirmDeleteDialog(() => performDelete(index), labels.deleteConfirmMessage)
  }

  return {
    items,
    saving,
    dialogVisible,
    editingItem,
    editingIndex,
    formData,
    isEditing,
    dialogTitle,
    openCreateDialog,
    openEditDialog,
    openDuplicateDialog,
    save,
    confirmDelete,
    performDelete,
    setFormField,
    resetForm,
    labels,
    config,
  }
}
