# WCommandPalette

Paleta de comandos (Ctrl/⌘+K). Não conhece router nem permissão: o app entrega `items` já
filtrados e navega no `@select`. Sem termo, mostra recentes e o resto por grupo; com termo,
uma lista única (sem acento; cada palavra precisa estar no rótulo ou no grupo, via `filterPaletteItems`, exportada da raiz). Cada item é `{ id, label, group?, icon?, hint? }`; a busca olha `label` e `group`.

## API

<ApiTable name="WCommandPalette" />

## Teclado

Ctrl/⌘+K e `/` abrem a paleta (`shortcut` liga/desliga os dois, também depois de montada). Ambos são ignorados dentro de campos de texto (input, textarea, contenteditable), com outro modal aberto (`.p-dialog-mask`), em repetição de tecla, durante composição (IME) e quando outro handler já deu `preventDefault`. Com a paleta aberta, Ctrl/⌘+K fecha. O fundo fica `inert` enquanto ela está aberta e o foco volta a quem abriu; setas escolhem,
Enter confirma, Esc fecha, Tab não tira o foco do campo.

## Exemplo

```vue
<WCommandPalette
  v-model:visible="aberta"
  :items="itensPermitidos"
  :recent="idsRecentes"
  @select="(item) => router.push(rotaDe(item.id))"
/>
```
