# WImageCropper

Componente de upload de imagem com preview e crop integrado.

## Import

```vue
<script setup>
import { WImageCropper } from '@wgalleti/primevue-components'
</script>
```

## Props

| Prop | Tipo | Default | Descricao |
|---|---|---|---|
| `modelValue` | `File \| string \| null` | — | Arquivo ou URL da imagem atual |
| `accept` | `string` | `'image/*'` | Tipos de arquivo aceitos |
| `maxSize` | `number` | `5242880` | Tamanho maximo em bytes (5MB) |
| `aspectRatio` | `number` | `1` | Proporcao do crop (1 = quadrado) |
| `circular` | `boolean` | `false` | Stencil circular (avatar) |
| `width` | `number` | `200` | Largura do preview em px |
| `height` | `number` | `200` | Altura do preview em px |

## Eventos

| Evento | Payload | Descricao |
|---|---|---|
| `update:modelValue` | `File \| null` | Arquivo cropado |
| `error` | `string` | Mensagem de erro (tamanho, tipo) |

## Comportamento

1. Clique abre file picker
2. Ao selecionar imagem, abre modal de crop
3. Ao confirmar crop, emite `File` via `update:modelValue`
4. Preview exibe a imagem cropada
5. Botao de remover limpa o valor

## Uso com FieldDef

```typescript
const form: FieldDef[] = [
  {
    field: 'avatar',
    label: 'Foto',
    type: 'image',
    accept: 'image/jpeg,image/png',
  },
]
```

O `useCrudManager` detecta campos `image` automaticamente e envia o formulario como `FormData` (multipart) ao inves de JSON.

## Uso Standalone

```vue
<script setup>
const avatar = ref<File | null>(null)

const handleUpload = async () => {
  if (!avatar.value) return
  const formData = new FormData()
  formData.append('avatar', avatar.value)
  await api.patch('/api/v1/perfil/', formData)
}
</script>

<template>
  <WImageCropper
    v-model="avatar"
    circular
    accept="image/jpeg,image/png"
  />
  <Button label="Salvar" @click="handleUpload" />
</template>
```
