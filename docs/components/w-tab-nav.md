# WTabNav / WTabViewport

Navegação por abas de **rota** (estilo browser/ERP): cada rota aberta vira uma aba viva —
trocar de aba preserva o estado da tela, e cada aba fecha (X, botão do meio) e recarrega
pelo menu (com "fechar outras" e "fechar todas"), aberto pelo botão direito ou pelo `⋮`
que aparece na aba no hover/ativa. Não confundir com o
[WTabBar](/components/w-tab-bar), que é abas de seção *dentro* de uma tela.

O par funciona junto e todo o estado vem do composable
[useRouteTabs](/composables/use-route-tabs), passado por prop:

- **WTabNav** — a barra: lista as abas, ativa, fecha, menu de contexto e teclado ←/→
  (padrão ARIA de tablist). A faixa não rola: as abas que não cabem vão para o menu do
  botão **"Mais (n)"**, e a aba ativa fica sempre à vista.
  A aba ativa tem o fundo da página e **emenda no painel** logo abaixo; toda aba traz o
  ícone na **cor da aba**. Abas com `group` (via `resolveTabMeta`) ficam contíguas, com o
  rótulo do grupo antes do bloco — o eco dos módulos do menu (Sementes, Estoque…).
- **WTabViewport** — os painéis: substitui o `<RouterView>` do layout. Cada aba hidratada
  fica **montada** num wrapper `v-show` (não `KeepAlive`): o DOM não sai da árvore, então
  um Dialog com `appendTo` no container da aba sobrevive intacto à troca. Cada pane recebe
  um snapshot **congelado** da rota — `useRoute()` da tela oculta não reage à navegação
  global — e fornece o contexto `useTabHost()` (título dinâmico, `appendTo`, close guards).

### Abas por espaço de trabalho

A barra desenha `tabs.visibleTabs`. Com
[`scopeByGroup`](/composables/use-route-tabs#abas-por-espaco-de-trabalho) no `useRouteTabs`,
isso é só o grupo da aba ativa: trocar de grupo troca as abas da barra, o "Mais (n)" e as
setas ←/→ contam só as dele, e "Fechar outras"/"Fechar todas" ficam dentro do grupo. O
**rótulo de grupo não é desenhado** (nem na faixa, nem no menu do "Mais"): a barra é de um
grupo só e o app já mostra o nome do espaço em outro lugar. A cor do grupo continua no
ícone. O `WTabViewport` não muda — os painéis das abas dos outros grupos seguem montados.

### Quando as abas não cabem

A faixa tem uma linha só e **não rola**. Quando a soma das abas passa da largura da barra,
as que não cabem saem da faixa — do fim para o começo — e vão para o botão **"Mais (n)"**,
logo depois da última aba à mostra; o slot `actions` continua no fim da barra.

- **A aba ativa nunca sai da faixa.** Escolher uma aba no menu a ativa, e ela passa a ocupar
  a faixa no lugar de outra. Se a barra só comporta uma aba (celular), ficam a ativa e o
  "Mais (n)"; se nem isso cabe, a ativa cede largura só no título (reticências) — fonte,
  ícone e alvos de toque não encolhem.
- **Quem manda é a largura da barra**, não a da janela: um `ResizeObserver` na barra
  recalcula quando ela muda (menu lateral abrindo, janela, densidade), e também quando uma
  aba abre, fecha, troca de título ou vira a ativa.
- **O menu** é o [WMenu](/components/w-menu): cada item traz o ícone na cor da aba, o título
  e o X das abas `closable` (fecha sem ativar). Com grupos, as abas vêm sob o nome do grupo,
  e o rótulo de um grupo sai da faixa junto com a última aba dele.
- **Acessibilidade:** o botão tem `aria-haspopup="menu"`, `aria-expanded` e o nome
  "Mais abas (n)"; os itens são `menuitem`; `Esc` fecha e devolve o foco ao botão. A aba
  fora da faixa fica `hidden`: sai da tabulação e do leitor de tela, e ←/→ circulam só pelas
  que estão à mostra.

Não há prop: é o comportamento da barra. Para caberem mais abas, dê largura à barra (ela
precisa poder encolher: `min-width: 0` no item flex que a contém) ou encurte os títulos em
`resolveTabMeta` — o título já corta em `11rem`.

### Aba ativa ligada ao conteúdo

A barra fica sobre a superfície (`--w-surface`), sem fio embaixo. A aba ativa tem o **fundo
da página** e os cantos arredondados só em cima: como o painel logo abaixo tem o mesmo
fundo, a aba continua nele, como uma pasta. O texto é neutro — apagado na inativa
(`--w-fg-muted`), `--w-fg` em semibold na ativa — e a largura do título em semibold já
fica reservada, então trocar de aba não empurra as vizinhas.

| Var | Default | Papel |
|---|---|---|
| `--w-bg` | `var(--bg, var(--w-surface-subtle))` | fundo da página, atrás das superfícies |
| `--w-tabnav-active-bg` | `var(--w-bg)` | fundo da aba ativa |

Para a emenda fechar, o app precisa de três coisas:

1. **`--bg` no `:root`** com a mesma cor do fundo da página (o do `body` ou do contêiner do
   `WTabViewport`, que não pinta fundo próprio). O tema do PrimeVue não tem esse papel: sem
   `--bg`, a suíte usa um tom entre a superfície e o hover, que pode não ser o do seu app.
2. O recuo lateral na própria barra (`.w-tab-nav { padding-inline: … }` — a superfície vai
   de ponta a ponta e a medida das abas desconta o recuo) ou num wrapper com a **mesma
   superfície** (`--surface`). Em nenhum dos dois, **borda inferior**: a linha passaria por
   baixo da aba ativa.
3. Nada entre a barra e o `WTabViewport` (margem, `gap`, borda).

Se o painel das abas tiver outro fundo, aponte só a aba:
`:root { --w-tabnav-active-bg: var(--surface-2) }`.

### Cor da aba {#cor-por-grupo}

Toda aba tem uma cor, usada **só em acentos** para o texto seguir neutro e legível: o ícone
da aba e o ponto antes do rótulo do grupo. A cor sai, nesta ordem:

1. de `color`, devolvida no `resolveTabMeta` (qualquer cor CSS);
2. do **grupo** — hash do nome: o mesmo módulo tem sempre a mesma série;
3. sem grupo, da **chave da aba** (`key`, o path com params) — não do título, que a tela
   troca com a aba aberta.

Nos casos 2 e 3 a aba cai numa de **6 séries**, e a cor da série N é resolvida em cascata:

```
var(--w-tab-group-N, var(--w-viz-N))     N = 1..6  (--w-viz-N lê --viz-N do app e cai num OKLCH da suíte)
```

1. `--w-tab-group-N` — token específico do app para as abas;
2. `--viz-N` — a série categórica da paleta do app (a mesma dos gráficos);
3. o OKLCH da suite (cobre, cobalto, âmbar, esmeralda, índigo, ardósia). É calibrado para
   fundo claro e a série 6 é quase neutra: app com tema escuro define as suas `--viz-N`.

Assim a paleta é do app, não da suite. Para todas as abas na cor primária:

```css
:root {
  --w-tab-group-1: var(--primary);
  --w-tab-group-2: var(--primary);
  --w-tab-group-3: var(--primary);
  --w-tab-group-4: var(--primary);
  --w-tab-group-5: var(--primary);
  --w-tab-group-6: var(--primary);
}
```

Para fixar a cor de **um** módulo, devolva `color` no `resolveTabMeta` (vence a série):

```ts
resolveTabMeta: (r) => ({ title: ..., group: 'Sementes', color: 'oklch(64% 0.13 150)' })
```

A cor chega ao CSS como `--w-tab-group-color` em toda aba e no rótulo do grupo — dá para
estender os acentos no app sem tocar na suite.

### Altura da barra e alvos de toque

A barra tem a altura de `--w-tabnav-h`: a aba (um controle pequeno, `--w-control-h-sm`)
mais o respiro de cima (`--w-space-2`), com as abas assentadas na base. O título usa
`--w-text-sm`.

| Densidade | Barra (`--w-tabnav-h`) | Aba |
|---|---|---|
| padrão | 40px | 32px |
| `data-density="compact"` | 36px | 28px |

Os botões "Opções de `<aba>`" (⋮) e "Fechar `<aba>`" (X) só aparecem no hover e na aba
ativa, e têm caixa clicável de **28×28px** (`--w-tabnav-btn`, mínimo de alvo no desktop)
com o ícone pequeno dentro — cabem na aba nas duas densidades.

### Altura e respiro da área da aba

O `WTabViewport` precisa da **altura exata** da área da aba: o pane é a âncora dos dialogs
e menus da tela (`appendTo` local) e o scroll mora num wrapper interno. Ponha o viewport
num contêiner flex em coluna, sem `padding` nem `overflow` próprios — com scroll no
contêiner, o pane cresce com o conteúdo e o dialog centraliza no meio da página rolada (ou
é cortado numa tela curta). O respiro da página vai no token:

| Var | Default | Papel |
|---|---|---|
| `--w-tab-viewport-padding` | `0` | `padding` da área rolável de cada aba |

```css
.app-layout__main { display: flex; flex-direction: column; min-height: 0; overflow: hidden; }
:root { --w-tab-viewport-padding: var(--spacing-xl); }
```

### Animação de entrada da página

Cada pane entra com fade + leve deslocamento (o `v-show` alterna `display`, e a animação
CSS reinicia sempre que o pane volta a ser renderizado — cobre a primeira abertura **e** a
troca entre abas). Calibragem via CSS vars do app consumidor, com fallbacks locais:

| Var | Default | Papel |
|---|---|---|
| `--w-tab-enter-duration` | `var(--motion-slow, 380ms)` | duração; `0s` desliga |
| `--w-tab-enter-ease` | `var(--ease-spring, cubic-bezier(0.34, 1.4, 0.64, 1))` | curva da entrada |

`prefers-reduced-motion: reduce` desativa a animação automaticamente.

## API — WTabNav

<ApiTable name="WTabNav" />

## API — WTabViewport

<ApiTable name="WTabViewport" />

## Exemplo — layout do app

```vue
<script setup lang="ts">
import { WTabNav, WTabViewport } from '@wgalleti/primevue-components'
import { tabsApi } from '@/composable/useAppTabs' // instância única do useRouteTabs
</script>

<template>
  <div class="p-main">
    <WTabNav :tabs="tabsApi" aria-label="Telas abertas" />
    <WTabViewport :tabs="tabsApi" />
  </div>
</template>
```

## Dentro de uma tela — `useTabHost()`

```vue
<script setup lang="ts">
import { useTabHost } from '@wgalleti/primevue-components'

const host = useTabHost() // null fora de abas — tudo degrada para o padrão

// Título dinâmico da aba ("NF 000123"); null restaura o default da rota
watchEffect(() => host?.setTitle(nota.value?.numero))

// Dialog pendurado NA aba (some e volta com ela, intacto)
// <Dialog :append-to="host?.hostEl.value ?? 'body'" ... />

// Veto ao fechar (alterações não salvas)
host?.registerCloseGuard(() => !temMudancas.value || confirmarDescarte())
</script>
```
