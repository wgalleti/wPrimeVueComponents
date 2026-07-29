import { defineComponentMeta } from '@/types/componentMeta'

export default defineComponentMeta({
  category: 'Formulário',
  icon: 'pi pi-image',
  summary: 'Upload de imagem com recorte (pan + zoom), sem dependência externa.',
  examples: [
    {
      name: 'Quadrado',
      props: {},
    },
    {
      name: 'Avatar circular',
      props: { circular: true, width: 160, height: 160 },
    },
    {
      name: 'Banner 16:9',
      props: { aspectRatio: 16 / 9, width: 320, height: 180 },
    },
  ],
})
