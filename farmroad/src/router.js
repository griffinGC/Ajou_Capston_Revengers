import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HostSignUp from './views/HostSignUp'
import UserInfo from './views/UserInfo'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/hostsign',
      name: 'hostsign',
      component: HostSignUp
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component : UserInfo
    }
  ]
})
