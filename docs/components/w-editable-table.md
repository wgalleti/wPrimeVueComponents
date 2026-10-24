# WEditableTable

Tabela editável sobre **estado local**, sem `useCrudManager` e sem API. É a peça de "documento com
filhos": o consumidor mantém o array e salva tudo em bloco.

Nada é mutado no lugar — cada edição emite um array novo em `update:modelValue`.

## API

<ApiTable name="WEditableTable" />

### `EditableColumnDef`

| Campo                                     | Tipo                                                                                                                       | Para quê                                                                                                                       |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `field`                                   | Rótulo à esquerda, controle à direita, largura cheia e alvo de toque. Todo controle tem a [mesma altura](#regua-do-digito) |
| `width`                                   | `string \| number`                                                                                                         | Largura fixa (número = px). Sem ela a coluna é fluida, com piso de `--w-col-title-min` (ver [largura](#largura-do-componente)) |
| `align`                                   | `'left' \| 'center' \| 'right'`                                                                                            | Default: `right` quando `editor: 'number'`                                                                                     |
| `editor`                                  | `'number' \| 'text' \| 'select' \| 'date' \| 'none'`                                                                       | Default `none` (célula só de leitura)                                                                                          |
| `options` / `optionLabel` / `optionValue` | —                                                                                                                          | Do `editor: 'select'`                                                                                                          |
| `minDate` / `maxDate`                     | `string \| Date`                                                                                                           | Limites do `editor: 'date'`, que guarda `YYYY-MM-DD` na linha (o `WDatePicker`, com máscara, calendário e F2 = hoje)           |
| `format(value, row)`                      | `=> string`                                                                                                                | Formatação da célula de leitura (vence `decimals`/`suffix`)                                                                    |
| `footer`                                  | `'sum' \| 'none' \| (rows) => string`                                                                                      | Rodapé de totais da coluna                                                                                                     |
| `decimals` / `suffix`                     | `number` / `string`                                                                                                        | Exibição e soma, em pt-BR                                                                                                      |
| `disabled`                                | `boolean \| (row, index) => boolean`                                                                                       | Trava a coluna ou só algumas linhas                                                                                            |
| `group`                                   | `string`                                                                                                                   | Rótulo de grupo no cabeçalho: colunas **vizinhas** com o mesmo `group` ganham um título único (colspan) numa linha acima delas |
| `card`                                    | `'title' \| 'actions' \| 'meta' \| 'value' \| 'field' \| 'read' \| 'hidden'` ou `(row) => papel`                           | Papel da coluna no [modo card](#modo-card-tablet-em-pe) — fixo ou [por linha](#papel-por-linha)                                |

### Slots

| Slot             | Props                             | Para quê                                                                                                                                        |
| ---------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `cell-{field}`   | `row`, `index`, `value`, `column` | Substitui a célula                                                                                                                              |
| `footer-{field}` | `rows`, `column`                  | Substitui a célula do rodapé                                                                                                                    |
| `expansion`      | `row`, `index`                    | Conteúdo da linha expandida (`expandable`)                                                                                                      |
| `toolbar`        | —                                 | Substitui o botão de adicionar                                                                                                                  |
| `toolbar-extra`  | —                                 | Ação irmã, à direita do botão de adicionar (use `.w-editable-table__add .w-editable-table__add--accent` para a mesma moldura em tinta da marca) |
| `empty`          | —                                 | Substitui a mensagem de lista vazia                                                                                                             |

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WEditableTable } from '@wgalleti/primevue-components'
import type { EditableColumnDef } from '@wgalleti/primevue-components'

const lotes = ref([{ produto: 'HO APORE', area: 160, volume_kg: 8400 }])

const columns: EditableColumnDef[] = [
  { field: 'produto', header: 'Produto' },
  { field: 'area', header: 'Área (ha)', width: 110, editor: 'number', decimals: 0, footer: 'sum' },
  { field: 'volume_kg', header: 'Volume (kg)', width: 130, decimals: 0, footer: 'sum' },
]

function adicionar() {
  lotes.value = [...lotes.value, { produto: 'Novo lote', area: 0, volume_kg: 0 }]
}
</script>

<template>
  <WEditableTable
    v-model="lotes"
    :columns="columns"
    expandable
    removable
    add-label="Adicionar lote"
    @add="adicionar"
  >
    <!-- A subtabela de filhos é o próprio WEditableTable -->
    <template #expansion="{ row, index }">
      <WEditableTable
        :model-value="row.insumos"
        :columns="colunasInsumo"
        removable
        add-label="Novo insumo"
        @update:model-value="(rows) => setInsumos(index, rows)"
      />
    </template>
  </WEditableTable>
</template>
```

## Modo card (componente estreito) {#modo-card-tablet-em-pe}

Quando o **próprio componente** é mais estreito que **840px** (a fronteira da régua,
`BREAKPOINTS.retrato`) **ou que o piso da grade** — o que for maior —, a tabela vira uma lista de
cards, um card por linha, como o `WCrudView` já faz com a listagem. `cardMode` controla: `auto` (default, segue a largura do componente),
`never` (planilha que só existe em grade) e `always` (vitrine e teste).

### Largura do componente, não da janela {#largura-do-componente}

A régua mede o elemento (ResizeObserver), não a janela. Com a barra lateral do app, a janela
passa de 840px bem antes de a tabela caber; medindo a janela, nessa faixa a coluna sem `width`
(o título) ficava com zero — nome uma letra por linha, input por cima do título, cabeçalhos
sobrepostos.

- **Por que JS e não `@container`**: o card troca marcação (rótulo dentro da célula, `role`,
  largura inline), então a decisão já tem de estar no componente. O CSS só segue a classe
  `.w-editable-table--cards` — uma fonte só, JS e CSS não discordam.
- **Escondido mede zero** (aba inativa, `v-show`, KeepAlive): o modo que estava fica.
- **Sem ResizeObserver** (SSR, teste em jsdom): fica a grade, como antes.
- **Piso da grade**: larguras fixas + `--w-col-title-min` por coluna fluida (+ expansor e
  lixeira), ajustável pelo token `--col-title-min` do app. Componente mais estreito que o piso
  **vira card**, mesmo acima de 840px: rolar na horizontal esconderia justamente a coluna da
  direita — o total que a pessoa veio ver. A rolagem do wrapper `.w-editable-table__scroll`
  (a tabela ganha `min-width` = piso) fica como **última defesa**: `cardMode: 'never'` ou piso
  que não deu para medir.
- **Como o piso vira px**: o piso é um `calc()` com rem e tokens, e o app pode redefinir o
  token com outro `calc()`/`clamp()`. Em vez de converter unidade no JS (rem × fonte raiz erraria
  o token), o componente renderiza uma **sonda** — um `div` com `width` = o mesmo `calc()` —
  presa num envelope de altura 0 e `overflow: hidden` (solta, faria a página rolar). O navegador
  resolve como resolve a tabela, e o mesmo ResizeObserver lê a sonda: mudou coluna, densidade ou
  fonte, a decisão refaz. Não se mede o `scrollWidth` da tabela porque ele depende do modo (no
  card a tabela é bloco).
- **Sem oscilação**: as duas medidas (largura do componente e da sonda) não dependem do modo.
  O que o modo muda é a altura, que pode pôr ou tirar a barra de rolagem vertical da página
  (~15px); por isso a volta do card para a grade exige **24px de folga** acima do limite, e a
  entrada no card é no limite exato. A folga só vale depois de uma troca feita pelo observer; o
  card decidido na montagem não a ganha.
- **Piso 0 é "não sei", nunca "cabe"** (jsdom, tabela sem colunas): vale só a régua de 840.
  Coluna com `width` em `%` entra no piso resolvida contra a largura do componente — a mesma
  base do `min-width` da tabela.
- **Subtabela da expansão** mede a si mesma: dentro de uma linha aberta, ela pode virar card
  enquanto a de fora continua grade. Para manter as duas iguais, passe o mesmo `cardMode`.

Não existe tela paralela para o tablet: a marcação é **a mesma**. O `<table>` troca de display,
cada `<tbody>` (que já era uma linha, por causa da expansão) vira o card e cada `<td>` vira uma
linha do card. Por isso continuam funcionando sem nenhum ajuste no consumidor:

- os slots `#cell-{field}` (botões, popovers, o que o consumidor desenhou);
- os editores `number` / `text` / `select` / `date`, com edição inline de verdade;
- a linha expansível — vira uma seção no rodapé do card, com o rótulo de `expansionLabel`;
- o rodapé de totais, que vira um card de "Total" no fim da lista — e cada total segue o
  [papel da coluna](#rodape-no-card).

O que muda: as larguras fixas de coluna não valem no card, o cabeçalho agrupado (`group`) entra
como prefixo do rótulo (`Bags · A tratar`) e o rótulo de cada coluna passa a ser renderizado
dentro da célula — no card não há `thead` para consultar.

### Papéis (`column.card`)

Sem declarar nada a tabela já cai em pé: a primeira coluna vira `title` e as demais `field`.
Declare para dar hierarquia — o que se lê de relance, o que se edita, o que é derivado.

`field` e `read` aparecem **na ordem das colunas**, intercalados: o miolo do card lê na mesma
sequência da tabela. Posição fixa só para `title`, `actions`, `meta`, `value` e a expansão.

**Borda é o que se edita; o que só se lê é texto.** Por isso `read` e `value` não têm caixa,
fundo nem moldura — uma caixa tinta parece campo desabilitado e convida o dedo. O que separa
o derivado do editável é a borda do controle; o que separa o número principal do resto é o
tamanho.

| Papel     | Onde fica no card                                                                                                                                                                                                                                                                                                                                                                |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`   | Manchete, no topo (uma por linha; sobrando, a primeira vence)                                                                                                                                                                                                                                                                                                                    |
| `actions` | Ao lado do título, à direita (o `WCrudSubview` já marca a coluna de ações assim)                                                                                                                                                                                                                                                                                                 |
| `meta`    | Contexto compacto sob o título, duas por linha: rótulo pequeno em cima, valor embaixo, **alinhado no início** mesmo em coluna numérica (par rótulo/valor se lê como lista, não como soma). Presa à metade do card, nunca invade a vizinha: o valor quebra em último caso                                                                                                         |
| `value`   | O número principal do card (saldo, total da linha): largura cheia, abaixo do contexto, rótulo pequeno em cima e o número grande em negrito, `tabular-nums`. **`value` pode receber um campo pelo slot; ele ocupa o lugar da manchete** — largura cheia, texto no tamanho dela. Coluna que edita em umas linhas e é calculada em outras usa o [papel por linha](#papel-por-linha) |
| `field`   | Rótulo à esquerda, controle à direita, largura cheia e alvo de toque                                                                                                                                                                                                                                                                                                             |
| `read`    | Derivado: mesma régua do `field` — rótulo e número na mesma coluna, o número alinhado à direita com o do campo de cima, como texto: sem caixa, fundo ou borda. Só leitura naquela linha — coluna que edita em umas linhas usa o [papel por linha](#papel-por-linha). No rodapé de totais fica compacto, duas por linha                                                           |
| `hidden`  | Fora do card (a coluna continua na tabela larga)                                                                                                                                                                                                                                                                                                                                 |

```ts
const columns: EditableColumnDef[] = [
  { field: 'produto_nome', header: 'Produto', card: 'title' },
  { field: 'lote', header: 'Lote', width: 116, card: 'meta' },
  { field: 'saldo', header: 'Saldo (kg)', decimals: 0, card: 'value' },
  { field: 'area', header: 'Área (ha)', width: 112, editor: 'number' }, // field
  { field: 'volume_kg', header: 'Volume (kg)', width: 80, decimals: 0, card: 'read' },
]
```

### Régua do dígito e altura dos campos {#regua-do-digito}

Na coluna da direita do card o olho desce reto: **todo número escrito termina onde termina o
dígito dentro de um campo** — borda do controle + recuo interno. A régua é o token
`--w-card-digit-inset` (`calc(var(--w-control-px) + 1px)`), derivado na raiz do card e não em
`tokens.css`, para seguir um `--w-control-px` redefinido num escopo abaixo do `<html>`.

- `read` na linha usa a régua como recuo, então o número dele fica embaixo do dígito do campo de
  cima.
- A manchete `value` (e o rótulo dela) também termina na régua — antes encostava na borda, a ~12px
  do `read`. Quando o slot de `value` traz um campo (`InputNumber`), ele já tem o próprio recuo e
  fica de fora.

**Um controle só no card**: número, texto, data e escolha do miolo (`field`) têm a mesma altura
(`--w-control-h`, a densidade da suíte), a mesma fonte (`--w-ui-font`) e o mesmo recuo
(`--w-control-px`) — inclusive quando o slot traz o `size="small"` que a grade usa. A data
(`WDatePicker`) guarda o espaço do ícone do calendário. O `read` da linha tem a mesma altura de
linha do `field` (`--w-touch-h`): o passo vertical do miolo é um só, edite-se ou só se leia.

No rodapé de totais, o `read` compacto que não cabe lado a lado na metade estreita do card
desce o número para a linha de baixo, ainda à direita, em vez de partir o número.

### Papel por linha {#papel-por-linha}

`card` também aceita uma função `(row) => papel`, para a coluna que muda de natureza conforme a
linha — o valor que é `InputNumber` na linha em modo manual e número calculado nas demais:

```ts
{
  field: 'valor',
  header: 'Valor (R$)',
  decimals: 2,
  card: (row) => (row.modo === 'manual' ? 'field' : 'value'),
}
```

A função roda por linha × coluna no render: pura e barata, só lê a linha. Use-a para `meta`,
`value`, `field`, `read` e `hidden`. **`title` e `actions` são da tabela, não da linha** —
declare-os fixos: o título é decidido uma vez (o primeiro `card: 'title'` fixo, senão a primeira
coluna) e qualquer outra coluna que resolva `'title'`, fixa duplicada ou vinda da função, cai em
`field`.

### Rodapé no card {#rodape-no-card}

O total de uma coluna segue o papel dela nas linhas — senão a parte (manchete na linha) sai
maior que o todo (compacto no rodapé):

| Coluna               | Total no card                                                             |
| -------------------- | ------------------------------------------------------------------------- |
| `card: 'value'`      | Manchete: mesmo tamanho e peso do `value`, com o rótulo da coluna em cima |
| `card: (row) => …`   | Manchete se **alguma** linha resolve `value`; senão compacto              |
| qualquer outro papel | Compacto (`read`), duas por linha                                         |

O rodapé não tem linha para passar à função, então a regra olha as linhas da tabela: basta uma
linha em que a coluna é a manchete para o total também ser.

### `value` editável

```vue
<WEditableTable v-model="itens" :columns="columns">
  <template #cell-valor="{ row, index }">
    <InputNumber
      v-if="row.modo === 'manual'"
      :model-value="row.valor"
      fluid
      @update:model-value="(v) => setValor(index, v)"
    />
    <span v-else>{{ formatar(row.valor) }}</span>
  </template>
</WEditableTable>
```

Com `card: 'value'` (fixo ou vindo da função), o `InputNumber` fica na posição da manchete,
largura cheia e com o dígito no tamanho dela; a borda continua dizendo que ali se edita.

## Detalhes

- **`add`** só avisa a intenção: quem sabe o formato da linha nova é o consumidor.
- **`remove`** emite os dois — o `update:modelValue` já sem a linha e o `remove(row, index)` com ela.
- **Expansão**: várias linhas podem ficar abertas ao mesmo tempo; o estado é interno.
- **Números** saem alinhados à direita com `tabular-nums` e formatados em pt-BR.
- **Card**: a lista de cards é a mesma tabela com outro display — nunca escreva uma segunda tela
  para o tablet; declare `card` nas colunas.
- **Data travada e vazia**: `editor: 'date'` numa célula travada (`disabled` da tabela ou da coluna)
  sem valor sai como `—`, igual às células de leitura — não um campo desligado com `dd/mm/aaaa`.
  Com data, segue o `WDatePicker` desligado.
- **Digitação em curso**: o `InputNumber` só entrega o valor no blur. Se o app troca o objeto da
  linha enquanto a pessoa digita (recarregou o saldo ao escolher o produto) e a tabela re-renderiza,
  o campo com foco mantém o texto digitado — vale para o editor `number` e para o input de um
  slot `#cell-*`. O valor do pai só vence quando ele muda de fato aquela célula (linha pela
  `rowKey` ou pelo índice, campo pela coluna). A chave da linha precisa ficar estável: trocar o
  valor da `rowKey` remonta a linha.
