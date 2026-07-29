// Gera o manifest de metadata dos componentes a partir dos SFCs tipados, via
// vue-component-meta (ferramenta oficial do Volar). Fonte de verdade única que
// alimenta o <ApiTable> (docs) e o <ComponentWorkbench> (playground).
//
//   node scripts/gen-component-meta.mjs --write   # regenera src/generated/component-meta.json
//   node scripts/gen-component-meta.mjs --check    # falha (exit 1) se estiver desatualizado (CI)
//
// Props/events/slots/defaults/descrições saem 100% do código-fonte — escreva
// JSDoc nas props para documentá-las. Categoria/ícone/exemplos ficam nos
// sidecars *.meta.ts (importados ao vivo pelos consumidores, não neste manifest).
//
import { createChecker } from 'vue-component-meta'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(root, 'src/generated/component-meta.json')
const mode = process.argv.includes('--check') ? 'check' : 'write'

const checker = createChecker(path.join(root, 'tsconfig.json'), {
  forceUseTs: true,
  printer: { newLine: 1 },
})

function walk(dir) {
  const out = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...walk(p))
    else if (entry.name.endsWith('.vue')) out.push(p)
  }
  return out
}

const files = walk(path.join(root, 'src/components')).sort()
const components = {}

for (const file of files) {
  const name = path.basename(file, '.vue')
  const meta = checker.getComponentMeta(file)
  components[name] = {
    file: path.relative(root, file).replace(/\\/g, '/'),
    props: meta.props
      .filter((p) => !p.global) // descarta atributos HTML herdados
      .map((p) => ({
        name: p.name,
        type: p.type,
        required: p.required,
        default: p.default ?? null,
        description: (p.description || '').trim(),
      })),
    events: meta.events.map((e) => ({
      name: e.name,
      type: e.type,
      description: (e.description || '').trim(),
    })),
    slots: meta.slots.map((s) => ({
      name: s.name,
      type: s.type,
      description: (s.description || '').trim(),
    })),
  }
}

const manifest = {
  // NÃO editar à mão — gerado por `yarn meta`.
  $generatedBy: 'scripts/gen-component-meta.mjs',
  components,
}
const json = JSON.stringify(manifest, null, 2) + '\n'

if (mode === 'check') {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : ''
  if (current !== json) {
    console.error(
      '✖ src/generated/component-meta.json está desatualizado. Rode `yarn meta` e commite.',
    )
    process.exit(1)
  }
  console.log(`✓ manifest atualizado (${Object.keys(components).length} componentes)`)
} else {
  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, json)
  console.log(
    `✓ ${Object.keys(components).length} componentes → ${path.relative(root, OUT)}`,
  )
}
