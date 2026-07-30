import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-upload',
  summary: 'Upload de arquivo(s) genérico (single/multiple) com validação de tamanho.',
  examples: [
    { name: 'Único', props: {} },
    { name: 'Múltiplos', props: { multiple: true, chooseLabel: 'Adicionar arquivos' } },
  ],
})
