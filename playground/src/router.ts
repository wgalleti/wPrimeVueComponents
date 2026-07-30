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
    {
      path: '/showcase',
      name: 'showcase',
      component: () => import('./views/ShowcaseView.vue'),
    },
    {
      path: '/real-api',
      name: 'real-api',
      component: () => import('./views/real-api/RealApiCrudView.vue'),
    },
    {
      path: '/workbench',
      name: 'workbench',
      component: () => import('./views/WorkbenchView.vue'),
    },
    {
      path: '/keyboard',
      name: 'keyboard',
      component: () => import('./views/KeyboardCrudView.vue'),
    },
    {
      path: '/datepicker',
      name: 'datepicker',
      component: () => import('./views/DatePickerView.vue'),
    },
  ],
})
