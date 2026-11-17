# WPageHeader

Cabecalho de pagina simples para titulo, subtitulo e acoes principais.

Em tela estreita (< 840 px) as ações descem para a linha de baixo do título e quebram linha: os
botões de texto dividem a largura, o botão só-ícone mantém o tamanho dele.

## API

<ApiTable name="WPageHeader" />

## Exemplo

```vue
<WPageHeader title="Alunos" subtitle="Gestao de alunos da academia">
  <template #actions>
    <Button label="Exportar" severity="secondary" />
  </template>
</WPageHeader>
```
