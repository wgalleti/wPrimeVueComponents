# WTabNav / WTabViewport

Navegação por abas de **rota** (estilo browser/ERP): cada rota aberta vira uma aba viva —
trocar de aba preserva o estado da tela, e cada aba fecha (X, botão do meio) e recarrega
pelo menu de contexto (com "fechar outras" e "fechar todas"). Não confundir com o
[WTabBar](/components/w-tab-bar), que é abas de seção *dentro* de uma tela.

O par funciona junto e todo o estado vem do composable
[useRouteTabs](/composables/use-route-tabs), passado por prop:

- **WTabNav** — a barra: lista as abas, ativa, fecha, menu de contexto, overflow com
  rolagem horizontal (a aba ativa se mantém à vista) e teclado ←/→ (padrão ARIA de tablist).
  Abas com `group` (via `resolveTabMeta`) ficam contíguas, com o rótulo do grupo antes do
  bloco — o eco dos módulos do menu (Sementes, Estoque…).
- **WTabViewport** — os painéis: substitui o `<RouterView>` do layout. Cada aba hidratada
  fica **montada** num wrapper `v-show` (não `KeepAlive`): o DOM não sai da árvore, então
  um Dialog com `appendTo` no container da aba sobrevive intacto à troca. Cada pane recebe
  um snapshot **congelado** da rota — `useRoute()` da tela oculta não reage à navegação
  global — e fornece o contexto `useTabHost()` (título dinâmico, `appendTo`, close guards).

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
