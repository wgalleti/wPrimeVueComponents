// Só os testes de CSS leem arquivo (jsdom não calcula layout); a lib não depende de @types/node.
declare module 'node:fs' {
  export function readFileSync(path: string, encoding: 'utf8'): string
}
