import type { Ref } from 'vue'
import type { SelectOption } from './field'

/** Uma linha da tabela editável — estado local do consumidor, sem manager. */
export type EditableRow = Record<string, unknown>

/** Editor da célula. `none` (default) só exibe o valor formatado.
 *  `date` edita com o `WDatePicker` (digitação com máscara, calendário, F2 = hoje)
 *  e guarda `YYYY-MM-DD` na linha — o mesmo formato que a API recebe. */
export type EditableColumnEditor = 'number' | 'text' | 'select' | 'date' | 'none'

/** Papel da coluna quando a tabela vira card (componente com menos de 840px). Ver `EditableColumnDef.card`. */
export type EditableCardRole = 'title' | 'actions' | 'meta' | 'value' | 'field' | 'read' | 'hidden'

/**
 * Coluna do WEditableTable. Diferente do `ColumnDef` (que descreve uma coluna de
 * listagem vinda da API), aqui a coluna também descreve COMO se edita a célula e
 * o que aparece no rodapé de totais.
 */
export interface EditableColumnDef {
  field: string
  header: string
  /** Largura fixa da coluna (`'120px'`, `120` → px, `'12rem'`). Sem isso a coluna é fluida,
   *  com piso de `--w-col-title-min`: abaixo da soma, a grade rola na horizontal. */
  width?: string | number
  /** Alinhamento do conteúdo. Default: `right` para `editor: 'number'`, senão `left`. */
  align?: 'left' | 'center' | 'right'
  editor?: EditableColumnEditor
  /** Opções do `editor: 'select'`. */
  options?: SelectOption[] | Ref<SelectOption[]>
  /** Campo do rótulo das `options` (default `label`). */
  optionLabel?: string
  /** Campo do valor das `options` (default `value`). */
  optionValue?: string
  /** Formatação da célula somente-leitura. Vence `decimals`/`suffix`. */
  format?: (value: unknown, row: EditableRow) => string
  /** Rodapé da coluna: soma (pt-BR, com `decimals`/`suffix`), nada, ou texto livre. */
  footer?: 'sum' | 'none' | ((rows: EditableRow[]) => string)
  /** Casas decimais na exibição e na soma do rodapé (default 2 quando numérico). */
  decimals?: number
  /** Sufixo colado ao valor formatado (ex.: `' L'`, `' kg'`). */
  suffix?: string
  placeholder?: string
  min?: number
  max?: number
  /** Limites do `editor: 'date'` (string `YYYY-MM-DD` ou `Date`). */
  minDate?: string | Date
  maxDate?: string | Date
  /** Trava a célula (a coluna inteira ou linha a linha). */
  disabled?: boolean | ((row: EditableRow, index: number) => boolean)
  /** Grupo do cabeçalho: colunas VIZINHAS com o mesmo `group` ganham um rótulo
   *  único numa linha acima delas (ex.: "Bags" sobre Sugestão e A tratar).
   *  Colunas sem grupo ficam com a célula de cima vazia. */
  group?: string
  /**
   * Papel da coluna no **modo card** (o próprio componente com menos de 840px de
   * largura — não a janela).
   *
   * Sem declarar nada a tabela já vira card: a primeira coluna é o `title` e as
   * demais viram `field`. Declare para dar hierarquia ao card — o que se lê de
   * relance em cima, o que se edita no meio, o que é derivado embaixo.
   *
   * - `title` — a manchete do card (uma por linha; sobrando, a primeira vence)
   * - `actions` — ações da linha, ao lado do título
   * - `meta` — contexto compacto sob o título, duas por linha (talhão, saldo)
   * - `value` — o número principal do card (saldo, total da linha): largura
   *   cheia, logo abaixo do contexto, rótulo pequeno em cima e o número grande,
   *   em negrito. Pode receber um campo pelo slot `#cell-*` (ex.: `InputNumber`):
   *   ele ocupa o lugar da manchete, largura cheia e no tamanho dela. O total do
   *   rodapé de uma coluna `value` também sai como manchete
   * - `field` — rótulo à esquerda e o controle à direita, largura cheia
   * - `read` — derivado: mesma régua do `field` (rótulo e número na mesma coluna),
   *   mas como TEXTO, sem caixa nem borda — borda é o que se edita; o que só se
   *   lê é texto
   * - `hidden` — fora do card (a coluna continua na tabela larga)
   *
   * `field` e `read` aparecem na ORDEM DAS COLUNAS, intercalados — o miolo do card
   * lê na mesma sequência da tabela. Posição fixa só para `title`, `actions`, `meta`
   * (contexto, logo abaixo do título), `value` (logo abaixo do contexto) e a
   * expansão, que fecha o card.
   *
   * **Papel por linha**: passe uma função `(row) => papel` quando a mesma coluna
   * muda de natureza conforme a linha — ex.: o valor é `InputNumber` na linha em
   * modo manual (`'field'`) e número calculado nas demais (`'value'`). É chamada
   * por linha × coluna no render: mantenha-a pura e barata (só ler a linha).
   * Use a função para `meta`, `value`, `field`, `read` (e `hidden`). `title` e
   * `actions` são da TABELA, não da linha: declare-os fixos. O título é decidido
   * uma vez (o primeiro `card: 'title'` fixo, senão a primeira coluna); qualquer
   * outra coluna que resolva `'title'` — fixa duplicada ou função — cai em `field`.
   *
   * **Rodapé**: o total não tem linha, então segue a coluna — `value` fixo sai como
   * manchete; com função, sai como manchete se ALGUMA linha resolve `value` (a parte
   * nunca fica maior que o todo); senão, compacto (`read`).
   */
  card?: EditableCardRole | ((row: EditableRow) => EditableCardRole)
}
