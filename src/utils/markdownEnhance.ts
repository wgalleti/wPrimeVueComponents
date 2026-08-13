/**
 * Enriquecimento do markdown JÁ renderizado — o que precisa de DOM/JS.
 *
 * Roda depois do `v-html` (e depois do DOMPurify, por isso os botões nascem
 * aqui e não no HTML sanitizado): botão de copiar nos blocos de código, abas
 * clicáveis e diagramas mermaid (carregados sob demanda, na paleta do tema).
 */

/* ==========================================================
   Copiar código
   ========================================================== */

function aplicarCopiar(raiz: HTMLElement): void {
  raiz.querySelectorAll<HTMLElement>('[data-md-code]').forEach((bloco) => {
    if (bloco.dataset.mdPronto) return
    bloco.dataset.mdPronto = '1'

    const botao = document.createElement('button')
    botao.type = 'button'
    botao.className = 'md-code__copiar'
    botao.setAttribute('aria-label', 'Copiar código')
    botao.title = 'Copiar código'
    botao.innerHTML = '<i class="pi pi-copy" aria-hidden="true"></i>'
    botao.addEventListener('click', () => {
      const codigo = bloco.querySelector('code')?.textContent ?? ''
      void navigator.clipboard?.writeText(codigo).then(() => {
        botao.classList.add('md-code__copiar--feito')
        botao.innerHTML = '<i class="pi pi-check" aria-hidden="true"></i>'
        window.setTimeout(() => {
          botao.classList.remove('md-code__copiar--feito')
          botao.innerHTML = '<i class="pi pi-copy" aria-hidden="true"></i>'
        }, 1600)
      })
    })
    bloco.appendChild(botao)
  })
}

/* ==========================================================
   Abas
   ========================================================== */

/**
 * Blocos `::: aba` seguidos viram um grupo de abas sozinhos — o autor não
 * precisa envolver tudo num `:::: abas` (aninhar marcador dentro de marcador é
 * a parte chata da sintaxe). O wrapper explícito continua funcionando.
 */
function agruparAbasSoltas(raiz: HTMLElement): void {
  const soltos = Array.from(raiz.querySelectorAll<HTMLElement>('.md-tabs__panel')).filter(
    (painel) => !painel.parentElement?.hasAttribute('data-md-tabs'),
  )
  const vistos = new Set<HTMLElement>()

  soltos.forEach((primeiro) => {
    if (vistos.has(primeiro)) return
    const sequencia = [primeiro]
    let proximo = primeiro.nextElementSibling
    while (proximo instanceof HTMLElement && proximo.classList.contains('md-tabs__panel')) {
      sequencia.push(proximo)
      proximo = proximo.nextElementSibling
    }
    sequencia.forEach((painel) => vistos.add(painel))

    const grupo = document.createElement('div')
    grupo.className = 'md-tabs'
    grupo.setAttribute('data-md-tabs', '')
    primeiro.before(grupo)
    sequencia.forEach((painel) => grupo.appendChild(painel))
  })
}

function aplicarAbas(raiz: HTMLElement): void {
  agruparAbasSoltas(raiz)
  raiz.querySelectorAll<HTMLElement>('[data-md-tabs]').forEach((grupo, indiceGrupo) => {
    if (grupo.dataset.mdPronto) return
    const paineis = Array.from(grupo.querySelectorAll<HTMLElement>(':scope > .md-tabs__panel'))
    if (!paineis.length) return
    grupo.dataset.mdPronto = '1'

    const barra = document.createElement('div')
    barra.className = 'md-tabs__bar'
    barra.setAttribute('role', 'tablist')

    const botoes = paineis.map((painel, indice) => {
      const id = `md-aba-${indiceGrupo}-${indice}`
      painel.id = `${id}-painel`
      painel.setAttribute('role', 'tabpanel')
      painel.setAttribute('aria-labelledby', id)

      const botao = document.createElement('button')
      botao.type = 'button'
      botao.id = id
      botao.className = 'md-tabs__botao'
      botao.setAttribute('role', 'tab')
      botao.setAttribute('aria-controls', painel.id)
      botao.textContent = painel.dataset.mdTab ?? `Aba ${indice + 1}`
      botao.addEventListener('click', () => selecionar(indice))
      barra.appendChild(botao)
      return botao
    })

    function selecionar(ativo: number): void {
      botoes.forEach((botao, indice) => {
        const selecionado = indice === ativo
        botao.setAttribute('aria-selected', String(selecionado))
        botao.tabIndex = selecionado ? 0 : -1
        paineis[indice].hidden = !selecionado
      })
    }

    grupo.prepend(barra)
    selecionar(0)
  })
}

/* ==========================================================
   Diagramas (mermaid)
   ========================================================== */

let mermaidPromise: Promise<typeof import('mermaid').default> | null = null
let sequencia = 0

async function carregarMermaid() {
  if (!mermaidPromise) {
    mermaidPromise = import('mermaid').then((modulo) => modulo.default)
  }
  return mermaidPromise
}

/** Elementos que nunca fazem parte de um diagrama — e que trazem execução junto. */
const TAGS_PROIBIDAS = new Set([
  'script',
  'iframe',
  'object',
  'embed',
  'link',
  'meta',
  'base',
  'form',
  'input',
  'button',
  'audio',
  'video',
  'animate',
  'set',
])

/** Remove tag executável, handler `on*` e URL `javascript:` — recursivo. */
function limparNo(elemento: Element): void {
  for (const atributo of Array.from(elemento.attributes)) {
    const nome = atributo.name.toLowerCase()
    const valor = atributo.value.trim().toLowerCase()
    const ehLink = nome === 'href' || nome === 'xlink:href' || nome === 'src'
    if (nome.startsWith('on') || (ehLink && /^(javascript|data|vbscript):/.test(valor))) {
      elemento.removeAttribute(atributo.name)
    }
  }
  for (const filho of Array.from(elemento.children)) {
    if (TAGS_PROIBIDAS.has(filho.localName.toLowerCase())) filho.remove()
    else limparNo(filho)
  }
}

/**
 * Limpa o SVG do mermaid **sem perder os rótulos**.
 *
 * Os rótulos ficam dentro de `<foreignObject>` (HTML embutido no SVG), e o
 * DOMPurify genérico descarta esse conteúdo — o diagrama sairia com as caixas
 * vazias. Então a limpeza aqui é explícita e sobre o DOM já parseado como
 * `image/svg+xml`: fora tag executável, handler inline e URL de script.
 *
 * Isso é a **segunda** camada: o mermaid roda em `securityLevel: 'strict'`,
 * que escapa o texto do autor e já passa o SVG pelo próprio DOMPurify dele
 * (com a configuração que os rótulos exigem).
 *
 * @returns o nó limpo, ou `null` se o SVG vier malformado.
 */
function sanitizarSvg(svg: string): Element | null {
  const documento = new DOMParser().parseFromString(svg, 'image/svg+xml')
  if (documento.querySelector('parsererror')) return null
  const raiz = documento.documentElement
  if (raiz.localName.toLowerCase() !== 'svg') return null
  limparNo(raiz)
  return raiz
}

/** Lê um token do tema atual do documento (o diagrama fica na paleta do portal). */
function token(estilo: CSSStyleDeclaration, nome: string, padrao: string): string {
  return estilo.getPropertyValue(nome).trim() || padrao
}

function configurarMermaid(mermaid: Awaited<ReturnType<typeof carregarMermaid>>): void {
  const estilo = getComputedStyle(document.documentElement)
  const superficie = token(estilo, '--surface', '#ffffff')
  const texto = token(estilo, '--fg', '#141a22')
  const primaria = token(estilo, '--primary', '#1f5092')
  const suave = token(estilo, '--primary-soft', '#eef4fb')
  const borda = token(estilo, '--border-strong', '#cdd6e2')

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'base',
    fontFamily: token(estilo, '--font-sans', 'inherit'),
    flowchart: { useMaxWidth: true },
    themeVariables: {
      background: superficie,
      primaryColor: suave,
      primaryTextColor: texto,
      primaryBorderColor: primaria,
      secondaryColor: token(estilo, '--surface-3', '#eef2f7'),
      tertiaryColor: token(estilo, '--surface-2', '#f8fafc'),
      lineColor: borda,
      textColor: texto,
      mainBkg: suave,
      nodeBorder: primaria,
      clusterBkg: token(estilo, '--surface-2', '#f8fafc'),
      clusterBorder: borda,
      fontSize: '13px',
    },
  })
}

/**
 * Renderiza os blocos ```mermaid do container.
 * @param forcar redesenha os que já estavam prontos (troca de tema).
 */
export async function renderizarDiagramas(raiz: HTMLElement, forcar = false): Promise<void> {
  const alvos = Array.from(raiz.querySelectorAll<HTMLElement>('[data-md-mermaid]')).filter(
    (figura) => forcar || !figura.dataset.mdEstado,
  )
  if (!alvos.length) return

  const mermaid = await carregarMermaid()
  configurarMermaid(mermaid)

  for (const figura of alvos) {
    const fonte = figura.querySelector<HTMLElement>('.md-mermaid__fonte')?.textContent ?? ''
    if (!fonte.trim()) continue
    figura.querySelector('.md-mermaid__svg')?.remove()
    try {
      sequencia += 1
      const { svg } = await mermaid.render(`md-diagrama-${sequencia}`, fonte)
      const limpo = sanitizarSvg(svg)
      if (!limpo) {
        figura.dataset.mdEstado = 'erro'
        continue
      }
      const caixa = document.createElement('div')
      caixa.className = 'md-mermaid__svg'
      caixa.appendChild(document.importNode(limpo, true))
      figura.prepend(caixa)
      figura.dataset.mdEstado = 'ok'
    } catch {
      // Diagrama inválido: mostra o código-fonte em vez de sumir com o conteúdo.
      figura.dataset.mdEstado = 'erro'
    }
  }
}

/* ==========================================================
   API
   ========================================================== */

/** Aplica tudo. Idempotente — pode ser chamado a cada re-render. */
export async function enhanceMarkdown(raiz: HTMLElement | null): Promise<void> {
  if (!raiz) return
  aplicarCopiar(raiz)
  aplicarAbas(raiz)
  await renderizarDiagramas(raiz)
}
