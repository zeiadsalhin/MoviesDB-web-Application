import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Info from '../views/Info.vue';
import Infotv from '../views/Infotv.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Browse latest updated Movies, TV shows'
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
      meta: {
        title: 'Search Top Movies and TV Shows'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'About'
      }
    },
    {
      path: '/account',
      name: 'account',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Account.vue'),
      meta: {
        title: 'Account'
      }
    },
    {
      path: '/discover',
      name: 'discover',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Discover.vue'),
      meta: {
        title: 'Discover Latest Movies, TV shows'
      }
    },
    {
      path: '/info/:id',
      name: 'Info',
      component: Info
    },
    {
      path: '/infotv/:id',
      name: 'Infotv',
      component: Infotv
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach((to, from) => {
  document.title = to.meta?.title ?? 'loading...'
})
export default router
