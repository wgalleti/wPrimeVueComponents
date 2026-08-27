# WMapSelect

Seleção múltipla de polígonos num mapa de satélite, com painel de busca, contador,
"Limpar seleção" e rodapé com a área somada. Nasceu para escolher **talhões** dentro de um setor.

O componente não guarda seleção: `modelValue` é a fonte da verdade, e tanto o clique no polígono
quanto o clique na lista emitem `update:modelValue`.

## Arranjo (`layout`)

| Valor | Quando usar |
|---|---|
| `'lado-a-lado'` (default) | Mapa à esquerda, painel de 300 px à direita, rodapé embaixo. É o arranjo de sempre — cabe em Dialog estreito e em coluna de formulário. |
| `'sobreposto'` | O mapa ocupa **toda** a área e os controles flutuam por cima em vidro. Para o mapa em tela cheia (modal 94vw × 94vh), onde a imagem é o conteúdo. |

A **marcação é a mesma** nos dois: `layout` só troca posicionamento no CSS. Trocar de valor não
mexe na seleção, nos slots nem nos eventos.

### O que muda no `'sobreposto'`

- **Painel flutuante** no canto superior direito (~320 px), com busca, contador, "Limpar seleção"
  e a lista rolando dentro dele.
- **Barra de resumo** flutuando embaixo, com o slot `#footer`.
- **Recolher**: o botão no topo do painel colapsa tudo numa pílula (ícone + contador de
  selecionados) e devolve o mapa inteiro. É estado **interno** do componente — sem prop, sem
  `v-model` —, mas dá para ler e mandar pelo `ref` (veja [Métodos expostos](#métodos-expostos)).
- **Selo "Satélite"** sai do canto superior direito (onde o painel passou a morar) e vai para a
  esquerda, ao lado do zoom. A atribuição do Leaflet sobe acima da barra de resumo.
- **No celular** (≤ 768 px) o painel vira uma gaveta de largura cheia na parte de baixo, empilhada
  acima da barra de resumo — e continua recolhendo para a pílula.

```vue
<WMapSelect v-model="selecionados" :features="talhoes" layout="sobreposto" height="calc(94vh - 9rem)" />
```

### Legibilidade sobre a imagem

O vidro é um véu de **92 % do `--surface` do tema** + `backdrop-filter: blur()`. O véu sozinho já
garante contraste AA: a lavoura clara e a mata escura sangram só ~8 %. Onde o `backdrop-filter` não
existe, o `@supports` devolve **fundo sólido** — texto sobre imagem crua é o único resultado
inaceitável. Dentro do vidro, `--fg-muted` e `--fg-subtle` são redefinidos a partir do `--fg` do
tema (74 % / 56 %), porque o cinza de apoio normal ficaria no limite do AA sobre imagem.

### Ajuste fino (custom properties)

| Propriedade | Default | Para quê |
|---|---|---|
| `--w-map-panel-w` | `20rem` | Largura do painel flutuante |
| `--w-map-inset` | `0.75rem` (`0.5rem` no celular) | Respiro entre os flutuantes e a borda do mapa |
| `--w-map-foot-h` | medida em runtime | Altura da barra de resumo. O componente mede o `#footer` e publica o valor — é ele que reserva o espaço do painel e levanta a atribuição do Leaflet. Só force se quiser outro comportamento. |

### Gesto do mapa

O painel e o rodapé flutuam por cima, mas continuam **irmãos** do mapa — nunca filhos do container
do Leaflet. Por isso o clique no painel jamais vira clique no mapa, e arrastar/dar zoom por baixo
segue funcionando onde o vidro não cobre. Nada de `L.DomEvent.disableClickPropagation`.

## Só exibir o desenho (`readonly`)

Nem todo mapa é um controle de escolha. Numa **listagem** que já tem a própria busca, ou na
**conferência** do contorno dentro de um cadastro, o painel duplica a busca da tela e a barra de
"área selecionada" não tem o que somar. `readonly` some com os dois: sobra o mapa.

```vue
<WMapSelect :features="talhoes" readonly layout="sobreposto" height="380px" />
```

| | `disabled` | `readonly` |
|---|---|---|
| Painel de busca e lista | à vista, esmaecidos | **não renderiza** |
| Barra de área somada | à vista | **não renderiza** |
| Clique seleciona | não | não |
| Para quê | o controle existe mas está travado agora (form bloqueado, sem permissão) | o mapa nunca foi controle — é exibição |

O `modelValue` **continua valendo**: dá para destacar um polígono de fora (a linha em foco na
tabela, por exemplo) sem que o componente emita nada de volta. Os polígonos também deixam de
mostrar o cursor de mão — no `readonly` sem `selectionMode` o clique não faz nada, e prometer
seleção seria mentira. Com `selectionMode` explícito o clique volta a valer (veja abaixo).

## Modo de seleção (`selectionMode`)

Sem valor, o default preserva o comportamento de sempre: interativo → `'multiple'`,
`readonly` → `'none'`. Definido explicitamente, ele manda — **inclusive com `readonly`**,
que segue escondendo painel e rodapé, mas o clique no polígono emite `update:modelValue`.

| Valor | Clique no polígono/lista |
|---|---|
| `'multiple'` | Alterna o id no array (comportamento de sempre) |
| `'single'` | Substitui a seleção (`[id]`); clicar no já selecionado desmarca (`[]`) |
| `'none'` | Nada seleciona (e o cursor de mão some) |

```vue
<!-- Painel do cadastro: só o mapa, mas o clique escolhe UM talhão -->
<WMapSelect
  :model-value="talhaoEmFoco ? [talhaoEmFoco] : []"
  :features="talhoes"
  readonly
  selection-mode="single"
  tooltips="hover"
  @update:model-value="(ids) => (talhaoEmFoco = ids[0] ?? null)"
/>
```

## Tooltips e mapas densos (`tooltips`)

`tooltips="permanent"` (default) mantém o rótulo de cada polígono sempre visível — ótimo para
uma dúzia de talhões, mas com 100+ é um nó DOM por talhão reposicionado a cada pan/zoom.
`tooltips="hover"` mostra o rótulo só sob o cursor (`sticky`), com a mesma classe e estilo.

### `tooltips="auto"`: o rótulo que respeita o zoom

Rótulo permanente é útil de perto e vira sujeira de longe — afastado, o texto de talhões vizinhos
se sobrepõe e cobre justamente o desenho que o usuário quer ver. Com `tooltips="auto"` a régua
passa a ser o **próprio polígono**: se o texto não cabe dentro dele na escala atual, ele não é
legenda.

| Espaço no polígono | O que aparece |
|---|---|
| Cabe o texto inteiro | `featureLabel` completo (default `"P41 · 172 ha"`) |
| Cabe só a identificação | `featureLabelShort` (default: o `nome` — `"P41"`) |
| Não cabe nem isso | Nada — o rótulo sai de cena e o desenho fica limpo |
| Zoom ≥ `labelFullFromZoom` | Texto inteiro em todos, sem medir |

```vue
<WMapSelect
  v-model="selecionados"
  :features="talhoes"
  tooltips="auto"
  :feature-label-short="(talhao) => talhao.nome"
/>
```

A conta roda a cada `zoomend` e é só aritmética de pixel + `setContent`: nenhuma layer é recriada,
nenhum tooltip é refeito. O texto é medido **uma vez por texto** (a fonte é fixa) e a caixa de cada
polígono fica em cache desde a criação da layer.

A partir de um certo zoom a medida deixa de valer: `labelFullFromZoom` (default `13`) é o **piso**
acima do qual todos os rótulos aparecem inteiros, caibam ou não. De perto o mapa já está espaçado
— o texto que vaza a borda do talhão não cobre o vizinho, e esconder justamente o nome que o
usuário aproximou para ler seria o pior dos dois mundos. `null` desliga o piso: só a medida decide,
em qualquer zoom.

`labelFitScale` (default `0.85`) é o rigor do encaixe: polígono não é retângulo, e a caixa
envolvente promete mais espaço do que o desenho tem no meio. Valor menor esconde mais cedo.

Devolver o mesmo texto no `featureLabelShort` tira o degrau do meio — ou cabe inteiro, ou some.

O mapa também é criado com `preferCanvas: true`: os polígonos são pintados num único canvas em
vez de uma árvore SVG — outra economia que aparece justamente no mapa denso.

### `features` incremental

`features` pode ser alimentado por páginas (ex.: levas de ~40 chegando em sequência): o redesenho
é um **diff por `id`** — remove as layers dos ids que saíram, cria só as novas e recria a que
trocou de `geometria` (a comparação é por **referência**: contorno novo = objeto novo). O
enquadramento automático acontece **uma vez** (na primeira leva, ou quando a `scopeGeometry`
chegar); páginas seguintes não refazem o `fitBounds` — o mapa não pula na frente do usuário.
Para reenquadrar sob demanda, use os métodos expostos `fitToScope()` / `fitToFeature(id)`.

## Destaque por dado (`featureStyle`)

`polygonStyle` e `polygonSelectedStyle` valem para o mapa inteiro: dizem como é um polígono
comum e como é um selecionado. Quando o **dado** da feature é que precisa aparecer — o talhão
que a recomendação prevê, a área já colhida, o lote vencido — use `featureStyle`.

Ela recebe a feature e se ela está selecionada, e devolve **só o que muda**. O resultado é
mesclado sobre o estilo base, então o destaque e o estado de seleção convivem: o contorno sai
verde, o preenchimento continua sendo o de "selecionado".

```vue
<WMapSelect
  v-model="selecionados"
  :features="talhoes"
  :feature-style="(talhao) => (talhao.recomendado ? { color: '#3ddc84', weight: 4 } : null)"
/>
```

Devolver `null` (ou `undefined`) deixa a feature no estilo padrão. Trocar a função repinta o que
já está desenhado — a regra não vale só para as features que chegarem depois.

Como o restyle percorre as layers do mapa, a feature precisa continuar em `features` para ser
encontrada; item que saiu da lista some do mapa junto.

## Cartão de detalhe (`featureDetail` + slot `#feature-detail`)

O tooltip do polígono é uma linha de texto — dá para o nome e a área, não para "quais documentos
existem neste talhão e desde quando". Quando o mapa precisa **contar uma história** sobre a
feature, ligue `featureDetail` e escreva o conteúdo no slot.

A divisão é essa, e é ela que evita uma publicação da suite a cada ideia nova: o componente decide
**quando** abrir e **onde** posicionar; o **conteúdo é seu**, com os componentes que quiser dentro.

```vue
<WMapSelect
  :features="talhoes"
  readonly
  feature-detail="hover"
  :feature-style="corPorSituacao"
  @feature-click="abrirDocumento"
>
  <template #feature-detail="{ feature }">
    <strong>{{ feature.nome }}</strong>
    <WStatusTag :value="feature.dados.situacao" :map="situacaoMap" />
    <p v-for="doc in feature.dados.recomendacoes" :key="doc.id">
      {{ doc.codigo }} · {{ formatDate(doc.data) }}
    </p>
  </template>
</WMapSelect>
```

| Valor | Comportamento |
|---|---|
| `'none'` (default) | Nada muda — sem cartão e sem custo. |
| `'hover'` | Abre enquanto o cursor está sobre o polígono. O cartão **não recebe o ponteiro** (ele nasce sob o cursor e roubaria o `mouseout`, fazendo piscar): use para leitura, nunca para botão ou link. |
| `'click'` | Abre no clique e fica. Fecha ao clicar no mesmo polígono, ao clicar no mapa, com `Esc` ou pelo `close` do slot. É o modo para conteúdo com ação dentro. |

`detailPlacement` diz onde: `'cursor'` (default) ancora no ponto apontado — preso à caixa do mapa,
virando para baixo quando não há espaço acima — e `'canto'` fixa no canto inferior esquerdo, que é
o melhor para conteúdo alto ou leitura demorada.

Sem slot, o cartão mostra o `nome` e o `subtitulo` da feature.

### Onde o dado do domínio viaja: `feature.dados`

`MapSelectFeature.dados` é uma carga livre que o componente **ignora** e devolve inteira — no
`featureStyle`, nos eventos e no slot. É por ali que situação, datas, códigos e o que mais a tela
precisar chegam ao cartão, sem que o componente ganhe um prop por dado novo.

### Clique: `@feature-click`

O clique num polígono emite `feature-click` **sempre**, inclusive com `selectionMode="none"` (o
mapa de leitura). É o gancho para a tela abrir um dialog, navegar para o documento ou o que
precisar — a decisão fica onde ela é de domínio, não dentro do componente.

## Rótulo do polígono (`featureLabel`)

Por padrão o rótulo é `"<nome> · <área>"`. `featureLabel` recebe a feature e devolve a linha a
mostrar; devolver `''` esconde o rótulo daquele polígono.

```vue
<!-- Mapa temático: o número do talhão basta, a área conversa no cartão. -->
<WMapSelect :features="talhoes" :feature-label="(t) => t.nome" />
```

## Leaflet

O `leaflet` é dependência da suite (instalado junto), mas **não entra no bundle**: o componente o
carrega por `import()` dinâmico na montagem. O CSS do Leaflet já vem embutido no `style.css` da
suite. Se o import falhar (offline, CSP), o mapa é trocado por um aviso e o painel lateral continua
selecionando normalmente.

## API

<ApiTable name="WMapSelect" />

### Slots

| Slot | Props | Para quê |
|---|---|---|
| `item` | `feature`, `selected` | Substitui a linha da lista |
| `empty` | — | Mensagem quando a busca não acha nada |
| `footer` | `area`, `features` | Substitui o resumo "Área selecionada X ha" |
| `feature-detail` | `feature`, `selected`, `close` | Conteúdo do cartão de detalhe (só com `featureDetail` ligado) |

### Métodos expostos

| Nome | Tipo | Para quê |
|---|---|---|
| `refreshSize()` | `() => void` | Força o `invalidateSize()` do Leaflet (o componente já chama sozinho ao aparecer, ao recolher e ao trocar de `layout`) |
| `collapsed` | `boolean` (leitura) | Painel flutuante recolhido? Só faz sentido no `'sobreposto'` |
| `setCollapsed(v)` | `(v: boolean) => void` | Recolhe/expande o painel de fora (ex.: recolher ao entrar no modo desenho) |
| `fitToScope()` | `() => void` | Reenquadra no escopo (ou na união das features). O fit automático só acontece uma vez — páginas novas de `features` não movem o mapa |
| `detalhe` | `MapSelectFeature \| null` (leitura) | Feature do cartão de detalhe aberto |
| `fecharDetalhe()` | `() => void` | Fecha o cartão de fora (navegou, salvou, trocou de filtro) |
| `fitToFeature(id, options?)` | `(id: MapSelectId, options?: { padding?: [number, number]; maxZoom?: number }) => void` | Enquadra o polígono de um id (padding default `[20, 20]`); `maxZoom` limita a aproximação ao enquadrar um talhão só. No-op se o id não tem layer |

## Exemplo

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WMapSelect } from '@wgalleti/primevue-components'
import type { MapSelectFeature, MapSelectId } from '@wgalleti/primevue-components'

const selecionados = ref<MapSelectId[]>(['P42'])

// `geometria` é a Geometry GeoJSON pura (Polygon/MultiPolygon) em WGS84.
// Talhão sem contorno cadastrado continua na lista — só não é desenhado.
const talhoes: MapSelectFeature[] = [
  { id: 'P42', nome: 'P42', subtitulo: 'Rotacionado', area: 160, geometria: geoP42 },
  { id: 'P44', nome: 'P44', subtitulo: 'Rotacionado', area: 100, geometria: geoP44 },
  { id: 'P49', nome: 'P49', subtitulo: 'Pastagem', area: 31 },
]
</script>

<template>
  <Dialog v-model:visible="aberto" modal header="Selecionar talhões" :style="{ width: '1080px' }">
    <WMapSelect
      v-model="selecionados"
      :features="talhoes"
      :scope-geometry="setor.geometria"
      height="420px"
    />
    <template #footer>
      <Button label="Cancelar" text @click="aberto = false" />
      <Button label="Aplicar seleção" icon="pi pi-check" @click="aplicar" />
    </template>
  </Dialog>
</template>
```

## Detalhes

- **Dentro de um Dialog**: o componente chama `invalidateSize()` sozinho (ResizeObserver) quando o
  container ganha tamanho, e também ao recolher o painel e ao trocar de `layout` — sem isso o
  Leaflet chega a pintar um quadro com o tile cortado. Se precisar forçar, use o método exposto
  `refreshSize()` via `ref`.
- **Enquadramento**: `scopeGeometry` manda no `fitBounds` inicial; sem ela, o mapa enquadra a união
  das geometrias das features. O fit automático acontece **uma vez** — se a `scopeGeometry` chegar
  depois da primeira leva de features (duas requests em paralelo), ela ainda vale um único
  reenquadramento; daí em diante, só `fitToScope()`/`fitToFeature(id)` movem o mapa.
- **Estilo dos polígonos**: `polygonStyle` / `polygonSelectedStyle` são tinta de mapa (lida sobre a
  imagem de satélite), não tokens de tema — por isso são props com valores literais. O mesmo vale
  para o que o `featureStyle` devolve.
