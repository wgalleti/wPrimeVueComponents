import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/HomeView.vue'),
    },
    {
      path: '/basic-crud',
      name: 'basic-crud',
      component: () => import('./views/BasicCrudView.vue'),
    },
    {
      path: '/advanced-crud',
      name: 'advanced-crud',
      component: () => import('./views/AdvancedCrudView.vue'),
    },
  ],
})
