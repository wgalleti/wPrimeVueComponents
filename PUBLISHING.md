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

O build e a verificação de tipos rodam automaticamente antes de publicar
(`prepublishOnly` + o script `release`). Os atalhos `release:*` fazem o bump
de versão, criam o commit/tag e publicam em um único comando:

```bash
# Correção de bug → 0.3.3 -> 0.3.4
yarn release:patch

# Nova funcionalidade retrocompatível → 0.3.3 -> 0.4.0
yarn release:minor

# Quebra de API pública → 0.3.3 -> 1.0.0
yarn release:major
```

Cada atalho executa:
1. `yarn version --<tipo>` — bump em `package.json`, commit e tag git locais.
2. `yarn release` — `type-check` → `build` → `npm publish` (com `access: public`).

Depois, envie commit e tag para o repositório:

```bash
git push --follow-tags
```

## Release manual (passo a passo)

Se preferir controlar cada etapa:

```bash
yarn version --new-version X.Y.Z   # bump + commit + tag
yarn release                       # type-check + build + npm publish
git push --follow-tags
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
