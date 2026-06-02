/* ============================================================
   Registry — Form components
   ============================================================ */
(function () {
  const WC = window.WC, WDEMO = window.WDEMO;
  const REG = (window.WREG = window.WREG || []);

  REG.push({
    id: 'WAutoCompleteFK', slug: 'w-auto-complete-fk', name: 'WAutoCompleteFK', cat: 'Formulário', icon: 'pi pi-search',
    source: 'components/form/WAutoCompleteFK.vue',
    tagline: 'Autocomplete de chave estrangeira com busca avançada + CRUD inline.',
    desc: 'Campo de seleção de FK: digite para autocompletar via endpoint, ou abra a busca avançada (ícone de lupa) com tabela, filtro e criação inline de novos registros. Experimente digitar "fri" abaixo ou abrir a busca avançada.',
    importLine: "import { WAutoCompleteFK } from '@wgalleti/primevue-components'",
    preview: () => WC.autoCompleteFK({ value: 'Frigorífico Vale Verde' }),
    playground: {
      maxw: 420,
      defaults: {},
      controls: [],
      mount: (el, p) => WDEMO.autoComplete(el, p),
    },
    note: 'O endpoint usado é uma string, resolvida pelo <code>dataProvider</code> ativo (Axios ou Supabase). Passe <code>crudFields</code>/<code>crudColumns</code> para habilitar criação inline no modal.',
    props: [
      { name: 'modelValue', type: 'unknown', req: true, desc: 'Valor selecionado (v-model).' },
      { name: 'endpoint', type: 'string', req: true, desc: 'Recurso para busca.' },
      { name: 'optionLabel', type: 'string', def: "'nome'", desc: 'Campo exibido.' },
      { name: 'optionValue', type: 'string', def: "'id'", desc: 'Campo do valor.' },
      { name: 'endpointParams', type: 'Record<string, …>', desc: 'Filtros fixos na query.' },
      { name: 'crudFields', type: 'FieldDef[]', desc: 'Habilita criação inline no modal.' },
      { name: 'crudColumns', type: 'ColumnDef[]', desc: 'Colunas da tabela de busca.' },
      { name: 'placeholder', type: 'string', desc: 'Placeholder do input.' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Desabilita o campo.' },
    ],
    slots: [{ name: 'option', desc: 'Item customizado da lista.' }],
    events: [{ name: 'update:modelValue', payload: 'value', desc: 'Seleção alterada.' }],
    examples: [
      { title: 'FK com CRUD inline', lang: 'vue', code: `<WAutoCompleteFK
  v-model="form.fornecedor"
  endpoint="/api/v1/fornecedores/"
  option-label="razao_social"
  :crud-fields="fornecedorForm"
  :crud-columns="fornecedorColumns"
/>` },
    ],
  });

  REG.push({
    id: 'WFormRenderer', slug: 'w-form-renderer', name: 'WFormRenderer', cat: 'Formulário', icon: 'pi pi-pencil',
    source: 'components/form/WFormRenderer.vue', badge: 'v0.2.0+',
    tagline: 'Renderiza formulários a partir de FieldDef[], sem dialog.',
    desc: 'Motor de formulários standalone. A partir de FieldDef[] desenha um grid de 2 colunas com 17 tipos de campo (text, currency, date, select, fk, switch, color, cpf_cnpj, cep, image…), validação, agrupamento por seção e colSpan. Ideal para views complexas com Cards e Dialogs próprios.',
    importLine: "import { WFormRenderer } from '@wgalleti/primevue-components'",
    preview: () => `<div class="pv" style="transform:scale(.66);transform-origin:top center;width:150%">${WC.formRenderer()}</div>`,
    playground: {
      maxw: 640, stretch: true,
      defaults: { preset: 'produto' },
      controls: [
        { key: 'preset', type: 'seg', label: 'exemplo', options: ['produto', 'cadastro', 'tipos'] },
      ],
      map: (v) => v,
      render: (p) => {
        const presets = {
          produto: undefined,
          cadastro: [
            { field: 'razao', label: 'Razão social', type: 'text', required: true, colSpan: 2, value: 'Açougue Central Ltda' },
            { field: 'doc', label: 'CNPJ', type: 'cpf_cnpj', value: '12.345.678/0001-90' },
            { field: 'tel', label: 'Telefone', type: 'mask', value: '(11) 98765-4321' },
            { field: 'cep', label: 'CEP', type: 'cep', value: '01310-100' },
            { field: 'cidade', label: 'Cidade', type: 'text', value: 'São Paulo' },
            { field: 'email', label: 'E-mail', type: 'email', colSpan: 2, value: 'contato@central.com' },
            { field: 'ativo', label: 'Cliente ativo', type: 'switch', value: true },
          ],
          tipos: [
            { field: 'a', label: 'text', type: 'text', value: 'Texto' },
            { field: 'b', label: 'number', type: 'number', value: '42' },
            { field: 'c', label: 'currency', type: 'currency', value: 'R$ 79,90' },
            { field: 'd', label: 'date', type: 'date', value: '02/06/2026' },
            { field: 'e', label: 'select', type: 'select', value: 'Opção A' },
            { field: 'f', label: 'cpf_cnpj', type: 'cpf_cnpj', value: '123.456.789-01' },
            { field: 'g', label: 'cep', type: 'cep', value: '01310-100' },
            { field: 'h', label: 'color', type: 'color', value: '#10b981' },
            { field: 'i', label: 'password', type: 'password' },
            { field: 'j', label: 'textarea', type: 'textarea', colSpan: 2, value: 'Texto longo...' },
            { field: 'k', label: 'switch', type: 'switch', value: true },
            { field: 'l', label: 'image', type: 'image', colSpan: 2 },
          ],
        };
        return `<div class="surface-frame" style="border:1px solid var(--p-content-border-color);padding:1.25rem;width:100%">${WC.formRenderer({ fields: presets[p.preset] })}</div>`;
      },
    },
    props: [
      { name: 'fields', type: 'FieldDef[]', req: true, desc: 'Definição dos campos.' },
      { name: 'formData', type: 'Record<string, unknown>', req: true, desc: 'Objeto reativo do formulário.' },
      { name: 'isEditing', type: 'boolean', def: 'false', desc: 'Modo edição (disabledOnEdit, autofocus).' },
      { name: 'disabled', type: 'boolean', def: 'false', desc: 'Somente-leitura.' },
      { name: 'columns', type: 'number', def: '2', desc: 'Colunas do grid.' },
    ],
    slots: [
      { name: 'field-{field}', desc: 'Campo totalmente customizado.' },
      { name: 'image-{field}', desc: 'Upload de imagem customizado.' },
    ],
    events: [{ name: 'update:field', payload: '(field, value)', desc: 'Edição de campo.' }],
    examples: [
      { title: 'Form em Card', lang: 'vue', code: `<Card>
  <template #content>
    <WFormRenderer
      :fields="compraHeaderForm"
      :form-data="form"
      :is-editing="false"
      @update:field="(f, v) => (form[f] = v)"
    />
  </template>
</Card>` },
      { title: 'Tipos e agrupamento', lang: 'ts', code: `const form: FieldDef[] = [
  { field: 'nome', label: 'Nome', required: true, colSpan: 2,
    fieldGroup: { id: 'dados', title: 'Dados gerais' } },
  { field: 'preco', label: 'Preço', type: 'currency',
    fieldGroup: { id: 'dados', title: 'Dados gerais' } },
  { field: 'cep', label: 'CEP', type: 'cep',
    cepFields: { logradouro: 'rua', localidade: 'cidade', uf: 'uf' },
    fieldGroup: { id: 'end', title: 'Endereço', order: 2 } },
]` },
    ],
  });

  REG.push({
    id: 'WImageCropper', slug: 'w-image-cropper', name: 'WImageCropper', cat: 'Formulário', icon: 'pi pi-image',
    source: 'components/form/WImageCropper.vue',
    tagline: 'Upload de imagem com preview e recorte (crop) integrado.',
    desc: 'Campo de imagem com file picker, modal de recorte (zoom + stencil quadrado ou circular), preview e botão de remover. Detectado automaticamente pelo useCrudManager em campos type "image", que então envia o formulário como multipart/FormData. Clique em "Enviar" para ver o fluxo de recorte.',
    importLine: "import { WImageCropper } from '@wgalleti/primevue-components'",
    preview: () => WC.imageCropper({ circular: true, filled: true, width: 110 }),
    playground: {
      maxw: 360,
      defaults: { circular: false, aspectRatio: 1, width: 168 },
      controls: [
        { key: 'circular', type: 'toggle', label: 'circular' },
        { key: 'aspectRatio', type: 'seg', label: 'aspectRatio', options: [1, 1.5, 1.78] },
        { key: 'width', type: 'range', label: 'width (px)', min: 120, max: 220, step: 4 },
      ],
      mount: (el, p) => WDEMO.imageCropper(el, p),
    },
    note: 'O <code>useCrudManager</code> detecta campos <code>type: "image"</code> e envia o formulário como <code>FormData</code> (multipart) em vez de JSON — sem configuração extra.',
    props: [
      { name: 'modelValue', type: 'File | string | null', desc: 'Arquivo ou URL da imagem atual (v-model).' },
      { name: 'accept', type: 'string', def: "'image/*'", desc: 'Tipos de arquivo aceitos.' },
      { name: 'maxSize', type: 'number', def: '5242880', desc: 'Tamanho máximo em bytes (5MB).' },
      { name: 'aspectRatio', type: 'number', def: '1', desc: 'Proporção do recorte.' },
      { name: 'circular', type: 'boolean', def: 'false', desc: 'Stencil circular (avatar).' },
      { name: 'width / height', type: 'number', def: '200', desc: 'Dimensões do preview em px.' },
    ],
    slots: [], events: [
      { name: 'update:modelValue', payload: 'File | null', desc: 'Arquivo recortado.' },
      { name: 'error', payload: 'string', desc: 'Erro de tamanho ou tipo.' },
    ],
    examples: [
      { title: 'Avatar standalone', lang: 'vue', code: `<script setup lang="ts">
const avatar = ref<File | null>(null)
async function salvar() {
  const fd = new FormData()
  fd.append('avatar', avatar.value!)
  await api.patch('/api/v1/perfil/', fd)
}
</script>

<template>
  <WImageCropper v-model="avatar" circular accept="image/jpeg,image/png" />
  <Button label="Salvar" @click="salvar" />
</template>` },
      { title: 'Em um FieldDef', lang: 'ts', code: `const form: FieldDef[] = [
  { field: 'foto', label: 'Foto do produto', type: 'image',
    accept: 'image/jpeg,image/png' },
]
// useCrudManager envia como multipart automaticamente` },
    ],
  });
})();
