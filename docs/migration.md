# Migracao de Projetos Existentes

Guia para migrar WorkHard e DojoHub para usar `@wgalleti/primevue-components`.

## Mapeamento de Imports

### WorkHard

| Antes | Depois |
|---|---|
| `import { useCrud } from '@/composables/useCrud'` | `import { useCrudManager } from '@wgalleti/primevue-components'` |
| `import { useApi } from '@/composables/useApi'` | `import { useApi } from '@wgalleti/primevue-components'` |
| `import { useFormatters } from '@/composables/useFormatters'` | `import { useFormatters } from '@wgalleti/primevue-components'` |
| `import { useAppToast } from '@/composables/useAppToast'` | `import { useAppToast } from '@wgalleti/primevue-components'` |
| `import { useApiError } from '@/composables/useApiError'` | `import { useApiError } from '@wgalleti/primevue-components'` |
| `import CrudView from '@/components/ui/CrudView.vue'` | `import { WCrudView } from '@wgalleti/primevue-components'` |
| `import CrudFormDialog from '@/components/ui/CrudFormDialog.vue'` | `import { WCrudFormDialog } from '@wgalleti/primevue-components'` |
| `import AutoCompleteFK from '@/components/ui/AutoCompleteFK.vue'` | `import { WAutoCompleteFK } from '@wgalleti/primevue-components'` |
| `import type { CrudColumn } from '@/types/shared/crud'` | `import type { ColumnDef } from '@wgalleti/primevue-components'` |
| `import type { CrudFormField } from '@/types/shared/crud'` | `import type { FieldDef } from '@wgalleti/primevue-components'` |

### DojoHub

| Antes | Depois |
|---|---|
| `import { useCrudManager } from '@/composables/useCrudManager'` | `import { useCrudManager } from '@wgalleti/primevue-components'` |
| `import DojoCrudView from '@/components/DojoCrudView.vue'` | `import { WCrudView } from '@wgalleti/primevue-components'` |
| `import DojoCrudFormDialog from '@/components/DojoCrudFormDialog.vue'` | `import { WCrudFormDialog } from '@wgalleti/primevue-components'` |
| `import AutoCompleteFK from '@/components/AutoCompleteFK.vue'` | `import { WAutoCompleteFK } from '@wgalleti/primevue-components'` |
| `import DojoImageCropper from '@/components/DojoImageCropper.vue'` | `import { WImageCropper } from '@wgalleti/primevue-components'` |

## Mudancas de API

### Renomeacao de Tipos

| WorkHard | DojoHub | Biblioteca |
|---|---|---|
| `CrudColumn` | `ColumnDef` | `ColumnDef` |
| `CrudFormField` | `FieldDef` | `FieldDef` |
| `CrudRowAction` | `RowAction` | `RowAction` |
| `CrudConfig` | `CrudManagerConfig` | `CrudManagerConfig` |
| `CrudReturn` | `CrudManager` | `CrudManagerReturn` |

### Composable Principal

**WorkHard** usa `useCrud()` — renomear para `useCrudManager()`:

```typescript
// Antes (WorkHard)
const crud = useCrud<Produto>({ endpoint: '...', columns, form })

// Depois
const crud = useCrudManager<Produto>({ endpoint: '...', columns, form })
```

**DojoHub** ja usa `useCrudManager()` — sem mudanca.

### Componentes no Template

```vue
<!-- Antes (WorkHard) -->
<CrudView :crud="crud" title="Produtos" />

<!-- Antes (DojoHub) -->
<DojoCrudView :crud="crud" title="Produtos" />

<!-- Depois -->
<WCrudView :crud="crud" title="Produtos" />
```

### Setup do Plugin

Ambos os projetos precisam adicionar o plugin no `main.ts`:

```typescript
import { WPrimeVuePlugin } from '@wgalleti/primevue-components'
import api from './plugins/axios'

app.use(WPrimeVuePlugin, { axios: api })
```

E remover a instancia axios dos composables locais (a lib usa a injetada).

## Passos de Migracao

### 1. Instalar a lib

```bash
yarn add @wgalleti/primevue-components@git+https://github.com/wgalleti/wPrimeVueComponents.git
```

### 2. Registrar o plugin

Adicionar `WPrimeVuePlugin` no `main.ts` (veja [Plugin](./plugin.md)).

### 3. Atualizar imports view por view

Migrar uma view de cada vez:
1. Trocar imports dos composables e componentes
2. Renomear tipos se necessario
3. Trocar nomes dos componentes no template
4. Testar a view

### 4. Remover codigo local

Apos migrar todas as views, remover:
- `src/composables/useCrud.ts` (ou `useCrudManager.ts`)
- `src/composables/useApi.ts`
- `src/composables/useFormatters.ts`
- `src/composables/useAppToast.ts`
- `src/composables/useApiError.ts`
- `src/components/ui/CrudView.vue` (ou `DojoCrudView.vue`)
- `src/components/ui/CrudFormDialog.vue` (ou `DojoCrudFormDialog.vue`)
- `src/components/ui/CrudColumnRenderer.vue`
- `src/components/ui/AutoCompleteFK.vue`
- `src/types/shared/crud.ts` (ou `src/types/crud.ts`)

### 5. Verificar

```bash
yarn type-check
yarn build
# Testar manualmente as views migradas
```

### 6. Configurar heranca de fontes

A biblioteca nao define `font-family` — depende da heranca CSS do host. Como o PrimeVue teleporta Dialogs e overlays para `<body>`, adicione no CSS global:

```css
html {
  font-family: 'SuaFonte', system-ui, sans-serif;
}

body,
.p-component {
  font-family: inherit;
}
```

Sem isso, modais e overlays renderizarao com a fonte padrao do navegador. Veja detalhes em [Plugin — Heranca de Fontes](./plugin.md#heranca-de-fontes-tipografia).

## Migrando para o CSS por tokens (0.33+)

A partir da versão com `tokens.css`, todo valor do CSS da suíte sai de `--w-*` (ver
[Classes CSS e tokens](/css/classes)). O que muda para quem já usa:

- **Nada quebra no import**: continua `import '@wgalleti/primevue-components/style.css'`.
- **App com folha de tokens** (`--fg`, `--space-2`, `--control-h`, `--success`… no `:root` ou em
  `html[data-*]`): continua mandando, sem alteração.
- **Sobrescrita do nome curto abaixo do `<html>`** (`.compacto { --control-h: 32px }`): deixa de
  chegar à suíte. Troque pelo token da suíte no mesmo lugar: `.compacto { --w-control-h: 2rem }`.
- **Breakpoints** dos componentes passaram de 640/768/900/1279px para a régua de três cortes
  599/839/1199px (celular · tablet retrato · tablet paisagem). Telas entre 768 e 839px passam a
  receber o layout de retrato.
- **Espaçamentos e fontes normalizados** na escala (diferenças de 1–2px em alguns componentes
  antigos: `--space-3` era 12 ou 14px conforme o lugar, agora é 12px).
- **`text-right`/`text-center`** nas colunas: a suíte agora alinha por `w-col-right`/`w-col-center`
  (próprias), e continua emitindo as antigas — se o app as definia só para a suíte funcionar,
  pode apagar.
- **Patch local do Esc em dialogs empilhados** (`Dialog.methods.onKeyDown`): apague — o plugin
  faz isso (`patchDialogEscape`, default `true`).

## Migrando de 2.x para 3.0

A 3.0.0 é uma major com três mudanças. Só a primeira exige alteração de CSS; a segunda é opt-in;
a terceira muda o comportamento padrão do `WCrudView` e pede uma conferência na tela antes de
subir. A API do `WTabNav`, do `useRouteTabs` e do `WCrudView` continua compatível.

### 1. Abas de rota com visual novo (`WTabNav`) — quebra visual

Nenhuma prop mudou; mudou o desenho da barra. Detalhes em [WTabNav](./components/w-tab-nav.md).

- **Aba ativa ligada ao conteúdo**: usa o fundo da página (`--w-tabnav-active-bg` → `--w-bg` →
  `--bg` do app), sem fio embaixo; a barra fica sobre `--w-surface`.
- **Ícone sempre colorido** (cor da aba, do grupo ou derivada da chave) e **rótulo de grupo em
  caixa natural**.
- **Sem rolagem horizontal nem máscara**: as abas que não cabem vão para o botão "Mais (n)"
  (dropdown); a ativa nunca sai da faixa.
- **`--w-tabnav-h` mudou de base** (aba + respiro de cima): 40px no padrão, 36px no
  `data-density="compact"`. A classe `w-tab-nav__item--grupo` foi removida.

O que o app faz:

- Definir **`--bg`** no `:root` com a cor do fundo da página — sem ele a aba ativa não emenda no
  painel.
- Pôr o **recuo lateral no wrapper da barra**, com a mesma superfície (`--surface`), **sem borda
  inferior** e com `min-width: 0` (a barra precisa encolher para o "Mais (n)" funcionar).
- Apagar overrides de borda/contorno sobre `.w-tab-nav` e qualquer regra sobre
  `.w-tab-nav__item--grupo`.
- Conferir, se o painel das abas tem fundo diferente do `--bg`:
  `:root { --w-tabnav-active-bg: var(--surface-2) }`.

### 2. Abas por espaço de trabalho (`scopeByGroup`) — aditivo, opt-in

Sem `scopeByGroup` nada muda: uma lista só, como na 2.x. Com ele, a barra mostra só as abas do
grupo ativo ([useRouteTabs](./composables/use-route-tabs.md#abas-por-espaco-de-trabalho)):

- novos no retorno: `visibleTabs` (o que a barra desenha), `activeGroup` e
  `activateGroup(group)`;
- `closeAll({ allGroups: true })` fecha as abas de todos os grupos (troca de organização, saída);
  sem o argumento, fecha só as do grupo ativo;
- fechar a aba ativa assume a vizinha **do mesmo grupo**; cada grupo lembra a última aba ativa.

```ts
export const tabsApi = useRouteTabs({
  router,
  scopeByGroup: true,
  resolveTabMeta: (r) => ({ title: tituloDaRota(r), group: appDaRota(r) }),
})

// seletor de espaços: volta à última aba do espaço ou cai na tela inicial dele
async function irPara(app: string) {
  if (!(await tabsApi.activateGroup(app))) await router.push(telaInicialDe(app))
}
```

### 3. Diálogo na URL — mudança de comportamento por padrão

Com `urlState` (o default), o `WCrudView` passa a gravar o diálogo aberto na query:

- criar → `?novo=1`; editar/ver → `?abrir=<pk>` (com o prefixo do `urlState`, quando houver, ex.:
  `?orc_abrir=<pk>`);
- F5 mantém o diálogo aberto e o link já abre com ele; id inexistente ou sem acesso limpa a
  chave e avisa;
- a URL é trocada por `router.replace`: o Voltar do navegador não fecha o diálogo. Só o estado
  "aberto" volta — o que foi digitado no formulário não.

**O que conferir no app antes de subir:**

1. **Duas `WCrudView` na mesma rota sem prefixo**: as duas reagiriam ao mesmo `abrir`. Dê
   `url-state="<prefixo>"` a cada uma.
2. **Tela que já lê `route.query.abrir`/`novo` por conta própria**: ou o cadastro tem `canCreate` e
   `canEdit` falsos e nenhuma ação `view` sem `handler` em `rowActions` (aí o `WCrudView` não lê,
   não escreve e não limpa essas chaves), ou a leitura própria sai e a tela passa a depender do
   `WCrudView`. Tela com slot `form-dialog` ou `handler` de edição próprio: o link abre pelo
   `openEditDialog` do manager — confira.
3. **Quem não quer o comportamento**: `:url-state="false"`. Atenção: desliga também busca,
   filtros e página na URL.
4. **Testes de ponta a ponta** que conferem a URL exata ou recarregam a página com um diálogo
   aberto — a query agora traz a chave do diálogo.

Opt-in por diálogo, fora do `WCrudView`: `WDialog` ganha `urlKey` (diálogo booleano, grava
`?<chave>=1`) — ver [WDialog](./components/w-dialog.md) — e há um composable público para ligar um
ref a uma chave da query (diálogo por id, gaveta) — ver [`useUrlParam`](./composables/use-url-param.md).

Dentro de uma aba de rota, `TabHostContext` ganhou `route` (opcional): a rota da própria aba, que
só muda enquanto ela é a ativa. Use `useTabHost()?.route` para ler a query da aba, não a global.

### Subindo para a 3.0

- [ ] Fixar `@wgalleti/primevue-components` em `3.0.0` (versão exata).
- [ ] Definir `--bg` no `:root` com o fundo da página.
- [ ] Mover o recuo lateral das abas para o wrapper (`--surface`, sem borda inferior,
      `min-width: 0`) e apagar overrides sobre `.w-tab-nav` e `.w-tab-nav__item--grupo`.
- [ ] Telas com duas `WCrudView` na mesma rota: um `url-state="<prefixo>"` para cada.
- [ ] Telas que leem `route.query.abrir`/`novo`: `canCreate`/`canEdit` falsos ou leitura própria
      removida; onde não se quer a URL, `:url-state="false"`.
- [ ] Ajustar os testes e2e que conferem a URL exata ou recarregam com diálogo aberto.
- [ ] Abrir o app e conferir: abas (ativa emendada ao painel, "Mais (n)" com a janela estreita)
      e F5 com diálogo aberto num cadastro; opcional, ligar `scopeByGroup`.

## Notas

- A migracao pode ser **incremental** — views nao migradas continuam usando o codigo local
- Nenhuma mudanca de backend e necessaria — a API de paginacao e a mesma
- Se um projeto tem customizacoes especificas nao suportadas pela lib, use os slots para manter o comportamento
