# usePendingForm

Registro único, no app inteiro, dos formulários com alteração não salva. A mesma lista alimenta
o aviso de saída da página (`beforeunload`, instalado na primeira marcação) e impede a recarga
automática da [versão publicada](./published-version).

```ts
import { usePendingForm } from '@wgalleti/primevue-components'

// enquanto o diálogo estiver aberto com alteração, a chave fica pendente
usePendingForm(() => crud.dialogVisible.value && crud.isDirty.value)
```

A chave sai do registro sozinha quando o escopo do componente morre.

## API

| Função | O que faz |
|---|---|
| `usePendingForm(sujo, chave?)` | mantém `chave` pendente enquanto `sujo` (valor, ref ou getter) for verdadeiro |
| `setPendingForm(chave, pendente)` | marca ou desmarca fora de componente |
| `listPendingForms()` | as chaves pendentes agora |
