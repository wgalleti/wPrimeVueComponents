/**
 * Deploy do site (docs + playground) no GitHub Pages, acompanhado até o fim.
 *
 * O workflow `docs.yml` dispara sozinho no push da main; este script encontra
 * a rodada do commit atual (ou dispara uma, se o push não gerou), espera ela
 * terminar e sai com erro se o deploy falhar — para o `release:publish` não
 * terminar verde com o site quebrado.
 *
 * Uso: yarn site:deploy   (o release:publish chama depois do push)
 * Requer o `gh` autenticado.
 */
import { execSync, spawnSync } from 'node:child_process'

const sh = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim()
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const WORKFLOW = 'docs.yml'
const sha = sh('git rev-parse HEAD')

function runsForSha() {
  const out = sh(
    `gh run list --workflow=${WORKFLOW} --limit 10 --json databaseId,headSha,status,conclusion,url`,
  )
  return JSON.parse(out).filter((r) => r.headSha === sha)
}

let run = null
for (let i = 0; i < 12 && !run; i++) {
  run = runsForSha()[0] ?? null
  if (!run) await sleep(5000)
}

if (!run) {
  console.log(`ℹ nenhuma rodada de ${WORKFLOW} para ${sha.slice(0, 7)} — disparando manualmente…`)
  sh(`gh workflow run ${WORKFLOW} --ref main`)
  for (let i = 0; i < 12 && !run; i++) {
    await sleep(5000)
    run = runsForSha()[0] ?? null
  }
}

if (!run) {
  console.error(
    `✗ o workflow ${WORKFLOW} não iniciou — verifique em: ${sh('gh repo view --json url -q .url')}/actions`,
  )
  process.exit(1)
}

console.log(`⏳ acompanhando o deploy do site: ${run.url}`)
const watch = spawnSync('gh', ['run', 'watch', String(run.databaseId), '--exit-status'], {
  stdio: 'inherit',
})
if (watch.status !== 0) {
  console.error(
    '✗ deploy do site falhou — o pacote npm já foi publicado; corrija e rode `yarn site:deploy`.',
  )
  process.exit(watch.status ?? 1)
}

const pages = JSON.parse(sh('gh api repos/{owner}/{repo}/pages'))
console.log(`✓ site publicado: ${pages.html_url}  (playground em ${pages.html_url}playground/)`)
