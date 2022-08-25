import { createRouter, createWebHistory } from 'vue-router';
import routes from './routes.js';
import guards from './guards';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

for (const guard of guards) {
  router.beforeEach(guard);
}

export default router;
