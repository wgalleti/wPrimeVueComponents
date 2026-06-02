/* ============================================================
   Guia & Migração — getting started, plugin, fonts, migration
   ============================================================ */
(function () {
  const H = window.H;

  function mapTable(title, rows) {
    return `<div style="margin-bottom:1.4rem"><div class="sec-eyebrow" style="margin-bottom:.7rem">${title}</div>
      <table class="apitable"><thead><tr><th>Antes</th><th>Depois</th></tr></thead><tbody>
      ${rows.map((r) => `<tr><td class="nm" style="white-space:normal;color:var(--muted)"><code style="background:var(--code-bg);padding:.1rem .35rem;border-radius:4px">${H.esc(r[0])}</code></td>
        <td class="nm" style="white-space:normal"><code style="background:var(--accent-soft);color:var(--accent);padding:.1rem .35rem;border-radius:4px">${H.esc(r[1])}</code></td></tr>`).join('')}
      </tbody></table></div>`;
  }

  function steps(items) {
    return `<ol style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.8rem">
      ${items.map((t, i) => `<li style="display:flex;gap:.85rem;align-items:flex-start">
        <span style="flex-shrink:0;width:1.7rem;height:1.7rem;border-radius:50%;background:var(--accent-soft);color:var(--accent);font-family:var(--font-mono);font-size:.78rem;font-weight:600;display:flex;align-items:center;justify-content:center">${i + 1}</span>
        <div style="padding-top:.25rem;color:var(--fg-soft);font-size:.92rem">${t}</div></li>`).join('')}
    </ol>`;
  }

  function init() {
    const host = document.getElementById('page');
    if (!host) return;
    document.querySelector('[data-crumbs]').innerHTML = `<a href="index.html">Componentes</a><span class="sep">/</span><span class="cur">Guia & Setup</span>`;

    host.innerHTML = `
    <div class="cphead">
      <div class="cphead__cat">Começar</div>
      <h1 class="cphead__title">Guia &amp; Setup</h1>
      <p class="cphead__desc">Instale a biblioteca, registre o plugin e migre projetos existentes (WorkHard, DojoHub) para o pacote compartilhado — de forma incremental, sem mudar o backend.</p>
      <div class="cphead__meta">
        <span class="chip"><i class="pi pi-box"></i> Vue 3.4+ · PrimeVue 4</span>
        <span class="chip"><i class="pi pi-server"></i> Axios ou Supabase</span>
        <span class="chip"><i class="pi pi-globe"></i> pt-BR · BRL</span>
      </div>
    </div>

    <div class="block">
      <div class="block__head"><span class="block__num">01</span><h2>Instalação</h2></div>
      <p class="block__sub">Pacote interno via git. Adicione as peer dependencies no seu projeto.</p>
      ${H.codeBlock(`yarn add git+https://github.com/wgalleti/wPrimeVueComponents.git\nyarn add vue@^3.4 primevue@^4.0 dayjs@^1.11\n# se usar a camada Axios padrão:\nyarn add axios@^1.0`, 'bash')}
    </div>

    <div class="block">
      <div class="block__head"><span class="block__num">02</span><h2>Plugin (Axios)</h2></div>
      <p class="block__sub">Registre o <code style="font-family:var(--font-mono);font-size:.85em">WPrimeVuePlugin</code> no <code style="font-family:var(--font-mono);font-size:.85em">main.ts</code>. Passar <code style="font-family:var(--font-mono);font-size:.85em">axios</code> cria um dataProvider automaticamente.</p>
      ${H.codeBlock(`import PrimeVue from 'primevue/config'\nimport ToastService from 'primevue/toastservice'\nimport ConfirmationService from 'primevue/confirmationservice'\nimport { WPrimeVuePlugin } from '@wgalleti/primevue-components'\nimport api from './plugins/axios'\n\napp.use(PrimeVue)\napp.use(ToastService)\napp.use(ConfirmationService)\n\napp.use(WPrimeVuePlugin, {\n  axios: api,             // cria um dataProvider Axios\n  defaultPageSize: 20,\n  dateFormat: 'DD/MM/YYYY',\n  locale: 'pt-BR',\n})`, 'ts')}
    </div>

    <div class="block">
      <div class="block__head"><span class="block__num">03</span><h2>Plugin (Supabase)</h2></div>
      <p class="block__sub">Projetos sem REST registram um dataProvider Supabase. Endpoints continuam sendo strings, mapeadas em <code style="font-family:var(--font-mono);font-size:.85em">resources</code>.</p>
      ${H.codeBlock(`import { createSupabaseDataProvider, WPrimeVuePlugin } from '@wgalleti/primevue-components'\nimport { supabase } from './plugins/supabase'\n\nconst dataProvider = createSupabaseDataProvider({\n  client: supabase,\n  resources: {\n    produtos: {\n      table: 'produtos',\n      searchFields: ['nome', 'descricao'],\n      defaultOrdering: 'nome',\n      softDelete: true,\n    },\n  },\n})\n\napp.use(WPrimeVuePlugin, { dataProvider, defaultPageSize: 20 })`, 'ts')}
    </div>

    <div class="block">
      <div class="block__head"><span class="block__num">04</span><h2>Herança de fontes</h2></div>
      <p class="block__sub">A lib não define <code style="font-family:var(--font-mono);font-size:.85em">font-family</code> — herda do host. Como o PrimeVue teleporta dialogs/overlays para o <code style="font-family:var(--font-mono);font-size:.85em">&lt;body&gt;</code>, garanta a herança no CSS global.</p>
      ${H.codeBlock(`html {\n  font-family: 'SuaFonte', system-ui, sans-serif;\n}\nbody,\n.p-component {\n  font-family: inherit;\n}`, 'css')}
      <div class="callout callout--warn"><i class="pi pi-exclamation-triangle"></i><div>Sem isso, modais e overlays renderizam com a fonte padrão do navegador.</div></div>
    </div>

    <div class="block" id="migracao" style="scroll-margin-top:80px">
      <div class="block__head"><span class="block__num">05</span><h2>Migração de projetos</h2></div>
      <p class="block__sub">Guia para migrar <b>WorkHard</b> e <b>DojoHub</b>. A migração é incremental — views não migradas continuam usando o código local, e nenhuma mudança de backend é necessária.</p>
      ${mapTable('WorkHard — imports', [
        ['useCrud (local)', 'useCrudManager'],
        ['useApi / useFormatters (local)', 'useApi / useFormatters'],
        ['CrudView.vue', 'WCrudView'],
        ['CrudFormDialog.vue', 'WCrudFormDialog'],
        ['AutoCompleteFK.vue', 'WAutoCompleteFK'],
        ['type CrudColumn', 'type ColumnDef'],
        ['type CrudFormField', 'type FieldDef'],
      ])}
      ${mapTable('DojoHub — imports', [
        ['DojoCrudView.vue', 'WCrudView'],
        ['DojoCrudFormDialog.vue', 'WCrudFormDialog'],
        ['DojoImageCropper.vue', 'WImageCropper'],
        ['AutoCompleteFK.vue', 'WAutoCompleteFK'],
      ])}
      ${mapTable('Renomeação de tipos', [
        ['CrudConfig', 'CrudManagerConfig'],
        ['CrudReturn', 'CrudManagerReturn'],
        ['CrudRowAction', 'RowAction'],
      ])}
      <div style="margin-top:1.6rem"><div class="sec-eyebrow" style="margin-bottom:.9rem">Passos</div>
      ${steps([
        '<b>Instalar a lib</b> e as peer dependencies no projeto.',
        '<b>Registrar o plugin</b> no main.ts e remover a instância Axios local dos composables.',
        '<b>Atualizar imports view por view</b> — troque composables, componentes e renomeie tipos.',
        '<b>Trocar os nomes no template</b> (ex.: <code style="font-family:var(--font-mono)">CrudView</code> → <code style="font-family:var(--font-mono)">WCrudView</code>).',
        '<b>Remover o código local</b> após migrar todas as views.',
        '<b>Verificar</b> com <code style="font-family:var(--font-mono)">yarn type-check</code> e <code style="font-family:var(--font-mono)">yarn build</code>.',
      ])}
      </div>
      <div class="callout"><i class="pi pi-info-circle"></i><div>Customizações específicas não cobertas pela lib? Use os <b>slots</b> de cada componente para preservar o comportamento.</div></div>
    </div>

    <div class="block">
      <div class="block__head"><span class="block__num">→</span><h2>Próximo</h2></div>
      <div style="display:flex;gap:1rem;flex-wrap:wrap">
        <a href="c/w-crud-view.html" class="chip" style="padding:.6rem 1rem">Ver WCrudView <i class="pi pi-arrow-right"></i></a>
        <a href="playground.html" class="chip chip--imp" style="padding:.6rem 1rem"><i class="pi pi-bolt"></i> Schema Playground</a>
      </div>
    </div>`;
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
