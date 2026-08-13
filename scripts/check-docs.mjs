/**
 * Gate do checklist de componente (ver CLAUDE.md).
 *
 * Para cada componente do manifest, exige sidecar, página VitePress com <ApiTable>,
 * entrada no sidebar e export no barrel. Teste ainda é AVISO — a biblioteca tem
 * débito histórico nos componentes de apresentação; vira erro quando zerar.
 *
 * Uso: node scripts/check-docs.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifestPath = path.join(root, 'src/generated/component-meta.json')

if (!fs.existsSync(manifestPath)) {
  console.error('✗ manifest ausente — rode `yarn meta` antes.')
  process.exit(1)
}

const componentes = JSON.parse(fs.readFileSync(manifestPath, 'utf8')).components

const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))

const arquivos = walk(path.join(root, 'src/components'))
const docsDir = path.join(root, 'docs/components')
const paginas = fs.readdirSync(docsDir)
const conteudo = Object.fromEntries(paginas.map((p) => [p, fs.readFileSync(path.join(docsDir, p), 'utf8')]))
const sidebar = fs.readFileSync(path.join(root, 'docs/.vitepress/config.ts'), 'utf8')
const barrel =
  fs.readFileSync(path.join(root, 'src/components/index.ts'), 'utf8') +
  fs.readFileSync(path.join(root, 'src/index.ts'), 'utf8')

/** `WTabBar` → `w-tab-bar` (o prefixo W vira segmento próprio, como nas páginas existentes). */
const kebab = (nome) =>
  nome
    .replace(/^W(?=[A-Z])/, 'W-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()

const erros = []
const avisos = []

for (const nome of Object.keys(componentes)) {
  const temArquivo = (sufixo) => arquivos.some((f) => f.endsWith(`${path.sep}${nome}${sufixo}`))

  // A página pode ser própria (w-nome.md) ou compartilhada (ex.: WStepSection em w-step-flow.md),
  // desde que traga o <ApiTable> do componente.
  const pagina =
    paginas.find((p) => p === `${kebab(nome)}.md` && conteudo[p].includes(`<ApiTable name="${nome}"`)) ??
    paginas.find((p) => conteudo[p].includes(`<ApiTable name="${nome}"`))

  if (!temArquivo('.meta.ts')) erros.push(`${nome}: falta o sidecar ${nome}.meta.ts`)
  if (!pagina) erros.push(`${nome}: falta a página em docs/components/${kebab(nome)}.md com <ApiTable name="${nome}" />`)
  else if (!sidebar.includes(`/components/${pagina.replace('.md', '')}'`))
    erros.push(`${nome}: página ${pagina} fora do sidebar (docs/.vitepress/config.ts)`)
  if (!barrel.includes(nome)) erros.push(`${nome}: não exportado no barrel`)
  if (!temArquivo('.test.ts')) avisos.push(nome)
}

for (const pagina of paginas) {
  const casa = Object.keys(componentes).some((nome) => conteudo[pagina].includes(`<ApiTable name="${nome}"`))
  if (!casa) erros.push(`docs/components/${pagina}: página órfã — nenhum <ApiTable> de componente do manifest`)
}

if (avisos.length) {
  console.warn(`⚠ ${avisos.length} componente(s) sem teste: ${avisos.join(', ')}`)
}

if (erros.length) {
  console.error(`\n✗ checklist de componente violado (${erros.length}):`)
  for (const e of erros) console.error(`  - ${e}`)
  console.error('\nVer "Checklist de componente novo" no CLAUDE.md.')
  process.exit(1)
}

console.log(`✓ docs completas para ${Object.keys(componentes).length} componentes`)
