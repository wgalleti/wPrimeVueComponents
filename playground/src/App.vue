<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const router = useRouter()

const links = [
  { label: 'Home', to: '/', icon: 'pi pi-home' },
  { label: 'CRUD Básico', to: '/basic-crud', icon: 'pi pi-table' },
  { label: 'CRUD Avançado', to: '/advanced-crud', icon: 'pi pi-cog' },
]
</script>

<template>
  <Toast />
  <ConfirmDialog />

  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <aside class="w-64 bg-surface-50 dark:bg-surface-900 border-r border-surface-200 dark:border-surface-700 p-4">
      <h2 class="text-lg font-bold mb-4">wPrimeVue</h2>
      <nav class="flex flex-col gap-1">
        <Button
          v-for="link in links"
          :key="link.to"
          :label="link.label"
          :icon="link.icon"
          text
          class="justify-start"
          @click="router.push(link.to)"
        />
      </nav>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-6">
      <router-view />
    </main>
  </div>
</template>
