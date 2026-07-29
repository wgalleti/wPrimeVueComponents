// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------

export interface CrudLabels {
  createTitle: string
  editTitle: string
  viewTitle?: string
  createButton: string
  saveButton: string
  updateButton: string
  cancelButton: string
  deleteConfirmTitle: string
  deleteConfirmMessage: string
  searchPlaceholder: string
  emptyMessage: string
  successCreate: string
  successUpdate: string
  successDelete: string
}

export const DEFAULT_CRUD_LABELS: CrudLabels = {
  createTitle: 'Novo Registro',
  editTitle: 'Editar Registro',
  createButton: 'Novo',
  saveButton: 'Salvar',
  updateButton: 'Atualizar',
  cancelButton: 'Cancelar',
  deleteConfirmTitle: 'Confirmar Exclusão',
  deleteConfirmMessage: 'Deseja realmente excluir este registro?',
  searchPlaceholder: 'Buscar...',
  emptyMessage: 'Nenhum registro encontrado',
  successCreate: 'Registro criado com sucesso',
  successUpdate: 'Registro atualizado com sucesso',
  successDelete: 'Registro excluído com sucesso',
}
