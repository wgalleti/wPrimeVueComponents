# WButton

Botão da suíte sobre o `Button` do PrimeVue. A tela escolhe o **papel** (`variant`) e o
**tamanho** (`size`); `severity`, `text` e `outlined` do PrimeVue não aparecem na tela.

| `variant` | Quando | Aparência |
|---|---|---|
| `primary` (padrão) | a ação principal da região — uma por região | cheio, cor primária |
| `secondary` | ação de apoio ao lado da primária | contorno |
| `ghost` | ação discreta: cancelar, limpar, ícone em linha de tabela | só texto, neutro (cinza) |
| `danger` | o destrutivo (excluir, remover) | vermelho; só-ícone fica em texto vermelho |

- `size`: `md` (padrão, altura do controle) ou `sm` (linha de tabela, barra, painel).
- `loading`: mostra o spinner, bloqueia o clique e marca `aria-busy`. A largura não muda: com
  ícone, o spinner toma o lugar do ícone; sem ícone, fica por cima do rótulo.
- `iconOnly`: só o ícone, redondo. **Exige `ariaLabel`** (em dev, a falta vira aviso no console).
- `to`: o botão vira `RouterLink` (exige vue-router).
- `type`: `button` por padrão — o botão não envia formulário sem `type="submit"`.
- Slot default substitui o conteúdo inteiro (ícone + rótulo).

Os componentes da suíte usam `WButton` por dentro, com a aparência que já tinham.

## API

<ApiTable name="WButton" />

## Exemplo

```vue
<script setup>
import { WButton } from '@wgalleti/primevue-components'
</script>

<template>
  <WButton variant="ghost" label="Cancelar" @click="fechar" />
  <WButton label="Salvar" icon="pi pi-check" :loading="salvando" type="submit" />
  <WButton variant="danger" icon="pi pi-trash" icon-only aria-label="Excluir" size="sm" />
  <WButton variant="secondary" label="Ver imóvel" :to="{ name: 'imovel', params: { id } }" />
</template>
```

## Link comum — `href`

Com `href` o botão vira `<a>` com a mesma aparência: telefone, e-mail, arquivo. `download` baixa
em vez de navegar (string = nome do arquivo); `target="_blank"` ganha
`rel="noopener noreferrer"`. Desabilitado (ou `loading`), o link perde o `href` e fica
`aria-disabled`.

```vue
<WButton variant="secondary" icon="pi pi-phone" label="Ligar" :href="`tel:${telefone}`" />
<WButton variant="ghost" icon="pi pi-envelope" label="E-mail" :href="`mailto:${email}`" />
<WButton icon="pi pi-download" label="Contrato" :href="url" download="contrato.pdf" />
```
