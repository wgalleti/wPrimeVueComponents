# WProgress

Progresso de **carregamento**, no lugar de `ProgressBar`: importação, envio, espera de tela.

- Com `value` (0 a 100) é determinado; sem `value`, indeterminado.
- `role="progressbar"` com `aria-valuenow` (só no determinado) e `aria-valuetext`.
- `size="bar"` (padrão) mostra a barra e a legenda; `strip` é o filete fino para o topo de card
  ou tabela.
- **Não é `WMeter`.** O [WMeter](/components/w-meter) mostra realizado contra meta, com ritmo e
  cor por severidade. `WProgress` só diz que algo está andando.

## API

<ApiTable name="WProgress" />

## Exemplo

```vue
<WProgress :value="percentual" label="Importando" />
<WProgress size="strip" label="Carregando" />
```
