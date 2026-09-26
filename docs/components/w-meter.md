# WMeter

Meta de painel: o **realizado contra a meta**, com percentual, barra e o **marcador de ritmo**
— onde o valor deveria estar hoje. Serve para "vendas do mês × meta", "captações × meta" e
qualquer contador com alvo no período.

- Valor e meta no formato pedido (`currency`, `number`, `percent`), em notação compacta por
  padrão: `R$ 1,2 mi de R$ 2 mi`.
- Percentual atingido arredondado para baixo (99,6% não aparece como 100%); acima da meta a
  barra fica cheia e o percentual mostra o real (`120%`).
- Sem meta (`goal` nulo ou 0): só o valor e "sem meta", sem barra.
- Acessível: a barra é `role="meter"` com `aria-valuenow/min/max` e `aria-valuetext`
  ("R$ 1,2 mi de R$ 2 mi (60%), esperado hoje: R$ 1 mi"); o traço do ritmo é decorativo e o
  texto dele vai para o leitor de tela.

## API

<ApiTable name="WMeter" />

## Cor automática

Sem `severity`, a cor sai do ritmo (`meterSeverity`, exportado):

| Situação | Cor |
|---|---|
| sem meta | `neutral` |
| valor ≥ ritmo | `success` |
| até 10% abaixo do ritmo | `warning` |
| mais de 10% abaixo do ritmo | `danger` |
| sem ritmo, meta batida | `success` |
| sem ritmo, abaixo da meta | `primary` (em andamento) |

## Exemplo

```vue
<WMeter
  label="Vendas do mês"
  :value="1_200_000"
  :goal="2_000_000"
  :expected="1_100_000"
  format="currency"
  hint="Dia 16 de 30"
  :to="{ name: 'vendas' }"
/>
```

Clicável sem rota (abre um detalhe na mesma tela) — com listener o cartão fica focável e
responde a Enter/Espaço:

```vue
<WMeter label="Captações" :value="14" :goal="40" :expected="22" @click="abrirDetalhe" />
```

Grade densa de metas: `size="compact"`.
