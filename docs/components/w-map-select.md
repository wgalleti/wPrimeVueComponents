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

### Métodos expostos

| Nome | Tipo | Para quê |
|---|---|---|
| `refreshSize()` | `() => void` | Força o `invalidateSize()` do Leaflet (o componente já chama sozinho ao aparecer, ao recolher e ao trocar de `layout`) |
| `collapsed` | `boolean` (leitura) | Painel flutuante recolhido? Só faz sentido no `'sobreposto'` |
| `setCollapsed(v)` | `(v: boolean) => void` | Recolhe/expande o painel de fora (ex.: recolher ao entrar no modo desenho) |

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
  das geometrias das features.
- **Estilo dos polígonos**: `polygonStyle` / `polygonSelectedStyle` são tinta de mapa (lida sobre a
  imagem de satélite), não tokens de tema — por isso são props com valores literais.
