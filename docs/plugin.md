# Plugin e Configuracao

## Registro do Plugin

O plugin deve ser registrado **após** PrimeVue, ToastService e ConfirmationService.

```typescript
// main.ts
import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import api from './plugins/axios'

const app = createApp(App)

// PrimeVue primeiro
app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)

// Depois o plugin da lib
app.use(WPrimeVuePlugin, {
  axios: api,
})
```

## Opcoes do Plugin

```typescript
interface WPluginOptions {
  /**
   * Instancia axios configurada do projeto.
   * A lib NAO cria axios proprio — usa este.
   * Obrigatorio.
   */
  axios: AxiosInstance

  /**
   * Tamanho padrao de paginas em listagens.
   * Default: 20
   */
  defaultPageSize?: number

  /**
   * Formato de data para exibicao.
   * Default: 'DD/MM/YYYY'
   */
  dateFormat?: string

  /**
   * Formato de data+hora para exibicao.
   * Default: 'DD/MM/YYYY HH:mm'
   */
  dateTimeFormat?: string

  /**
   * Locale para formatacao de numeros e moeda.
   * Default: 'pt-BR'
   */
  locale?: string

  /**
   * Moeda para formatacao de valores monetarios.
   * Default: 'BRL'
   */
  currency?: string
}
```

## Como Funciona

O plugin faz `app.provide()` das configuracoes, que sao acessadas internamente pelos composables via `inject()`:

```
WPrimeVuePlugin.install()
  ├── provide('w-axios', options.axios)
  ├── provide('w-config', { pageSize, dateFormat, ... })
  └── registra componentes globais (opcional)
```

Os composables da lib nunca importam axios diretamente — sempre usam:

```typescript
const axios = inject<AxiosInstance>('w-axios')
```

Isso garante que cada projeto controla sua propria configuracao de auth, headers, interceptors, base URL, etc.

## Registro Global de Componentes (opcional)

Por padrao o plugin registra os componentes globalmente. Para desabilitar:

```typescript
app.use(WPrimeVuePlugin, {
  axios: api,
  registerComponents: false, // import manual nos templates
})
```

Sem registro global, importe diretamente:

```vue
<script setup>
import { WCrudView } from '@wgalleti/primevue-components'
</script>
```

## Heranca de Fontes (Tipografia)

A biblioteca **nao define `font-family`** em nenhum componente — ela depende inteiramente da heranca CSS do projeto host. Porem, o PrimeVue **teleporta** certos componentes (Dialog, Popover, OverlayPanel, etc.) diretamente para o `<body>`, quebrando a cadeia de heranca CSS.

### O Problema

Quando voce define uma fonte customizada (ex: Satoshi, Inter, etc.) no elemento raiz da aplicacao (`#app`), os componentes teleportados nao herdam essa fonte porque sao renderizados fora da arvore DOM do `#app`:

```
<body>
  <div id="app">          ← fonte customizada aplicada aqui
    <WCrudView />         ← herda a fonte ✅
  </div>

  <!-- PrimeVue teleporta Dialogs para ca -->
  <div class="p-dialog">  ← NAO herda a fonte ❌
    <WCrudFormDialog />
  </div>
</body>
```

### A Solucao

Adicione no CSS global do seu projeto a regra de heranca tanto no `body` quanto no seletor `.p-component` (classe que o PrimeVue aplica em todos os seus widgets, incluindo overlays teleportados):

```css
/* Defina a fonte no html */
html {
  font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
}

/* Garanta heranca em componentes teleportados */
body,
.p-component {
  font-family: inherit;
}
```

### Por que `.p-component`?

O PrimeVue adiciona a classe `.p-component` em **todos** os seus componentes renderizados, incluindo:

- `Dialog` (teleportado ao `<body>`)
- `Popover` / `OverlayPanel` (teleportado ao `<body>`)
- `Toast` (teleportado ao `<body>`)
- `ConfirmDialog` (teleportado ao `<body>`)
- Componentes inline (DataTable, InputText, etc.)

Usar `body, .p-component { font-family: inherit; }` garante que **todos** esses componentes respeitem a fonte definida no `html`, independente de onde estejam na arvore DOM.

### Exemplo Completo (Tailwind + PrimeVue)

Se voce usa Tailwind com CSS layers:

```css
/* styles/base.css */
@layer components {
  /* ... seus estilos de componente ... */
}

html {
  @apply antialiased scroll-smooth;
  font-family: 'Satoshi', system-ui, -apple-system, sans-serif;
}

body,
.p-component {
  font-family: inherit;
}
```

> **Nota:** Esta regra deve ficar **fora** de `@layer` para ter especificidade suficiente e nao ser sobrescrita por estilos do PrimeVue.
