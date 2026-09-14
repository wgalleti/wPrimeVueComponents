# WTabNav / WTabViewport

Navegação por abas de **rota** (estilo browser/ERP): cada rota aberta vira uma aba viva —
trocar de aba preserva o estado da tela, e cada aba fecha (X, botão do meio) e recarrega
pelo menu (com "fechar outras" e "fechar todas"), aberto pelo botão direito ou pelo `⋮`
que aparece na aba no hover/ativa. Não confundir com o
[WTabBar](/components/w-tab-bar), que é abas de seção *dentro* de uma tela.

O par funciona junto e todo o estado vem do composable
[useRouteTabs](/composables/use-route-tabs), passado por prop:

- **WTabNav** — a barra: lista as abas, ativa, fecha, menu de contexto, overflow com
  rolagem horizontal (a aba ativa se mantém à vista) e teclado ←/→ (padrão ARIA de tablist).
  Abas com `group` (via `resolveTabMeta`) ficam contíguas, com o rótulo do grupo antes do
  bloco — o eco dos módulos do menu (Sementes, Estoque…) — e ganham uma **cor por grupo**.
- **WTabViewport** — os painéis: substitui o `<RouterView>` do layout. Cada aba hidratada
  fica **montada** num wrapper `v-show` (não `KeepAlive`): o DOM não sai da árvore, então
  um Dialog com `appendTo` no container da aba sobrevive intacto à troca. Cada pane recebe
  um snapshot **congelado** da rota — `useRoute()` da tela oculta não reage à navegação
  global — e fornece o contexto `useTabHost()` (título dinâmico, `appendTo`, close guards).

### Cor por grupo

Cada grupo tem uma cor, usada **só em acentos** para o texto seguir neutro e legível: o
ponto antes do rótulo do grupo, o ícone das abas do bloco e o fio + tint da aba ativa.

Sem configuração, o grupo cai numa de **6 séries** (escolha estável por hash do nome — o
mesmo módulo tem sempre a mesma série), e a cor da série N é resolvida em cascata:

```
var(--w-tab-group-N, var(--viz-N, <oklch da suite>))     N = 1..6
```

1. `--w-tab-group-N` — token específico do app para as abas;
2. `--viz-N` — a série categórica da paleta do app (a mesma dos gráficos);
3. o OKLCH da suite (azul, verde, laranja, ciano, âmbar, terracota — sem roxo nem rosa,
   que colidiria com `--danger`).

Assim a paleta é do app, não da suite. Para todos os grupos na cor primária:

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

A cor chega ao CSS como `--w-tab-group-color` no item e no rótulo — dá para estender os
acentos no app sem tocar na suite.

### Alvos de toque

Os botões "Opções de <aba>" (⋮) e "Fechar <aba>" (X) têm caixa clicável de **28×28px**
(`--w-tabnav-btn`, mínimo de alvo no desktop) com o ícone pequeno dentro; a faixa segue
com 40px (`--w-tabnav-h`) porque o item centraliza a caixa.

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
