import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/couaches', component: null },
    {
      path: '/couaches/:id',
      component: null,
      children: [{ path: 'contact', component: null }]
    },
    { path: '/register', component: null },
    { path: '/:notFound(.*)', component: null }
  ]
});
