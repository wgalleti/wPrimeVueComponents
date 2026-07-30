# Instalação

## Requisitos

| Dependência | Versão |
|---|---|
| Vue | ^3.4 |
| PrimeVue | ^4.0 |
| Axios | ^1.0 |
| dayjs | ^1.11 |
| Node.js | ^18.0 |

## Setup rápido (CLI)

Depois de instalar, rode na raiz do app consumidor:

```bash
npx @wgalleti/primevue-components init
```

Ele checa as peer deps, registra o `WPrimeVuePlugin` + o CSS no seu `main` (idempotente — complementa só o que falta, com backup `.bak`) e instala a skill do Claude Code em `.claude/skills/wpvc/`. `--dry-run` mostra o que faria sem escrever; `--force` sobrescreve a skill.

## Instalação via Git

```bash
yarn add @wgalleti/primevue-components@git+https://github.com/wgalleti/wPrimeVueComponents.git
```

Para fixar uma versão específica:

```bash
yarn add @wgalleti/primevue-components@git+https://github.com/wgalleti/wPrimeVueComponents.git#v1.0.0
```

## Instalação via Link Local (desenvolvimento)

```bash
# No diretório da lib
cd wPrimeVueComponents
yarn install
yarn build
yarn link

# No seu projeto
cd seu-projeto
yarn link @wgalleti/primevue-components
```

## Atualização

```bash
# Git dependency
yarn upgrade @wgalleti/primevue-components

# Link local — rebuild e o link atualiza automaticamente
cd wPrimeVueComponents
yarn build
```

## Verificação

Após instalar, verifique que o import funciona e que o CSS foi importado uma vez no `main`:

```typescript
import { WCrudView, useCrudManager } from '@wgalleti/primevue-components'
import '@wgalleti/primevue-components/style.css'
```

Se usar TypeScript, os tipos devem ser reconhecidos automaticamente via `exports` do package.json.
