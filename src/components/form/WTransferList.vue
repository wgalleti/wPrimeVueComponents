<script setup lang="ts">
import { computed, ref } from 'vue'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Button from 'primevue/button'

type Id = string | number
type Item = Record<string, unknown>

const props = withDefaults(
  defineProps<{
    /** Full pool of available records. */
    source: Item[]
    /** Currently selected ids (v-model:selected). */
    selected: Id[]
    /** Field used as the record id (default: 'id'). */
    trackBy?: string
    /** Field used for the visible label (default: 'nome'). */
    optionLabel?: string
    /** Fields to match when searching (default: [optionLabel]). */
    searchFields?: string[]
    disabled?: boolean
  }>(),
  {
    trackBy: 'id',
    optionLabel: 'nome',
    selected: () => [],
  },
)

const emit = defineEmits<{
  'update:selected': [ids: Id[]]
}>()

const leftSearch = ref('')
const rightSearch = ref('')

const selectedSet = computed(() => new Set(props.selected))
const fields = computed(() => props.searchFields ?? [props.optionLabel])

function idOf(item: Item): Id {
  return item[props.trackBy] as Id
}

function labelOf(item: Item): string {
  return String(item[props.optionLabel] ?? '')
}

function matches(item: Item, term: string): boolean {
  if (!term) return true
  const q = term.toLowerCase()
  return fields.value.some((f) =>
    String(item[f] ?? '').toLowerCase().includes(q),
  )
}

const available = computed(() =>
  props.source.filter(
    (i) => !selectedSet.value.has(idOf(i)) && matches(i, leftSearch.value),
  ),
)

const chosen = computed(() =>
  props.source.filter(
    (i) => selectedSet.value.has(idOf(i)) && matches(i, rightSearch.value),
  ),
)

function add(item: Item) {
  if (props.disabled) return
  emit('update:selected', [...props.selected, idOf(item)])
}

function remove(item: Item) {
  if (props.disabled) return
  const id = idOf(item)
  emit('update:selected', props.selected.filter((s) => s !== id))
}

function addAll() {
  if (props.disabled) return
  emit('update:selected', props.source.map(idOf))
}

function removeAll() {
  if (props.disabled) return
  emit('update:selected', [])
}
</script>

<template>
  <div class="w-transfer" :class="{ 'w-transfer--disabled': disabled }">
    <!-- Available -->
    <div class="w-transfer__pane">
      <div class="w-transfer__head">
        <span class="w-transfer__title">Disponíveis</span>
        <span class="w-transfer__count">{{ available.length }}</span>
      </div>
      <IconField class="w-transfer__search">
        <InputIcon class="pi pi-search" />
        <InputText v-model="leftSearch" placeholder="Buscar..." fluid />
      </IconField>
      <ul class="w-transfer__list">
        <li
          v-for="item in available"
          :key="`a-${idOf(item)}`"
          class="w-transfer__item"
          @click="add(item)"
        >
          <span>{{ labelOf(item) }}</span>
          <i class="pi pi-angle-right" />
        </li>
        <li v-if="!available.length" class="w-transfer__empty">Nenhum item</li>
      </ul>
    </div>

    <!-- Controls -->
    <div class="w-transfer__controls">
      <Button
        type="button"
        icon="pi pi-angle-double-right"
        text
        rounded
        :disabled="disabled || !available.length"
        @click="addAll"
      />
      <Button
        type="button"
        icon="pi pi-angle-double-left"
        text
        rounded
        :disabled="disabled || !selected.length"
        @click="removeAll"
      />
    </div>

    <!-- Selected -->
    <div class="w-transfer__pane">
      <div class="w-transfer__head">
        <span class="w-transfer__title">Selecionados</span>
        <span class="w-transfer__count">{{ chosen.length }}</span>
      </div>
      <IconField class="w-transfer__search">
        <InputIcon class="pi pi-search" />
        <InputText v-model="rightSearch" placeholder="Buscar..." fluid />
      </IconField>
      <ul class="w-transfer__list">
        <li
          v-for="item in chosen"
          :key="`s-${idOf(item)}`"
          class="w-transfer__item"
          @click="remove(item)"
        >
          <i class="pi pi-angle-left" />
          <span>{{ labelOf(item) }}</span>
        </li>
        <li v-if="!chosen.length" class="w-transfer__empty">Nenhum item</li>
      </ul>
    </div>
  </div>
</template>
