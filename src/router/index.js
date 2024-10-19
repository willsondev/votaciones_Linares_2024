// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import votoViews from '../views/votoViews.vue'

import HomeView from '../views/HomeView.vue';

const routes = [
  {
    path: '/',
        name: 'Home',
     component: HomeView
    
  },
  {
    path: '/voto',
    name: 'voto',
    component: votoViews,
  },
 
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
