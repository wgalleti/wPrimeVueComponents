/**
 * Gate de estilo — o padrão de CSS da suíte (ver docs/css/classes.md e a skill
 * `estilo-e-tokens`): nenhum valor literal fora de tokens.css, nenhum `--p-*`
 * ou token curto do app fora de tokens.css, nenhuma variante `.dark` à mão,
 * nenhuma utilitária Tailwind ou `style=""` com literal nos SFCs.
 *
 * Exceção declarada: um literal é aceito quando a MESMA linha termina com um
 * comentário `/* … *\/` dizendo por quê (o que fica sobre foto/satélite não tem
 * tema, por exemplo). tokens.css é a fonte dos valores e fica fora do gate.
 *
 * Uso: node scripts/check-style.mjs
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const erros = []
const erro = (arquivo, linha, msg) => erros.push(`${path.relative(root, arquivo)}:${linha}: ${msg}`)

const walk = (dir) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]))

// Propriedades cujo valor em rem/px é sempre um token de espaço, tipo ou raio.
const PROPS_DE_TOKEN =
  /^(gap|row-gap|column-gap|padding(-[a-z]+)?|margin(-[a-z]+)?|inset|font-size|line-height|border(-[a-z]+)*-radius|letter-spacing)$/
const PX_PERMITIDO = /^(0|1|2|3)px$/
const COR_LITERAL = /#[0-9a-fA-F]{3,8}\b|\b(rgba?|hsla?|oklch|oklab)\(/
const DECLARADO = /\/\*.*\*\/\s*$/

function checarCss(arquivo, css, offset = 0) {
  const linhas = css.split('\n')
  let emComentario = false
  let emMedia = false
  for (let i = 0; i < linhas.length; i++) {
    const n = i + 1 + offset
    let l = linhas[i]
    // comentários de bloco (multi-linha) ficam fora do gate
    if (emComentario) {
      if (l.includes('*/')) {
        emComentario = false
        l = l.slice(l.indexOf('*/') + 2)
      } else continue
    }
    if (l.includes('/*') && !l.includes('*/')) {
      emComentario = true
      l = l.slice(0, l.indexOf('/*'))
    }
    const codigo = l.replace(/\/\*.*?\*\//g, '')
    if (!codigo.trim()) continue
    if (/^\s*@media/.test(codigo)) continue // breakpoints: literal por natureza (documentados em tokens.css)
    if (/^\s*\.dark[\s.]/.test(codigo) || /\s\.dark[\s.]/.test(codigo))
      erro(arquivo, n, 'variante escura à mão (`.dark …`) — o tema vem pelo token, não por seletor')
    if (/^\s*--[a-z0-9-]+\s*:/.test(codigo)) {
      // definição de custom property local (ex.: --md-tone) — só checa o var() dentro
    }
    // var(): só --w-* e locais (--md-*); nunca --p-* nem o nome curto do app — isso não se declara
    for (const m of codigo.matchAll(/var\(\s*(--[a-z0-9-]+)\s*(,\s*([^)]*))?/g)) {
      const nome = m[1]
      if (nome.startsWith('--p-'))
        erro(arquivo, n, `\`${nome}\` direto — leia o papel via --w-* (tokens.css)`)
      else if (!nome.startsWith('--w-') && !nome.startsWith('--md-'))
        erro(
          arquivo,
          n,
          `\`${nome}\` é o nome curto do app — a suíte lê só --w-* (tokens.css faz a ponte)`,
        )
    }
    // Exceção declarada: comentário no fim da linha libera o literal daquela linha.
    if (DECLARADO.test(l)) continue
    for (const m of codigo.matchAll(/var\(\s*(--[a-z0-9-]+)\s*(,\s*([^)]*))?/g))
      if (m[2] && !/^\s*var\(/.test(m[3] ?? ''))
        erro(
          arquivo,
          n,
          `fallback literal em \`var(${m[1]}, …)\` — o valor mora em tokens.css (ou declare o knob na linha)`,
        )

    // cor literal
    if (COR_LITERAL.test(codigo) && !/^\s*--/.test(codigo))
      erro(arquivo, n, 'cor literal — use --w-* ou declare a exceção num comentário na linha')

    // declarações: prop: valor
    const d = codigo.match(/^\s*([a-z-]+)\s*:\s*(.+?);?\s*$/)
    if (!d) continue
    const [, prop, valor] = d
    if (prop.startsWith('--')) continue
    if (PROPS_DE_TOKEN.test(prop)) {
      // `em` é relativo ao texto ao redor (prosa do markdown): aceito. rem/px não.
      const lit = valor
        .match(/(?<![\w.-])\d*\.?\d+(rem|px)\b/g)
        ?.filter(
          (v) => !/^0(px|rem)$/.test(v) && !(prop.startsWith('border') && /^[123]px$/.test(v)),
        )
      if (lit?.length)
        erro(
          arquivo,
          n,
          `\`${prop}: ${lit.join(' ')}\` — espaço/tipo/raio é token (--w-space-*, --w-text-*, --w-radius-*)`,
        )
      if (prop === 'line-height' && /^\d*\.?\d+$/.test(valor.trim()) && valor.trim() !== '1')
        erro(arquivo, n, 'line-height literal — --w-leading-* (só `1` passa: é o reset)')
    } else {
      for (const v of valor.match(/(?<![\w.-])\d*\.?\d+px\b/g) ?? [])
        if (!PX_PERMITIDO.test(v))
          erro(
            arquivo,
            n,
            `\`${prop}: … ${v}\` — px fora do hairline (0–3px); use rem/token ou declare a exceção`,
          )
    }
    if (prop === 'font-weight' && /^\d{3}$/.test(valor.trim()))
      erro(arquivo, n, 'font-weight numérico — --w-fw-*')
    if (/^(transition|animation)/.test(prop) && /(?<![\w.-])\d*\.?\d+m?s\b/.test(valor))
      erro(arquivo, n, 'duração literal — --w-motion-*')
    if (
      prop === 'z-index' &&
      /^\d+$/.test(valor.trim()) &&
      valor.trim() !== '0' &&
      valor.trim() !== '1'
    )
      erro(arquivo, n, 'z-index numérico — declare a escala no bloco (comentário na linha)')
  }
}

// Utilitárias Tailwind que embutem valor (cor, tamanho, espaço). Layout puro (flex/grid) também
// é desvio na suíte: o arranjo mora numa classe .w-* do CSS da lib.
const UTILITARIA =
  /(?:^|\s)(?:flex|grid|inline-flex|hidden|block|truncate|items-[a-z]+|justify-[a-z]+|gap-[\d.]+|[pm][xytblr]?-[\d.]+|space-[xy]-\d+|text-(?:xs|sm|base|lg|xl|\dxl|\[[^\]]+\]|[a-z]+-\d{2,3}|muted-color|color)|font-(?:thin|light|normal|medium|semibold|bold|black)|(?:w|h|size|min-w|max-w|min-h|max-h)-(?:\d+|\[[^\]]+\]|full|screen)|rounded(?:-[a-z0-9]+)?|bg-[a-z]+-\d{2,3}|ring(?:-\d)?|ring-[a-z]+-\d{2,3}|dark:[a-z-]+|shadow(?:-[a-z]+)?|opacity-\d+|border-[a-z]+-\d{2,3}|tabular-nums|tracking-[a-z]+|leading-[a-z]+)(?=\s|$)/

function checarVue(arquivo, src) {
  const linhas = src.split('\n')
  // <style> deve ser scoped e passa pelo gate de CSS
  for (const m of src.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)) {
    const inicio = src.slice(0, m.index).split('\n').length
    if (!/\bscoped\b/.test(m[1]))
      erro(arquivo, inicio, '<style> sem `scoped` — vaza para o app inteiro')
    checarCss(arquivo, m[2], inicio)
  }
  const template = src.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? ''
  const base = src.slice(0, src.indexOf('<template>')).split('\n').length - 1
  for (let i = 0; i < template.split('\n').length; i++) {
    const l = template.split('\n')[i]
    const n = base + i + 1
    // style="…" estático com literal (style com var(--w-*) é aceito)
    for (const m of l.matchAll(/\sstyle="([^"]*)"/g))
      if (/\d(px|rem|em)\b|#[0-9a-fA-F]{3,8}\b|font-weight:\s*\d{3}/.test(m[1]))
        erro(
          arquivo,
          n,
          `style="…" com literal — classe .w-* no CSS da lib (${m[1].trim().slice(0, 40)})`,
        )
    // :style com literal de medida
    for (const m of l.matchAll(/:style="([^"]*)"/g))
      if (/'\d*\.?\d+(px|rem)'/.test(m[1]))
        erro(arquivo, n, `:style com medida literal — token --w-* (${m[1].slice(0, 40)})`)
    // class="…" estático com utilitária
    for (const m of l.matchAll(/\sclass="([^"]*)"/g)) {
      const u = m[1].match(UTILITARIA)
      if (u)
        erro(
          arquivo,
          n,
          `utilitária \`${u[0].trim()}\` na classe — classe semântica .w-* no CSS da lib`,
        )
    }
  }
}

// multi-linha: style="\n …" — junta atributos quebrados antes de checar
function juntarAtributos(src) {
  return src.replace(
    /(\s(?::?style|class)=")([^"]*)"/g,
    (_, a, v) => a + v.replace(/\s*\n\s*/g, ' ') + '"',
  )
}

// Sintaxe: o mesmo parser que minifica no build (lightningcss) — um `)` a mais
// só apareceria no `yarn build`, tarde demais.
let transform = null
try {
  ;({ transform } = await import('lightningcss'))
} catch {
  /* sem lightningcss (instalação parcial): pula a checagem de sintaxe */
}

for (const f of walk(path.join(root, 'src/assets'))) {
  if (!f.endsWith('.css')) continue
  if (transform) {
    try {
      transform({ filename: f, code: fs.readFileSync(f), minify: true })
    } catch (e) {
      erro(f, e.loc?.line ?? 0, `sintaxe: ${e.message}`)
    }
  }
  if (f.endsWith('tokens.css')) continue
  checarCss(f, fs.readFileSync(f, 'utf8'))
}
for (const f of walk(path.join(root, 'src/components'))) {
  if (!f.endsWith('.vue')) continue
  checarVue(f, juntarAtributos(fs.readFileSync(f, 'utf8')))
}

if (erros.length) {
  console.error(`✗ ${erros.length} desvio(s) do padrão de estilo:\n`)
  for (const e of erros) console.error('  ' + e)
  console.error(
    '\nRegra: valor mora em tokens.css (--w-*); literal só com a exceção declarada num comentário na linha.',
  )
  process.exit(1)
}
console.log('✓ estilo no padrão (tokens --w-*, sem literal, sem utilitária nos SFCs)')
