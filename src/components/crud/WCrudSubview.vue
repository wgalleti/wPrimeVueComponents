<script setup lang="ts">
/**
 * CRUD de coleção-filha em rascunho — o par do `WCrudView` para editor de documento.
 *
 * O `WCrudView` fala com um recurso REST: cada linha grava sozinha, na hora. Quando os
 * filhos não têm endereço próprio no servidor (o documento inteiro é que é salvo, e o
 * backend reconcilia as coleções), aquele contrato não existe — mas a experiência
 * deveria ser a mesma: dialog de form, ação de linha, confirmação para excluir, estado
 * vazio com texto útil.
 *
 * É essa casca, sobre a `WEditableTable` (que traz rodapé de totais, linha expansível e
 * edição por célula — coisas que a listagem de recurso não tem). O estado vem do
 * `useSubviewCrud`; aqui não mora nenhuma regra.
 *
 * A exclusão é ação de linha, e não a lixeira nativa da tabela, de propósito: a tabela
 * emite `update:modelValue` já sem a linha ANTES do `remove`, e quem casa linha↔item por
 * índice se perde no meio de uma confirmação assíncrona. Pela ação, a linha só sai
 * depois do "Excluir".
 */
import { computed, useSlots } from 'vue'
import WEditableTable from './WEditableTable.vue'
import WCrudFormDialog from './WCrudFormDialog.vue'
import type { EditableColumnDef, EditableRow } from '@/types/editableTable'
import type { SubviewCrudReturn } from '@/types/subview'

const props = withDefaults(
  defineProps<{
    // Agnóstico ao tipo da linha, como o WCrudView: o componente trata as linhas como
    // `Record<string, unknown>` e aceita o retorno de qualquer T do consumidor.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    crud: SubviewCrudReturn<any>
    columns: EditableColumnDef[]
    title?: string
    subtitle?: string
    /** Rótulo do botão de adicionar (default: `Adicionar`). */
    addLabel?: string
    /** Liga a coluna de expansão e o slot `#expansion`. */
    expandable?: boolean
    /** Documento travado (emitido, aprovado): sem adicionar, editar nem excluir. */
    disabled?: boolean
    emptyMessage?: string
    dialogWidth?: string
    /** Nº de colunas do grid do form dialog (default: o do manager, senão 2). */
    formColumns?: number
    /** Rótulo da primeira célula do rodapé de totais. */
    footerLabel?: string
    rowKey?: string
  }>(),
  {
    addLabel: 'Adicionar',
    expandable: false,
    disabled: false,
    dialogWidth: '520px',
  },
)

const slots = useSlots()

// `crud` chega como prop, e prop não sofre unwrap de ref — daí o `.value` explícito
// (aqui e nos bindings do dialog). Um computed local evita repetir isso no template.
const linhas = computed(() => props.crud.items.value)

const podeCriar = computed(() => props.crud.config.canCreate !== false && !props.disabled)
const podeEditar = computed(() => props.crud.config.canEdit !== false && !props.disabled)
const podeExcluir = computed(() => props.crud.config.canDelete !== false && !props.disabled)
const temAcoes = computed(() => podeEditar.value || podeExcluir.value)

/** Coluna sintética das ações de linha — some quando não há o que fazer com a linha. */
const COLUNA_ACOES = '__acoes'

const colunas = computed<EditableColumnDef[]>(() =>
  temAcoes.value
    ? [...props.columns, { field: COLUNA_ACOES, header: '', width: '5rem', align: 'right' }]
    : props.columns,
)

/** Só repassa os `cell-*` que o consumidor realmente definiu: repassar um slot vazio
 *  faria a tabela achar que existe conteúdo e renderizar a célula em branco. */
const slotsDeCelula = computed(() =>
  Object.keys(slots).filter((nome) => nome.startsWith('cell-') && nome !== `cell-${COLUNA_ACOES}`),
)

const slotsDeCampo = computed(() =>
  Object.keys(slots).filter((nome) => nome.startsWith('field-') || nome.startsWith('image-')),
)

/** Edição por célula: a tabela devolve o array inteiro, o dono do estado grava. */
function onLinhas(linhas: EditableRow[]): void {
  props.crud.config.onChange(linhas)
}
</script>

<template>
  <div class="w-crud-subview">
    <div v-if="title || $slots['toolbar-actions']" class="w-crud-subview__header">
      <div class="w-crud-subview__heading">
        <h3 v-if="title" class="w-crud-subview__title">
          {{ title }}
          <span v-if="linhas.length" class="w-crud-subview__count">{{ linhas.length }}</span>
        </h3>
        <p v-if="subtitle" class="w-crud-subview__subtitle">{{ subtitle }}</p>
      </div>
      <div v-if="$slots['toolbar-actions']" class="w-crud-subview__actions">
        <slot name="toolbar-actions" />
      </div>
    </div>

    <WEditableTable
      :model-value="linhas"
      :columns="colunas"
      :expandable="expandable"
      :disabled="disabled"
      :add-label="podeCriar ? addLabel : undefined"
      :empty-message="emptyMessage ?? crud.labels.emptyMessage"
      :footer-label="footerLabel"
      :row-key="rowKey"
      @update:model-value="onLinhas"
      @add="crud.openCreateDialog()"
    >
      <!-- Ações da linha: editar abre o form, excluir passa pelo confirm do manager. -->
      <template #[`cell-${COLUNA_ACOES}`]="{ row, index }">
        <div class="w-crud-subview__row-actions">
          <button
            v-if="podeEditar"
            type="button"
            class="w-crud-subview__action"
            aria-label="Editar"
            @click="crud.openEditDialog(row, index)"
          >
            <i class="pi pi-pencil" />
          </button>
          <button
            v-if="podeExcluir"
            type="button"
            class="w-crud-subview__action w-crud-subview__action--danger"
            aria-label="Excluir"
            @click="crud.confirmDelete(row, index)"
          >
            <i class="pi pi-trash" />
          </button>
        </div>
      </template>

      <!-- Repasse dos slots de célula do consumidor -->
      <template v-for="nome in slotsDeCelula" :key="nome" #[nome]="slotData">
        <slot :name="nome" v-bind="slotData" />
      </template>

      <template v-if="$slots.expansion" #expansion="slotData">
        <slot name="expansion" v-bind="slotData" />
      </template>

      <template v-if="$slots.empty" #empty>
        <slot name="empty" />
      </template>
    </WEditableTable>

    <WCrudFormDialog
      :visible="crud.dialogVisible.value"
      :title="crud.dialogTitle.value"
      :fields="crud.config.form"
      :form-data="crud.formData"
      :is-editing="crud.isEditing.value"
      :saving="crud.saving.value"
      :width="dialogWidth"
      :form-columns="formColumns ?? crud.config.formColumns"
      :keyboard-nav="crud.config.keyboardNav !== false"
      @update:visible="crud.dialogVisible.value = $event"
      @update:field="crud.setFormField"
      @save="crud.save()"
    >
      <template v-for="nome in slotsDeCampo" :key="nome" #[nome]="slotData">
        <slot :name="nome" v-bind="slotData" />
      </template>

      <template v-if="$slots['after-fields']" #after-fields="slotData">
        <slot name="after-fields" v-bind="slotData" />
      </template>

      <template v-if="$slots['form-footer']" #footer="slotData">
        <slot name="form-footer" v-bind="slotData" />
      </template>
    </WCrudFormDialog>
  </div>
</template>
