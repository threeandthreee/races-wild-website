// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/next',
    component: () => import('@/views/Event.vue')
  },
  {
    path: '/event/:id',
    component: () => import('@/views/Event.vue')
  },
  {
    path: '/archive',
    component: () => import('@/views/Archive.vue')
  },
  {
    path: '/player/:short',
    component: () => import('@/views/Player.vue')
  },
  {
    path: '/players',
    component: () => import('@/views/Players.vue')
  },
  {
    path: '/guide/:slug',
    component: () => import('@/views/Guide.vue')
  },
  {
    path: '/guides',
    component: () => import('@/views/Guides.vue')
  },
  {
    path: '/bingo',
    component: () => import('@/views/Bingo.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/Admin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
