<script setup lang="ts">
import { ref, provide, onMounted } from 'vue'
import axios from 'axios'
import { W_AXIOS_KEY } from '@wgalleti/primevue-components'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Message from 'primevue/message'
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import RealApiProdutos from './RealApiProdutos.vue'
import RealApiModelos from './RealApiModelos.vue'

const STORAGE_KEY = 'wPrimeVue_realApi'

const baseURL = ref('')
const token = ref('')
const connected = ref(false)
const error = ref('')
const activeTab = ref('0')

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      baseURL.value = parsed.baseURL ?? ''
      token.value = parsed.token ?? ''
    } catch {
      // ignore
    }
  }
})

function saveConfig() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ baseURL: baseURL.value, token: token.value }),
  )
}

const realAxios = axios.create()

provide(W_AXIOS_KEY, realAxios)

function connect() {
  if (!baseURL.value) {
    error.value = 'Informe a URL base da API'
    return
  }

  error.value = ''
  saveConfig()

  realAxios.defaults.baseURL = baseURL.value
  if (token.value) {
    realAxios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
  } else {
    delete realAxios.defaults.headers.common['Authorization']
  }

  connected.value = false
  setTimeout(() => {
    connected.value = true
  }, 0)
}

function disconnect() {
  connected.value = false
}
</script>

<template>
  <div>
    <div class="w-crud-header">
      <div class="w-crud-header-content">
        <h1 class="w-crud-title">API Real</h1>
        <p class="w-crud-subtitle">Conecte a uma API real (ex: WorkHard) para testar os componentes com dados reais.</p>
      </div>
    </div>

    <!-- Config Panel -->
    <div class="w-crud-table p-5 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
        <div class="w-crud-form-field">
          <label class="w-crud-form-label" for="baseURL">URL Base da API</label>
          <InputText
            id="baseURL"
            v-model="baseURL"
            class="w-full"
            placeholder="http://localhost:8000"
            :disabled="connected"
          />
        </div>
        <div class="w-crud-form-field">
          <label class="w-crud-form-label" for="token">Token JWT (opcional)</label>
          <InputText
            id="token"
            v-model="token"
            class="w-full"
            placeholder="Bearer token para autenticacao"
            :disabled="connected"
            type="password"
          />
        </div>
        <div>
          <Button
            v-if="!connected"
            label="Conectar"
            icon="pi pi-link"
            class="w-full md:w-auto"
            @click="connect"
          />
          <Button
            v-else
            label="Desconectar"
            icon="pi pi-times"
            severity="secondary"
            class="w-full md:w-auto"
            @click="disconnect"
          />
        </div>
      </div>
      <Message v-if="error" severity="error" class="mt-4" :closable="false">
        {{ error }}
      </Message>
      <Message v-if="connected" severity="success" class="mt-4" :closable="false">
        Conectado a {{ baseURL }}
      </Message>
    </div>

    <!-- Tabs with CRUD examples -->
    <div v-if="connected">
      <Tabs v-model:value="activeTab">
        <TabList>
          <Tab value="0">
            <i class="pi pi-box mr-2" />
            Produtos
          </Tab>
          <Tab value="1">
            <i class="pi pi-truck mr-2" />
            Modelos
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <RealApiProdutos />
          </TabPanel>
          <TabPanel value="1">
            <RealApiModelos />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>

    <div v-else class="w-crud-empty" style="padding: 5rem 1rem;">
      <div class="w-crud-empty-icon">
        <i class="pi pi-server" />
      </div>
      <p class="w-crud-empty-title">Nenhuma API conectada</p>
      <p class="w-crud-empty-text">Configure a URL e token acima para conectar</p>
    </div>
  </div>
</template>
