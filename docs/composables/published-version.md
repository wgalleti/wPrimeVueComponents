# Versão publicada

A aba aberta há dias descobre sozinha que o bundle dela deixou de ser o publicado e recarrega no
momento seguro — sem ninguém "limpar o cache".

## Três camadas

| Camada | Onde | Resolve |
|---|---|---|
| Cabeçalhos | nginx do front | `index.html` com `no-cache`; só `/assets/` com hash é `immutable`; chunk ausente é 404 |
| Chunk removido | `installPublishedVersion` | JS velho pedindo pedaço que o deploy apagou: **uma** recarga por build |
| Arquivo de versão | `wBuildIdentity` + `installPublishedVersion` | aba parada descobre a versão nova e recarrega na troca de tela ou na volta à aba |

## Instalação

```ts
// vite.config.ts
import { wBuildIdentity } from '@wgalleti/primevue-components/vite'

export default defineConfig({ plugins: [vue(), wBuildIdentity()] })
```

O plugin embute `__BUILD_ID__` (versão da esteira em `VITE_APP_VERSION`; sem ela, o carimbo do
build) e emite o mesmo valor em `version.json`, na raiz do dist. Declare o global:

```ts
// env.d.ts
declare const __BUILD_ID__: string
```

```ts
// router/index.ts — antes das outras guardas
import { installPublishedVersion } from '@wgalleti/primevue-components'

installPublishedVersion(router, {
  buildId: __BUILD_ID__,
  enabled: !import.meta.env.DEV,
  onBlocked: () => toast.warn('Há uma versão nova', 'Salve o que está aberto e abra a tela de novo.'),
})
```

## Quando recarrega

Só com **tudo** verdadeiro: versão nova lida há menos de 5 minutos, online e nenhum
[formulário pendente](./use-pending-form). A checagem dispara em paralelo à navegação (não
atrasa) e no máximo uma vez por minuto.

Não recarrega: na primeira navegação, quando a mesma tela muda a própria URL (filtro na query),
com resposta que não é `200` + JSON (página de manutenção durante o deploy) e depois de um
rollback (a versão volta a bater).

## Núcleo testável

`createPublishedVersion(deps)` não toca em globais — relógio, busca, armazenamento, online e
pendentes entram por parâmetro. `installPublishedVersion` só liga os eventos.
