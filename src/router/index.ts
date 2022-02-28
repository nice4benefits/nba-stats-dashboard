import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/MainView.vue'

const defaultRedirect = {
  name: 'players',
  params: { page: 1 }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/players/:page(\\d+)?',
      name: 'players',
      component: MainView,
      alias: ['/:page(\\d+)?'],
      meta: {
        pageTitle: 'List of players'
      }
    },
    {
      path: '/players/:page',
      redirect: {
        name: 'players',
        params: { page: 1 }
      }
    },
    {
      path: '/:firstName?/:lastName?/:id(\\d+)',
      name: 'player',
      component: () => import('../views/PlayerStatsView.vue'),
      alias: ['/player/:id(\\d+)'],
      meta: {
        pageTitle: 'Player stats'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: {
        pageTitle: 'About'
      }
    },
    {
      path: '/:page',
      redirect: defaultRedirect
    },
    {
      path: '/player/:page',
      redirect: defaultRedirect
    }
  ]
})

export default router
