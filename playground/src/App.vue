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
  { label: 'Showcase (novidades)', to: '/showcase', icon: 'pi pi-sparkles' },
  { label: 'API Real', to: '/real-api', icon: 'pi pi-server' },
  { label: 'Workbench', to: '/workbench', icon: 'pi pi-th-large' },
  { label: 'Teclado', to: '/keyboard', icon: 'pi pi-bolt' },
  { label: 'DatePicker', to: '/datepicker', icon: 'pi pi-calendar' },
  { label: 'Recomendação (novos)', to: '/recomendacao', icon: 'pi pi-map' },
  { label: 'Markdown & Kanban', to: '/markdown-kanban', icon: 'pi pi-objects-column' },
]

// Publicado junto das docs (Pages), o playground vive em <docs>/playground/ —
// a documentação é o pai. Em dev não há docs ao lado.
const docsUrl = import.meta.env.PROD ? new URL('..', `${location.origin}${import.meta.env.BASE_URL}`).href : ''

const isDark = ref(document.documentElement.classList.contains('dark'))

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<template>
  <Toast />
  <ConfirmDialog />

  <div class="flex min-h-screen bg-[#111318] text-color">
    <!-- Sidebar (Carbon Shell) -->
    <aside class="w-60 flex flex-col bg-[#111318] text-[#e5e7eb] select-none">
      <!-- Brand -->
      <div class="h-14 flex items-center gap-2.5 px-5 border-b border-white/[0.07]">
        <div class="size-7 rounded-md bg-primary flex items-center justify-center shadow-sm">
          <i class="pi pi-box text-white text-xs" />
        </div>
        <span class="font-bold text-sm tracking-tight text-white">wPrimeVue</span>
        <span class="font-mono text-[0.625rem] font-medium text-[#9ca3af] bg-white/[0.06] border border-white/[0.08] px-1.5 py-0.5 rounded ml-auto">dev</span>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 px-2.5 py-4 flex flex-col gap-0.5">
        <a
          v-for="link in links"
          :key="link.to"
          class="nav-item relative group flex items-center gap-2.5 px-3 py-2 rounded-md text-[0.8125rem] font-medium cursor-pointer transition-colors duration-150"
          :class="route.path === link.to
            ? 'bg-white/[0.08] text-white font-semibold'
            : 'text-[#9ca3af] hover:text-[#f3f4f6] hover:bg-white/[0.04]'"
          @click="router.push(link.to)"
        >
          <span
            v-if="route.path === link.to"
            class="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r bg-[#f97316]"
          />
          <i
            :class="[link.icon, 'text-sm transition-colors', route.path === link.to ? 'text-[#f97316]' : 'text-[#9ca3af] group-hover:text-[#e5e7eb]']"
          />
          {{ link.label }}
        </a>
      </nav>

      <!-- Footer -->
      <div class="px-2.5 py-3 border-t border-white/[0.07] flex flex-col gap-0.5">
        <a
          v-if="docsUrl"
          :href="docsUrl"
          class="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
        >
          <i class="pi pi-book text-sm" />
          Documentação
        </a>
        <button
          class="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs font-medium text-[#9ca3af] hover:text-white hover:bg-white/[0.05] transition-colors duration-150"
          @click="toggleTheme"
        >
          <i :class="isDark ? 'pi pi-sun' : 'pi pi-moon'" class="text-sm" />
          {{ isDark ? 'Modo claro' : 'Modo escuro' }}
        </button>
      </div>
    </aside>

    <!-- Inset Canvas Sheet -->
    <main class="flex-1 my-2 mr-2 rounded-xl bg-surface-100 dark:bg-surface-950 border border-surface-200 dark:border-surface-800 p-8 overflow-auto shadow-sm">
      <router-view />
    </main>
  </div>
</template>
