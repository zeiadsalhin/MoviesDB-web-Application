import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress';
import HomeView from '../views/HomeView.vue'
import Info from '../views/Info.vue';
import Infotv from '../views/Infotv.vue';
const delay = 400
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Browse latest updated Movies, TV shows',
        delay: delay,
      }
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('../views/Search.vue'),
      meta: {
        title: 'Search Top Movies and TV Shows',
        delay: delay,
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
        title: 'About',
        delay: delay,
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
        title: 'Account',
        delay: delay,
      }
    },
    {
      path: '/discover/:id',
      name: 'discover',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Discover.vue'),
      meta: {
        title: 'Discover Latest Movies, TV shows',
        delay: delay,
      }
    },
    {
      path: '/genres/:id/:name',
      name: 'genre',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DiscoverGenreM.vue'),
      meta: {
        title: `Discover Latest Movies by Genre`,
        delay: delay,
      },
    },
    {
      path: '/:id/:name',
      name: 'top',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TopRated.vue'),
      meta: {
        title: `Discover Top Rated Movies, TV Shows`,
        delay: delay,
      },
    },
    {
      path: '/:id/:name',
      name: 'upcoming',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Upcoming.vue'),
      meta: {
        title: `Upcoming Movies`,
        delay: delay,
      },
    },
    {
      path: '/trending/:id',
      name: 'trending',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Discover2.vue'),
      meta: {
        title: 'Discover Latest Movies, TV shows',
        delay: delay,
      }
    },
    {
      path: '/info/:id',
      name: 'Info',
      component: Info,
      meta: {
        delay: delay,
      },
    },
    {
      path: '/infotv/:id',
      name: 'Infotv',
      component: Infotv,
      meta: {
        delay: delay,
      },
    },
    {
      path: '/movies',
      name: 'movies',
      component: () => import('../views/Movies.vue'),
      meta: {
        title: 'Discover Latest Movies',
        delay: delay,
      },
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../views/Favourites.vue'),
      meta: {
        delay: delay,
      },
    },
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/List.vue'),
      meta: {
        delay: delay,
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  },
})

router.beforeEach(async (to, from, next) => {
  const delay = to.meta.delay;

  document.title = to.meta?.title ?? 'loading...',
    NProgress.start();
  await new Promise(resolve => setTimeout(resolve, delay));

  next();
});
router.afterEach(() => {
  NProgress.done();
})
export default router
