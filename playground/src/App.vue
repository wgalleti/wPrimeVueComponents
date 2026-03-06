<script setup lang="ts">
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const links = [
  { label: 'Home', to: '/', icon: 'pi pi-home' },
  { label: 'CRUD Básico', to: '/basic-crud', icon: 'pi pi-table' },
  { label: 'CRUD Avançado', to: '/advanced-crud', icon: 'pi pi-cog' },
  { label: 'API Real', to: '/real-api', icon: 'pi pi-server' },
]

const isDark = ref(document.documentElement.classList.contains('dark'))

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<template>
  <Toast />
  <ConfirmDialog />

  <div class="flex min-h-screen bg-surface-50 dark:bg-surface-950">
    <!-- Sidebar -->
    <aside class="w-60 flex flex-col border-r border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900">
      <!-- Brand -->
      <div class="h-14 flex items-center gap-2.5 px-5 border-b border-surface-100 dark:border-surface-800">
        <div class="size-7 rounded-lg bg-primary flex items-center justify-center">
          <i class="pi pi-box text-white text-xs" />
        </div>
        <span class="font-bold text-sm tracking-tight text-color">wPrimeVue</span>
        <span class="text-[0.625rem] font-medium text-muted-color bg-surface-100 dark:bg-surface-800 px-1.5 py-0.5 rounded-md ml-auto">dev</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 flex flex-col gap-0.5">
        <a
          v-for="link in links"
          :key="link.to"
          class="nav-item group flex items-center gap-2.5 px-3 py-2 rounded-lg text-[0.8125rem] font-medium cursor-pointer select-none transition-colors duration-150"
          :class="route.path === link.to
            ? 'bg-primary/10 text-primary dark:bg-primary/15'
            : 'text-muted-color hover:text-color hover:bg-surface-100 dark:hover:bg-surface-800'"
          @click="router.push(link.to)"
        >
          <i
            :class="[link.icon, 'text-sm']"
            :style="route.path === link.to ? '' : 'opacity: 0.6'"
          />
          {{ link.label }}
          <div
            v-if="route.path === link.to"
            class="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
          />
        </a>
      </nav>

      <!-- Footer -->
      <div class="px-3 py-3 border-t border-surface-100 dark:border-surface-800">
        <button
          class="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-muted-color hover:text-color hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors duration-150"
          @click="toggleTheme"
        >
          <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-sm" />
          {{ isDark ? 'Modo claro' : 'Modo escuro' }}
        </button>
      </div>
    </aside>

    <!-- Content -->
    <main class="flex-1 p-8 overflow-auto">
      <router-view />
    </main>
  </div>
</template>
