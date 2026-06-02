# Playground visual — wPrimeVueComponents

Doc visual interativa (HTML estático). **Não precisa de build.**

## Publicar (GitHub Pages, via o VitePress que já existe)

1. Esta pasta deve ficar em `docs/public/visual/` do repositório.
2. (Opcional) adicione no menu, em `docs/.vitepress/config.ts`:

   ```ts
   nav: [
     // ...
     { text: 'Playground visual ↗', link: '/visual/index.html', target: '_self' },
   ]
   ```

3. `git add docs/public/visual && git commit -m "docs: playground visual" && git push`

O workflow `Deploy Docs` já existente publica tudo. Em ~1 min fica em:

```
https://wgalleti.github.io/wPrimeVueComponents/visual/
```

> Todos os caminhos são relativos — funciona sob o `base` do VitePress sem ajuste.

## Estrutura

- `index.html` — visão geral + catálogo
- `guia.html` — guia, setup e migração
- `playground.html` — Schema Playground (monta `FieldDef[]`/`ColumnDef[]` ao vivo)
- `c/*.html` — uma página por componente/composable
- `assets/registry-*.js` — metadados (props/slots/eventos/exemplos)
- `assets/renderers-*.js` — render dos componentes (fiel ao `src/`)

Para adicionar/editar um componente: ajuste o registry + renderer correspondente.
