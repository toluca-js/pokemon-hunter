import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HuntView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/my-team',
      name: 'my-team',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded w../views/MyTeamView.vueed.
      component: () => import('./../views/MyTeamView.vue')
    }
  ]
})

export default router
