// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useSubviewCrud } from './useSubviewCrud'
import type { FieldDef } from '@/types/field'

// O manager pede toast e confirm do PrimeVue; aqui interessa o efeito no array.
const toastMock = { success: vi.fn(), error: vi.fn(), warn: vi.fn(), info: vi.fn() }
let confirmAceita = true
const confirmMock = vi.fn((onAccept: () => void) => {
  if (confirmAceita) onAccept()
})

vi.mock('./useAppToast', () => ({ useAppToast: () => toastMock }))
vi.mock('./useAppConfirm', () => ({
  useAppConfirm: () => ({ confirmDelete: confirmMock, confirmAction: vi.fn() }),
}))

const form: FieldDef[] = [
  { field: 'produto', label: 'Produto', type: 'text', required: true },
  { field: 'dose', label: 'Dose', type: 'number', defaultValue: 0 },
]

/** Monta o manager sobre um ref — o papel do dono do estado na tela real. */
function montar(iniciais: Record<string, unknown>[] = []) {
  const linhas = ref(iniciais)
  const crud = useSubviewCrud({
    rows: () => linhas.value,
    onChange: (novas) => {
      linhas.value = novas
    },
    form,
  })
  return { crud, linhas }
}

beforeEach(() => {
  vi.clearAllMocks()
  confirmAceita = true
})

describe('useSubviewCrud', () => {
  it('cria a linha com o que veio do form', () => {
    const { crud, linhas } = montar()

    crud.openCreateDialog()
    crud.setFormField('produto', 'CERTEZA N')
    crud.setFormField('dose', 2)
    crud.save()

    expect(linhas.value).toHaveLength(1)
    expect(linhas.value[0]).toMatchObject({ produto: 'CERTEZA N', dose: 2 })
    expect(crud.dialogVisible.value).toBe(false)
  })

  it('não muta o array recebido — devolve um novo', () => {
    const { crud, linhas } = montar([{ produto: 'STARFIX', dose: 4 }])
    const anterior = linhas.value

    crud.openCreateDialog()
    crud.setFormField('produto', 'CERTEZA N')
    crud.save()

    expect(linhas.value).not.toBe(anterior)
    expect(anterior).toHaveLength(1)
  })

  it('editar preserva o que não está no form (id, derivados)', () => {
    const { crud, linhas } = montar([
      { id: 'abc', produto: 'STARFIX', dose: 4, quantidade: 33.6 },
    ])

    crud.openEditDialog(linhas.value[0], 0)
    crud.setFormField('dose', 6)
    crud.save()

    expect(linhas.value[0]).toMatchObject({
      id: 'abc',
      produto: 'STARFIX',
      dose: 6,
      quantidade: 33.6,
    })
  })

  it('toForm reidrata a FK denormalizada ao abrir a edição', () => {
    const linhas = ref<Record<string, unknown>[]>([
      { produto: 'uuid-1', produto_nome: 'STARFIX', dose: 4 },
    ])
    const crud = useSubviewCrud({
      rows: () => linhas.value,
      onChange: (novas) => {
        linhas.value = novas
      },
      form,
      toForm: (item) => ({ produto: { id: item.produto, descricao: item.produto_nome } }),
    })

    crud.openEditDialog(linhas.value[0], 0)

    expect(crud.formData.produto).toEqual({ id: 'uuid-1', descricao: 'STARFIX' })
  })

  it('recusa o save quando falta campo obrigatório', () => {
    const { crud, linhas } = montar()

    crud.openCreateDialog()
    crud.save()

    expect(linhas.value).toHaveLength(0)
    expect(toastMock.error).toHaveBeenCalledWith('Produto é obrigatório')
    expect(crud.dialogVisible.value).toBe(true)
  })

  describe('uniqueBy', () => {
    function montarUnico(iniciais: Record<string, unknown>[] = []) {
      const linhas = ref(iniciais)
      const crud = useSubviewCrud({
        rows: () => linhas.value,
        onChange: (novas) => {
          linhas.value = novas
        },
        form,
        uniqueBy: 'produto',
        uniqueMessage: 'Este insumo já está neste lote.',
      })
      return { crud, linhas }
    }

    it('recusa a linha nova quando a chave já existe', () => {
      const { crud, linhas } = montarUnico([{ produto: 'STARFIX', dose: 4 }])

      crud.openCreateDialog()
      crud.setFormField('produto', 'STARFIX')
      crud.setFormField('dose', 2)
      crud.save()

      expect(linhas.value).toHaveLength(1)
      expect(toastMock.error).toHaveBeenCalledWith('Este insumo já está neste lote.')
      expect(crud.dialogVisible.value).toBe(true)
    })

    it('aceita chave diferente', () => {
      const { crud, linhas } = montarUnico([{ produto: 'STARFIX', dose: 4 }])

      crud.openCreateDialog()
      crud.setFormField('produto', 'CERTEZA N')
      crud.save()

      expect(linhas.value).toHaveLength(2)
    })

    it('editar a própria linha sem mexer na chave não acusa conflito', () => {
      const { crud, linhas } = montarUnico([
        { produto: 'STARFIX', dose: 4 },
        { produto: 'CERTEZA N', dose: 2 },
      ])

      crud.openEditDialog(linhas.value[0], 0)
      crud.setFormField('dose', 6)
      crud.save()

      expect(toastMock.error).not.toHaveBeenCalled()
      expect(linhas.value[0]).toMatchObject({ produto: 'STARFIX', dose: 6 })
    })

    it('editar para a chave de OUTRA linha é recusado', () => {
      const { crud, linhas } = montarUnico([
        { produto: 'STARFIX', dose: 4 },
        { produto: 'CERTEZA N', dose: 2 },
      ])

      crud.openEditDialog(linhas.value[0], 0)
      crud.setFormField('produto', 'CERTEZA N')
      crud.save()

      expect(toastMock.error).toHaveBeenCalledWith('Este insumo já está neste lote.')
      expect(linhas.value[0]).toMatchObject({ produto: 'STARFIX' })
    })

    it('aceita chave composta por função', () => {
      const linhas = ref<Record<string, unknown>[]>([{ produto: 'HO APORE', lote: 'L1' }])
      const crud = useSubviewCrud({
        rows: () => linhas.value,
        onChange: (novas) => {
          linhas.value = novas
        },
        form: [
          { field: 'produto', label: 'Produto', type: 'text', required: true },
          { field: 'lote', label: 'Lote', type: 'text' },
        ],
        uniqueBy: (item) => `${item.produto}|${item.lote ?? ''}`,
      })

      // Mesmo produto, lote diferente → passa.
      crud.openCreateDialog()
      crud.setFormField('produto', 'HO APORE')
      crud.setFormField('lote', 'L2')
      crud.save()
      expect(linhas.value).toHaveLength(2)

      // Mesmo produto e mesmo lote → recusa.
      crud.openCreateDialog()
      crud.setFormField('produto', 'HO APORE')
      crud.setFormField('lote', 'L1')
      crud.save()
      expect(linhas.value).toHaveLength(2)
    })
  })

  it('exclui passando pela confirmação', () => {
    const { crud, linhas } = montar([
      { produto: 'STARFIX', dose: 4 },
      { produto: 'CERTEZA N', dose: 2 },
    ])

    crud.confirmDelete(linhas.value[0], 0)

    expect(confirmMock).toHaveBeenCalled()
    expect(linhas.value).toHaveLength(1)
    expect(linhas.value[0]).toMatchObject({ produto: 'CERTEZA N' })
  })

  it('cancelar a confirmação não altera nada', () => {
    confirmAceita = false
    const { crud, linhas } = montar([{ produto: 'STARFIX', dose: 4 }])

    crud.confirmDelete(linhas.value[0], 0)

    expect(linhas.value).toHaveLength(1)
  })

  it('não dispara toast de sucesso por padrão (rascunho ainda não foi salvo)', () => {
    const { crud } = montar()

    crud.openCreateDialog()
    crud.setFormField('produto', 'CERTEZA N')
    crud.save()

    expect(toastMock.success).not.toHaveBeenCalled()
  })

  it('createDefaults preenche a linha nova sem sobrescrever a escolha do usuário', () => {
    const linhas = ref<Record<string, unknown>[]>([])
    const crud = useSubviewCrud({
      rows: () => linhas.value,
      onChange: (novas) => {
        linhas.value = novas
      },
      form,
      createDefaults: () => ({ dose: 10, classe: 'QUIMICO' }),
    })

    crud.openCreateDialog()
    crud.setFormField('produto', 'CERTEZA N')
    crud.setFormField('dose', 3)
    crud.save()

    expect(linhas.value[0]).toMatchObject({ produto: 'CERTEZA N', dose: 3, classe: 'QUIMICO' })
  })

  it('transformPayload tem a última palavra sobre o que entra no array', () => {
    const linhas = ref<Record<string, unknown>[]>([])
    const crud = useSubviewCrud({
      rows: () => linhas.value,
      onChange: (novas) => {
        linhas.value = novas
      },
      form,
      transformPayload: (payload) => ({ ...payload, quantidade: Number(payload.dose) * 8.4 }),
    })

    crud.openCreateDialog()
    crud.setFormField('produto', 'CERTEZA N')
    crud.setFormField('dose', 2)
    crud.save()

    expect(linhas.value[0]).toMatchObject({ quantidade: 16.8 })
  })

  it('avisa o dono depois de salvar e de excluir', () => {
    const aoSalvar = vi.fn()
    const aoExcluir = vi.fn()
    const linhas = ref<Record<string, unknown>[]>([])
    const crud = useSubviewCrud({
      rows: () => linhas.value,
      onChange: (novas) => {
        linhas.value = novas
      },
      form,
      onAfterSave: aoSalvar,
      onAfterDelete: aoExcluir,
    })

    crud.openCreateDialog()
    crud.setFormField('produto', 'CERTEZA N')
    crud.save()
    expect(aoSalvar).toHaveBeenCalledWith(expect.objectContaining({ produto: 'CERTEZA N' }), false)

    crud.performDelete(0)
    expect(aoExcluir).toHaveBeenCalledWith(expect.objectContaining({ produto: 'CERTEZA N' }), 0)
  })
})
