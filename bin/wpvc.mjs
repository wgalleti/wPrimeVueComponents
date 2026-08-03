#!/usr/bin/env node
// CLI de integração do @wgalleti/primevue-components em apps consumidores.
// Uso: npx @wgalleti/primevue-components init [--force] [--dry-run]
//      (ou, instalado: wpvc init)

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync, copyFileSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const PKG_ROOT = dirname(dirname(fileURLToPath(import.meta.url)))
const CWD = process.cwd()
const args = process.argv.slice(2)
const cmd = args[0]
const FORCE = args.includes('--force')
const DRY = args.includes('--dry-run')

const c = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
}
const log = (s = '') => console.log(s)
const ok = (s) => log(`  ${c.green('✓')} ${s}`)
const skip = (s) => log(`  ${c.dim('•')} ${c.dim(s)}`)
const warn = (s) => log(`  ${c.yellow('!')} ${s}`)
const write = (file, content) => {
  if (DRY) return log(`  ${c.dim('[dry-run] escreveria')} ${relative(CWD, file)}`)
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, content)
}

function copyDir(src, dest) {
  let copied = 0
  for (const entry of readdirSync(src)) {
    const s = join(src, entry)
    const d = join(dest, entry)
    if (statSync(s).isDirectory()) {
      copied += copyDir(s, d)
    } else {
      if (existsSync(d) && !FORCE) continue
      if (!DRY) {
        mkdirSync(dirname(d), { recursive: true })
        copyFileSync(s, d)
      }
      copied++
    }
  }
  return copied
}

function readJSON(file) {
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch {
    return null
  }
}

// --- passos -----------------------------------------------------------------

function stepSkill() {
  log(c.bold('\n• Skill (.claude/skills/wpvc)'))
  const src = join(PKG_ROOT, 'skill')
  if (!existsSync(src)) return warn('pasta skill/ não encontrada no pacote — pulei.')
  const dest = join(CWD, '.claude', 'skills', 'wpvc')
  const existed = existsSync(join(dest, 'SKILL.md'))
  const n = DRY ? '?' : copyDir(src, dest)
  if (existed && !FORCE) skip('skill já existe (use --force para sobrescrever)')
  else ok(`skill copiada (${n} arquivo(s)) → .claude/skills/wpvc/`)
}

function stepPeers() {
  log(c.bold('\n• Dependências (peers)'))
  const pkg = readJSON(join(CWD, 'package.json'))
  if (!pkg) return warn('package.json não encontrado no diretório atual.')
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  const peers = ['vue', 'primevue', 'axios', 'dayjs']
  const missing = peers.filter((p) => !deps[p])
  if (!deps['@wgalleti/primevue-components']) warn('@wgalleti/primevue-components não está nas deps deste projeto.')
  if (missing.length) warn(`peers ausentes: ${missing.join(', ')} — instale antes de usar.`)
  else ok('peers presentes (vue, primevue, axios, dayjs)')
}

function findMain() {
  for (const p of ['src/main.ts', 'src/main.mts', 'src/main.js', 'src/main.mjs']) {
    const full = join(CWD, p)
    if (existsSync(full)) return full
  }
  return null
}

function insertAfterLastImport(src, line) {
  const lines = src.split('\n')
  let last = -1
  for (let i = 0; i < lines.length; i++) if (/^\s*import\s/.test(lines[i])) last = i
  if (last === -1) return `${line}\n${src}`
  lines.splice(last + 1, 0, line)
  return lines.join('\n')
}

function stepMain() {
  log(c.bold('\n• main (plugin + CSS)'))
  const main = findMain()
  if (!main) return warn('src/main.{ts,js} não encontrado — configure manualmente (veja references/setup.md).')
  const rel = relative(CWD, main)
  let src = readFileSync(main, 'utf8')
  const original = src

  // CSS (baixo risco)
  if (src.includes('primevue-components/style.css')) skip('import do CSS já presente')
  else {
    src = insertAfterLastImport(src, "import '@wgalleti/primevue-components/style.css'")
    ok('import do CSS adicionado')
  }

  // Plugin
  if (src.includes('WPrimeVuePlugin')) {
    skip('WPrimeVuePlugin já registrado')
  } else {
    const hasAppConst = /\b(?:const|let)\s+app\s*=\s*createApp\s*\(/.test(src)
    const mountRe = /^([ \t]*)app\s*\.mount\s*\(/m
    const mountMatch = src.match(mountRe)
    if (hasAppConst && mountMatch) {
      src = insertAfterLastImport(src, "import { WPrimeVuePlugin } from '@wgalleti/primevue-components'")
      if (!/from ['"]\.\/plugins\/axios['"]/.test(src) && !/\bimport\s+api\b/.test(src)) {
        src = insertAfterLastImport(src, "import api from './plugins/axios' // ajuste para sua instância axios")
      }
      const indent = mountMatch[1] ?? ''
      const blockLines = [
        '',
        `${indent}app.use(WPrimeVuePlugin, {`,
        `${indent}  axios: api,`,
        `${indent}  locale: 'pt-BR',`,
        `${indent}})`,
      ]
      const lines = src.split('\n')
      const idx = lines.findIndex((l) => mountRe.test(l))
      lines.splice(idx, 0, ...blockLines)
      src = lines.join('\n')
      ok("WPrimeVuePlugin registrado (revise 'axios: api')")
      if (!src.includes('ToastService')) warn('ToastService/ConfirmationService não detectados — os componentes precisam deles.')
    } else {
      warn('não consegui inserir o plugin com segurança (padrão de main incomum).')
      warn('adicione manualmente — veja .claude/skills/wpvc/references/setup.md')
    }
  }

  // Normaliza excesso de linhas em branco geradas pelas inserções.
  src = src.replace(/\n{3,}/g, '\n\n')

  if (src !== original) {
    if (!DRY) {
      writeFileSync(`${main}.bak`, original)
      writeFileSync(main, src)
    }
    ok(`${rel} atualizado ${c.dim(`(backup: ${rel}.bak)`)}`)
  } else {
    skip(`${rel} já configurado — nada a complementar`)
  }
}

function runInit() {
  log(c.bold('wpvc init') + c.dim(` — ${relative(dirname(CWD), CWD) || CWD}`))
  if (DRY) warn('modo --dry-run: nada será escrito.')
  if (!existsSync(join(CWD, 'package.json'))) {
    log(c.red('\nErro: rode dentro da raiz de um projeto (package.json não encontrado).'))
    process.exit(1)
  }
  stepPeers()
  stepMain()
  stepSkill()
  log(c.bold('\nPronto.') + ' Próximos passos:')
  log(`  1. Confirme o import da sua instância axios no main.`)
  log(`  2. Abra ${c.bold('.claude/skills/wpvc/SKILL.md')} — o Claude Code já vai usar a skill.`)
  log(`  3. Crie sua 1ª tela: ${c.dim('useCrudManager({ endpoint, columns, form }) + <WCrudView>')}\n`)
}

function runSkillOnly() {
  stepSkill()
}

function usage() {
  log(`
${c.bold('@wgalleti/primevue-components')} — CLI de integração

  ${c.bold('npx @wgalleti/primevue-components init')} [--force] [--dry-run]
      Configura o app: checa peers, registra o plugin + CSS no main,
      e copia a skill para .claude/skills/wpvc/.

  ${c.bold('... skill')} [--force]
      Só (re)copia a skill.

  Flags: --force sobrescreve, --dry-run mostra sem escrever.
`)
}

switch (cmd) {
  case 'init':
    runInit()
    break
  case 'skill':
    runSkillOnly()
    break
  default:
    usage()
    if (cmd) process.exitCode = 1
}
