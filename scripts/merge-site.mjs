/**
 * Monta o site publicado no GitHub Pages: as docs (VitePress) na raiz e o
 * playground como sub-site em /playground/. Um deploy só, um domínio só —
 * os clientes chegam nas docs e abrem o playground pelo menu.
 *
 * Uso: yarn site:build  (docs:build + playground:build + este script)
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const docsDist = path.join(root, 'docs/.vitepress/dist')
const playgroundDist = path.join(root, 'playground/dist')
const target = path.join(docsDist, 'playground')

for (const [nome, dir] of [['docs', docsDist], ['playground', playgroundDist]]) {
  if (!fs.existsSync(path.join(dir, 'index.html'))) {
    console.error(`✗ build do ${nome} ausente em ${path.relative(root, dir)}`)
    process.exit(1)
  }
}

fs.rmSync(target, { recursive: true, force: true })
fs.cpSync(playgroundDist, target, { recursive: true })
console.log(`✓ playground copiado para ${path.relative(root, target)}`)
