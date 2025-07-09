import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../pages/LoginPage.vue';
import DashboardPage from '../pages/DashboardPage.vue';
import PiezasPage from '../pages/PiezasPage.vue';
import ComponentesPage from '../pages/ComponentesPage.vue';
import EnsamblajePage from '../pages/EnsamblajePage.vue';
import AsignarPiezasPage from '../pages/AsignarPiezasPage.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginPage },
  {
    path: '/dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/piezas',
    component: PiezasPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/componentes',
    component: ComponentesPage,
    meta: { requiresAuth: true }
  },
  { path: '/asignar-piezas',
     component: AsignarPiezasPage,
      meta: { requiresAuth: true }
     },
  {
    path: '/ensamblaje',
    component: EnsamblajePage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware para proteger rutas
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
