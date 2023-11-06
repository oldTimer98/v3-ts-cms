import { localCache } from '@/utils'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/index.vue'),
    children: [
      {
        path: 'analysis',
        name: 'analysis',
        children: [
          {
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/main/analysis/dashboard/index.vue')
          },
          {
            path: 'overview',
            name: 'overview',
            component: () => import('@/views/main/analysis/overview/index.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/:patchMatch(.*)',
    name: 'notFound',
    component: () => import('@/views/not-found/index.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      el: '#app',
      top: 0,
      behavior: 'smooth'
    }
  }
})

router.beforeEach((to, from) => {
  const token = localCache.getCache('token')
  if (to.path === '/login' && token) {
    return from.path
  }
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router
