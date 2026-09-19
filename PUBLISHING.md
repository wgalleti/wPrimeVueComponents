# Publicando no npm

Pacote: **`@wgalleti/primevue-components`** — publicado manualmente (sem CI).

## Pré-requisitos (uma vez)

1. Conta npm com acesso ao escopo `@wgalleti`.
2. Login local:
   ```bash
   npm login
   ```
3. Confirme quem está logado:
   ```bash
   npm whoami
   ```

## Fluxo de release

Dois comandos. O primeiro só mexe localmente; o segundo publica tudo.

```bash
# 1. Bump + CHANGELOG + commit "chore(release): X.Y.Z" + tag vX.Y.Z (commit-and-tag-version,
#    versão deduzida dos commits: fix → patch, feat → minor, BREAKING CHANGE → major)
yarn release            # ou release:patch / release:minor / release:major para forçar
yarn release:dry        # só mostra o que faria

# 2. npm publish (prepublishOnly roda type-check + test + build) → git push --follow-tags
#    → deploy do site no GitHub Pages (docs + playground), acompanhado até o fim
yarn release:publish
```

O deploy do site é o workflow `.github/workflows/docs.yml`, que dispara no push da
main; `yarn site:deploy` (chamado pelo `release:publish`) encontra a rodada do commit,
espera terminar e **falha se o deploy falhar** — o pacote npm já saiu, então corrija e
rode `yarn site:deploy` de novo. Para testar o site antes: `yarn site:build` +
`yarn docs:preview` (docs em `/wPrimeVueComponents/`, playground em `/playground/`).

## Release manual (passo a passo)

Se preferir controlar cada etapa:

```bash
yarn commit-and-tag-version --release-as X.Y.Z --skip.commit --skip.tag   # bump + CHANGELOG
# revise o CHANGELOG.md, depois:
git add package.json CHANGELOG.md && git commit -m "chore(release): X.Y.Z" && git tag -a vX.Y.Z -m vX.Y.Z
npm publish --registry https://registry.npmjs.org/
git push --follow-tags origin main
yarn site:deploy
```

Ou, sem usar os scripts:

```bash
yarn type-check
yarn build
npm publish --access public
```

## Verificações

- `package.json` **não** deve conter `"private": true`.
- `publishConfig.access` está como `"public"` (escopo publica como público).
- Apenas a pasta `dist/` é publicada (campo `files`).
- Confira o conteúdo antes de publicar:
  ```bash
  npm pack --dry-run
  ```

## Troubleshooting

### `ENEEDAUTH` apontando para `registry.yarnpkg.com`

Ao rodar `npm publish` **dentro de um script do yarn** (ex.: `yarn release`), o
yarn injeta `npm_config_registry=https://registry.yarnpkg.com` no ambiente — um
proxy somente-leitura, onde a publicação falha com `ENEEDAUTH`.

Por isso o script `release` força o registry correto:

```
npm publish --registry https://registry.npmjs.org/
```

E o `package.json` também declara `publishConfig.registry`. Se publicar
manualmente sob o yarn, use sempre a flag `--registry https://registry.npmjs.org/`.

### Re-publicar uma versão que falhou no publish

Se o `release:patch` bumpou a versão e criou o tag, mas o `npm publish` falhou,
**não bumpe de novo**. Apenas republique a versão atual:

```bash
yarn release
```

## Versionamento (SemVer)

| Mudança | Bump | Exemplo |
|---|---|---|
| Correção de bug | patch | 0.3.3 → 0.3.4 |
| Funcionalidade retrocompatível | minor | 0.3.3 → 0.4.0 |
| Quebra de API pública | major | 0.3.3 → 1.0.0 |

> Não quebre a API pública sem bump de major version.
