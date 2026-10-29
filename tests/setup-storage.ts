// Node 25+ expõe um `localStorage` global próprio (sem --localstorage-file ele é
// inutilizável) que ofusca o do jsdom. Nos testes de DOM, o do jsdom volta a valer.
const dom = (globalThis as { jsdom?: { window: Window } }).jsdom
if (dom) {
  for (const k of ['localStorage', 'sessionStorage'] as const) {
    Object.defineProperty(globalThis, k, { value: dom.window[k], configurable: true })
  }
}
