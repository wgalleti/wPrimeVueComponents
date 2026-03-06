# Instalação

## Requisitos

| Dependência | Versão |
|---|---|
| Vue | ^3.4 |
| PrimeVue | ^4.0 |
| Axios | ^1.0 |
| dayjs | ^1.11 |
| Node.js | ^18.0 |

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

Após instalar, verifique que o import funciona:

```typescript
import { WCrudView, useCrudManager } from '@wgalleti/primevue-components'
```

Se usar TypeScript, os tipos devem ser reconhecidos automaticamente via `exports` do package.json.
