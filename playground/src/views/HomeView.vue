<script setup lang="ts">
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold mb-2">wPrimeVue Components</h1>
    <p class="text-surface-500 mb-6">Playground para teste e desenvolvimento dos componentes.</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <router-link
        to="/basic-crud"
        class="block p-6 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors no-underline"
      >
        <div class="flex items-center gap-3 mb-2">
          <i class="pi pi-table text-2xl text-primary" />
          <h3 class="text-lg font-semibold">CRUD Basico</h3>
        </div>
        <p class="text-sm text-surface-500">
          Tabela paginada com busca, formulario de criacao/edicao, excluir com confirmacao.
          Campos: texto, numero, moeda, booleano, data.
        </p>
      </router-link>

      <router-link
        to="/advanced-crud"
        class="block p-6 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors no-underline"
      >
        <div class="flex items-center gap-3 mb-2">
          <i class="pi pi-cog text-2xl text-primary" />
          <h3 class="text-lg font-semibold">CRUD Avancado</h3>
        </div>
        <p class="text-sm text-surface-500">
          FK com AutoComplete, campos condicionais, validacao customizada, KPIs,
          row actions customizadas, mascara de input.
        </p>
      </router-link>
      <router-link
        to="/real-api"
        class="block p-6 rounded-lg border border-surface-200 dark:border-surface-700 hover:bg-surface-50 dark:hover:bg-surface-800 transition-colors no-underline"
      >
        <div class="flex items-center gap-3 mb-2">
          <i class="pi pi-server text-2xl text-primary" />
          <h3 class="text-lg font-semibold">API Real</h3>
        </div>
        <p class="text-sm text-surface-500">
          Conecte a uma API real (ex: WorkHard) para testar CRUD com dados reais.
          Configure URL base e token JWT.
        </p>
      </router-link>
    </div>
  </div>
</template>
