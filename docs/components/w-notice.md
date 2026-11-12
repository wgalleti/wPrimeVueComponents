# WNotice

Aviso em linha, no lugar de `Message`. Cores pelos tokens de status (`-soft`).

- `severity`: `info`, `warn`, `danger`, `success`.
- `role` automático: `alert` para `danger` e `warn` (anuncia na hora), `status` para os demais.
- `closable` mostra o botão de fechar e emite `close`; quem esconde o aviso é o consumidor.
- Conteúdo no slot padrão; `title` opcional.

## API

<ApiTable name="WNotice" />

## Exemplo

```vue
<WNotice v-if="erro" severity="danger" title="Não foi possível salvar" closable @close="erro = false">
  Confira os campos em vermelho.
</WNotice>
```
