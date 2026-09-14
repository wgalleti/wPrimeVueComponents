# useFormKeyboardNav

Navegação por teclado em formulários, estilo aplicação desktop: o foco cai no primeiro
campo ao abrir e o **Enter avança para o próximo campo** — é Tab, não submit — até o
último, que dispara `onSubmit`. É o mecanismo por trás do `keyboardNav` do
`useCrudManager` / `WCrudFormDialog`; use-o direto em formulários fora do CRUD (dialog de
ação, form de página).

## Uso

```vue
<script setup>
import { ref } from 'vue'
import { useFormKeyboardNav } from '@wgalleti/primevue-components/composables'

const formRef = ref(null)
const { focusFirst, handleKeydown } = useFormKeyboardNav(formRef, { onSubmit: salvar })
</script>

<template>
  <Dialog v-model:visible="aberto" modal @show="focusFirst">
    <div ref="formRef" @keydown.capture="handleKeydown">
      <!-- campos -->
    </div>
    <template #footer>
      <Button label="Cancelar" text data-kbd-skip @click="aberto = false" />
      <Button label="Salvar" @click="salvar" />
    </template>
  </Dialog>
</template>
```

Binde em **`@keydown.capture`**, não `@keydown`: o Select do PrimeVue abre o painel no
Enter, e o Vue re-renderiza entre o listener dele e o do container — em bubble o handler já
encontra o painel aberto e deixa passar. Em capture o Enter num select fechado vira Tab.

## Opções

| Opção | Tipo | Descrição |
|-------|------|-----------|
| `enabled` | `() => boolean` | Liga/desliga a navegação (default: sempre ligada) |
| `onSubmit` | `() => void` | Chamado quando o Enter passa do último campo |

## Retorno

| Função | Descrição |
|--------|-----------|
| `focusFirst()` | Foca o primeiro campo (e seleciona o texto). Chame no `@show` do Dialog |
| `handleKeydown(e)` | O handler do Enter. Binde em `@keydown.capture` no container |

## Regras do Enter

- `textarea` → quebra de linha (não pula).
- `button` → clique nativo (não pula). Exceção: opção de `segmented`, `choice` e
  `SelectButton` é campo — Enter pula o grupo inteiro; Espaço e clique escolhem.
- Select/MultiSelect **fechado** → Enter é Tab. O painel abre com Espaço ou seta.
- Painel do **próprio campo** aberto (`aria-expanded`: Select, AutoComplete, DatePicker…)
  → Enter escolhe o item; o Enter seguinte avança. Painel aberto de outro campo da página
  não interfere.
- Enter num `input` nunca é o submit implícito do `<form>`.
- `data-kbd-skip` tira o elemento da sequência (o botão Cancelar, um gatilho auxiliar) —
  combine com `tabindex="-1"` para o Tab também pular.
