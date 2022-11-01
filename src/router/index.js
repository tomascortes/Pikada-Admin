import { createWebHistory, createRouter } from 'vue-router';

const routes = [
  {
    path: '/',
    alias: '/index',
    name: 'tutorials',
    component: () => import('../components/home.vue'),
  },
  {
    path: '/warnings',
    name: 'warnings',
    component: () => import('../components/warnings.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
