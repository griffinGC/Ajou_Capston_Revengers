import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HostSignUp from './components/HostSignUp.vue'
import GuestSignUp from './components/GuestSignUp.vue'
import HostBoards from './components/HostBoards.vue'

Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/hsignup',
      name: 'hsignup',
      component: HostSignUp
    },
    {
      path: '/gsignup',
      name: 'gsignup',
      component: GuestSignUp
    },
    {
      path: '/host',
      name: 'host',
      component: HostBoards
    }
  ]
})
